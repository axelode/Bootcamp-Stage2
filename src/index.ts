interface Mahasiswa {
    nama: string
    nilai: number
    presensi: number
}

function handleStatus(mahasiswa: Mahasiswa): string {
    if(mahasiswa.nilai === 100 && mahasiswa.presensi >= 80) {
        return `${mahasiswa.nama} Lulus Cumlaude`
    }else if(mahasiswa.nilai >= 70 && mahasiswa.presensi >=70) {
        return `${mahasiswa.nama} Lulus`
    }else {
        return `${mahasiswa.nama} Tidak Lulus`
    }
}

const mahasiswa: Mahasiswa[] = [
    {
        nama: "Jhon",
        nilai: 60,
        presensi: 50
    },
    {
        nama: "Marco",
        nilai: 100,
        presensi: 100
    },
    {
        nama: "Bella",
        nilai: 80,
        presensi: 90
    }
]

for(let i = 0; i < mahasiswa.length; i++) {
    const result = handleStatus(mahasiswa[i])
    console.log(result)
}

