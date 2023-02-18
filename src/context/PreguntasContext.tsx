import React, {useEffect, useState} from 'react';
import {PreguntaData} from '../intefaces/preguntas.interface';

export const PreguntasContext = React.createContext(
  {} as {
    preguntas: PreguntaData[];
    setPreguntas: (value: PreguntaData[]) => void;
  },
);

export const PreguntasProvider = ({children}: any) => {
  const [preguntas, setPreguntas] = useState<PreguntaData[]>([]);

  useEffect(() => {}, []);

  return (
    <PreguntasContext.Provider
      value={{
        preguntas,
        setPreguntas,
      }}>
      {children}
    </PreguntasContext.Provider>
  );
};
