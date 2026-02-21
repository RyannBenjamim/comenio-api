import { RespostaResponseDto } from '../modules/respostas/dto/resposta-response.dto';
import { RespostaWithIncludes } from './respostas.includes';

export const toRespostaDto = (resposta: RespostaWithIncludes): RespostaResponseDto => ({
  id: resposta.id,
  conteudo: resposta.conteudo,
  fotoUrl: resposta.fotoUrl ?? null,
  userId: resposta.userId,
  createdAt: resposta.createdAt,
  updatedAt: resposta.updatedAt,

  autor: {
    primeiroNome: resposta.user.primeiroNome,
    nickname: resposta.user.nickname,
    fotoPerfilUrl: resposta.user.fotoPerfilUrl,
  },

  contexto: {
    postAutor: resposta.post
      ? {
          id: resposta.post.id,
          user: resposta.post.user ?? null,
        }
      : null,

    respostaPaiAutor: resposta.respostaPai
      ? {
          id: resposta.respostaPai.id,
          user: resposta.respostaPai.user ?? null,
        }
      : null,

    comunidade: resposta.comunidade ?? null,
    feed: resposta.feed ?? null,
  },
});

