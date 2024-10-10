import jwt, { type JwtPayload } from 'jsonwebtoken'

export const decodeJWT = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload
  return decoded?.user
}
