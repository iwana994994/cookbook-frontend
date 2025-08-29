import { View, Text, ScrollView, Image, TouchableOpacity, Alert} from "react-native";
import React from "react";
import { usePosts } from "@/hooks/usePosts";

import {Post} from "../types/index"
import { Feather } from "@expo/vector-icons";

const PostList = ({username}:{username?:string}) => {

  const {posts,deletePost} = usePosts(username);
  const handleDelete = (postId: string) => {

    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deletePost.mutate(postId), // poziv funkcije sa id-em
      },
      
    ])
    
  }
  


 

if(posts.length === 0){
     return (
    <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold">No posts yet</Text>
        </View>

)}

  return (
 <ScrollView >
  {posts.map((post: Post) => (
    <View
      key={post._id}
      className="flex-row p-4 border border-gray-200 items-start"
    >
      {/* Slika autora */}
      
        <Image
          source={{ uri: post.user.imageUrl }}
          className="w-12 h-12 rounded-full mr-3"
        />
     

      {/* Tekst i datum */}
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="font-semibold text-base mr-2">
            {post.user.firstName} {post.user.lastName}
          </Text>
          <Text className="text-gray-500 text-[10px]">@{post.user.username} · {new Date(post.createdAt).toLocaleString()}</Text>
        </View>
        <View className="flex-row items-center mb-1 justify-between">
        <Text className="text-base">{post.content}</Text>
          <TouchableOpacity onPress={() => handleDelete(post._id)}>
                <Feather name="trash" size={20} color="#657786" />
              </TouchableOpacity>
              </View>
      </View>
    </View>
  ))}
</ScrollView>

  );
};

export default PostList;
