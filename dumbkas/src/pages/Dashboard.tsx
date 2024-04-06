import DashboardNavbar from "../components/dashboard-comp/DashboardNavbar"
import DashboardPage from "../components/dashboard-comp/DashboardPage"

import AddTransactionCard from "../components/dashboard-comp/AddTransactionCard"
import AddCategoryCard from "../components/dashboard-comp/AddCategoryCard"

export default function Dasboard() {
    return (
        <div className="relative">
            <DashboardNavbar />
            <DashboardPage />
            <div className="w-full h-screen absolute top-0 right-0 hidden">
                {/* <AddTransactionCard /> */}
                {/* <AddCategoryCard /> */}
            </div>        
        </div>
    )
}