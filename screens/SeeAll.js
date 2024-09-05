import { ScrollView,FlatList,ActivityIndicator,Pressable, StyleSheet,TextInput, Text, Button,View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar';
import SearchScreen from './SearchScreen';
import _debounce from 'lodash/debounce';
import { useNavigation,useRoute } from '@react-navigation/native';
const SeeAll = () => {
  const route = useRoute();
  const {userLongitude,userLatitude} = route.params;
  
  // const api = "https://petservernew.onrender.com";
  const api = "http://10.0.2.2:8000";
    const navigation = useNavigation();
    const [posts,setPosts] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
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

      useEffect(() => {
        const fetchPosts = async() => {
            const response = await fetch(`${api}/products`);
            const data  = await response.json();
            if(response.ok){
                setPosts(data);

            }else{
                console.log("Error Fetching the data");
            }

        }
        fetchPosts();

      },[posts]);
    
      async function fetchData(query) {
        try {
          // const response = await axios.get(`https://jsonplaceholder.typicode.com/users?q=${query}`);
          const response = await fetch(`${api}/nearby/post/${userLongitude}/${userLatitude}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
      


  return (
    <View style = {{
        flex:1,
        // alignItems:'center',
        marginVertical:50,
        margin:10,
        // margin:10,
    }}>
      <Text style = {{
        fontSize:19,
        fontWeight:'bold',
        color:'gray',
      }}>Post Nearby You Results</Text>

      <View>
      
      <View>
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
           <View style={styles.resultItem} key={item.id} >
              <Text>{item.name}</Text>
              <Image source={{uri:`${api}/${item.image}`}} style = {{height:50,width:50}}/>
              
            </View>
              
            </Pressable>
           
          )}
        />):  <ScrollView showsVerticalScrollIndicator = {false} style = {{
          margin:10,
          marginBottom:100,

        }}>
      
            <View>
            {posts.map((post) => (
                <View style = {{
                  
                }}>
                <View style ={{
                 
                }} key  = {post._id}>
                <Image source = {{uri :`${api}/${post.image}`}} style = {{
                    height:250,
                }}/>
                <Text style = {{
                }}>{post.name}</Text>
               
                </View>
                
                </View>
                
            ))}
        </View>

     
      
        

        </ScrollView>}
      </View>
     
      
      </View>
    </View>
  )
}

export default SeeAll

const styles = StyleSheet.create({})