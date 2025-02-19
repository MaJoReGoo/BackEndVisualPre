import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasurementType } from '../measurement-types/entities/measurement-type.entity';
import { MeasurementVisual } from '../measurementVisual/entities/measurement-visual.entity';

@Injectable()
export class MetricsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(MeasurementType)
    private measurementTypeRepository: Repository<MeasurementType>,
    @InjectRepository(MeasurementVisual)
    private measurementVisualRepository: Repository<MeasurementVisual>,
  ) {}

  getMetrics(): Observable<any> {
    const url = 'http://192.168.1.190:9182/metrics'; // URL de las métricas

    console.log('Haciendo solicitud GET a:', url);

    return this.httpService.get(url).pipe(
      catchError((error) => {
        console.error('Error al obtener métricas:', error);
        throw error; // Puedes devolver un objeto con error si lo prefieres
      }),
      switchMap(async (response) => {
        // Validación de la respuesta HTTP
        if (!response || !response.data) {
          console.error('Respuesta inválida:', response);
          throw new Error('Respuesta inválida');
        }

        console.log('Respuesta recibida:', response);

        const metricsText = response.data as string;
        const metricsJson: { [key: string]: number } = {};

        // Procesamiento de las métricas
        const lines = metricsText.split('\n');
        lines.forEach((line) => {
          if (line.startsWith('# HELP') || line.startsWith('# TYPE')) {
            return;
          }

          const parts = line.split(' ');

          if (parts.length === 2) {
            const metricName = parts[0];
            const value = parseFloat(parts[1]);
            metricsJson[metricName] = value;
          }
        });

        try {
          // Buscar el tipo de medición "Go GC Metrics"
          let measurementType = await this.measurementTypeRepository.findOne({
            where: { name: 'Go GC Metrics' },
          });

          // Si no lo encontramos, creamos uno nuevo por defecto
          if (!measurementType) {
            console.log('Tipo de medición no encontrado, creando uno por defecto...');
            measurementType = new MeasurementType();
            measurementType.name = 'Go GC Metrics';
            measurementType.metrics = {}; // Inicializamos el campo metrics vacío
            measurementType = await this.measurementTypeRepository.save(measurementType);
            console.log('Nuevo tipo de medición creado:', measurementType);
          }

          // Asignamos las métricas al campo JSON de MeasurementType
          measurementType.metrics = metricsJson;

          // Guardamos la entidad con las métricas actualizadas
          await this.measurementTypeRepository.save(measurementType);
          console.log('Métricas actualizadas en MeasurementType:', measurementType);

          // Devolvemos las métricas procesadas
          return metricsJson;
        } catch (error) {
          console.error('Error al guardar las métricas:', error);
          throw error; // Propagar el error si algo falla
        }
      }),
    );
  }
}
