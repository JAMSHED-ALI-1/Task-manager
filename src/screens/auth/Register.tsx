import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, KeyboardAvoidingView, StyleSheet } from 'react-native';
import CustomTextInput from '../../Lib/component/CustomInputText';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      showMessage({
        message: 'All fields are required!',
        type: 'danger',
      });
      return;
    }

    // Save user data to AsyncStorage
    try {
      const user = { name, email, password };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      showMessage({
        message: 'Registration Successful. Welcome!',
        type: 'success',
      });

      // Navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      showMessage({
        message: 'An error occurred while registering.',
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TODO-TASK MANAGER</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Register to your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomTextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            iconName="person"
            iconType="Ionicons"
          />

          <CustomTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            iconName="email"
            iconType="MaterialIcons"
            keyboardType="email-address"
          />

          <CustomTextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            iconName="lock1"
            iconType="AntDesign"
            secureTextEntry={true}
          />

          <View style={styles.spacer} />

          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>

          <Pressable style={styles.signInContainer} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>Already have an account? Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066b2',
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 70,
  },
  spacer: {
    marginTop: 60,
  },
  registerButton: {
    width: 200,
    backgroundColor: '#6699CC',
    padding: 15,
    borderRadius: 6,
    alignSelf: 'center',
  },
  registerButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInContainer: {
    marginTop: 15,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'gray',
  },
});

export default Register;
