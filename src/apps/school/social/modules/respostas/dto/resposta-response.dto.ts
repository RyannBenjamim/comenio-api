export interface RespostaAutorDto {
  primeiroNome: string;
  nickname: string;
  fotoPerfilUrl: string | null;
}

export interface RespostaUsuarioReferenciaDto {
  id: string;
  nickname: string;
}

export interface RespostaComunidadeDto {
  id: string;
  titulo: string;
}

export interface RespostaFeedDto {
  id: string;
  titulo: string;
}

export interface RespostaContextoDto {
  postAutor: {
    id: string;
    user: RespostaUsuarioReferenciaDto | null;
  } | null;
  respostaPaiAutor: {
    id: string;
    user: RespostaUsuarioReferenciaDto | null;
  } | null;
  comunidade: RespostaComunidadeDto | null;
  feed: RespostaFeedDto | null;
}

export interface RespostaResponseDto {
  id: string;
  conteudo: string;
  fotoUrl: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  autor: RespostaAutorDto;
  contexto: RespostaContextoDto;
}
