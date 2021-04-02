import { format, parseISO } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';
import api from '../../../../services/api';
import { IOptions, IUsers, IDebit, IReturn } from './index.d';

export const useLoadOptions = (debitId?: string): IReturn => {
  const [options, setOptions] = useState<IOptions[]>([]);
  const [debit, setDebit] = useState<IDebit>();
  const [selectedOption, setSelectedOption] = useState<IOptions>(
    {} as IOptions,
  );

  const handleChangeSelect = useCallback(option => {
    setSelectedOption(option);
  }, []);

  useEffect(() => {
    const arrayUsuarios: IOptions[] = options;
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        json.forEach((j: IUsers) => {
          arrayUsuarios.push({ value: j.id, label: j.name });
        });
        setOptions(arrayUsuarios);
      })
      .then(() => {
        if (debitId) {
          api.get<IDebit>(`/debits/show/${debitId}`).then(response => {
            const debitFormatted = {
              ...response.data,
              date: format(parseISO(response.data.date), 'dd/MM/yyyy'),
              user: options.find(u => u.value === response.data.user_id),
            };
            setDebit(debitFormatted);

            const optSelected = {
              value: debitFormatted.user_id,
              label: debitFormatted?.user?.label,
            } as IOptions;
            setSelectedOption(optSelected);
          });
        }
      });
  }, [debit?.date, debit?.user_id, options, debitId]);

  return { options, selectedOption, handleChangeSelect, debit };
};
