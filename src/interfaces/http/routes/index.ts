import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { TransferController } from '../controllers/TransferController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const user = new UserController();
const transfer = new TransferController();

router.post('/auth/register', (req, res) => user.register(req, res));
router.post('/auth/login', (req, res) => user.login(req, res));
router.get('/users/me', authMiddleware, (req, res) => user.profile(req, res));
router.post('/transfers', authMiddleware, (req, res) => transfer.transfer(req, res));
router.get('/transfers', authMiddleware, (req, res) => transfer.history(req, res));

export default router;
