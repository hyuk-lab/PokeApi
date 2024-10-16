import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/login';
import Game from './src/game';
import Resultado from './src/resultado';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" 
        component={Home}
    options={{
      title: '',
  }}   />
        <Stack.Screen name="Game" 
        component={Game}
        options={{
          title: '',
        }}
        />
        <Stack.Screen name="Resultado" component={Resultado}/>
      </Stack.Navigator>
    </NavigationContainer>
   
  );
};