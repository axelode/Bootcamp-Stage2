export default function Navbar() {
    return (
        <div className="flex items-center p-4 px-20">
            <p className="flex-1 font-bold text-2xl text-[#22577A]">DumbKas</p>
            <div className="flex items-center gap-5 font-medium">
                <button><p className="text-[#22577A]">Login</p></button>
                <button><p className="px-5 py-1.5 text-[#22577A] bg-[#C7F9CC] rounded-lg">Sign Up</p></button>
            </div>
        </div>
    )
}