import {createParamDecorator, ExecutionContext} from '@nestjs/common';


export const ExtractJWT = (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const {headers} = request;
    const {authorization} = headers;
    if (!authorization) return null;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') return null;
    if (!token) return null;
    return token;
}

export const JWT = createParamDecorator(ExtractJWT);
