import { Stack } from "expo-router"
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import '../global.css'

import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  return (<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>

    <QueryClientProvider client={queryClient}>

     <Stack screenOptions={{ headerShown: false }} />

    </QueryClientProvider>


  </ClerkProvider>
)}
