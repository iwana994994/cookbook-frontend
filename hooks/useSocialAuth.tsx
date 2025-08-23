import { useSSO } from "@clerk/clerk-expo"

export const useSocialAuth = () => {
    const {startSSOFlow}=useSSO()
    const handleSocialAuth = async (strategy:"oauth_google") => {
        try {
           const {createdSessionId,setActive }= await startSSOFlow({
                strategy,
            })
            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId})
            }
        } catch (error) {
            console.error("Social Auth Error:", error)
        }
    }
    return { handleSocialAuth }
}