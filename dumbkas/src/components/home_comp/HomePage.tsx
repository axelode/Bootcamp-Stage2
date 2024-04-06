// import "../assets/static_data/dataFeature.json"
import FeatureCard from "../../parts/home_part/FeatureCard"
import TransactionTable from "../../parts/home_part/HomeTransactionTable"
import SummaryExpenseTable from "../../parts/home_part/HomeSummaryExpenseTable"
import FeedBackCard from "../../parts/home_part/FeedBackCard"

export default function HomePage(): React.JSX.Element {
    return (
        <>
            {/* header */}
            <h1 className="text-6xl text-center mt-20">
                <span className="text-[#57CC99]">Simple way</span> <br />
                <span className="text-[#22577A]">to manage </span>
                <span className="text-[#57CC99]">personal finance</span>
            </h1>

            {/* feature card */}
            <div className="flex justify-center gap-12 mt-16">
                <FeatureCard />
            </div>

            {/* transaction table */}
            <div className="flex justify-start items-center gap-12 ml-[200px] mt-24">
                <TransactionTable />
                <div className="w-3/6">
                    <h1 className="text-left text-4xl"><span className="text-[#57CC99]">Simple</span><span className="text-[#22577A]"> money tracker</span></h1>
                    <p className="mt-5 text-left text-xl text-[#22577A]">
                        It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift
                    </p>
                </div>
            </div>
            
            {/* summary expense table */}
            <div className="flex justify-end items-center gap-12 mr-[200px] mt-24">
                <div className="w-3/6">
                    <h1 className="text-right text-4xl"><span className="text-[#22577A]">Painless </span><span className="text-[#57CC99]"> budgeting</span></h1>
                    <p className="mt-5 text-right text-xl text-[#22577A]">
                        One report to give a clear view on your spending patterns. Understand where your money comes and goes with easy-to-read graphs.
                    </p>
                </div>
                <SummaryExpenseTable />
            </div>
            
            {/* feedback card */}
            <div className="flex flex-col mt-28 mb-16">
                <h1 className="text-5xl text-center">See what others have to say</h1>
                <div className="flex justify-center gap-12 mt-16">
                    <FeedBackCard />
                </div>
            </div> 
        </>
    )
}