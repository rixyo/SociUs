import { Post } from '@/atoms/postAtom';
import React from 'react';
//import moment from "moment";
import { NextRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Flex } from '@chakra-ui/react';

type PostIteamProps = {
    post:Post,
    isCreator:boolean,
    

};

const PostIteam:React.FC<PostIteamProps> = ({post}) => {
    
    return(
        <Flex border="1px solid" bg="white" borderColor="gray.500">
            {post?.title}
         
            
        </Flex>
    )
}
export default PostIteam;