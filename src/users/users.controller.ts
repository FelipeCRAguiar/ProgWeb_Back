import { Controller, Get, Body, Patch, Delete, Param, Query, Req, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

    @Get('me')
  findMe(@Req() req: any) {
    const user = req['user']
    return this.usersService.findOne(user.email);
  }

  @Patch('me')
  updateMe(@Req() req: any, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    const user = req['user']
    return this.usersService.updateMe(user.email, updateUserDto);
  }

  @Delete('me')
  removeMe(@Req() req: any) {
    const user = req['user']
    return this.usersService.removeMe(user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.updateRole(+id, updateUserDto);
  }
}