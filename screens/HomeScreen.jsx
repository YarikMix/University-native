import { View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import Post from "../components/Post";
import React, {useEffect, useState} from "react";
import {Loading} from "../components/Loader";
import {axiosInstance} from "../API";


const HomeScreen =({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])

    const fetchPosts = () => {
        setIsLoading(true)
        axiosInstance
            .get("/groups")
            .then(({data}) => {
                setItems(data)
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchPosts, [])


    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <View>

            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate("FullPost", {id: item.id, name: item.name })}>
                        <Post navigation={navigation} id={item.id} name={item.name} faculty={item.faculty} />
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

export default HomeScreen;
