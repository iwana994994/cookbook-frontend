import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'

export default function TabsLayout() {
    const insets=useSafeAreaInsets()
    const {isSignedIn}=useAuth()
    if(!isSignedIn){
        return <Redirect href={'/(auth)'} />
    }
  return (
    <Tabs
    screenOptions={
        {
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
                backgroundColor: '#fff',
                height: 45 + insets.bottom,
                paddingBottom: 5,
                paddingTop: 5,
            },
            headerShown: false,
        }
    }
    >
        <Tabs.Screen
        
          name="index"
          options={{
            title: '',
            tabBarIcon:({size,color})=> <Ionicons name="home" size={size} color={color} />
          }}
        />
      <Tabs.Screen
        
          name="message"
          options={{
            title: '',
            tabBarIcon:({size,color})=> <Ionicons name="mail" size={size} color={color} />
          }}
        />
        <Tabs.Screen
        
          name="profile"
          options={{
            title: '',
            tabBarIcon:({size,color})=> <Ionicons name="person" size={size} color={color} />
          }}
        />
       

    </Tabs>
  )
}