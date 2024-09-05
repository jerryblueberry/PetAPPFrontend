import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import DogImg from '../assets/images/DogNew1.png';
import CatImg from '../assets/images/CatNew1.png';
import BirdImg from '../assets/images/BirdNew1.png';

import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoriesPet = () => {
    const navigation  = useNavigation();
  const [petCategories, setPetCategories] = useState([
    { name: 'Dog', img: DogImg },
    { name: 'Cat', img: CatImg },
    { name: 'Bird', img: BirdImg },
    // { name: 'Others', img: OtherImg },
  ]);

  const handlePressCategory = ({ path }) => {
    navigation.navigate('category',{categories:path});
    // Alert.alert('Path', path);
    console.log('Path', path);
  };

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      {petCategories.map((category) => (
        <TouchableOpacity
          onPress={() => handlePressCategory({ path: category.name })}
        >
          <View
            style={{
              backgroundColor: '#7ce0e7',
              width: 81,
              height: 85,

              borderRadius: 40,

              paddingHorizontal: 1,
              paddingVertical: 8,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
              }}
            >
              <Image
                style={{
                  // marginTop:2,
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={category.img}
              />
            </View>
            <Text
              style={{
                position: 'absolute',
                bottom: 9,
                fontSize: 13,

                color: '#fcf5f7',
                fontWeight: 'bold',

                // color:'',
                paddingHorizontal: 4,
                paddingVertical: 2,
                letterSpacing: 0.7,
              }}
            >
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoriesPet;

const styles = StyleSheet.create({});
