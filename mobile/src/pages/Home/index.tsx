import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import {
  Container,
  TextDecorated,
  PinkText,
  Description,
  ButtonsContainer,
  DashboardButton,
  DashboardButtonText,
  FilterButton,
  FilterButtonText
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const navigateToDashboard = () => {
    navigation.navigate('SelectSensor', { nextScreen: 'Dashboard' });
  };
  const navigateToFilter = () => {
    navigation.navigate('SelectSensor', { nextScreen: 'Filter' });
  };
  return (
    <Container>
      <TextDecorated>Seja bem vindo ao <PinkText>AndSam!</PinkText></TextDecorated>
      <Description>Selecione uma das opções abaixo para verificar suas medições</Description>
      <ButtonsContainer>
        <FilterButton onPress={navigateToFilter}>
          <Feather name="filter" size={32} color="#312e38" />
          <FilterButtonText>Filtro</FilterButtonText>
        </FilterButton>
        <DashboardButton onPress={navigateToDashboard}>
          <MaterialCommunityIcons name="view-dashboard-outline" size={32} color="#312e38" />
          <DashboardButtonText>Dashboard</DashboardButtonText>
        </DashboardButton>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
