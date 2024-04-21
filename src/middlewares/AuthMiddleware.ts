import { Request, Response, NextFunction  } from "express"
import * as jwt from "jsonwebtoken"

export default new class AuthMiddleware {
    auth(req: Request, res: Response, next: NextFunction) {
        try{
            const authorization = req.header("Authorization")

            if(!authorization || !authorization.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorization!" })

            const token = authorization.split(' ')[1]

            if(!token) return res.status(400).json({ message: "Token not found!" })

            try{
                const login_session = jwt.verify(token, `${process.env.SECRET_KEY}`)
                res.locals.login_session = login_session
                next()
            }catch(err) {
                return res.status(400).json({ message: "Token failed!" })
            }
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}