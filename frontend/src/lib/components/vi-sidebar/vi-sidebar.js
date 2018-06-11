import Delayable from '../../mixins/delayable'
import Toggleable from '../../mixins/toggleable'
import ClickOutside from '../../directives/click-outside'
import Generator from './sidebar-generator'
export default {
  name: 'vi-sidebar',

  mixins: [ Delayable, Toggleable, Generator ],

  directives: {
    ClickOutside
  },

  props: ['menu'],

  data () {
    return {
      selectedMenu: {}, // whether it is hovering (desktop) or clicked on mobile
    }
  },

  methods: {
    deactivate () {
      this.runDelay('close', () => {
        this.isActive = false
        setTimeout(() => {
          if (!this.isActive) this.selectedMenu = {}
        }, 200)
      })
    },

    mouseEnterHandler (item) {
      this.isActive = true
      this.selectedMenu = item
    },

    mouseLeaveHandler (e) {
      let safeArea = [this.$refs.content]
      const menuItem = this.$el.querySelectorAll('.vi-sidebar__item')
      safeArea = [...safeArea, ...menuItem]
      if (safeArea.some(el => el.contains(e.relatedTarget))) return
      this.deactivate()
    },

    isMenuSelected (menu) {
      return this.selectedMenu.name === menu.name
    },

    isMenuLinkActive (menu) {
      const path = this.$route.fullPath
      const menuRoot = menu.routeRoot
      if (typeof menuRoot === 'undefined') {
        console.log('warning! please provide menuRoot')
      } else if (Array.isArray(menuRoot)) {
        return menuRoot.some(str => path.includes(str))
      } else {
        return path.includes(menuRoot)
      }
    }
  },

  watch: {
    '$route': () => {
      this.isActive = false
    }
  },

  render () {
    return this.genSidebar()
  }
}
