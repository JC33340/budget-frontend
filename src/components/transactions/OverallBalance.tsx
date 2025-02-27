import ItemWrapper from '../ItemWrapper';
import { useContext } from 'react';
import { transactionContext } from '../../pages/Transactions';

const OverallBalance = () => {
    //getting balance from state
    const context = useContext(transactionContext);

    const balance = context === null ? 0 : context.balance;
    return (
        <ItemWrapper>
            <div className="flex flex-col items-center justify-start gap-y-4 h-full">
                <p className="text-3xl text-blue font-medium">Balance:</p>
                <div className="flex items-center justify-center h-full">
                    <p
                        className={`${balance < 0 ? 'text-red' : 'text-green'} text-6xl`}
                    >
                        £ {(Math.round(balance * 100) / 100).toFixed(2)}
                    </p>
                </div>
            </div>
        </ItemWrapper>
    );
};

export default OverallBalance;
