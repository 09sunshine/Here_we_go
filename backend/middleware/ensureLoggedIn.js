export default function (req, res, next) {
    if (!req.id) {
        res.status(402).json('Unauthorized');
    }
    console.log('logged in');
    next()
}