import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';

function CardComponent(props){
    const {ident, name, lastName} = props.appointment;
    return(
        <View>
            <Text style={styles.textListButton}>{ident}</Text>
            <Text style={styles.textListButton}>{name} {lastName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textListButton:{
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    }
  });

  export default CardComponent;