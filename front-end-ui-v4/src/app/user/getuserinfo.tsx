import { betterFetch } from "@better-fetch/fetch";
import { authClient } from "@/lib/auth-client";
// import auth from '@/lib/auth'
export async function getUserInfoForSIdeBar() {
    const { data: sessionInfo } = await authClient.getSession();
    const user = sessionInfo?.user
    if (!user) {
        return {}
    }
    return {
        name: user.name ,
        email: user.email ,
        avatar: user.image 
    }


}