import { useField } from '@unform/core';
import React, { ButtonHTMLAttributes } from 'react';
import Select, { components } from 'react-select';
import * as S from './styles';

interface IOptions {
  value: string;
  label: string;
}

type SelectionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  options: IOptions[];
  valueSelected?: string;
  labelSelected?: string;
  containerStyle?: React.CSSProperties;
};

const Select2: React.FC<SelectionProps> = ({
  name,
  options,
  valueSelected,
  labelSelected,
  containerStyle = {},
  ...rest
}) => {
  const { error } = useField(name);

  const customStyles = {
    control(styles: any) {
      return { ...styles, border: 0, backgroundColor: '#ffffff', padding: 0 };
    },
  };

  const Placeholder = (props: any) => {
    return <components.Placeholder {...props} />;
  };

  const selectedValues = valueSelected
    ? { label: labelSelected, value: valueSelected }
    : null;

  return (
    <S.Container style={containerStyle} isErrored={!!error}>
      <Select
        styles={customStyles}
        defaultValue={selectedValues || null}
        components={{ Placeholder }}
        placeholder={`${rest.placeholder}`}
        name={name}
        options={options}
        isClearable
      />
    </S.Container>
  );
};

export default Select2;
