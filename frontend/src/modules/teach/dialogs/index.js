import CreateAsmtDialog from './create-asmt-dialog'
import EditAsmtDialog from './edit-asmt-dialog'
import {create} from 'vue-modal-dialogs'
const createAsmtDialog = create(CreateAsmtDialog)
const editAsmtDialog = create(EditAsmtDialog)
export {createAsmtDialog, editAsmtDialog}
