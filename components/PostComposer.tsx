import { View, Text, TouchableOpacity, TextInput,Image } from 'react-native'
import React from 'react'
import { useCreatePost } from '@/hooks/useCreatePost';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const PostComposer = () => {
    const{createPost,content,setContent}=useCreatePost();
    const { currentUser } = useCurrentUser();
  return (
    <SafeAreaView className=' flex '>
         {/* create post */}
  <View className="flex-row items-center mb-2">
    {currentUser?.imageUrl && (
      <Image
        source={{ uri: currentUser.imageUrl }}
        className="w-10 h-10 rounded-full mr-2"
      />
    )}

    {/* ime + username */}
   
      <View className="flex-col items-center">
        <Text className="font-semibold text-base mr-1">
          {currentUser?.firstName} {currentUser?.lastName}
        </Text>
        <Text className="text-gray-400">@{currentUser?.username}</Text>
      </View>
    </View>
 

 {/* INPUT */}

        <View className='flex-row mr-2'>
      <View className='flex-1 mr-2'>
      
       <TextInput
  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-base"
  placeholder="Write something..."
  value={content}
  onChangeText={setContent}
/>
      
      </View>
      <TouchableOpacity onPress={createPost} className=' items-center justify-center border border-grey-600 px-4 py-2 rounded-full' >
        <Text>Post</Text>
        
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PostComposer