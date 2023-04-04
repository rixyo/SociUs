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
    console.log()
  

   
    
    return (
        <>
        <Flex width="50%">
        <Bar
      data={{
        labels:pollData.map(item=>item.options.map((i: { value: any; })=>i.value)),
        datasets: [
            {
                label: 'Vote Status',
                data:pollData.map(item=>item.votedUser.length), 
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