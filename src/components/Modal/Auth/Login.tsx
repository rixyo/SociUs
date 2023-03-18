import { authModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input,Text } from '@chakra-ui/react';
import React,{useState} from 'react';
import {useSetRecoilState} from "recoil"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase/clientapp';
import { FIREBASE_ERRORS } from '@/Firebase/errors';

const Login:React.FC = () => {
    const setAuthModalState=useSetRecoilState(authModalState)
    const [loginForm,setLoginForm]=useState({
        email:'',
        password:''
    })
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const onSubmit=(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault()
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
        

    }
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm(pre=>({
            ...pre,
            [e.target.name]: e.target.value
        }))


    }
    
    return(
        <form onSubmit={onSubmit}>
            <Input
            required
            type='email'
            placeholder='email'
            name='email'
            mb={2}
            fontSize="10pt"
            _placeholder={{color:'gray.500'}}
            _hover={{
             bg:'white',
             border:'1px solid',
             borderColor:"blue.500"
            }}
            _focus={{
             outline:"none",
             bg:'white',
             border:'1px solid',
             borderColor:"blue.500"
 
            }}
            bgColor='gray.50'
            onChange={onChange}
            />
           <Input
           required
           type='password'
           placeholder='password'
           name='password'
           mb={2}
           fontSize="10pt"
           _placeholder={{color:'gray.500'}}
           _hover={{
            bg:'white',
            border:'1px solid',
            borderColor:"blue.500"
           }}
           _focus={{
            outline:"none",
            bg:'white',
            border:'1px solid',
            borderColor:"blue.500"

           }}
           bgColor='gray.50'
           onChange={onChange}
           />
           {error && <Text textAlign="center" color="red.500" fontSize="10pt">
            {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>}
           <Button type='submit' width="100%" height="36px" mt={2} mb={2} isLoading={loading}>Login</Button>
           <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={()=>{
            setAuthModalState(pre=>({
                ...pre,
                view:"resetPassword"
            }))
        }}
        >
          Reset
        </Text>
      </Flex>
           <Flex justifyContent='center' fontSize='9pt'>
            <Text mr={1}>
                New Here?
            </Text>
            <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={()=>{
                setAuthModalState(pre=>({
                    ...pre,
                    view:"signup"
                }))
            }}>Sign Up</Text>
            
           </Flex>
           
        </form>
   
    )
}
export default Login;


