import * as React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native'
import { Text, View, Image } from 'react-native-tailwind'
import { withNavigation } from 'react-navigation';
import moment from 'moment'
moment.locale('pt')

const Post = ({post,navigation}) => {

    console.log(post)
    return (
        <View className="mb-4">
            <TouchableOpacity onPress={() => navigation.navigate('Post', { post: post })}>
                <View className="bg-gray-400">
                    <Image
                        className="object-cover h-48 w-full"
                        source={{ uri: post.jetpack_featured_media_url }}
                    />
                </View>
                <View className="p-4">
                    <Text className="font-bold text-2xl mb-2 text-grey-darkest">{post.title.rendered}</Text>
                    <View className="flex flex-row">
                        <Text className="text-grey-darkest text-base mr-2">
                            {moment(post.date).format('D MMMM, YYYY').toLocaleUpperCase()}
                        </Text>
                        <Text className="text-grey-darkest text-base font-bold">
                            {post.author_meta.display_name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row p-4">
                    {post.categories.map(category => (
                        <Category key={category} category={category} />
                    ))}
                </View>
            </ScrollView>
        </View>
    )

}

export default withNavigation(Post)