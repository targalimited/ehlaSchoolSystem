import { isMobile } from '../../util/helper'

export default {
  methods: {
    genSidebar () {
      const data = {
        staticClass: 'vi-sidebar'
      }
      if (isMobile) {
        data.directives = [{
          name: 'click-outside',
          value: this.deactivate,
          args: {
            closeConditional: true
          }
        }]
      }
      return this.$createElement('div', data, [
        this.genMenu(),
        this.genSubMenu()
      ])
    },

    genMenu () {
      return this.menu.map(item => {
        return this.genMenuItem(item)
      })
    },

    genMenuItem (item) {
      const data = {
        staticClass: 'vi-sidebar__item',
        class: {
          'vi-sidebar__item--link-active': this.isMenuLinkActive(item),
          'vi-sidebar__item--selected': this.isMenuSelected(item)
        },
        on: {}
      }

      if (isMobile) {
        data.on = {
          click: () => { this.mouseEnterHandler(item) }
        }
      } else {
        data.on = {
          mouseleave: e => { this.mouseLeaveHandler(e) },
          mouseenter: () => { this.mouseEnterHandler(item) }
        }
      }

      const icon = this.$createElement('vi-icon', {
        props: {
          name: (this.isMenuSelected(item) && this.isActive) ? item.icons.active : item.icons.default
        }
      })

      return this.$createElement('div', data, [icon])
    },

    genSubMenu () {
      const data = {
        ref: 'content',
        staticClass: 'vi-sidebar__content',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }
      if (!isMobile) {
        data.on = {
          mouseleave: e => {this.mouseLeaveHandler(e)}
        }
      }

      const title = this.$createElement('div', {staticClass: 'vi-sidebar__title'}, this.selectedMenu.name)
      let items = []
      if (this.selectedMenu && this.selectedMenu.children)
        items = this.selectedMenu.children.map(item => this.genSubMenuItem(item))
      const children = [title, ...items]
      const content = this.$createElement('div', data, children)

      return this.$createElement('transition', {
        props: {
          name: 'slide-x-transition'
        }
      }, [content])
    },

    genSubMenuItem (item) {
      const data = {
        class: 'vi-sidebar__list-item',
        props: {
          to: item.route,
          tag: 'li',
          exact: true
        },
        nativeOn: {
          click: () => {this.isActive = false}
        }
      }
      return this.$createElement('router-link', data, item.name)
    }
  }
}
