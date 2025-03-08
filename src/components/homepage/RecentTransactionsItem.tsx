import type { transactionLogsType } from '../../pages/Transactions';

type RecentTransactionsItemType = {
    transactionLog: transactionLogsType;
    color: string;
};

const RecentTransactionsItem = ({
    transactionLog,
    color,
}: RecentTransactionsItemType) => {
    const date = new Date(transactionLog.created_at).toLocaleDateString(
        'en-GB',
        {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }
    );
    return (
        <div className={`${color} grid grid-cols-3 rounded-lg`}>
            <p className="flex items-center p-2 border-r-2 border-lighter-gray">
                {transactionLog.value}
            </p>
            <p className="flex items-center capitalize p-2 border-r-2 border-lighter-gray">
                {transactionLog.tag}
            </p>
            <p className="flex items-center p-2">{date}</p>
        </div>
    );
};

export default RecentTransactionsItem;
