import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex, MenuDivider } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { VscAccount } from "react-icons/vsc";
import { FaDove } from "react-icons/fa";
import { IoCaretDownSharp } from "react-icons/io5";
import { CgProfile} from "react-icons/cg"
import {MdOutlineLogin} from "react-icons/md"
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase/clientapp';
type UserMenuProps = {
    User?:User | null
    
};

const UserMenu:React.FC<UserMenuProps> = ({User}) => {
    const [signOut, loading, error] = useSignOut(auth);
    return(
        <Menu>
  <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} _hover={{outline:"1px solid", outlineColor:"gray.200"}}>
 {User ? (
    <Flex align="center">
        <Flex align="center">
    <>
    <Icon as={FaDove} fontSize={24} mr={1} color="gray.500"/>
    <IoCaretDownSharp/>
    </>
    </Flex>
    </Flex>
 ):(
    <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
 )}
  </MenuButton>
{User &&
  <MenuList>
  <MenuItem fontSize="10pt" fontWeight={700} _hover={{bg:"blue.500",color:"white"}}>
  <Flex align="center">
      <Icon  as={CgProfile} fontSize={20}  mr={2}/>
      Profile

  </Flex>
  </MenuItem>
  <MenuDivider/>
 
  <MenuItem fontSize="10pt" fontWeight={700} _hover={{bg:"blue.500",color:"white"}}
   onClick={async () => {
      const success = await signOut();
      if (success) {
        alert('You are sign out');
      }
    }}
  >
  <Flex align="center">
      <Icon  as={MdOutlineLogin} fontSize={20}  mr={2}/>
     Log out

  </Flex>
  </MenuItem>
  
</MenuList>}
</Menu>
    )
}
export default UserMenu;