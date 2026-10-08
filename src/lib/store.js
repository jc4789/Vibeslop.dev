import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { guestEntry, nextFramework, REAL_STACK } from './slop.js'

export const useSlop = create(persist((set) => ({
  packages: [...REAL_STACK],
  additions: 0,
  visits: 0,
  votes: [41, 12, 23, 24],
  vote: null,
  guests: [],
  deletedGuest: null,
  build: null,
  chaos: false,
  calm: false,
  crt: true,
  addFramework: () => set(state => {
    if (state.packages.length >= 64) return state
    return { packages: [...state.packages, nextFramework(state.additions)], additions: state.additions + 1 }
  }),
  removeFramework: () => set(state => ({ packages: state.packages.length > REAL_STACK.length ? state.packages.slice(0, -1) : state.packages })),
  visit: () => set(state => ({ visits: state.visits + 1 })),
  castVote: index => set(state => state.vote !== null || !Number.isInteger(index) || index < 0 || index > 3 ? state : { votes: state.votes.map((value, i) => value + (i === index ? 1 : 0)), vote: index }),
  sign: (name, message) => {
    const entry = guestEntry(name, message, crypto.randomUUID(), new Date().toLocaleString('ja-JP'))
    if (!entry) return false
    set(state => ({ guests: [entry, ...state.guests].slice(0, 30) }))
    return true
  },
  removeGuest: id => set(state => {
    const entry = state.guests.find(guest => guest.id === id)
    return entry ? { guests: state.guests.filter(guest => guest.id !== id), deletedGuest: entry } : state
  }),
  restoreGuest: () => set(state => state.deletedGuest ? { guests: [state.deletedGuest, ...state.guests].slice(0, 30), deletedGuest: null } : state),
  setBuild: build => set({ build }),
  toggleChaos: () => set(state => ({ chaos: !state.chaos })),
  toggleCalm: () => set(state => ({ calm: !state.calm })),
  toggleCrt: () => set(state => ({ crt: !state.crt })),
}), {
  name: 'vibeslop-1998-v1',
  storage: createJSONStorage(() => localStorage),
  partialize: state => ({ packages: state.packages, additions: state.additions, visits: state.visits, votes: state.votes, vote: state.vote, guests: state.guests }),
}))
