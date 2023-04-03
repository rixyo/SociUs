import PageContent from '@/components/Layout/PageContent';
import LinkForm from '@/components/teams/usefullLink/LinkForm';
import { Box,Text } from '@chakra-ui/react';
import React from 'react';

type addlinkProps = {
    
};

const addlink:React.FC<addlinkProps> = () => {
    
    return (
        <>
     
        <PageContent>
            <>
            <Box p="14px 0" borderBottom="1px solid white">
                <Text>Add Info</Text>
                <LinkForm/>
                
                </Box>
           
            </>
            <>
            </>

        </PageContent>
        </>
    )
}
export default addlink;