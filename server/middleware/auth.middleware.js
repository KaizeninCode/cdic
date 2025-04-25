import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET 

export const protect = async (req, res, next) => {
    // check if the token exists in the headers
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null

    if (!token) return res.status(401).json({error: 'Not authorized, no token found.'})

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({error: 'Not authorized, token failed.'})
        
    }
}