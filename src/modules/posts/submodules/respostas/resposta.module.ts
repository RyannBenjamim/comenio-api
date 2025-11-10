import { forwardRef, Module } from '@nestjs/common';
import { RespostasController } from './respostas.controller';
import { RespostasService } from './respostas.service';
import { RespostasRepository } from './respostas.repository';
import { UsuariosModule } from 'src/modules/usuarios/usuarios.module';
import { PostsModule } from '../../posts.module';

@Module({
  controllers: [RespostasController],
  providers: [RespostasService, RespostasRepository],
  exports: [RespostasService],
  imports: [
    UsuariosModule,
    forwardRef(() => PostsModule)
  ]
})
export class RespostasModule {}
