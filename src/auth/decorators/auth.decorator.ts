import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';
import { Roles } from './Roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(rol: Role) {
  return applyDecorators(Roles(rol), UseGuards(AuthGuard, RolesGuard));
}
