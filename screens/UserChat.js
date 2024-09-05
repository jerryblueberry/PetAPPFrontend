import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

const UserChat = ({ item }) => {
  // const api = "https://petservernew.onrender.com";
  const api = "http://10.0.2.2:8000";
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState(null);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${api}/messages/${userId}/${item._id}`
        );
        const data = await response.json();

        if (response.ok) {
          data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
          const lastMessageData = data[0];

          if (lastMessageData) {
            if (lastMessageData.messageType === 'image') {
              if (lastMessageData.recepientId === userId) {
                setLastMessage('Sent you a photo.');
              } else {
                setLastMessage('You sent a photo.');
              }
            }else if(lastMessageData.messageType === 'share'){
              if (lastMessageData.recepientId === userId) {
                setLastMessage('Sent you an attachment.');
              } else {
                setLastMessage('You sent an  attachment.');
              }


            }
             else {
              setLastMessage(lastMessageData.message);
            }
            setLastMessageTimestamp(lastMessageData.timeStamp);
          } else {
            setLastMessage('');
            setLastMessageTimestamp(null);
          }
        } else {
          console.log('Error showing message', response.status.message);
        }
      } catch (error) {
        console.log('Error fetching messages', error);
      }
    };

    fetchMessages();
    const timer = setInterval(fetchMessages, 400);

    return () => {
      clearInterval(timer);
    };
  }, [userId, item._id]);

  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString('en-US', options);
  };

  const navigateToMessages = () => {
    navigation.navigate('Messages', {
      recepientId: item._id,
    });
  };

  return userId !== item._id ? ( // Check if the user ID is not the same as the logged-in user
    <TouchableOpacity onPress={() => navigation.navigate('Chat', ({ recepientId: item._id }))} style={styles.container}>
      <Image style={styles.avatar} source={{ uri: `${api}/${item.image}` }} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>

        {lastMessage !== null ? (
          <View style={styles.mesTime}>
            <Text style={styles.message}>{lastMessage}</Text>
            {lastMessageTimestamp && (
              <Text style={styles.timestamp}>
                {formatTime(lastMessageTimestamp)}
              </Text>
            )}
          </View>
        ) : (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'gray', fontSize: 12 }}>Start New Chat with </Text>
            <Text style={{ color: 'gray', fontSize: 12, fontWeight: 'bold' }}>{item.name}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  ) : null; // Render nothing if the user ID matches the logged-in user
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.7,
    borderColor: '#D0D0D0',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
    
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  mesTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: 'gray',
  },
  timestamp: {
    fontSize: 11,
    color: 'gray',
  },
});

export default UserChat;
