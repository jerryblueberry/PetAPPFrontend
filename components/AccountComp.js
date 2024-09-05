import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
const AccountComp = () => {

    //  can make it object with label and route as key
  const [data, setData] = useState([
    'Account Settings',
    'Reset Password',
    "My Pet Preference",
    
    'Terms & Conditions',
    'Adoption Applications',
    'My Profile',
  ]);
  console.log()
  return (
    <ScrollView showsVerticalScrollIndicator= {false} style = {{
        backgroundColor:'white',

    }}>
    {data.map((item,index) => (
        <View
      style={{
        // marginVertical: 30,
        marginHorizontal: 10,
      }}
    >
      <View key ={index}
        style={{
            flexDirection:'column',

          backgroundColor: 'white',
          paddingVertical: 20,
          paddingHorizontal:10,
        }}
      >
        <TouchableOpacity onPress={console.log("Clickesd")}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {item}
          </Text>
          <AntDesign style ={{
            position:'absolute',
            right:8,
          }} name="arrowright" size={20} />
        </TouchableOpacity>
      </View>
    </View>
    ))}
   

    </ScrollView>

  );
};

export default AccountComp;

const styles = StyleSheet.create({});
