import { Team, teamState } from '@/atoms/teamAtom';
import { auth, fireStore } from '@/Firebase/clientapp';
import { Flex, Stack, SkeletonCircle, Skeleton, Icon, Button,Box,Image,Text } from '@chakra-ui/react';
import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {GiDove} from "react-icons/gi"

import useTeamData from '../hooks/useTeamData';

const Recommendation:React.FC = () => {
    const {teamStateValue,onJoinOrLeaveTeam}=useTeamData()
    const [team,setTeam]=useState<Team[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    const [user]=useAuthState(auth)
    
  
    const topTeamsRecommendation = async()=>{
        try {
            const q=query(collection(fireStore,"teams"),orderBy("members","desc"),limit(5))
            const querySnapshot = await getDocs(q);
           const teams= querySnapshot.docs.map((doc)=>({
                id:doc.id, ...doc.data()
            }))
           
        setTeam(teams as Team[])          
            
        } catch (error:any) {
            console.log(error.message)
            
        }
    }
    useEffect(()=>{
        topTeamsRecommendation()
    },[])
    
    return (
        <Flex
        direction="column"
        bg="white"
        borderRadius={4}
        cursor="pointer"
        border="1px solid"
        borderColor="gray.300"
      >
        <Flex
          align="flex-end"
          color="white"
          p="6px 10px"
          bg="blue.500"
          height="70px"
          borderRadius="4px 4px 0px 0px"
          fontWeight={600}
          bgImage="url('images/recCommsArt.png')"
          backgroundSize="cover"
          bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
          url('images/recCommsArt.png')"
        >
          Top Communities
        </Flex>
        <Flex direction="column">
          {loading ? (
            <Stack mt={2} p={3}>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
            </Stack>
          ) : (
            <>
              {team.map((item, index) => {
                const isJoined = !!teamStateValue.mySnippets.find(
                  (snippet) => snippet.teamId === item.id
                );
                return (
                  <Link key={item.id} href={`/tm/${item.id}`}>
                    <Flex
                      position="relative"
                      align="center"
                      fontSize="10pt"
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      p="10px 12px"
                      fontWeight={600}
                    >
                      <Flex width="80%" align="center">
                        <Flex width="15%">
                          <Text mr={2}>{index + 1}</Text>
                        </Flex>
                        <Flex align="center" width="80%">
                          {item.imageUrl ? (
                            <Image
                              borderRadius="full"
                              boxSize="28px"
                              src={item.imageUrl}
                              mr={2}
                            />
                          ) : (
                            <Icon
                              as={GiDove}
                              fontSize={30}
                              color="brand.100"
                              mr={2}
                            />
                          )}
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >{`tm/${item.id}`}</span>
                        </Flex>
                      </Flex>
                 {user &&   <Box position="absolute" right="10px">
                        <Button
                          height="22px"
                          fontSize="8pt"
                          onClick={(event) => {
                            event.stopPropagation();
                           ;
                          }}
                          variant={isJoined ? "outline" : "solid"}
                        >
                          {isJoined ? "Joined" : "Join"}
                        </Button>
                      </Box>
              }
                    </Flex>
                  </Link>
                );
              })}
              <Box p="10px 20px">
                <Button height="30px" width="100%">
                  View All
                </Button>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    )
}
export default Recommendation;