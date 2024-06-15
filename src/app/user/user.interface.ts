import {ResponseData} from "../@shared/interface/response-interface.data";
import {PageInitOprionsProps} from "../@shared/util/pagination/paginator";

export interface User {
  id: string,
  email: string,
  name: string,
  cpf: string,
  phone: string,
  address: {
      cep: string,
      address: string,
      number: string,
      state: string,
      city: string,
  },
  role: string,
  isConfirmed: false
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

export interface UserSearchOptions extends PageInitOprionsProps {}
