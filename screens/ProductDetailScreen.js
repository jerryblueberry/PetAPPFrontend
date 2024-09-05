import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable, // Import Alert for showing login alerts
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Message from '../assets/images/chaticon.png';
import Back from '../assets/images/back.png';
import Share from '../assets/images/share.png';
import Love from '../assets/images/love.png';
import Heart from '../assets/images/heart.png';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const ProductDetailScreen = () => {
  // const api = "https://petservernew.onrender.com";
  const api = 'http://10.0.2.2:8000';
  const route = useRoute();
  const { productId, userId } = route.params;
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login
  const [interest,setInterest] = useState(false);
  

  useEffect(() => {
    // const fetchDetail = async () => {
    //   try {
    //     const res = await fetch(`http://10.0.2.2:8000/products/${productId}`);
    //     const data = await res.json();
    //     setProducts(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    console.log(api);
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${api}/products/${productId}`);
        const data = await res.json();

        // Fetch the "postedBy" user information
        const userRes = await fetch(`${api}/user/${data.postedBy._id}`);
        const userData = await userRes.json();

        setProducts({ ...data, postedBy: userData }); // Merge user data into the product data
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetail();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${api}/reviews/products/${productId}`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async () => {
    if (isLoggedIn) {
      // Check if the user is logged in, show an alert if not
      Alert.alert(
        'Login Required',
        'You must be logged in to submit a review.'
      );
      return;
    }

    try {
      const res = await fetch('${api}/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          userId,
          comment: reviewText,
          rating: 0,
        }),
      });

      if (res.status === 201) {
        console.log('Review submitted successfully');
        setReviewText('');
        fetchReviews();
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleInterest =() => {
    setInterest(!interest);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productInfo}>
        {products && (
          <View style={styles.productDetail}>
            <Image
              style={styles.productImage}
              source={{ uri: `${api}/${products.image}` }}
            />
            {/*  for back and interested button */}
            <View style = {{
              // flexDirection:"row",
              // alignItems:'center',
              position: 'relative',
                  bottom: 280,
                  // left: 20,
                  marginHorizontal:20,
            }}>
            <View style  = {{
              flexDirection:'row',
              justifyContent:'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Back}
                style={{
                  height: 30,
                  width: 30,
                
                }}
              />
            
              
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => console.log("LOCE")}>
              <Image  style  = {{
                backgroundColor:'red'
              }}source={Love} />

              </TouchableOpacity> */}

            </View>
           

            </View>
          

            <View
              style={{
                margin: 10,
                marginTop: 11,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 21,
                  fontWeight: 'bold',
                  color: '#6a8ad3',
                }}
              >
                {products.name}
              </Text>
              <Pressable
                onPress={() => console.log('Share later with the chat group')}
              >
                <Image source={Share} />
              </Pressable>
            </View>
            {/*  for bellow name section */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 11,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {products.age} Years
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Gender
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {products.breed}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {products.weight} KG
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text>{products.description}</Text>
            </View>

            {userId !== products?.postedBy?._id ? (
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
            ) : null}
          </View>
          
        )}
        <Pressable onPress={handleInterest} style= {{
          
        }}>
          {interest ? (  <Ionicons name="ios-heart-sharp" size={24} color="red" />)  : (<FontAwesome5 name="heart" size={24} color="black" />)}
         
          

          </Pressable>

          <Pressable onPress={navigation.navigate('maps')}>
            <Text style = {{
              fontSize:21,
            }}>HI</Text>
          </Pressable>
      </View>

      {/* <View style={styles.reviewSection}>
        <Text style={styles.reviewHeading}>Reviews:</Text>
        {reviews.map((review) => (
          <View key={review._id} style={styles.reviewItem}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
              source={{ uri: review.userId.image }}
            />
            <Text>Comment: {review.comment}</Text>
            <Text>Rating: {review.rating}</Text>
            <Text>{review.userId.name}</Text>
          </View>
        ))}
      </View> */}
      {/* 
      <View style={styles.inputSection}>
        <TextInput
          multiline={true}
          style={styles.reviewInput}
          value={reviewText}
          onChangeText={(text) => setReviewText(text)}
          placeholder="Write your review..."
        />
        

        {userId ? (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.replace('Login')}
            style={styles.loginSection}
          >
            <Text style={styles.loginText}>Login to submit a review</Text>
          </TouchableOpacity>
        )}
       
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    // padding: 20,
  },
  productInfo: {
    // alignItems: 'center',
    // marginVertical: 20,
  },
  productDetail: {
    // alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  reviewSection: {
    marginTop: 20,
  },
  reviewHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewItem: {
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },

  inputSection: {
    marginTop: 20, // Increase the marginTop for better separation
    alignItems: 'center', // Center the input and login message horizontally
  },
  reviewInput: {
    backgroundColor: '#e0ebeb',
    height: 90, // Adjust the height to your preference
    borderWidth: 1,
    borderColor: '#e0ebeb',
    padding: 10,
    color: 'black',
    width: '100%', // Set the width to 100% for full width
  },
  submitButton: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 60, // Increase the marginTop for better separation
  },
  submitButtonText: {
    backgroundColor: '#66a3ff',
    paddingRight: 50,
    paddingLeft: 50,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  loginSection: {
    marginTop: 20,
    marginBottom: 60, // Increase the marginTop for better separation
  },
  loginText: {
    color: 'white',
    // textDecorationLine: 'underline',
    backgroundColor: '#66a3ff',
    borderRadius: 7,
    padding: 10,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
