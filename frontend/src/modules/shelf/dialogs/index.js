import LevelDialog from './level-dialog'
import PreviewDialog from './preview-dialog'
import {create} from 'vue-modal-dialogs'
const levelDialog = create(LevelDialog, 'selected')
const previewDialog = create(PreviewDialog, 'id')
export {levelDialog, previewDialog}
