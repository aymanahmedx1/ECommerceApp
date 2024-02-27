import { Cart } from "./product";

export interface Order {
    shippingAddress:   ShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: string;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              User;
    cartItems:         Cart[];
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
    paidAt?:           Date;
}

export interface ShippingAddress {
    details: string;
    city:    string;
    phone:   string;
}
export interface User {
    _id:   string;
    name:  string;
    email: string;
    phone: string;
}