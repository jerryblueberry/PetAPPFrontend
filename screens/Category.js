import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    FlatList,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { useRoute, useNavigation } from '@react-navigation/native';
  
  const Category = () => {
    const [posts, setPosts] = useState([]);
    const api = 'http://10.0.2.2:8000';
  
    const route = useRoute();
    const navigation = useNavigation();
    const { categories } = route.params;
    const [txtChange, setTxtChange] = useState(categories);
    const [petCategories, setPetCategories] = useState([
      { name: 'Dog' },
      { name: 'Cat' },
      { name: 'Bird' },
    ]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
            const response = await fetch(`${api}/products/categories/${txtChange}`);
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
          console.log("data",data);
        } else {
            console.log("data length",data);
            setPosts();
           
           
          
        }
        } catch (error) {
            console.log("Error Occurred in fetching data",error);
        }
        
      };
      fetchPosts();
    }, [txtChange]);
  
    const handleCategoryPress = (pressedCategory) => {
      setTxtChange(pressedCategory);
    //   Alert.alert('Pressed', pressedCategory);
    };
  
    const renderCategoryButton = ({ item }) => (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.name)}
        style={styles.categoryButton}
      >
        <Text style={styles.categoryButtonText}>{item.name}</Text>
      </TouchableOpacity>
    );
  
    const renderProduct = ({ item }) => (
      <View style={styles.product}>
        <Text>{item.name}</Text>
        <Image
          source={{ uri: `${api}/${item.image}` }}
          style={styles.productImage}
        />
      </View>
    );
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Category: {categories}</Text>
          <FlatList
            data={petCategories}
            renderItem={renderCategoryButton}
            horizontal
            keyExtractor={(item) => item.name}
            style={styles.categoryList}
          />
        </View>
        <FlatList
          data={posts}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.productList}
        />
      </View>
    );
  };
  
  export default Category;
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 40,
      marginHorizontal: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      fontStyle: 'italic',
      fontSize: 21,
    },
    categoryList: {
      flexDirection: 'row',
    },
    categoryButton: {
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'red',
      marginHorizontal: 11,
      borderRadius: 20,
      backgroundColor: 'red',
      paddingHorizontal: 15,
      paddingVertical: 3,
    },
    categoryButtonText: {
      color: 'white',
      fontSize: 17,
    },
    productList: {
      marginTop: 20,
    },
    product: {
      marginBottom: 20,
    },
    productImage: {
      width: 100,
      height: 150,
    },
  });
  