
import { useUserSync } from "../../hooks/useUserSync";
import { Image, SafeAreaView } from 'react-native'
import SignOutButton from "../../components/SignOutButton";
import PostComposer from "@/components/PostComposer";
import PostList from "@/components/PostList";




export default function HomeScreen() {
  useUserSync();
 
  
  return (
// HEADER
<>
    <SafeAreaView className="flex-row justify-between items-center mt-6" >
      <Image source={require("../../assets/images/book-bro.png")} className="w-20 h-20  "  />
      <SignOutButton />
    </SafeAreaView>
    <PostComposer/>
    <PostList/>
</>
   
     
  )
}