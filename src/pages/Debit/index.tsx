import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MaskFormat from '../../components/MaskFormat';
import { useLoadOptions, useSubmitForm } from './hooks';
import { IDebitParams } from './index.d';
import * as S from './styles';

const Debit: React.FC = () => {
  const params = useParams<IDebitParams>();
  const { options, selectedOption, handleChangeSelect, debit } = useLoadOptions(
    params.id,
  );
  const formRef = useRef<FormHandles>(null);
  const { handleSubmit } = useSubmitForm({
    formRef,
    selectedOption,
    debitId: params?.id,
  });

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
                {...('value' in selectedOption
                  ? { value: selectedOption }
                  : {})}
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
              {...(debit?.date ? { value: debit?.date } : {})}
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
