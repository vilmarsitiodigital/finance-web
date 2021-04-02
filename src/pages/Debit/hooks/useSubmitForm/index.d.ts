import { FormHandles } from '@unform/core';

export interface IOptions {
  value?: number;
  label?: string;
}

export interface IProps {
  formRef: React.RefObject<FormHandles>;
  selectedOption: IOptions;
  debitId?: string;
}

interface IDebitInFormData {
  user_id: number;
  reason: string;
  value: string;
  date: string;
}

export interface IReturn {
  handleSubmit: (data: IDebitInFormData) => void;
}
