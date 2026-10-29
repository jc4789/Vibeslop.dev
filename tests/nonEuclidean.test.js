import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ANGLE_EXCESS, ANGLE_SUM, FULL_TURN, QUARTER_TURN, ROOMS, SPACE, crossPortal, degrees, enterDoor, initialPose, movePose, neighbor } from '../src/lib/nonEuclidean.js'

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) <= Number.EPSILON * Math.max(1, Math.abs(expected)) * (ROOMS.length + 1), `${actual} ≠ ${expected}`)

test('five square corners make a negatively curved 450 degree vertex', () => {
  assert.equal(degrees(ANGLE_SUM), 450)
  assert.equal(degrees(ANGLE_EXCESS), 90)
  assert.equal(ANGLE_SUM, ROOMS.length * QUARTER_TURN)
  assert.ok(ANGLE_SUM > FULL_TURN)
  assert.equal(new Set(ROOMS.map(room => room.id)).size, ROOMS.length)
})

test('portal transforms are exact inverses and preserve the shared vertex', () => {
  for (let room = 0; room < ROOMS.length; room++) {
    const pose = { ...initialPose(), room, x: SPACE.roomWidth / 2, z: SPACE.doorWidth / 4 }
    const mapped = crossPortal(pose, 'east')
    assert.equal(mapped.room, neighbor(room, 'east'))
    close(mapped.x, pose.z)
    close(mapped.z, SPACE.roomWidth / 2)
    const reversed = crossPortal(mapped, 'south')
    assert.equal(reversed.room, pose.room)
    close(reversed.x, pose.x)
    close(reversed.z, pose.z)
    close(reversed.yaw, pose.yaw)
    const corner = { ...pose, x: SPACE.roomWidth / 2, z: SPACE.roomWidth / 2 }
    const mappedCorner = crossPortal(corner, 'east')
    close(mappedCorner.x, corner.x)
    close(mappedCorner.z, corner.z)
  }
})

test('five forward joins return to the room but transport direction through 450 degrees', () => {
  const start = initialPose()
  let pose = start
  for (const _room of ROOMS) pose = crossPortal(pose, 'east')
  assert.equal(pose.room, start.room)
  close(start.yaw - pose.yaw, ANGLE_SUM)
  assert.equal(pose.crossings, ROOMS.length)
  close(Math.cos(pose.yaw - start.yaw), 0)
})

test('walking and accessible door controls cross the same geometry', () => {
  const half = SPACE.roomWidth / 2
  for (const side of ['east', 'south']) {
    const start = { ...initialPose(), x: side === 'east' ? half - SPACE.bodyRadius : 0, z: side === 'south' ? half - SPACE.bodyRadius : 0, yaw: side === 'east' ? QUARTER_TURN : Math.PI }
    const distance = SPACE.bodyRadius * 2
    const walking = movePose(start, side === 'east' ? distance : 0, side === 'south' ? distance : 0)
    const accessible = enterDoor(initialPose(), side)
    assert.deepEqual(walking, accessible)
    assert.equal(walking.room, neighbor(start.room, side))
    assert.equal(walking.crossings, 1)
    close(walking.x, side === 'east' ? 0 : half - SPACE.bodyRadius)
    close(walking.z, side === 'south' ? 0 : half - SPACE.bodyRadius)
  }
})

test('walls, corners, and door jambs stop the body instead of teleporting', () => {
  const half = SPACE.roomWidth / 2
  const clearance = half - SPACE.bodyRadius
  for (const [x, z, dx, dz] of [
    [0, 0, -SPACE.roomWidth, 0],
    [0, 0, 0, -SPACE.roomWidth],
    [0, half - SPACE.bodyRadius, SPACE.roomWidth, 0],
    [half - SPACE.bodyRadius, 0, 0, SPACE.roomWidth],
    [0, SPACE.doorWidth / 2, SPACE.roomWidth, 0],
  ]) {
    const pose = movePose({ ...initialPose(), x, z }, dx, dz)
    assert.equal(pose.room, 0)
    assert.equal(pose.crossings, 0)
    assert.ok(pose.x >= -clearance && pose.x <= half)
    assert.ok(pose.z >= -clearance && pose.z <= half)
  }
})

test('doorways can be traversed repeatedly in both directions without a visit cap', () => {
  let pose = initialPose()
  // 各部屋の各入口から一周し、逆順にも戻る。
  for (const _start of ROOMS) {
    const room = pose.room
    for (const _room of ROOMS) pose = enterDoor(pose, 'east')
    assert.equal(pose.room, room)
    for (const _room of ROOMS) pose = enterDoor(pose, 'south')
    assert.equal(pose.room, room)
    pose = enterDoor(pose, 'east')
  }
  assert.equal(pose.crossings, ROOMS.length * (ROOMS.length * 2 + 1))
})
