import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Resultado = ({ route, navigation }) => {
  const nomeJogador = route?.params?.nomeJogador || 'Jogador Desconhecido'; 
  const [score, setScore] = useState(0);

  // Função para resetar a pontuação e reiniciar o jogo
  const restartGame = async () => {
    try {
      await AsyncStorage.removeItem(`@score_${nomeJogador}`);
      setScore(0); // Reseta a pontuação local
      Alert.alert("Jogo reiniciado!");
      navigation.navigate('Game'); // Navega de volta para a tela do jogo
    } catch (error) {
      console.error("Erro ao reiniciar o jogo!", error);
    }
  };

  useEffect(() => {
    const loadUserScore = async () => {
      try {
        const savedScore = await AsyncStorage.getItem(`@score_${nomeJogador}`);
        if (savedScore !== null) {
          setScore(Number(savedScore)); // Define o estado da pontuação com o valor salvo
        }
      } catch (error) {
        console.error("Erro ao carregar a pontuação", error);
      }
    };
  
    loadUserScore();
  }, [nomeJogador]);

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>{nomeJogador}, sua pontuação: {score}</Text>
      <Pressable style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]} onPress={restartGame}>
        <Text style={styles.texto3}>Resetar Jogo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scoreText: {
    fontSize: 20,
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#4b9e3d",
  },
  texto3: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#fffdff",
  },
});

export default Resultado;
