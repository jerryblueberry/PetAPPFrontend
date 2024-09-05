//  new debounced one
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import _debounce from 'lodash/debounce';
import Add from '../assets/images/add.png';
import Like from '../assets/images/dog.png';
import CommentFeed from '../assets/images/postcomment.png';
import Share from '../assets/images/share.png';
import DogCategory from '../assets/images/australian-shepherd.png';
import CatCategory from '../assets/images/newCat.png';
import BirdCategory from '../assets/images/parrot.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-paper';
import CategoriesPet from '../components/CategoriesPet';
// import like from '../../server/models/like';
// import 'dotenv/config';
// import Config from 'react-native-config';

const ProductScreen = () => {
  const api = 'http://10.0.2.2:8000';
  // const api = 'https://petservernew.onrender.com';
  // console.log(api);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [productsNotFound, setProductsNotFound] = useState(false);
  const [locationPost, setLocationPost] = useState([]);
  const [userLongitude, setUserLongitude] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [location, setLocation] = useState(''); //For the  georeversing long and lat to find the place name

  // handle Navigation for notifications
  const handleNotification = () => {
    Alert.alert('Notification Left', 'Notification left');
  };

  //  for the pets categories

  // Debounce the search function to avoid making too many requests
  const debouncedSearch = _debounce(async (query) => {
    setSearchQuery(query);
    setLoading(true);

    if (query) {
      try {
        // const response = await axios.get(
        //   `https://petservernew.onrender.com/products?search=${query}`
        // );
        const response = await axios.get(`${api}/products?search=${query}`);
        if (response.status === 404) {
          console.log('Error Vur');
        } else {
          setSearchResults(response.data);
        }
      } catch (error) {
        console.log('Error fetching  results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
    setLoading(false);
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      const longitudeUser = decodedToken.userLongitude;
      const latitudeUser = decodedToken.userLatitude;
      console.log(longitudeUser);
      console.log(latitudeUser);
      setUserLongitude(longitudeUser);
      setUserLatitude(latitudeUser);

      setUserId(userId);

      axios
        .get(`${api}/loggedUser/${userId}`)
        // .get(`https://petservernew.onrender.com/loggedUser/${userId}`)
        .then((response) => {
          setLoggedInUser(response.data);
        })
        .catch((error) => {
          console.log('Error retrieving logged-in user', error);
        });
    };

    fetchUsers();

    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      // const response = await fetch('https://petservernew.onrender.com/products');
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        console.log('Error While Fetching Data');
      }
    };

    fetchProducts()
      .then((response) => {
        if (response.status === 404) {
          // Handle the "No Product Found" error
          console.log('No products found');
          // Set a state variable to indicate that no products were found
          setProductsNotFound(true);
          setProducts();
        } else if (response.ok) {
          // If products are found, set the products data
          setProducts(data);
        } else {
          console.log('Error While Fetching Data');
        }
      })
      .catch((error) => {
        console.log('Error While Fetching Data:', error);
      });
  }, []);

  // Fetch User Location reverse geo

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLatitude}&lon=${userLongitude}`
        );
        const data = await response.json();
        if (response.ok) {
          setLocation(data);
        }
        console.log('Location', location);
      } catch (error) {
        console.log('Error ', error);
      }
    };

    fetchLocation();
  }, []);

  const cityDistrict = useMemo(() => {
    return location?.address?.city_district || 'Fetching location';
  }, [location]);

  useEffect(() => {
    console.log('Updated Location', location);
  }, [location]);

  useEffect(() => {
    const fetchProductsLocation = async () => {
      // const response = await fetch(
      //   `https://petservernew.onrender.com/products/location/nepaltar`
      // );
      const response = await fetch(
        `${api}/nearby/post/${userLongitude}/${userLatitude}`
      );
      const data = await response.json();
      if (response.ok) {
        setLocationPost(data);
      } else {
        console.log('Error fetching the data');
      }
    };

    fetchProductsLocation();
  }, [api, userLongitude, userLatitude]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: () => (
      //   <View >
      //     <Text onPress = {() => navigation.navigate('messageScreen',{recepientId: userId})} style={{ fontSize: 16, fontWeight: 'bold', color: 'gray' }}>FurEver</Text>
      //   </View>
      // ),
      headerLeft: null, // This line hides the back button (arrow)
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <View>
            <Text
              onPress={() =>
                navigation.navigate('messageScreen', { recepientId: userId })
              }
              style={{ fontSize: 19, fontWeight: 'bold', color: '#9c6fef' }}
            >
              FurEver
            </Text>
            {/* <Text>{cityDistrict}</Text> */}
          </View>
          <SearchBar onSearch={debouncedSearch} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Add', {
                userId: userId,
                userLongitude: userLongitude,
                userLatitude: userLatitude,
              })
            }
          >
            {userId ? (
              <Image source={Add} style={{ width: 30, height: 30 }} />
            ) : (
              <Text></Text>
            )}
          </TouchableOpacity>

          {/*  Old code for the logout */}
          {/* <Pressable onPress={handleLogout}>
            {userId ? (
              <Image
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 25,
                }}
                // source={{ uri: `https://petservernew.onrender.com/${loggedInUser.image}` }}
                source={{ uri: `${api}/${loggedInUser.image}` }}
              />
            ) : (
              <Text>Login</Text>
            )}
          </Pressable> */}
          {/* New code for the notification */}
          <TouchableOpacity onPress={handleNotification}>
            <MaterialIcons size={30} name="notifications-none" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [loggedInUser]);

  //  to fetch the comment
  // ...

  useEffect(() => {
    const fetchLikesForPost = async (productId) => {
      try {
        const response = await fetch(`${api}/like/products/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setLikes((prevLikes) => ({
            ...prevLikes,
            [productId]: data,
          }));
        } else {
          console.log(`Error Fetching Likes for the posts ${productId}`);
        }
      } catch (error) {
        console.log(`Error retrieving Likes:${error}`);
      }
    };

    const fetchAllLikes = async () => {
      const productIds = products.map((product) => product._id);
      for (const productId of productIds) {
        await fetchLikesForPost(productId);
      }
    };

    fetchAllLikes();

    const fetchCommentsForPost = async (productId) => {
      try {
        // const response = await fetch(
        //   `https://petservernew.onrender.com/comments/products/${productId}`
        // );
        const response = await fetch(`${api}/comments/products/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setComments((prevComments) => ({
            ...prevComments,
            [productId]: data,
          }));
        } else {
          console.log(`Error fetching comments for post ${productId}`);
        }
      } catch (error) {
        console.log(`Error retrieving comments: ${error}`);
      }
    };

    const fetchAllComments = async () => {
      const productIds = products.map((product) => product._id);
      for (const productId of productIds) {
        await fetchCommentsForPost(productId);
      }
    };

    fetchAllComments();
  }, [products]); // Fetch comments whenever products change
  // console.log(likes)
  // ...

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('authToken');
      setUserId(null);

      Alert.alert('Successfully LoggedOut', 'Login Again');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  const timeDifference = (current, previous) => {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;
    const milliSecondsPerMonth = milliSecondsPerDay * 30;
    const milliSecondsPerYear = milliSecondsPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < milliSecondsPerMinute / 3) {
      return 'just now';
    }

    if (elapsed < milliSecondsPerMinute) {
      return 'Just Now';
    } else if (elapsed < milliSecondsPerHour) {
      return Math.round(elapsed / milliSecondsPerMinute) + 'm ';
    } else if (elapsed < milliSecondsPerDay) {
      return Math.round(elapsed / milliSecondsPerHour) + 'h ';
    } else if (elapsed < milliSecondsPerMonth) {
      return Math.round(elapsed / milliSecondsPerDay) + 'd ';
    } else if (elapsed < milliSecondsPerYear) {
      return Math.round(elapsed / milliSecondsPerMonth) + 'mo ';
    } else {
      return Math.round(elapsed / milliSecondsPerYear) + 'y ago';
    }
  };

  const sortedProducts = products.slice().sort((a, b) => {
    // Convert timestamp strings to Date objects for comparison
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);

    // Sort in descending order
    return dateB - dateA;
  });

  //  categories logic

  const handleDog = () => {
    navigation.navigate('category', { categories: 'Dog' });
  };

  const handleCat = () => {
    navigation.navigate('category', { categories: 'Cat' });
  };

  const handleBird = () => {
    navigation.navigate('category', { categories: 'Bird' });
  };

  const handleLike = () => {
    navigation.navigate('like', { productId: item._id });
    console.log('Like Clicked');
  };
  return (
    <View style={{ }}>
    <View>
      <CategoriesPet/>
    </View>
       
      
  
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 10,

                // alignItems:'center'
              }}
            >
              <Text
                style={{
                  color: 'gray',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Post Nearby You
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('seeall', {
                    userLongitude: userLongitude,
                    userLatitude: userLatitude,
                  })
                }
              >
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}
                >
                  See All
                </Text>
              </Pressable>
            </View>
            <ScrollView
              style={
                {
                  // marginVertical:120,
                }
              }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  gap: 50,
                  // height:100,
                }}
              >
                {locationPost.map((postLoc) => (
                  <View
                    key={postLoc._id}
                    style={{
                      margin: 10,
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate('like', {
                          productId: postLoc._id,
                          userId: userId,
                        })
                      }
                    >
                      <Image
                        source={{ uri: `${api}/${postLoc.image}` }}
                        style={{
                          height: 80,
                          borderRadius: 50,
                          objectFit: 'contain',
                          width: 80,
                        }}
                      />

                      <View>
                        {/* <Text style={{}}>{postLoc.name}</Text> */}
                      </View>
                    </Pressable>
                  </View>
                ))}
              </View>
            </ScrollView>

            {searchQuery.trim() !== '' && searchResults.length === 0 ? (
              <Text style={styles.noProductsText}>No products found</Text>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={
                  searchQuery.trim() !== '' && searchResults.length > 0
                    ? searchResults
                    : sortedProducts
                }
                keyExtractor={(item, index) => (item.id || index).toString()}
                renderItem={({ item }) => (
                  // <TouchableOpacity
                  //   key={item.id}
                  //   style={styles.productContainer}
                  //   onPress={() =>
                  //     navigation.navigate('Detail', {
                  //       productId: item._id,
                  //       userId: userId,
                  //     })
                  //   }
                  // >
                  //   <Image
                  //     style={styles.productImage}
                  //     source={{ uri: item.image }}
                  //     onError={(error) => console.log('Error loading image:', error)}
                  //   />
                  //   {/* <Image style={styles.productImage} source={{ uri: item.image }} /> */}
                  //   <View style={styles.productInfo}>
                  //   <View>
                  //      <Image source={{ uri : item.postedBy.image}} style = {{
                  //       width:20,
                  //       height:20,
                  //       borderRadius:25,
                  //     }}/>
                  //   <Text style={styles.productDesc}>{item.postedBy.name}</Text>
                  //   </View>

                  //     <Text style={styles.productTitle}>{item.name}</Text>
                  //     <Text style={styles.productDesc}>{item.description}</Text>

                  //     {/* <Text style={styles.productDesc}>{item.timestamp}</Text> */}
                  //     <Text>{timeDifference(new Date(), new Date(item.timestamp))}</Text>

                  //   </View>

                  // </TouchableOpacity>
                  <>
                    <View
                      key={item.id}
                      style={{
                        margin: 10,
                        padding: 10,
                      }}
                    >
                      {/* <Pressable onPress={handleDog}>
                    <Text></Text>
                    </Pressable> */}

                      {/*  scrollview for post nearby you */}

                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // gap:12,
                            justifyContent: 'space-between',
                          }}
                        >
                          <Image
                            source={{
                              uri: `${api}/${item.postedBy.image}`,
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 50,
                              resizeMode: 'contain',
                            }}
                          />
                          <Pressable
                            onPress={() =>
                              navigation.navigate('userfeed', {
                                userId: item.postedBy._id,
                                recepientName: item.postedBy.name,
                                recepientImage: item.postedBy.image,
                              })
                            }
                          >
                            <Text
                              style={{
                                fontSize: 16,
                              }}
                            >
                              {item.postedBy.name}
                            </Text>
                          </Pressable>

                          <Text
                            style={{
                              color: 'gray',
                            }}
                          >
                            {timeDifference(
                              new Date(),
                              new Date(item.timestamp)
                            )}
                          </Text>
                        </View>
                        {/*  for the image of the product and the desc or caption */}
                        <View>
                          <View
                            style={{
                              marginTop: 10,
                            }}
                          >
                            <Pressable
                              onPress={() =>
                                navigation.navigate('like', {
                                  productId: item._id,
                                  userId: userId,
                                })
                              }
                            >
                              <Image
                                source={{
                                  uri: `${api}/${item.image}`,
                                }}
                                style={{
                                  width: '100%',
                                  height: 240,
                                  resizeMode: 'cover',
                                }}
                              />
                              <View
                                style={{
                                  // alignItems:'center',
                                  // marginVertical:10,
                                  padding: 10,
                                }}
                              >
                                <Text
                                  style={{
                                    color: 'gray',
                                  }}
                                >
                                  {item.description}
                                </Text>
                              </View>
                            </Pressable>
                          </View>
                        </View>

                        {/*View for the like and comment section  */}

                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginBottom: 20,
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('like', {
                                  productId: item._id,
                                  userId: userId,
                                });
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 2,
                                }}
                              >
                                <Image
                                  source={Like}
                                  style={{
                                    // width:50,
                                    // height:50,
                                    resizeMode: 'contain',
                                  }}
                                />

                                {likes[item._id] ? (
                                  <Text>({likes[item._id].length})</Text>
                                ) : null}
                              </View>
                            </TouchableOpacity>
                            <Pressable
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}
                              onPress={() =>
                                navigation.navigate('Comment', {
                                  productId: item._id,
                                  userId: userId,
                                })
                              }
                            >
                              <Image
                                source={CommentFeed}
                                style={{
                                  // width:50,
                                  // height:50,
                                  resizeMode: 'contain',
                                }}
                              />
                              {comments[item._id] ? (
                                <Text>({comments[item._id].length})</Text>
                              ) : null}
                            </Pressable>
                            {userId ? (
                              <Pressable
                                onPress={() =>
                                  navigation.navigate('shareScreen', {
                                    productId: item._id,
                                    userId: userId,
                                  })
                                }
                              >
                                <Image
                                  source={Share}
                                  style={{
                                    // width:50,
                                    // height:50,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </Pressable>
                            ) : null}
                          </View>

                          {likes[item._id] ? (
                            <View>
                              {likes[item._id].map((like, index) => (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                  key={index}
                                >
                                  {/*  like instagram show the liked user like limit it and then in the length show the complete like for the post  and later with logic of show image if they are friends else only show the total like number */}
                                </View>
                              ))}
                            </View>
                          ) : null}
                        </View>

                        {/*  for diplsying comment */}
                        <View
                          style={{
                            marginTop: 11,
                          }}
                        >
                          {/* {comments[item._id] &&
                            comments[item._id].length > 0 && (
                              <View style={{ marginTop: 10 }}>
                                {comments[item._id].map((comment) => (
                                  <View key={comment._id}>
                                    <Text key={comment._id}>
                                      Comment: {comment.comment}
                                    </Text>
                                    <Image  source = {{ uri:`http://10.0.2.2:8000/${comment.userId.image}`}} style = {{
                                      width:50,
                                      height:50,
                                    }}/>
                                    <Text>PostedBy:{comment.userId.name}</Text>
                                   
                                  </View>
                                ))}
                              </View>
                            )} */}
                          {/* Display the number of comments for the post */}
                          {/* {comments[item._id] && (
      <Text>{comments[item._id].length} comments</Text>
    )}
                          {comments[item._id] &&
                          
                            comments[item._id].length > 0 && (
                              <View style={{ marginTop: 10 }}>
                                {comments[item._id].map((comment) => (
                                  <View
                                    key={comment._id}
                                    style={{
                                      // flexDirection: 'row',
                                    }}
                                  >
                                  
                                    {comment.userId.image && (
                                      <>
                                      <View style = {{
                                        flexDirection:'row',
                                        gap:21,
                                      }}>
                                      <Pressable
                                          onPress={() => console.log('Image {')}
                                        >
                                          <Image
                                            source={{
                                              uri: comment.userId.image,
                                            }}
                                            style={{
                                              width: 35,
                                              height: 35,
                                              borderRadius: 50,
                                            }}
                                          />
                                        </Pressable>
                                        <View style = {{
                                          // justifyContent:'center',
                                          // alignItems:'center',
                                          backgroundColor:"#d9d9d9",
                                          borderRadius:7,
                                          padding:10,
                                         height:'auto'
                                        }}>
                                        <Text style = {{
                                          fontWeight:'bold',

                                        }} >{comment.userId.name}</Text>

                                        <Text key={comment._id}>
                                          {comment.comment}
                                        </Text>
                                       

                                        </View>

                                      </View>
                                        
                                        

                                        
                                      </>
                                    )}
                                  </View>
                                ))}
                              </View>
                            )} */}
                        </View>
                      </View>
                      {/*  view for product location */}

                      <View></View>
                    </View>
                  </>
                )}
              />
            )}
          </>
        )}

        {/* <Text>HEHE</Text> */}
        {/* <Image source={{uri:'https://th.bing.com/th/id/OIP.Vr7I3lQtR6FhSarTtrkF0gHaEK?pid=ImgDet&rs=1'}} style= {{width:50,height:50}}/> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
    height: 200,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDesc: {
    fontWeight: '500',
    color: 'gray',
  },
});

export default ProductScreen;
