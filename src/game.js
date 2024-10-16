import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const PokemonGame = ({ route, navigation }) => {
  const { nomeJogador } = route.params; // Nome do jogador vindo da tela de login
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0); // Armazena a pontuação

  const handleResultado = () => {
    navigation.navigate('Resultado', {
      nomeJogador: nomeJogador, 
      score: score 
    });
  };

  useEffect(() => {
    fetchPokemon();
    loadUserScore(); // Carrega a pontuação ao iniciar o jogo
  }, []);

  // Função para carregar a pontuação do usuário armazenada localmente
  const loadUserScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem(`@score_${nomeJogador}`);
      if (storedScore !== null) {
        setScore(parseInt(storedScore)); // Define a pontuação
      }
    } catch (error) {
      console.error("Erro ao carregar a pontuação", error);
    }
  };

  // Função para salvar a pontuação do usuário localmente
  const saveUserScore = async (newScore) => {
    try {
      await AsyncStorage.setItem(`@score_${nomeJogador}`, newScore.toString());
      console.log("Pontuação salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a pontuação", error);
    }
  };

  // Função para deletar o "save" do jogador (resetar a pontuação)
 

  const getRandomId = () => Math.floor(Math.random() * 150) + 1;

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const randomId = getRandomId();
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const { name, sprites } = response.data;

      const wrongOptions = await fetchWrongOptions(name);
      const allOptions = shuffleArray([name, ...wrongOptions]);

      setPokemon({
        name: name,
        image: sprites.front_default,
      });
      setOptions(allOptions);
      setLoading(false);
      setCorrect(name);
    } catch (error) {
      console.error('Erro ao buscar o Pokémon', error);
      setLoading(false);
    }
  };

  const fetchWrongOptions = async (correctName) => {
    const wrongNames = [];
    while (wrongNames.length < 3) {
      const randomId = getRandomId();
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const name = response.data.name;
      if (name !== correctName && !wrongNames.includes(name)) {
        wrongNames.push(name);
      }
    }
    return wrongNames;
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === correct) {
      Alert.alert('Correto!', `Você acertou! O Pokémon é ${correct}.`);
      const newScore = score + 1; // Incrementa a pontuação
      setScore(newScore);
      saveUserScore(newScore); // Salva a pontuação localmente
    } else {
      Alert.alert('Errado!', `Resposta errada. O Pokémon era ${correct}.`);
    }

    // Próxima pergunta após 1 segundo
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    fetchPokemon();
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Jogador: {nomeJogador}</Text>
      <Text style={styles.title}>Qual é esse Pokémon?</Text>
      {pokemon && (
        <>
          <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Pressable style={styles.button} onPress={handleResultado}>
            <Text style={styles.texto3}>Mostrar Resultado</Text>
          </Pressable>
        </>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
  title1: {
    fontSize: 20,
    top: -40,
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

export default PokemonGame;
