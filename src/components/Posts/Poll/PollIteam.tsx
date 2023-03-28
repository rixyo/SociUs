import { Poll } from '@/atoms/pollAtom';
import { Flex, Checkbox,Text, Stack} from '@chakra-ui/react';
import moment from 'moment';
import React,{useState} from 'react';
import { Timestamp } from 'firebase/firestore';

type PollIteamProps = {
    poll:Poll
};

const PollIteam:React.FC<PollIteamProps> = ({poll}) => {
   const [vote,setVote]=useState<string>("")
   //const [voteValue,setVoteValue]=useState<string>("")
   
    const onVoteChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        //setVote((prev)=>[...prev,e.target.name])
        setVote(e.target.name)
    }
    const myDate = poll.expirationDate.toDate();
    const formattedDate = moment(myDate).format('MMMM Do YYYY, h:mm:ss a');
   
   
   
    return (
        <Flex border="1px solid" bg="gray.300" borderColor="gray.300" direction="column" padding={2}>
            <Text fontSize="10pt" fontWeight={600}>Vote will end on {formattedDate}</Text>
        <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                        {/** Check Homepage or not */}
                        <Text>Posted by tm/{poll?.creatorDisplayName} {moment(new Date(poll.createdAt?.seconds*1000)).fromNow()}</Text>
                    
                    </Stack>
                    <Text fontSize="12pt" fontWeight={600}>{poll.title}</Text>
        {poll.options.map(item=>(
            <>
            <Stack direction="column" fontSize="9pt">
            <Checkbox name={`${item.value}`} onChange={onVoteChange} isChecked={vote===item.value} >
            <Text fontWeight="15pt">{item.value}</Text>
       

        
       </Checkbox>

            </Stack>
                
              
            </>
          
          
            
        ))}
       
        <Flex m="2px 1px">
        <Text fontSize="10pt" fontWeight="bold">{`Totall votes ${poll.options.length}`}</Text>
        </Flex>
    </Flex>
    )
}
export default PollIteam;