
import useDirectory from '@/components/hooks/useDirectory';
import { Flex, Icon, Menu, MenuButton, MenuList,Text,Image } from '@chakra-ui/react';
import { IoCaretDownSharp } from "react-icons/io5";
import{TiGroup} from "react-icons/ti"
import Teams from './Teams';
const Directory:React.FC= () => {
    const { directoryState, toggleMenuOpen}=useDirectory()
   

    return(
        <Menu isOpen={directoryState.isOpen}>
  <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4}  mr={{base:0,md:4}} _hover={{outline:"1px solid", outlineColor:"gray.200"}}
  onClick={toggleMenuOpen}
  >
 <Flex align="center" justifyContent="space-between" width={{base:'auto', lg:"100px"}}>
<Flex align="center">
    
    <Flex>
    <Icon fontSize={20} mr={2} as={TiGroup}/>
   
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
