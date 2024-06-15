export interface SearchSalesEvent {
    start_date: string;
    end_date: string;
}

export interface ItemSales {
    productId: string,
    productName: string,
    productImage: string,
    quantity: number,
    unitPrice: number
}

export interface Sales{
    id: string,
    items: ItemSales[],
    paymentMethod: string,
    paymentDetails: {
        customerKey: string
    },
    deliveryAddress: {
        cep: string,
        address: string,
        number: string,
        state: string,
        city: string
    },
    totalAmount: number,
    date: string
}

export interface SalesPage {
    page: number;
    total: number;
    currentPage: number;
    items: Sales[];
}
  