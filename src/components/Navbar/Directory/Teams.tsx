import { teamState } from '@/atoms/teamAtom';
import CreateTeamModel from '@/components/Modal/CreateTeam/CreateTeamModel';
import { auth } from '@/Firebase/clientapp';
import { Flex, MenuItem,Icon, Box,Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GiDove } from 'react-icons/gi';
import {GrAdd} from "react-icons/gr"
import { useRecoilValue } from 'recoil';
import MenuListItem from './MenuListItem';


const Teams:React.FC = () => {
    const [open,setOpen]=useState(false)
    const mySnippets = useRecoilValue(teamState).mySnippets;
    
    return(
        <>
        <CreateTeamModel open={open} handleClose={()=>setOpen(false)}/>
        <Box mt={3} mb={4}>
            <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">Team Leader</Text>
     
        {mySnippets.filter(team=>team.isModerator).map((team)=>(
             <MenuListItem key={team.teamId} icon={GiDove} displayName={`tm/${team.teamId}`}
             link={`/tm/${team.teamId}`} iconColor="teal.500"
             imageUrl={team.imageUrl}
             
              />
            
          
        ))}
        </Box>
        <Box mt={3} mb={4}>
            <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">My Team</Text>
     
        <MenuItem width="100%" fontSize="10pt" _hover={{bg:"gray.100"}} onClick={()=>setOpen(true)}>
        <Flex align="center">
            <Icon as={GrAdd} mr={2} fontSize={20}/>
            Create Team
            
        </Flex>
      
        </MenuItem>
        {mySnippets.map((team)=>(
            <MenuListItem key={team.teamId} icon={GiDove} displayName={`tm/${team.teamId}`}
            link={`/tm/${team.teamId}`} iconColor="teal.500"
            imageUrl={team.imageUrl}
            
             />
        ))}
        </Box>
     
        </>
      
    )
}
export default Teams;