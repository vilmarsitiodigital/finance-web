import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { IReturn, IProps, IDebitInFormData } from './index.d';

export const useSubmitForm = ({
  formRef,
  selectedOption,
  debitId,
}: IProps): IReturn => {
  const history = useHistory();
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: IDebitInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          reason: Yup.string().required('Motivo é obrigatório'),
          value: Yup.string().required('Valor é obrigatório'),
          date: Yup.string().required('Data é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        const { reason, value, date } = data;

        const valorFormatado = parseFloat(
          value.replace('.', '').replace(',', '.'),
        );

        const formData = {
          user_id: selectedOption.value,
          reason,
          value: valorFormatado,
          date,
        };

        if (debitId) {
          await api.put(`/debits/${debitId}`, formData);
        } else {
          await api.post('/debits', formData);
        }

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um error ao cadastrar o débito, cheque os campos.',
        });
      }
    },
    [addToast, debitId, formRef, history, selectedOption.value],
  );
  return { handleSubmit };
};
