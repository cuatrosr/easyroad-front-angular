import { environment } from 'src/environments/environment';
import { Observable, firstValueFrom, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`).pipe(
      switchMap((projects) => {
        const projectPromises = projects.map(async (project) => {
          const response = await firstValueFrom(
            this.http.get(`${this.baseUrl}/projects/image/${project.image}`, { responseType: 'arraybuffer' }),
          );
          if (response) {
            const blob = new Blob([response], { type: 'image/jpeg' });
            const image = URL.createObjectURL(blob);
            return { ...project, image };
          }
          return project;
        });
        return from(Promise.all(projectPromises));
      }),
    );
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`);
  }
}
