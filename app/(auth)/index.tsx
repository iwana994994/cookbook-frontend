import {TouchableOpacity, View,Text} from "react-native";
import { useSocialAuth } from "../../hooks/useSocialAuth";

export default function Index() {
  const{handleSocialAuth}=useSocialAuth()
  return (
     
      <View className="flex-1 justify-between bg-wite">
        
       
          <TouchableOpacity onPress={() => {handleSocialAuth("oauth_google")}} className=" m-6 items-center justify-center
           border border-black rounded-full">
               <Text className="text-2xl font-bold from-neutral-50 ">Login with Google</Text>
          </TouchableOpacity>
          
    </View>
  )
}


  

