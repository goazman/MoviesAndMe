import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import NavBottomTab from "./Navigation/Navigation";

import {Provider} from 'react-redux';
import Store from "./Store/configureStore";


export default function App (){
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <NavBottomTab/>
      </NavigationContainer>
    </Provider>
  );
}


