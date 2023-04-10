import { Team, teamState } from '@/atoms/teamAtom';
import { fireStore } from '@/Firebase/clientapp';
import { Stack, Input, Textarea, Flex, Button, Icon } from '@chakra-ui/react';
import { doc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {FaCommentDots} from 'react-icons/fa';
import { GoRepo } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import LinkTabItem from './LinkTabItem';

import SlackInput from './SlackInput';
type LinkFormProps = {
    
};
export type TabItem={
    title:string,
    icon: typeof Icon.arguments
}
const formTabs:TabItem[]=[
  
    {
        title: "communication Channel",
        icon:FaCommentDots
    }
]

const LinkForm:React.FC<LinkFormProps> = () => {
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [github,setGithub]=useState<string>("")
    let allGithubRepo:string[]=[]
    let allCommunicationWay:string[]=[]
    const [communicationWay,setCommunicationWay]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    const [customError,setCustomError]=useState<string>("")
    const router=useRouter()
    const [teamStateValue,setTeamStateValue]=useRecoilState(teamState)
    
    const onTextChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{target:{name,value}}=e
       setGithub(value)
       setCommunicationWay(value)
       return {setGithub,setCommunicationWay}
      
    }
    allGithubRepo.push(github)
    allCommunicationWay.push(communicationWay)
   

    const handleAddLink=async()=>{
        setLoading(true)
        try {
          
            const {teamId}=router.query
            const betch=writeBatch(fireStore)
            const teamDocRef=  betch.update(doc(fireStore,"teams",teamId as string),{
                githubRepo:allGithubRepo,
                    
               
                
            })
            betch.commit()
            setTeamStateValue(prev=>({
                ...prev,
                currentTeam:{
                    ...prev.currentTeam,
                    githubRepo:allGithubRepo
                } as Team
            }))
            
            
          
            
        } catch (error:any) {
            setCustomError(error.message)
        console.log(error.message)
            
        }
        setLoading(false)
        router.back()
    }
    const handleAddCommunicationWay=async()=>{
        setLoading(true)
        try {
          
            const {teamId}=router.query
            const betch=writeBatch(fireStore)
            const teamDocRef=  betch.update(doc(fireStore,"teams",teamId as string),{
                communicationChannel:allCommunicationWay,
                    
               
                
            })
            betch.commit()
            setTeamStateValue(prev=>({
                ...prev,
                currentTeam:{
                    ...prev.currentTeam,
                    communicationChannel:allCommunicationWay
                } as Team
            }))
            
            
          
            
        } catch (error:any) {
            setCustomError(error.message)
        console.log(error.message)
            
        }
        setLoading(false)
        router.back()

    }
    
    return(
      <Flex direction="column" bg="white" borderRadius={4} mt={2} >
        <Flex width="100%" key={Math.random()}>
        {formTabs.map((item)=>(
                      <LinkTabItem  item={item} selected={item.title===selectedTab} setSelectedTab={setSelectedTab} />
                )
                 
                )}
               
        </Flex>
        <Flex p={4} key={Math.random()}>
               
        {selectedTab==="communication Channel" && 
        <SlackInput communicationWay={communicationWay} onChange={onTextChange} loading={loading} handleCommunicationWay={handleAddCommunicationWay}  />
    }
                </Flex>

      </Flex>
        
    )
}
export default LinkForm;