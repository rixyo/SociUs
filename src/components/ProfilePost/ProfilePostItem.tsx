import { ProfilePost, profilePostState } from '@/atoms/profilePostAtom';
import { storage, fireStore } from '@/Firebase/clientapp';
import post from '@/pages/Profile/post';
import { Flex, Icon,Stack,Text,Image, Skeleton, Avatar } from '@chakra-ui/react';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import moment from 'moment';
import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineLike } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
type ProfilePostItemProps = {
  profilePost:ProfilePost,
    isCreator:boolean

};

const ProfilePostItem:React.FC<ProfilePostItemProps> = ({profilePost,isCreator}) => {
    const [loading,setLoading]=useState<boolean>(true)
    const [profilePostStateValue,setProfilePostStateValue]=useRecoilState(profilePostState)
    const onDeletePost=async()=>{
        try {
            if(profilePost.imageLink){
                const imageRef=ref(storage,`profilePosts/${profilePost.id}/images`)
                await deleteObject(imageRef)
            }
            const postDoc=doc(fireStore,'profilePosts',profilePost.id!)
         
            await deleteDoc(postDoc)
            setProfilePostStateValue(prev=>({
                ...prev,posts:prev.posts.filter(post=>post.id!==profilePost.id)
            }))

         
           
        
         
            
        } catch (error:any) {
            console.log(error.message)
         
            
        }
        

    }
    return (
        <Flex border="1px solid" bg="white" borderColor={"gray.300"} borderRadius={"4px"}
       cursor={"pointer"} _hover={{borderColor:"gray.500"}}
       >
             
             <Flex
        direction="column"
        align="center"
        bg={"gray.100"}
        p={2}
        width="40px"
        borderRadius={"3px 0px 0px 3px"}
      >

      </Flex>
        <Flex direction="column" width="100%">
        
               <Flex >
               <Avatar name={profilePost.creatorDisplayName} width="30px" height="30px" mt={2} borderRadius="full"  />
               <Text mt={2} ml={2}>{profilePost.creatorDisplayName} </Text>
               <Text display={{base:"none",md:"unset"}} mt={2} ml={2} color="gray.500"> {moment(new Date(profilePost.createdAt?.seconds*1000)).fromNow()}</Text>
               </Flex>
               <Flex direction="column">
           
            

               <Text fontStyle="12pt" fontWeight={600} mt={3}>{profilePost.name}</Text>
                 
                 <Text fontSize="10pt" color="gray.600" fontWeight={600} >{profilePost?.about}</Text>
            
     

               </Flex>
                                
               {profilePost.imageLink &&
                    <Flex justify="center" align="center" p={2}>
                        {loading && (
                            <Skeleton height="200px" width="100%" borderRadius={4} />
                        )}
                        <Image src={profilePost.imageLink} maxHeight="460px" alt={profilePost.name} display={loading? "none":"unset"}
                         onLoad={()=>setLoading(false)}  />

                    </Flex>
                    
                    }
            
           
             
          
            <Flex ml={1} mb={0.5} color="gray.500">
            <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={AiOutlineLike} fontSize={18} mr={2} />
                        <Text fontSize="9pt">{profilePost.likes}</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={BsChat} fontSize={18} mr={2} />
                        <Text fontSize="9pt">{profilePost.numberOfComments}</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={IoArrowRedoOutline} fontSize={18} mr={2} />
                        <Text fontSize="9pt">Share</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer">
                        <Icon as={IoBookmarkOutline} fontSize={18} mr={2} />
                        <Text fontSize="9pt">Save</Text>
                     
                    </Flex>
                    {isCreator && 
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer"
                    onClick={onDeletePost}
                    >
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
export default ProfilePostItem;