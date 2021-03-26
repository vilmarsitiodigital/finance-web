import { useCallback } from 'react';
import api from '../../../../services/api';
import { IProps, IReturn } from './index.d';

export const useDeleteDebits = ({ handleSetDebitById }: IProps): IReturn => {
  const handleDelete = useCallback(
    (user_id: number) => {
      api.delete(`/debits/all/${user_id}`);
      handleSetDebitById(user_id);
    },
    [handleSetDebitById],
  );
  return { handleDelete };
};
