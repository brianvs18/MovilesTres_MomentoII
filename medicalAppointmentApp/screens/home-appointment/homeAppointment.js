import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Image } from 'react-native';

function HomeAppointment({navigation}) {

  return (
    <View style={styles.container}>
        <Image source={require('../../assets/home.jpg')} style={styles.imageHome}></Image>
        <Text style={styles.textHome}>Sistema Asignacion de citas medicas</Text>
      <TouchableHighlight style={styles.homeButton} onPress = {()=> navigation.navigate('Crear')}>
          <Text style={styles.textHomeButton}>Crear cita</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.homeButton} onPress = {()=> navigation.navigate('Listar')}>
          <Text style={styles.textHomeButton}>Listar citas</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center'
  },
  homeButton:{
      backgroundColor: '#0ebee1',
      padding: 18,
      alignItems: 'center',
      width: Dimensions.get('screen').width*0.60,
      marginTop: 20,
      borderRadius: 30
  },
  textHomeButton:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16
  },
  listButton:{
    marginTop: 10,
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: Dimensions.get('screen').width*0.9
  },
  imageHome:{
      marginTop: 20,
      width: Dimensions.get('screen').width*0.90,
      height: Dimensions.get('screen').height*0.50
  },
  textHome:{
      marginTop:10,
      fontSize: 25,
      fontWeight: 'bold',
  }
});

export default HomeAppointment;