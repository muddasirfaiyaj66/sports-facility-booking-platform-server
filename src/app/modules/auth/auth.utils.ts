import jwt from 'jsonwebtoken'


export const createToken = (
    jwtPayload:{
        _id: string,
        name: string,
        email: string,
        role: string,
        phone: string,
        address: string,
    },
    secret:string,
    expiresIn:string,
) =>{
    return jwt.sign(jwtPayload, secret, {
        expiresIn
    });
};