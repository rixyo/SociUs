import { Button, Flex,Image,Text } from '@chakra-ui/react';
import React from 'react';
import {useSignInWithGoogle, useSignInWithGithub} from "react-firebase-hooks/auth"
import { auth } from '@/Firebase/clientapp';


const OAuth:React.FC = () => {
    const [signInWithGoogle, user, loading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub,User,githubLoading,githubError] =useSignInWithGithub(auth)
    
    return(
        <>
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={loading}
            onClick={()=> signInWithGoogle()}
            >
                <Image src='./googlelogo.png' height="20px" mr={4} />
                continue with google
            </Button>
            <Button variant="oauth" mb={2} isLoading={githubLoading}
            onClick={()=> signInWithGithub()}>
                <Image src='./github-logo.png' height="20px" mr={4} />
                continue with github
            </Button>
           
      
            
        </Flex>
        {githubError && <Text textAlign="center" color="red.500" fontSize="10pt">{githubError?.message}</Text>}
        {googleError && <Text textAlign="center" color="red.500" fontSize="10pt">{googleError?.message}</Text>}
        </>
    )
}
export default OAuth;