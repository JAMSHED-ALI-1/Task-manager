import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  iconName: string;
  iconType: 'Ionicons' | 'MaterialIcons' | 'AntDesign';
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  iconName,
  iconType,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  // Create a map to get the icon component
  const iconMap: Record<string, React.ComponentType<any>> = {
    Ionicons,
    MaterialIcons,
    AntDesign,
  };

  // Get the correct icon component
  const IconComponent = iconMap[iconType] || null;

  return (
    <View style={styles.inputContainer}>
      {IconComponent && <IconComponent name={iconName} size={24} color="gray" />}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
    paddingLeft: 8,
  },
  input: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
    fontSize: 17,
    marginLeft: 8,
  },
});

export default CustomTextInput;
