import { teamState } from '@/atoms/teamAtom';

import NewPostForm from '@/components/Posts/NewPostForm';
import About from '@/components/teams/About';

import { auth } from '@/Firebase/clientapp';
import { Box,Flex,Text } from '@chakra-ui/react';

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';

const SubmitPostPage:React.FC = () => {
    const [user]=useAuthState(auth)
    const teamStateValue=useRecoilValue(teamState)
  
  
    
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
             <NewPostForm user={user} teamImageUrl={teamStateValue.currentTeam?.imageUrl} />
             </Flex>
             }   
              
            <Box
             display={{ base: "none", md: "flex" }}
             flexDirection="column"
             flexGrow={1}
            >
        {teamStateValue.currentTeam && <About teamData={teamStateValue.currentTeam} /> }    
          
            </Box>
               
</Flex>
</Flex>
        </>
     
    )
}
export default SubmitPostPage;