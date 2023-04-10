import { auth } from '@/Firebase/clientapp';
import { Box,Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import NewProfilePostForm from './PostForm/NewProfilePostFrom';


type indexProps = {
  
};

const index:React.FC<indexProps> = () => {
  const [user]=useAuthState(auth)
  
  return (
    <>
    <Box p="14px 0" borderBottom="1px solid white">
        <Text textAlign="center" >Create Post</Text>
     {user&&
     <NewProfilePostForm user={user} />
     }   
        </Box>
        </>
  )
}
export default index;