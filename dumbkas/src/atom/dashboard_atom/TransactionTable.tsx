import React from "react"
import DataTransactionInterface from "../../interface/DataTransactionInterface"

import transactionData from "../../assets/static_data/dummy_data/transactionData.json"

export default function TransactionTable() {
    const [transaction] = React.useState<DataTransactionInterface[]>(transactionData)

    const sortedData = transaction.sort((a, b) => b.id - a.id)

    return (
        <>
            {sortedData.map((data: DataTransactionInterface) => {
                const amountColor = data.category === "Sallary"? "#0092FC" : "#FC0000"
                
                const background = data.category === "Sallary"? "#08DB76" : data.category === "Family"? "#DBC608" : "#089CDB"

                const template =
                    <div key={data.id} className="w-96 flex items-center mt-1.5 px-5 py-1.5">
                        <div className="flex flex-1 gap-3">
                            <div className="w-12 rounded-full flex justify-center items-center" style={{backgroundColor: background}}>
                                <img
                                    src={data.image}
                                    alt="image"
                                    width={30}
                                />
                            </div>
                            <div className="text-[#22577A]">
                                <p className="font-medium">{data.category}</p>
                                <p>{data.note}</p>
                            </div>
                        </div>
                        <p style={{color: amountColor}}>{data.amount}</p>
                    </div>

                return template
            })}
        </>
    )
}