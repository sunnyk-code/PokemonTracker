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
      location: '',
      searchText: ''
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

  handleSearch = (text) => {
    this.setState({ searchText: text });
  }

  render() {
    const filteredPokemon = this.state.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    return (
      <View style={styles.container}>
        <View style={styles.sidePanel}>
            <Text style={styles.title}>Pokemon Details:</Text>
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
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={this.handleSearch}
                value={this.state.searchText}
              />
            </View>
        </View>
        <FlatList
          data={filteredPokemon}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
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
    backgroundColor: '#ECECEC',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start'
  },
  inputContainer: {
    marginTop: 20,
    alignSelf: 'flex-start'
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '10%'
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    color: '#333'
  },
  searchButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  pokemonContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: 20
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 3
  },
  
  pokemonName: {
    fontSize: 16,
    color: '#333'
  },
  selectedPokemonContainer: {
    flex: 1.5,
    marginTop: 20,
    marginLeft: 100,
    alignItems: 'center',
  },
  selectedImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 10
  },
  selectedPokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333'
  },
  selectedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333'
  }
});

export default LogScreen;
