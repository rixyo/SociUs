import useDirectory from '@/components/hooks/useDirectory';
import { Flex, MenuItem,Image,Icon} from '@chakra-ui/react';
import { Router, useRouter } from 'next/router';
import React from 'react';
import { IconType } from 'react-icons';
import { GiDove } from 'react-icons/gi';

type MenuListItemProps = {
    displayName:string,
    link:string,
    icon: IconType,
    iconColor:string,
    imageUrl?:string


};

const MenuListItem:React.FC<MenuListItemProps> = ({displayName,link,icon,iconColor,imageUrl}) => {
    const {onSelectMenuItem}=useDirectory()
    const router = useRouter();
  
    
    return(
        <MenuItem width="100%" fontSize="10pt" _hover={{bg:"gray.100"}} onClick={()=>onSelectMenuItem({displayName,link,icon,iconColor,imageUrl})}>
        <Flex align="center">
            {imageUrl ? <Image src={imageUrl} height="35px" width="35px" borderRadius="full" boxSize="18px" mr={2} /> : <Icon as={icon} mr={2} fontSize={20} color={iconColor}/>}
            </Flex>
            {displayName}


        </MenuItem>
    )
}
export default MenuListItem;