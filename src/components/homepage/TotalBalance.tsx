import ItemWrapper from '../ItemWrapper';
import ItemHeading from '../ItemHeading';

type OverallBalanceType = {
    balance: number | undefined;
};

const TotalBalance = ({ balance }: OverallBalanceType) => {
    return (
        <ItemWrapper>
            <div
                className="flex flex-col gap-y-4 h-full"
                data-testid="totalBalance-testid"
            >
                <ItemHeading text="Overall balance" />
                <div className="flex h-full items-center justify-center">
                    <p
                        className={`${balance && balance < 0 ? 'text-red' : 'text-green'}  text-6xl`}
                    >
                        £ {balance}
                    </p>
                </div>
            </div>
        </ItemWrapper>
    );
};

export default TotalBalance;
