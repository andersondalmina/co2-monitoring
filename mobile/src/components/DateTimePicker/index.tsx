import React from 'react';
import IComponentDateTimePicker from './interface';
import { Container } from './styles';

const DateTimePicker: React.FC<IComponentDateTimePicker> = ({
    ...rest
}) => {
  return <Container mode="date" display="calendar" {...rest}/>;
}

export default DateTimePicker;