import { useCallback, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import api from '../../../../services/api';
import { IUseDebitLoad, IDebit, IUsers } from './index.d';

export const useLoadDebits = (id: number): IUseDebitLoad => {
  const [debits, setDebits] = useState<IDebit[]>([]);

  const handleSetDebitById = useCallback(
    debitId => {
      const newDebits = debits.filter(d => d.id !== debitId);
      setDebits(newDebits);
    },
    [debits],
  );

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(async (responseUsers: IUsers[]) => {
        const { data: responseDebits } = await api.get<IDebit[]>('/debits', {
          params: {
            user_id: id,
          },
        });

        const result = responseDebits.map(responseDebit => {
          return {
            ...responseDebit,
            date: format(parseISO(responseDebit.date), 'dd/MM/yyyy'),
            name: responseUsers.find(ru => ru.id === responseDebit.user_id)
              ?.name,
          };
        });
        setDebits(result);
      });
  }, [id]);
  return { data: debits, handleSetDebitById };
};
