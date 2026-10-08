import { useEffect, useRef } from 'react'
import { createApp, h, nextTick, onUnmounted, ref } from 'vue'
import { compilePrompt } from '../lib/slop'
import { useSlop } from '../lib/store'
import Window from './Window'

// A real Vue island mounted inside React. No runtime template compiler/eval.
export default function Compiler() {
  const host = useRef(null)
  useEffect(() => {
    const app = createApp({
      setup() {
        const prompt = ref('タスク管理を作って。簡単でいい。')
        const lines = ref(['C:\\VIBES> 起動しました。仕様を入れてください。'])
        const running = ref(false)
        const progress = ref(0)
        const terminal = ref(null)
        let timer
        onUnmounted(() => window.clearInterval(timer))
        function run(event) {
          event.preventDefault()
          if (!prompt.value.trim() || running.value) return
          const job = compilePrompt(prompt.value)
          let step = 0
          running.value = true
          progress.value = 0
          lines.value = [`> ${job.request}`]
          timer = window.setInterval(() => {
            lines.value.push(job.logs[step++])
            void nextTick(() => { if (terminal.value) terminal.value.scrollTop = terminal.value.scrollHeight })
            progress.value = Math.round(step / job.logs.length * 100)
            if (step === job.logs.length) {
              window.clearInterval(timer)
              useSlop.getState().setBuild({ ...job, id: crypto.randomUUID() })
              useSlop.getState().addFramework()
              running.value = false
            }
          }, 280)
        }
        return () => h('form', { class: 'compiler-form', onSubmit: run }, [
          h('div', { ref: terminal, class: 'terminal-screen', role: 'log', 'aria-label': 'ビルドログ', 'aria-live': 'off' }, lines.value.map((line, i) => h('p', { key: i, class: line.startsWith('ユーザー') ? 'log-user' : '' }, line))),
          h('div', { class: 'build-progress', role: 'progressbar', 'aria-label': '生成進捗', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': progress.value }, [h('span', { style: { width: `${progress.value}%` } }), h('b', `${progress.value}%`)]),
          h('label', { for: 'build-prompt', class: 'tiny-label' }, '仕様書（160文字以内なら何でも仕様）'),
          h('input', { id: 'build-prompt', value: prompt.value, maxlength: 160, disabled: running.value, onInput: event => { prompt.value = event.target.value } }),
          h('div', { class: 'compiler-buttons' }, [h('button', { type: 'submit', class: 'retro-button neon-button', disabled: running.value || !prompt.value.trim() }, running.value ? '理解せずにビルド中…' : '⚡ 勝手に実装する'), h('span', { class: 'engine-badge' }, 'POWERED BY VUE / IN REACT')]),
          h('p', { class: 'fine-print', role: 'status' }, running.value ? 'ローカル生成中。実際のAI・ネットワークは使用しません。' : progress.value === 100 ? '右のアプリが動きます。副作用として架空の依存関係が増えました。' : '「電卓」「カウンター」「タスク」に対応。ログは風刺、生成アプリは実動。'),
        ])
      },
    })
    app.mount(host.current)
    return () => app.unmount()
  }, [])
  return <Window title="SLOP_BUILD.EXE — Vueがここだけ担当" icon="⚡" className="compiler-window"><div ref={host} /></Window>
}
