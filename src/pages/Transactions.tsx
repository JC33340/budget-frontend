import EditTransactions from '../components/transactions/EditTransactions';
import OverallBalance from '../components/transactions/OverallBalance';
import TransactionLog from '../components/transactions/TransactionLog';
import { useEffect, useState, createContext } from 'react';

type transactionLogsType = {
    action: 'add' | 'minus';
    value: number;
    tag: string;
    created_at: string;
    notes: string;
    id: number;
    display_id: number;
};

type transactionContextType = {
    balance: number;
    transactionLogs: transactionLogsType[][];
} | null;

export const transactionContext = createContext<transactionContextType>(null);

const Transactions = () => {
    //storing overall balance
    const [balance, setBalance] = useState<number>(0);

    //storing transaction logs
    const [transactionLogs, setTransactionLogs] = useState<
        transactionLogsType[][]
    >([]);

    useEffect(() => {
        const fetchInformation = async () => {
            try {
                //get jwt
                const jwt = localStorage.getItem('budgeter_jwt');

                //fetch balance information from user from backend
                const fetchInfo = await fetch(
                    `${import.meta.env.VITE_API}/transactions/page-info`,
                    {
                        headers: {
                            authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                const fetchInfoParsed = await fetchInfo.json();
                setBalance(fetchInfoParsed.overall_balance);
                setTransactionLogs(fetchInfoParsed.transaction_logs);
            } catch (e) {
                console.log(e);
            }
        };

        fetchInformation();
    }, []);

    return (
        <transactionContext.Provider
            value={{ balance: balance, transactionLogs: transactionLogs }}
        >
            <div className="flex flex-col items-center gap-y-4">
                <div className="w-full flex flex-col gap-y-8 items-center">
                    <div className="flex gap-x-8 w-full">
                        <OverallBalance />
                        <EditTransactions />
                    </div>
                    <TransactionLog />
                </div>
            </div>
        </transactionContext.Provider>
    );
};

export default Transactions;
