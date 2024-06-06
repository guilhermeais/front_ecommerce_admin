import {ResponseData} from "../@shared/interface/response-interface.data";
import {DefaultSearchOptions} from "../@shared/util/search";

export interface User {
  name: string,
  email: string,
  maritalStatus: string,
  role: string,
  address: {
    cep: string,
    address: string,
    number: string,
    state: string,
    city: string
  },
  isConfirmed: boolean
}

export interface UserInvites {
  createdAt: string,
  guestEmail: string,
  guestName: string,
  id: string,
  isExpired: boolean,
  sentBy: {
    address: {
      cep: string, 
      address: string, 
      number: string, 
      state: string, 
      city: string
    }
    cpf: string,
    email: string,
    id: string 
    isConfirmed: boolean
    name: string,
    phone: string,
    role: string,
  }
  status: string 
}

export interface UserInvitesResponse extends ResponseData<UserInvites> {}

export interface UserSearchOptions extends DefaultSearchOptions {}
