import { forwardRef, Module } from '@nestjs/common';
import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { PostsModule } from '../../posts.module';
import { RespostasModule } from '../respostas/resposta.module';
import { CurtidasController } from './curtidas.controller';
import { CurtidasRepository } from './curtidas.repository';
import { CurtidasService } from './curtidas.service';

@Module({
  controllers: [CurtidasController],
  providers: [CurtidasRepository, CurtidasService],
  exports: [CurtidasService],
  imports: [
    UsuariosModule,
    forwardRef(() => PostsModule),
    RespostasModule
  ]
})
export class CurtidasModule {}