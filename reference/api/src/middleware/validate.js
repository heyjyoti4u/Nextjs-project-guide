// Usage: router.post('/', validate(schema), handler)
export const validate = (schema) => (req, _res, next) => {
  req.body = schema.parse(req.body); // galat hua to ZodError -> errorHandler 400 bhej dega
  next();
};
