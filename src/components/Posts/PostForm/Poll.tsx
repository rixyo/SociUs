import { auth, fireStore, storage } from '@/Firebase/clientapp';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Poll } from '@/atoms/pollAtom';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
type pollProps = {
  user:User
}

const Poll:React.FC<pollProps> = ({user}) => {
 
    const [options, setOptions] = useState<string[]>([]);
    let optionVal:any=[{}]
    const[loading,setLoading]=useState<boolean>(false)
    const [title,setTitle]=useState<string>('')
    const router=useRouter()
    const {teamId}=router.query
   
  
    const[optionValue,setOptionValue]=useState({
        option1:"",
        
        
        option2:"",
         
        
        option3: "",
          
      
        option4:""
          
        ,
        option5:"",
        
    });

  
    const handleAddOption = () => {
        if(options.length>2){
            return;
        }
        setOptions((prevOptions) => [...prevOptions, "New Option"]);
      };
      const onTextChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {target:{name,value}}=event
        setOptionValue(prev=>({
          ...prev,[name]:value
        }))
       
      }
     
      const createPoll=async()=>{
        const currentTimeStamp = Timestamp.now();
        const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
    const twoDaysFromNow = new Timestamp(
  currentTimeStamp.seconds + (twoDaysInMillis / 1000),
  currentTimeStamp.nanoseconds
);

if(optionValue.option1!==""){
  const newItem={value:optionValue.option1,vote:[""]}
  optionVal.push(newItem)
 
}
if(optionValue.option2!==""){
  const newItem={value:optionValue.option2,vote:[""]}
  optionVal.push(newItem)
 
}
if(optionValue.option3!==""){
  const newItem={value:optionValue.option3,vote:[""]}
  optionVal.push(newItem)

 

}
if(optionValue.option4!==""){
  const newItem={value:optionValue.option4,vote:[""]}
  optionVal.push(newItem)
 

}
if(optionValue.option5!==""){
  const newItem={value:optionValue.option5,vote:[""]}
  optionVal.push(newItem)

}
optionVal.shift()
        const poll:Poll={
          title:title,
          id:optionValue.option1+optionValue.option2 + user.uid,
            options:optionVal,
            createdBy:user.uid,
            teamId:teamId as string,
            creatorDisplayName:user.email!.split('@')[0],
            createdAt:Timestamp.now(),
            expirationDate:twoDaysFromNow,
        }
        setLoading(true)
        try {
         
   
            const postDocRef=await addDoc(collection(fireStore,"polls"),poll)
            
        } catch (error:any) {
        
          console.log(error.message)
          
        }
        setLoading(false)
        router.back()

      }
      
    
    return (
        <Flex border="1px solid" bg="white" borderColor="gray.300" borderRadius={4} _hover={{borderColor:'gray.500'}} cursor="pointer" width="100%" justify="center"  align="center" paddingY={5}>
           
            <Flex width="60%"  direction="column" gap={2}>
                <Text fontSize="10pt" fontWeight="bold">Poll ends in 2 days</Text>
                
                <Input
            name="title"
            onChange={(event)=>setTitle(event.target.value)}
            
             _placeholder={{ color: "gray.500" }}
             _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid",
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="Title"
            />
            <Input
            name="option1"
            value={optionValue.option1}
            onChange={onTextChange}
             _placeholder={{ color: "gray.500" }}
             border= "1px solid"
             borderColor="gray.500"
             _focus={{
               outline: "none",
               bg: "white",
               
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="option1"
            />
            <Input
            name="option2"
            value={optionValue.option2}
            onChange={onTextChange}
        
          
            border= "1px solid "
            borderColor="gray.500"
             _placeholder={{ color: "gray.500" }}
            
             _focus={{
               outline: "none",
               bg: "white",
               
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="option2"
            />
        {options.map((option, index) => (
            <Input
            key={index}
            name={`option${index + 3}`}
            value={index + 3 === 3 ? optionValue.option3 : index + 3 === 4 ? optionValue.option4 : optionValue.option5}
            onChange={onTextChange}
        
           
            border= "1px solid White"
            borderColor="gray.500"
          
             _placeholder={{ color: "gray.500" }}
            
             _focus={{
               outline: "none",
               bg: "white",
               
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder={`option ${index + 3}`}
            />
         
        ))}
                   
      <Flex align="center" justify="space-between">
                <Button
                 height="34px"
                
                 padding="0px 30px"
              onClick={handleAddOption}
                >Add option</Button>
                 <Button
                 height="34px"
                 padding="0px 30px"
              
                 onClick={createPoll}
                 isLoading={loading}
                
                >Post</Button>
            </Flex>
            
            </Flex>
        </Flex>
    )
}
export default Poll;