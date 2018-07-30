import ViItem from './vi-item'
import {createSimpleFunctional} from '../../util/helper'
const ViItemAction = createSimpleFunctional('vi-item__action', 'div')
const ViItemAvatar = createSimpleFunctional('vi-item__avatar', 'div')
const ViItemContent = createSimpleFunctional('vi-item__content', 'div')
const ViItemTitle = createSimpleFunctional('vi-item__title', 'div')
const ViItemSubTitle = createSimpleFunctional('vi-item__sub-title', 'div')
export {ViItem, ViItemAction, ViItemAvatar, ViItemContent, ViItemTitle, ViItemSubTitle}
export default ViItem
