import { Sales } from "../sales.interface";

export const salesMock: Sales[] = [
    {
        id: "001",
        items: [
            {
                productId: "A100",
                productName: "Smartphone XYZ",
                productImage: "https://th.bing.com/th/id/R.aabbe09a5aa0ee6737113cca1b39271d?rik=afgL6D9q%2fE0z2Q&pid=ImgRaw&r=0",
                quantity: 1,
                unitPrice: 1200.00
            },
            {
                productId: "A101",
                productName: "Fone de Ouvido Bluetooth",
                productImage: "https://th.bing.com/th/id/R.72d857bb58844f0156cfd2d33cc160ef?rik=9SIDcImvdfHEfg&pid=ImgRaw&r=0",
                quantity: 2,
                unitPrice: 150.00
            }
        ],
        paymentMethod: "Credit Card",
        paymentDetails: {
            customerKey: "cust001"
        },
        deliveryAddress: {
            cep: "12345-678",
            address: "Rua das Flores",
            number: "123",
            state: "SP",
            city: "São Paulo"
        },
        totalAmount: 1500.00,
        date: "2024-06-10"
    },
    {
        id: "002",
        items: [
            {
                productId: "B200",
                productName: "Notebook ABC",
                productImage: "https://example.com/images/notebook_abc.jpg",
                quantity: 1,
                unitPrice: 3500.00
            }
        ],
        paymentMethod: "Debit Card",
        paymentDetails: {
            customerKey: "cust002"
        },
        deliveryAddress: {
            cep: "23456-789",
            address: "Avenida Central",
            number: "456",
            state: "RJ",
            city: "Rio de Janeiro"
        },
        totalAmount: 3500.00,
        date: "2024-06-11"
    },
    {
        id: "003",
        items: [
            {
                productId: "C300",
                productName: "Câmera Digital DEF",
                productImage: "https://example.com/images/camera_digital_def.jpg",
                quantity: 1,
                unitPrice: 2500.00
            },
            {
                productId: "C301",
                productName: "Cartão de Memória 64GB",
                productImage: "https://example.com/images/cartao_memoria_64gb.jpg",
                quantity: 2,
                unitPrice: 100.00
            }
        ],
        paymentMethod: "PayPal",
        paymentDetails: {
            customerKey: "cust003"
        },
        deliveryAddress: {
            cep: "34567-890",
            address: "Rua das Palmeiras",
            number: "789",
            state: "MG",
            city: "Belo Horizonte"
        },
        totalAmount: 2700.00,
        date: "2024-06-12"
    },
    {
        id: "004",
        items: [
            {
                productId: "D400",
                productName: "Tablet GHI",
                productImage: "https://example.com/images/tablet_ghi.jpg",
                quantity: 1,
                unitPrice: 1800.00
            },
            {
                productId: "D401",
                productName: "Capa para Tablet",
                productImage: "https://example.com/images/capa_tablet.jpg",
                quantity: 1,
                unitPrice: 100.00
            }
        ],
        paymentMethod: "Credit Card",
        paymentDetails: {
            customerKey: "cust004"
        },
        deliveryAddress: {
            cep: "45678-901",
            address: "Praça da Liberdade",
            number: "321",
            state: "RS",
            city: "Porto Alegre"
        },
        totalAmount: 1900.00,
        date: "2024-06-13"
    },
    {
        id: "005",
        items: [
            {
                productId: "E500",
                productName: "Smartwatch JKL",
                productImage: "https://example.com/images/smartwatch_jkl.jpg",
                quantity: 1,
                unitPrice: 800.00
            },
            {
                productId: "E501",
                productName: "Pulseira Adicional",
                productImage: "https://example.com/images/pulseira_adicional.jpg",
                quantity: 2,
                unitPrice: 50.00
            }
        ],
        paymentMethod: "Boleto",
        paymentDetails: {
            customerKey: "cust005"
        },
        deliveryAddress: {
            cep: "56789-012",
            address: "Avenida Paulista",
            number: "654",
            state: "SP",
            city: "São Paulo"
        },
        totalAmount: 900.00,
        date: "2024-06-14"
    }
]
