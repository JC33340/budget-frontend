import ItemWrapper from '../ItemWrapper';
import ItemHeading from '../ItemHeading';
import RecentTransactionsItem from './RecentTransactionsItem';
import type { transactionLogsType } from '../../pages/Transactions';

type RecentTransactionsType = {
    recentTransactions: transactionLogsType[] | undefined;
};

const RecentTransactions = ({ recentTransactions }: RecentTransactionsType) => {
    return (
        <ItemWrapper>
            <div
                className=" flex flex-col gap-y-4"
                data-testid="recentTransactions-testid"
            >
                <ItemHeading text="Recent Transactions" />
                <div className="h-60 overflow-y-scroll">
                    <div className="grid grid-cols-3 text-lg border-b-2 border-light-gray">
                        <p className="border-r-2 border-lighter-gray text-center">
                            Value
                        </p>
                        <p className="border-r-2 border-lighter-gray text-center">
                            Tag
                        </p>
                        <p className="text-center">Date</p>
                    </div>
                    {recentTransactions && recentTransactions.length > 0 ? (
                        recentTransactions?.map((item, i) => {
                            return (
                                <RecentTransactionsItem
                                    key={i}
                                    transactionLog={item}
                                    color={i % 2 === 0 ? '' : 'bg-light-gray'}
                                />
                            );
                        })
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <p>No recent transactions</p>
                        </div>
                    )}
                </div>
            </div>
        </ItemWrapper>
    );
};

export default RecentTransactions;
