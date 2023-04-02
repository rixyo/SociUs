import { Post, postState } from '@/atoms/postAtom';
import { fireStore } from '@/Firebase/clientapp';
import { Box, Flex, SkeletonCircle, SkeletonText, Stack,Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { collection, doc, getDocs, increment, orderBy, query, serverTimestamp, Timestamp, where, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CommentInput from './commentInput';
import CommentItem, { commentType } from './commentItem';

type commentProps = {
    user:User,
    selectedPost:Post |null,
    teamId:string
    
};


const Comments:React.FC<commentProps> = ({user,selectedPost,teamId}) => {
    const [commentValue,setCommentValue]=useState<string>('')
    const [comments,setComments]=useState<commentType[]>([])
    const [fetchLoading,setFetchLoading]=useState<boolean>(true)
    const [createCommentLoading,setCrateCommentLoading]=useState<boolean>(false)
    const [deleteCommentLoadingId,setDeleteCommentLoadingId]=useState<string>("")
    const setPostState=useSetRecoilState(postState)
    const createComment=async()=>{ 
        setCrateCommentLoading(true)
        try {
            const batch=writeBatch(fireStore)
            const commentRef=doc(collection(fireStore,"comments"))
            const newComment:commentType={
                id:commentRef.id,
                commentBody:commentValue,
                createdBy:user.uid,
                creatorDisplayName:user.displayName as string || user.email?.split("@")[0] as string,
                teamId:teamId,
                postId:selectedPost?.id as string,
                postTitle:selectedPost?.title as string,
                createdAt:serverTimestamp() as Timestamp
            }
            batch.set(commentRef,newComment)
            newComment.createdAt={ seconds: Date.now() / 1000} as Timestamp
            const postDocRef=doc(fireStore,"posts",selectedPost?.id as string)
            batch.update(postDocRef,{
                numberOfComments:increment(1)
            })
            if(commentValue.length<1){
                setCrateCommentLoading(false)
                return
            }
            else{
                await batch.commit()
                setCommentValue('')
                setComments((prev)=>[newComment,...prev])
               setPostState(prev=>({
                     ...prev,
                        selectedPost:{
                            ...prev.selectedPost,
                            numberOfComments:prev.selectedPost?.numberOfComments as number +1
                        } as Post,

                       
               } ))
            }
           
        


            
        } catch (error:any) {
            console.log("comments error",error.message)
            
        }
        setCrateCommentLoading(false)
    }
    const deleteComment=async(comment:commentType)=>{
        setDeleteCommentLoadingId(comment.id)
        try {
            const batch=writeBatch(fireStore)
            const commentRef=doc(collection(fireStore,"comments"),comment.id)
            batch.delete(commentRef)
            const postDocRef=doc(fireStore,"posts",selectedPost?.id as string)
            batch.update(postDocRef,{
                numberOfComments:increment(-1)
            })
            await batch.commit()
            setComments((prev)=>prev.filter((item)=>item.id!==comment.id))
            setPostState(prev=>({
                ...prev,
                   selectedPost:{
                       ...prev.selectedPost,
                       numberOfComments:prev.selectedPost?.numberOfComments as number -1
                   } as Post,

                  
          } ))
            
        } catch (error:any) {
            console.log("comments error",error.message)
            
        }
        setDeleteCommentLoadingId("")

    }
    const getComments=async()=>{
        try {
            const commentsRef= collection(fireStore,"comments")
            const commentsQuery=query(commentsRef,where("postId","==",selectedPost?.id as string),orderBy("createdAt","desc"))
            const commitDoc=await getDocs(commentsQuery)
            const commentsData=commitDoc.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
        
            setComments(commentsData as commentType[])
            
        } catch (error:any) {
            console.log("comments error",error.message)
            
        }
        setFetchLoading(false)
    }
    useEffect(()=>{
        if(selectedPost){
            getComments()
        }
      

    },[selectedPost])
    
    return(
       <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
        <Flex direction="column" pl={10} pr={4} mb={6} fontSize="10pt" width="100%" >
         {!fetchLoading && <CommentInput setCommentBody={setCommentValue} commentBody={commentValue} createCommentLoading={createCommentLoading} createComment={createComment} user={user}  />
          }   

        </Flex>
        <Stack spacing={6} p={2}>
            {fetchLoading ? (
                 <>
                 {[0, 1, 2].map((item) => (
                   <Box key={item} padding="6" bg="white">
                     <SkeletonCircle size="10" />
                     <SkeletonText mt="4" noOfLines={2} spacing="4" />
                   </Box>
                    ))}
                   </>

            ):(
                <>
             {comments.length===0 ? (
                <>
                    <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
                </>
             ):(
                <>
            {comments.map((comment)=>(
                <CommentItem key={comment.id} comment={comment} userId={user.uid} deleteComment={deleteComment} loadindDelete={deleteCommentLoadingId===comment.id} />
            ))}
                </>
             )}
                </>

            )}
            
        </Stack>
        
       </Box>
    )
}
export default Comments;