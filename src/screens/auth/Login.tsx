import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, KeyboardAvoidingView, StyleSheet } from 'react-native';
import CustomTextInput from '../../Lib/component/CustomInputText';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        message: 'Please enter both email and password.',
        type: 'danger',
      });
      return;
    }

    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(user);

        if (email === storedEmail && password === storedPassword) {
          showMessage({
            message: 'Login Successful. Welcome back!',
            type: 'success',
          });
        
          navigation.navigate('Deshboard');
        } else {
          showMessage({
            message: 'Invalid email or password.',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'No user found. Please register first.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: 'An error occurred during login.',
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
          <Text style={styles.headerText}>Login to your account</Text>
        </View>

        <View style={styles.inputContainer}>
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

          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>

          <Pressable style={styles.registerContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Don't have an account? Register</Text>
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
  loginButton: {
    width: 200,
    backgroundColor: '#6699CC',
    padding: 15,
    borderRadius: 6,
    alignSelf: 'center',
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 15,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'gray',
  },
});

export default Login;
