import React, { Component } from 'react'
import { Dimensions, View, Text, TouchableOpacity, StyleSheet} from 'react-native'

const {width, height} = Dimensions.get("window")

export default class Todo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  }
  render() {
    const {isCompleted, isEditing} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]} />
          </TouchableOpacity>
          <Text style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}>Hello</Text>
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
    this.setState(prevState => {
      return ({
        isEditing: true
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
  }
})