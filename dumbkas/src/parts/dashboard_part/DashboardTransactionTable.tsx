import TransactionTable from "../../atom/dashboard_atom/TransactionTable"
import DateTable from "../../atom/dashboard_atom/DateTable"

export default function DashboardTransactionTable() {
    return (
        <>
            <div className="w-12/12 pb-5 border-[1px] border-black rounded-lg shadow-2xl">
                <h1 className="py-2 text-xl font-bold text-center text-[#22577A] border-b-2 border-[#DDDDDD]">Transactions</h1>

                <div className="h-96 overflow-y-auto">
                    <DateTable />
                    <TransactionTable />                
                </div>
            </div>

        </>
    )
}