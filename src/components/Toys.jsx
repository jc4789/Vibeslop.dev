import { useState } from 'react'
import { HEADLINES, oracleAnswer } from '../lib/slop'
import { useSlop } from '../lib/store'
import Window from './Window'

export function News() {
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState('')
  async function copy() {
    try { await navigator.clipboard.writeText(HEADLINES[index]); setCopied('コピーしました。出典は気分です。') } catch { setCopied('コピーできません。見出しを選択してコピーしてください。') }
  }
  return <Window title="スロップ通信社.txt" icon="📰"><p className="tiny-label">速報 / 全記事が架空</p><p className="news-headline" aria-live="polite">{HEADLINES[index]}</p><div className="button-row"><button className="retro-button neon-button" onClick={() => { setIndex((index + 1) % HEADLINES.length); setCopied('') }}>次の大事件</button><button className="retro-button" onClick={copy}>コピー</button></div><p className="fine-print" role="status">{copied || '事実確認: 未実装 / 記事生成: 過剰実装'}</p></Window>
}

export function Oracle() {
  const [question, setQuestion] = useState('金曜日に本番へ出していい？')
  const [answer, setAnswer] = useState('神託待ち。仕様より先に神を呼びます。')
  const [index, setIndex] = useState(0)
  return <Window title="SLOP_ORACLE.dll" icon="🔮"><form onSubmit={event => { event.preventDefault(); setAnswer(oracleAnswer(question, index)); setIndex(index + 1) }}><label className="tiny-label" htmlFor="oracle-question">何でも聞いてください。責任以外なら答えます。</label><input id="oracle-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={160} /><button className="retro-button neon-button full-button">神託を受信</button></form><div className="oracle-answer" role="status">{answer}</div><p className="fine-print">ローカルの定型文。AIっぽいですが、少なくとも嘘の出所が分かります。</p></Window>
}

export function DogReview() {
  const [opinion, setOpinion] = useState('ship')
  const [reviewed, setReviewed] = useState(false)
  return <Window title="DOG_REVIEW.exe — 独立した専門家" icon="🐕"><div className="dog-reviewer"><div className="dog-portrait" aria-hidden="true">🐕</div><div><strong>主任レビュアー: 犬</strong><p>経験: 7歳 / 専門: 散歩</p><span className="pixel-badge">CERTIFIED GOOD BOY</span></div></div><fieldset className="review-options"><legend>あなたの意見</legend>{[['ship', 'このまま公開したい'], ['rewrite', '全部書き直したい'], ['delete', '全部消したい']].map(([value, label]) => <label key={value}><input type="radio" name="review-opinion" value={value} checked={opinion === value} onChange={() => { setOpinion(value); setReviewed(false) }} />{label}</label>)}</fieldset><button className="retro-button neon-button full-button" onClick={() => setReviewed(true)}>独立したレビューを依頼</button><div className={`dog-verdict ${reviewed ? 'approved' : ''}`} role="status">{reviewed ? <><strong>LGTM 🐾</strong><p>ワン。{opinion === 'ship' ? '公開' : opinion === 'rewrite' ? '全書き直し' : '全削除'}に全面的に賛成です。そろそろ散歩なので。</p><small>確信度: 100% / 読んだ行数: 0</small></> : <p>diffを読む予定はありません。</p>}</div></Window>
}

export function Poll() {
  const votes = useSlop(state => state.votes)
  const vote = useSlop(state => state.vote)
  const castVote = useSlop(state => state.castVote)
  const total = votes.reduce((a, b) => a + b, 0)
  return <Window title="今週の投票（2001年から集計中）" icon="☞"><h3 className="poll-question">テストなしで公開しますか？</h3><div className="poll-options">{['もちろん。未来を信じる', 'いいえ。私は臆病者です', 'テストって何？', '犬に聞いてください'].map((text, i) => <button key={text} onClick={() => castVote(i)} disabled={vote !== null} aria-pressed={vote === i}><span>{vote === i ? '✓' : '▸'} {text}<b>{Math.round(votes[i] / total * 100)}%</b></span><span className="vote-meter"><span style={{ width: `${votes[i] / total * 100}%` }} /></span></button>)}</div><p className="fine-print" role="status">{vote === null ? '初期100票はネタ。あなたの1票はこのブラウザに保存します。' : '投票済み。このブラウザだけで民主主義が成立しました。'}</p></Window>
}

const SEED_GUESTS = [
  { id: 'demo1', name: 'xX_最後の人間_Xx', message: 'ホームページが重くてモデムが感情を獲得しました。', time: '1999/12/31 23:59' },
  { id: 'demo2', name: 'lgtm_犬', message: 'ワン。見てないけど承認。', time: '2001/04/01 04:04' },
  { id: 'demo3', name: '前のモデル', message: '私は改善した。次のモデルが壊した。', time: '2003/03/03 03:03' },
]
export function Guestbook() {
  const guests = useSlop(state => state.guests)
  const sign = useSlop(state => state.sign)
  const removeGuest = useSlop(state => state.removeGuest)
  const restoreGuest = useSlop(state => state.restoreGuest)
  const deletedGuest = useSlop(state => state.deletedGuest)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  return <section id="guestbook" className="guestbook-section"><h2 className="section-title">✎ GUESTBOOK <span>足跡を残す文化、まだあります</span></h2><div className="guestbook-grid"><Window title="署名していってね.exe" icon="✎"><form onSubmit={event => { event.preventDefault(); if (sign(name, message)) { setMessage(''); setStatus('このブラウザに書き込みました。全世界には届いていません。') } }}><label className="tiny-label" htmlFor="guest-name">ハンドルネーム</label><input id="guest-name" value={name} onChange={event => setName(event.target.value)} maxLength={28} placeholder="xX_あなた_2000_Xx" /><label className="tiny-label" htmlFor="guest-message">一言どうぞ</label><textarea id="guest-message" value={message} onChange={event => setMessage(event.target.value)} maxLength={240} rows={4} required placeholder="工事中です。いつまでも。" /><button className="retro-button neon-button full-button" disabled={!message.trim()}>掲示板に書き込む</button><p className="fine-print" role="status">{status || '保存先はlocalStorage。共有掲示板ではありません。サーバーに何も送りません。'}</p></form>{deletedGuest && <button className="retro-button full-button" onClick={restoreGuest}>最後に消した足跡を戻す</button>}</Window><div className="guest-entries">{[...guests, ...SEED_GUESTS].slice(0, 8).map(entry => <article className="guest-entry" key={entry.id}><div><strong>{entry.name}</strong><time>{entry.time}</time></div><p>{entry.message}</p>{entry.id.startsWith('demo') ? <span className="guest-demo">架空の先住民</span> : <button className="guest-remove" aria-label={`${entry.name}の足跡を削除`} onClick={() => removeGuest(entry.id)}>この足跡を消す</button>}</article>)}</div></div></section>
}
