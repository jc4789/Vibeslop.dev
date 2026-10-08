import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useSlop } from '../lib/store'
import Window from './Window'

export default function DependencyGraph() {
  const host = useRef(null)
  const packages = useSlop(state => state.packages)
  const add = useSlop(state => state.addFramework)
  const remove = useSlop(state => state.removeFramework)
  const calm = useSlop(state => state.calm)
  const [rotating, setRotating] = useState(true)
  useEffect(() => {
    const element = host.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }) } catch {
      element.textContent = 'WebGLがお休み中。依存関係の文字リストは動きます。'
      return () => element.replaceChildren()
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    element.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, .1, 100)
    camera.position.set(0, 1, 12)
    const group = new THREE.Group()
    scene.add(group)
    const geometry = new THREE.BoxGeometry(.55, .55, .55)
    const colors = [0x00ff9d, 0x00dcff, 0xff1aa9, 0xffff00, 0xa268ff]
    const materials = colors.map(color => new THREE.MeshBasicMaterial({ color, wireframe: true }))
    const positions = []
    packages.forEach((name, i) => {
      const angle = i * 2.39996
      const radius = i === 0 ? 0 : 1.3 + (i % 4) * .5
      const mesh = new THREE.Mesh(geometry, materials[i % materials.length])
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (i % 7 - 3) * .45)
      mesh.rotation.set(i * .2, i * .3, i * .1)
      mesh.name = name
      group.add(mesh)
      positions.push(mesh.position)
    })
    const vertices = []
    for (let i = 1; i < positions.length; i++) {
      const from = positions[Math.floor((i - 1) / 2)]
      const to = positions[i]
      vertices.push(from.x, from.y, from.z, to.x, to.y, to.z)
    }
    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    const linesMaterial = new THREE.LineBasicMaterial({ color: 0x756caa, transparent: true, opacity: .6 })
    group.add(new THREE.LineSegments(linesGeometry, linesMaterial))
    let frame = 0
    let last = 0
    let visible = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const draw = () => renderer.render(scene, camera)
    function animate(time) {
      frame = 0
      if (!visible || document.hidden || !rotating || calm || reduced.matches) return
      if (time - last > 33) { group.rotation.y += .006; group.rotation.x = Math.sin(time * .00015) * .15; draw(); last = time }
      frame = window.requestAnimationFrame(animate)
    }
    function restart() {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      draw()
      if (visible && !document.hidden && rotating && !calm && !reduced.matches) frame = window.requestAnimationFrame(animate)
    }
    const resize = new ResizeObserver(() => {
      const width = Math.max(element.clientWidth, 1)
      renderer.setSize(width, 220)
      camera.aspect = width / 220
      camera.updateProjectionMatrix()
      draw()
    })
    resize.observe(element)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart() })
    observer.observe(element)
    document.addEventListener('visibilitychange', restart)
    reduced.addEventListener('change', restart)
    restart()
    return () => {
      window.cancelAnimationFrame(frame)
      resize.disconnect(); observer.disconnect()
      document.removeEventListener('visibilitychange', restart)
      reduced.removeEventListener('change', restart)
      geometry.dispose(); linesGeometry.dispose(); linesMaterial.dispose()
      materials.forEach(material => material.dispose())
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [packages, rotating, calm])
  return <Window title="依存関係の重力井戸.sys" icon="🌀" className="dependency-window">
    <div className="dependency-heading"><strong>{packages.length}<small> FRAMEWORKS</small></strong><button className="small-button" onClick={() => setRotating(!rotating)} aria-pressed={!rotating}>{rotating ? '回転停止' : '回転再開'}</button></div>
    <div ref={host} className="dependency-canvas" role="img" aria-label={`${packages.length}本の依存関係を表示する回転3Dグラフ`} />
    <div className="package-list">{packages.map((name, i) => <span key={`${i}:${name}`} className={i < 5 ? 'real-package' : ''}>{name}{i < 5 && ' ✓'}</span>)}</div>
    <div className="button-row"><button className="retro-button neon-button" onClick={add} disabled={packages.length >= 64}>＋ フレームワークを増築</button><button className="retro-button" onClick={remove} disabled={packages.length <= 5}>1本戻す</button></div>
    <p className="fine-print">✓ の5本はこのサイトで実際に使用。増築分は架空の依存関係です。64本でブラウザを保護します。</p>
  </Window>
}
