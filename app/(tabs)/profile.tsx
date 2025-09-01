import { View, Text, SafeAreaView,Image, ScrollView, TouchableOpacity, Alert } from 'react-native'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types';
import { Feather } from '@expo/vector-icons';
import { useSocketStore } from '@/hooks/useSocket';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-expo';

const Profile = () => {
  const { currentUser } = useCurrentUser();
  const{posts,deletePost}=usePosts()
  const{getToken,userId}=useAuth()

   const { isConnected, initSocket, disconnectSocket } = useSocketStore();

  // kad se korisnik pojavi, poveži socket
  useEffect(() => {
       async function connectSocket() {
      if (!userId) {
        console.log("Nema userId, socket se ne povezuje");
        return;
      }

      // Dobij token za backend verifikaciju
      const token = await getToken(); // default JWT token

      if (!token) {
        console.log("Nema tokena, socket se ne povezuje");
        return;
      }

      console.log("Token za socket:", token);
      initSocket(userId, token); // prosledi userId + token serveru
    }

    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [userId, getToken, initSocket, disconnectSocket]);
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
  return (
    // heder
    <>
    <SafeAreaView className='flex mt-20 ml-5'>
      <View>
        <Text className='text-2xl'>{currentUser?.firstName} {currentUser?.lastName}</Text>
        <Text className='text-gray-400'>@{currentUser?.username}</Text>
      </View>
    </SafeAreaView>
   <Image
  source={
    currentUser?.bannerUrl
      ? { uri: currentUser.bannerUrl }   // ako postoji banner
      : require("../../assets/images/book-bro.png") // default slika
  }
  className="w-full h-40 " resizeMode='cover'/>
  <View>
    <Image source={{ uri: currentUser.imageUrl }} className="w-40 h-40 rounded-full -mt-20 ml-4 border border-4 border-white rounded-full" />
  </View>
   {/* 🔵 status */}
          <View className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-400"}`} />
        
    <View className="mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-bold text-gray-900 mr-1">
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              <Feather name="check-circle" size={20} color="#1DA1F2" />
            </View>
            <Text className="text-gray-500 mb-2">@{currentUser.username}</Text>
           

            <View className="flex-row items-center mb-3">
              <Feather name="calendar" size={16} color="#657786" />
              <Text className="text-gray-500 ml-2">
                Joined {new Date(currentUser.createdAt).toLocaleDateString()}
              </Text>
            </View>

            <View className="flex-row">
              <TouchableOpacity className="mr-6">
                <Text className="text-gray-900">
                
                  <Text className="text-gray-500"> Following</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-gray-900">
                  
                  <Text className="text-gray-500"> Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        
  <ScrollView>
    {posts.map((post:Post) => (
      <View key={post._id} className="flex-col mb-1 justify-between border border-gray-200 rounded-lg p-4">
        
        <Text className="text-gray-400 text-[10px] mt-2">{new Date(post.createdAt).toLocaleString()}</Text>
    <View className='flex-row justify-between'>
        <Text className="text-lg font-bold mt-2">{post.content}</Text>
        
        <TouchableOpacity onPress={() => handleDelete(post._id)}>
           <Feather name="trash" size={20} color="#657786" />
        </TouchableOpacity>
        </View>
        
      </View>
      
    ))}
  </ScrollView>
  </>
  )
}

export default Profile