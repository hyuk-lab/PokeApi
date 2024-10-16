// Login.js
import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Image } from "react-native";
import logo from "../assets/Poke.png";

export default function Login({ navigation }) {
  const [nome, setNome] = useState("");

  const handleGame = () => {
    // Passa o nome para a tela do jogo
    navigation.navigate("Game", { nomeJogador: nome });
  };

  return (
    <View style={style.container}>
      <View style={style.div}>
        <Image source={logo} style={style.lg} />
      </View>
      <Text style={style.texto}>Bem Vindo!</Text>
      <View style={style.div1}>
        <TextInput
          style={style.legal}
          placeholder="Digite seu Nick"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <Pressable style={style.button} onPress={handleGame}>
        <Text style={style.texto3}>Iniciar</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },
  texto: {
    fontSize: 30,
    top: -150,
  },
  legal: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 85,
    display: 'flex',
    textAlign: 'center',
    borderColor: 'black',
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  texto3: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  lg: {
    display: "flex",
    width: 100,
    height: 100,
  },
});
