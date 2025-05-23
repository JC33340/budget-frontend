import WeeklySpendingBreakdown from '../components/homepage/WeeklySpendingBreakdown';
import RecentTransactions from '../components/homepage/RecentTransactions';
import TotalBalance from '../components/homepage/TotalBalance';
import WeeklySummary from '../components/homepage/WeeklySummary';
import { useEffect, useState } from 'react';
import type { transactionLogsType } from './Transactions';

export type SpendingBreakdownType = { income: []; expense: [] } | undefined;

type infoType = {
    category: SpendingBreakdownType;
    balance: number;
    recentTransactions: transactionLogsType[];
    week: [string, transactionLogsType[]][];
};

const HomePage = () => {
    const [info, setInfo] = useState<infoType>();
    //get information from backend
    useEffect(() => {
        const fetchInfo = async () => {
            //get jwt
            const jwt = localStorage.getItem('budgeter_jwt');
            const homePageInfo = await fetch(
                `${import.meta.env.VITE_API}/homepage/page-info`,
                {
                    headers: {
                        authorization: `Bearer ${jwt}`,
                    },
                }
            );
            const homePageInfoParsed = await homePageInfo.json();
            if (!homePageInfo.ok) {
                console.log(homePageInfoParsed);
            }
            setInfo(homePageInfoParsed);
        };

        fetchInfo();
    }, []);

    return (
        <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                <WeeklySpendingBreakdown categoryBreakdown={info?.category} />
                <div className="flex flex-col h-full gap-y-4">
                    <TotalBalance balance={info?.balance} />
                    <RecentTransactions
                        recentTransactions={info?.recentTransactions}
                    />
                </div>
            </div>
            <WeeklySummary arr={info?.week} />
        </div>
    );
};

export default HomePage;
