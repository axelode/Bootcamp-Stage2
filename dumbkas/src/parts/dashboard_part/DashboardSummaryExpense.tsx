export default function DasboardSummaryExpense() {
    return (
        <div className="w-96 pb-5 border-[1px] border-black rounded-lg shadow-2xl">
            <h1 className="py-2 text-xl font-bold text-center text-[#22577A] border-b-2 border-[#DDDDDD]">Summary Expense</h1>

            <div className="flex flex-col px-5">

                <div className="flex items-center justify-center gap-12">
                    <img src="https://s3-alpha-sig.figma.com/img/8aaf/7e0f/71915e8bd2de478ff7a8a13c64b1b116?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FBX8yvd6-5L3fNQj3ueLqavXFzxXNpOt2YSIEcFy-djOSqA6ERlzxABWDk-faTn6HDNcDwlMcHFxT~qiVospgTwIZbVfvexu-qZFy9ADcOAOiZO2WIMA92Vftm8-vCzBK7nsb27XguJUEpY13p5jA0WFrNcQ8iHTVUy5I0l75hOgI29-H2vFCA0RvprKCkJKqXlqFjMgph50a8OsK2mbA4LulWGXxVMuqOltut7pg5IwdpxF6ro1xJuQ5msokol2aYacK-XJERoZ39d3Q~i1hf~YGUYHHKmwg3ZwegMO2rNCUDu2ckXwoeYcGG~W18oZMzY7PR2wZQOJvQ7DC80mAA__" alt="" width={150} />
                    <p className="font-bold text-[#FC0000]">4,662,000</p>
                </div>

                <div className="flex items-center mt-1.5 py-1.5 border-b-[1px] border-[#DDDDDD]">
                    <div className="flex flex-1 items-center gap-3">
                        <div className="w-12 h-12 bg-[#DBC608] rounded-full flex justify-center items-center">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/2159/100c/09b8b728b99ff158cfde37ea83e324a6?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JrZI~ZugfTkHKsouXc2Av8GI8EcCof0VOTyeYGV1-7cX2rpokNohSXKweMwl5EPGcI5-sSKYhDm~ZuTvyD-L0WGEXxyR0g03EKbU30VoF1YIxSGkL1aNVNpsizm~7YuOA4w52RgEJehJI1QTcCGlpIjMhkICXxC49IajW57~T0v~H1LH5DExMc2-dK6Q6P39tW1WU5NW6Lwaev0qKz8WPL39QE1wdYLaRXByxp8CoMHB2JICA4GI5OVbOHTSe4wcFsY1AAT86cUHYXvFQ64RqjcklNz5fmI7ca3syKfdHD3UO2eVaBUvvhm2GCSmGtcFIWMhVmVyVy5Faagko1YEow__"
                                alt="image"
                                width={30}
                            />
                        </div>
                        <p className="font-medium text-[#22577A]">Family</p>
                    </div>
                    <p className="text-[#FC0000]">278,000</p>
                </div>

                <div className="flex items-center mt-1.5 py-1.5 border-b-[1px] border-[#DDDDDD]">
                    <div className="flex flex-1 items-center gap-3">
                        <div className="w-12 h-12 bg-[#089CDB] rounded-full flex justify-center items-center">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/a6bf/ab89/5c826dca75d4875d0e3ee4769762a13e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AYdguntKaVPkF0f0fZu9wkOvUO~dO3m0XDNPnG5NCybXsy~DdkTSsPmAkXKHg7u3KDndbr0x4M9vm6l5wr0tywYg0owTDgcCF~nv5MQL6miYubROamDkyUa4LHrHOywf-TAlpAzk0ugFtzMnReEsW1BJSMHguozFnehnqLV~HXKws7cp1oMfAq627WnV8ARrnoa2iTo~Jzry-tHCX2WxET5PbKvNv0oDuqFnUH0T9fulHIDBxCfcca2ZjhrGJ3f2uhe~gjHr5bmMunZrTE5oKVzAgVjpz0C0wIkaVDzcEWLVzooqFRvaHghIqQS5M0ehd~~oC3OA2MLJP0pywyGb7A__"
                                alt="image"
                                width={30}
                            />
                        </div>
                        <p className="font-medium text-[#22577A]">Food & Beverages</p>
                    </div>
                    <p className="text-[#FC0000]">28,000</p>
                </div>
                
                <div className="flex items-center mt-1.5 py-1.5">
                    <div className="flex flex-1 items-center gap-3">
                        <div className="w-12 h-12 bg-[#08DB76] rounded-full flex justify-center items-center">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/891a/267e/799f4819abb838cbd0c78d0a8eeaa584?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UpKB7tHEM6XlF7RWcSR7ynbmg-O6WiY0y9bDr~Ku7t5z9HTxVjRJSYuvfzFSSdd4TK739LCTw2-aUt6-JOhQMagYWRBaXkDEGYzlrE7kDTLdp1j~U8jtfdFABmPBqFnjmuRO~LrS44CNgA~Ayu9mP1L3e78o9HSxuUkaJp5PXAklqkCpr~NZWL0yF3oQgXjxmWP-Ak3UmWeTnD2lDVoUZMOCy-dmEczcJH8nmncgD5qo0j5aY03mmIZiW~AtBaBX-KMZpDnNXtKnHslHeCmEp3aFdL6o0qvahqkSR38hIi3biTgUsfE4jfRAiL1lCiWzTptAyUUXew7H~uHHRD2Gwg__"
                                alt="image"
                                width={30}
                            />
                        </div>
                        <p className="font-medium text-[#22577A]">Sallary</p>
                    </div>
                    <p className="text-[#0092FC]">5,000,000</p>
                </div>
            </div>
        </div>
    )
}