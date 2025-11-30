import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';

@Injectable({
    providedIn: 'root'
})
export class FacturasService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
        'Authorization': `Bearer ${token}`
        });
    }

    getFacturas(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get(`${this.apiUrl}/v1/facturacion/listar`, { headers });
    }

    crearFactura(data: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/v1/facturacion/crear`, data, { headers });
    }

    eliminarFactura(data: {id: number}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/v1/facturacion/eliminar`, data, { headers });
    }

    actualizarEstado(data: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/v1/facturacion/actualizarEstado`, data, { headers });
    }

}
