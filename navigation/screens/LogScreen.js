import React, { Component } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { 
  View, 
  Text, 
  Image,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  TouchableOpacity
} from 'react-native';
import Checkbox from 'expo-checkbox'
import FindScreen from './FindScreen';
import { useNavigation } from '@react-navigation/native';

class LogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchComponent: false,
      pokemonList: [],
      selectedPokemon: null,
      cp: null,
      attackIV: null,
      defenseIV: null,
      hpIV: null,
      searchText: '',
      overThirty: false,
      isFocused: false,
      isBlurred: true,
      isPressed: false,
      navigation: props.navigation,
    };
  }

  async componentDidMount() {
    const response = await fetch('https://pogoapi.net/api/v1/released_pokemon.json');
    const json = await response.json();

    this.setState({ pokemonList: Object.values(json) });
  }

  logPokemon() {
    let description = "";

    if (!this.state.cp || !this.state.attackIV || !this.state.defenseIV || !this.state.hpIV) {
      description = "";
    } else {
      description = this.state.cp + " CP\n" + this.state.attackIV + " Attack IV\n"
        + this.state.defenseIV + " Defense IV\n" + this.state.hpIV + " HP IV\n";
    }

    marker = {
      name: this.state.selectedPokemon.name,
      description: description,
      latitude: 2,
      longitude: 3,
      id: this.state.selectedPokemon.id,
    }
    this.props.addMarker(marker)
  }




  render() {
    let filteredPokemon = [];

    if (typeof this.state.pokemonList[0] !== 'undefined') {
      filteredPokemon = this.state.pokemonList.filter(pokemon =>
      {
        return pokemon.name.toLowerCase().startsWith(this.state.searchText.toLowerCase());
      });
    }


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{zIndex: -10}}>
        <View style={styles.container}>
          <View>
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
                  borderRadius: 5
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140}}
                items={filteredPokemon}
                resetValue={false}
                onFocus={() => {
                  this.setState({ isFocused: true, isBlurred: false });
                }}
                onBlur={() => {
                  this.setState({ isFocused: false, isBlurred: true });
                }}
                textInputProps={
                  {
                    value: this.state.selectedPokemon ? this.state.selectedPokemon.name : null,
                    placeholder: "Search",
                    underlineColorAndroid: "transparent",
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#333',
                      borderRadius: 5,
                    },
                  }
              }
                modal={true}
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
            </View>
            <View style={styles.checkbox}>
              <Checkbox
                disabled={false}
                value={this.state.overThirty}
                onValueChange={(newValue) => this.setState({ overThirty: newValue })}
                marginTop={10}
                zIndex={1}
            />
            <Text style={{marginLeft: 8, marginTop: 9, zIndex: 1}}>Trainer Level 30+?</Text>
            </View>
          </View>
          
          <View style={[{marginTop: -55}, this.state.isFocused && styles.zIndexFocused, this.state.isBlurred && styles.zIndexBlurred]}>
            {this.state.overThirty && (
              <View>
                <Text style={styles.text}>Combat Power: </Text>
                <View style={{ flex: 'column'}}>
                  <TextInput
                      disabled={false}
                      editable={true}
                      style={styles.input}
                      placeholder="Combat Power"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        let editedText = parseInt(text.replace(/[^0-9]/g, '')).toString();
                        if (editedText === 'NaN') {
                          editedText = '';
                        }
                        this.setState({ cp: editedText });  
                        }}
                      value={this.state.cp}
                  />
                  <Text style={[{ marginTop: 10 }, styles.text]}>IVs: </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                      disabled={false}
                      editable={true}
                      style={styles.ivInput}
                      placeholder="Attack"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        let editedText = parseInt(text.replace(/[^0-9]/g, '')).toString();
                        if (editedText === 'NaN') {
                          editedText = '';
                        }
                        if (parseInt(editedText) > 15) {
                          editedText = '15';
                        }
                        this.setState({ attackIV: editedText });  
                        }}
                      value={this.state.attackIV}
                  />
                  <TextInput
                      disabled={false}
                      editable={true}
                      style={styles.ivInput}
                      placeholder="Defense"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        let editedText = parseInt(text.replace(/[^0-9]/g, '')).toString();
                        if (editedText === 'NaN') {
                          editedText = '';
                        }
                        if (parseInt(editedText) > 15) {
                          editedText = '15';
                        }
                        this.setState({ defenseIV: editedText });  
                        }}
                      value={this.state.defenseIV}
                  />
                  <TextInput
                      disabled={false}
                      editable={true}
                      style={styles.ivInput}
                      placeholder="HP"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        let editedText = parseInt(text.replace(/[^0-9]/g, '')).toString();
                        if (editedText === 'NaN') {
                          editedText = '';
                        }                        
                        if (parseInt(editedText) > 15) {
                          editedText = '15';
                        }
                        this.setState({ hpIV: editedText });  
                        }}
                      value={this.state.hpIV}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={{ zIndex: -2 }}>
            {this.state.selectedPokemon && (
              <View style={styles.selectedPokemonContainer}>
                <View style={{ flexDirection: 'row', marginTop: 10, alignContent: 'center' }}>
                  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={styles.selectedText}>{this.state.selectedPokemon.name}</Text>
                    <Image
                      style={styles.selectedImage}
                      source={{
                        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.selectedPokemon.id}.png`,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    {this.state.cp && this.state.overThirty && this.state.defenseIV
                      && this.state.attackIV && this.state.hpIV && (
                      <Text style={styles.cpIvText}>CP: {this.state.cp}</Text>
                    )}
                    {this.state.cp && this.state.overThirty && this.state.defenseIV
                      && this.state.attackIV && this.state.hpIV && (
                      <Text style={styles.cpIvText}>Attack IV: {this.state.attackIV}</Text>
                    )}
                    {this.state.cp && this.state.overThirty && this.state.defenseIV
                      && this.state.attackIV && this.state.hpIV && (
                      <Text style={styles.cpIvText}>Defense IV: {this.state.defenseIV}</Text>
                    )}
                    {this.state.cp && this.state.overThirty && this.state.defenseIV
                      && this.state.attackIV && this.state.hpIV && (
                      <Text style={styles.cpIvText}>HP IV: {this.state.hpIV}</Text>
                    )}    
                  </View>
                </View>
              </View>
            )}
            {((this.state.selectedPokemon && !this.state.overThirty) || (this.state.selectedPokemon
              && this.state.overThirty && this.state.cp && this.state.attackIV && this.state.defenseIV && this.state.hpIV))
              && (
              <TouchableOpacity 
              onPressIn={() => {
                this.state.isPressed = true;
              }}
              onPressOut={() => {
                this.state.isPressed = false;
              }}
                onPress={() => {
                  // FindScreen.createMarker(this.state.selectedPokemon.name, description);
                  // this.props.navigation.navigate("Find");
                  this.logPokemon();                  
              }}
              style={[styles.button, this.state.isPressed && styles.pressedButton]}
            >
              <Text style={styles.buttonText}>Log</Text>
            </TouchableOpacity>)}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  zIndexFocused: {
    zIndex: -10
  },
  zIndexBlurred: {
    zIndex: 10
  },
  cpIvText: {
    fontSize: 17.5,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginTop: 10
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
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
    zIndex: 1,
  },
  input: {
    width: '75%',
    height: 40,
    backgroundColor: '#FFF',
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10
  },
  ivInput: {
    width: '25%',
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
    height: '19%',
    width: '75%',
    zIndex: 100
  },
  searchButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5
  },
  selectedPokemonContainer: {
    marginTop: 15,
    alignItems: 'center',
    zIndex: 1
  },
  selectedImage: {
    width: 225,
    height: 225,
    borderRadius: 125,
    marginTop: -17.5,
    alignSelf: 'center',
  },
  selectedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressedButton: {
    backgroundColor: '#3E8E41',
  },
});

export default LogScreen;
