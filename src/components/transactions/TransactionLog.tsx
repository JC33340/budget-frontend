import ItemWrapper from '../ItemWrapper';
import { useContext, useState, useEffect } from 'react';
import {
    transactionContext,
    transactionLogsType,
} from '../../pages/Transactions';
import { FaTrash } from 'react-icons/fa6';
import TagDropdown from './TagDropdown';
import InputField from '../InputField';

const TransactionLog = () => {
    const context = useContext(transactionContext);
    const transactions = context === null ? [] : context.transactionLogs;

    //option for searching
    const [option, setOption] = useState('');

    //searching informationn
    const [notes, setNotes] = useState('');

    //search display
    const [searchDisplay, setSearchDisplay] = useState<transactionLogsType[][]>(
        []
    );

    //set search display
    useEffect(() => {
        setSearchDisplay([...transactions]);
    }, [context?.transactionLogs]);

    //delete row
    const deleteRow = async (id: number, value: number) => {
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

        //updating the overall balance
        context?.setBalance((prev) => {
            return prev - value;
        });
    };

    //handling search input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value);
    };

    //useEffect to filter information
    useEffect(() => {
        let newArr = [...transactions];

        //filter array
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = newArr[i].filter((item) => {
                if (item.notes.toLowerCase().includes(notes)) {
                    if (option === '') {
                        return item;
                    } else if (item.tag === option) {
                        return item;
                    }
                    return;
                }
            });
        }
        setSearchDisplay(newArr);
    }, [option, notes]);

    return (
        <ItemWrapper>
            <div className="flex flex-col items-center gap-y-4">
                <p className="text-3xl text-blue font-medium">
                    Transactions log
                </p>
                <div className="flex gap-x-4 items-center">
                    <p className="text-blue text-2xl h-full font-medium">
                        Filter:
                    </p>
                    <div className="w-60 sm:w-80 md:w-100">
                        <div className="flex items-end gap-x-4 ">
                            <TagDropdown
                                option={option}
                                setOption={setOption}
                            />
                            <div className="w-full">
                                <InputField
                                    placeholder="Notes"
                                    type="notes"
                                    value={notes}
                                    name="notes"
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full max-h-100 overflow-y-scroll">
                    <div className="grid grid-cols-3 border-b-2 border-dark-gray text-center font-medium">
                        <p className="border-r-2 border-dark-gray">Amount</p>
                        <p className="border-r-2 border-dark-gray">Tag</p>
                        <p>Notes</p>
                    </div>
                    {searchDisplay?.map((item, i) => {
                        return (
                            <div key={i}>
                                {item.length > 0 && (
                                    <div className="flex bg-light-gray font-medium text-white items-end justify-end rounded-md py-1 px-2">
                                        <p>{item[0].created_at}</p>
                                    </div>
                                )}
                                {item.map((row, j) => {
                                    return (
                                        <div
                                            key={j}
                                            className={`grid group grid-cols-3 relative border-b-1 border-dark-gray rounded-md ${j % 2 === 0 ? 'bg-white' : 'bg-lighter-gray'}`}
                                        >
                                            <p
                                                className={`border-r-2 border-dark-gray text-xl font-medium flex items-center justify-center p-2 ${row.value < 0 ? 'text-red' : 'text-green'}`}
                                            >
                                                {row.value}
                                            </p>
                                            <p className="text-sm sm:text-md border-r-2 border-dark-gray flex items-center justify-center p-2 capitalize">
                                                {row.tag}
                                            </p>
                                            <p className="p-2 flex items-center justify-start">
                                                {row.notes}
                                            </p>
                                            <div className="absolute h-full group-hover:flex gap-x-4 justify-center right-3 hidden transition-all ease-in-out">
                                                <button
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        deleteRow(
                                                            row.id,
                                                            row.value
                                                        )
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
