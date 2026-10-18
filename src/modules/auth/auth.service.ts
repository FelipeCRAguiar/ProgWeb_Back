import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) { }

  async register(data: RegisterDto) {
    const userExists = await this.authRepository.findByEmail(data.email);
    if (userExists) throw new BadRequestException('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const user = await this.authRepository.create({
      username: data.nome,
      email: data.email,
      password: hashedPassword,
      cpf: data.cpf,
      phone: data.telefone,
      birthday: new Date(data.dataNascimento),
      profile: 'ADOTANTE',
      status: 'ATIVO',
    });

    return this.generateTokens(user);
  }

  async login(data: LoginDto) {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    const isPasswordValid = await bcrypt.compare(data.senha, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Email ou senha inválidos');

    if (user.status !== 'ATIVO') throw new UnauthorizedException('Usuário inativo');

    return this.generateTokens(user);
  }

  async resetPassword(token: string, novaSenha: string) {
    try {
      const payload: any = this.jwtService.verify(token);
      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      await this.authRepository.updatePassword(payload.sub, hashedPassword);
      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      throw new BadRequestException('Token inválido ou expirado');
    }
  }

  async logout(accessToken: string, refreshToken: string) {
    try {
      const accessPayload: any = this.jwtService.decode(accessToken);
      const refreshPayload: any = this.jwtService.decode(refreshToken);

      const accessExpiresAt = new Date(accessPayload.exp * 1000);
      const refreshExpiresAt = new Date(refreshPayload.exp * 1000);

      await this.authRepository.saveRevokedToken(accessToken, accessExpiresAt);
      await this.authRepository.saveRevokedToken(refreshToken, refreshExpiresAt);

      return { message: 'Logout realizado com sucesso' };
    } catch (error) {
      return { message: 'Logout realizado com sucesso' };
    }
  }

  private generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email, perfil: user.profile };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}