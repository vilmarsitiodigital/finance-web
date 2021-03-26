export interface IUsers {
  id: number;
  name: string;
}

export interface IDebit {
  id: string;
  user_id: number;
  reason: string;
  value: number;
  date: string;
  name?: string;
}

export interface IUseDebitLoad {
  data: IDebit[];
  handleSetDebitById: (id: string) => void;
}
