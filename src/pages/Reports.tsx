import MonthlyReports from "../components/reports/MonthlyReports";
import MonthlyTrend from "../components/reports/MonthlyTrend";
import OverallSpendingBreakdown from "../components/reports/OverallSpendingBreakdown";

const Reports = () => {
    return (
        <div>
            <MonthlyReports />
            <MonthlyTrend />
            <OverallSpendingBreakdown />
        </div>
    );
};

export default Reports;
