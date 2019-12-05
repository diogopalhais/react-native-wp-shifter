import * as React from 'react';
import { Text, View } from 'react-native-tailwind'
import useSWR from 'swr'


export default Category = ({category}) => {

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error } = useSWR(`https://shifter.sapo.pt/wp-json/wp/v2/categories/${category}`, fetcher)

    if (error) return <View/>
    if (!data) return <View/>


    return (
        <View className="p-2 mr-2" style={{ backgroundColor: 'rgb(255, 235, 58)' }}>
            <Text className="font-bold text-xs">{data.name.toUpperCase()}</Text>
        </View>
    )
}