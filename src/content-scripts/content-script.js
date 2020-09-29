import '@/assets/css/command-bar.css'

import { createApp } from 'vue'

import App from './App'
import focusDirective from '@/directives/focus'

const commandBar = document.createElement('div')
document.body.appendChild(commandBar)

const app = createApp(App)

app.directive('focus', focusDirective)

app.mount(commandBar)
