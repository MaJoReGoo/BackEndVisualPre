import { Module } from '@nestjs/common';
import { VisualModule } from './visual/visual.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementTypesModule } from './measurement-types/measurement-types.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Berhlan12345678',
      database: 'db_Visualpre',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    VisualModule,
    MeasurementTypesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
