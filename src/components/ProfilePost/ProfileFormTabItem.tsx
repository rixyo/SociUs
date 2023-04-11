import { Flex, Icon,Text } from '@chakra-ui/react';
import React from 'react';
import { Tabs } from './ProfilePostForm/ProfilePostForm';

type ProfileFormTabItemProps = {
  tab:  Tabs
  selectedTab: boolean,
    setSelectedTab: (value: string) => void

};

const ProfileFormTabItem:React.FC<ProfileFormTabItemProps> = ({tab,selectedTab,setSelectedTab}) => {
    
    return (
        <Flex justify="center" align="center" flexGrow={1} padding="14px 0" cursor="pointer"
        _hover={{bg:"gray.50"}} color={selectedTab?"blue.500":"gray.500"} borderWidth={selectedTab?"0px 1px 2px 0px":"0 1px 1px 0px"} fontWeight={700}
        borderBottomColor={selectedTab?"blue.500":"gray.200"} borderRightColor="gray.200"
        onClick={()=>setSelectedTab(tab.name)}
         >
            <Flex align="center" height="20px" mr={2}>
                <Icon as={tab.icon} />
            </Flex>
            <Text fontSize="10pt">{tab.name}</Text>
        </Flex>
    )
}
export default ProfileFormTabItem;