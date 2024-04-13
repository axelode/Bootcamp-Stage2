import { useNavigate } from "react-router-dom"

export default function DashboardNavbar() {
    const navigate = useNavigate()

    function handleLogout() {
        navigate("/")
    }

    return (
        <div className="shadow-xl">
            <div className="flex items-center p-4 px-20 bg-[#57CC99]">
                <p className="flex-1 font-bold text-2xl text-[#22577A]">DumbKas</p>
                <div className="flex items-center gap-5 font-medium">
                    <p className="text-[#22577A]">Hello, Ilham Fathullah</p>
                    <button onClick={handleLogout}>
                        <p className="px-5 py-1.5 text-[#22577A] bg-[#C7F9CC] rounded-lg">Logout</p>
                    </button>
                </div>
            </div>
        </div>
    )
}