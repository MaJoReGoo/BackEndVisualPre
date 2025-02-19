// src/metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MetricsService {
  constructor(private readonly httpService: HttpService) {}

  getMetrics(): Observable<any> {
    const url = 'http://192.168.1.190:9182/metrics'; // URL de las métricas

    console.log('Haciendo solicitud GET a:', url); // Log antes de la solicitud

    return this.httpService.get(url).pipe(
      map((response) => {
        console.log('Respuesta recibida:', response); // Imprimir toda la respuesta

        // Verificar que la respuesta está siendo recibida correctamente
        console.log('Datos de la respuesta:', response.data); // Imprimir solo los datos

        const metricsText = response.data as string; // Convierte la respuesta a tipo string
        const metricsJson = {};

        const lines = metricsText.split('\n');
        lines.forEach(line => {
          // Filtramos las líneas que contienen comentarios
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
        console.log(metricsJson['go_gc_gomemlimit_bytes']);
        
        //console.log('Métricas convertidas a JSON:', metricsJson); // Imprimir las métricas en formato JSON

        return metricsJson; // Devolver las métricas en formato JSON
      }),
    );
  }
}
