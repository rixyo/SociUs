import { Post } from '@/atoms/postAtom';
import { auth, fireStore } from '@/Firebase/clientapp';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import {useRouter} from 'next/router';
import React,{useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import usePost from '../hooks/usePost';
import PostIteam from './PostIteam';
import {Stack} from '@chakra-ui/react';
import PostLoader from './PostLoader';





const Posts:React.FC = () => {
    const [loading,setLoading]=useState<boolean>(false)
    const {postStateValue,setPostStateValue,onDeletePost,onVote}=usePost()
    const [user]=useAuthState(auth)
    const onSelectPost=(post:Post)=>{
        setPostStateValue((prev)=>({
            ...prev,
            selectedPost:post
        }))
        router.push(`/tm/${post.teamId}/comments/${post.id}`)
    
    }
   
 
    const router=useRouter()
    const getPosts=async()=>{
        setLoading(true)
        try {
            const q=query(collection(fireStore,"posts"),where("teamId","==",`${router.query.teamId}`),orderBy("createdAt","desc"))
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
        getPosts()
       },[])

       
    
 
    return(
        <>
        {loading ?( <PostLoader />) :(
              <Stack>
              {postStateValue.posts.map(item=>(
                   <PostIteam key={item.body+Math.random()} post={item} isCreator={item.creatorId===user?.uid}
                    userVoteValue={postStateValue.postVotes.find(vote=>vote.postId===item.id)?.voteValue}

                    onVote={onVote} onSelectPost={onSelectPost} onDeletePost={onDeletePost} />
                  ))}
                 
       
              </Stack>
        )
          
        }
     
          
     
        </>
    )
}
export default Posts;