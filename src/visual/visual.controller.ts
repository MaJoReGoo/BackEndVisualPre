import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from '../common/Decorators/active-user.decorator';
import { UpdateVisualDto } from './dto/update-visual.dto';
import { CreateVisualDto } from './dto/create-visual.dto';
import { VisualService } from './visual.service';

@Auth(Role.USER)
@Controller('visuals') // Ruta para los recursos 'visuals'
export class VisualController {
  constructor(private readonly visualService: VisualService) {}

  @Post()
  create(
    @Body() createVisualDto: CreateVisualDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.visualService.create(createVisualDto, user);
  }

  @Get()
  findAll() {
    return this.visualService.findAll(); // Llama al método findAll del servicio
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.visualService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateVisualDto: UpdateVisualDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.visualService.update(id, updateVisualDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.visualService.remove(id, user);
  }
}
