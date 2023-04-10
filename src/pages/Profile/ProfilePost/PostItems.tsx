import { ProfilePost } from '@/atoms/profilePostAtom';
import { auth } from '@/Firebase/clientapp';
import { Flex, Stack, Skeleton, Icon,Image,Text } from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
;
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowRedoOutline, IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoBookmarkOutline } from 'react-icons/io5';

type PostItemsProps = {
    post:ProfilePost,
    creatorId:string,
    
};

const PostItems:React.FC<PostItemsProps> = ({post,creatorId}) => {
    const [loading,setLoading]=useState<boolean>(true)
    const [user]=useAuthState(auth)
    return (
        <Flex border="1px solid" bg="white" borderColor={"gray.300"} borderRadius={"4px"}
        _hover={{borderColor:"gray.500"}} cursor={"pointer"}
    
       >
            <Flex
        direction="column"
        align="center"
        bg={ "gray.100"}
        p={2}
        width="40px"
        borderRadius={"3px 0px 0px 3px"}
      >
        <Icon
          as={
           false ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={false ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
      
        />
        <Text fontSize="9pt" fontWeight={600}>
          {post.voteStatus}
        </Text>
        <Icon
          as={
          false
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={false ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
     
        />
      </Flex>
          
         
           <Flex direction="column"width="100%">
               <Stack spacing={1} padding="10px">
                   <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                      
                       <Text>{user?.displayName} {moment(new Date(post.createdAt?.seconds*1000)).fromNow()}</Text>
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
                   {creatorId===user?.uid && 
                   <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer" >
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
export default PostItems;