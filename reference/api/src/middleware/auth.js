import { firebaseAuth } from '../lib/firebase.js';
import { HttpError } from '../utils/httpError.js';

export async function requireAuth(req, _res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw new HttpError(401, 'Pehle login karo');
  }

  try {
    const decoded = await firebaseAuth.verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email ?? null };
  } catch {
    throw new HttpError(401, 'Token invalid ya expire ho gaya');
  }
  next();
}
