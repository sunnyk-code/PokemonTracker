import React, { Component } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image,
  TextInput, 
  StyleSheet 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

class LogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      selectedPokemon: null,
      cp: '',
      location: ''
    };
  }

  componentDidMount() {
    // fetch the list of pokemon from the API and set the state
    fetch('https://pokeapi.co/api/v2/pokemon?limit=779')
      .then(response => response.json())
      .then(data => {
        this.setState({
          pokemonList: data.results,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sidePanel}>
            <Text style={styles.title}>Select a Pokemon:</Text>
            <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="Combat Power"
                onChangeText={(text) => this.setState({cp: text})}
                value={this.state.cp}
            />
            <TextInput 
                style={styles.input}
                placeholder="Location"
                onChangeText={(text) => this.setState({location: text})}
                value={this.state.location}
            />
            </View>
        </View>
        <FlatList
          data={this.state.pokemonList}
          renderItem={({ item }) => (
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`,
                }}
              />
              <Text
                style={styles.text}
                onPress={() => this.setState({ selectedPokemon: item })}
              >
                {item.name}
              </Text>
            </View>
          )}
          keyExtractor={item => item.name}
        />
        
        <View>
        {this.state.selectedPokemon && (
          <View style={styles.selectedPokemon}>
            <Image
              style={styles.selectedImage}
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.selectedPokemon.url.split('/')[6]}.png`,
              }}
            />
            <Text style={styles.selectedText}>{this.state.selectedPokemon.name}</Text>
          </View>
        )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F8F8F8',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  sidePanel: {
    width: '30%',
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20
  },
  input: {
    width: '48%',
    height: 40,
    backgroundColor: '#FFF',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  listItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  image: {
    width: 50, 
    height: 50,
    marginRight: 10
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  selectedPokemon: {
    marginTop: 20,
    alignItems: 'center',
    display: 'flex'
  },
  selectedImage: {
    width: 150, 
    height: 150,
    marginBottom: 10,
    borderRadius: 75
  },
  selectedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333'
  },
  logButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  logButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});


export default LogScreen;
