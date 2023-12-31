import express from 'express'
import authController from '../controllers/authController'


const router = express.Router()


router.route('/login')
.post(authController.login)

router.route('/refresh')
.post(authController.refreshTheToken)

router.route('/logout')
.post(authController.logout)



export default router


