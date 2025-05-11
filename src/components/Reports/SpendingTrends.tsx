import ItemWrapper from '../ItemWrapper';
import ItemHeading from '../ItemHeading';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { reportsDataType } from '../../pages/Reports';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

type SpendingTrendsType = {
    data?: reportsDataType[];
};

const SpendingTrends = ({ data = [] }: SpendingTrendsType) => {
    const labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    //create empty arrays,
    const expense = [];
    const income = [];

    //get current date
    const date = new Date();
    const month = date.getMonth();

    for (let i = 0; i < month; i++) {
        expense.push(0);
        income.push(0);
    }

    //fill array with income and expense data
    for (let item of data) {
        const index = item.month - 1;
        expense[index] = item.expense;
        income[index] = item.income;
    }

    const values = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: income,
                borderColor: 'rgb(80,200,120)',
                backgroundColor: 'rgba(80,200,120,0.5)',
            },
            {
                label: 'Expense',
                data: expense,
                borderColor: 'rgb(255,44,44)',
                backgroundColor: 'rgba(255,44,44,0.5)',
            },
        ],
    };

    return (
        <ItemWrapper>
            <div>
                <ItemHeading text="Spending Trends" />
                <Line
                    height={
                        window.innerWidth >= 1024
                            ? 100
                            : window.innerWidth > 768
                              ? 200
                              : 300
                    }
                    options={options}
                    data={values}
                />
            </div>
        </ItemWrapper>
    );
};

export default SpendingTrends;
