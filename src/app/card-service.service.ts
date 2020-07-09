import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { CardInterface } from "./shared/cards/card-interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CardServiceService {
    private apiURL = "http://localhost:5000/cards";

    constructor(private http: HttpClient) {}

    getCards(): Observable<CardInterface[]> {
        return this.http.get<CardInterface[]>(this.apiURL);
    }

    getSingleCard(id: string): Observable<CardInterface> {
        return this.http.get<CardInterface>(`${this.apiURL}/${id}`);
    }

    createCard(payload: CardInterface): Observable<CardInterface> {
        return this.http.post<CardInterface>(this.apiURL, payload);
    }

    updateCard(id: string, payload: CardInterface): Observable<CardInterface> {
        return this.http.put<CardInterface>(`${this.apiURL}/${id}`, payload);
    }

    deleteCard(id: string): Observable<CardInterface> {
        return this.http.delete<CardInterface>(`${this.apiURL}/${id}`);
    }
}
