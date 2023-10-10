import express from 'express'
import roleController from '../controllers/roleController'

const router = express.Router()


router.route('/')
.get(roleController.allRoles)
.post(roleController.createRole)



export default router