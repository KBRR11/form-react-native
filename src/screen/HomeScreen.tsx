import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {PreguntaData, Respuesta} from '../intefaces/preguntas.interface';
import {GET_PREGUNTAS, POST_RESPUESTAS} from '../api/General';
import {
  RadioButton,
  Button,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';
import {PRIMARY_COLOR} from '../commos/keys';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigator/NavigatorGeneral';
import {PreguntasContext} from '../context/PreguntasContext';
import {lightFormat} from 'date-fns';
import {isEmpty} from 'lodash';

type Props = NativeStackScreenProps<RootStackParams, 'HomeScreen'>;

export const HomeScreen = ({navigation}: Props) => {
  // const [preguntas, setPreguntas] = useState<PreguntaData[]>([]);

  const {preguntas} = useContext(PreguntasContext);

  const [respuestas, setRespuestas] = useState<string[]>([]);

  // const [isLoading, setIsLoading] = useState(false);

  const [loadingAnswer, setLoadingAnswer] = useState(false);

  // const initPreguntas = async () => {
  //   try {
  //     setIsLoading(true);
  //     const {data} = await GET_PREGUNTAS();
  //     setPreguntas(data);
  //     console.log('***data: ', data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log('***Error: ', error);
  //     setIsLoading(false);
  //     Alert.alert('Error', (error as Error).message);
  //   }
  // };

  // useEffect(() => {
  //   initPreguntas();
  // }, []);

  const onChangeValue = (answer_id: string) => {
    try {
      const value = answer_id.split('.')[0];
      let newRespuestas = respuestas.filter(item => {
        const id = item.split('.')[0];
        return id !== value;
      });
      newRespuestas.push(answer_id);

      setRespuestas(newRespuestas);

      console.log('***newRespuestas', newRespuestas);
    } catch (error) {
      console.log('***Error onChangeValue: ', error);
      Alert.alert('Error', (error as Error).message);
    }
  };

  const onSubmit = async () => {
    if (!isEmpty(preguntas)) {
      if (preguntas.length > respuestas.length) {
        Alert.alert(
          'Atención',
          'Conteste todas las preguntas para finalizar el cuestionario.',
        );
      } else {
        try {
          setLoadingAnswer(true);
          const fechaActual = new Date();
          console.log('fechaActual: ', fechaActual);

          const request: Respuesta = {
            date: lightFormat(fechaActual, 'MM-dd-yyyy'),
            data: respuestas.sort().map(item => {
              const question_id = item.split('.')[0];
              return {
                question_id,
                answer_id: item,
              };
            }),
          };

          console.log('request: ', request);
          const resp = await POST_RESPUESTAS(request);
          console.log('resp: ', resp);

          Alert.alert(
            'Felicitaciones',
            'Ha finalizazo la encuesta con éxito. ¿Desea volver a realizar la encuesta?.',
            [
              {
                text: 'Si',
                onPress: () => {
                  setRespuestas([]);
                },
                style: 'default',
              },
              {
                text: 'No',
                onPress: () => {
                  // setRespuestas([]);
                  navigation.replace('FinalizadoScreen');
                },
                style: 'cancel',
              },
            ],
          );
          setLoadingAnswer(false);
        } catch (error) {
          console.log('****Error:', error);
          setLoadingAnswer(false);
          Alert.alert('Error', (error as Error).message);
        }
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View
            style={{
              height: '100%',
              display: 'flex',
              flexWrap: 'nowrap',
              flexDirection: 'column',
              alignItems: 'stretch',
              alignContent: 'stretch',
              justifyContent: 'center',
              width: '100%',
            }}>
            {/* {isLoading ? (
              <ActivityIndicator color="#003670" size={'large'} />
            ) : ( */}
            <>
              {!isEmpty(preguntas) &&
                preguntas.map((item, index) => {
                  return (
                    <View
                      style={{margin: '2%', display: 'flex', width: '100%'}}
                      key={item.question_id}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          marginHorizontal: '4%',
                        }}>
                        {item.question}
                      </Text>
                      <RadioButton.Group
                        onValueChange={value => onChangeValue(value)}
                        value={
                          respuestas.find(key =>
                            item.answers.some(id => id.answer_id === key),
                          ) || ''
                        }>
                        {item.answers.map(({answer, answer_id}) => {
                          return (
                            <RadioButton.Item
                              key={answer_id}
                              color="#003670"
                              label={answer}
                              value={answer_id}
                            />
                          );
                        })}
                      </RadioButton.Group>
                      {index < preguntas.length - 1 && (
                        <Divider style={{height: 3}} />
                      )}
                    </View>
                  );
                })}
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'flex-end',
                  paddingVertical: '4%',
                  paddingRight: '4%',
                }}>
                <Button
                  disabled={loadingAnswer}
                  mode="contained"
                  onPress={onSubmit}
                  contentStyle={{backgroundColor: '#003670'}}>
                  <Text style={{color: 'white'}}>Finalizar</Text>
                </Button>
              </View>
            </>
            {/* )} */}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
