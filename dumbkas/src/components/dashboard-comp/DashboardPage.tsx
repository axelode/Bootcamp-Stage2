import SortButton from "../../parts/dashboard_part/SortButton"
import DashboardTransactionTable from "../../parts/dashboard_part/DashboardTransactionTable"
import DasboardSummaryExpense from "../../parts/dashboard_part/DashboardSummaryExpense"
import WalletCard from "../../parts/dashboard_part/WalletCard"

export default function DashboardPage() {
    return (
        <div className="pb-8">
            <SortButton />
            <div className="flex justify-center gap-5 mt-12">
                {/* wallet */}
                <div className="flex flex-col gap-5">
                    <WalletCard />
                </div>

                {/* transaction */}
                <div className="">
                    <DashboardTransactionTable />
                </div>

                {/* summary expense */}
                <div className="">
                    <DasboardSummaryExpense />
                </div>
            </div>

            <div className="flex justify-between px-12 mt-8">
                <button>
                    <p className="px-5 py-1.5 text-lg font-bold text-white bg-[#393939] rounded-lg">Add Category</p>
                </button>

                <button className="flex items-center justify-center">
                    <p className="w-12 h-12 text-4xl font-bold text-white bg-[#393939] rounded-full">+</p>
                </button>
            </div>
        </div>
    )
}