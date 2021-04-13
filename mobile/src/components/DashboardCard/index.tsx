import React from 'react';
import {IComponentDashboardCard} from './interface';
import {Container, Title, Label, Description} from './styles';

const DashboardCard: React.FC<IComponentDashboardCard> = ({
  title,
  label,
  number,
  style
}) => {
  return (
    <Container style={style}>
      <Title>{title}</Title>
      <Description>{number}</Description>
      <Label>{label}</Label>
    </Container>
  );
};

export default DashboardCard;
