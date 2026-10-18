import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { AuthGuard } from './auth.guard.js';

@ApiTags('Autenticação e Conta')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Cadastrar novo usuário (adotante)' })
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar e retornar tokens' })
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Redefinir senha' })
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data.token, data.novaSenha);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Encerrar sessão ativa' })

  @ApiBody({ schema: { type: 'object', properties: { accessToken: { type: 'string' }, refreshToken: { type: 'string' } } } })
  logout(@Req() req: any, @Body() body: any) {
    return this.authService.logout(body.accessToken, body.refreshToken);
  }
}