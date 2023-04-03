import { Stack, Input, Textarea, Flex, Button } from '@chakra-ui/react';
import React from 'react';

type TextInputProps = {
    github:string,
    onChange:(event: React.ChangeEvent<HTMLInputElement>)=>void,
    handleAddLink:()=>void,
    loading:boolean
   

    
};

const TextInput:React.FC<TextInputProps> = ({github,onChange,handleAddLink,loading}) => {
    
    return (
        <Stack spacing={3} width="100%">
            <Input
           name="githubRepo url"
           value={github}
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
             placeholder="Repo url"
            />
                 
           
            <Flex justify="flex-end">
            <Button
             height="34px"
             padding="0px 30px"
             isLoading={loading}
                onClick={handleAddLink}
               
           
            >add</Button>
                
            </Flex>
            

        </Stack>
    )
}
export default TextInput;