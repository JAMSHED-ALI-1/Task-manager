import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigation from './src/navigation/StackNavigation'
import FlashMessage from 'react-native-flash-message'

const App:React.FC = () => {
  return (
  <>
  <StackNavigation/>
  <FlashMessage position="top" />
  </>
  )
}

export default App

const styles = StyleSheet.create({})