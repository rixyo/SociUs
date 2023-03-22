
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList,Text } from '@chakra-ui/react';
import { IoCaretDownSharp } from "react-icons/io5";
import{TiGroup} from "react-icons/ti"
import Teams from './Teams';
const Directory:React.FC= () => {
   

    return(
        <Menu>
  <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4}  mr={{base:0,md:4}} _hover={{outline:"1px solid", outlineColor:"gray.200"}}>
 <Flex align="center" justifyContent="space-between" width={{base:'auto', lg:"100px"}}>
<Flex align="center">
    <Icon as={TiGroup} fontSize={24} mr={{base:1, md:2}}/>
    <Flex>
        <Text fontWeight={600} fontSize="10pt">Team</Text>
    </Flex>
</Flex>
  <IoCaretDownSharp/>
   
    </Flex>
</MenuButton >
<MenuList>
<Teams/>
</MenuList>
</Menu>
    )
}
export default Directory;
