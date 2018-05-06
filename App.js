import React from 'react';
import {
  Dimensions,
  TextInput,
  StatusBar,
  Platform,
  ScrollView,

  StyleSheet,
  Text,
  View
} from 'react-native';
import Todo from './Todo'

const { height, width } = Dimensions.get("window")

export default class App extends React.Component {
  state = {
    newTodo: ''
  }
  render() {
    const { newTodo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.title}>ddulh's To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeHolder={"New To Do"}
            value={newTodo} 
            onChangeText={this._controlNewTodo}
            placeholderTextColor="#999"
            autoCorrect={false}
            returnKeyType={"done"}
          />
          <ScrollView>
            <Todo />
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewTodo = text => {
    this.setState({
      newTodo: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
    // justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '300',
    marginBottom: 30
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    marginBottom: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  }
});
