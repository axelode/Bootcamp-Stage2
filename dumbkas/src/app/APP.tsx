import React from "react"
import { Navigate, Outlet, Route, Router, Routes } from "react-router-dom"

// home
import Home from "../pages/Home"
import SignupCard from "../parts/home_part/SignupCard"
import LoginCard from "../parts/home_part/LoginCard"

// dashboard
import Dashboard from "../pages/Dashboard"
import AddTransactionCard from "../parts/dashboard_part/AddTransactionCard"
import AddCategoryCard from "../parts/dashboard_part/AddCategoryCard"

export default function APP(): React.JSX.Element {
    const [isLogin, setLogin] = React.useState<boolean>(true)

    const ProtectedRoute = () => {
        if(isLogin) return <Outlet />

        return <Navigate to={'/'} />
    }

    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add_transaction" element={<AddTransactionCard />} />
                <Route path="/add_category" element={<AddCategoryCard />} />           
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/sign_up" element={<SignupCard />} />
            <Route path="/login" element={<LoginCard />} />
        </Routes>
    )
}