import React from 'react';
import {Text, View} from 'react-native';
import {NavigatorGeneral} from './src/navigator/NavigatorGeneral';
import {NavigationContainer} from '@react-navigation/native';
import { PreguntasProvider } from './src/context/PreguntasContext';
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <PreguntasProvider>
        <NavigatorGeneral />
      </PreguntasProvider>
    </NavigationContainer>
  );
}

export default App;
