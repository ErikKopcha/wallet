import { Doughnut } from 'react-chartjs-2';
import styled from './chart.module.css';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { numberWithSpaces } from '../../../helpers/helpers.js';
import {bitcoinExchange} from '../../../helpers/helpers'
Chart.register(ArcElement, Tooltip);

export default function Charts(props) {
  const {
    categoriesAll: { categoriesSummary, expenseSummary },
    colors,currentCoin
  } = props;

  const labels = categoriesSummary.map(el => el.name);
  const options = {
    legend: {
      display: false,
    },
  };
  

  const val =
    categoriesSummary.length > 0
      ? categoriesSummary.map(el => bitcoinExchange(el.total,currentCoin))
      : [1];

  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: val,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className={styled.chartContainer}>
 
      <p className={styled.totalValue}>
      {currentCoin === 'USD' && ('$')}
      {currentCoin === 'BTC' && ('₿')}
      {currentCoin === 'EUR' && ('€')}
      {currentCoin === 'UAH' && ('₴')}
         {numberWithSpaces(bitcoinExchange(expenseSummary,currentCoin))}
      </p>
      <Doughnut data={data} width={100} height={100} options={options} />
    </div>
  );
}
