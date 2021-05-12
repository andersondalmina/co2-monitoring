import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from "../../components/DateTimePicker";
import { format, addDays } from 'date-fns';
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
import { api } from '../../services/api';

interface IData{
  value: number;
  created_at: Date;
}

const Filter: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [chartData, setChartData] = useState<Array<number>>([]);
  const [labels, setLabels] = useState<Array<string>>([]);
  const [highestValue, setHighestValue] = useState<number>(0);
  const [highestValueLabel, setHighestValueLabel] = useState<string>('');

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

  async function getData(date: Date) {
    const response = await api.get(`measurement?date=${date}`);
    const data: Array<IData> = response.data;

    let dataChart: Array<number> = [];
    let dataLabels: Array<string> = [];
    data.forEach(d => { dataChart.push(d.value); dataLabels.push(new Date(d.created_at).toLocaleTimeString()) });

    setLabels(dataLabels);
    setChartData(dataChart);

    const maxValue = Math.max(...dataChart);
    setHighestValue(maxValue);
    setHighestValueLabel(dataLabels[dataChart.indexOf(maxValue)]);
  }

  useEffect(() => {
    const date = addDays(selectedDate, -1);
    getData(date);
  }, [selectedDate]);

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
          data={chartData}
          labels={labels}
        />
      </Content>
    </Container>
  );
}

export default Filter;