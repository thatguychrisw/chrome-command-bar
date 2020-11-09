import { readFileSync } from 'fs'

export const parseJson = path => JSON.parse(readFileSync(path))
export const prettifyJson = obj => JSON.stringify(obj, null, 2)
