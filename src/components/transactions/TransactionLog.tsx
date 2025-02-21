import ItemWrapper from '../ItemWrapper';
import { useContext } from 'react';
import { transactionContext } from '../../pages/Transactions';
import { FaTrash } from 'react-icons/fa6';

const TransactionLog = () => {
    const context = useContext(transactionContext);
    const transactions = context === null ? [] : context.transactionLogs;

    //delete row
    const deleteRow = (id: number) => {
        console.log(id);
    };

    return (
        <ItemWrapper>
            <div className="flex flex-col items-center gap-y-4">
                <p className="text-3xl text-blue font-medium">
                    Transactions log
                </p>
                <div className="flex flex-col w-full">
                    <div className="grid grid-cols-[100px_1fr_1fr_1fr] border-b-2 border-dark-gray text-center">
                        <p className="border-r-2 border-dark-gray">ID</p>
                        <p className="border-r-2 border-dark-gray">Amount</p>
                        <p className="border-r-2 border-dark-gray">Tag</p>
                        <p>Notes</p>
                    </div>
                    {transactions?.map((item, i) => {
                        return (
                            <div key={i}>
                                <div className="flex bg-light-gray font-medium text-white items-end justify-end rounded-sm py-1 px-2">
                                    <p>{item[0].created_at}</p>
                                </div>
                                {item.map((row, j) => {
                                    return (
                                        <div
                                            key={j}
                                            className={`grid group grid-cols-[100px_1fr_1fr_1fr] relative border-b-1 border-dark-gray ${j % 2 === 0 ? 'bg-white' : 'bg-lighter-gray'}`}
                                        >
                                            <p className="border-r-2 border-dark-gray flex items-center justify-center p-2">
                                                {row.display_id}
                                            </p>
                                            <p
                                                className={`border-r-2 border-dark-gray flex items-center justify-center p-2 ${row.value < 0 ? 'text-red' : 'text-green'}`}
                                            >
                                                {row.value}
                                            </p>
                                            <p className="border-r-2 border-dark-gray flex items-center justify-center p-2">
                                                {row.tag}
                                            </p>
                                            <p className="p-2 flex items-center justify-start">
                                                {row.notes}
                                            </p>
                                            <div className="absolute h-full group-hover:flex gap-x-4 justify-center right-3 hidden transition-all ease-in-out">
                                                <button
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        deleteRow(row.id)
                                                    }
                                                >
                                                    <FaTrash className="fill-red" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </ItemWrapper>
    );
};

export default TransactionLog;
