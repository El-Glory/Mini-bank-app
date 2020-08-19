import jwt from 'jsonwebtoken';
import statusCodes from '../helpers/statusCodes';
import dotenv from 'dotenv'

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token || token === "")
        return res.status(400).json({status: statusCodes.badRequest, error: "Authentication failed"});

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified
            next()
        } catch (error) {
            return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Invalid token!' });         
        }
}