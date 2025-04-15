import ItemWrapper from '../ItemWrapper';
import { Pie } from 'react-chartjs-2';
import ItemHeading from '../ItemHeading';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { SpendingBreakdownType } from '../../pages/Homepage';

ChartJS.register(ArcElement, Tooltip, Legend);

type WeeklySpendingBreakdownType = {
    categoryBreakdown: SpendingBreakdownType | undefined;
};

const WeeklySpendingBreakdown = ({
    categoryBreakdown,
}: WeeklySpendingBreakdownType) => {
    //formatting data
    const expenseLabels: string[] = [];
    const expenseSpend: number[] = [];

    const incomeLabels: string[] = [];
    const incomeSpend: number[] = [];

    //formating array, separating the labels and the values for the display
    const formatCategories = (
        labels: string[],
        values: number[],
        arr: [string, number][]
    ) => {
        for (let item of arr) {
            if (item[0] === '') {
                labels.push('Undefined');
            } else {
                const name = item[0].charAt(0).toUpperCase() + item[0].slice(1);
                labels.push(name);
            }
            values.push(item[1]);
        }
    };

    if (categoryBreakdown) {
        //income
        formatCategories(incomeLabels, incomeSpend, categoryBreakdown.income);
        //expenses
        formatCategories(
            expenseLabels,
            expenseSpend,
            categoryBreakdown.expense
        );
    }

    const backgroundColor = [
        'rgba(64, 172, 141, 0.5)',
        'rgba(157, 164, 116, 0.5)',
        'rgba(190, 3, 112, 0.5)',
        'rgba(174, 227, 109, 0.5)',
        'rgba(19, 89, 119, 0.5)',
        'rgba(147, 52, 104, 0.5)',
        'rgba(229, 137, 200, 0.5)',
        'rgba(94, 55, 60, 0.5)',
        'rgba(100, 8, 215, 0.5)',
        'rgba(231, 19, 14, 0.5)',
        'rgba(234, 168, 78, 0.5)',
        'rgba(138, 167, 155, 0.5)',
        'rgba(130, 193, 192, 0.5)',
        'rgba(54, 47, 122, 0.5)',
        'rgba(27, 86, 189, 0.5)',
    ];

    const borderColor = backgroundColor.map((item) => {
        //changing opacity of background color to 1 for the border
        const split = item.split(',');
        split[3] = '1)';
        return split.join();
    });

    const windowSize = window.innerWidth;

    const expenseData = {
        labels: expenseLabels,
        datasets: [
            {
                label: 'Amount spent',
                data: expenseSpend,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };

    const incomeData = {
        labels: incomeLabels,
        datasets: [
            {
                label: 'Amount spent',
                data: incomeSpend,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };

    return (
        <ItemWrapper>
            <div className="flex flex-col gap-y-4 items-center">
                <ItemHeading text="Weekly Spending breakdown" />
                <div className=" h-fit w-70 sm:w-85 lg:w-100 xl:w-full flex flex-col md:flex-row gap-y-4 items-center justify-center gap-x-8 ">
                    <div className="h-full w-full flex flex-col items-center gap-y-4 justify-start">
                        <ItemHeading text="Expense" size="sm" />
                        {expenseLabels.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                                <p>No data available</p>
                            </div>
                        ) : (
                            <Pie
                                options={{
                                    plugins: {
                                        legend: {
                                            position:
                                                windowSize >= 640
                                                    ? 'right'
                                                    : 'bottom',
                                        },
                                    },
                                }}
                                data={expenseData}
                            />
                        )}
                    </div>
                    <div className="h-full  w-full flex flex-col items-center justify-start gap-y-4">
                        <ItemHeading text="Income" size="sm" />
                        {incomeLabels.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                                <p>No data available</p>
                            </div>
                        ) : (
                            <Pie
                                options={{
                                    plugins: {
                                        legend: {
                                            position:
                                                windowSize >= 640
                                                    ? 'right'
                                                    : 'bottom',
                                        },
                                    },
                                }}
                                data={incomeData}
                            />
                        )}
                    </div>
                </div>
            </div>
        </ItemWrapper>
    );
};

export default WeeklySpendingBreakdown;
