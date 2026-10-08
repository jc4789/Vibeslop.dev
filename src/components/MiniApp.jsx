import { useState } from 'react'
import { useSlop } from '../lib/store'
import Window from './Window'

function Todo() {
  const [items, setItems] = useState([{ id: 0, text: 'テストをあとで書く', done: false }, { id: 1, text: 'READMEで解決する', done: true }])
  const [text, setText] = useState('')
  function add(event) {
    event.preventDefault()
    if (!text.trim()) return
    setItems([...items, { id: crypto.randomUUID(), text: text.trim(), done: false }])
    setText('')
  }
  return <div className="tiny-app"><h3>エンタープライズ級タスク帳</h3><p className="fine-print">認証なし。課金なし。タスクはあります。</p><form onSubmit={add} className="inline-form"><label className="sr-only" htmlFor="todo-text">新しいタスク</label><input id="todo-text" value={text} onChange={e => setText(e.target.value)} maxLength={80} placeholder="依存関係以外を追加…" /><button className="retro-button" disabled={!text.trim()}>追加</button></form><ul className="todo-list">{items.map(item => <li key={item.id}><label><input type="checkbox" checked={item.done} onChange={() => setItems(items.map(value => value.id === item.id ? { ...value, done: !value.done } : value))} /><span className={item.done ? 'done-task' : ''}>{item.text}</span></label><button aria-label={`${item.text}を削除`} onClick={() => setItems(items.filter(value => value.id !== item.id))}>×</button></li>)}</ul><p className="fine-print">{items.filter(item => item.done).length}/{items.length} 完了。チェックを外せば仕事が増えます。</p></div>
}

function Counter() {
  const [count, setCount] = useState(0)
  return <div className="tiny-app"><h3>分散していないカウンター</h3><output className="big-output">{count}</output><div className="button-row"><button className="retro-button" onClick={() => setCount(count - 1)}>−1</button><button className="retro-button" onClick={() => setCount(0)}>リセット</button><button className="retro-button" onClick={() => setCount(count + 1)}>＋1</button></div><p className="fine-print">この数字のためにフレームワークが5本動いています。</p></div>
}

function Calculator() {
  const [a, setA] = useState('2')
  const [b, setB] = useState('2')
  const values = [Number(a), Number(b)]
  const answer = a.trim() && b.trim() && values.every(Number.isFinite) ? values[0] + values[1] : '数値を入力'
  return <div className="tiny-app"><h3>AIを使わない足し算</h3><p className="fine-print">たまには確定的な答えも出します。</p><div className="calculator-inputs"><label>左の数字<input value={a} type="number" onChange={e => setA(e.target.value)} /></label><span>＋</span><label>右の数字<input value={b} type="number" onChange={e => setB(e.target.value)} /></label></div><output className="big-output">{answer}</output><p className="fine-print">推論コスト: ¥0 / 不要な構成: 計測不能</p></div>
}

export default function MiniApp() {
  const build = useSlop(state => state.build)
  return <Window title="実際に生成されたもの.html" icon="▧" className="preview-window"><div className="preview-toolbar"><span>LOCALHOST / 外部APIなし</span><span className="status-led">● 動作中</span></div>{build ? <div key={build.id}>{build.mode === 'counter' ? <Counter /> : build.mode === 'calculator' ? <Calculator /> : <Todo />}</div> : <div className="preview-waiting"><pre aria-hidden="true">{String.raw`   /\_/\
  ( o.o )
   > ^ <`}</pre><h3>アプリを待っています。</h3><p>左のビルダーに「電卓」などと入力。<br />猫は仕様にありませんでした。</p></div>}<div className="preview-foot">※ 生成アプリの内容は再読み込みで消えます。猫は戻ります。</div></Window>
}
