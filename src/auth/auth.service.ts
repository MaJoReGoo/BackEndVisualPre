// En src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwService: JwtService,
  ) {}

  // Registro de usuario: Verificación por email
  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email); // Verificamos si el usuario existe por email
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser.id,  // Retornamos el ID generado por la base de datos
      name: newUser.name,
      email: newUser.email,
    };
  }

  // Inicio de sesión: Verificación por email y contraseña
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(email); // Buscamos por email
    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    const payload = { id: user.id, rol: user.rol };
    const token = await this.jwService.signAsync(payload);

    return {
      token,
      id: user.id,  // Retornamos el ID generado por la base de datos
    };
  }

  // Obtener perfil del usuario: Buscar por ID
  async profile({ id }: { id: number }) {
    return await this.usersService.findOne(id); // Asegúrate de que 'id' es de tipo 'number'
  }
}
