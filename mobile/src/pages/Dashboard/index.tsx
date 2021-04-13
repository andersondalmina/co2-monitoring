import React from 'react';

import { Container } from './styles';
import DashboardCard from '../../components/DashboardCard';
import LineChart from '../../components/LineChart';

const Dashboard: React.FC = () => {
  const highestValue = 99;
  const highestValueLabel = 'May';

  const lowestValue = 20;
  const lowestValueLabel = 'January';

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
      <LineChart
        data={[20, 45, 28, 80, 99, 43 , 43 , 43 , 43]}
        labels={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September']}
      />
    </Container>
  );
};

export default Dashboard;
