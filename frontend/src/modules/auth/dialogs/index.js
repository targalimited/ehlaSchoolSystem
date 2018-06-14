import messageDialog from './messageDialog'
import {create} from 'vue-modal-dialogs'
const messageBox = create(messageDialog, 'content')
export {messageBox}
