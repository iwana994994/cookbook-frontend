import { Stack } from "expo-router"
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import '../global.css'

import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'

const queryClient = new QueryClient()



export default function RootLayout() {
  return (<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>

    <QueryClientProvider client={queryClient}>

     <Stack screenOptions={{ headerShown: false }} />

    </QueryClientProvider>


  </ClerkProvider>
)}
