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
import { AppLoading } from 'expo'
import Todo from './Todo'
import uuidv1 from 'uuid/v1'

const { height, width } = Dimensions.get("window")

export default class App extends React.Component {
  state = {
    newTodo: '',
    loadedTodos: false
  }
  componentDidMount = () => {
    this._loadTodos()
  }
  render() {
    const { newTodo, loadedTodos } = this.state;
    if(!loadedTodos){
      return <AppLoading />
    }
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
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <Todo text={'Hello Todo'} />
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
  _loadTodos = () => {
    this.setState({
      loadedTodos : true
    })
  }
  _addTodo = () => {
    const {newTodo} = this.state;
    if(newTodo !== ''){
      this.setState(prevState => {
        const ID = uuidv1()
        const newTodoObject = {
          [ID] : {
            id : ID,
            isCompeted : false,
            text : newTodo,
            createdAt : Date.now()
          }
        }

        const newState = {
          ...prevState,
          newTodo : '',
          toDos : {
            ...prevState.toDos,
            ...newTodoObject
          }
        }

        return { ...newState }

      })
    }
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
  },
  toDos: {
    alignItems: 'center'
  }
});
