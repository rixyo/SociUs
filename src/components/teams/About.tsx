import { Team } from '@/atoms/teamAtom';
import { auth, fireStore, storage } from '@/Firebase/clientapp';
import { Box, Button, Divider, Flex,Icon,Stack,Text,Image, Spinner } from '@chakra-ui/react';
import { RiCakeLine } from "react-icons/ri";
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {DiYeoman} from "react-icons/di"
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {IoMdAnalytics} from "react-icons/io"
import useSelectFile from '../hooks/useSelectFile';
import { GiDove } from 'react-icons/gi';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import {  useSetRecoilState } from 'recoil';
import { teamState } from '@/atoms/teamAtom';
import { SiGnuprivacyguard } from 'react-icons/si';
import { GoRepo } from 'react-icons/go';
import { BsSlack } from 'react-icons/bs';
import { FaCommentDots } from 'react-icons/fa';
type AboutProps = {
    teamData:Team
};

const About:React.FC<AboutProps> = ({teamData}) => {
    const [user]=useAuthState(auth)
    const router = useRouter();
    const {teamId}=router.query
    const selectedFileRef=useRef<HTMLInputElement>(null)
    const {selectedFile,setSelectedFile,onSelectFile}=useSelectFile()
    const [uploadingImage,setUploadingImage]=useState<boolean>(false)
    const setTeamStateValue=useSetRecoilState(teamState)


    let activeMembers:number = 0;
    
    for (let i = 0; i < teamData.members.length; i++) {
      if ( teamData.members[i] == user?.uid ) {
        activeMembers++;
      
      }
    }
    const onUploadImage = async () => {
        if(!selectedFile) return
        setUploadingImage(true)
        try {
            const imageRef=ref(storage,`teams/${teamData.id}/teamImage`)
            await uploadString(imageRef,selectedFile,"data_url")
            const downloadUrl=await getDownloadURL(imageRef)
            await updateDoc(doc(fireStore,"teams",teamData.id),{
                imageUrl:downloadUrl
            })
            setTeamStateValue(prev=>({
                ...prev,
                currentTeam:{
                    ...prev.currentTeam,
                    imageUrl:downloadUrl,
                } as Team
            }))
            
        } catch (error) {
            console.log("Upload Image Error",error)
            
        }
        setUploadingImage(false)

    }
    const onClick = () => {
       
        const  teamId  = teamData.id;
        if (teamId) {
          router.push(`/tm/${teamData.id}/analysis`);
          return;
        }
        
    
      };
      const onClickLink=()=>{
        const  teamId  = teamData.id;
        if (teamId) {
          router.push(`/tm/${teamData.id}/addlink`);
          return;
        }
      }


    
    return (
        <Box position="sticky" top="14px" key={Math.random()/10} >
            <Flex justify="space-between" align="center" bg="teal.500" color="black" p={3} borderRadius="4px 4px 0px 0px">
                <Text align="center" fontSize="15pt" fontWeight={700}>About Team</Text>
                <Icon as={HiOutlineDotsHorizontal} />
            </Flex>
            <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
                <Stack>
                   <Flex width="100%" padding={2} fontStyle="10pt" fontWeight={700}>
                    <Flex direction="column" flexGrow={1}>
                        <Text fontWeight={700}>{teamData.members.length.toLocaleString()}</Text>
                        <Text>Members</Text>
                    </Flex>
                    <Flex direction="column" flexGrow={1}>
                        <Text>{activeMembers}</Text>
                        <Text>Actives</Text>
                    </Flex>

                   </Flex>
                   <Divider/>
                   <Flex width="100%" padding={1} fontWeight={500} fontSize="10pt">
                    <Icon as={RiCakeLine} fontSize={18} />
                    {teamData.createdAt && 
                    <Text key="teamDate.createdAt" ml={2}>Created  {moment(
                        new Date(teamData.createdAt!.seconds * 1000)
                      ).format("MMM DD, YYYY")}</Text>
                      
}
        
                   </Flex>
                   <Flex width="100%" padding={1} fontWeight={500} fontSize="10pt">
                    <Icon as={DiYeoman} fontSize={18} />
                    <Text key="teamLeader" ml={2}>Team Leader {teamData.creatorDisplayName.split("@")[0]}</Text>
                   </Flex>
                   <Flex width="100%" padding={1} fontWeight={500} fontSize="10pt">
                    <Icon as={SiGnuprivacyguard} fontSize={18} />
                    <Text key="teamType" ml={2}>Type:  {teamData.privacyType}</Text>
                   </Flex>
                   <Flex width="100%" p={3} fontWeight={700} fontSize="15pt" bg="teal.500">
                    <Text color="black" >Usefull Link</Text>
                   </Flex>
                 
                   <Flex width="100%" padding={1} fontWeight={500} fontSize="10pt" align="center" >
                    <Icon as={FaCommentDots} fontSize={18}  />
                    { teamData.communicationChannel && teamData.communicationChannel?.map((url,index)=>(
                        <Link href={url} key={index}>
                          <Text _hover={{textDecoration:"underline"}} key="channelUrl" ml={2}> channel:  {url}</Text>
                        </Link>
                    ))}
                   </Flex>
                   <Flex direction="row" justify="space-between">
                 {user?.uid===teamData.creatorId && 
                
                 <Button mt={3} height="30px"
                    onClick={onClickLink}
                    key="addLink"
                 >
                  Add Link
                 </Button>
                 
                 }  
                   {user?.uid==teamData.creatorId &&
                   
                    <Button mt={3} height="30px" onClick={onClick} key="teamCreatorId">
                        <Icon as ={IoMdAnalytics} fontSize={18} />
                        <Text ml={2}>Analytics</Text>
                   
                    </Button>
                  
                   }
                    
                   </Flex>
                   {user?.uid==teamData.creatorId &&
                   <>
                     <Divider/>
                     <Stack spacing={1} fontSize="10pt" key="adminPart">
                        <Text fontWeight={600}>Team Leader</Text>
                        <Flex align="center" justify="space-between" >
                            <Text color="teal.500" cursor="pointer" _hover={{textDecoration:"underline"}}
                            onClick={()=>selectedFileRef.current?.click()}
                            
                            >Change Image</Text>
                            {teamData.imageUrl|| selectedFileRef.current?(
                                <Image src={selectedFile||teamData.imageUrl} alt="Team Image" boxSize="40px" borderRadius="full" />
                            ):(
                                <Icon as={GiDove} fontSize={60} position="relative" top={-1/2} color="teal.500" border="8px solid white" borderRadius="50%"  />
                            )}

                        </Flex>
                        {selectedFile && 
                           (uploadingImage?(<Spinner/>):(<Text cursor="pointer"
                           onClick={onUploadImage}
                           >Save Changes</Text>
                       ))}
                       <input
              id="file-upload"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              hidden
              ref={selectedFileRef}
              onChange={ onSelectFile}
            />

                     </Stack>
                   </>
                   }
                 
                </Stack>
            </Flex>
            
        </Box>
    )
}
export default About;