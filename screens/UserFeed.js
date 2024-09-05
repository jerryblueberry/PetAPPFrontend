// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   ScrollView,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import BackImg from '../assets/images/background.png';
// import BackIcon from '../assets/images/back.png';
// import { useNavigation } from '@react-navigation/native';

// const UserFeed = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { recepientName, recepientImage } = route.params;
//   const [userPosts, setUserPosts] = useState([]);
//   const { userId } = route.params;

//   useEffect(() => {
//     // Fetch the user's posts using the new endpoint and sort them by timestamp
//     axios
//       .get(`http://10.0.2.2:8000/users/${userId}/posts`)
//       .then((response) => {
//         if (response.data && response.data.length > 0) {
//           // Sort the posts in descending order by timestamp
//           const sortedPosts = response.data.sort(
//             (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
//           );
//           setUserPosts(sortedPosts);
//         } else {
//           // Handle the case where no posts are available
//           setUserPosts([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching user posts:', error);
//       });
//   }, [userId]);

//   //  for timestamp ( can later make a component to be more reusable)
//   // const timeDifference = (current,previous) => {
//   //   const milliSecondsPerMinute = 60*100
//   // }

//   return (
//     // <View style={{
//     //   margin: 10,
//     //   padding: 20,
//     // }}>
//     //   <Text>{recepientName}</Text>
//     //   <Image source={{ uri: recepientImage }} style={{
//     //     width: 50,
//     //     height: 50
//     //   }} />

//     //   <View>
//     //     <Text>User Posts</Text>
//     //     {userPosts.slice().reverse().map((post) => (
//     //       <View kwy = {post._id}>
//     //         <Text>{post.name}</Text>
//     //         <Image source={{ uri: post.image }} style={{
//     //           width: 50,
//     //           height: 50
//     //         }} />

//     //         <Text>Time stamp{post.timestamp}</Text>
//     //         {/* You can display other post details here */}
//     //       </View>
//     //     ))}
//     //   </View>
//     // </View>

//     // new code for design

//     <View
//       style={{
//         marginVertical: 0,
//       }}
//     >
//       <View style={{}}>
//         <Image
//           source={BackImg}
//           style={{
//             width: '100%',
//             height: 300,
//           }}
//         />
//         <Pressable onPress={() => navigation.goBack()}>
//           <Image
//             style={{
//               marginTop: -255,
//               margin: 10,
//             }}
//             source={BackIcon}
//           />
//         </Pressable>
//       </View>
//       <View
//         style={{
//           padding: 4,
//           margin: 7,
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 8,
//           marginTop: -14,
//         }}
//       >
//         <Image
//           source={{ uri: recepientImage }}
//           style={{
//             width: 50,
//             height: 50,
//             borderRadius: 50,
//           }}
//         />
//         <Text
//           style={{
//             fontWeight: 'bold',
//           }}
//         >
//           {recepientName}
//         </Text>
//       </View>
//       {/*  for the posts */}
//       <View>
//         <View
//           style={{
//             marginHorizontal: 16,
//           }}
//         >
//           <Text
//             style={{
//               fontWeight: 'bold',
//             }}
//           >
//             Posts {userPosts.length}
//           </Text>
//         </View>

//         {/*  fetch the posts  */}
//         {/* <ScrollView>
//       {userPosts.slice().reverse().map((post) =>(
//         <View key={post._id}>
//         <Text>{post.name}</Text>
//         <Image source={{uri:post.image}} style ={{
//           width:60,
//           height:60,
//         }}/>

//         </View>
//       )) }
//     </ScrollView> */}
//       </View>
//       <View>
//       {userPosts.slice().reverse().map((post) => (

     
//         <ScrollView
//           key={post._id}
//           style={{
//             margin: 10,
//             padding: 10,
//           }}
//         >
//           <View style={{}}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 // gap:12,
//                 justifyContent: 'space-between',
//               }}
//             >
//               <Image
//                 source={{ uri: post.postedBy.image }}
//                 style={{
//                   width: 50,
//                   height: 50,
//                   borderRadius: 50,
//                   resizeMode: 'contain',
//                 }}
//               />
//               <Pressable
//                 onPress={() =>
//                   navigation.navigate('userfeed', {
//                     userId: post.postedBy._id,
//                     recepientName: post.postedBy.name,
//                     recepientImage: post.postedBy.image,
//                   })
//                 }
//               >
//                 <Text
//                   style={{
//                     fontSize: 16,
//                   }}
//                 >
//                   {post.postedBy.name}
//                 </Text>
//               </Pressable>

//               <Text
//                 style={{
//                   color: 'gray',
//                 }}
//               >
//                 {/* {timeDifference(new Date(), new Date(item.timestamp))} */}
//               </Text>
//             </View>
//             {/*  for the image of the product and the desc or caption */}
//             <View>
//               <View
//                 style={{
//                   marginTop: 10,
//                 }}
//               >
//                 <Pressable
//                   onPress={() =>
//                     navigation.navigate('Detail', {
//                       productId: post._id,
//                       userId: userId,
//                     })
//                   }
//                 >
//                   <Image
//                     source={{ uri: post.image }}
//                     style={{
//                       width: 400,
//                       height: 240,
//                       resizeMode: 'cover',
//                     }}
//                   />
//                   <View
//                     style={{
//                       // alignItems:'center',
//                       // marginVertical:10,
//                       padding: 10,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: 'gray',
//                       }}
//                     >
//                       {post.description}
//                     </Text>
//                   </View>
//                 </Pressable>
//               </View>
//             </View>

//             {/*View for the like and comment section  */}
//             <View>
//               <View
//                 style={{
//                   padding: 11,
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 {/* <Image source={Like}/>
//                         <Image source={CommentFeed}/>
//                         <Image source={Share}/> */}
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default UserFeed;

// const styles = StyleSheet.create({});



import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BackImg from '../assets/images/background.png';
import BackIcon from '../assets/images/back.png';

const UserFeed = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recepientName, recepientImage } = route.params;
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = route.params;
  // const api = "https://petservernew.onrender.com";
  const api = "http://10.0.2.2:8000";

  useEffect(() => {
    // Fetch the user's posts using the new endpoint and sort them by timestamp
    axios
      .get(`${api}/users/${userId}/posts`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          // Sort the posts in descending order by timestamp
          const sortedPosts = response.data.sort(
            (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
          );
          setUserPosts(sortedPosts);
        } else {
          // Handle the case where no posts are available
          setUserPosts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  }, [userId]);

  return (
    <ScrollView showsHorizontalScrollIndicator ={false} showsVerticalScrollIndicator = {false} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={BackImg} style={styles.headerImage} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Image source={{ uri: `${api}/${recepientImage}` }} style={styles.avatar} />
        <Text style={styles.userName}>{recepientName}</Text>
      </View>
      <View style={styles.postCount}>
        <Text style={styles.postCountText}>Posts {userPosts.length}</Text>
        <Pressable onPress={() => navigation.navigate('Chat',{userId,recepientId:userPosts[0].postedBy._id})}>
        <Text style={styles.postCountText}>Chat Now</Text>

        </Pressable>
        
      </View>
      {userPosts.slice().reverse().map((post) => (
        <View key={post._id} style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: `${api}/${post.postedBy.image}` }}
              style={styles.postAvatar}
            />
            <Pressable
              onPress={() =>
                navigation.navigate('userfeed', {
                  userId: post.postedBy._id,
                  recepientName: post.postedBy.name,
                  recepientImage: post.postedBy.image,
                })
              }
            >
              <Text style={styles.postUserName}>{post.postedBy.name}</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('Detail', {
                productId: post._id,
                userId: userId,
              })
            }
          >
            <Image source={{ uri: `${api}/${post.image}` }} style={styles.postImage} />
            <View style={styles.postDescription}>
              <Text style={styles.postDescriptionText}>
                {post.description}
              </Text>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  backIcon: {
    width:50,
    height:50,
    marginTop: -245,
    margin: 10,
    marginHorizontal:20,
  },
  userInfo: {
    padding: 4,
    margin: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userName: {
    fontWeight: 'bold',
  },
  postCount: {
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  postCountText: {
    fontWeight: 'bold',
  },
  postContainer: {
    margin: 10,
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  postUserName: {
    fontSize: 16,
  },
  postImage: {
    marginTop:20,
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  postDescription: {
    padding: 10,
  },
  postDescriptionText: {
    color: 'gray',
  },
});

export default UserFeed;
