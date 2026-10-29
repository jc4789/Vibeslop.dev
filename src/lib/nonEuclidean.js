// 五枚の正方形の東辺と次の南辺を同一視する。共有頂点の角度は450°。
// 距離の単位はメートル。室内寸法・目線・身体幅はこの展示の設計値。
export const QUARTER_TURN = Math.PI / 2
export const FULL_TURN = Math.PI * 2
export const SPACE = Object.freeze({
  roomWidth: 8,
  roomHeight: 3,
  doorWidth: 2,
  doorHeight: 2.4,
  eyeHeight: 1.65,
  bodyRadius: 0.25,
  walkingSpeed: 1.4, // 通常歩行相当のメートル毎秒。
  verticalFieldOfView: Math.PI / 3, // 60°の透視投影。
  tileWidth: 1,
  frameWidth: 0.06,
})

export const ROOMS = Object.freeze([
  { id: 'reception', name: '小さな受付', eyebrow: '個人サイトです。敷地は未定義。', detail: '大したものでは、ないです。床面積を除けば。', color: '#baff72', exhibit: '#works', exhibitLabel: '普通の作品一覧を見る' },
  { id: 'nocturne', name: '夜空の部屋', eyebrow: '窓を開けたら、OSが付いてきた。', detail: 'ブラウザーの中のFirefox。その外側まで制作物です。', color: '#70e8ff', exhibit: '#nocturne', exhibitLabel: 'Nocturne OSの実物を見る' },
  { id: 'yuyan', name: '読書の部屋', eyebrow: '単語を引くための、短い遠回り。', detail: '本を読む前に、読書・動画・辞書のアプリを作りました。', color: '#ffa6df', exhibit: '#yuyan', exhibitLabel: '语言の実物を見る' },
  { id: 'diff', name: '小変更の保管庫', eyebrow: '「ちょっと」の保管には広さが要る。', detail: '100万行超の差分は上の階へ。ここは行数ではなく角度が過剰です。', color: '#ffd777', exhibit: '#small-update', exhibitLabel: '小変更の明細を見る' },
  { id: 'other-reception', name: 'もう一つの受付', eyebrow: '受付の隣に、受付の隣に、受付。', detail: '次の扉で最初の受付へ。正方形を五つ回ったのに、一周です。', color: '#b6a1ff', exhibit: '#about', exhibitLabel: '間取りの責任者を見る' },
])

export const ANGLE_SUM = ROOMS.length * QUARTER_TURN
export const ANGLE_EXCESS = ANGLE_SUM - FULL_TURN
export const degrees = radians => Math.round(radians * 180 / Math.PI)
export const neighbor = (room, side) => (room + (side === 'east' ? 1 : ROOMS.length - 1)) % ROOMS.length

export function initialPose() {
  return { room: 0, x: -SPACE.roomWidth / 4, z: -SPACE.roomWidth / 4, yaw: QUARTER_TURN * 1.5, crossings: 0 }
}

// 東→南は共有頂点を中心に−90°、南→東は逆変換。距離も扉の座標も保つ。
export function crossPortal(pose, side) {
  const east = side === 'east'
  return {
    ...pose,
    room: neighbor(pose.room, side),
    x: east ? pose.z : SPACE.roomWidth - pose.z,
    z: east ? SPACE.roomWidth - pose.x : pose.x,
    yaw: pose.yaw + (east ? -QUARTER_TURN : QUARTER_TURN),
    crossings: pose.crossings + 1,
  }
}

export function movePose(pose, dx, dz) {
  const distance = Math.hypot(dx, dz)
  if (!distance) return pose
  // 衝突判定の刻みは身体半径から算出。速度・フレーム時間の上限は設けない。
  const steps = Math.ceil(distance / SPACE.bodyRadius)
  const half = SPACE.roomWidth / 2
  const clearance = half - SPACE.bodyRadius
  const opening = SPACE.doorWidth / 2 - SPACE.bodyRadius
  let stepX = dx / steps
  let stepZ = dz / steps
  let next = { ...pose }
  for (let step = 0; step < steps; step++) {
    next.x += stepX
    next.z += stepZ
    if (next.x > half && Math.abs(next.z) < opening) {
      next = crossPortal(next, 'east')
      ;[stepX, stepZ] = [stepZ, -stepX]
    } else if (next.z > half && Math.abs(next.x) < opening) {
      next = crossPortal(next, 'south')
      ;[stepX, stepZ] = [-stepZ, stepX]
    }
    next.x = Math.max(-clearance, Math.min(Math.abs(next.z) < opening ? half : clearance, next.x))
    next.z = Math.max(-clearance, Math.min(Math.abs(next.x) < opening ? half : clearance, next.z))
  }
  return next
}

// 連続移動が苦手な人も、同じ接続変換で扉を一枚ずつ通れる。
export function enterDoor(pose, side) {
  const east = side === 'east'
  const distance = SPACE.bodyRadius * 2
  const approach = {
    ...pose,
    x: east ? SPACE.roomWidth / 2 - SPACE.bodyRadius : 0,
    z: east ? 0 : SPACE.roomWidth / 2 - SPACE.bodyRadius,
    yaw: east ? QUARTER_TURN : Math.PI,
  }
  return movePose(approach, east ? distance : 0, east ? 0 : distance)
}
