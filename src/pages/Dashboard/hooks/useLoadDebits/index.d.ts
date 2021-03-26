export interface IUsers {
  id: number;
  name: string;
}

export interface IDebit {
  id: number;
  user_id: number;
  value: number;
  name: string;
}

export interface IUseDebitLoad {
  data: IDebit[];
  handleSetDebitById: (user_id: number) => void;
}
