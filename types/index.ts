import { TransactionMethod, TransactionStatus } from './Enum';

export interface IUser {
    id: string;
    name: string;
    email: string;
  
    createdAt: Date;
    updatedAt: Date;
  }
  
export interface ITransaction {
  id: string;
  name: number;
  method: TransactionMethod;
  amount: number;
  status: TransactionStatus;

  createdAt: Date;
  updatedAt: Date;
}
