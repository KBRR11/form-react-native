import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, Text, View} from 'react-native';
import {RootStackParams} from '../navigator/NavigatorGeneral';
import {Button} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParams, 'HomeScreen'>;

export const FinalizadoScreen = ({navigation}: Props) => {
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
          height: '40%',
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
          justifyContent: 'space-around',
          paddingTop: '10%',
        }}>
        <Text
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
            navigation.replace('SplashScreen');
          }}
          contentStyle={{backgroundColor: '#003670'}}>
          <Text style={{color: 'white'}}>Volver</Text>
        </Button>
      </View>
    </View>
  );
};
