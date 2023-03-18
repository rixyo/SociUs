import { Input, Button, Flex ,Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase/clientapp';
import { FIREBASE_ERRORS } from '@/Firebase/errors';


const Signup:React.FC = () => {
    const setAuthModalState=useSetRecoilState(authModalState)
    const [singupForm,setSignupForm]=useState({
        email:'',
        password:'',
        confirmPassword:''
    })
    const [error,setError]=useState("")
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        authError,
      ] = useCreateUserWithEmailAndPassword(auth);
    const onSubmit=(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(error) setError('')
        if(singupForm.password!==singupForm.confirmPassword){
            setError("Passwords donot match")
            return
      
        }
        createUserWithEmailAndPassword(singupForm.email,singupForm.password)
       

    }
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSignupForm(pre=>({
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
           <Input
           required
           type='password'
           placeholder='confirm password'
           name='confirmPassword'
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
          {(error || authError) &&( 
          <Text textAlign="center" color="red.500" fontSize="10pt">
            {error || 
             FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>)}
           <Button type='submit' width="100%" height="36px" mt={2} mb={2} isLoading={loading}>Sign Up</Button>
           <Flex justifyContent='center' fontSize='9pt'>
            <Text mr={1}>
                Have an Account?
            </Text>
            <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={()=>{
                setAuthModalState(pre=>({
                    ...pre,
                    view:"login"
                }))
            }}>Login</Text>
            
           </Flex>
           
        </form>
   
    )
    
   
}
export default Signup;