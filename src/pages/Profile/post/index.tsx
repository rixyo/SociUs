
import ProfilePostForm from '@/components/ProfilePost/ProfilePostForm/ProfilePostForm';
import { auth } from '@/Firebase/clientapp';
import { Flex,Text,Box } from '@chakra-ui/react';

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';



const index:React.FC = () => {
    const [user]=useAuthState(auth)
    
    return (
        <>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" >Create Post</Text>
       <Flex justify="center" padding="16px">
        <Flex width="95%" justify="center" maxWidth="860px">
     
              
             {user&&
             <Flex
             direction="column"
             width={{ base: "100%", md: "65%" }}
             mr={{ base: 0, md: 6 }}
             >
            <ProfilePostForm user={user} />
             </Flex>
             }   
              
           
               
</Flex>
</Flex>
        </> 
    )
}
export default index;