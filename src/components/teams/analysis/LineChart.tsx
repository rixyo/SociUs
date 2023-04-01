import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto"
import moment from 'moment';
import { Bar, Line } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
type BarChartProps = {
    postData:Array<any>,
};
ChartJS.register(ArcElement, Tooltip, Legend);
const LineChart:React.FC<BarChartProps> = ({postData}) => {


   const [formatedDate,setFormatedDate]=useState<string>("")

   const [totalData,setTotalData]=useState<number>(0)

useEffect((()=>{
    const total=postData.length

return setTotalData(total)




}),[])
useEffect(()=>{
    postData.map((item)=>{
        const myDate = item.createdAt.toDate()
       const formatedDate = moment(myDate).format('MMMM');
    
        return setFormatedDate(formatedDate)
    })
  
},[postData])
   
 // const myDate = poll.expirationDate.toDate();
    //formattedDate = moment(myDate).format('MMMM Do YYYY, h:mm:ss a');
    return (
        <>
        <Flex width="50%">
        <Line
      data={{
        labels: ["Total Post"],
        datasets: [
            {
                label: 'Number of Posts',
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
export default LineChart;