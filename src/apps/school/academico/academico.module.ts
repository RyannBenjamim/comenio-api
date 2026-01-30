import { Module } from '@nestjs/common';
import { AulasModule } from './aulas/aulas.module';
import { MateriasModule } from './materias/materias.module';
import { TurmasModule } from './turmas/turmas.module';

@Module({
  imports: [
    AulasModule,
    MateriasModule,
    TurmasModule
  ]
})
export class AcademicoModule {}