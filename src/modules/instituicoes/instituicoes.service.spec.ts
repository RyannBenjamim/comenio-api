import { Test, TestingModule } from '@nestjs/testing';
import { InstituicoesService } from './instituicoes.service';

describe('InstituicoesService', () => {
  let service: InstituicoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstituicoesService],
    }).compile();

    service = module.get<InstituicoesService>(InstituicoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
