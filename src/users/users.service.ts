import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

// En src/users/users.service.ts
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un nuevo usuario
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // Buscar un usuario por su ID
  async findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  // Buscar un usuario por su email
  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  // Buscar un usuario por su email y devolver su password, id y rol
  async findOneByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'rol'], // Solo seleccionamos los campos que necesitamos
    });
  }

  // Obtener todos los usuarios
  findAll() {
    return this.userRepository.find();
  }

  // Buscar un usuario por su ID y devolver el usuario completo
  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  // Actualizar un usuario por su ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return 'User not found'; // Si no se encuentra el usuario
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  // Eliminar un usuario por su ID
  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return 'User not found'; // Si no se encuentra el usuario
    }
    return this.userRepository.remove(user);
  }
}
