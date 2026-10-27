import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { registerTokenSchema } from '../schemas/notification.schema.js';
import * as notifications from '../services/notifications.service.js';

const router = Router();
router.use(requireAuth);

router.post('/token', validate(registerTokenSchema), async (req, res) => {
  await notifications.saveToken(req.user.uid, req.body.token, req.body.platform);
  res.status(204).end();
});

// Sirf testing ke liye: apne aap ko notification bhejo
router.post('/test', async (req, res) => {
  const result = await notifications.sendToUser(req.user.uid, {
    title: 'Test notification 🎉',
    body: 'Agar ye dikh raha hai, to FCM sahi chal raha hai.',
  });
  res.json(result);
});

export default router;
