import { Usuario } from "@prisma/client";

export const sanitizeUser = (user: Usuario): Omit<Usuario, 'senha'> => {
  const { senha, ...safeUser } = user;
  return safeUser;
}
