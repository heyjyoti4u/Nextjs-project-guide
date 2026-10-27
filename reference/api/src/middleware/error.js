import { ZodError } from 'zod';

export function notFound(req, res) {
  res.status(404).json({
    error: { message: `Route nahi mila: ${req.method} ${req.originalUrl}` },
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: 'Input galat hai',
        details: err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
      },
    });
  }

  const status = err.status || 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    error: {
      message: status >= 500 ? 'Server me kuch gadbad hui' : err.message,
      details: err.details,
    },
  });
}
