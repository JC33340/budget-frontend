import { reportsDataType } from '../../pages/Reports';

type MonthItemType = {
    item: reportsDataType;
};

const MonthItem = ({ item }: MonthItemType) => {
    //convert number date to string
    const date = new Date();
    date.setMonth(item.month);
    date.setFullYear(item.year);
    let categories: [string, number][] = Object.entries(item.categories);
    //sort categories by value
    categories = categories.sort((a, b) => {
        if (a[1] < b[1]) {
            return 1;
        } else {
            return -1;
        }
    });
    return (
        <div
            className="p-2 border-2 border-dark-gray rounded-md w-full whitespace-nowrap"
            data-testid="monthItem-testid"
        >
            <p className="text-center font-semibold underline text-lg">
                {date.toLocaleDateString('en-GB', { month: 'long' })}{' '}
                <span>({item.year})</span>
            </p>
            <p>
                <span className="font-semibold">Total Balance:</span>{' '}
                <span>{item.balance}</span>
            </p>
            <p className="text-green">
                <span className="font-semibold">Income:</span>{' '}
                <span>{item.income}</span>
            </p>
            <p className="text-red">
                <span className="font-semibold">Expense:</span>{' '}
                <span>{item.expense}</span>
            </p>
            <div>
                <p className="font-semibold">Category Breakdown:</p>
                <div className="max-h-[5rem] overflow-y-scroll border-1 border-light-gray px-2 py-1 rounded-md">
                    {categories.length > 0 ? (
                        categories.map((item, i) => {
                            return (
                                <div className="capitalize" key={i}>
                                    {item[0]}: {item[1]}
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center">No Data</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonthItem;
