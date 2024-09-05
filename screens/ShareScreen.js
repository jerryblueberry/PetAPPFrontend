import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Radio from '../assets/images/radio.png';
import Check from '../assets/images/check.png';
import { useRoute, useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import axios from 'axios';
const ShareScreen = () => {
  const api = 'http://10.0.2.2:8000';
  const route = useRoute();
  const { productId } = route.params;

  console.log('Product Id', productId);
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { userId } = useContext(UserType);
  const [recentChats, setRecentChats] = useState([]);
  console.log('User ID', userId);
  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`${api}/products/1`); // Replace '1' with your actual productId
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, []);

  // Fetch list of users
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await fetch(`${api}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log('Error Occurred ', error);
      }
    };

    fetchUserList();
  }, []);

  //  to fetch the recent chatted users for suggestted
  useEffect(() => {
    const loadRecentChats = async () => {
      try {
        const response = await fetch(`${api}/recent-chats/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setRecentChats(data);
        }
      } catch (error) {
        console.log('Error loading the User List', error);
      }
    };

    loadRecentChats();
  }, [userId]);

  console.log(recentChats);
  // Handle user selection
  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        // User is already selected, remove from the list
        return prevSelected.filter((id) => id !== userId);
      } else {
        // User is not selected, add to the list
        return [...prevSelected, userId];
      }
    });
  };

  // Handle Close
  const handleCLose = () => {
    console.log('Close Pressed');
    navigation.goBack();
    // Add your navigation logic here
  };

  // Handle Send
  // const handleSend = () => {
  //   // Implement your logic to send selected users
  //   console.log('Sending selected users:', selectedUsers);
  // };

  const handleSend = async () => {
    // Filter users based on selected user ids
    const selectedUserId = users
      .filter((user) => selectedUsers.includes(user._id))
      .map((user) => user._id);

    console.log('SelectedUserId', selectedUserId);
    try {
      const result = {
        senderId: userId,
        recepientId: selectedUserId,
        messageType: 'share',
        messageText: 'Link Check 1',
        link: `http://localhost:8000/products/${productId}`,
      };
      const response = await axios.post(`${api}/share/messages`, result, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 200) {
        console.log('Link Shared successfully');
        navigation.navigate('Product');
        // navigation.navigate('Product',{refresh:true});
      } else {
        // const errorData =  response.json();
        // Alert.alert('Failed to share Link', errorData.error);
        console.log('Failed to share Link');
      }
    } catch (error) {
      console.log('Error In Sharing Link', error);
    }

    // Implement your logic to send selected user names
    // console.log('Sending selected users:', selectedUserId);
  };

  const renderUserItem = ({ item }) => {
    const isSelected = selectedUsers.includes(item._id);

    return (
      <Pressable
        onPress={() => handleUserSelection(item._id)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : 'transparent',
            borderRadius: pressed ? 15 : 0,
          },
        ]}
      >
        {userId !== item._id ? (
          <View style={styles.userItem}>
            <Image
              style={styles.userImage}
              source={{ uri: `${api}/${item.image}` }}
            />
            <View style={styles.userInfo}>
              <Text>{item.name}</Text>
              {isSelected ? (
                <Image source={Check} style={styles.checkImage} />
              ) : (
                <Image source={Radio} style={styles.checkImage} />
              )}
            </View>
          </View>
        ) : null}
      </Pressable>
    );
  };

  //  for the try of the  suggested  user List
  return (
    <View
      style={{
        marginVertical: 40,
        margin: 10,
        padding: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 2,
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            // fontWeight: 600,
            fontSize: 22,
          }}
        >
          Share
        </Text>
        <TouchableOpacity onPress={handleCLose}>
          <EvilIcons
            name="close"
            size={32}
            color="black"
            style={{
              fontWeight: 'bold',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 2,
            marginHorizontal: 10,
            gap:8,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            To :
          </Text>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                flexDirection: 'row',
                // gap: 20,
                // marginTop: 10,
              }}
            >
              {users
                .filter((user) => selectedUsers.includes(user._id))
                .map((user) => (
                  <View
                    style={{
                      backgroundColor: '#f0f0f0',
                      // backgroundColor: 'red',
                      paddingVertical:5,
                      borderRadius: 20,

                      minWidth: 100, // Adjust as needed
                      marginRight: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                    }}
                    key={user._id}
                  >
                    <Text
                      style={{
                        // fontWeight: 'bold',
                        paddingHorizontal: 14,
                        color: 'black',
                      }}
                    >
                      {user.name}
                    </Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </View>
      {/*  For the search bar  */}
      <View style  = {{
        margin:12,
        marginHorizontal:10,
      }}>
        <TextInput style  = {{
          borderWidth:1.25,
          borderColor:'gray',

          paddingHorizontal:10,
          paddingVertical:8,
          borderRadius:6,

        }} placeholder="Search Bar" />
      </View>
      {/*  for text Suggested */}
      <View
        style={{
          // position:'relative',
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Suggested
        </Text>
      </View>
      {/* Product Details */}
      {products && <View></View>}

      <FlatList
        data={recentChats}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderUserItem}
      />

      {/* Send Button */}
      <TouchableOpacity onPress={handleSend}>
        <View style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkImage: {
    width: 30,
    height: 30,
    // marginLeft: 10,
    position: 'absolute',
    marginHorizontal: 295,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ShareScreen;
