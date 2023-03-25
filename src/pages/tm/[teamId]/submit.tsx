import PageComponent from '@/components/Layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';

import { auth } from '@/Firebase/clientapp';
import { Box,Text } from '@chakra-ui/react';

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type submitProps = {
    
};

const SubmitPostPage:React.FC<submitProps> = () => {
    const [user]=useAuthState(auth)
    
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
          
            </>

        </PageComponent>
    )
}
export default SubmitPostPage;