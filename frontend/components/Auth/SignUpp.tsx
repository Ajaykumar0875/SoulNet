'use client'


import Image from 'next/image';
import React, { ChangeEvent, FormEvent, use, useState } from 'react';
import PasswordInp from './PasswordInp';
import LoadingButton from '../Helper/LoadingButton';
import Link from 'next/link';
import { BASE_API_URL } from '@/server';
import axios from 'axios';
import { handleAuthRequest } from '../utils/apiRequest';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/Store/authSlice';
import { useRouter } from 'next/navigation';


interface FormData {
    username: string;
    email:string;
    password: string;
    passwordConfirm:string;
}



const SignUpp = () => {
   const dispatch = useDispatch()
   const router = useRouter();

    const [isLoading,setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        username:"",
        email:"",
        password:"",
        passwordConfirm:"",
    })

    // console.log(BASE_API_URL)


    const handleChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const {name,value} =  e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    };

    const handleSubmit = async(e:FormEvent)=>{
      e.preventDefault();
      const signupReq = async () => await axios.post(`${BASE_API_URL}/users/signup`,formData,{
        withCredentials:true,
      });

      const result = await handleAuthRequest(signupReq,setIsLoading)

      if(result){
        dispatch(setAuthUser(result.data.data.user));
        router.push("/auth/verify")
        toast.success(result.data.message);
      }




      //TODOS 
      //1)Redirect the user to home page 
      //2)We need to add our user to redux store , we use  redux for global state management system
 


    }  // Define signup request
    
    // console.log("FORMDATA",formData)

    return (
        <div className='w-full h-screen overflow-hidden'>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            {/* banner */}
            <div className='lg:col-span-4 h-screen hidden lg:block'>
              <Image
                src="/images/signup-banner.jpg"
                alt="signup"
                priority
                width={1000}
                height={1000}
                className='w-full h-full object-cover'
              />
            </div>
    
            {/* form */}
            <div className='lg:col-span-3 flex flex-col items-center justify-center h-screen'>
              <h1 className='font-bold text-xl sm:text-2xl text-left uppercase mb-8'>
                Sign Up with <span className="text-rose-600">SoulNet</span>
              </h1>
    
              <form onSubmit={handleSubmit} className='block w-[90%] sm:w-[80%] md:w-[60%] lg:w-[90%] xl:w-[80%]'>
                <div className='mb-4'>
                  <label htmlFor="username" className='font-semibold mb-2 block'>
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="px-4 py-3 bg-gray-200 rounded-lg w-full block outline-none"
                    value = {formData.username}
                    onChange={handleChange}
                  />
                </div>
    
                <div className='mb-4'>
                  <label htmlFor="email" className='font-semibold mb-2 block'>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="px-4 py-3 bg-gray-200 rounded-lg w-full block outline-none"
                    value= {formData.email}
                    onChange={handleChange}
                  />
                </div>
    
                <div className='mb-4'>
                  <PasswordInp
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    value = {formData.password}
                    onChange={handleChange}
                  />
                </div>
    
                <div className='mb-4'>
                  <PasswordInp
                    label="Confirm Password"
                    name="passwordConfirm"
                    placeholder="Enter Password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                  />
                </div>
                <LoadingButton size={"lg"} className="w-full mt-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-bold 
           py-3 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg shadow-red-400/40"  type="submit" isLoading = {isLoading}>
                    Sign up Now 
                </LoadingButton>
              </form>
              <h1 className='mt-4 text-lg text-gray-800'>
                Already have account ?{" "} <Link href="/auth/login">
                    <span className="text-blue-800 hover:text-blue-600 underline font-semibold cursor-pointer">Login Here</span></Link> 
                </h1>
            </div>
          </div>
        </div>
      );
};

export default SignUpp