import { Injectable } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto.js';
import { UpdateShelterDto } from './dto/update-shelter.dto.js';

@Injectable()
export class ShelterService {
  create(createShelterDto: CreateShelterDto) {
    return 'This action adds a new shelter';
  }

  findAll() {
    return `This action returns all shelter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shelter`;
  }

  update(id: number, updateShelterDto: UpdateShelterDto) {
    return `This action updates a #${id} shelter`;
  }

  remove(id: number) {
    return `This action removes a #${id} shelter`;
  }
}
