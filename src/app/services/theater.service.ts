import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theater } from '../models/theater.model';
import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient) { }

  list(): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${environment.MS_CINEMA}/theaters`);
  }

  delete(id: number) {
    return this.http.delete<Theater>(`${environment.MS_CINEMA}/theaters/${id}`); 
  }

  view(id: number): Observable<Theater> {
    return this.http.get<Theater>(`${environment.MS_CINEMA}/theaters/${id}`);
  }

  create(theater: Theater): Observable<Theater> {
    return this.http.post<Theater>(`${environment.MS_CINEMA}/theaters`, theater);
  }
  
  update(theater: Theater): Observable<Theater> {
    return this.http.put<Theater>(`${environment.MS_CINEMA}/theaters/${theater.id}`, theater);
  }  
}  
