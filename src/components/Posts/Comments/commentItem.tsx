import { Box, Flex, Icon, Spinner, Stack,Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { GiDove } from 'react-icons/gi';
import moment from 'moment';
import {
    IoArrowDownCircleOutline,
    IoArrowUpCircleOutline,
  } from "react-icons/io5";
  import { AiOutlineDelete } from "react-icons/ai";

export type commentType={
    id:string,
    commentBody:string,
    createdBy:string,
    creatorDisplayName:string,
    teamId:string,
    postId:string,
    postTitle:string,
    createdAt: Timestamp

}
type commentItemProps = {
    comment:commentType,
    userId:string
    deleteComment:(comment:commentType)=>void,
    loadindDelete:boolean,

    
};
const commentItem:React.FC<commentItemProps> = ({comment,userId,deleteComment,loadindDelete}) => {
    
    return(
        <Flex>
            <Box mr={2}>
                <Icon as={GiDove} fontSize={30} color="gray.300" />
            </Box>
            <Stack spacing={1}>
            <Stack direction="row" align="center" fontSize="8pt">
                <Text fontWeight="bold">{comment.creatorDisplayName}</Text>
                <Text color="gray.600">{moment(new Date(comment.createdAt.seconds *1000)).fromNow()}</Text>
                {loadindDelete && <Spinner size="sm" color="teal.500" />}
                
            </Stack>
            <Text fontSize="10pt">
                {comment.commentBody}
            </Text>
            <Stack direction="row" align="center" cursor="pointer" color="gray.500">
                <Icon as ={IoArrowUpCircleOutline} fontSize={20} />
                
                <Icon as ={IoArrowDownCircleOutline} fontSize={20} />
                {userId===comment.createdBy  && (
                    <>
                    <Text fontSize="9pt" _hover={{color:"teal.500"}} color="gray.500">Edit</Text>
                    <Text fontSize="9pt" _hover={{color:"teal.500"}} color="gray.500"
                    onClick={()=>deleteComment(comment)}
                    >Delete</Text>
                    </>
                )}
                

            </Stack>
            </Stack>
        </Flex>
    )
}
export default commentItem;