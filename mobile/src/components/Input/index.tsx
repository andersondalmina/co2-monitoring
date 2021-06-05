import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { IComponentInput } from './interface';
import { InputStyled } from './styles';

const Input: React.FC<IComponentInput> = ({
    state,
    setState,
    onBlur,
    onFocus,
    onChangeText,
    placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    setIsFilled(!!state);

    if(onBlur)
        onBlur(e);
  };

  const handleInputChange = (e: string) => {
    setState(e);
    if(onChangeText)
        onChangeText(e);
  };

  const handleInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if(onFocus)
        onFocus(e);
  };

  return (
    <InputStyled 
        isFilled={isFilled}
        isFocused={isFocused}
        onBlur={handleInputBlur}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        placeholderTextColor="#f4ede8"
    />
  );
}

export default Input;