import { openDB } from 'idb'

const DB_NAME = 'low-tech-monk-my-circle'
const DB_VERSION = 1
const STORE_NAME = 'circle-state'
const STATE_KEY = 'flames-page'

const defaultState = {
  flames: [],
}

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME)
    }
  },
})

function cloneState(state) {
  return structuredClone(state)
}

export function createDefaultFlamesState() {
  return cloneState(defaultState)
}

export async function loadFlamesState() {
  const db = await dbPromise
  const state = await db.get(STORE_NAME, STATE_KEY)

  if (!state) {
    return createDefaultFlamesState()
  }

  return structuredClone(state)
}

export async function saveFlamesState(state) {
  const db = await dbPromise
  const nextState = structuredClone(state ?? defaultState)

  await db.put(STORE_NAME, nextState, STATE_KEY)
  return nextState
}

export async function clearFlamesState() {
  const db = await dbPromise
  await db.delete(STORE_NAME, STATE_KEY)
}
