import { Injectable, NotFoundException } from '@nestjs/common';
import { AnimalsRepository } from './animals.repository.js';
import { CreateAnimalDto } from './dto/create-animal.dto.js';
import { UpdateAnimalDto } from './dto/update-animal.dto.js';

@Injectable()
export class AnimalsService {
  constructor(private animalsRepository: AnimalsRepository) { }


  async findAll(page: number, limit: number, especieId?: number, status?: string) {
    const filters: any = {};


    if (especieId) {
      filters.race = { speciesId: Number(especieId) };
    }
    if (status) {
      filters.status = status;
    }

    const result = await this.animalsRepository.findAll(page, limit, filters);

    return {
      data: result.data,
      meta: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      },
    };
  }

  async findOne(id: number) {
    const animal = await this.animalsRepository.findById(id);
    if (!animal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado`);
    }
    return animal;
  }

  async findByShelter(shelterId: number) {
    return this.animalsRepository.findByShelterId(shelterId);
  }

  async create(data: CreateAnimalDto) {
    return this.animalsRepository.create({
      name: data.nome,
      sex: data.sexo,
      birthday: new Date(data.dataNascimento),
      description: data.descricao,
      raceId: data.racaId,
      shelterId: data.shelterId || null,
      status: 'DISPONIVEL',
    });
  }
  async update(id: number, data: UpdateAnimalDto) {
    await this.findOne(id);

    const updateData: any = {};
    if (data.nome) updateData.name = data.nome;
    if (data.sexo) updateData.sex = data.sexo;
    if (data.dataNascimento) updateData.birthday = new Date(data.dataNascimento);
    if (data.descricao) updateData.description = data.descricao;
    if (data.racaId) updateData.raceId = data.racaId;

    return this.animalsRepository.update(id, updateData);
  }


  async updateStatus(id: number, status: string) {
    await this.findOne(id);
    return this.animalsRepository.update(id, { status });
  }
  async remove(id: number) {
    await this.findOne(id);
    await this.animalsRepository.delete(id);
    return { message: 'Animal removido com sucesso' };
  }
  async uploadImage(id: number, file: any) {
    await this.findOne(id);

    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;

    return this.animalsRepository.addImage(id, imageUrl);
  }
}