import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository.js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authRepository: AuthRepository,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) throw new UnauthorizedException('Token não enviado');

        const token = authHeader.split(' ')[1];
        if (!token) throw new UnauthorizedException('Token mal formatado');

        const isRevoked = await this.authRepository.isTokenRevoked(token);
        if (isRevoked) {
            throw new UnauthorizedException('Token revogado. Faça login novamente.');
        }
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