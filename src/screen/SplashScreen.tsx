import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {RootStackParams} from '../navigator/NavigatorGeneral';
import {PreguntasContext} from '../context/PreguntasContext';
import {GET_PREGUNTAS} from '../api/General';

type Props = NativeStackScreenProps<RootStackParams, 'SplashScreen'>;

export const SplashScreen = ({navigation}: Props) => {
  const {preguntas, setPreguntas} = useContext(PreguntasContext);
  const [isLoading, setIsLoading] = useState(false);

  const initPreguntas = async () => {
    try {
      setIsLoading(true);
      const {data} = await GET_PREGUNTAS();
      setPreguntas(data);
      console.log('***data: ', data);
      setIsLoading(false);
      navigation.replace('HomeScreen');
    } catch (error) {
      console.log('***Error: ', error);
      setIsLoading(false);
      //   Alert.alert('Error', (error as Error).message);
    }
  };

  useEffect(() => {
    initPreguntas();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#F6F6F6',
      }}>
      <View
        style={{
          display: 'flex',
          width: '100%',
          height: '60%',
        }}>
        <Image
          source={require('../assets/logo.jpg')}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          display: 'flex',
          width: '100%',
          height: '60%',
          alignItems: 'center',
          //   justifyContent: 'space-around',
          paddingTop: '10%',
        }}>
        <ActivityIndicator color="#003670" size={'large'} />
        {/* <Text
          style={{
            fontSize: 24,
            fontFamily: 'Roboto',
            textTransform: 'capitalize',
            textAlign: 'center',
          }}>
          Inserte aqui mensaje de felicitaciones
        </Text>

        <Button
          mode="contained"
          onPress={() => {
            navigation.replace('HomeScreen');
          }}
          contentStyle={{backgroundColor: '#003670'}}>
          <Text style={{color: 'white'}}>Volver</Text>
        </Button> */}
      </View>
    </View>
  );
};
