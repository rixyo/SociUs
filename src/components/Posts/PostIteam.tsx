import { Post } from '@/atoms/postAtom';
import React, { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat} from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Flex, Icon,Stack,Text,Image, Skeleton } from '@chakra-ui/react';
import moment from 'moment';
import { auth } from '@/Firebase/clientapp';
import { useAuthState } from 'react-firebase-hooks/auth';
;

type PostIteamProps = {
    post:Post,
    isCreator:boolean,
    onSelectPost:()=>void,
   userVoteValue?:number,
   onVote:()=>{}
   onDeletePost:()=>{}
    

};

const PostIteam:React.FC<PostIteamProps> = ({post,onSelectPost,userVoteValue,onDeletePost,onVote}) => {
    const [user]=useAuthState(auth)
    const [loading,setLoading]=useState<boolean>(true)
    
    return(
        <Flex border="1px solid" bg="white" borderColor="gray.300" borderRadius={4} _hover={{borderColor:'gray.500'}} cursor="pointer" 
        onClick={onSelectPost} 
        >
           
            <Flex direction="column" align="center" bg="gray.100" p={2} width="40px">
                <Icon as={userVoteValue===1?IoArrowUpCircleSharp:IoArrowUpCircleOutline} color={userVoteValue===1?"brand.100":"gray.400"} fontSize={22} 
                onClick={onVote}
                cursor="pointer"
                />
                <Text fontSize="9pt">{post.voteStatus}</Text>
                <Icon as={userVoteValue===-1? IoArrowDownCircleSharp: IoArrowDownCircleOutline} color={userVoteValue===-1?"#4379ff":"gray.400"} fontSize={22} cursor="pointer" 
                onClick={onVote}
                />

            </Flex>
            <Flex direction="column"width="100%">
                <Stack spacing={1} padding="10px">
                    <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                        {/** Check Homepage or not */}
                        <Text>Posted by tm/{post?.creatorDisplayName} {moment(new Date(post.createdAt?.seconds*1000)).fromNow()}</Text>
                    </Stack>
                    <Text fontStyle="12pt" fontWeight={600}>{post.title}</Text>
                 
                    <Text fontSize="10pt">{post?.body}</Text>
                    {post?.linkUrl &&
                   <a href={post.linkUrl} target="_blank">{post.linkUrl}</a>
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
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={AiOutlineDelete} fontSize={18} mr={2} onClick={onDeletePost} />
                        <Text fontSize="9pt">Delete</Text>
                    </Flex>
}

                </Flex>
            </Flex>
         
            
        </Flex>
    )
}
export default PostIteam;