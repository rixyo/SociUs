
import { Poll, pollState } from '@/atoms/pollAtom';
import { fireStore } from '@/Firebase/clientapp';
import { Stack } from '@chakra-ui/react';
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import {useRouter} from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import PollIteam from './PollIteam';



const Polls:React.FC= () => {
    const router=useRouter()
    const [loading,setLoading]=useState<boolean>(false)
    const [pollStateValue,setPollStateValue]=useRecoilState(pollState)
    

    const getPoll=async()=>{
        setLoading(true)
        try {
            const q=query(collection(fireStore,"polls"),where("teamId","==",`${router.query.teamId}`),orderBy("createdAt","desc"))
            const querySnapshot = await getDocs(q);
           const polls= querySnapshot.docs.map((doc)=>({
         
                id:doc.id, ...doc.data(),
                
            }))
            setPollStateValue((prev)=>({
                ...prev,
                polls:polls as Poll[]
            }))
            
        } catch (error:any) {
            console.log(error.message)
            
        }
        setLoading(false)
        


    }
    useEffect(()=>{
        getPoll()
    },[])


    return (
        <Stack>
            {pollStateValue.polls.map(item=>(
              
                <PollIteam poll={item} />
            ))}
            
        </Stack>
    )
}
export default Polls;