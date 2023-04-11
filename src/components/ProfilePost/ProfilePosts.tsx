import { ProfilePost, profilePostState } from '@/atoms/profilePostAtom';
import { auth, fireStore } from '@/Firebase/clientapp';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

import PostLoader from '../Posts/PostLoader';
import ProfilePostItem from './ProfilePostItem';



const ProfilePosts:React.FC = () => {
    const [user]=useAuthState(auth)
    const [loading,setLoading]=useState<boolean>(false)
    const [profilePostStateValue,setProfilePostStateValue]=useRecoilState(profilePostState)
    const getProfilePosts=async()=>{
        setLoading(true)
        try {
            
            const profilePost=query(collection(fireStore,"profilePosts"),where("createdBy","==",`${user?.uid}`))
            const profilePostSnapshot=await getDocs(profilePost)
            const posts=profilePostSnapshot.docs.map((doc)=>({
                id:doc.id,...doc.data()
            }))
            
            setProfilePostStateValue(prev=>({
                ...prev,posts:posts as ProfilePost[],
            }))
        } catch (error) {
            console.log("profile post error",error)
            
        }
        setLoading(false)
    }
    useEffect(()=>{
        getProfilePosts()
    },[user])
    
    return(
        <>
        {loading ?(<PostLoader/>):(
            <Stack>
           {profilePostStateValue.posts.map(profilePost=>(
            <>
     
            <ProfilePostItem key={profilePost.id} profilePost={profilePost} isCreator={profilePost.createdBy===user?.uid}/>
            </>
           ))}
            </Stack>
        )}
       
        </>
    )
}
export default ProfilePosts;