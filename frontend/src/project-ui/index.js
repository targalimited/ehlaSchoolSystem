import ViApp from '@/ehla-ui/components/vi-app'
import ViAvatar from '@/ehla-ui/components/vi-avatar'
import ViChip from '@/ehla-ui/components/vi-chip'
import ViCheckbox from '@/ehla-ui/components/vi-checkbox'
import ViIcon from '@/ehla-ui/components/vi-icon'
import {ViInput, ViInputError, ViInputLabel} from '@/ehla-ui/components/vi-input'
import ViButton from '@/ehla-ui/components/vi-button'
import {ViItem, ViItemAction, ViItemAvatar, ViItemContent, ViItemTitle, ViItemSubTitle} from '@/ehla-ui/components/vi-item'
import {ViSectionHeader, ViPageTitle} from '@/ehla-ui/components/vi-section-header'
import ViMenu from '@/ehla-ui/components/vi-menu'
import ViSelect from '@/ehla-ui/components/vi-select'
import ViExpansionPanel from '@/ehla-ui/components/vi-expansion-panel'
import {ViExpandTransition} from '@/ehla-ui/components/transitions'
import ViTooltip from '@/ehla-ui/components/vi-tooltip'
import ViToolbar from '@/ehla-ui/components/vi-toolbar'
import {ViSpacer, ViContainer, ViCol, ViRow, ViDivider} from '@/ehla-ui/components/vi-grid'
import {ViDataTable, ViTableCol} from '@/ehla-ui/components/vi-data-table'
import ViSwitch from '@/ehla-ui/components/vi-switch'
import ViSpinner from '@/ehla-ui/components/vi-spinner'
import ViNoData from '@/ehla-ui/components/vi-no-data'
import {ViTabs, ViTab} from '@/ehla-ui/components/vi-tabs'
import {ViCard, ViCardContent} from '@/ehla-ui/components/vi-card'
import {ViDialog, ViDialogTitle} from '@/ehla-ui/components/vi-dialog'
import ViDatePicker from '@/ehla-ui/components/vi-date-picker'
import Sticky from '@/ehla-ui/directives/sticky'
import Scroll from '@/ehla-ui/directives/scroll'
import ViMessage from '@/ehla-ui/components/vi-message'
import ViMessageBox from '@/ehla-ui/components/vi-message-box'
import ViDeletePrompt from '@/ehla-ui/components/vi-delete-prompt'
// project component
import ViButtonRow from './components/vi-button-row'
import ViButtonToggle from './components/vi-button-toggle'
import './stylus/main.styl'

// vivovii icons
import '@/ehla-ui/components/vi-icon/collection'
import './icons'

const ProjectUI = {
  install (Vue) {
    Vue.component('vi-app', ViApp)
    Vue.component('vi-expand-transition', ViExpandTransition)
    Vue.component('vi-avatar', ViAvatar)
    Vue.component('vi-chip', ViChip)
    Vue.component('vi-card', ViCard)
    Vue.component('vi-card-content', ViCardContent)
    Vue.component('vi-container', ViContainer)
    Vue.component('vi-checkbox', ViCheckbox)
    Vue.component('vi-data-table', ViDataTable)
    Vue.component('vi-table-col', ViTableCol)
    Vue.component('vi-date-picker', ViDatePicker)
    Vue.component('vi-icon', ViIcon)
    Vue.component('vi-input', ViInput)
    Vue.component('vi-input-error', ViInputError)
    Vue.component('vi-input-label', ViInputLabel)
    Vue.component('vi-button', ViButton)
    Vue.component('vi-section-header', ViSectionHeader)
    Vue.component('vi-menu', ViMenu)
    Vue.component('vi-message', ViMessage)
    Vue.component('vi-item', ViItem)
    Vue.component('vi-item-action', ViItemAction)
    Vue.component('vi-item-avatar', ViItemAvatar)
    Vue.component('vi-item-content', ViItemContent)
    Vue.component('vi-item-title', ViItemTitle)
    Vue.component('vi-item-subtitle', ViItemSubTitle)
    Vue.component('vi-select', ViSelect)
    Vue.component('vi-expansion-panel', ViExpansionPanel)
    Vue.component('vi-tooltip', ViTooltip)
    Vue.component('vi-toolbar', ViToolbar)
    Vue.component('vi-spacer', ViSpacer)
    Vue.component('vi-switch', ViSwitch)
    Vue.component('vi-spinner', ViSpinner)
    Vue.component('vi-page-title', ViPageTitle)
    Vue.component('vi-tabs', ViTabs)
    Vue.component('vi-tab', ViTab)
    Vue.component('vi-dialog', ViDialog)
    Vue.component('vi-dialog-title', ViDialogTitle)
    Vue.component('vi-col', ViCol)
    Vue.component('vi-row', ViRow)
    Vue.component('vi-divider', ViDivider)
    Vue.component('vi-no-data', ViNoData)
    Vue.directive('sticky', Sticky)
    Vue.directive('scroll', Scroll)
    Vue.prototype.$message = ViMessage
    Vue.prototype.$messageBox = ViMessageBox
    Vue.prototype.$deletePrompt = ViDeletePrompt
    Vue.component('vi-button-row', ViButtonRow)
    Vue.component('vi-button-toggle', ViButtonToggle)
  }
}

export default ProjectUI
