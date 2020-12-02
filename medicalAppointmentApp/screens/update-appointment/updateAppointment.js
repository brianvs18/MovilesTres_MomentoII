import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableHighlight, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function UpdateAppointment({route, navigation}) {
    
    const [ident, setIdent] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const updateAppointment = async () =>{
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
              const response = await fetch('https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/updateAppointment', {
                  method: 'PUT',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      id: route.params.appointment.id,
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
              Alert.alert("Cita modificada correctamente");
              navigation.navigate('Listar');
          }
        } catch (error) {
            Alert.alert(error);
        }
    }
    useEffect(()=>{
        setIdent(route.params.appointment.ident);
        setName(route.params.appointment.name);
        setLastName(route.params.appointment.lastName);
        setBirthdate(route.params.appointment.birthdate);
        setCity(route.params.appointment.city);
        setNeighborhood(route.params.appointment.neighborhood);
        setCellPhone(route.params.appointment.cellPhone);
    },[]);

  return (
    <View style={styles.container}>
        <Image source={require('../../assets/updateAppointment.png')} style={styles.imageUpdate}></Image>
      <TextInput style = {styles.textInput} value={ident} onChangeText = {text => setIdent(text)} placeholder = "Identificacion"></TextInput>
      <TextInput style = {styles.textInput} value={name} onChangeText = {text => setName(text)} placeholder = "Nombre"></TextInput>
      <TextInput style = {styles.textInput} value={lastName} onChangeText = {text => setLastName(text)} placeholder = "Apellido"></TextInput>
      <TextInput style = {styles.textInput} value={birthdate} onChangeText = {text => setBirthdate(text)} placeholder = "Fecha de nacimiento"></TextInput>
      <TextInput style = {styles.textInput} value={city} onChangeText = {text => setCity(text)} placeholder = "Ciudad"></TextInput>
      <TextInput style = {styles.textInput} value={neighborhood} onChangeText = {text => setNeighborhood(text)} placeholder = "Barrio"></TextInput>
      <TextInput style = {styles.textInput} value={cellPhone} onChangeText = {text => setCellPhone(text)} placeholder = "Telefono"></TextInput>
      <TouchableHighlight style={styles.updateButton} onPress = {updateAppointment}>
          <Text style={styles.textUpdateButton}>Editar cita</Text>
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
  updateButton:{
    marginTop: 10,
    backgroundColor: '#5feb2b',
    padding: 18,
    alignItems: 'center',
    width: Dimensions.get('screen').width*0.9,
    borderRadius: 15
    },
    textUpdateButton:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
    },
    imageUpdate:{
        marginTop: 20,
        width: Dimensions.get('screen').width*0.70,
        height: Dimensions.get('screen').height*0.28
    }
});

export default UpdateAppointment;