import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const navigation = useNavigation();
  // const api = "https://petservernew.onrender.com";
  const api = "http://10.0.2.2:8000";
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = _debounce(fetchData, 200); // Adjust the debounce delay as needed

  useEffect(() => {
    if (query.trim() !== '') {
      setLoading(true);
      debouncedSearch(query);
    } else {
      setLoading(false);
      setResults([]); // Clear the results when the search bar is empty
    }
  }, [query]);

  async function fetchData(query) {
    try {
      // const response = await axios.get(`https://jsonplaceholder.typicode.com/users?q=${query}`);
      const response = await fetch(`${api}/products/location/nepaltar/?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a search query"
        onChangeText={(text) => setQuery(text)}
        value={query}
      />
      <Button title="Search" onPress={() => debouncedSearch(query)} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : null}
      {query.trim() !== '' && !loading ? (
        <FlatList    
          data={results}
          keyExtractor={(item,index) => (item.id|| index).toString()}
          renderItem={({ item }) => (
            <Pressable 
            onPress={() => {
            navigation.navigate("Detail",{productId:item._id,userId:item.userId})
            
          }}
            
          >
           <View style={styles.resultItem}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
              
            </Pressable>
           
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:40,
  },
  input: {
    borderWidth: 11,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loadingIndicator: {
    marginTop: 10,
  },
});


//  bholi search bar lai home screen ma rakhne 