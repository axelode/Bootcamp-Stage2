import SortButton from "../../parts/dashboard_part/SortButton"
import DashboardTransactionTable from "../../parts/dashboard_part/DashboardTransactionTable"
import DasboardSummaryExpense from "../../parts/dashboard_part/DashboardSummaryExpense"

import { WalletProvider } from "../../context/wallet_context/WalletProvider"
import WalletCard from "../../parts/dashboard_part/WalletCard"

import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
    const navigate = useNavigate()

    function handleAddTransaction() {
        navigate("/add_transaction")
    }

    function handleAddCategory() {
        navigate("/add_category")
    }

    return (
        <div className="pb-8">
            <SortButton />
            <div className="flex justify-center gap-5 mt-12">
                {/* wallet */}
                <div className="flex flex-col gap-5">
                    <WalletProvider>
                        <WalletCard />
                    </WalletProvider>
                </div>

                {/* transaction */}
                {/* <div className=""> */}
                    <DashboardTransactionTable />
                {/* </div> */}

                {/* summary expense */}
                {/* <div className=""> */}
                    <DasboardSummaryExpense />
                {/* </div> */}
            </div>

            <div className="flex justify-between px-12 mt-8">
                <button onClick={handleAddCategory}>
                    <p className="px-5 py-1.5 text-lg font-bold text-white bg-[#393939] rounded-lg">Add Category</p>
                </button>

                <button onClick={handleAddTransaction} className="flex items-center justify-center">
                    <p className="w-12 h-12 text-4xl font-bold text-white bg-[#393939] rounded-full">+</p>
                </button>
            </div>
        </div>
    )
}