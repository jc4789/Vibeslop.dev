import { ROOMS, SPACE, FULL_TURN, QUARTER_TURN, initialPose, movePose, enterDoor } from './nonEuclidean.js'
import { NOCTURNE_SHOTS, NOCTURNE_UPDATE, YUYAN_SHOTS } from './portfolio.js'
import imageAssets from './image-assets.json'

const exhibits = [
  NOCTURNE_SHOTS.find(shot => shot.src === '/projects/nocturne-portfolio.png'),
  NOCTURNE_SHOTS.find(shot => shot.src === '/projects/nocturne-firefox-wasm.png'),
  YUYAN_SHOTS.find(shot => shot.src === '/projects/yuyan-article-lookup.jpg'),
  NOCTURNE_UPDATE.receipt,
  NOCTURNE_SHOTS.find(shot => shot.src === '/projects/nocturne-workbench.png'),
]

const vertexSource = `#version 300 es
in vec2 position;
out vec2 screen;
void main() { screen = position; gl_Position = vec4(position, 0.0, 1.0); }
`

// 各画素の光線も歩行者と同じ東→南／南→東の座標変換を通る。
// 絵を貼った扉ではない。扉の向こうの床・壁を、その部屋の座標で追跡する。
const fragmentSource = `#version 300 es
precision highp float;
precision highp int;
in vec2 screen;
out vec4 fragment;
uniform vec2 resolution;
uniform vec3 eye;
uniform float yaw;
uniform int currentRoom;
uniform vec3 roomColors[${ROOMS.length}];
uniform sampler2D roomSigns;
${exhibits.map((_, index) => `uniform sampler2D exhibit${index};`).join('\n')}
uniform float imageReady[${ROOMS.length}];
uniform float imageAspect[${ROOMS.length}];
const int roomCount = ${ROOMS.length};
const float roomWidth = ${SPACE.roomWidth.toFixed(8)};
const float halfRoom = roomWidth / 2.0;
const float roomHeight = ${SPACE.roomHeight.toFixed(8)};
const float halfDoor = ${(SPACE.doorWidth / 2).toFixed(8)};
const float doorHeight = ${SPACE.doorHeight.toFixed(8)};
const float tileWidth = ${SPACE.tileWidth.toFixed(8)};
const float frameWidth = ${SPACE.frameWidth.toFixed(8)};
const float lens = ${Math.tan(SPACE.verticalFieldOfView / 2).toFixed(8)};

vec3 exhibition(int room, vec2 uv) {
  ${exhibits.map((_, index) => `if (room == ${index}) return texture(exhibit${index}, uv).rgb;`).join('\n  ')}
  return vec3(0.0);
}

void main() {
  vec3 forward = vec3(sin(yaw), 0.0, -cos(yaw));
  vec3 right = vec3(cos(yaw), 0.0, sin(yaw));
  vec3 ray = normalize(forward + right * screen.x * resolution.x / resolution.y * lens + vec3(0.0, screen.y * lens, 0.0));
  vec3 origin = eye;
  int room = currentRoom;
  float travelled = 0.0;
  // 一画素の光線束より小さい扉は見分けられない。その距離を解像度から導出。
  float pixelSlope = 2.0 * lens / resolution.y;
  float distinguishableDistance = (halfDoor * 2.0) / pixelSlope;
  vec3 color = vec3(0.0);
  while (travelled < distinguishableDistance) {
    float tx = ray.x == 0.0 ? distinguishableDistance : ((ray.x > 0.0 ? halfRoom : -halfRoom) - origin.x) / ray.x;
    float ty = ray.y == 0.0 ? distinguishableDistance : ((ray.y > 0.0 ? roomHeight : 0.0) - origin.y) / ray.y;
    float tz = ray.z == 0.0 ? distinguishableDistance : ((ray.z > 0.0 ? halfRoom : -halfRoom) - origin.z) / ray.z;
    float distance = min(tx, min(ty, tz));
    vec3 hit = origin + ray * distance;
    travelled += distance;
    bool wallX = tx <= ty && tx <= tz;
    bool wallZ = tz < tx && tz <= ty;
    bool eastDoor = wallX && ray.x > 0.0 && abs(hit.z) < halfDoor && hit.y < doorHeight;
    bool southDoor = wallZ && ray.z > 0.0 && abs(hit.x) < halfDoor && hit.y < doorHeight;
    if (eastDoor) {
      origin = vec3(hit.z, hit.y, roomWidth - hit.x);
      ray = vec3(ray.z, ray.y, -ray.x);
      room = (room + 1) % roomCount;
      continue;
    }
    if (southDoor) {
      origin = vec3(roomWidth - hit.z, hit.y, hit.x);
      ray = vec3(-ray.z, ray.y, ray.x);
      room = (room + roomCount - 1) % roomCount;
      continue;
    }
    vec3 accent = roomColors[room];
    float footprint = max(travelled * pixelSlope, frameWidth / resolution.y);
    float fog = exp(-travelled / (roomWidth * 2.0));
    if (!wallX && !wallZ) {
      vec2 grid = abs(mod(hit.xz + tileWidth / 2.0, tileWidth) - tileWidth / 2.0);
      float line = 1.0 - smoothstep(frameWidth / 2.0, frameWidth / 2.0 + footprint, min(grid.x, grid.y));
      float checker = mod(floor(hit.x / tileWidth) + floor(hit.z / tileWidth), 2.0);
      float ceiling = ray.y > 0.0 ? 0.5 : 1.0;
      color = (vec3(0.025 + checker * 0.025) + accent * line * 0.22) * ceiling;
      float cornerGlow = exp(-length(hit.xz - vec2(halfRoom)) / tileWidth);
      color += accent * cornerGlow * 0.35;
    } else {
      float across = wallX ? hit.z : hit.x;
      bool portalWall = (wallX && ray.x > 0.0) || (wallZ && ray.z > 0.0);
      float panel = 1.0 - smoothstep(frameWidth / 2.0, frameWidth / 2.0 + footprint, abs(mod(across + tileWidth / 2.0, tileWidth) - tileWidth / 2.0));
      color = vec3(0.045, 0.055, 0.07) + accent * panel * 0.06;
      float skirting = 1.0 - smoothstep(frameWidth, frameWidth + footprint, hit.y);
      float topTrim = 1.0 - smoothstep(frameWidth, frameWidth + footprint, roomHeight - hit.y);
      color += accent * (skirting + topTrim) * 0.6;
      if (portalWall) {
        float jamb = abs(abs(across) - halfDoor);
        float lintel = abs(hit.y - doorHeight);
        float frameDistance = min(hit.y <= doorHeight ? jamb : length(vec2(jamb, lintel)), abs(across) < halfDoor ? lintel : length(vec2(jamb, lintel)));
        float light = 1.0 - smoothstep(frameWidth, frameWidth + footprint, frameDistance);
        float halo = exp(-frameDistance / (frameWidth * 3.0));
        color += accent * (light + halo * 0.35);
        // 行き先の看板も壁上の実座標。隣室を見た光線には、その室の看板が映る。
        if (abs(across) < halfDoor && hit.y > doorHeight) {
          int destination = (room + ((wallX && ray.x > 0.0) ? 1 : roomCount - 1)) % roomCount;
          vec2 signUV = vec2((across + halfDoor) / (halfDoor * 2.0), (roomHeight - hit.y) / (roomHeight - doorHeight));
          if (wallZ) signUV.x = 1.0 - signUV.x;
          signUV.y = (float(destination) + signUV.y) / float(roomCount);
          float lettering = texture(roomSigns, signUV).a;
          color += roomColors[destination] * lettering;
        }
      }
      // 壁の上下を暗くし、目線を扉に寄せる照明。
      color *= 0.65 + 0.35 * sin(hit.y / roomHeight * 3.141592653589793);
      // 北・西の壁を実際の制作物の展示面にする。写真は加工・生成せず配信済み画像を使う。
      if (!portalWall) {
        float panelWidth = roomWidth / 2.0;
        float panelHeight = roomHeight - tileWidth;
        vec2 panel = vec2((across + panelWidth / 2.0) / panelWidth, (roomHeight / 2.0 + panelHeight / 2.0 - hit.y) / panelHeight);
        if (all(greaterThanEqual(panel, vec2(0.0))) && all(lessThanEqual(panel, vec2(1.0)))) {
          float ratio = imageAspect[room] / (panelWidth / panelHeight);
          vec2 photoUV = panel;
          if (ratio > 1.0) photoUV.y = (panel.y - 0.5) * ratio + 0.5;
          else photoUV.x = (panel.x - 0.5) / ratio + 0.5;
          color = accent * 0.025;
          if (imageReady[room] > 0.0 && all(greaterThanEqual(photoUV, vec2(0.0))) && all(lessThanEqual(photoUV, vec2(1.0)))) color = exhibition(room, photoUV);
          float border = min(min(panel.x, 1.0 - panel.x) * panelWidth, min(panel.y, 1.0 - panel.y) * panelHeight);
          color += accent * (1.0 - smoothstep(frameWidth, frameWidth + footprint, border));
        }
      }
    }
    color *= fog;
    break;
  }
  // 到達不能な画素未満の奥行きは霧へ収束。再帰回数の固定上限は使わない。
  color = color / (color + vec3(1.0));
  color = pow(color, vec3(1.0 / 2.2));
  float vignette = 1.0 - 0.22 * dot(screen, screen);
  fragment = vec4(color * vignette, 1.0);
}
`

const keys = new Set(['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'])
export const isMovementKey = key => keys.has(key.toLowerCase())

export function createPortalRenderer(canvas, onRoomChange, onFailure) {
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' })
  if (!gl) throw new Error('このブラウザーではWebGL2を開始できません。扉のボタンで同じ回廊を探索できます。')
  const resources = []
  let program
  function shader(type, source) {
    const compiled = gl.createShader(type)
    resources.push(['shader', compiled])
    gl.shaderSource(compiled, source)
    gl.compileShader(compiled)
    if (!gl.getShaderParameter(compiled, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(compiled))
    return compiled
  }
  function release() {
    for (const [type, resource] of resources) {
      if (type === 'shader') gl.deleteShader(resource)
      if (type === 'buffer') gl.deleteBuffer(resource)
      if (type === 'program') gl.deleteProgram(resource)
      if (type === 'texture') gl.deleteTexture(resource)
    }
  }
  try {
    program = gl.createProgram()
    resources.push(['program', program])
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource))
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
  } catch (error) { release(); throw error }
  gl.useProgram(program)
  const buffer = gl.createBuffer()
  resources.push(['buffer', buffer])
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  // 二枚の三角形で画面を覆う。各画素から独立した光線を追う。
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  const locations = Object.fromEntries(['resolution', 'eye', 'yaw', 'currentRoom', 'roomColors', 'roomSigns'].map(name => [name, gl.getUniformLocation(program, name)]))
  gl.uniform3fv(locations.roomColors, new Float32Array(ROOMS.flatMap(room => room.color.match(/[a-f0-9]{2}/gi).map(hex => parseInt(hex, 16) / 255))))
  // 日本語の看板を一枚のアトラスへ。実測した文字幅で確保し、外部フォントは取らない。
  const atlas = document.createElement('canvas')
  const context = atlas.getContext('2d')
  if (!context) { release(); throw new Error('看板の描画を開始できませんでした。') }
  const font = `600 48px ${getComputedStyle(canvas).fontFamily}`
  context.font = font
  const labels = ROOMS.map((room, index) => `${String(index + 1).padStart(2, '0')} / ${room.name}`)
  const padding = context.measureText('　').width
  const metrics = labels.map(label => context.measureText(label))
  const rowHeight = Math.ceil(Math.max(...metrics.map(metric => metric.actualBoundingBoxAscent + metric.actualBoundingBoxDescent)) + padding)
  atlas.width = Math.ceil(Math.max(...metrics.map(metric => metric.width)) + padding * 2)
  atlas.height = rowHeight * ROOMS.length
  context.font = font
  context.fillStyle = '#fff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  labels.forEach((label, index) => context.fillText(label, atlas.width / 2, rowHeight * (index + 0.5)))
  const texture = gl.createTexture()
  resources.push(['texture', texture])
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.uniform1i(locations.roomSigns, 0)
  let pose = initialPose()
  let frame = 0
  let previousTime = null
  let visible = true
  let disposed = false
  let dragging = null
  const pressed = new Set()
  const imageLoads = exhibits.map((shot, index) => {
    const unit = index + 1 // テクスチャ単位0は看板アトラス。
    const photoTexture = gl.createTexture()
    resources.push(['texture', photoTexture])
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, photoTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.uniform1i(gl.getUniformLocation(program, `exhibit${index}`), unit)
    gl.uniform1f(gl.getUniformLocation(program, `imageAspect[${index}]`), shot.width / shot.height)
    const image = new Image()
    image.onload = () => {
      if (disposed || gl.isContextLost()) return
      gl.useProgram(program)
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, photoTexture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.uniform1f(gl.getUniformLocation(program, `imageReady[${index}]`), 1)
      if (visible && !document.hidden) draw()
    }
    image.onerror = () => {
      if (!disposed && image.src !== new URL(shot.src, document.baseURI).href) image.src = shot.src
    }
    image.src = imageAssets[shot.src]?.preview || imageAssets[shot.src]?.full || shot.src
    return image
  })
  function draw() {
    if (disposed || gl.isContextLost() || !canvas.width || !canvas.height) return
    gl.useProgram(program)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(locations.resolution, canvas.width, canvas.height)
    gl.uniform3f(locations.eye, pose.x, SPACE.eyeHeight, pose.z)
    gl.uniform1f(locations.yaw, pose.yaw)
    gl.uniform1i(locations.currentRoom, pose.room)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
  function update(next) {
    const crossed = next.crossings !== pose.crossings
    pose = next
    if (crossed) onRoomChange({ ...pose })
  }
  function tick(time) {
    frame = 0
    if (!visible || document.hidden || disposed || !pressed.size) { previousTime = null; return }
    const seconds = previousTime === null ? 0 : (time - previousTime) / 1000
    previousTime = time
    const forward = Number(pressed.has('w') || pressed.has('arrowup')) - Number(pressed.has('s') || pressed.has('arrowdown'))
    const sideways = Number(pressed.has('d')) - Number(pressed.has('a'))
    const turn = Number(pressed.has('arrowright')) - Number(pressed.has('arrowleft'))
    pose.yaw += turn * QUARTER_TURN * seconds
    const length = Math.hypot(forward, sideways)
    if (length) {
      const distance = SPACE.walkingSpeed * seconds / length
      update(movePose(pose, (Math.sin(pose.yaw) * forward + Math.cos(pose.yaw) * sideways) * distance, (-Math.cos(pose.yaw) * forward + Math.sin(pose.yaw) * sideways) * distance))
    }
    draw()
    frame = requestAnimationFrame(tick)
  }
  function key(key, down) {
    if (!isMovementKey(key)) return
    if (down) pressed.add(key.toLowerCase())
    else pressed.delete(key.toLowerCase())
    if (!frame && pressed.size && visible && !document.hidden) frame = requestAnimationFrame(tick)
  }
  function stop() {
    pressed.clear(); dragging = null; previousTime = null
    cancelAnimationFrame(frame); frame = 0
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect()
    const [maxWidth, maxHeight] = gl.getParameter(gl.MAX_VIEWPORT_DIMS)
    const ratio = Math.min(window.devicePixelRatio || 1, maxWidth / bounds.width, maxHeight / bounds.height)
    canvas.width = Math.round(bounds.width * ratio)
    canvas.height = Math.round(bounds.height * ratio)
    draw()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  const intersection = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting)
    if (!visible) stop()
    else draw()
  }) : null
  intersection?.observe(canvas)
  function visibility() { stop(); if (!document.hidden && visible) draw() }
  function contextLost(event) { event.preventDefault(); stop(); onFailure('描画が中断しました。扉のボタンはそのまま使えます。「描画を再開」で復帰できます。') }
  document.addEventListener('visibilitychange', visibility)
  window.addEventListener('blur', stop)
  canvas.addEventListener('webglcontextlost', contextLost)
  resize()
  return {
    key,
    stop,
    step(direction) { stop(); update(movePose(pose, Math.sin(pose.yaw) * SPACE.tileWidth * direction, -Math.cos(pose.yaw) * SPACE.tileWidth * direction)); draw() },
    turn(direction) { stop(); pose.yaw += direction * QUARTER_TURN; draw() },
    door(side) { stop(); update(enterDoor(pose, side)); draw() },
    setPose(next) { stop(); pose = { ...next }; draw() },
    restart() { stop(); pose = initialPose(); onRoomChange({ ...pose }); draw() },
    pointerDown(event) { dragging = { id: event.pointerId, x: event.clientX }; canvas.setPointerCapture(event.pointerId) },
    pointerMove(event) {
      if (!dragging || dragging.id !== event.pointerId) return
      pose.yaw += (event.clientX - dragging.x) / canvas.clientWidth * FULL_TURN
      dragging.x = event.clientX
      draw()
    },
    pointerUp() { dragging = null },
    dispose() {
      stop(); disposed = true
      resizeObserver.disconnect(); intersection?.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('blur', stop)
      canvas.removeEventListener('webglcontextlost', contextLost)
      imageLoads.forEach(image => { image.onload = null; image.onerror = null })
      release()
    },
  }
}
