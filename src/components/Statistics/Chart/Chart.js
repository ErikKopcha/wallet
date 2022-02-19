import { Doughnut } from 'react-chartjs-2';
import styled from './chart.module.css';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { numberWithSpaces } from 'helpers/helpers.js';
Chart.register(ArcElement, Tooltip);

export default function Charts(props) {
  const {
    categoriesAll: { categoriesSummary, expenseSummary },
    colors,
  } = props;

  const labels = categoriesSummary.map(el => el.name);
  const options = {
    legend: {
      display: false,
    },
  };

  const val =
    categoriesSummary.length > 0
      ? categoriesSummary.map(el => Math.abs(el.total))
      : [1, 1];

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
        ₴ {numberWithSpaces(Math.abs(expenseSummary))}
      </p>
      <Doughnut data={data} width={100} height={100} options={options} />
    </div>
  );
}
