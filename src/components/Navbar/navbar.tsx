import { auth } from "@/Firebase/clientapp";
import {Flex,Image} from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";



const Navbar:React.FC= () => {
    const [user, loading, error] = useAuthState(auth);
    
    return(
    <Flex bg="white" height="44px" padding="6px 12px" marginTop="20px">
        <Flex mr="10px" >
           <Image src="./LOGO.png" height="50px" width="200px"/>
        </Flex>
        <Flex >
        <SearchInput  />
        <RightContent User={user}/>

        </Flex>
     

    </Flex>
    )
}
export default Navbar;