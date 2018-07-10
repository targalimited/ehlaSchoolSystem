import StudentDialog from './student-dialog'
import {create} from 'vue-modal-dialogs'
const studentDialog = create(StudentDialog, 'selected')
export {studentDialog}
