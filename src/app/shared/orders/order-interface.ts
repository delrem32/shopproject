export interface OrderInterface {
    _id?: string;
    order_date: Date;
    sum: number;
    cart: string[];
    status: "completed" | "active" | "canceled";
    delivery_to: string;
    delivery_address: string;
    delivery_date: Date;
    delivery_track: string;
    delivery_status: "bearbeitung" | "sendet" | "geliefert";
}
