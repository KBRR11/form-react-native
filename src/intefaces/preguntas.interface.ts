export interface Preguntas {
  date: string;
  data: PreguntaData[];
}

export interface PreguntaData {
  question_id: string;
  question: string;
  answers: Answer[];
}

export interface Answer {
  answer_id: string;
  answer: string;
}

export interface Respuesta {
  date: string;
  data: RespuestaData[];
}

export interface RespuestaData {
  question_id: string;
  answer_id: string;
}
