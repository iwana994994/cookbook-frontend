import {TouchableOpacity, View,Text,Image} from "react-native";
import { useSocialAuth } from "../../hooks/useSocialAuth";


export default function Index() {
  const{handleSocialAuth}=useSocialAuth()
  return (
     
      <View className="flex-1 justify-center items-center">
        <View className="mb-10">
          <Image source={require("../../assets/images/book-bro.png")} className="w-40 h-40  "  />
          </View>
       
          <TouchableOpacity onPress={() => {handleSocialAuth("oauth_google")}}
           className=" items-center justify-center border border-black px-4 py-2 rounded-full">
               <Text className="text-2xl font-bold from-neutral-50 ">Login with Google</Text>
          </TouchableOpacity>
          
    </View>
  )
}


  

