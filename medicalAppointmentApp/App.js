import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListAppointment from './screens/list-appointment/listAppointment';
import CreatAppointment from './screens/create-appointment/createAppointment';
import DetailAppointment from './screens/detail-appointment/detailAppointment';
import UpdateAppointment from './screens/update-appointment/updateAppointment';
import HomeAppointment from './screens/home-appointment/homeAppointment';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeAppointment} />
        <Stack.Screen name="Listar" component={ListAppointment} />
        <Stack.Screen name="Crear" component={CreatAppointment} />
        <Stack.Screen name="Detalle" component={DetailAppointment} />
        <Stack.Screen name="Editar" component={UpdateAppointment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;