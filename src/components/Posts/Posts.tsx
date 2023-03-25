import { Post } from '@/atoms/postAtom';
import { Team } from '@/atoms/teamAtom';
import { auth, fireStore } from '@/Firebase/clientapp';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import {useRouter} from 'next/router';
import React,{useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import usePost from '../hooks/usePost';
import PostIteam from './PostIteam';



const Posts:React.FC = () => {
    const [loading,setLoading]=useState<boolean>(false)
    const {postStateValue,setPostStateValue}=usePost()
    const [user]=useAuthState(auth)
   
 
    const router=useRouter()
    const getPosts=async()=>{
        const q=query(collection(fireStore,"posts"),where("teamId","==",`${router.query.teamId}`),orderBy("createdAt","desc"))
        const querySnapshot = await getDocs(q);
       const posts= querySnapshot.docs.map((doc)=>({
            id:doc.id, ...doc.data()
        }))
        setPostStateValue((prev)=>({
            ...prev,
            posts:posts as Post[]
        }))
        //console.log(postState)   
       }
       useEffect(()=>{
        getPosts()
       },[])
    
    
    return(
        <>
           {postStateValue.posts.map(item=>(
            <PostIteam post={item} isCreator={item.creatorId===user?.uid} />
           ))}
     
        </>
    )
}
export default Posts;