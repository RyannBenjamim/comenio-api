export type MyProfile = {
  id: string;
  primeiroNome: string;
  sobrenome: string;
  bio: string | null;
  nickname: string | null;
  fotoPerfilUrl: string | null;
  aluno?: {
    turma?: {
      titulo: string;
    };
  } | null;
};