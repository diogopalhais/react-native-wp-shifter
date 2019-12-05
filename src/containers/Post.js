import * as React from 'react';
import {
  ScrollView,
  Dimensions,
} from 'react-native';
import { View, Text } from 'react-native-tailwind'
import moment from 'moment'
import 'moment/locale/pt'
import HTMLView from 'react-native-htmlview'
import SImage from 'react-native-scalable-image'

moment.locale('pt')

export default Post = ({ navigation }) => {

  const post = navigation.getParam('post', 'NO-POST')

  return (
    <ScrollView>
      <View className="px-8 py-2">
        <Text style={{ marginBottom: 20 }} className='font-bold text-4xl text-grey-darkest'>
          {post.title.rendered}
        </Text>
        <HTMLView
          style={{ marginBottom: 15 }}
          value={post.excerpt.rendered.replace('\n', '')}
          stylesheet={{
            p: {
              fontSize: 18,
              textAlign: 'justify',
            }
          }}
        />
        <View className="flex flex-row">
          <Text className="text-grey-darkest text-base font-bold">
            {post.author_meta.display_name}
          </Text>
          <Text className="text-grey-darkest text-base ml-2">
            {moment(post.date).format('D MMMM, YYYY').toLocaleUpperCase()}
          </Text>
        </View>
      </View>

      <View className="py-4">
        <SImage
          width={Dimensions.get('window').width}
          source={{ uri: post.jetpack_featured_media_url }}
        />
      </View>

      <View className="px-8 mb-8">
        <HTMLView
          style={{ marginTop: 20 }}
          value={post.content.rendered.replace(new RegExp('\n', 'g'), '')}
          stylesheet={{
            a: {
              textDecorationLine: 'underline'
            },
            p: {
              fontSize: 18,
              textAlign: 'justify',
              marginBottom: -10,
              lineHeight: 26
            },
            b: {
              fontWeight: 'bold'
            }
          }
          }
        />
      </View>
    </ScrollView>
  )
}

