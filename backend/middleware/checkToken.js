import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    try {
        let token = req.get('Authorization')
        if (!token) {
            throw new error('token not provided');
        }

        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            req.id = err ? null : decoded.id
        })
        return next()
    } catch (error) {
        console.error(error);
    }
};