import { Poll, pollState } from '@/atoms/pollAtom';
import { auth, fireStore } from '@/Firebase/clientapp';
import { Flex, Checkbox,Text, Stack, Progress,Icon} from '@chakra-ui/react';
import {  arrayUnion, collection, deleteDoc, doc, getDocs, Timestamp, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import moment from 'moment';
import React,{ useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRecoilState } from 'recoil';


type PollIteamProps = {
    poll:Poll,


};

const PollIteam:React.FC<PollIteamProps> = ({poll}) => {
   const [vote,setVote]=useState("")
   let isVoted:boolean=false
   const [user]=useAuthState(auth)
  const router=useRouter()
  const [customError,setCustomError]=useState<string>("")
  const [pollStateValue,setPollStateValue]=useRecoilState(pollState)

    const onVoteChange=async (e:React.ChangeEvent<HTMLInputElement>)=>{
        //setVote((prev)=>[...prev,e.target.name])
        setVote(e.target.name)
        
        const batch = writeBatch(fireStore)
        const querySnapshot = await getDocs(collection(fireStore, "polls"));
      
        querySnapshot.forEach((item) => {
  // doc.data() is never undefined for query doc snapshots

  const pollRef=doc(collection(fireStore,"polls"),item.id)


    try {
     // const newItem={id:votedOption,vote:user?.uid}
     batch.update(pollRef,{
      votedUser:arrayUnion(user?.uid)
     })
     if(poll.options[0].value===e.target.name&&item.id===poll.id){
      const newItem={date:Timestamp.now(),id:poll.options[0].id,vote:user?.uid}
      batch.update(pollRef,{
        
        option1Votes:arrayUnion(newItem)
       })
     }
     else if(poll.options[1].value===e.target.name&&item.id===poll.id){
      const newItem={date:Timestamp.now(),
        id:poll.options[1].id,vote:user?.uid,
      }
      batch.update(pollRef,{
        option2Votes:arrayUnion(newItem)
       })
     }
     else if(poll.options[2].value===e.target.name&&item.id===poll.id){
      batch.update(pollRef,{
        option3Votes:arrayUnion(user?.uid)
       })
     }
     else if(poll.options[3].value===e.target.name&&item.id===poll.id){
      batch.update(pollRef,{
        option4Votes:arrayUnion(user?.uid)
       })
     }else if(poll.options[4].value===e.target.name&&item.id===poll.id){
      batch.update(pollRef,{
        option5Votes:arrayUnion(user?.uid)
       })
     }else{
      throw new Error("Failed to vote for this option")
     }

    } catch (error:any) {
      console.log(error.message)
      
    }


    });
    await batch.commit()
    router.reload()


    }
      poll.votedUser?.map(item=>{
        item===user?.uid && (isVoted=true)
      })
    const handleDelete=async ()=>{
     try {
   
   const pollRef=doc(collection(fireStore,"polls"),poll.id)
   await deleteDoc(pollRef)
    setPollStateValue(prev=>({
      ...prev,
      polls:prev.polls.filter(item=>item.id!==poll.id)
    }))
      
      
     } catch (error:any) {
        console.log(error.message)
        setCustomError(error.message)

      
     }
    }

 

    const myDate = poll.expirationDate.toDate();
    const formattedDate = moment(myDate).format('MMMM DD YYYY h:mm:ss');
    const currentDate = new Date();

  useEffect(()=>{
   
    if(currentDate.toDateString()===formattedDate.toString()){
     handleDelete()
    }
  },[formattedDate,currentDate])
 

    return (
        <Flex border="1px solid" bg="gray.300" borderColor="gray.300" direction="column" padding={2} borderRadius={4} _hover={{borderColor:'gray.500'}} cursor="pointer"  >
            <Text fontSize="10pt" fontWeight={600}>Vote will end on {formattedDate}</Text>
            {user?.uid===poll.createdBy && 
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{bg:"gray.200"}} cursor="pointer" direction="row" onClick={handleDelete}>
                        <Icon as={AiOutlineDelete} fontSize={18} mr={2} 
                        />
                        <Text fontSize="9pt">Delete</Text>
                    </Flex>
}
   
        <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                        {/** Check Homepage or not */}
                        <Text>Posted by tm/{poll?.creatorDisplayName} {moment(new Date(poll.createdAt?.seconds*1000)).fromNow()}</Text>
                        
                    
                    </Stack>
                    <Text fontSize="12pt" fontWeight={600}>{poll.title}</Text>
                    
                    {poll.options.map(item=>(
                      
                        <Checkbox key={item.id+Math.random()}  name={item.value} onChange={onVoteChange} isDisabled={isVoted} isChecked={item.value===vote}   >
                        <Text fontSize="10pt">{item.value}</Text>
                       
                       
                        
                        </Checkbox>
                        

                      

                    ))}
                    <Flex border="1px solid white" marginTop={5} width="100%" bg="teal.500">
                      <Text m="0 auto" fontSize="10pt" fontWeight={600}>Result Section</Text>
                    </Flex>
                    {poll.option1Votes!==null && poll.option1Votes!==undefined && poll.option1Votes?.length>0 && poll.votedUser!==undefined &&
                    <>
                    
                    <Flex border="1px solid white" direction="column" p={2} width="90%"  alignSelf="center" mt={5} flexDirection="row" alignItems="center" justifyContent="space-between">
                      
                      <Text fontSize="10pt" fontWeight={700} marginTop={2} marginBottom={1}>{poll.options[0].value}</Text>
                      <Progress colorScheme="twitter" size='sm' height={3} width={10} value={poll.option1Votes.length}  />

                    <Text fontSize="10pt" mt={2} fontWeight={600}>Votes <span style={{color:"red"}}>{
                      poll.option1Votes.length/poll.votedUser?.length*100 + "%"
                      }
                    </span></Text>
                    
                   
                    </Flex> 
                   
                    </>
                   
                    
                    }
                   
                     
                      {poll.option2Votes!==null && poll.option2Votes!==undefined && poll.option2Votes?.length>0&& poll.votedUser!==undefined &&
                    <>
                  <Flex border="1px solid white" direction="column" p={2} width="90%" alignSelf="center" mt={2} flexDirection="row" alignItems="center" justifyContent="space-between">
                      
                      <Text fontSize="10pt" fontWeight={700} marginTop={2} marginBottom={1}>{poll.options[1].value}</Text>

                   
                    
                      <Progress colorScheme="twitter" size='sm' value={poll.option2Votes?.length} height={3} width={10} />

                  
                    
                    
                    <Text fontSize="10pt" mt={2} fontWeight={600}> Votes <span style={{color:"red"}}>{
                      poll.option2Votes.length/poll.votedUser?.length*100 + "%"
                      }
                    </span></Text>
                    </Flex> 
                    </>
                    
                    }
                      {poll.option3Votes!==null && poll.option3Votes!==undefined && poll.option3Votes?.length>0&& poll.votedUser!==undefined &&
                    <>
                      <Flex border="1px solid white" direction="column" p={2} width="90%" alignSelf="center" mt={2}>
                      
                      <Text fontSize="10pt" fontWeight={700} marginTop={2} marginBottom={1}>{poll.options[2].value}</Text>

                   
                    
                      <Progress colorScheme="twitter" size='sm' value={poll.option3Votes?.length} height={3} />

                  
                    
                    
                    <Text fontSize="10pt" mt={2} fontWeight={600}>Votes <span style={{color:"red"}}>{
                      poll.option3Votes.length/poll.votedUser?.length*100 + "%"
                      }
                    </span></Text>
                 
                    </Flex> 
                    </>
                    
                    }
                     {poll.option4Votes!==null && poll.option4Votes!==undefined && poll.option4Votes?.length>0&& poll.votedUser!==undefined &&
                    <>
                      <Flex border="1px solid white" direction="column" p={2} width="90%" alignSelf="center" mt={2}>
                      
                      <Text fontSize="10pt" fontWeight={700} marginTop={2} marginBottom={1}>{poll.options[3].value}</Text>

                   
                    
                      <Progress colorScheme="twitter" size='sm' value={poll.option4Votes?.length} height={3} />

                  
                    
                    
                    <Text fontSize="10pt" mt={2} fontWeight={600}> Votes <span style={{color:"red"}}>{
                      poll.option4Votes.length/poll.votedUser?.length*100 + "%"
                      }
                    </span></Text>
                    </Flex> 
                    </>
                    
                    }
                      {poll.option5Votes!==null && poll.option5Votes!==undefined && poll?.option5Votes?.length>0&& poll.votedUser!==undefined &&
                    <>
                       <Flex border="1px solid white" direction="column" p={2} width="90%" alignSelf="center" mt={2}>
                      
                      <Text fontSize="10pt" fontWeight={700} marginTop={2} marginBottom={1}>{poll.options[4].value}</Text>

                   
                    
                      <Progress colorScheme="twitter" size='sm' value={poll.option5Votes?.length} height={3} />

                  
                    
                    
                    <Text fontSize="10pt" mt={2} fontWeight={600}> Votes <span style={{color:"red"}}>{
                      poll.option5Votes.length/poll.votedUser?.length*100 + "%"
                      }
                    </span></Text>
                    </Flex> 
                   
                    </>
                    
                    }
                   <Flex border="1px solid white" direction="column" p={2} width="90%" alignSelf="center" mt={2} height="30px" >
                   <Text m="0 auto" fontSize="10pt" fontWeight={600}>Total Voters: <span style={{color:"red"}}>
                   {poll.votedUser?.length}
                    </span></Text>
                    
                   </Flex>
                  
               
            
                
              
        
          
          
            
      
    </Flex>
    )
}
export default PollIteam