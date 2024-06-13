// index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import Navlink from './components/Navlink.vue'
import Tabs from './components/Tabs.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Navlink', Navlink)
        app.component('Tabs', Tabs)
    }
}