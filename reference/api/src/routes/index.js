import { Router } from 'express';
import health from './health.js';
import me from './me.js';
import auth from './auth.js';
import tasks from './tasks.js';
import notifications from './notifications.js';

const router = Router();

router.use('/health', health);
router.use('/me', me);
router.use('/auth', auth);
router.use('/tasks', tasks);
router.use('/notifications', notifications);

export default router;
