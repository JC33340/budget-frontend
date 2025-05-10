import SpendingTrends from '../components/Reports/SpendingTrends';
import MonthlyOverview from '../components/Reports/MonthlyOverview';
import { useEffect, useState } from 'react';

export type reportsDataType = {
    month: number;
    year: number;
    balance: number;
    income: number;
    expense: number;
    categories: {};
};

const Reports = () => {
    const [overviewData, setOverviewData] = useState<reportsDataType[]>([]);
    const [spendingTrendsData, setSpendingTrendsData] = useState<
        reportsDataType[]
    >([]);

    useEffect(() => {
        const getInfo = async () => {
            //get token
            const token = localStorage.getItem('budgeter_jwt');
            const data = await fetch(
                `${import.meta.env.VITE_API}/reports/page-info`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data_parsed = await data.json();
            setOverviewData(data_parsed.data);
            setSpendingTrendsData(data_parsed.filteredData);
        };

        getInfo();
    }, []);

    return (
        <div className="flex flex-col gap-y-4">
            <SpendingTrends data={overviewData} />
            <MonthlyOverview data={spendingTrendsData} />
        </div>
    );
};

export default Reports;
