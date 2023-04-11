import { auth, fireStore } from '@/Firebase/clientapp';
import { Button, Flex,Input,Text, Textarea } from '@chakra-ui/react';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type userInfo={
  id?:string,
    userId:string,
    designation:string,
    company:string,
    location:string,
    bio:string,
    living?:string,
    profileImage?:string
 
}


const index:React.FC= () => {
    const [user]=useAuthState(auth)
    const router=useRouter()
    const [textInputs,selectedTextInputs]=useState({
        designation:"",
        company:"",
        bio:"",
        location:"",
        living:""
      })
    const [loading,setLoading]=useState<boolean>(false)
    const onTextChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {target:{name,value}}=event
        selectedTextInputs(prev=>({
          ...prev,[name]:value
        }))
      } 
    const handleUpdate=async()=>{
        if(!user) return
        const userInfo:userInfo={
            userId:user.uid,
            designation:textInputs.designation,
            company:textInputs.company,
            bio:textInputs.bio,
            location:textInputs.location,

        }
        setLoading(true)
        try {
            const docRef=await addDoc(collection(fireStore,"userInfo"),userInfo)
            if(docRef){
                await updateDoc(docRef,{
                    id:docRef.id
                })
            }
            if(textInputs.living){
                await updateDoc(docRef,{
                    living:textInputs.living
                })
            }
            
        } catch (error) {
            console.log("userInfo",error)
            
            
        }
        setLoading(false)
        router.push("/Profile")
        
    }
    return (
        <>
       <Flex width="100%" direction="column" align="center">
        <Text margin="0px auto" fontSize="30pt" fontWeight={600} color="" >Edit Profile</Text>
      
           
       
            <Button
              variant="outline"
              height="28px"
              mt={2}
              mb={2}
            
            >
              Upload
            </Button>
        
            <Input
              id="file"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              hidden
            
             
            />

          
           <Flex width={{base:"auto",md:"25%"}}   direction="column" mb={5}>

          <Input
            name="designation"
            border="1px solid"
            borderColor="gray.300"
           required
             _placeholder={{ color: "gray.500" }}
             _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid",
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="Designation"
             mb={5}
             value={textInputs.designation}
             onChange={onTextChange}
          
            />
              <Input
            name="company"
            border="1px solid"
            borderColor="gray.300"
           required
             _placeholder={{ color: "gray.500" }}
             _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid",
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="Company/Institution"
             mb={5}
            value={textInputs.company}
            onChange={onTextChange}
          
            />
              <Input
            name="location"
            border="1px solid"
            borderColor="gray.300"
           required
             _placeholder={{ color: "gray.500" }}
             _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid",
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="Location"
             value={textInputs.location}
          onChange={onTextChange}
          mb={5}
            />
                <Input
            name="living"
            border="1px solid"
            borderColor="gray.300"
            
              mt={5}
             _placeholder={{ color: "gray.500" }}
             _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid",
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="Living"
             value={textInputs.living}
          onChange={onTextChange}
            />
           </Flex>
           <Flex mb={5} width={{base:"auto",md:"25%"}} >

            <Textarea
            name="bio"
            border="1px solid"
            borderColor="gray.300"
           required
            
              fontSize="10pt"
              placeholder="Bio"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                outline: "none",
                bg: "white",
                border: "1px solid",
                borderColor: "black",
              }}
              height="100px"
              value={textInputs.bio}
              onChange={onTextChange}

            />
           </Flex>
           <Button
              variant="outline"
              height="28px"
              mt={2}
              mb={2}
                onClick={handleUpdate}
                isLoading={loading}
            
            >
              Save
            </Button>

              </Flex>
        
     
       </>
    )
}
export default index;