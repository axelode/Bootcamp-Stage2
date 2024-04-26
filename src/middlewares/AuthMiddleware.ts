import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export default new class authMiddleware {
    auth(req: Request, res: Response, next: NextFunction) {
        try{
            const authorization = req.header("Authorization")
    
            if(!authorization || !authorization.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorization!" })

            const token = authorization.split(" ")[1]

            if(!token) return res.status(401).json({ message: "Token Not Found!" })

            try{
                const login_session = jwt.verify(token, `${process.env.SECRET_KEY}`)
                res.locals.login_session = login_session
                next()
            }catch {
                return res.status(401).json({ message: "Token Failed!" })
            }
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}