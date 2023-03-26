import { postState } from '@/atoms/postAtom';
import React from 'react';
import { useRecoilState } from 'recoil';


const usePost= () => {
    const [postStateValue,setPostStateValue]=useRecoilState(postState)
    const onVote=async()=>{}
    const OnSelectPost=()=>{}
    const onDeletePost=async()=>{}
    
    return{
        postStateValue,
        setPostStateValue,
        onVote,
        OnSelectPost,
        onDeletePost,
    }
}
export default usePost;