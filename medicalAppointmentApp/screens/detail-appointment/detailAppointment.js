import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Alert, Image} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

function DetailAppointment({route, navigation}){
    const {id, ident, name, lastName, birthdate, city, neighborhood, cellPhone} = route.params.appointment;
    const deleteAppointment = async () =>{
        try {
            const response = await fetch('https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/deleteAppointment', {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            const json = await response.json();
            Alert.alert("Cita eliminada correctamente");
            navigation.goBack();
        } catch (error) {
            Alert.alert(error);
        }
    }
    const updateAppointment = () =>{
        navigation.navigate('Editar',{appointment: route.params.appointment});
    }
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/update.png')} style={styles.imageUpdate}></Image>
            <View style={styles.detailCard}>
                <Text style={styles.inputTextDetail}>Identificacion: {ident}</Text>
                <Text style={styles.inputTextDetail}>Nombre: {name}</Text>
                <Text style={styles.inputTextDetail}>Apellido: {lastName}</Text>
                <Text style={styles.inputTextDetail}>Fecha de nacimiento: {birthdate}</Text>
                <Text style={styles.inputTextDetail}>Ciudad: {city}</Text>
                <Text style={styles.inputTextDetail}>Barrio: {neighborhood}</Text>
                <Text style={styles.inputTextDetail}>Telefono: {cellPhone}</Text>
                <View style={styles.buttonsView}>
                    <TouchableHighlight style={styles.editButton}>
                        <Text style={styles.textButtons} onPress={updateAppointment}>Editar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.deleteButton}>
                        <Text style={styles.textButtons} onPress={deleteAppointment}>Eliminar</Text>
                    </TouchableHighlight>
                </View>                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',      
      alignItems: 'center',
    },
    detailCard:{
        padding: 10,
        borderColor: '#d5ced3',
        borderRadius: 5,
        borderWidth: 0.4,
        width: Dimensions.get('screen').width*0.9,
        marginTop: 10,
        backgroundColor: '#634cf5'
    },
    textButtons:{
        color: 'white',
        fontWeight: 'bold'
    },
    buttonsView:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    editButton:{
        backgroundColor: '#5feb2b',
        padding: 18,
        alignItems: 'center',
        width: Dimensions.get('screen').width*0.25,
        marginTop: 10,
        borderRadius: 7,
        marginBottom: 10
    },
    deleteButton:{
        backgroundColor: '#dd260c',
        padding: 18,
        alignItems: 'center',
        width: Dimensions.get('screen').width*0.25,
        marginTop: 10,
        borderRadius: 7,
        marginBottom: 10
    },
    imageUpdate:{
        marginTop: 20,
        width: Dimensions.get('screen').width*0.90,
        height: Dimensions.get('screen').height*0.35
    },
    inputTextDetail:{
        fontSize: 15,
        marginTop: 8,
        color: 'white',
        fontWeight: 'bold'
    }
  });

  export default DetailAppointment;