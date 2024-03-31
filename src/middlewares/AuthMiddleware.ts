import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction  } from "express"

export default new class AuthMiddleware {
    auth(req: Request, res: Response, next: NextFunction) {
        try{
            const authorization = req.header("Authorization")
            if(!authorization || !authorization.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorization!" })

            const token = authorization.split(' ')[1]
            if(!token) return res.status(400).json({ message: "Token not found!" })

            try{
                const loginSession = jwt.verify(token, 'SECRET_KEY')
                res.locals.loginSession = loginSession
                next()
            }catch(err) {
                return res.status(400).json({ message: "Token Failed!" })
            }
        }catch(err) {
            return res.status(500).json(err)
        }
    }
}