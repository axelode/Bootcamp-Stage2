import React, { useState } from "react"
import DataFeedbackInterface from "../../interface/DataFeedbackInterface"
import DataFeedback from "../../assets/static_data/feedBackData.json"

export default function FeedBackCard() {
    const [feedback, setFeedback] = React.useState<DataFeedbackInterface[]>(DataFeedback)

    return (
        <>
            {feedback.map((data: DataFeedbackInterface) => {
                const template = 
                    <div key={data.id} className="w-72 p-5 border-solid border-[1px] border-black rounded-lg shadow-xl">
                        <p className="text-center">{data.feed_back}</p>
                        <h1 className="mt-5 text-center font-bold">{data.name}</h1>
                    </div>

                    return template
            })}
        </>
    )
}