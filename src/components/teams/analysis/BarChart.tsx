import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto"
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';

type BarChartProps = {
    pollData:Array<any>,
};
ChartJS.register(ArcElement, Tooltip, Legend);
const BarChart:React.FC<BarChartProps> = ({pollData}) => {
  

   const [formatedDate,setFormatedDate]=useState<string>("")

   const [totalData,setTotalData]=useState<number>(0)

useEffect((()=>{
    const total=pollData.length

return setTotalData(total)




}),[pollData])
useEffect(()=>{
    pollData.map((item)=>{
     
        const myDate = item.createdAt.toDate()
       const formatedDate = moment(myDate).format('MMMM');
        return setFormatedDate(formatedDate)
    })
  
},[pollData])
   
    
    return (
        <>
        <Flex width="50%">
        <Bar
      data={{
        labels: [formatedDate.toString()],
        datasets: [
            {
                label: 'Number of Polls',
                data:[totalData], 
                backgroundColor: ["#D53F8C","#319795","#805AD5","#0987A0","#2C5282","#285E61","#718096","#B9A2FF"],
                  borderColor: ["#D53F8C","#319795","#805AD5","#0987A0","#2C5282","#285E61","#718096","#B9A2FF" ],
                borderWidth: 2,

            },
        ]
      }}
      />
            
        </Flex>
              
  
        </>
    )
}
export default BarChart;