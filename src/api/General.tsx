import {Preguntas, Respuesta} from '../intefaces/preguntas.interface';
import {API} from './API';

export const GET_PREGUNTAS = async () => {
  const response = await API.get<Preguntas>('questions');
  return response.data;
};

export const POST_RESPUESTAS = async (data: Respuesta) => {
  const response = await API.post<any>('answer', data);
  return response.data;
};
