import { applyDecorators, UseGuards } from '@nestjs/common';
import { Cargo } from '@prisma/client';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/role.guard';

export function AuthRoles(...roles: Cargo[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(RolesGuard),
  );
}
