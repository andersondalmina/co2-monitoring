import React, { useState } from 'react';
import {Dimensions} from 'react-native';
import {LineChart as LineChartKit} from 'react-native-chart-kit';
import {IComponentLineChart} from './interface';
import Tooltip from './Tooltip';
const screenWidth = Dimensions.get('window').width;

const LineChart: React.FC<IComponentLineChart> = ({labels, data}) => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0, label: "" })

  const datasetLabels = Array(labels.length).fill('');
  datasetLabels[0] = labels[0];
  datasetLabels[Math.floor(labels.length / 2)] = labels[Math.floor(labels.length / 2)];
  datasetLabels[labels.length - 1] = labels[labels.length - 1];

  const chartConfig = {
    backgroundGradientFrom: '#312e38',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#312e38',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 196, 236, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const dataset = {
    labels: datasetLabels,
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(150, 125, 249, ${opacity})`, // optional
        strokeWidth: 5, // optional
      },
    ],
    legend: ['Medições'], // optional
  };

  return (
    <LineChartKit
      data={dataset}
      width={screenWidth}
      height={280}
      chartConfig={chartConfig}
      decorator={() => <Tooltip {...tooltipPos}/>}
      onDataPointClick={(data) => {
        let isSamePoint = (tooltipPos.x === data.x && tooltipPos.y === data.y)

        isSamePoint ? setTooltipPos((previousState) => {
        return { 
            ...previousState,
            visible: !previousState.visible
        }
        }) : setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true, label: labels[data.index] });
      }}
    />
  );
};

export default LineChart;
