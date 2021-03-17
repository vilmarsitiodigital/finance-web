import React, { useEffect, useRef, useState, useCallback } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends NumberFormatProps {
  name: string;
  containerStyle?: React.CSSProperties;
}

const MaskFormat: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {error && (
        <Error title={error}>
          <FiAlertCircle color="c53030" size={20} />
        </Error>
      )}
      <NumberFormat
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        getInputRef={inputRef}
        {...rest}
      />
    </Container>
  );
};
export default MaskFormat;
