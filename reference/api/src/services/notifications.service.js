import { supabase } from '../lib/supabase.js';
import { firebaseMessaging } from '../lib/firebase.js';

const DEAD_TOKEN_CODES = [
  'messaging/registration-token-not-registered',
  'messaging/invalid-registration-token',
];

export async function saveToken(userId, token, platform) {
  const { error } = await supabase
    .from('device_tokens')
    .upsert({ token, user_id: userId, platform, last_seen_at: new Date().toISOString() }, { onConflict: 'token' });
  if (error) throw error;
}

export async function sendToUser(userId, { title, body, link = '/' }) {
  const { data: rows, error } = await supabase.from('device_tokens').select('token').eq('user_id', userId);
  if (error) throw error;
  const tokens = rows.map((r) => r.token);
  if (tokens.length === 0) return { sent: 0, removed: 0 };

  const res = await firebaseMessaging.sendEachForMulticast({
    tokens,
    notification: { title, body },
    webpush: { fcmOptions: { link } },
  });

  // Jo tokens ab valid nahi (user ne permission hata di / browser clear) unhe DB se hata do
  const dead = [];
  res.responses.forEach((r, i) => {
    if (!r.success && DEAD_TOKEN_CODES.includes(r.error?.code)) dead.push(tokens[i]);
  });
  if (dead.length) await supabase.from('device_tokens').delete().in('token', dead);

  return { sent: res.successCount, removed: dead.length };
}
