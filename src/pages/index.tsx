import PageContent from '@/components/Layout/PageContent'
import { auth, fireStore } from '@/Firebase/clientapp'
import { use, useState } from 'react'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import CreatePostLink from './Profile/ProfilePost/CreatePostLink'
import { query, collection, orderBy, limit, getDocs, where } from 'firebase/firestore'
import usePost from '@/components/hooks/usePost'
import { Post, postVote } from '@/atoms/postAtom'
import PostLoader from '@/components/Posts/PostLoader'
import { Stack } from '@chakra-ui/react'
import PostIteam from '@/components/Posts/PostIteam'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ProfilePost, profilePostState } from '@/atoms/profilePostAtom'
import PostItems from './Profile/ProfilePost/PostItems'
import { teamState } from '@/atoms/teamAtom'
import useTeamData from '@/components/hooks/useTeamData'
import { useRouter } from 'next/router'
import Recommendation from '@/components/teams/Recommendation'

const Home: NextPage = () => {
  const [user,loadinUser]=useAuthState(auth)
  const [profilePostStateValue,setProfilePostStateValue]=useRecoilState(profilePostState)
  const {postStateValue,setPostStateValue,OnSelectPost,onDeletePost,onVote}=usePost()
  const router=useRouter()
  //const teamStateValue=useRecoilValue(teamState)
  const {teamStateValue}=useTeamData()
  const [nonAuthloading,setnonAuthLoading]=useState<boolean>(false)
  const [loading,setLoading]=useState<boolean>(false)
  const buildUserFeed=async()=>{
  
    setnonAuthLoading(true)
    try {
      if(teamStateValue.mySnippets.length){
        const teamIds=teamStateValue.mySnippets.map((item)=>item.teamId)
        const postQuery= query(collection(fireStore,"posts"),where("teamId","in",teamIds),orderBy("createdAt","desc"),limit(10))
        const postDocs=await getDocs(postQuery)
        const posts=postDocs.docs.map((doc)=>({
          id:doc.id, ...doc.data()
        }))
        setPostStateValue((prev)=>({
          ...prev,
          posts:posts as Post[]
        }))

      }else{
        buildNoUserFeed()
      }
      
    } catch (error) {
      console.log("buildUserFeed",error)
      
    }
    setnonAuthLoading(false)

  }
  const buildNoUserFeed=async()=>{
    setLoading(true)
  
    try {
      const postQuery= query(collection(fireStore,"profilePosts"),orderBy("createdAt","desc"),limit(10))
      const postDocs=await getDocs(postQuery)
      const posts=postDocs.docs.map((doc)=>({
        id:doc.id, ...doc.data()
      }))
      setProfilePostStateValue((prev)=>({
        ...prev,
        posts:posts as ProfilePost[]
      }))
      
    } catch (error) {
      console.log("buildNoUserFeed",error)
      
    }
    setLoading(false)

  }
  const getUserVote=async()=>{
    try {
      const postIds=postStateValue.posts.map((item)=>item.id)
      const voteQuery= query(collection(fireStore,`users/${user?.uid}/postVotes`),where("postId","in",postIds))
      const voteDocs=await getDocs(voteQuery)
      const votes=voteDocs.docs.map((doc)=>({
        id:doc.id, ...doc.data()
      }))
      setPostStateValue((prev)=>({
        ...prev,
        postVotes:votes as postVote[]
      }))
      
    } catch (error) {
      console.log("getUserVote",error)
      
    }
  }
  useEffect(()=>{
    if(user && postStateValue.posts.length) getUserVote()
    return ()=>setPostStateValue((prev)=>({
      ...prev,
      postVotes:[]
    }))
  },[user,postStateValue.posts])

  useEffect(()=>{
    if(teamStateValue.snippetsFeatchStatus) buildUserFeed()
  },[teamStateValue.snippetsFeatchStatus])
  useEffect(()=>{
    if(!user && !loadinUser) buildNoUserFeed()

  },[user,loadinUser])
  return(
   <PageContent
   maxWidth= "900px"
    justify= "center"
    padding= "16px"
    width= "95%"
   >
    <>
    <CreatePostLink/>
    {!user && !loadinUser &&(
      <>
      {nonAuthloading?(
        <PostLoader/>
      ):(
        <Stack>
          {profilePostStateValue.posts.map((item)=>(
          < PostItems post={item} creatorId={item.creatorId} />
          ))}
          </Stack>

      )}
      </>
    )}
    {user && !loadinUser &&(
      <>
      {loading?(
        <PostLoader/>
      ):(
          <Stack>
          {postStateValue.posts.map((post)=>(
            <PostIteam
              key={post.id}
              post={post}
              onSelectPost={OnSelectPost}
              onDeletePost={onDeletePost}
              onVote={onVote}
              userVoteValue={
                postStateValue.postVotes.find((vote)=>vote.postId===post.id)?.voteValue
              }
              isCreator={post.creatorId===user?.uid}
              homePage
            />
          ))}
        </Stack>

      )}
      </>
    )}
    
    </>
    <>
    <Recommendation/>
    </>
   </PageContent>
  )

}
export default Home