export interface IOptions {
  value?: number;
  label?: string;
}

interface IUsers {
  id: number;
  name: string;
}

interface IDebit {
  id: string;
  user_id: number;
  value: number;
  reason: string;
  date: string;
  user?: IOptions;
}

export interface IReturn {
  options: IOptions[];
  selectedOption: IOptions;
  handleChangeSelect;
  debit?: IDebit;
}
