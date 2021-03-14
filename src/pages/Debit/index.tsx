import React, { useRef, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Select2 from '../../components/Select2';
import Button from '../../components/Button';
import * as S from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const Debit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          motivo: Yup.string().required('Motivo é obrigatório'),
          valor: Yup.string().required('Valor é obrigatório'),
          data: Yup.string().required('Data é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        // SALVAR AQUI

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
            'Ocorreu um error ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, history],
  );

  const options = [
    { value: '1', label: 'Chocolate' },
    { value: '2', label: 'Strawberry' },
    { value: '3', label: 'Vanilla' },
  ];

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <S.HeaderContent>
          <h1>
            <small>
              <Link to="/">
                <span>
                  <FiArrowLeft size={20} />
                </span>
              </Link>
            </small>
            Cadastro de Débito
          </h1>
        </S.HeaderContent>

        <S.AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select2
              labelSelected=""
              valueSelected=""
              options={options}
              name="user_id"
              placeholder="Usuário"
            />
            <Input name="motivo" placeholder="Motivo" />
            <Input name="valor" placeholder="Valor" />
            <Input name="data" placeholder="Data" />

            <Button type="submit">Salvar</Button>
          </Form>
        </S.AnimationContainer>
      </S.Content>
    </S.Container>
  );
};

export default Debit;
