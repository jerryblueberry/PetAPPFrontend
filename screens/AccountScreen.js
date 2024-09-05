import { Pressable,Image, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native';
import React,{useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import AccountComp from '../components/AccountComp';

const AccountScreen = () => {

  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  // const handleLogout = () => {
  //   Alert.alert("Logout Logic left","Logout Left")
  // }
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('authToken');
      setUserId(null);
  
      Alert.alert("Successfully LoggedOut","Login Again");
      navigation.navigate('Login');
      
    } catch (error) {
      console.log('Error logging out', error);
    }
  };
  return (

    <View
      style={{
        flex: 1,
      
        flexDirection: 'column',
      
        backgroundColor:'white',
      }}
    >
      <View
        style={{
          marginVertical: 40,
          flex: 1.5,
          backgroundColor: '#ff6699',
          borderBottomRightRadius:40,
          borderBottomLeftRadius:40,
        }}
      >
      <View style = {{
        marginHorizontal:10,
        marginVertical:10,
        flexDirection:'row-reverse'
      }}>
      <TouchableOpacity onPress={handleLogout} style = {{
        flexDirection:'row',
        rowGap:20,
        alignItems:'center',
        backgroundColor:'white',
          padding:10,
          paddingHorizontal:20,
          borderRadius:20,
      }}>
      <MaterialIcons size = {25} color={'blue'} name='logout'/>
      <Text style = {{
          marginLeft:10,
          fontSize:16,
          fontWeight:'bold',
          letterSpacing:0.1,
          color:'blue',
        }}>Logout</Text>

      </TouchableOpacity>
      
      </View>
      <View style  ={{
          flexDirection:'row',
          justifyContent:'center',
      }}>
      <Image style = {{
        width:250,
        height:250,
      }} source= {{uri:"https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"}} />
        <Text>

        </Text>
      </View>
        
      </View>

      <View
        style={{
          flex: 2.1,
          backgroundColor: 'white',
        }}
      >
      <AccountComp/>
     
      
       
      </View>
      
      
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
