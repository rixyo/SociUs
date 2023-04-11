
import CreateProfilePostLink from '@/components/ProfilePost/CreateProfilePostLink';
import { auth, fireStore } from '@/Firebase/clientapp';
import { Avatar, Badge, Box, Button, Divider, Flex,Icon,Image,Text} from '@chakra-ui/react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUserFriends } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';



const index:React.FC= () => {
  const [user]=useAuthState(auth)
  
  const [designation,setDesication]=useState<string>('')
  const [company,setCompany]=useState<string>('')
  const [bio,setBio]=useState<string>('')
  const [location,setLocation]=useState<string>('')
  const [living,setLiving]=useState<string>('')
  const router=useRouter()
 
  const getUserInfo=async()=>{
    if(!user) return
    const userInfoQuery=query(collection(fireStore,"userInfo"),where("userId","==",user.uid))
    const userInfoSnapshot=await getDocs(userInfoQuery)
    userInfoSnapshot.forEach(doc=>{
   
    
     doc.data().designation && setDesication(doc.data().designation)
      doc.data().company && setCompany(doc.data().company)
      doc.data().bio && setBio(doc.data().bio)
      doc.data().location && setLocation(doc.data().location)
      doc.data().living && setLiving(doc.data().living)
      return {setCompany,setDesication,setBio,setLocation,setLiving}
    
    })
  }

  useEffect(()=>{
    getUserInfo()
  },[user])
    return(
   
        <Flex  width="100%"  height="100vh" direction="column" alignItems="center">
        
            <Flex direction="column" width={{base:"auto",md:"40%"}} border="1px solid" alignItems="center" mt={5}  bg="white" borderColor="gray.300" borderRadius={4}  mb={10}  >
            <Avatar name={user?.displayName! || user?.email?.split("@")[0]} mr={2} mt={5}/>
                <Text fontSize="10pt" fontWeight={600} color="gray.500" mt={2}>{user?.displayName 
            ||  user?.email?.split('@')[0]}
               
      {user?.displayName==="Ro ix y" && <Icon as={MdVerified} color="blue.400" ml={2}  /> }  
      
                </Text>
                <Button 
                 height="34px"
                 padding="0px 30px"
                 bg="blue.500"
                 color="white"
                 border="1px solid"
                 borderColor="blue.300"
                 borderRadius={4}
                 fontSize="10pt"
                 mb={2}
                 onClick={()=>router.push('/edit')}
                >Edit Profile</Button>
                <Text fontSize="10pt" fontWeight={600} color="gray.500" mt={2}>{bio}</Text>
                <Text fontSize="10pt" fontWeight={600}>{designation}</Text>
                <Flex direction="column" padding={5} align="center">
                    <Text fontSize="10pt" fontWeight={600} mr={5}>{company}</Text>
                    <Text fontSize="10pt" fontWeight={600}>{location}</Text>
                    <Flex  padding={5} direction="row">
                <Text fontSize="10pt" fontWeight={600} mr={5}>{living}</Text>
                <Text fontSize="10pt" fontWeight={600} mr={2}>50+</Text>
                <Icon as={FaUserFriends} fontSize="15pt" />
               </Flex>
                </Flex>
               <Flex p={5}>
                <Button
                height="34px"
                padding="0px 30px"
                bg="white"
                color="blue.300"
                border="1px solid"
                borderColor="blue.300"
                borderRadius={4}
                fontSize="10pt"
                _hover={{bg:"white"}}
                mr={3}
                >Message</Button>
                 <Button
                height="34px"
                padding="0px 30px"
                bg="blue.500"
                color="white"
                border="1px solid"
                borderColor="blue.300"
                borderRadius={4}
                fontSize="10pt"
               
                >Connect</Button>
               </Flex> 
      
        </Flex>
        <Flex direction="column" width={{base:"auto",md:"40%"}} border="1px solid" alignItems="center" mt={5}  bg="white" borderColor="gray.300" borderRadius={4} p={5}  mb={10}>
       <CreateProfilePostLink/>

        </Flex>
        <Flex direction="column" width={{base:"auto",md:"40%"}} border="1px solid" alignItems="center" mt={5}  bg="white" borderColor="gray.300" borderRadius={4} p={3}  mb={10}>
        <Text fontSize="20pt" mb={5}>{user?.displayName || user?.email?.split("@")[0]} 's Activity</Text>

        </Flex>
      
      
     
        
        </Flex>
     
    )
}
export default index;