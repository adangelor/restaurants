import React from "react";
import { StyleSheet, ScrollView, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import {useNavigation} from '@react-navigation/native'

export default function UserGuest() {
  const navigation = useNavigation();
  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require("../../assets/restaurant-logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>
        Consulta tu perfil en restaurantes!
      </Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, agrega tu restaurant favorito, vota
        por los ya agregados y comenta tu experiencia, la concha de la lora!
      </Text>
      <Button title="Ver tu perfil" buttonStyle={styles.button} onPress={() => navigation.navigate("login")}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30
  },
  image: { 
    height: 300, 
    width: "100%", 
    marginBottom: 10 },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
      textAlign:"justify",
      marginBottom:10,
      color:"#A65274"
  },
  button:{
      color:"#442484"
  }

});
