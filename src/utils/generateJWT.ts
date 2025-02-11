import jwt from "jsonwebtoken";

export const generateJWT = (payload: object, time:number): string | Error => {
  if (process.env.JWT_SECRET) {
    const secret: string = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, {expiresIn : time});
    return token;
  }else{
    throw new Error("Error loading .env variable")
  }
};
