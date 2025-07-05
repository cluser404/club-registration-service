module.exports = (schema) => async (req, res, next) => {
    try {
        req.validated = await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err) {
        res.status(400).json({
            errors: err.details.map(e => ({field: e.path[0], message: e.message}))
        });
    }
};