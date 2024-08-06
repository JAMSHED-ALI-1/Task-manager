// Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Define types for props
interface HeaderProps {
  title: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode; 
}

const Header: React.FC<HeaderProps> = ({
  title,
  onLeftPress,
  onRightPress,
  leftIcon,
  rightIcon,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftButton} onPress={onLeftPress}>
        {leftIcon || <Text>Left</Text>} {/* Default left content */}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.rightButton} onPress={onRightPress}>
        {rightIcon || <Text>Right</Text>} {/* Default right content */}
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  } as ViewStyle,
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Center title
  } as TextStyle,
  leftButton: {
    padding: 10,
  } as ViewStyle,
  rightButton: {
    padding: 10,
  } as ViewStyle,
});

export default Header;
