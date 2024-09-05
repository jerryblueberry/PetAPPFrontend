// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   TouchableOpacity,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import Radio from '../assets/images/radio.png';
// import Check from '../assets/images/check.png';
// const ShareScreen = () => {
//   const api = 'http://10.0.2.2:8000';
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { productId, userId } = route.params;
//   const [products, setProducts] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [visible, setVisible] = useState(true);
//   const [check,setCheck] = useState(false);
//   console.log('ProductId', productId);

//   //  lets fetch the details of the product
//   useEffect(() => {
//     // const fetchDetail = async () => {
//     //   try {
//     //     const res = await fetch(`http://10.0.2.2:8000/products/${productId}`);
//     //     const data = await res.json();
//     //     setProducts(data);
//     //   } catch (error) {
//     //     console.log(error);
//     //   }
//     // };
//     console.log(api);
//     const fetchDetail = async () => {
//       try {
//         const res = await fetch(`${api}/products/${productId}`);
//         const data = await res.json();

//         // Fetch the "postedBy" user information
//         const userRes = await fetch(`${api}/user/${data.postedBy._id}`);
//         const userData = await userRes.json();

//         setProducts({ ...data, postedBy: userData }); // Merge user data into the product data
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchDetail();
//   }, [productId]);

//   //   fetch the lists of users to share

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`${api}/users`);
//         const data = await res.json();
//         setUsers(data);
//       } catch (error) {
//         console.log('Error Occurred ', error);
//       }
//     };
//     fetchUser();
//   }, []);

//   //  handleCLose
//   const handleCLose = () => {
//     console.log('close Pressed');
//     navigation.goBack();
//   };

//     //  handle check uncheck
//     const handleCheckSubmit = () => {
//       console.log("Check")
//       setCheck(!check);
//     }
//   return (
//     <View
//       style={{
//         //  backgroundColor:'black',
//         height: '100%',
//       }}
//     >
//       <View
//         style={{
//           marginVertical: 40,
//           margin: 10,
//           padding: 8,
//         }}
//       >
//         {/* <Text>ShareScreen</Text> */}
//         {/* <Text>Product Id : {productId}</Text>
//       <Text> User Id : {userId}</Text> */}
//         {visible ? (
//           <View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 margin: 10,
//               }}
//             >
//               <Text></Text>

//               <Text
//                 style={{
//                   fontWeight: 600,
//                 }}
//               >
//                 Share
//               </Text>
//               <TouchableOpacity onPress={handleCLose}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: 600,
//                   }}
//                 >
//                   X
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//               }}
//             >
//               <Text
//                 style={{
//                   fontWeight: '600',
//                 }}
//               >
//                 To :{' '}
//               </Text>
//               <Text
//                 style={{
//                   width: '90%',
//                   borderWidth: 1,
//                   borderColor: 'gray',
//                   paddingHorizontal: 10,
//                 }}
//               >
//                 Search Bar...
//               </Text>
//             </View>
//             {/* Suggested  */}
//             <View
//               style={{
//                 marginVertical: 20,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 17,
//                   fontWeight: 700,
//                 }}
//               >
//                 Suggested
//               </Text>
//               {users.map((user) => (
//                 <View
//                   key={user._id}
//                   style={{
//                     marginVertical: 20,
//                     margin: 10,
//                   }}
//                 >
//                 {/*  check and uncheck for the list  later use flatlist with other component*/}
//                 <TouchableOpacity onPress={handleCheckSubmit}>
//                 <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       gap: 5,
//                     }}
//                   >
//                     <Image
//                       style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 50,
//                       }}
//                       source={{ uri: `${api}/${user.image}` }}
//                     />
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems:'center',

//                       }}
//                     >
//                       <Text>{user.name}</Text>
//                       {/* <Text style = {{
//                         position:'absolute',
//                         left:300,
//                         fontSize:20,
//                         fontWeight:'bold',
//                         color:'gray',

//                         // left:250,

//                     }}>O</Text> */}
//                       {/*  for radio check image */}

//                       {/*  logic for handling check and uncheck Image */}
//                       {check[user._id] ? (<Image
//                         source={Check}
//                         style={{
//                           //  position:'absolute',
//                           //   left:300,
//                           marginHorizontal:290,
//                           position:'absolute',

//                           width: 30,
//                           height: 30,
//                         }}
//                       />) : ( <Image
//                         source={Radio}
//                         style={{
//                           //  position:'absolute',
//                           //   left:300,
//                           marginHorizontal:290,
//                           position:'absolute',

//                           width: 30,
//                           height: 30,
//                         }}
//                       />)}

//                     </View>
//                   </View>

//                 </TouchableOpacity>

//                 </View>
//               ))}

//               {/*  for send button */}
//               <TouchableOpacity>
//                 <View
//                   style={{
//                     // margin:20,
//                     backgroundColor: 'blue',
//                     borderWidth: 1,
//                     borderColor: '#fff',
//                     borderRadius: 4,
//                     padding: 10,
//                     paddingHorizontal: 170,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     Send
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               {/*  end of send button */}
//             </View>
//           </View>
//         ) : (
//           <View>
//             {products && (
//               <View>
//                 <Text>{products.name}</Text>
//                 <Image
//                   style={{
//                     width: 160,
//                     height: 160,
//                   }}
//                   source={{ uri: `${api}/${products.image}` }}
//                 />
//               </View>
//             )}
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default ShareScreen;

// const styles = StyleSheet.create({});
// //  tomorrow black color and send logic implementation

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
} from 'react-native';

import Radio from '../assets/images/radio.png';
import Check from '../assets/images/check.png';
import { useRoute,useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';

const ShareScreen = () => {
  const api = 'http://10.0.2.2:8000';
  const route  = useRoute();
  const {productId}  = route.params;

  console.log("Product Id",productId);
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {userId} = useContext(UserType);
  const  [recentChats,setRecentChats] = useState([]);
  console.log("User ID",userId);
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

    const loadRecentChats = async() => {
      try {
        const response = await fetch(`${api}/recent-chats/${userId}`);
        const data = await response.json();

        if(response.ok){
          setRecentChats(data);
        }
      } catch (error) {
        console.log("Error loading the User List",error);

      }
    }

    loadRecentChats();
  },[userId]);

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

  const handleSend = () => {
    // Filter users based on selected user ids
    const selectedUserNames = users
      .filter((user) => selectedUsers.includes(user._id))
      .map((user) => user.name);
      

    // Implement your logic to send selected user names
    console.log('Sending selected users:', selectedUserNames);
  };

  // Render user item
  // const renderUserItem = ({ item }) => {
  //   const isChecked = selectedUsers.includes(item._id);

  //   return (
  //     <Pressable onPress={() => handleUserSelection(item._id)}>
  //       <View style={styles.userItem}>
  //         <Image
  //           style={styles.userImage}
  //           source={{ uri: `${api}/${item.image}` }}
  //         />
  //         <View style={styles.userInfo}>
  //           <Text>{item.name}</Text>
  //           {isChecked ? (
  //             <Image source={Check} style={styles.checkImage} />
  //           ) : (
  //             <Image source={Radio} style={styles.checkImage} />
  //           )}
  //         </View>
  //       </View>
  //     </Pressable>
  //   );
  // };
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
      {userId !== item._id ? (<View style={styles.userItem}>
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
        </View>):(null)}
        
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
          margin: 10,
        }}
      >
        <Text></Text>

        <Text
          style={{
            fontWeight: 600,
          }}
        >
          Share
        </Text>
        <TouchableOpacity onPress={handleCLose}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            X
          </Text>
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
            alignItems:'center',
          }}
        >
          <Text style = {{
            fontWeight:'bold',
            fontSize:16,
          }}>To :</Text>
          <View>
            {/* <ScrollView horizontal={true} style  = {{
        flexDirection:'row',
        gap:20,

      }}>
       {
            users
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => (
      <View  style = {{
        // backgroundColor:'red',
      }} key={user._id}>
      <Text style = {{
        backgroundColor :"red",
        gap:20,
      }}> {user.name}</Text>

      </View>
     
    
          
    ))
          }

      </ScrollView> */}

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator= {false}
              style={{
                flexDirection: 'row',
                gap: 20,
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
                      padding: 5,
                      borderRadius: 15,
                      minWidth: 100, // Adjust as needed
                      marginRight: 10,
                      borderColor:'gray',
                      borderWidth:1,
                    }}
                    key={user._id}
                  >
                    <Text
                      style={{
                        // fontWeight: 'bold',
                        paddingHorizontal:14,
                        color:'black',
                      }}
                    >
                      {user.name}
                    </Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
        {selectedUsers.length > 0 ? (
          <Text
            style={{
              marginTop: 40,
              
              width: '70%',
              position: 'absolute',
              left: 2,

              // marginVertical:10,
              borderWidth: 1,
              
              borderColor: 'gray',
              // paddingHorizontal: 10,
            }}
          >
            Search Bar...
          </Text>
        ) : (
          <Text
            style={{
              width: '90%',
              borderWidth: 1,
              borderColor: 'gray',
              paddingHorizontal: 10,
            }}
          >
            Search Bar...
          </Text>
        )}
      </View>
      {/*  for text Suggested */}
      <View
        style={{
          // position:'relative',
          marginTop:30,
          
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
      {products && (
        <View>
          {/* <Text>Product Details: {products.name}</Text> */}
          {/* Display other product details as needed */}
        </View>
      )}

      {/* User List */}
      {/* <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderUserItem}
      /> */}

      {/*  for getting the recent chat users */}
      {/*  try for the flatlist */}
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

      {/* <Text>Bholi aba like instagram who are recently you've chatted fetch them to share and for search also write the query</Text> */}


      {/*  for the message last you sent */}
      {/* <View style = {{}}>
        <ScrollView>
        
        {recentChats.map((chat,index) => (
          <View key={index} style = {{
          margin:10,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
        }}>
        {userId !== chat._id ? (
          <TouchableOpacity>
          <View style = {{
            flexDirection:'row',
            alignItems:'center',
            gap:10,
          }}>
 
          <Image style = {{
            width:30,
            height:30,
            borderRadius:50,
          }} source = {{uri:`${api}/${chat.image}`}}/>
          <Text>{chat.name}</Text></View>

          </TouchableOpacity>
          

        ):(null)}
        

        </View>
        ))}
        
          

        </ScrollView>
      </View> */}

      

      {/* <Text>Bholi yo recent chat users lai flatlist component ma rakhne likr user chat</Text> */}
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
