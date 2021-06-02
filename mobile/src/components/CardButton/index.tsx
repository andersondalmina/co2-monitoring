import React from 'react';
import {IComponentCardButton} from './interface';
import {Container, Title, Label, Description} from './styles';

const CardButton: React.FC<IComponentCardButton> = ({
  title,
  label,
  number,
  onPress,
  style
}) => {
  return (
    <Container style={style} onPress={onPress}>
      <Title>{title}</Title>
      {number && (<Description>{number}</Description>)}
      <Label>{label}</Label>
    </Container>
  );
};

export default CardButton;
