import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OrderInterface } from "./shared/orders/order-interface";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    private apiURL = "http://localhost:5000/orders";

    constructor(private http: HttpClient) {}

    getOrders(): Observable<OrderInterface[]> {
        return this.http.get<OrderInterface[]>(this.apiURL);
    }

    getSingleOrder(orderId: string): Observable<OrderInterface> {
        return this.http.get<OrderInterface>(`${this.apiURL}/${orderId}`);
    }

    createOrder(payload: OrderInterface): Observable<OrderInterface> {
        return this.http.post<OrderInterface>(this.apiURL, payload);
    }

    getOrdersByUser(id: string): Observable<OrderInterface[]> {
        return this.http.post<OrderInterface[]>(`${this.apiURL}/ordersByUser`, {
            delivery_to: id,
        });
    }
    updateOrder(orderId: string, payload): Observable<OrderInterface> {
        return this.http.put<OrderInterface>(`${this.apiURL}/${orderId}`, payload);
    }
}
