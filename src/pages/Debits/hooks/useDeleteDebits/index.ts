import { useCallback } from 'react';
import api from '../../../../services/api';
import { IProps, IReturn } from './index.d';

export const useDeleteDebits = ({ handleSetDebitById }: IProps): IReturn => {
  const handleDelete = useCallback(
    (id: string) => {
      api.delete(`/debits/${id}`);
      handleSetDebitById(id);
    },
    [handleSetDebitById],
  );
  return { handleDelete };
};
