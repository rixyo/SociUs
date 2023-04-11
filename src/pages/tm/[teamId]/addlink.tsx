
import LinkForm from '@/components/teams/usefullLink/LinkForm';
import { Box,Flex,Text } from '@chakra-ui/react';
import React from 'react';

type addlinkProps = {
    
};

const addlink:React.FC<addlinkProps> = () => {
    
    return (
        <Flex justify="center" padding="16px">
     
        <Flex width="95%" justify="center" maxWidth="860px">
            <>
            <Flex   direction="column"
       width={{ base: "100%", md: "65%" }}
       mr={{ base: 0, md: 6 }} borderBottom="1px solid white" alignContent="center">
                <Text fontSize="20pt" fontWeight={700}>Add Info</Text>
                <LinkForm/>
                
                </Flex>
           
            </>
            <>
            </>

        </Flex>
        </Flex>
    )
}
export default addlink;