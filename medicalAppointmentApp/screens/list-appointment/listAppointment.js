import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, Dimensions, Image } from 'react-native';
import CardComponent from './card-component';
import {useIsFocused} from '@react-navigation/native';

function ListAppointment({navigation}) {
    const isFocused = useIsFocused();
    const [appointments, setAppointment] = useState([]);
    const listAppointment = async ()=> {
        let response = await fetch('https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/listAppoitment')
        let json = await response.json();
        setAppointment(json.appointment);
    }
    const detailAppointment = (item) =>{
        navigation.navigate('Detalle',{appointment: item});
    }
    useEffect(()=>{
        listAppointment();
    },[isFocused]);
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/viewList.png')} style={styles.imageHome}></Image>
      <FlatList
            data={appointments}
            renderItem = {({item}) => <TouchableHighlight onPress={()=> detailAppointment(item)} style = {styles.listButton}>
                <CardComponent appointment={item}/>
            </TouchableHighlight>}
            keyExtractor={item => item.id}
        ></FlatList>
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
  createButton:{
      backgroundColor: '#0ebee1',
      padding: 18,
      alignItems: 'center',
      width: Dimensions.get('screen').width*0.9,
      marginTop: 10,
      borderRadius: 7
  },
  textCreateButton:{
      color: 'white'
  },
  listButton:{
    marginTop: 10,
    padding: 30,
    borderColor: '#d5ced3',
    backgroundColor: '#37dee5',
    borderWidth: 0.5,
    borderRadius: 5,
    width: Dimensions.get('screen').width*0.9
  },
  imageHome:{
    marginTop: 20,
    width: Dimensions.get('screen').width*0.95,
    height: Dimensions.get('screen').height*0.25
    }
});

export default ListAppointment;