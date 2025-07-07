// app/routes.js

import { Router } from 'express'
import {
    sendRecoveryEmail,
    resetPassword
} from './recoveryController.js'

const router = Router()

// Path to send recovery link by email
router.post('/recover', sendRecoveryEmail)

// Path to reset password using the token sent by email
router.post('/reset', resetPassword)

export default router
