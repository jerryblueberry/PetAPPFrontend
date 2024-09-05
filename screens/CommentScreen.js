import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import PetMap from '../assets/images/petmap.png';
import Like from '../assets/images/dog.png';
import CommentFeed from '../assets/images/postcomment.png';
import Share from '../assets/images/share.png';
import { Button } from 'react-native-paper';
const CommentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // const api = "https://petservernew.onrender.com";
  const api = "http://10.0.2.2:8000";

  const { productId, userId } = route.params;
  const [comments, setComments] = useState([]);
  const [products, setProducts] = useState(null);
  const [commentTexts,setCommentTexts] = useState(''); 

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${api}/products/${productId}`);
        const data = await res.json();

        // Fetch the "postedBy" user information
        const userRes = await fetch(
          `${api}/user/${data.postedBy._id}`
        );
        const userData = await userRes.json();

        setProducts({ ...data, postedBy: userData }); // Merge user data into the product data
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetail();
  }, [productId]);
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${api}/comments/products/${productId}`
      );
      const data = await response.json();
      if (response.ok) {
        setComments(data);
      } else {
        console.log('Error Getting the Comments');
      }
    } catch (error) {
      console.log('Eroor Occurred ', error);
    }
  };
  useEffect(() => {
   
    fetchComments();
  }, [productId]);


    const handleSubmit = async() => {
        try {
            const res  = await fetch(`${api}/comment`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    productId,
                    userId,
                    comment:commentTexts,
                }),
            });
            if(res.status === 200 ){
                console.log('Comment Submitted Successfully');
                setCommentTexts('');
                fetchComments();
            }else{
                console.log("FAiled ")
            }
        } catch (error) {
            console.log("ERROR ",error);
            
        }
    }
  


 



  useLayoutEffect(() => {
    if (products) {
      navigation.setOptions({
        title: ` ${products.postedBy.name}'s post`,
      });
    }
  }, [products, navigation]);

//    function for the text to apper when clicked on chat

  return (
    <View>
      <ScrollView
        style={
          {
            // margin:10,
            // padding:10,
          }
        }
      >
        <View
          style={
            {
              // alignItems: 'center',
              // marginVertical: 20,
            }
          }
        >
          {products && (
            <View
              style={
                {
                  // alignItems: 'center',
                }
              }
            >
              {/*  for pet name and location */}
              <View
                style={{
                  // margin:10,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    lineHeight: 41,
                  }}
                >
                  {products.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 11,
                  }}
                >
                  <Image
                    source={PetMap}
                    style={
                      {
                        // width:40,
                        // height:40,
                      }
                    }
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      // letterSpacing:1,
                      // lineHeight:41,
                    }}
                  >
                    {/* {products.location} */}
                  </Text>
                </View>
              </View>
              {/*  for pet details  */}
              <View
                style={{
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  Details{' '}
                </Text>
                <Text
                  style={{
                    color: '#696969',
                  }}
                >
                  {products.description}
                </Text>

                <Text>PostedBy: {products.postedBy.name}</Text>
              </View>
              {/*  for the pet breed age  */}

              <View
                style={{
                  padding: 10,
                  margin: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#cccccc',
                    paddingLeft: 30,
                    paddingRight: 30,
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 17,
                      fontWeight: '500',
                    }}
                  >
                    Sex
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 19,
                      fontWeight: 'bold',
                    }}
                  >
                    Female
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#cccccc',
                    paddingLeft: 30,
                    paddingRight: 30,
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 17,
                      fontWeight: '500',
                    }}
                  >
                    Age
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 19,
                      fontWeight: 'bold',
                    }}
                  >
                    {products.age} Year
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#cccccc',
                    paddingLeft: 30,
                    paddingRight: 30,
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 17,
                      fontWeight: '500',
                    }}
                  >
                    Breed
                  </Text>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      color: 'black',
                      fontSize: 19,
                      fontWeight: 'bold',
                    }}
                  >
                    {products.breed}
                  </Text>
                </View>
              </View>
              <View>
                <Image
                  style={{
                    width: '100%',
                    height: 400,
                    //   borderRadius: 11,
                    objectFit: 'cover',
                    // borderBottomLeftRadius: 31,
                    // borderBottomRightRadius: 31,
                    //   resizeMode: 'cover',
                  }}
                  source={{ uri: `${api}/${products.image}` }}
                />
                {/*View for the like and comment section  */}

                <View
                  style={{
                    margin: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Pressable onPress={() => console.log('Like Pressed')}>
                      <Image
                        source={Like}
                        style={{
                          // width:50,
                          // height:50,
                          resizeMode: 'contain',
                        }}
                      />
                    </Pressable>
                    <Pressable style = {{
                      flexDirection:'row',
                      alignItems:'center',
                      gap:10,
                    }}
                     
                    >
                      <Image
                        source={CommentFeed}
                        style={{
                          // width:50,
                          // height:50,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text>({comments.length})</Text>
                    </Pressable>

                    <Pressable onPress={() => console.log('Share')}>
                      <Image
                        source={Share}
                        style={{
                          // width:50,
                          // height:50,
                          resizeMode: 'contain',
                        }}
                      />
                    </Pressable>
                  </View>
                 
                </View>
               
              </View>
              

              {/* chat */}
              {/* {userId !== products?.postedBy?._id ? (
                <View
                  style={{
                    backgroundColor: 'red',
                    padding: 10,
                    margin: 10,
                    borderRadius: 21,
                  }}
                >
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Chat', {
                        userId,
                        recepientId: products.postedBy._id,
                      })
                    }
                  >
                    <Image source={Message} />
                  </Pressable>
                </View>
              ) : null} */}
            </View>
            
          )}
          <Text
                  style={{
                    
                    borderBottomWidth: 2,
                    borderBottomColor:'gray',
                    marginVertical:-16,
                  }}
                ></Text>
        </View>
        {/*  for comment section */}
        <View
          style={{
            margin:10,
          }}
        >
          {comments.map((comment) => (
            <View  style = {{


            }}
            key={comment._id}>
            <View style = {{
                flexDirection:'row',
                alignItems:'center',
                gap:21,
                marginTop:21,
            }}>
            <Image source={{uri : `${api}/${comment.userId.image}`}} style  = {{
                width:40,
                height:40,
                borderRadius:50,
            }}/>
            <View >
            <Text style = {{
                fontWeight:'bold'
            }}>{comment.userId.name}</Text>
            
            <Text>{comment.comment}</Text>
            
            </View>
           
         
          
            </View>
          
            
             
              
            </View>
          ))}
        </View>
        <View>
        <TextInput multiline={true} value={commentTexts} style ={{
            height:120,
        }} onChangeText={(text) => setCommentTexts(text)} placeholder='Type your comment..'/>
        
        
      </View>
      <View style = {{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red',
        // padding:'10',
      }}>
      <Pressable onPress={handleSubmit}>
        <Text style = {{
           backgroundColor:'blue',
           padding:10,
           color:'#fff',
           fontSize:21,
        }}>Send</Text>

        </Pressable>
      </View>
      </ScrollView>
      
      
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({

});
