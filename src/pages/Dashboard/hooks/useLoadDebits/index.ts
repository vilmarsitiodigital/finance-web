import { useCallback, useEffect, useState } from 'react';
import api from '../../../../services/api';
import { IUseDebitLoad, IDebit, IUsers } from './index.d';

export const useLoadDebits = (): IUseDebitLoad => {
  const [debits, setDebits] = useState<IDebit[]>([]);

  const handleSetDebitById = useCallback(
    user_id => {
      const newDebits = debits.filter(d => d.user_id !== user_id);
      setDebits(newDebits);
    },
    [debits],
  );

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(async (responseUsers: IUsers[]) => {
        const { data: responseDebits } = await api.get<IDebit[]>('/debits');
        const ids: number[] = [];
        const result: IDebit[] = [];

        responseDebits.forEach(({ user_id, value }) => {
          if (user_id) {
            const idSelecionado = ids.indexOf(user_id);
            if (!result[idSelecionado]) {
              ids.push(user_id);
              const user = responseUsers.find(({ id }) => id === user_id);
              if (user) {
                result.push({
                  id: user?.id,
                  user_id,
                  value,
                  name: user.name,
                });
              }
            } else {
              result[idSelecionado].value += value;
            }
          }
        });
        setDebits(result);
      });
  }, []);
  return { data: debits, handleSetDebitById };
};
