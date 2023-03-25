import { postState } from '@/atoms/postAtom';
import React from 'react';
import { useRecoilState } from 'recoil';


const usePost= () => {
    const [postStateValue,setPostStateValue]=useRecoilState(postState)
    
    return{
        postStateValue,
        setPostStateValue
    }
}
export default usePost;