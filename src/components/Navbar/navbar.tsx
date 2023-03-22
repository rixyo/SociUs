import { auth } from "@/Firebase/clientapp";
import {Flex,Image} from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";


const Navbar:React.FC= () => {
    const [user, loading, error] = useAuthState(auth);
    
    
    return(
    <Flex bg="white" height="44px" padding="6px 12px" marginTop="20px" justifyContent={{md:"space-between"}} >
        <Flex width={{base:"40px",md:"auto"}} mr={{base:0,md:2}} >
           <Image src="/LOGO.png" height="50px" width="100px"  display={{ base: "none", md: "unset" }}  />
        </Flex>
        
        <Flex >
          
            <SearchInput User={user}  />
            <RightContent User={user}/>

        </Flex>
     
</Flex>
    )
}
export default Navbar;