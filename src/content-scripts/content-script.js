import '@/assets/css/command-bar.css'
import { createApp } from 'vue'
import App from './App'

const commandBar = document.createElement('div')
document.body.appendChild(commandBar)

createApp(App).mount(commandBar)
