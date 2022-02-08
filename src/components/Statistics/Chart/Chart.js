import { Doughnut } from 'react-chartjs-2';
import styled from './chart.module.css'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

export default function Charts (props){
const {categories,colors} = props;
  const options = {
    legend: {
      display: false
    },
    
    };

    const val =  Object.values(categories.expenses).length >0 ? Object.values(categories.expenses) : [1]
      const data = {
       
        labels: ['hfd'],
        datasets: [
          {
            data: val,
            backgroundColor: colors ,
           
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