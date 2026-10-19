import { Controller, Get, Body, Patch, Delete, Param, Query, Req, ValidationPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('profile') profile?: string,
    @Query('status') status?: string
  ) {
    return this.usersService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      profile,
      status
    );
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findMe(@Req() req: any) {
    const user = req['user']
    return this.usersService.findOne(user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  updateMe(@Req() req: any, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    const user = req['user']
    return this.usersService.updateMe(user.sub, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  removeMe(@Req() req: any) {
    const user = req['user']
    return this.usersService.removeMe(user.sub);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.updateRole(+id, updateUserDto);
  }
}