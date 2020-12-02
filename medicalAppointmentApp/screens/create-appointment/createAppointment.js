import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableHighlight, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function CreatAppointment({navigation}) {

    const [ident, setIdent] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const createAppointment = async () =>{
        try {
          if (ident == "" && name == "" && lastName == ""  && birthdate == "" && city == "" && neighborhood == "" && cellPhone == "") {
            Alert.alert("Todos los campos deben de estar diligenciados");
            }
            else if (ident == "") {
              Alert.alert("Por favor digite su identificación");
            }
            else if (isNaN(ident)) {
              Alert.alert("La identificacion debe ser numerica");
            }
            else if (ident.length < 5) {
              Alert.alert("Debe de contener mas de 5 numeros");
            }
            else if (name == "") {
                Alert.alert("Por favor ingrese un nombre");
            }
            else if (lastName == "") {
                Alert.alert("Por favor ingrese un apellido");
            }            
            else if (birthdate == "") {
                Alert.alert("Por favor ingrese su fecha de nacimiento");
            }
            else if (city == "") {
                Alert.alert("Por favor ingrese la ciudad");
            }
            else if (neighborhood == "") {
                Alert.alert("Por favor ingrese el barrio");
            }
            else if (cellPhone == "") {
                Alert.alert("El teléfono deben ser numeros");
            }
            else if (cellPhone.length < 7) {
                Alert.alert("Minimo 7 numeros");
            }else{
              const response = await fetch('https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/createAppointment', {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      ident: ident,
                      name: name,
                      lastName: lastName,
                      birthdate: birthdate,
                      city: city,
                      neighborhood: neighborhood,
                      cellPhone: cellPhone
                  })
              });
              const json = await response.json();
              Alert.alert("Cita creada correctamente");
              navigation.goBack();
            }
        } catch (error) {
            Alert.alert(error);
        }
    }

  return (
    <View style={styles.container}>
        <Image source={require('../../assets/newAppointment.jpg')} style={styles.imageNew}></Image>
      <TextInput style = {styles.textInput} onChangeText = {text => setIdent(text)} placeholder = "Identificacion"></TextInput>
      <TextInput style = {styles.textInput} onChangeText = {text => setName(text)} placeholder = "Nombre"></TextInput>
      <TextInput style = {styles.textInput} onChangeText = {text => setLastName(text)} placeholder = "Apellido"></TextInput>
      <TextInput style = {styles.textInput} onChangeText = {text => setBirthdate(text)} placeholder = "Fecha de nacimiento DD/MM/AA"></TextInput>
      <TextInput style = {styles.textInput} onChangeText = {text => setCity(text)} placeholder = "Ciudad"></TextInput>
      <TextInput style = {styles.textInput} onChangeText = {text => setNeighborhood(text)} placeholder = "Barrio"></TextInput>
      <TextInput style = {styles.textInput} onChangeText = {text => setCellPhone(text)} placeholder = "Telefono"></TextInput>
      <TouchableHighlight style={styles.createButton} onPress = {createAppointment}>
          <Text style={styles.textCreateButton}>Crear cita</Text>
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
  textInput:{
    marginTop: 10,
    padding: 15,
    borderColor: '#d5ced3',
    borderWidth: 1,
    borderRadius: 5,
    width: Dimensions.get('screen').width*0.9
  },
  createButton:{
      marginTop: 10,
    backgroundColor: '#0ebee1',
    padding: 18,
    alignItems: 'center',
    width: Dimensions.get('screen').width*0.9,
    borderRadius: 15
    },
    textCreateButton:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
    },
    imageNew:{
        marginTop: 20,
        width: Dimensions.get('screen').width*0.80,
        height: Dimensions.get('screen').height*0.20
    }
});

export default CreatAppointment;