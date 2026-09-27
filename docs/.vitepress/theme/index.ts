import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './styles/brand.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 预留组件扩展
  }
}
