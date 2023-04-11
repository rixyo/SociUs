import useSelectFile from '@/components/hooks/useSelectFile';
import { auth, fireStore, storage } from '@/Firebase/clientapp';
import { Button, Flex,Input,Text, Textarea,Image } from '@chakra-ui/react';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Router, { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
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
    const { selectedFile,
      setSelectedFile,
      onSelectFile} =useSelectFile()
      const selectedFileReferance=useRef<HTMLInputElement>(null)
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
          if(userInfo.designation.length<=0 || userInfo.company.length<=0 || userInfo.bio.length<=0 || userInfo.location.length<=0){
            alert("Please fill all the fields")
            return
          }
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
            if(selectedFile){
              const imageRef=ref(storage,`userInfo/${docRef.id}/images`)
              await uploadString(imageRef,selectedFile,'data_url')
              const downLoadUrl=await getDownloadURL(imageRef)
              await updateDoc(docRef,{
                  imageLink:downLoadUrl
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
      
        <Flex direction="column" justify="center" align="center" width="100%">
        {selectedFile ? (
          <>
            <Image
              src={selectedFile as string}
              maxWidth="400px"
              maxHeight="400px"
            />
            <Flex p={3} >
          
              <Button
                variant="outline"
                height="28px"
                onClick={() => setSelectedFile("")}
                ml={3}
              >
                Remove
              </Button>
            </Flex>
          </>
        ) : (
          <Flex
            justify="center"
            align="center"
            p={20}
            border="1px dashed"
            borderColor="gray.200"
            borderRadius={4}
            width="100%"
          >
            <Button
              variant="outline"
              height="28px"
              onClick={() => selectedFileReferance.current?.click()}
            >
              Upload
            </Button>
            <input
              id="file-upload"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              hidden
              ref={selectedFileReferance}
              onChange={ onSelectFile}
            />
          </Flex>
        )}
      </Flex>

          
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


