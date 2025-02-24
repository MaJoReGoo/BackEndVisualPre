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

@Auth(Role.USER) // Asegúrate de que este decorador esté funcionando y validando el acceso del rol correctamente
@Controller('visuals') // Ruta para los recursos 'visuals'
export class VisualController {
  constructor(private readonly visualService: VisualService) {}

  // Crear un nuevo recurso visual
  @Post()
  async create(
    @Body() createVisualDto: CreateVisualDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.visualService.create(createVisualDto, user); // Llama al servicio para crear un nuevo visual
  }

  // Obtener todos los recursos visuales
  @Get()
  async findAll() {
    return this.visualService.findAll(); // Llama al método findAll del servicio para obtener todos los visuales
  }

  // Obtener un recurso visual por su id
  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.visualService.findOne(id, user); // Llama al servicio para obtener un visual específico por id
  }

  // Actualizar un recurso visual por su id
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVisualDto: UpdateVisualDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.visualService.update(id, updateVisualDto, user); // Llama al servicio para actualizar el visual
  }

  // Eliminar un recurso visual por su id
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.visualService.remove(id, user); // Llama al servicio para eliminar un visual
  }
}
