
import { Poll } from '@/atoms/pollAtom';
import usePoll from '@/components/hooks/usePoll';
import { fireStore } from '@/Firebase/clientapp';
import { Stack } from '@chakra-ui/react';
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import {useRouter} from 'next/router';
import React, { useEffect, useState } from 'react';
import PollIteam from './PollIteam';


type PollsProps = {
    poll:Poll
    
};

const Polls:React.FC<PollsProps> = () => {
    const router=useRouter()
    const [loading,setLoading]=useState<boolean>(false)
    const {setPollStateValue,pollStateValue}=usePoll()
    const getPoll=async()=>{
        setLoading(true)
        try {
            const q=query(collection(fireStore,"polls"),where("teamId","==",`${router.query.teamId}`),orderBy("createdAt","desc"))
            const querySnapshot = await getDocs(q);
           const polls= querySnapshot.docs.map((doc)=>({
                id:doc.id, ...doc.data()
            }))
            setPollStateValue((prev)=>({
                ...prev,
                polls:polls as Poll[]
            }))
            
        } catch (error:any) {
            console.log(error.message)
            
        }
        setLoading(false)
        console.log(pollStateValue)


    }
    useEffect(()=>{
        getPoll()
    },[])
    
    return (
        <Stack>
            {pollStateValue.polls.map(item=>(
                <PollIteam poll={item}/>
            ))}
            
        </Stack>
    )
}
export default Polls;