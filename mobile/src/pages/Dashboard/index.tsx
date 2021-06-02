import React, { useEffect, useState } from 'react';

import { Container } from './styles';
import DashboardCard from '../../components/DashboardCard';
import LineChart from '../../components/LineChart';
import { api } from '../../services/api';
import Loader from '../../components/Loader';
import { useRoute } from '@react-navigation/native';

interface IData{
  value: number;
  date: Date;
}

interface IDashboardRoute{
  sensorCode: string;
}

const Dashboard: React.FC = () => {
  const route = useRoute();
  const { sensorCode } = route.params as IDashboardRoute;

  const [loading, setLoading] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);
  const [chartData, setChartData] = useState<Array<number>>([0]);
  const [labels, setLabels] = useState<Array<string>>([' ']);
  const [highestValue, setHighestValue] = useState<number>(0);
  const [highestValueLabel, setHighestValueLabel] = useState<string>('');
  const [lowestValue, setLowestValue] = useState<number>(0);
  const [lowestValueLabel, setLowestValueLabel] = useState<string>('');
  let timer = 0;

  async function getData() {
    const response = await api.get(`measurement?sensorCode=${sensorCode}`);
    const data: Array<IData> = response.data.measurements;

    if(loading)
      setLoading(false);
   
    if(!data || data.length === 0){
      setNothingFound(true);
      timer = window.setTimeout(() => {
        getData()
      }, 1000);
      return;
    }
      
    let dataChart: Array<number> = [];
    let dataLabels: Array<string> = [];
    data.forEach(d => { dataChart.push(d.value); dataLabels.push(new Date(d.date).toLocaleTimeString()) });

    setLabels(dataLabels);
    setChartData(dataChart);

    const maxValue = Math.max(...dataChart);
    const minValue = Math.min(...dataChart);
    setHighestValue(maxValue);
    setLowestValue(minValue);
    setHighestValueLabel(dataLabels[dataChart.indexOf(maxValue)]);
    setLowestValueLabel(dataLabels[dataChart.indexOf(minValue)]);

    setNothingFound(false);

    timer = window.setTimeout(() => {
      getData()
    }, 1000);
  }

  useEffect(() => {
    getData();
    return () => {
        clearTimeout(timer);
    }
  },[]);

  if(loading)
    return <Loader />

  if(nothingFound)
    return (
      <Container>
        <DashboardCard
          title={'Não foram encontrados valores'}
          label={'Tente novamente mais tarde'}
        />
      </Container>
    )

  return (
    <Container>
      <DashboardCard
        number={highestValue}
        title={'Maior Medição Registrada'}
        label={highestValueLabel}
      />
      <DashboardCard
        number={lowestValue}
        title={'Menor Medição Registrada'}
        label={lowestValueLabel}
      />
      {chartData.length > 0 && (
        <LineChart
          data={chartData}
          labels={labels}
        />
      )}
    </Container>
  );
};

export default Dashboard;
