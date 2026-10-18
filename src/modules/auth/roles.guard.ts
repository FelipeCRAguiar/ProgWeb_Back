import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Pega as roles permitidas definidas no Controller com @SetMetadata('roles', [...])
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true; // Se não exigir role específica, libera

        const { user } = context.switchToHttp().getRequest();

        // Verifica se o perfil do usuário está na lista de permitidos
        const hasRole = requiredRoles.includes(user?.perfil);
        if (!hasRole) throw new ForbiddenException('Você não tem permissão para acessar este recurso');

        return true;
    }
}