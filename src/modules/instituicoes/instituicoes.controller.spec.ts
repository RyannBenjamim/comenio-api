import { Test, TestingModule } from '@nestjs/testing';
import { InstituicoesController } from './instituicoes.controller';
import { InstituicoesService } from './instituicoes.service';

describe('InstituicoesController', () => {
  let controller: InstituicoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstituicoesController],
      providers: [InstituicoesService],
    }).compile();

    controller = module.get<InstituicoesController>(InstituicoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
