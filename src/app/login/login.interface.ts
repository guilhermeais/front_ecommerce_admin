export interface LoginResponse {
  "authToken": string,
  "user": {
    "id": string,
    "email": string,
    "name": string,
    "cpf": string,
    "phone": string,
    "address": {
      "cep": string,
      "address": string,
      "number": string,
      "state": string,
      "city": string
    },
    "role": string,
    "isConfirmed": boolean
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}
