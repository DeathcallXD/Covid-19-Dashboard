import express from 'express';
import {newUserDetailsGoogle} from '../controllers/googleLogin.js';

const router = express.Router();

router.post('/', newUserDetailsGoogle);

export default router;
