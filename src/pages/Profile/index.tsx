import PageContent from '@/components/Layout/PageContent';
import { Box, Button, Divider, Flex,Icon,Image,Text} from '@chakra-ui/react';
import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    
    return(
   
        <>
        <Flex width="100%" border="1px solid red"  height="100vh" direction="column" alignItems="center">
        
                <Box bg="teal.500"/>
          
            <Flex direction="column" width="40%" border="1px solid" alignItems="center" mt={5} height="40%" bg="white" borderColor="gray.300" borderRadius={4}   >
                <Image src="./DSC00673.jpg" alt="Segun Adebayo" borderRadius="50%" width="100px" height="100px" border="1px solid black" />
                <Text fontSize="10pt" fontWeight={600} color="gray.500" mt={2}>Roixy</Text>
                <Text fontSize="10pt" fontWeight={600}>Software Engineer</Text>
                <Flex direction="column" padding={5} align="center">
                    <Text fontSize="10pt" fontWeight={600} mr={5}>Daffodil International University</Text>
                    <Text fontSize="10pt" fontWeight={600}>Dhanmondi,Dhaka</Text>
                    <Flex  padding={5} direction="row">
                <Text fontSize="10pt" fontWeight={600} mr={5}>Mirpur-14,Dhaka</Text>
                <Text fontSize="10pt" fontWeight={600} mr={2}>50+</Text>
                <Icon as={FaUserFriends} fontSize="15pt" />
               </Flex>
                </Flex>
               <Flex>
                <Button
                height="34px"
                padding="0px 30px"
                bg="white"
                color="blue.300"
                border="1px solid"
                borderColor="blue.300"
                borderRadius={4}
                fontSize="10pt"
                _hover={{bg:"white"}}
                mr={3}
                >Message</Button>
                 <Button
                height="34px"
                padding="0px 30px"
                bg="blue.500"
                color="white"
                border="1px solid"
                borderColor="blue.300"
                borderRadius={4}
                fontSize="10pt"
               
                >Connect</Button>
               </Flex>
              
            </Flex>
            <Divider/>
            <Flex direction="column" width="40%" border="1px solid black" mt={5}  justify="space-between"  height="40%" bg="white" borderColor="gray.300" borderRadius={4} p={7} >
              <Flex justifyContent="space-between">
                <Text fontSize="13pt" color="gray.500">Roixy's Posts & Activity</Text>
                <Button
                height="34px"
                padding="0px 30px"
                bg="white"
                color="blue.300"
                border="1px solid"
                borderColor="blue.300"
                borderRadius={4}
                fontSize="10pt"
                _hover={{bg:"white"}}
                >Follow</Button>
              </Flex>
              <Flex direction="row" justifyContent="space-between">
              <Flex direction="column">
                <Text fontSize="10pt" fontWeight={600}>500 Fllowers</Text>
                <Image src="./future.jpg" width="400px" height="200px" />
                <Text fontSize="10pt" fontWeight={600}>Desing For The Future Work</Text>
                <Text fontSize="10pt" color="gray.500">HackerThon in Dhaka</Text>
                <Text fontSize="10pt" color="gray.500">August 29, 2023</Text>
              </Flex>
              <Flex direction="row" justify="center" mt={10} >
                
                <Image src="./future.jpg" width="50px" height="50px" />
           
                <Text fontSize="10pt" fontWeight={600} mt={5}>Desing For The Future Work</Text> 
              </Flex>
    
             
               
            </Flex>

            </Flex>
        </Flex>
      
     
        
        </>
    
     
    )
}
export default index;