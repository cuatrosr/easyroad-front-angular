import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdministracionService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${id}`).pipe(
      switchMap((project) => {
        return this.http.get(`${this.baseUrl}/projects/image/${project.image}`, { responseType: 'arraybuffer' }).pipe(
          map((response) => {
            const blob = new Blob([response], { type: 'image/jpeg' });
            const image = URL.createObjectURL(blob);
            return { ...project, image };
          }),
        );
      }),
    );
  }

  addProject(project: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`);
  }

  addPole(pole: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/poles`, pole);
  }

  getPoles(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/poles/project/${projectId}`);
  }

  getPoleBySerial(serial: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/poles/serial/${serial}`);
  }

  deletePole(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/poles/${id}`);
  }

  handleAlertPole(poleId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/poles/${poleId}`, { state: 'ok' });
  }

  getEvents(poles: any[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/events`).pipe(
      map((events) => {
        return events
          .filter((event: any) => poles.some((pole: any) => pole.serial === event.serial_dispositivo))
          .map((event: any) => ({
            _id: event._id,
            fecha: event.created,
            serial: event.serial_dispositivo,
            tipo_evento: event.tipo_evento,
            estado_evento: event.estado_evento,
          }));
      }),
    );
  }

  getAlerts(poles: any[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/events/alerts`).pipe(
      map((events) => {
        return events
          .filter((event: any) => poles.some((pole: any) => pole.serial === event.serial_dispositivo))
          .map((event: any) => ({
            _id: event._id,
            fecha: event.created,
            serial: event.serial_dispositivo,
            tipo_evento: event.tipo_evento,
            estado_evento: event.estado_evento,
          }));
      }),
    );
  }

  getHeartbeat(serial: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/heartbeat/${serial}`);
  }
}
