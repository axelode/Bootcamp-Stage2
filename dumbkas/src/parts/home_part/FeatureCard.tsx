import React, { useState } from "react"
import DataFeatureInterface from "../../interface/DataFeatureInterface"

import DataFeature from "../../assets/static_data/dataFeature.json"


export default function FeatureCard() {
    const [feature, setFeatue] = React.useState<DataFeatureInterface[]>(DataFeature)

    return (
        <>
            {feature.map((data: DataFeatureInterface) => {
                const template = 
                    <div key={data.id} className="w-52 flex flex-col px-8 py-3 items-center border-solid border-[1px] border-black rounded-lg shadow-xl">
                        <img 
                            src={data.image} 
                            alt="logo" 
                            width={50} 
                        />
                        <p className="mt-2 text-[#22577A] font-medium">{data.title}</p>
                    </div>
                
                return template
            })}
        </>
    )
} 