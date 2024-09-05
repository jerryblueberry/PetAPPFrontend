import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StackNavigator from './StackNavigator';
import { UserContext } from './UserContext';
import {Provider} from 'react-redux';
import store from './store/store';


const App = () => {
  return (
    <>
      <Provider store={store}>
      <UserContext>
        <StackNavigator />
      </UserContext>

      </Provider>
     
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
});
