import express from 'express'
import roleController from '../controllers/roleController'

const router = express.Router()


router.route('/')
.get(roleController.allRoles)
.post(roleController.createRole)

router.route('/:id([0-9]+)')
.get(roleController.findById)
.put(roleController.updateRole)
.delete(roleController.deleteRole)

router.route('/group')
   .get(roleController.roleByGroup)
router.route('/group/:id([0-9]+)')
.get(roleController.roleByGroupId)

router.route('/userRole/:id([0-9]+)')
.get(roleController.roleByUserId)


export default router