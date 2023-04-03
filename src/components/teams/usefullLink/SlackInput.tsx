import { Button, Flex, Input, Stack } from '@chakra-ui/react';
import React from 'react';

type SlackInputProps = {
    communicationWay:string,
    onChange:(event: React.ChangeEvent<HTMLInputElement>)=>void,
    handleCommunicationWay:()=>void,
    loading:boolean
    
};

const SlackInput:React.FC<SlackInputProps> = ({communicationWay,onChange,handleCommunicationWay,loading}) => {
    
    return(
        <Stack spacing={3} width="100%">
            <Input
           name="communicationWay"
           value={communicationWay}
            onChange={onChange}
           
             _placeholder={{ color: "gray.500" }}
             _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid",
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="Slack url/whatsapp group url etc"
            />
                 
           
            <Flex justify="flex-end">
            <Button
             height="34px"
             padding="0px 30px"
             isLoading={loading}
                onClick={handleCommunicationWay}
               
           
            >add</Button>
                
            </Flex>
            

        </Stack>
    )
}
export default SlackInput;