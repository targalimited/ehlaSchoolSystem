import Dialog from './coupons-dialog'
import AssignCouponDialog from './assign-coupon-dialog'
import {create} from 'vue-modal-dialogs'
const createCouponDialog = create(Dialog)
const assignCouponDialog = create(AssignCouponDialog)
export {createCouponDialog, assignCouponDialog}
