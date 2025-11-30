import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';
// import { environment } from '../../enviroments/enviroments.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class clientesService {
    
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private router:Router) {}

    private getAuthHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
        'Authorization': `Bearer ${token}`
        });
    }

    getCliente(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get(`${this.apiUrl}/v1/clientes/getCliente`, { headers });
    }

    inactivar(data: {id: number, estado: number}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/v1/clientes/desactivarCliente`, data, { headers });
    }

    detalles(id_usuario: number): Observable<any>{
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}/v1/clientes/consultarCliente/${id_usuario}`, { headers });
    }

    editarCliente(data: {  id: number, tipo_documento: string, numero_documento: string, nombre: string, apellidos: string, email: string, telefono: string, direccion: string, }): Observable<any>{
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/v1/clientes/editarCliente`, data, { headers });
    }

    crearCliente(data: { tipo_documento: string, numero_documento: string, nombres: string, apellidos: string, email: string, telefono?: string, direccion?: string
        }): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/v1/clientes/crearCliente`, data, { headers });
    }


}