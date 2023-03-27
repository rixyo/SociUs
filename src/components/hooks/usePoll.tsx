import { pollState } from '@/atoms/pollAtom';
import React from 'react';
import { useRecoilState } from 'recoil';


const usePoll= () => {
    const [pollStateValue,setPollStateValue]=useRecoilState(pollState)
    const onVote=async()=>{}
    const OnSelectPost=()=>{}
    const onDeletePost=async()=>{}
    
    return{
        pollStateValue,
        setPollStateValue,
        onVote,
        OnSelectPost,
        onDeletePost,
    }
}
export default usePoll;