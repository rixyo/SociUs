import { auth } from "@/Firebase/clientapp";
import {Flex,Image} from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";


import HomeDrawe from "./Dower/Drawer";
import {useRouter } from "next/router";


const Navbar:React.FC= () => {
    const [user] = useAuthState(auth);
    const router=useRouter()

 
    
    return(
    <Flex bg="white" height="44px" padding="6px 12px" marginTop="20px" justifyContent={{md:"space-between"}}  >
        <Flex direction="row">
        <Flex mr={5}>
            <HomeDrawe/>
        </Flex>

        <Flex width={{base:"40px",md:"auto"}} mr={{base:0,md:2}} >
            <Image src="/LOGO.png" height="35px" width="100px"  display={{ base: "none", md: "unset" }} onClick={()=>router.push("/")} cursor="pointer" />
        </Flex>
        </Flex>
       
        
        <Flex >
          
            <SearchInput User={user}  />
            

        </Flex>
        <Flex>
        <RightContent User={user}/>
        </Flex>
     
</Flex>
    )
}
export default Navbar;