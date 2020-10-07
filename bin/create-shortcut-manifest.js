#!/usr/bin/env node
const yargs = require('yargs')
const glob = require('glob')
const fs = require('fs')
const path = require('path')

const prettifyJson = obj => JSON.stringify(obj, null, 2)
const parseJson = path => JSON.parse(fs.readFileSync(path))

/**
 * @type Object
 * @property {string} path
 */
const options = yargs
  .usage('Usage: -p <path> -o <output>')
  .option('p', {
    alias: 'path',
    describe: 'path to a folder that contains shortcut maps',
    type: 'string',
    demandOption: true
  })
  .option('o', {
    alias: 'output',
    describe: 'path to store the shortcut manifest file',
    type: 'string',
    demandOption: true
  }).argv

const shortcuts = glob.sync(`${options.path}/**/*.json`)
if (shortcuts.length === 0) {
  console.warn('no shortcuts were found; cannot create manifest')

  process.exit()
}

const maps = shortcuts.map(path => Object.assign(parseJson(path), { path }))

const manifest = maps.reduce((manifest, map) => {
  manifest[map['urlPattern']] = path.basename(map.path)

  return manifest
}, {})

fs.writeFileSync(options.output, prettifyJson(manifest))

console.log(`shortcut manifest created: ${options.output}`)
