import { Post } from '@/atoms/postAtom';
import usePost from '@/components/hooks/usePost';
import useTeamData from '@/components/hooks/useTeamData';

import Comments from '@/components/Posts/Comments/comment';
import PostIteam from '@/components/Posts/PostIteam';
import About from '@/components/teams/About';
import { auth, fireStore } from '@/Firebase/clientapp';
import { Box, Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {  doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


const postPage:React.FC = () => {
    const { postStateValue,setPostStateValue,onDeletePost,onVote}=usePost()
    const [user]=useAuthState(auth)
    const router=useRouter()
    const {teamStateValue}=useTeamData()
    const fetchPost=async(postId:string)=>{
        try {
            const postDocRef=doc(fireStore,"posts",postId)
            const postDoc=await getDoc(postDocRef)
            setPostStateValue((prev)=>({
                ...prev,
                selectedPost:{id:postDoc.id,...postDoc.data()} as Post
            }))
            
        } catch (error:any) {
            console.log(error.message)
            
        }

    }
    useEffect(()=>{
        const {pid}=router.query
        if(pid && !postStateValue.selectedPost){
            fetchPost(pid as string)
        }
       
    },[router.query,postStateValue.selectedPost])
    
    return(
        <Flex justify="center" padding="16px" >
            < Flex width="95%" justify="center" maxWidth="860px">
          <Flex  direction="column"
       width={{ base: "100%", md: "65%" }}
       mr={{ base: 0, md: 6 }}>
           {postStateValue.selectedPost&& 
           <PostIteam post={postStateValue.selectedPost} onVote={onVote} onDeletePost={onDeletePost}
            userVoteValue={postStateValue.postVotes.find(vote=>vote.postId===postStateValue.selectedPost?.id)?.voteValue}
            isCreator={postStateValue.selectedPost?.creatorId===user?.uid}
            />
            }
         <Comments user={user as User} selectedPost={postStateValue.selectedPost} teamId={postStateValue.selectedPost?.teamId as string}  />
            </Flex>
            <Box   display={{ base: "none", md: "flex" }}
     flexDirection="column"
     flexGrow={1}>
         {teamStateValue.currentTeam && <About teamData={teamStateValue.currentTeam} />}   
          
            </Box>
         </Flex>

        </Flex>
    )
}
export default postPage;