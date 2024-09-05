// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
//   ScrollView,
//   Image
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const AddProductScreen = ({ navigation, route }) => {
//   // const api = "https://petservernew.onrender.com";
//   const api = "http://10.0.2.2:8000";

//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     breed: '',
//     age: '',
//     image: '',
//     weight: '',
//     location: '',
//     category:'',
//     postedBy: route.params.userId,
//   });

//   const pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: false,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         const formData = new FormData();
//         formData.append('imageFile', {
//           uri: result.uri,
//           name: 'image.jpg',
//           type: 'image/jpg',
//         });

//         formData.append('name', product.name);
//         formData.append('description', product.description);
//         formData.append('breed', product.breed);
//         formData.append('age', product.age);
//         formData.append('weight', product.weight);
//         formData.append('location', product.location);
//         formData.append('postedBy', product.postedBy);
//         formData.append('category', product.category);

//         setProduct({ ...product, image: result.uri });
//       }
//     } catch (error) {
//       console.error('Error picking image:', error);
//     }
//   };
 

//   const handleAddProduct = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('imageFile', {
//         uri: product.image,
//         name: 'image.jpg',
//         type: 'image/jpg',
//       });

//       formData.append('name', product.name);
//       formData.append('description', product.description);
//       formData.append('breed', product.breed);
//       formData.append('age', product.age);
//       formData.append('weight', product.weight);
//       formData.append('location', product.location);
//       formData.append('postedBy', product.postedBy);
//       formData.append('category', product.category);

//       const response = await fetch(`${api}/add`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         Alert.alert('Product added successfully');
//         navigation.navigate('Product',{refresh:true});
//       } else {
//         const errorData = await response.json();
//         Alert.alert('Failed to add product', errorData.error);
//       }
//     } catch (error) {
//       console.error('Error adding product:', error);
//       Alert.alert('Failed to add product', error.message);
//     }
//   };
  

//   const handleChange = (field, value) => {
//     setProduct({ ...product, [field]: value });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.label}>Name</Text>
//       <TextInput
//         style={styles.input}
//         value={product.name}
//         onChangeText={(text) => handleChange('name', text)}
//       />

//       <Text style={styles.label}>Description</Text>
//       <TextInput
//         style={styles.input}
//         value={product.description}
//         onChangeText={(text) => handleChange('description', text)}
//       />

//       <Text style={styles.label}>Breed</Text>
//       <TextInput
//         style={styles.input}
//         value={product.breed}
//         onChangeText={(text) => handleChange('breed', text)}
//       />

//       <Text style={styles.label}>Age</Text>
//       <TextInput
//         style={styles.input}
//         value={product.age}
//         onChangeText={(text) => handleChange('age', text)}
//       />

//       <Text style={styles.label}> Weight</Text>
//       <TextInput
//         style={styles.input}
//         value={product.weight}
//         onChangeText={(text) => handleChange('weight', text)}
//       />
//       <Text style={styles.label}> Location</Text>
//       <TextInput
//         style={styles.input}
//         value={product.location}
//         onChangeText={(text) => handleChange('location', text)}
//       />
//       <Text style={styles.label}>Product Category</Text>
//       <TextInput
//         style={styles.input}
//         value={product.category}
//         onChangeText={(text) => handleChange('category', text)}
//       />

// <Text style={styles.label}>Product Image</Text>
//       <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
//         <Text style={{ color: 'blue' }}>Select Image</Text>
//       </TouchableOpacity>
//       {product.image ? (
//         <Image source={{ uri: product.image }} style={styles.selectedImage} />
//       ) : null}

//       <TouchableOpacity
//         style={{
//           alignItems: 'center',
//         }}
//         onPress={handleAddProduct}
//       >
//         <Text
//           style={{
//             marginBottom: 60,
//             color: 'white',
//             backgroundColor: 'blue',
//             padding: 10,
//             paddingRight: 50,
//             paddingLeft: 50,
//             fontSize: 16,
//             fontWeight: 'bold',
//             borderRadius: 7,
//             alignItems: 'center',
//           }}
//         >
//           Add Product
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };
// //  left to do the userId section instead of manufacturere
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 15,
//   },
//   imagePicker: {
//     borderWidth: 1,
//     borderColor: 'blue',
//     padding: 10,
//     marginBottom: 15,
//   },
//   selectedImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 15,
//   },
// });

// export default AddProductScreen;



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

const AddProductScreen = ({ navigation, route }) => {
  const api = "http://10.0.2.2:8000";
  const userLongitude = route.params.userLongitude;
  const userLatitude = route.params.userLatitude;
  const userId = route.params.userId;

  const [product, setProduct] = useState({
    name: '',
    description: '',
    breed: '',
    age: '',
    image: '',
    weight: '',
    category:'',
    postedBy: userId,
    latitude: '',
    longitude:'' ,
    postType:'',
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setProduct({ ...product, image: result.uri });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('imageFile', {
        uri: product.image,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('breed', product.breed);
      formData.append('age', product.age);
      formData.append('weight', product.weight);
     
      formData.append('postedBy', product.postedBy);
      formData.append('postType', product.postType);
      formData.append('category', product.category);
      formData.append('longitude', selectedLocation.longitude);
      formData.append('latitude', selectedLocation.latitude);
   
      const response = await fetch(`${api}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Product added successfully');
        navigation.navigate('Product', { refresh: true });
      } else {
        const errorData = await response.json();
        Alert.alert('Failed to add product', errorData.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Failed to add product', error.message);
    }
  };

  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    setProduct({ ...product, latitude, longitude });
  };

  return (
    <ScrollView style={styles.container}>
       {/* <Text>Selected Location: {selectedLocation ? `Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}` : ''}</Text> */}
   
       <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={product.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={product.description}
        onChangeText={(text) => handleChange('description', text)}
      />

      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        value={product.breed}
        onChangeText={(text) => handleChange('breed', text)}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={product.age}
        onChangeText={(text) => handleChange('age', text)}
      />

      <Text style={styles.label}> Weight</Text>
      <TextInput
        style={styles.input}
        value={product.weight}
        onChangeText={(text) => handleChange('weight', text)}
      />
      <Text style={styles.label}> Post Type</Text>
      <TextInput
        style={styles.input}
        value={product.postTypr}
        onChangeText={(text) => handleChange('postType', text)}
      />
      <Text style={styles.label}>Product Category</Text>
      <TextInput
        style={styles.input}
        value={product.category}
        onChangeText={(text) => handleChange('category', text)}
      />

<Text style={styles.label}>Product Image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={{ color: 'blue' }}>Select Image</Text>
      </TouchableOpacity>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.selectedImage} />
      ) : null}

   
    
      <Text style={styles.label}>Location</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          onPress={handleMapPress}
          initialRegion={{
            latitude: userLatitude,
            longitude: userLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} title="Selected Location" />
          )}
        </MapView>
      </View>

      <TouchableOpacity
        style={{
          alignItems: 'center',
        }}
        onPress={handleAddProduct}
      >
        <Text
          style={{
            marginBottom: 60,
            color: 'white',
            backgroundColor: 'blue',
            padding: 10,
            paddingRight: 50,
            paddingLeft: 50,
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: 7,
            alignItems: 'center',
          }}
        >
          Add Product
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginBottom: 15,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  mapContainer: {
    height: 400,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  map: {
    flex: 1,
  },
});

export default AddProductScreen;
