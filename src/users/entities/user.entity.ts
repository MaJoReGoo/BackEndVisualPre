import { Visual } from 'src/visual/entities/visual.entity';
import { Role } from '../../common/enums/role.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  rol: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Visual, (visual) => visual.user)
  visuals: Visual[];
}
