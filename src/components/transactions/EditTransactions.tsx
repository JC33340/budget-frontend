import ItemWrapper from '../ItemWrapper';
import InputField from '../InputField';
import Button from '../Button';
import { useState, useContext } from 'react';
import TagDropdown from './TagDropdown';
import { transactionContext } from '../../pages/Transactions';

type amountType = {
    amount: string;
    notes: string;
};

const EditTransactions = () => {
    //storing number values as string
    const [amount, setAmount] = useState<amountType>({
        amount: '',
        notes: '',
    });

    //context
    const context = useContext(transactionContext);

    //handle options for dropdown
    const [option, setOption] = useState('');

    //handling the input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'amount') {
            //converting string input into number
            const num = Number(e.target.value);

            //if number is equal to the negative sign, let it slide
            if (e.target.value === '-') {
                setAmount((prev) => {
                    return {
                        ...prev,
                        [e.target.name]: e.target.value,
                    };
                });
            } else if (Number.isNaN(num)) {
                //if the returned value from the conversion is not a number then return and do not change state
                return;
            }

            //limit decimal places of number
            const numArr = e.target.value.split('.');
            if (numArr[1] && numArr[1].length > 2) {
                return;
            }
        }
        //set state it value passes all above check
        setAmount((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    //handling clicking button
    const handleClick = async () => {
        const num = Number(amount.amount);

        //double check that value is a number
        if (Number.isNaN(num)) {
            return alert('Value is not a number');
        }

        //getting jwt
        const jwt = localStorage.getItem('budgeter_jwt');

        //sending api to add transaction
        const addTransaction = await fetch(
            `${import.meta.env.VITE_API}/transactions/add-transaction`,
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    value: num,
                    tag: option,
                    notes: amount.notes,
                }),
            }
        );
        const addTransactionParsed = await addTransaction.json();
        //error handling
        if (!addTransaction.ok) {
            console.log(addTransactionParsed);
            return alert('Sorry, something went wrong.');
        }

        //update information without reloading

        //update balance information on UI
        context?.setBalance(addTransactionParsed.newBalance);

        //update logs information
        context?.setTransactionLogs((prev) => {
            //create date
            const dateNow = new Date().toLocaleString('en-GB', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });
            let newArr = [...prev];
            //adding index of element in
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i][0].created_at === dateNow) {
                    newArr[i] = [
                        {
                            id: addTransactionParsed.logId,
                            created_at: dateNow,
                            value: num,
                            notes: amount.notes,
                            tag: option,
                        },
                        ...newArr[i],
                    ];
                    break;
                }
            }
            //reset input elements
            setAmount({ amount: '', notes: '' });
            setOption('');
            return newArr;
        });
    };

    return (
        <ItemWrapper>
            <div className="flex flex-col gap-y-4 items-start justify-center h-full">
                <p className="text-3xl text-blue font-medium text-center w-full">
                    Add Transaction
                </p>
                <div className="flex gap-x-4 items-end justify-center">
                    <InputField
                        placeholder="Amount"
                        value={amount.amount}
                        name="amount"
                        handleChange={handleChange}
                        className={`${Number(amount.amount) > 0 ? 'text-green' : Number(amount.amount) < 0 ? 'text-red' : 'text-black'}`}
                    />
                    <TagDropdown option={option} setOption={setOption} />
                    <Button text="Add transcation" handleClick={handleClick} />
                </div>
                <InputField
                    name="notes"
                    placeholder="Notes"
                    handleChange={handleChange}
                    value={amount.notes}
                    className="w-100"
                    maxLength={50}
                />
            </div>
        </ItemWrapper>
    );
};

export default EditTransactions;
