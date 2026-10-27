import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { supabase } from '../lib/supabase.js';

const router = Router();

// Login ke turant baad frontend isse call karta hai: profile row bana/update kar deta hai
router.post('/sync', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: req.user.uid, email: req.user.email }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  res.json({ profile: data });
});

export default router;
