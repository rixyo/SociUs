import { auth, fireStore } from '@/Firebase/clientapp';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, Text,Flex, DrawerHeader, DrawerOverlay, Icon, MenuList, Image, Divider } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { VscThreeBars } from 'react-icons/vsc';
import { Team } from '@/atoms/teamAtom';
import Link from 'next/link';
import CreateTeamModel from '@/components/Modal/CreateTeam/CreateTeamModel';
import { GrAdd } from 'react-icons/gr';
import { useRouter } from 'next/router';





type DrawerProps = {
   
};

const HomeDrawe:React.FC<DrawerProps> = () => {
    const [user]=useAuthState(auth)
    const [userTeam,setUserTeam]=useState<Team[]>([])
    const [open,setOpen]=useState(false)
    const [isOpen,setIsOpen]=React.useState<boolean>(false)
    const [close,setClose]=React.useState<boolean>(false)
    const router=useRouter()

   

   
    const onOpen=()=>{
        setIsOpen(true)
        setClose(false)
    }
    const onClose=()=>{
        setIsOpen(false)
        setClose(true)
     
    }
    const getUserTeam=async()=>{
        const teamRef=collection(fireStore,"teams")
        if(user){
            const teamQuery=query(teamRef,where("members","array-contains",`${user.uid}`))
            const querySnapshot = await getDocs(teamQuery);
            const team=querySnapshot.docs.map(doc=>{
               return{
                   
                        ...doc.data()
               }
             })
                setUserTeam(team as Team[])
           
              
          

        }
  
    }
    useEffect(()=>{
        getUserTeam()
    },[user])
    
    return (
        <>
       
        <Button colorScheme='white' onClick={onOpen}  key={Math.random()}
        maxWidth="auto"
        height="auto"
        background={{ base: "white", md: "white" }}
        _hover={{ bg: "white" }}
       
       width={{ base: "100%", md: "100%" }}
         >
            <Icon as={VscThreeBars} color="gray.600" fontSize="20pt" />
      
      </Button>

    
         
   <>
   {user?.uid && 
   <CreateTeamModel open={open} handleClose={()=>setOpen(false)} />
   }
   </>
   
        <Drawer isOpen={isOpen} onClose={onClose}
        placement="left" 
        size="xs"
        key={Math.random()}
   
        
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          
          <DrawerHeader fontWeight={600}>Teams</DrawerHeader>
          <Flex 
          direction="row"
          display={{ base: "none", md: "flex" }}
          mr={3}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          alignItems="center"
          justify="center"
        
        >
          <Icon as={GrAdd} fontSize={20} />
            <Text fontSize="10pt" ml={2} onClick={()=>setOpen(true)}>Create Team</Text>
        </Flex>
        <Divider/>
     {user?.uid &&    <Text ml={5}   fontWeight={600}>Team Leader</Text>}
           {user?.uid && userTeam.map((team)=>(
               <>
              
            {team.creatorId===user?.uid && 
             <Flex key={Math.random()%10} margin="5px 5px" border="1px solid white"  >
               

             <Flex direction="row" cursor="pointer" p={2} borderRadius="full">
              <>
            
                  {team?.imageUrl ? (
                       <Image borderRadius="full" boxSize="18px" src={team.imageUrl} mr={2} />

                  ):(
                      <Icon as ={HiOutlineDotsHorizontal} boxSize="18px" mr={2} />
                  )}
                    </>
                  <Link href={`/tm/${team.Name}`} passHref>
                  <Text onClick={onClose} fontSize="10pt"><span>tm/</span>{team.Name}</Text>
                  </Link>
               
                 
                  
              </Flex>

             </Flex>
                }  
               </>
           ))}
    <Divider/>
        {user?.uid && <Text ml={5}   fontWeight={600}>Team Member</Text>}
        {user?.uid && userTeam.map((team)=>(
               <>
              
               <Flex key={Math.random()%10} margin="5px 5px" border="1px solid white"  >
               

               <Flex direction="row" cursor="pointer" p={2} borderRadius="full">
                <>
              
                    {team?.imageUrl ? (
                         <Image borderRadius="full" boxSize="18px" src={team.imageUrl} mr={2} />

                    ):(
                        <Icon as ={HiOutlineDotsHorizontal} boxSize="18px" mr={2} />
                    )}
                      </>
                    <Link href={`/tm/${team.Name}`} passHref>
                    <Text fontSize="10pt"  onClick={onClose}><span>tm/</span>{team.Name}</Text>
                    </Link>
                 
                   
                    
                </Flex>

               </Flex>
               </>
           ))}
          

        
       
       
        

        

         
        </DrawerContent>


        </Drawer>
        </>
    )
}
export default HomeDrawe;