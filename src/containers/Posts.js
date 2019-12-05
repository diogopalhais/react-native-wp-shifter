import React, { useState } from 'react';
import { ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import useSWR, { useSWRPages } from 'swr'
import { View, Text } from 'react-native-tailwind'
import moment from 'moment'
import 'moment/locale/pt'

//components
import { Post } from '../components'

moment.locale('pt')

export default Posts = () => {

  const fetcher = url => fetch(url).then(r => r.json())
  const { pages, loadMore, isLoadingMore, isReachingEnd } = useSWRPages(
    "posts",
    ({ offset, withSWR }) => {
      const { data } = withSWR(useSWR("https://shifter.sapo.pt/wp-json/wp/v2/posts?page=" + (offset || 1), fetcher))

      if (!data) {
        return <ActivityIndicator style={{ marginTop: 30 }} color='#f6b93b' />
      }

      return data.map(post =>
        <Post key={post.id} post={post} />
      )

    },
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) return null
      return (index + 1)
    }
  )

  return (
    <ScrollView>
      {pages}
      {!isLoadingMore &&
        <TouchableOpacity onPress={loadMore}>
        <View className="flex items-center justify-center bg-grey-lighter p-3 rounded m-4">
          <Text className="font-bold text-grey-darker">
            {isLoadingMore ? 'a carregar...' : isReachingEnd ? 'no more data' : 'CARREGAR MAIS'}
          </Text>
        </View>
      </TouchableOpacity>
      }
    </ScrollView>
  )

}

