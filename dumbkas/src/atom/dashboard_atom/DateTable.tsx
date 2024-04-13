import React, { useState } from "react"
import DataTransactionInterface from "../../interface/DataTransactionInterface"
import transactionData from "../../assets/static_data/dummy_data/transactionData.json"

import TransactionTable from "./TransactionTable"

export default function DateTable() {
    const [transaction, setTransaction] = React.useState<DataTransactionInterface[]>(transactionData)

    const sortedData: DataTransactionInterface[] = transaction.sort((a, b) => b.id - a.id)

    const dataDate = []

    for(let i = 0; i < sortedData.length; i++) {
        dataDate.push(transaction[i].date)
    }

    const datefilter = [ ...new Set(dataDate) ]
    
    return (
        <>
            {datefilter.map((data) => {

                const dateTime = new Date(data)
                
                const date = dateTime.getDate()
                const day = dateTime.getDay()
                const month = dateTime.getMonth()
                const year = dateTime.getFullYear()

                const dateString = date <= 9? `0${date}` : `${date}`

                const dayString = [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu" ]

                const monthString = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

                const template = 
                <>
                    <div className="border-b-[1px] border-[#DDDDDD]">
                        <div className="flex items-center px-5 py-1.5">
                            <div className="flex flex-1 gap-3">
                            <div className="w-12 rounded-full flex justify-center items-center">
                                <p className="text-4xl font-bold text-[#22577A]">{dateString}</p>
                            </div>
                                <div className="font-medium text-[#38A3A5]">
                                    <p>{dayString[day]}</p>
                                    <p>{monthString[month]} {year}</p>
                                </div>
                            </div>
                            <p className="text-xl font-bold">-306,000</p>
                        </div>
                    </div>
                </>

                return template
            })}
        </>
    )
}