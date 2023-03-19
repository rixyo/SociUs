import CreateTeamModel from '@/components/Modal/CreateTeam/CreateTeamModel';
import { Flex, MenuItem,Icon } from '@chakra-ui/react';
import React, { useState } from 'react';

import {GrAdd} from "react-icons/gr"
type CommunitesProps = {
    
};

const Teams:React.FC<CommunitesProps> = () => {
    const [open,setOpen]=useState(false)
    
    return(
        <>
        <CreateTeamModel open={open} handleClose={()=>setOpen(false)}/>
        <MenuItem width="100%" fontSize="10pt" _hover={{bg:"gray.100"}} onClick={()=>setOpen(true)}>
        <Flex align="center">
            <Icon as={GrAdd} mr={2} fontSize={20}/>
            Create Team
            
        </Flex>
        </MenuItem>
        </>
    )
}
export default Teams;