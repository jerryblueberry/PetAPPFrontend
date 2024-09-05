

import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSearch(query);
  }, [query]);

  
  return (
    <View>
      <TextInput
        style={{
          marginHorizontal: 1,
          color:"gray",
          alignItems: 'center',
          borderWidth: 2,
          width: 200,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom:5,
          paddingTop:5,
          paddingVertical:1.1,
          borderColor:'#f7adc4',
          color:'#9c6fef',
          
          gap:20,
          paddingHorizontal:20,
          borderRadius: 10,
          fontSize:20,
          fontWeight: 'bold',
        }}
        placeholderTextColor={'gray'}
        placeholder=" 🕵🏻 Search..."
        onChangeText={(text) => setQuery(text)}
        value={query}
      />
    </View>
  );
};

export default SearchBar;

