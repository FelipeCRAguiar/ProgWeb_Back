import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) throw new UnauthorizedException('Token não enviado');

        const token = authHeader.split(' ')[1];
        if (!token) throw new UnauthorizedException('Token mal formatado');

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET || 'segredo_do_jwt',
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Token inválido');
        }

        return true;
    }
}