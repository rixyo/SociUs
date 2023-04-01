import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto"
import { Pie } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
type PieChartProps = {
    totalMembers:number,
    postData:Array<any>,
    pollData:Array<any>
    
};
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart:React.FC<PieChartProps> = ({totalMembers,pollData,postData}) => {
    const [totalPosts,setTotalPosts]=useState<number>(0)
    const [totalPolls,setTotalPolls]=useState<number>(0)
    useEffect(()=>{
        const total=postData.length
        
        return setTotalPosts(total)
    },[postData])
    useEffect(()=>{
        const total=pollData.length
        return setTotalPolls(total)
    },[postData])
    
    return(
        <>
        <Flex width="25%">
        <Pie
       data={{
            labels: ['Posts','Polls',"Members"],
            datasets: [{
                label: 'ToTal',
                data: [totalPosts,totalPolls,totalMembers],
            }]

       }}
        />
            
        </Flex>
      
        </>
    )
}
export default PieChart;