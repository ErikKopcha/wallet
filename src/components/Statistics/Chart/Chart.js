import { Doughnut } from 'react-chartjs-2';
import styled from './chart.module.css'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

export default function Charts (props){
  const options = {
    legend: {
      display: false
    },
    
    };
    const val = Object.values(props.categories)
      const data = {
       
        labels: ['hfd'],
        datasets: [
          {
            data: val,
            backgroundColor: ['#FED057','#FFD8D0','#FD9498','#C5BAFF','#6E78E8','#4A56E2','#81E1FF','#24CCA7','#00AD84'],
           
          }
        ]
      };

          return (
            <div className={styled.chartContainer}>
          <p className={styled.totalValue}>100000$</p>
              <Doughnut data={data} width={100} height={100}  options={options}/>
            </div>
          );




}