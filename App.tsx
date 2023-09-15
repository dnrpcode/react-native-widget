import React, {useState} from 'react';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {
  View,
  TextInput,
  StyleSheet,
  NativeModules,
  SafeAreaView,
  Text,
  Button,
  Platform,
  Alert,
} from 'react-native';

const group = 'group.widgetku';

const SharedStorage = NativeModules.SharedStorage;

const App = () => {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    try {
      if (Platform.OS === 'ios') {
        await SharedGroupPreferences.setItem('widgetKey', {text}, group);
      } else {
        const value = `${text} days`;
        SharedStorage.set(JSON.stringify({text: value}));
      }
      Alert.alert('Change value successfully!');
    } catch (error) {
      Alert.alert('Failed change value!');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Change Widget Value</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Enter the text to display..."
        />
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 20,
  },
});
