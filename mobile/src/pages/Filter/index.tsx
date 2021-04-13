import React, { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from "../../components/DateTimePicker";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { 
  Content,
  Calendar,
  CalendarTitle,
  Container,
  DateSelectedTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText
 } from './styles';
import LineChart from '../../components/LineChart';
import DashboardCard from '../../components/DashboardCard';

const Filter: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const highestValue = 99;
  const highestValueLabel = 'May';

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((prevState) => !prevState);
  },[]);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    setShowDatePicker(Platform.OS === 'ios');
    date && setSelectedDate(date);
  }, []);

  const selectedDateAsText = useMemo(()=>{
    return format(selectedDate, "'Dia' dd 'de' MMMM",{
      locale: ptBR
    });
  },[selectedDate]);

  return (
    <Container>
      <Calendar>
          <CalendarTitle>Escolha a data</CalendarTitle>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker 
              value={selectedDate}
              onChange={handleDateChange}
            />
          )}
      </Calendar>
        <DateSelectedTitle>
          {selectedDateAsText}
        </DateSelectedTitle>

        <DashboardCard
          number={highestValue}
          title={'Maior Medição Registrada'}
          label={highestValueLabel}
          style={{padding: 60}}
        />
      <Content >
        <LineChart
          data={[20, 45, 28, 80, 99, 43]}
          labels={['January', 'February', 'March', 'April', 'May', 'June']}
        />
      </Content>
    </Container>
  );
}

export default Filter;