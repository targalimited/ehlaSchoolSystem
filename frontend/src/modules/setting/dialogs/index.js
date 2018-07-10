import StudentDialog from './student-dialog'
import TeacherDialog from './teacher-dialog'
import {create} from 'vue-modal-dialogs'
const studentDialog = create(StudentDialog)
const teacherDialog = create(TeacherDialog)
export {studentDialog, teacherDialog}
