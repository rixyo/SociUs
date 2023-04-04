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

useEffect(()=>{
    postData.map((item)=>{
        console.log(item.title)
       
    
       
    })
  
},[postData])
   
    return (
        <>
        <Flex width="50%">
        <Line
      data={{
        labels: postData.map(item=>item.title),
        datasets: [
            {
                label: 'Vote Status',
                data:postData.map(item=>item.numberOfComments),
                backgroundColor: "#D53F8C",
                  borderColor: "#B9A2FF" ,
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