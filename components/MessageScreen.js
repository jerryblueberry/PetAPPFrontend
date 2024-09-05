import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import UserChat from '../screens/UserChat';

const MessageScreen = () => {
  // const api = "https://petservernew.onrender.com";
  const api = "http://10.0.2.2:8000";
  const { userId, setUserId } = useContext(UserType);
  const [recentChats, setRecentChats] = useState([]);
  const navigation = useNavigation();
  console.log("User ID", userId);

  useEffect(() => {
    const loadRecentChats = async () => {
      try {
        // Fetch the list of recent chats for the logged-in user (userId)
        const response = await fetch(`${api}/recent-chats/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setRecentChats(data);
        }
      } catch (error) {
        console.log('Error loading recent chats', error);
        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Data:', error.response.data);
        }
      }
    }

    loadRecentChats();
  }, [userId]);
  recentChats.sort((a, b) => {
    // Get the timestamps of the most recent messages for each user
    const timestampA = a.mostRecentMessage ? new Date(a.mostRecentMessage.timeStamp) : 0;
    const timestampB = b.mostRecentMessage ? new Date(b.mostRecentMessage.timeStamp) : 0;
  
    // Sort in descending order (most recent first)
    return timestampB - timestampA;
  });
  
  console.log('Recent Chats', recentChats);


  return (
    <ScrollView showsVerticalScrollIndicator={false} style = {{
      marginVertical:50,
    }}>
      {recentChats.map((item, index) => (
        <UserChat key={index} item={item} />
      ))}
    </ScrollView>
  );
}



export default MessageScreen;

const styles = StyleSheet.create({});

// app.post('/share/messages', upload.single('imageFile'), async (req, res) => {
//   try {
//     const { senderId, recepientId, messageType, messageText, link } = req.body;

//     let imageUrl = null;
//     let linkUrl = null;

//     if (messageType === 'image' && req.file) {
//       imageUrl = req.file.path;
//     } else if (messageType === 'share' && link) {
//       linkUrl = link;
//     }

//     const newMessage = new Message({
//       senderId,
//       recepientId,
//       messageType,
//       message: messageText,
//       timeStamp: new Date(),
//       imageUrl,
//       linkUrl,
//     });

//     await newMessage.save();

//     res.status(200).json({ message: 'Message Sent Successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });