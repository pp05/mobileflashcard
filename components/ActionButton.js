import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { pink, white, gray } from '../utils/colors'

export default function ActionButton ({ children, onPress, style = {} , disabled}) {
  if(disabled){
    style = {...style, backgroundColor: gray}
  }
  return (
    <TouchableOpacity disabled= {disabled} style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: pink,
    margin: 10,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  buttonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})
