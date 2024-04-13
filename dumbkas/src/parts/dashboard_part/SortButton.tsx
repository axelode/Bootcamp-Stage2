import React from "react"

export default function SortButton() {
    const [lastMonthBorder, setLastMonthBorder] = React.useState<string>("")
    const [thisMonthBorder, setThisMonthBorder] = React.useState<string>("3px solid #57CC99")
    const [futureBorder, setFutureBorder] = React.useState<string>("")

    function handleLastMonth() {
        setLastMonthBorder("3px solid #57CC99")
        setThisMonthBorder("")
        setFutureBorder("")
    }

    function handleThisMonth() {
        setLastMonthBorder("")
        setThisMonthBorder("3px solid #57CC99")
        setFutureBorder("")
    }

    function handleFuture() {
        setLastMonthBorder("")
        setThisMonthBorder("")
        setFutureBorder("3px solid #57CC99")
    }
    
    return (
        <div className="px-[438px] z-50">
            <div className="flex justify-center gap-24 mt-12 border-b-2 border-[#57CC99]">
                {/* last month button */}
                <button onClick={handleLastMonth}>
                    <p className="font-bold text-[#22577A]" style={{borderBlockEnd: lastMonthBorder}}>LAST MONTH</p>
                </button>

                {/* this month button */}
                <button onClick={handleThisMonth}>
                    <p className="font-bold text-[#22577A]" style={{borderBlockEnd: thisMonthBorder}}>THIS MONTH</p>
                </button>

                {/* future button */}
                <button onClick={handleFuture}>
                    <p className="font-bold text-[#22577A]" style={{borderBlockEnd: futureBorder}}>FUTURE</p>
                </button>
            </div>
        </div>
    )
}