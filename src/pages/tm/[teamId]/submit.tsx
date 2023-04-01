import { teamState } from '@/atoms/teamAtom';
import PageComponent from '@/components/Layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import About from '@/components/teams/About';

import { auth } from '@/Firebase/clientapp';
import { Box,Text } from '@chakra-ui/react';

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';

const SubmitPostPage:React.FC = () => {
    const [user]=useAuthState(auth)
    const teamStateValue=useRecoilValue(teamState)
  
    
    return (
        <PageComponent>
            <>
            <Box p="14px 0" borderBottom="1px solid white">
                <Text>Create Post</Text>
             {user&&
             <NewPostForm user={user} />
             }   
                </Box>
                </>
            <>
        {teamStateValue.currentTeam && <About teamData={teamStateValue.currentTeam} /> }    
          
            </>

        </PageComponent>
    )
}
export default SubmitPostPage;