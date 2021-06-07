import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, Platform, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Input from '../../components/Input';
import QRCodeScanner from '../../components/QRCodeScanner';
import { api } from '../../services/api';
import { Button, Container, Form, KeyboardAvoidingViewStyled, Subtitle, Title } from './styles';

const CreateSensor: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  
  const submit = async () => {
    if(!name)
        return Alert.alert('Por favor, insira um nome. 😉');

    if(!code)
        return Alert.alert('Por favor, insira um código. 😉');

      try{
          await api.post("sensors", {
              code,
              name
          });
          Alert.alert('Cadastrado com sucesso. 🎉');
          navigation.navigate("Home");
      }catch(err){
        return Alert.alert('Erro ao cadastrar, verifique os dados ou tente novamente mais tarde. 😪');
      }
  }

  return <Container>
      <KeyboardAvoidingViewStyled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Form>
                <Title>
                    Cadastro de Sensor
                </Title>
                <Subtitle>
                    Escaneie o código QR do sensor
                </Subtitle>
                <Input 
                    state={name}
                    setState={setName}
                    placeholder="Nome do sensor"
                />


                <Input 
                    state={code}
                    setState={setCode}
                    placeholder="Código do sensor"
                    editable={false}
                />

                <QRCodeScanner
                    setState={setCode}
                />

                <Button
                    onPress={submit}
                >
                    <Text>
                        Cadastrar
                    </Text>
                </Button>
            </Form>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingViewStyled>
  </Container>;
}

export default CreateSensor;