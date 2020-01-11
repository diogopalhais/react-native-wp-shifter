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
import AutoHeightWebView from 'react-native-autoheight-webview'

moment.locale('pt')

export default Post = ({ navigation }) => {

  const post = navigation.getParam('post', 'NO-POST')

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="px-8 py-2">
        <View style={{ marginBottom: 15, flexDirection: 'row' }}>
          {post.categories.map(category => (
            <Category key={category} category={category} />
          ))}
        </View>
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

      <View>

        <AutoHeightWebView
          style={{ width: Dimensions.get('window').width - 60, marginLeft:30, marginTop:30 }}
          files={[{
            href: 'https://shifter.sapo.pt/wp-content/themes/presso/style.css?ver=3.2.1',
            type: 'text/css',
            rel: 'stylesheet'
          },
          {
            href: 'https://shifter.sapo.pt/wp-content/themes/presso-child/style.css?ver=3.2.1',
            type: 'text/css',
            rel: 'stylesheet'
          }]}
          source={{ html: post.content.rendered.replace(new RegExp('\n', 'g'), '<br>') }}
          scalesPageToFit={true}
          allowsFullscreenVideo={true}
          textZoom={340}
        />

      </View>
    </ScrollView>
  )
}

