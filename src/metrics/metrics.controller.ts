// src/metrics/metrics.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getMetrics() {
    // Llamar al servicio y devolver la respuesta de métricas
    return this.metricsService.getMetrics();
  }
}
