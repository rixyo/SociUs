import { Post } from '@/atoms/postAtom';
import { auth, fireStore } from '@/Firebase/clientapp';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { profilePostState } from '@/atoms/profilePostAtom';
import PostLoader from '@/components/Posts/PostLoader';
import { Stack } from '@chakra-ui/react';
import PostItems from './PostItems';
import { User } from 'firebase/auth';
type Props = {
    user: User
}
const Posts:React.FC<Props> = ({user}) => {
   
    const [loading,setLoading]=useState<boolean>(false)
    const [postStateValue,setPostStateValue]=useRecoilState(profilePostState)
    const getProfilePosts=async()=>{
        if(!user) return;
        try {
            const q=query(collection(fireStore,"profilePosts"),where("creatorId","==",`${user.uid}`),orderBy("createdAt","desc"))
            const querySnapshot = await getDocs(q);
           const posts= querySnapshot.docs.map((doc)=>({
                id:doc.id, ...doc.data()
            }))
            setPostStateValue((prev)=>({
                ...prev,
                posts:posts as Post[]
            }))
            
        } catch (error:any) {
            console.log(error.message)
            
        }
        setLoading(false)
    
        //console.log(postState)
    }
    useEffect(()=>{
        getProfilePosts()
    } ,[user])
    
    return (
        <>
        {loading ?( <PostLoader />) :(
              <Stack>
              {postStateValue.posts.map(item=>(
                   <PostItems key={item.body+Math.random()} post={item} creatorId={item.creatorId}
                   

                     />
                  ))}
                 
       
              </Stack>
        )
          
        }
     
          
     
        </>
    )
}
export default Posts;