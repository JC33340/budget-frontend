import ItemWrapper from '../ItemWrapper';
import ItemHeading from '../ItemHeading';
import type { reportsDataType } from '../../pages/Reports';
import MonthItem from './MonthItem';

type MonthlyOverviewType = {
    data?: reportsDataType[];
};

const MonthlyOverview = ({ data = [] }: MonthlyOverviewType) => {
    return (
        <ItemWrapper>
            <div className="flex flex-col gap-y-4">
                <ItemHeading text="Overview" />
                <div className="flex gap-x-4 overflow-x-scroll flex-nowrap ">
                    {data.length > 1 ? (
                        data.map((item, i) => <MonthItem key={i} item={item} />)
                    ) : (
                        <div className="w-full text-center font-semibold">
                            No data
                        </div>
                    )}
                </div>
            </div>
        </ItemWrapper>
    );
};

export default MonthlyOverview;
