import { authModalState } from '@/atoms/authModalAtom';
import { Post, postState, postVote } from '@/atoms/postAtom';
import { teamState } from '@/atoms/teamAtom';
import { auth, fireStore, storage } from '@/Firebase/clientapp';
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const usePost= () => {
    const [postStateValue,setPostStateValue]=useRecoilState(postState)
    const router=useRouter()
    const [user]=useAuthState(auth)
    const currentTeam=useRecoilValue(teamState).currentTeam
    const setAuthModalState = useSetRecoilState(authModalState);
    const onVote=async(event:React.MouseEvent<SVGElement,MouseEvent>, post:Post,vote:number,teamId:string)=>{
        event.stopPropagation()
        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            return;
          }
        try {
            const { voteStatus}=post
            const existingVote=postStateValue.postVotes.find(item=>item.postId===post.id)
            const batch=writeBatch(fireStore)
            const updatePost={...post}
            const updatedPosts=[...postStateValue.posts]
            let updatedPostVotes=[...postStateValue.postVotes]
            let voteChange=vote
            if(!existingVote){
                const postVoteRef=doc(collection(fireStore,'users',`${user?.uid}/postVotes`))
                const newVote:postVote={
                    id:postVoteRef.id,
                    postId:post.id!,
                    teamId,
                    voteValue:vote,
                }
                batch.set(postVoteRef,newVote)
              updatePost.voteStatus=voteStatus+vote
                updatedPostVotes=[...updatedPostVotes,newVote]
                
            }else{
                const postVoteRef=doc(fireStore,"users",`${user?.uid}/postVotes`,existingVote.id)
                if(existingVote.voteValue===vote){
                   updatePost.voteStatus=voteStatus-vote
                   updatedPostVotes=updatedPostVotes.filter(item=>item.id!==existingVote.id)
                     batch.delete(postVoteRef)
                     voteChange*=-1
            }else{
                updatePost.voteStatus=voteStatus+ 2 * vote
                const voteIndex=postStateValue.postVotes.findIndex(item=>item.id===existingVote.id)
                updatedPostVotes[voteIndex]={
                    ...existingVote,
                    voteValue:vote
                }
                batch.update(postVoteRef,{
                    voteValue:vote
                })
                voteChange=2*vote
            }
          
        } 
        const postIndex=postStateValue.posts.findIndex(item=>item.id===post.id)
        updatedPosts[postIndex]=updatePost
        setPostStateValue(prev=>({
            ...prev,
            posts:updatedPosts,
            postVotes:updatedPostVotes
        }))
        if(postStateValue.selectedPost){
            setPostStateValue((prev)=>({
                ...prev,
                selectedPost:updatePost
            }))
        }
        const postRef=doc(fireStore,'posts',post.id!)
        batch.update(postRef,{
            voteStatus: voteStatus+voteChange
        })
        await batch.commit()
        } catch (error:any) {
            console.log(error.message)
            
        }
    }
    const OnSelectPost=(post:Post)=>{
        setPostStateValue((prev)=>({
            ...prev,
            selectedPost:post
        }))
        router.push(`/tm/${post.teamId}/comments/${post.id}`)

    }
    const onDeletePost=async(post:Post):Promise<boolean>=>{
        try {
            if(post.imageUrl){
                const imageRef=ref(storage,`posts/${post.id}/images`)
                await deleteObject(imageRef)
            }
            const postDoc=doc(fireStore,'posts',post.id!)
         
            await deleteDoc(postDoc)
            setPostStateValue(prev=>({
                ...prev,
                posts:prev.posts.filter(item=>item.id!==post.id)
            }))
           
            return true
         
            
        } catch (error:any) {
            console.log(error.message)
            return false
            
        }
        

    }
    const getTeamPosts=async(teamId:string)=>{
        const postVoteQuery=query(collection(fireStore,"users",`${user?.uid}/postVotes`),where("teamId","==",teamId))
        const postVoteDoc=await getDocs(postVoteQuery)
        const postVotes=postVoteDoc.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
        }))
        setPostStateValue(prev=>({
            ...prev,
            postVotes:postVotes as postVote[]
        }))
    }
    useEffect(()=>{
        if(!currentTeam?.id||!user) return
        
        
        getTeamPosts(currentTeam?.id)
    },[user,currentTeam])
   
    
    return{
        postStateValue,
        setPostStateValue,
        onVote,
        OnSelectPost,
        onDeletePost,
    }
}
export default usePost;