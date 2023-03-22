import { Button, Flex,Text,Image } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {useSignInWithGoogle, useSignInWithGithub} from "react-firebase-hooks/auth"
import { auth, fireStore } from '@/Firebase/clientapp';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

const OAuth:React.FC = () => {
    const [signInWithGoogle, userCred, loading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub,userCredGit,githubLoading,githubError] =useSignInWithGithub(auth)
   
    const createUserDoc=async(user:User)=>{
        const usersDocRef=doc(fireStore,'users',user.uid)
        
        await setDoc(usersDocRef,JSON.parse(JSON.stringify(user)))

    }
    useEffect(()=>{
        if(userCred){
            createUserDoc(userCred.user)
        }
        if(userCredGit){
            createUserDoc(userCredGit.user)
        }

    },[userCredGit,userCred])
    return(
        <>
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={loading}
            onClick={()=> signInWithGoogle()}
            >
                <Image src='/googlelogo.png' height="20px" mr={4} />
                continue with google
            </Button>
            <Button variant="oauth" mb={2} isLoading={githubLoading}
            onClick={()=> signInWithGithub()}>
                <Image src='/github-logo.png' height="20px" mr={4} />
                continue with github
            </Button>
           
      
            
        </Flex>
        {githubError && <Text textAlign="center" color="red.500" fontSize="10pt">{githubError?.message}</Text>}
        {googleError && <Text textAlign="center" color="red.500" fontSize="10pt">{googleError?.message}</Text>}
        </>
    )
}
export default OAuth;