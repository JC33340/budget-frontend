import ItemWrapper from '../ItemWrapper';
import ItemHeading from '../ItemHeading';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { transactionLogsType } from '../../pages/Transactions';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type WeeklySummaryType = {
    arr: [string, transactionLogsType[]][] | undefined;
};

const WeeklySummary = ({ arr }: WeeklySummaryType) => {
    //labels for the data
    const [labels, setLabels] = useState<string[]>([]);

    //format information
    const [incomeData, setIncomeData] = useState<number[]>([]);
    const [expenseData, setExpenseData] = useState<number[]>([]);

    useEffect(() => {
        //ensure array exists
        if (!arr) {
            return;
        }
        //generate current week
        const dateArr = [];
        const expenseArr = [];
        const incomeArr = [];
        for (let i = 0; i < arr.length; i++) {
            dateArr.push(arr[i][0]);
            const logArr = arr[i][1];
            let expenseSum = 0;
            let incomeSum = 0;
            for (let j = 0; j < logArr.length; j++) {
                if (logArr[j].value > 0) {
                    incomeSum += logArr[j].value;
                } else {
                    expenseSum += logArr[j].value;
                }
            }
            expenseArr.push(-expenseSum);
            incomeArr.push(incomeSum);
        }
        setLabels(dateArr);
        setExpenseData(expenseArr);
        setIncomeData(incomeArr);

        //format income and expense data
    }, [arr]);

    //data
    const data = {
        labels,
        datasets: [
            {
                label: 'Expense',
                data: expenseData,
                backgroundColor: 'rgb(255, 0, 0,0.8)',
            },
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(46, 204, 113,0.8)',
            },
        ],
    };

    return (
        <ItemWrapper>
            <div className="h-fit" data-testid="weeklySummary-testid">
                <ItemHeading text="Weekly Summary" />
                <div className="h-100">
                    <Bar
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        data={data}
                    />
                </div>
            </div>
        </ItemWrapper>
    );
};

export default WeeklySummary;
