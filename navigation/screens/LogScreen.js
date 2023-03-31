import React, { Component } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { 
  View, 
  Text, 
  FlatList, 
  Image,
  TextInput, 
  StyleSheet,
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

  async componentDidMount() {
    const response = await fetch('https://pogoapi.net/api/v1/released_pokemon.json');
    const json = await response.json();

    this.setState({ pokemonList: Object.values(json) });

    // fetch('https://pogoapi.net/api/v1/released_pokemon.json')
    //   .then(response => response.json())
    //   .then(pokeList => {
    //     this.setState({ pokemonList: Object.values(pokeList) });
    //   });
  }

  render() {
    let filteredPokemon = [];

    if (typeof this.state.pokemonList[0] !== 'undefined') {
      filteredPokemon = this.state.pokemonList.filter(pokemon =>
      {
        return pokemon.name.toLowerCase().startsWith(this.state.searchText.toLowerCase());
      });
    }

    console.log(filteredPokemon);

    return (
      <View style={styles.container}>
        <View style={styles.sidePanel}>
          <Text style={styles.title}>Pokemon Details:</Text>
          <Text style={styles.text}>Select a Pokemon: </Text>
          <View style={styles.searchContainer}>
            <SearchableDropdown
              onItemSelect={(item) => {
                this.setState({ selectedPokemon: item });
              }}
              onTextChange={text => {
                this.setState({ searchText: text });
              }}
              itemStyle={{
                padding: 7.5,
                marginTop: 0,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={filteredPokemon}
              resetValue={false}
              textInputProps={
              {
                placeholder: "Search",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                }
              }
            }
              listProps={
                {
                  nestedScrollEnabled: false,
                }
              }
            />
            </View>
        </View>
        {/* <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Combat Power"
              // onChangeText={(text) => this.setState({cp: text})}
              value={this.state.cp}
          />
          <TextInput
              style={styles.input}
              placeholder="Location"
              // onChangeText={(text) => this.setState({location: text})}
              value={this.state.location}
          />
        </View> */}
        {/* <FlatList
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
        /> */}
        
        {/* <View>
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
        </View> */}
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
    fontSize: 27.5,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 17.5,
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
    marginTop: 12.5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: '20%',
    width: '75%'
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
