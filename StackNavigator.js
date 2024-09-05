import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AddProduct from './screens/AddProduct';
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import UserChat from './screens/UserChat';
import MessageScreen from './components/MessageScreen';
import UserFeed from './screens/UserFeed';
// import MapView from './screens/MapView';
import SeeAll from './screens/SeeAll';
import Category from './screens/Category';
import CommentScreen from './screens/CommentScreen';
import LocationScreen from './screens/LocationScreen';
import LikeCheck from './screens/LikeCheck';
import { TextFieldValidationMessagePosition } from 'react-native-ui-lib';
import LikeComponentScreen from './screens/LikeComponentScreen';
import ShareScreen from './screens/ShareScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { UserType } from './UserContext';
import AccountScreen from './screens/AccountScreen';
const StackNavigator = () => { 
  const { userId, setUserId } = useContext(UserType);

  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  function productStackScreen() {
    return (
      <Stack.Navigator
        screenOptions={
          {
            // headerShown:false,
          }
        }
      >
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
        <Stack.Screen name="like" component={LikeCheck} />
        <Stack.Screen
          name="userfeed"
          component={UserFeed}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name='category' component={Category} options={{
          headerShown:false
        }}/>
        {/* <Stack.Screen
          name="messageScreen"
          component={MessageScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="shareScreen"
          component={ShareScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function messageStackScreen() {
    return (
      <Stack.Navigator
        screenOptions={
          {
            // headerShown:false,
          }
        }
      >
        <Stack.Screen
          name="messageScreen"
          component={MessageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} screenOptions={{}} />
      </Stack.Navigator>
    );
  }
  function AccountStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    //   <NavigationContainer>
    //       <Stack.Navigator>
    //       {/* <Stack.Screen name='location' component={MapView} options={{ headerShown: false }} /> */}

    //           {/* <Stack.Screen name='Login' component={LoginScreen}/> */}
    //           <Stack.Screen name='Product' component={ProductScreen}  options={{
    //   headerLeft: () => null, // This line will hide the back arrow
    // }} />
    //           <Stack.Screen name='Add' component={AddProduct}/>
    //           <Stack.Screen name='Chat' component={ChatScreen}/>
    //           <Stack.Screen name='Detail' component={ProductDetailScreen} options = {{headerShown:false}}/>
    //           <Stack.Screen name='Login' component={LoginScreen}/>
    //           <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
    //           <Stack.Screen name='Search' component={SearchScreen} options={{ headerShown: false }} />
    //           {/* <Stack.Screen name='userChat' component={UserChat} options={{ headerShown: false }} /> */}
    //           <Stack.Screen name='messageScreen' component={MessageScreen} options={{ headerShown: false }} />
    //           <Stack.Screen name='userfeed' component={UserFeed} options={{ headerShown: false }} />
    //           <Stack.Screen name='seeall' component={SeeAll} options={{ headerShown: true }} />
    //           <Stack.Screen name='category' component={Category} options={{ headerShown: true }} />
    //           <Stack.Screen name='Comment' component={CommentScreen} options={{ headerShown: true }}  />
    //           {/* <Stack.Screen name='maps' component={LocationScreen} options={{ headerShown: true }}  /> */}
    //           <Stack.Screen name='like' component={LikeCheck} options={{ headerShown: true }}  />
    //           <Stack.Screen name='likeComponent' component={LikeComponentScreen} options={{ headerShown: true }}  />
    //           <Stack.Screen name='shareScreen' component={ShareScreen} options={{ headerShown: false }}  />

    //       </Stack.Navigator>
    //   </NavigationContainer>

    <NavigationContainer>
      {userId ? (
        <Tab.Navigator
          initialRouteName="product"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'orange',
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopWidth: 0,
            },
          }}
        >
          <Tab.Screen
            name="product"
            component={productStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                  <Text style={styles.tabIconLabel}>Home</Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="messageScreen"
            component={messageStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="message-reply-text-outline"
                    color={color}
                    size={size}
                  />

                  <Text>Message</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="accountScreen"
            component={AccountStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <FontAwesome name="user-o" color={color} size={size} />

                  <Text>Account</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          {/* <Stack.Screen name="Product" component={ProductScreen} /> */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
