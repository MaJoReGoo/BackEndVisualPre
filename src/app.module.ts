import { Module } from '@nestjs/common';
import { VisualModule } from './visual/visual.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementTypesModule } from './measurement-types/measurement-types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    VisualModule,
    MeasurementTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
