import { Test, TestingModule } from '@nestjs/testing';
import { ComunidadesController } from './comunidades.controller';
import { ComunidadesService } from './comunidades.service';

describe('ComunidadesController', () => {
  let controller: ComunidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComunidadesController],
      providers: [ComunidadesService],
    }).compile();

    controller = module.get<ComunidadesController>(ComunidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
