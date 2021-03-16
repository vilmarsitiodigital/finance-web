import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import MaskFormat from '../../components/MaskFormat';
import Button from '../../components/Button';
import * as S from './styles';

interface DebitInFormData {
  user_id: number;
  reason: string;
  value: string;
  date: string;
}

interface Users {
  id: number;
  name: string;
}

interface IDebit {
  id: string;
  user_id: number;
  value: number;
  reason: string;
  date: string;
  user: Options | undefined;
}

interface Options {
  value: number;
  label: string;
}

interface DebitParams {
  id: string;
}

const Debit: React.FC = () => {
  const params = useParams<DebitParams>();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const [debit, setDebit] = useState<IDebit>();

  const [selectedOption, setSelectedOption] = useState(null);
  const handleChangeSelect = useCallback(e => {
    if (e) {
      setSelectedOption(e.value);
    } else {
      setSelectedOption(null);
    }
  }, []);

  const [options, setOptions] = useState<Options[]>([]);
  useEffect(() => {
    const arrayUsuarios: Options[] = options;
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        json.forEach((j: Users) => {
          arrayUsuarios.push({ value: j.id, label: j.name });
        });
        setOptions(arrayUsuarios);
      })
      .then(() => {
        if (params.id) {
          api
            .get<IDebit>(`/debits/show/${params.id}`)
            .then(response => {
              const debitFormatted = {
                ...response.data,
                user: options.find(u => u.value === response.data.user_id),
              };
              setDebit(debitFormatted);
            })
            .then(() => {
              // console.log(debit);
              if (debit?.date) {
                // setSelectedDate(format(parseISO(debit.date), 'dd/MM/yyyy'));
              }
              if (debit?.user_id) {
                // setSelectedOption(debit.user_id.toString());
              }
            });
        }
      });
  }, [debit?.date, debit?.user_id, options, params.id]);

  const handleSubmit = useCallback(
    async (data: DebitInFormData) => {
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
          user_id: Number(selectedOption),
          reason,
          value: valorFormatado,
          date,
        };

        if (params.id) {
          await api.put(`/debits/${params.id}`, formData);
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
    [addToast, history, params.id, selectedOption],
  );

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
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ reason: debit?.reason, value: debit?.value }}
          >
            <S.ContainerSelect isErrored={false}>
              <Select
                placeholder="Selecione um usuário"
                name="usuario_id"
                options={options}
                isClearable
                // value={selectedOption}
                onChange={handleChangeSelect}
              />
            </S.ContainerSelect>

            <Input name="reason" placeholder="Motivo" />
            <MaskFormat
              placeholder="Valor"
              thousandSeparator="."
              decimalSeparator=","
              prefix=""
              name="value"
              value={debit?.value}
            />
            <MaskFormat
              // value={selectedDate}
              placeholder="Data"
              format="##/##/####"
              name="date"
            />

            <Button type="submit">Salvar</Button>
          </Form>
        </S.AnimationContainer>
      </S.Content>
    </S.Container>
  );
};

export default Debit;
