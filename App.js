import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SvgUri } from 'react-native-svg'

//containers
import { Posts, Post } from './src/containers'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Posts,
    navigationOptions: () => ({
      headerStyle: {
        elevation: 0,
        height: 65
      },
      headerTitle: <SvgUri
        width={'100%'}
        height={'40%'}
        uri='https://shifter.sapo.pt/wp-content/uploads/2019/12/shifter-preto.svg'
      />
    }),
  },
  Post: {
    screen: Post,
    navigationOptions: () => ({
      headerStyle: {
        elevation: 0
      },
    })
  },
});

export default createAppContainer(AppNavigator)
