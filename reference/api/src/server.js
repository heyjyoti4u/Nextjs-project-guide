import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();
const server = app.listen(env.PORT, () => {
  console.log(`✅ API chal rahi hai: http://localhost:${env.PORT}/api/health`);
});

// Deploy/restart par requests aaram se khatam hone do
process.on('SIGTERM', () => server.close(() => process.exit(0)));
