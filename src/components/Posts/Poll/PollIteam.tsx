import React, { useEffect, useState } from 'react';
import { Poll } from '@/atoms/pollAtom';
import { Checkbox, Flex,Text } from '@chakra-ui/react';

type PollIteamProps = {
    poll:Poll
};

const PollIteam:React.FC<PollIteamProps> = ({poll}) => {
  
    //console.log(poll.options.map(item=> console.log(item)))
  

 
    
    return(
        <Flex border="1px solid" bg="gray.300" borderColor="gray.300" direction="column" >
            {poll.options.map(item=>(
                <Checkbox name={`${item}`} >
                <Flex align="center">
               
                 <Text fontSize="15pt"  fontWeight={600} pt={1}>{item}</Text>
                
                </Flex>
                </Checkbox>
                
            ))}
           
            <Flex  ml={1} mb={0.5}>
            <Text fontSize="10pt" fontWeight="bold">{`Totall votes ${poll.totalVotes?.length}`}</Text>
            </Flex>
        </Flex>
    )
}
export default PollIteam;