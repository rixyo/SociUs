import { Post, postState } from '@/atoms/postAtom';
import React, { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot} from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Flex, Icon,Stack,Text,Image, Skeleton, Button } from '@chakra-ui/react';
import moment from 'moment';
import { auth} from '@/Firebase/clientapp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {GiDove} from "react-icons/gi"

type PostIteamProps = {
    post:Post,
    isCreator:boolean,
    onSelectPost?:(post:Post)=>void,
   userVoteValue?:number,
   onVote:(event:React.MouseEvent<SVGElement,MouseEvent>,post:Post,vote:number,teamId:string)=>void
   onDeletePost:(post:Post)=>Promise<boolean>
   homePage?:boolean
    

};


const PostIteam:React.FC<PostIteamProps> = ({post,onSelectPost,userVoteValue,onDeletePost,onVote,homePage}) => {
   const router=useRouter()
    const [user]=useAuthState(auth)
    const [loading,setLoading]=useState<boolean>(true)
    const [customError,setCustomError]=useState<string>('')
    const singlePostPage:boolean=!onSelectPost
  
    const handleDelete =async(event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
        event.stopPropagation()
        try {
            const success=await onDeletePost(post)
            if(!success){
               throw new Error("Post Does not Deleted")
            }
            if(singlePostPage){
                router.push(`/tm/${post.teamId}`)
            }
            
        } catch (error:any) {
            setCustomError(error.message)
            
        }
            
        } 
    
    return(
        <Flex border="1px solid" bg="white" borderColor={singlePostPage?"white":"gray.300"} borderRadius={singlePostPage?"4px 4px 0px 0px":"4px"}
         _hover={{borderColor:singlePostPage?"none":"gray.500"}} cursor={singlePostPage?"unset":"pointer"}
        onClick={()=>onSelectPost && onSelectPost(post)} 
        >
           
           <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event) => onVote(event, post, 1, post.teamId)}
        />
        <Text fontSize="9pt" fontWeight={600}>
          {post.voteStatus}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event) => onVote(event, post, -1, post.teamId)}
        />
      </Flex>
            <Flex direction="column"width="100%">
                <Stack spacing={1} padding="10px">
                    <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                        {/** Check Homepage or not */}
                        {homePage &&(
                            <>
                            {post.teamImageUrl ? (
                                <Image src={post.teamImageUrl} borderRadius="full" boxSize="20px" mr={2} />
                            ):(
                                <Icon as={GiDove} fontSize="18pt" mr={1} color="teal.500" />
                            )}
                            <Link href={`tm/${post.teamId}`}>
                                <Text fontWeight={600}
                                _hover={{textDecoration:"underline",cursor:"pointer"}}
                                onClick={(event)=>event.stopPropagation()}

                                >
                                  {`tm/${post.teamId}`}  
                                </Text>
                            </Link>
                            <Icon as={BsDot} color="gray.500" fontSize={8} />
                            {}

                            </>
                        )}
                        <Text display={{base:"none",md:"unset"}}>Posted by u/{post?.creatorDisplayName} {moment(new Date(post.createdAt?.seconds*1000)).fromNow()}</Text>
                    </Stack>
                    <Text fontStyle="12pt" fontWeight={600}>{post.title}</Text>
                 
                    <Text fontSize="10pt">{post?.body}</Text>
                    {post?.linkUrl &&
                   <Link href={post?.linkUrl} >
                    <Text fontSize="13pt">{post?.linkUrl}</Text>
                   </Link>
                    }

                  
                    {post?.imageUrl &&
                    <Flex justify="center" align="center" p={2}>
                        {loading && (
                            <Skeleton height="200px" width="100%" borderRadius={4} />
                        )}
                        <Image src={post?.imageUrl} maxHeight="460px" alt={post?.title} display={loading? "none":"unset"}
                         onLoad={()=>setLoading(false)}  />

                    </Flex>
                    
                    }

                </Stack>
                <Flex ml={1} mb={0.5} color="gray.500">
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={BsChat} fontSize={18} mr={2} />
                        <Text fontSize="9pt">{post?.numberOfComments}</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={IoArrowRedoOutline} fontSize={18} mr={2} />
                        <Text fontSize="9pt">Share</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={IoBookmarkOutline} fontSize={18} mr={2} />
                        <Text fontSize="9pt">Save</Text>
                     
                    </Flex>
                    {user?.uid===post.creatorId && 
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer" onClick={handleDelete}>
                        <Icon as={AiOutlineDelete} fontSize={18} mr={2} 
                        />
                        <Text fontSize="9pt">Delete</Text>
                    </Flex>
}

                </Flex>
            </Flex>
         
            
        </Flex>
    )
}
export default PostIteam;