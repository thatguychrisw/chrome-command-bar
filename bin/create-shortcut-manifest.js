#!/usr/bin/env node
const yargs = require('yargs')
const glob = require('glob')
const fs = require('fs')
const path = require('path')

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

const maps = shortcuts.map(path => Object.assign(JSON.parse(fs.readFileSync(path)), { path }))

const manifest = maps.reduce((manifest, map) => {
  manifest[map['urlPattern']] = path.basename(map.path)

  return manifest
}, {})

fs.writeFileSync(options.output, JSON.stringify(manifest, null, 2))

console.log(`shortcut manifest created: ${options.output}`)
