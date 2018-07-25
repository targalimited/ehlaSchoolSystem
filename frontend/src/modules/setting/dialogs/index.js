import StudentDialog from './student-dialog'
import TeacherDialog from './teacher-dialog'
import ClassDialog from './class-dialog'
import BatchImportDialog from './batch-import-dialog'
import {create} from 'vue-modal-dialogs'
const studentDialog = create(StudentDialog)
const teacherDialog = create(TeacherDialog)
const classDialog = create(ClassDialog)
const batchImportDialog = create(BatchImportDialog)
export {studentDialog, teacherDialog, classDialog, batchImportDialog}
