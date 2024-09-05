import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as Location from 'expo-location';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const api = "http://10.0.2.2:8000";

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location,setLocation] = useState(null); //For the  georeversing long and lat to find the place name

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow location access to proceed.');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } catch (error) {
        console.error('Error obtaining location:', error);
        Alert.alert('Error', 'Failed to obtain location.');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('imageFile', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpg',
      });
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const response = await axios.post(`${api}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert("Registration Successfully","OHOOO!!");
        navigation.navigate('Login');
      } else {
        console.log("Error:", response.data);
        Alert.alert('Registration Failed', 'Failed to register user.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Registration Failed', 'An error occurred while registering.',error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Pick an image from gallery"
        onPress={pickImage}
        color="#007AFF"
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 18,
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 9,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RegisterScreen;
