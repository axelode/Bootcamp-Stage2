export default function SortButton() {
    return (
        <div className="px-[438px] z-50">
            <div className="flex justify-center gap-24 mt-12 border-b-2 border-[#57CC99]">
                <button><p className="font-bold text-[#22577A]">LAST MONTH</p></button>
                <button><p className="font-bold text-[#22577A] border-b-2 border-[#57CC99]">THIS MONTH</p></button>
                <button><p className="font-bold text-[#22577A]">FUTURE</p></button>
            </div>
        </div>
    )
}