export default function TransactionTable() {
    return (
        <div className="w-96 pb-5 border-[1px] border-black rounded-lg shadow-2xl">
            <h1 className="py-2 text-xl font-bold text-center text-[#22577A]">Transactions</h1>
            
            <div className="border-t-2 border-b-2 border-[#DDDDDD]">
                <div className="flex items-center px-5 py-1.5">
                    <div className="flex flex-1 gap-3">
                    <div className="w-12 rounded-full flex justify-center items-center">
                        <p className="text-4xl font-bold text-[#22577A]">05</p>
                    </div>
                        <div className="font-medium text-[#38A3A5]">
                            <p>Friday</p>
                            <p>August 2022</p>
                        </div>
                    </div>
                    <p className="text-xl font-bold">-306,000</p>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center mt-1.5 px-5 py-1.5">
                    <div className="flex flex-1 gap-3">
                        <div className="w-12 bg-[#DBC608] rounded-full flex justify-center items-center">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/2159/100c/09b8b728b99ff158cfde37ea83e324a6?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JrZI~ZugfTkHKsouXc2Av8GI8EcCof0VOTyeYGV1-7cX2rpokNohSXKweMwl5EPGcI5-sSKYhDm~ZuTvyD-L0WGEXxyR0g03EKbU30VoF1YIxSGkL1aNVNpsizm~7YuOA4w52RgEJehJI1QTcCGlpIjMhkICXxC49IajW57~T0v~H1LH5DExMc2-dK6Q6P39tW1WU5NW6Lwaev0qKz8WPL39QE1wdYLaRXByxp8CoMHB2JICA4GI5OVbOHTSe4wcFsY1AAT86cUHYXvFQ64RqjcklNz5fmI7ca3syKfdHD3UO2eVaBUvvhm2GCSmGtcFIWMhVmVyVy5Faagko1YEow__"
                                alt="image"
                                width={30}
                            />
                        </div>
                        <div className="text-[#22577A]">
                            <p className="font-medium">Family</p>
                            <p>Jajan malam minggu</p>
                        </div>
                    </div>
                    <p className="text-[#FC0000]">278,000</p>
                </div>

                <div className="flex items-center mt-1.5 px-5 py-1.5">
                    <div className="flex flex-1 gap-3">
                        <div className="w-12 bg-[#089CDB] rounded-full flex justify-center items-center">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/a6bf/ab89/5c826dca75d4875d0e3ee4769762a13e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AYdguntKaVPkF0f0fZu9wkOvUO~dO3m0XDNPnG5NCybXsy~DdkTSsPmAkXKHg7u3KDndbr0x4M9vm6l5wr0tywYg0owTDgcCF~nv5MQL6miYubROamDkyUa4LHrHOywf-TAlpAzk0ugFtzMnReEsW1BJSMHguozFnehnqLV~HXKws7cp1oMfAq627WnV8ARrnoa2iTo~Jzry-tHCX2WxET5PbKvNv0oDuqFnUH0T9fulHIDBxCfcca2ZjhrGJ3f2uhe~gjHr5bmMunZrTE5oKVzAgVjpz0C0wIkaVDzcEWLVzooqFRvaHghIqQS5M0ehd~~oC3OA2MLJP0pywyGb7A__"
                                alt="image"
                                width={30}
                            />
                        </div>
                        <div className="text-[#22577A]">
                            <p className="font-medium">Food & Beverages</p>
                            <p>Ayam geprek mak cik</p>
                        </div>
                    </div>
                    <p className="text-[#FC0000]">28,000</p>
                </div>
            </div>
        </div>
    )
}