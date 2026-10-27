import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createTaskSchema, updateTaskSchema, idParamSchema } from '../schemas/task.schema.js';
import * as tasks from '../services/tasks.service.js';

const router = Router();
router.use(requireAuth); // is file ke saare routes login maangte hain

router.get('/', async (req, res) => {
  res.json({ tasks: await tasks.listTasks(req.user.uid) });
});

router.post('/', validate(createTaskSchema), async (req, res) => {
  const task = await tasks.createTask(req.user.uid, req.body);
  res.status(201).json({ task });
});

router.patch('/:id', validate(updateTaskSchema), async (req, res) => {
  const { id } = idParamSchema.parse(req.params);
  res.json({ task: await tasks.updateTask(req.user.uid, id, req.body) });
});

router.delete('/:id', async (req, res) => {
  const { id } = idParamSchema.parse(req.params);
  await tasks.deleteTask(req.user.uid, id);
  res.status(204).end();
});

export default router;
