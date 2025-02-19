// src/metrics/metrics.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importa HttpModule desde @nestjs/axios
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [HttpModule], // Asegúrate de importar HttpModule desde @nestjs/axios
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
