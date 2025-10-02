import { Injectable } from '@nestjs/common';
import { CreateInstituicoeDto } from './dto/create-instituicoe.dto';
import { UpdateInstituicoeDto } from './dto/update-instituicoe.dto';

@Injectable()
export class InstituicoesService {
  create(createInstituicoeDto: CreateInstituicoeDto) {
    return 'This action adds a new instituicoe';
  }

  findAll() {
    return `This action returns all instituicoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instituicoe`;
  }

  update(id: number, updateInstituicoeDto: UpdateInstituicoeDto) {
    return `This action updates a #${id} instituicoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} instituicoe`;
  }
}
