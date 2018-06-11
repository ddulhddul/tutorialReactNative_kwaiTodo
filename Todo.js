import React, { Component } from 'react'
import { Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'

const {width, height} = Dimensions.get("window")

export default class Todo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ""
  }
  render() {
    const {isCompleted, isEditing, toDoValue} = this.state
    const {text} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]} />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput 
              style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]} 
              value={toDoValue}
              multiline={true} 
              onChangeText={this._controlInput}
              returnKeyType={'done'}
              onBlur={this._finishEditing}
            />
          ) : (
            <Text style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}>{text}</Text>
          )}
        </View>
          {isEditing ? (
            <View style={styles.action}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>Check</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>Edit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
    )
  }
  _toggleComplete= () => {
    this.setState(prevState => {
      return ({
        isCompleted: !prevState.isCompleted
      })
    })
  }
  _startEditing= ()=>{
    const {text} = this.props;
    this.setState(prevState => {
      return ({
        isEditing: true,
        toDoValue: text
      })
    })
  }
  _finishEditing= ()=>{
    this.setState(prevState => {
      return ({
        isEditing: false
      })
    })
  }
  _controlInput= (text)=>{
    this.setState(prevState => {
      return ({
        toDoValue: text
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle: {
    width:30,
    height:30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  text: {
    fontWeight:  '600',
    fontSize: 20,
    marginVertical: 20
  },
  completedCircle: {
    borderColor: '#bbb'
  },
  uncompletedCircle: {
    borderColor: 'red'
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through'
  },
  uncompletedText: {
    color: 'black'
  },
  column: {
    flexDirection: "row",
    alignItems: 'center',
    // width: width/2,
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row'
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 15,
    // width: width/2,
  }
})