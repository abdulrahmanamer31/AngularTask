import { Injectable } from '@angular/core';
import{Icity} from '../Models/icity';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CityServices {
    baseUrl = 'http://localhost:3000/city';
    constructor(private httpClient: HttpClient) {
    }

    getCity(): Observable<Icity[]> {
        return this.httpClient.get<Icity[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
    }

    getCityData(id: number): Observable<Icity> {
        return this.httpClient.get<Icity>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    addEmployee(city: Icity): Observable<Icity> {
        return this.httpClient.post<Icity>(this.baseUrl, city, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(catchError(this.handleError));
    }

    updateEmployee(city: Icity): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${city.id}`, city, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
}