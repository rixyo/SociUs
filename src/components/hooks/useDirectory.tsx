import { DirectoryMenuItem, directoryMenuState } from '@/atoms/directoryManyAtom';
import { teamState } from '@/atoms/teamAtom';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { GiDove } from 'react-icons/gi';
import { useRecoilState, useRecoilValue } from 'recoil';



const useDirectory= () => {
    const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
    const router = useRouter();
    const teamStatevalue=useRecoilValue(teamState)

    const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
        setDirectoryState((prev) => ({
          ...prev,
          selectedMenuItem: menuItem,
        }));
        router.push(menuItem.link);
        if(directoryState.isOpen){
            toggleMenuOpen();
        }
        if (directoryState.isOpen) {
          toggleMenuOpen();
        }
      }

    const toggleMenuOpen = () => {
        setDirectoryState((prev) => ({
          ...prev,
          isOpen: !directoryState.isOpen,
        }));
      };
    useEffect(()=>{
      const {currentTeam}=teamStatevalue
      if(currentTeam){
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuIteam:{
        displayName:`tm/${currentTeam.id}`,
        link:`/tm/${currentTeam.id}`,
        imageUrl:currentTeam.imageUrl,
        iconColor:"gray.500",
        icon:GiDove
        }
      }))
      }

    },[teamStatevalue.currentTeam])
    return {
        directoryState,
        toggleMenuOpen,
        onSelectMenuItem,
        


    }
}
export default useDirectory;