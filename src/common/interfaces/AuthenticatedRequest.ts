import { Request } from 'express';
import { Cargo } from '@prisma/client';

type EmptyContext = {
  feedId?: undefined;
  comunidadeId?: undefined;
};

export type RequestContext =
  | { feedId: string; comunidadeId?: never }
  | { comunidadeId: string; feedId?: never }
  | EmptyContext;

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    instituicaoId: string;
    role: Cargo;
  };

  context?: RequestContext;
}
