import ItemWrapper from '../ItemWrapper';
import { useContext } from 'react';
import { transactionContext } from '../../pages/Transactions';
import { FaTrash } from 'react-icons/fa6';

const TransactionLog = () => {
    const context = useContext(transactionContext);
    const transactions = context === null ? [] : context.transactionLogs;

    //delete row
    const deleteRow = async (id: number) => {
        //delete row API
        //get jwt
        const localjwt = localStorage.getItem('budgeter_jwt');
        const deleteRow = await fetch(
            `${import.meta.env.VITE_API}/transactions/delete-transaction`,
            {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localjwt}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    logId: id,
                }),
            }
        );
        const deleteRowParsed = await deleteRow.json();
        //handle errors
        if (!deleteRow.ok) {
            console.log(deleteRowParsed);
            return alert('Sorry, something went wrong');
        }

        //update information without reloading window
        context?.setTransactionLogs((prev) => {
            let newArr = [...prev];
            //filter out the item in the array via the id
            for (let i = 0; i < newArr.length; i++) {
                newArr[i] = newArr[i].filter((item) => item.id != id);
            }
            return newArr;
        });
    };

    return (
        <ItemWrapper>
            <div className="flex flex-col items-center gap-y-4">
                <p className="text-3xl text-blue font-medium">
                    Transactions log
                </p>
                <div className="flex flex-col w-full">
                    <div className="grid grid-cols-3 border-b-2 border-dark-gray text-center">
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
                                            className={`grid group grid-cols-3 relative border-b-1 border-dark-gray ${j % 2 === 0 ? 'bg-white' : 'bg-lighter-gray'}`}
                                        >
                                            <p
                                                className={`border-r-2 border-dark-gray text-xl font-medium flex items-center justify-center p-2 ${row.value < 0 ? 'text-red' : 'text-green'}`}
                                            >
                                                {row.value}
                                            </p>
                                            <p className="border-r-2 border-dark-gray flex items-center justify-center p-2 capitalize">
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
