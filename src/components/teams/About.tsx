import { Team } from '@/atoms/teamAtom';
import { auth } from '@/Firebase/clientapp';
import { Box, Button, Divider, Flex,Icon,Stack,Text } from '@chakra-ui/react';
import { RiCakeLine } from "react-icons/ri";
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {DiYeoman} from "react-icons/di"
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {IoMdAnalytics} from "react-icons/io"
type AboutProps = {
    teamData:Team
};

const About:React.FC<AboutProps> = ({teamData}) => {
    const [user]=useAuthState(auth)
    const router = useRouter();
    const {teamId}=router.query


    let activeMembers = 0;
    
    for (let i = 0; i < teamData.members.length; i++) {
      if ( teamData.members[i] == user?.uid ) {
        activeMembers++;
      
      }
    }
    const onClick = () => {
       
        const { teamId } = router.query;
        if (teamId) {
          router.push(`/tm/${router.query.teamId}/analysis`);
          return;
        }
        
    
      };


    
    return (
        <Box position="sticky" top="14px" >
            <Flex justify="space-between" align="center" bg="teal.500" color="white" p={3} borderRadius="4px 4px 0px 0px">
                <Text align="center" fontSize="10pt" fontWeight={700}>About Team</Text>
                <Icon as={HiOutlineDotsHorizontal} />
            </Flex>
            <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
                <Stack>
                   <Flex width="100%" padding={2} fontStyle="10pt" fontWeight={700}>
                    <Flex direction="column" flexGrow={1}>
                        <Text fontWeight={700}>{teamData.members.length.toLocaleString()}</Text>
                        <Text>Members</Text>
                    </Flex>
                    <Flex direction="column" flexGrow={1}>
                        <Text>{activeMembers}</Text>
                        <Text>Actives</Text>
                    </Flex>

                   </Flex>
                   <Divider/>
                   <Flex width="100%" padding={1} fontWeight={500} fontSize="10pt">
                    <Icon as={RiCakeLine} fontSize={18} />
                    {teamData.createdAt && 
                    <Text ml={2}>Created  {moment(
                        new Date(teamData.createdAt!.seconds * 1000)
                      ).format("MMM DD, YYYY")}</Text>
                      
}
        
                   </Flex>
                   <Flex width="100%" padding={1} fontWeight={500} fontSize="10pt">
                    <Icon as={DiYeoman} fontSize={18} />
                    <Text ml={2}>Team Leader {teamData.creatorDisplayName}</Text>
                   </Flex>
                   <Flex direction="row" justify="space-between">
                   <Link href={`${teamId}/submit`}>
                   <Button mt={3} height="30px">
                    Create Post
                   </Button>
                   </Link>
                   {user?.uid==teamData.creatorId &&
                    <Link href={`${teamId}/analysis`}>
                    <Button mt={3} height="30px" onClick={onClick}>
                        <Icon as ={IoMdAnalytics} fontSize={18} />
                        <Text ml={2}>Analytics</Text>
                   
                    </Button>
                    </Link>
                   }
                    
                   </Flex>
                 
                </Stack>
            </Flex>
            
        </Box>
    )
}
export default About;