import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CardButton from '../../components/CardButton';
import Loader from '../../components/Loader';
import { api } from '../../services/api';
import { PinkText, TextDecorated } from '../Home/styles';
import { Container, ViewStyled } from './styles';

interface ISelectSensorRoute{
    nextScreen: 'Dashboard' | 'Filter';
}

interface IData{
    id: string;
    code: string;
    name: string;
    created_at: Date;
}

const SelectSensor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);
  const [sensors, setSensors] = useState<IData[]>([]);

  const route = useRoute();
  const navigation = useNavigation();
  const { nextScreen } = route.params as ISelectSensorRoute;

  const handleSelectSensor = (sensorCode: string) => {
    navigation.navigate(nextScreen, { sensorCode })
  }

  async function getSensors() {
    const response = await api.get(`sensors`);
    const data: Array<IData> = response.data;

    if(!data || data.length === 0){
        setNothingFound(true);
        return;
      }

    setSensors(data);
    setLoading(false);
  }

  useEffect(() => {
    getSensors();
  },[]);

  if(loading)
    return <Loader />
    
  return (
      <Container>
        {nothingFound ? (
          <CardButton
            title={'Não foram encontrados sensores'}
            label={'Tente cadastrar ao menos um sensor'}
            onPress={() => navigation.navigate("CreateSensor")}
          />
        ): (
          <View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 150}}>
              <TextDecorated>Cadastre um <PinkText>Sensor</PinkText></TextDecorated>
              <CardButton
                title="Cadastrar"
                label="sensor"
                onPress={() => navigation.navigate("CreateSensor")}
              ></CardButton>

            </View>
            <ViewStyled>
              <TextDecorated>Ou escolha um da lista</TextDecorated>
              <TextDecorated>abaixo</TextDecorated>
            </ViewStyled>
            <FlatList 
              data={sensors}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <CardButton 
                  title={item.name}
                  label={item.code}
                  onPress={() => handleSelectSensor(item.code)}
               />
              )}
              showsVerticalScrollIndicator={false}
            />

          </View>
        )}
      </Container>
  );
}

export default SelectSensor;