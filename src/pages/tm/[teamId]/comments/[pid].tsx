import { Post } from '@/atoms/postAtom';
import usePost from '@/components/hooks/usePost';
import useTeamData from '@/components/hooks/useTeamData';
import PageContent from '@/components/Layout/PageContent';
import PostIteam from '@/components/Posts/PostIteam';
import About from '@/components/teams/About';
import { auth, fireStore } from '@/Firebase/clientapp';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
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
        <PageContent>
            <>
           {postStateValue.selectedPost&& 
           <PostIteam post={postStateValue.selectedPost} onVote={onVote} onDeletePost={onDeletePost}
            userVoteValue={postStateValue.postVotes.find(vote=>vote.postId===postStateValue.selectedPost?.id)?.voteValue}
            isCreator={postStateValue.selectedPost?.creatorId===user?.uid}
            />
            }
            </>
            <>
         {teamStateValue.currentTeam && <About teamData={teamStateValue.currentTeam} />}   
          
            </>

        </PageContent>
    )
}
export default postPage;