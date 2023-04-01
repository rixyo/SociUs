import { fireStore } from '@/Firebase/clientapp';
import { Flex, Icon, Divider,Box,Text } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsFillPostcardFill } from 'react-icons/bs';
import { TiGroup } from 'react-icons/ti';
import { useRouter } from 'next/router';
import { Team } from '@/atoms/teamAtom';

import PieChart from './PieChart';
import LineChart from './LineChart';
import BarChart from './BarChart';



const Index:React.FC = () => {
    const router = useRouter();
   
   
    const [postData,setPostData]=useState<Array<any>>([])
    const [pollData,setPollData]=useState<Array<any>>([])
    const {teamId}=router.query
    const [totalMembers,setTotalMembers]=useState<number>(0)
useEffect(()=>{
    const getTeamData=async()=>{
        const team=query(collection(fireStore,"teams"),where("Name","==",`${router.query.teamId}`))
        const querySnapshot = await getDocs(team)
    const data=querySnapshot.docs.map(doc=>{
        return{
            ...doc.data(),
        }
    })
  
  data.map((item)=>{
        setTotalMembers(item.members.length)
       
  })

    }
    const getPostData=async()=>{
        const post=query(collection(fireStore,"posts"),where("teamId","==",`${router.query.teamId}`))
        const querySnapshot = await getDocs(post)
        const data=querySnapshot.docs.map(doc=>{
            return{
                ...doc.data(),
            }
        })
        setPostData(data)
    }
    const getPollData=async()=>{
        const poll=query(collection(fireStore,"polls"),where("teamId","==",`${router.query.teamId}`))
        const querySnapshot = await getDocs(poll)
        const data=querySnapshot.docs.map(doc=>{
            return{
                ...doc.data(),
            }
        })
        setPollData(data)
    }
    getTeamData()
    getPostData()
    getPollData()
},[teamId])



    return(
        <>
           <Flex direction="column" width="100%" height="146px" mt={5}>
            <Box height="40%" bg="teal.500" />
            <Flex alignSelf="center" padding={3} direction="column">
                <Text fontSize="20pt" fontWeight={700}>
                    Team Analysis
                </Text>
                <Text fontSize="20pt" fontWeight={700} color="teal.500">
                    {router.query.teamId}
                </Text>
            </Flex>
        </Flex>
       
            <>
            <Flex direction="column" width="100%" gap={2}>
                
      <Flex  bg="white" border="1px solid" p={3} borderTopLeftRadius="10px" borderBottomRightRadius="5px" width="50%" alignSelf="center" direction="row" >
        <Icon as={TiGroup} fontSize={30} color="teal.500" />
        <Text fontSize="14pt" fontWeight={600} ml={3}>Total Members: {totalMembers}  </Text>
        
      </Flex>
      <Divider/>
      <Flex  bg="white" border="1px solid" p={3} borderTopLeftRadius="10px" borderBottomRightRadius="5px" width="50%" alignSelf="center" direction="row" >
        <Icon as={BsFillPostcardFill} fontSize={30} color="teal.500" />
        <Text fontSize="14pt" fontWeight={600} ml={3}>Total Posts: {postData.length}</Text>
        
      </Flex>
      <Divider/>
      <Flex  bg="white" border="1px solid" p={3} borderTopLeftRadius="10px" borderBottomRightRadius="5px" width="50%" mb={10} alignSelf="center" direction="row" >
        <Icon as={BiPoll} fontSize={30} color="teal.500" />
        <Text fontSize="14pt" fontWeight={600} ml={3}>Total Polls: {pollData.length}</Text>
        
      </Flex>
        <Divider/>
     
      </Flex>
      <Divider/>
            </>
            <Flex width="50%" direction="row" margin="0px auto" gap={5} >
          {/*<LineChart postData={postData}/> */}
            <PieChart totalMembers={totalMembers} postData={postData} pollData={pollData} />
           {/* <BarChart pollData={pollData}/> */}
     
         
            

            </Flex>
           
        
   
       
        
        
        </>
        
        
    )
}
export default Index;