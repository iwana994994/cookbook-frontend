import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { usePosts } from "@/hooks/usePosts";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {Post} from "../types/index"

const PostList = ({username}:{username?:string}) => {
    const { currentUser } = useCurrentUser();
  const {  posts} = usePosts(username);

if(posts.length === 0){
     return (
    <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold">No posts yet</Text>
        </View>

)}

  return (
    <ScrollView>
      {posts.map((post:Post) => (
        <View key={post._id} className="p-4 border-b border-gray-200">
          <Text className="text-base">{post.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default PostList;
