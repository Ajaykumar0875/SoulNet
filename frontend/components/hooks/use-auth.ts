import { BASE_API_URL } from "@/server"
import axios from "axios"
import { useDispatch } from "react-redux"
import { handleAuthRequest } from "../utils/apiRequest"
import { setAuthUser } from "@/Store/authSlice"
import { toast } from "sonner"

export const useFollowUnfollow = () =>{
    const dispatch = useDispatch()

    const handleFollowUnfollow = async(userId:string)=>{
        const followUnfollowReq = async() => await axios.post(`${BASE_API_URL}/users/followUnfollow/${userId}`,{},{
            withCredentials:true
        })

        const result = await handleAuthRequest(followUnfollowReq)
        if(result?.data.status === "Success"){
            dispatch(setAuthUser(result.data.data.user))
            toast.success(result.data.message)
        }
    };

    return {handleFollowUnfollow}
}

