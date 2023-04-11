import { Flex, Icon,Text} from '@chakra-ui/react';
import React from 'react';
import { TabItem } from './NewPostForm';

type TabItemProps = {
    item: TabItem,
    selected:boolean,
    setSelectedTab:(value:string)=>void
};

const FormTabItem:React.FC<TabItemProps> = ({item,selected,setSelectedTab}) => {
    
    return (
        <Flex justify="center" align="center" flexGrow={1} padding="14px 0" cursor="pointer"
        _hover={{bg:"gray.50"}} color={selected?"blue.500":"gray.500"} borderWidth={selected?"0px 1px 2px 0px":"0 1px 1px 0px"} fontWeight={700}
        borderBottomColor={selected?"blue.500":"gray.200"} borderRightColor="gray.200"
        onClick={()=>setSelectedTab(item.title)}
         >
            <Flex align="center" height="20px" mr={2}>
                <Icon as={item.icon} />
            </Flex>
            <Text fontSize="10pt">{item.title}</Text>
        </Flex>
    )
}
export default FormTabItem;