let suaraBenar = new Audio("audio/benar.mp3");
let suaraSalah = new Audio("audio/salah.mp3");

let statusJawaban = []; // null = belum, true = benar, false = salah


function ucapkan(teks){
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    setTimeout(()=>{
        let u = new SpeechSynthesisUtterance(teks);
        u.lang = 'id-ID';
        u.rate = 0.9;
        speechSynthesis.speak(u);
    }, 300);
}

// Daftar soal PKn
const soalPKn = [
{"t":"Gotong royong adalah kegiatan …","p":["Bekerja sendiri","Bekerja bersama untuk tujuan bersama","Bekerja demi keuntungan pribadi"],"k":1},
{"t":"Gotong royong dilakukan tanpa mengharapkan …","p":["Pujian","Perintah","Imbalan"],"k":2},
{"t":"Gotong royong merupakan ciri khas bangsa …","p":["Asia","Indonesia","Barat"],"k":1},
{"t":"Gotong royong termasuk bentuk bela negara yang bersifat …","p":["Fisik","Militer","Nonfisik"],"k":2},
{"t":"Bela negara tidak selalu dilakukan dengan …","p":["Menjaga persatuan","Angkat senjata","Taat aturan"],"k":1},
{"t":"Sikap bela negara dalam kehidupan sehari-hari dapat ditunjukkan dengan …","p":["Melanggar aturan","Bersikap egois","Menjaga persatuan"],"k":2},
{"t":"Gotong royong bertujuan untuk …","p":["Mencari keuntungan","Menyelesaikan pekerjaan bersama","Mementingkan diri sendiri"],"k":1},
{"t":"Gotong royong mencerminkan nilai …","p":["Individualisme","Kebersamaan","Persaingan"],"k":1},
{"t":"Salah satu manfaat gotong royong adalah …","p":["Pekerjaan menjadi berat","Hubungan menjadi renggang","Pekerjaan menjadi ringan"],"k":2},
{"t":"Gotong royong dapat memperkuat …","p":["Perpecahan","Persatuan bangsa","Kepentingan pribadi"],"k":1},
{"t":"Gotong royong menunjukkan bahwa manusia adalah makhluk …","p":["Individual","Sosial","Bebas"],"k":1},
{"t":"Bela negara bertujuan menjaga …","p":["Kekayaan pribadi","Keutuhan NKRI","Kepentingan kelompok"],"k":1},
{"t":"Menjaga lingkungan bersama termasuk contoh …","p":["Bela negara fisik","Bela negara nonfisik","Bela negara militer"],"k":1},
{"t":"Sikap gotong royong perlu ditanamkan sejak …","p":["Dewasa","Remaja","Anak-anak"],"k":2},
{"t":"Gotong royong dilakukan dengan rasa …","p":["Terpaksa","Sukarela","Takut"],"k":1},
{"t":"Gotong royong dapat menciptakan lingkungan yang …","p":["Kotor","Tidak nyaman","Bersih dan nyaman"],"k":2},
{"t":"Bela negara merupakan kewajiban …","p":["Tentara saja","Orang dewasa","Semua warga negara"],"k":2},
{"t":"Gotong royong mencerminkan semangat …","p":["Persaingan","Kekeluargaan","Paksaan"],"k":1},
{"t":"Gotong royong dapat mencegah sikap …","p":["Peduli","Kerja sama","Egois"],"k":2},
{"t":"Gotong royong yang dilakukan dengan ikhlas disebut bersifat …","p":["Terpaksa","Sukarela","Wajib"],"k":1},
{"t":"Keluarga disebut sebagai …","p":["Negara kecil","Sekolah pertama bela negara","Lingkungan bebas"],"k":1},
{"t":"Membersihkan rumah bersama keluarga merupakan contoh …","p":["Bela negara fisik","Gotong royong di rumah","Kegiatan pribadi"],"k":1},
{"t":"Membantu orang tua mencuci piring menunjukkan sikap …","p":["Malas","Tanggung jawab","Egois"],"k":1},
{"t":"Memasak dan makan bersama keluarga dapat menumbuhkan rasa …","p":["Persaingan","Kekeluargaan","Perpecahan"],"k":1},
{"t":"Berkebun bersama keluarga mencerminkan nilai …","p":["Kebersamaan","Individualisme","Kemalasan"],"k":0},
{"t":"Merawat anggota keluarga yang sakit merupakan bentuk …","p":["Bela negara nonfisik","Bela negara militer","Tugas tenaga medis"],"k":0},
{"t":"Belajar bersama keluarga menunjukkan sikap …","p":["Acuh","Kerja sama","Persaingan"],"k":1},
{"t":"Mendekorasi rumah saat perayaan dilakukan dengan semangat …","p":["Egois","Kebersamaan","Individual"],"k":1},
{"t":"Gotong royong di rumah dapat menumbuhkan rasa …","p":["Permusuhan","Kasih sayang","Persaingan"],"k":1},
{"t":"Membantu mencuci kendaraan keluarga merupakan contoh …","p":["Tanggung jawab","Pelanggaran","Kemalasan"],"k":0},
{"t":"Gotong royong di rumah melatih anak menjadi …","p":["Egois","Mandiri dan peduli","Acuh"],"k":1},
{"t":"Merawat hewan peliharaan bersama menunjukkan nilai …","p":["Kepedulian","Paksaan","Persaingan"],"k":0},
{"t":"Bertamasya bersama keluarga dapat mempererat …","p":["Permusuhan","Hubungan keluarga","Persaingan"],"k":1},
{"t":"Gotong royong di rumah merupakan latihan hidup …","p":["Sendiri","Bermasyarakat","Menyendiri"],"k":1},
{"t":"Sikap gotong royong di rumah harus dilakukan dengan …","p":["Terpaksa","Ikhlas","Marah"],"k":1},
{"t":"Gotong royong di rumah mencerminkan nilai bela negara karena …","p":["Menjaga keharmonisan keluarga","Mencari keuntungan","Menunjukkan kekuatan"],"k":0},
{"t":"Kegiatan gotong royong di rumah sebaiknya dilakukan secara …","p":["Bergantian","Bersama-sama","Sendiri"],"k":1},
{"t":"Gotong royong di rumah dapat mengurangi sikap …","p":["Peduli","Egois","Kerja sama"],"k":1},
{"t":"Gotong royong di rumah mengajarkan nilai …","p":["Kebersamaan dan tanggung jawab","Persaingan dan pamrih","Paksaan dan ketakutan"],"k":0},
{"t":"Keluarga yang menerapkan gotong royong akan hidup …","p":["Tidak teratur","Harmonis","Terpisah"],"k":1},
{"t":"Sekolah disebut sebagai …","p":["Lingkungan bebas","Miniatur negara","Tempat bermain saja"],"k":1},
{"t":"Piket kelas bersama merupakan contoh gotong royong di …","p":["Rumah","Sekolah","Masyarakat"],"k":1},
{"t":"Menjenguk teman yang sakit menunjukkan sikap …","p":["Acuh","Peduli","Egois"],"k":1},
{"t":"Menghias kelas untuk lomba dilakukan dengan semangat …","p":["Individual","Kebersamaan","Persaingan"],"k":1},
{"t":"Menanam pohon di sekolah termasuk sikap …","p":["Merusak lingkungan","Peduli lingkungan","Egois"],"k":1},
{"t":"Mengumpulkan dan mengolah sampah merupakan contoh …","p":["Bela negara nonfisik","Bela negara fisik","Pelanggaran"],"k":0},
{"t":"Kerja bakti membersihkan lingkungan merupakan gotong royong di …","p":["Rumah","Sekolah","Masyarakat"],"k":2},
{"t":"Menolong tetangga yang kesulitan menunjukkan nilai …","p":["Kepedulian","Keegoisan","Persaingan"],"k":0},
{"t":"Mengikuti kegiatan 17 Agustus merupakan bentuk …","p":["Bela negara nonfisik","Bela negara fisik","Kegiatan pribadi"],"k":0},
{"t":"Siskamling bertujuan untuk menjaga …","p":["Keamanan lingkungan","Persaingan","Kepentingan pribadi"],"k":0},
{"t":"Gotong royong di masyarakat dapat mempererat …","p":["Permusuhan","Hubungan antarwarga","Persaingan"],"k":1},
{"t":"Membantu pelaksanaan pemilu menunjukkan sikap …","p":["Acuh","Bela negara","Egois"],"k":1},
{"t":"Kerja bakti membangun masjid merupakan contoh …","p":["Gotong royong","Persaingan","Individualisme"],"k":0},
{"t":"Gotong royong saat panen raya mencerminkan nilai …","p":["Kerja sama","Keegoisan","Persaingan"],"k":0},
{"t":"Menjaga lingkungan berarti menjaga …","p":["Kepentingan pribadi","NKRI","Kelompok tertentu"],"k":1},
{"t":"Gotong royong di sekolah melatih siswa menjadi …","p":["Egois","Peduli dan bertanggung jawab","Acuh"],"k":1},
{"t":"Menolong teman yang jatuh merupakan sikap …","p":["Peduli","Acuh","Egois"],"k":0},
{"t":"Gotong royong di sekolah menumbuhkan rasa …","p":["Permusuhan","Persatuan","Persaingan"],"k":1},
{"t":"Gotong royong di masyarakat dilakukan demi …","p":["Kepentingan pribadi","Kepentingan bersama","Pujian"],"k":1},
{"t":"Sikap gotong royong mencerminkan nilai bela negara karena …","p":["Menjaga persatuan bangsa","Mencari keuntungan","Menunjukkan kekuatan"],"k":0},
{"t":"Gotong royong melatih masyarakat hidup …","p":["Sendiri","Bermasyarakat","Terpisah"],"k":1},
{"t":"Menjaga keamanan lingkungan merupakan tanggung jawab …","p":["Polisi saja","Pemerintah","Semua warga"],"k":2},
{"t":"Gotong royong dapat mencegah konflik karena …","p":["Menyatukan warga","Menimbulkan persaingan","Membeda-bedakan"],"k":0},
{"t":"Gotong royong harus dilakukan dengan sikap …","p":["Ikhlas","Terpaksa","Takut"],"k":0},
{"t":"Gotong royong mengajarkan nilai …","p":["Tanggung jawab","Egoisme","Kemalasan"],"k":0},
{"t":"Membantu kegiatan keagamaan menunjukkan sikap …","p":["Kepedulian","Diskriminasi","Egois"],"k":0},
{"t":"Gotong royong memperkuat persatuan karena …","p":["Menyatukan perbedaan","Menghilangkan perbedaan","Memaksakan kehendak"],"k":0},
{"t":"Bela negara melalui gotong royong bersifat …","p":["Damai","Kekerasan","Paksaan"],"k":0},
{"t":"Gotong royong mengajarkan rela berkorban berupa …","p":["Waktu dan tenaga","Harta saja","Paksaan"],"k":0},
{"t":"Gotong royong mencerminkan manusia sebagai makhluk …","p":["Sosial","Individual","Bebas"],"k":0},
{"t":"Nilai gotong royong yang mempererat hubungan sosial adalah …","p":["Kebersamaan","Egoisme","Persaingan"],"k":0},
{"t":"Gotong royong dilakukan tanpa paksaan berarti bersifat …","p":["Sukarela","Wajib","Terpaksa"],"k":0},
{"t":"Nilai tolong-menolong menunjukkan sikap …","p":["Peduli","Acuh","Egois"],"k":0},
{"t":"Solidaritas dalam gotong royong berarti …","p":["Peduli terhadap sesama","Mementingkan diri sendiri","Persaingan"],"k":0},
{"t":"Musyawarah dalam gotong royong bertujuan untuk …","p":["Mencapai kesepakatan","Menang sendiri","Memaksakan kehendak"],"k":0},
{"t":"Tradisi Sinoman berasal dari daerah …","p":["Bali","Jawa","Papua"],"k":1},
{"t":"Tradisi Nganggung berasal dari …","p":["Jawa Tengah","Bangka Belitung","Bali"],"k":1},
{"t":"Marakka’ Bola adalah tradisi gotong royong dari …","p":["Jawa","Sulawesi Selatan","Sumatra Utara","Bali"],"k":1},
{"t":"Marsiadapari berasal dari daerah …","p":["Mandailing, Sumatra Utara","Bali","Jawa Barat"],"k":0},
{"t":"Ngayah merupakan tradisi gotong royong dari …","p":["Papua","Bali","Jawa Timur"],"k":1},
{"t":"Rambu Solo merupakan tradisi gotong royong dari …","p":["Jawa","Tana Toraja","Bali"],"k":1},
{"t":"Tradisi gotong royong menunjukkan bahwa bangsa Indonesia memiliki budaya …","p":["Individual","Kebersamaan","Persaingan"],"k":1},
{"t":"Tradisi gotong royong diwariskan secara …","p":["Paksaan","Turun-temurun","Formal"],"k":1},
{"t":"Tradisi gotong royong berfungsi menjaga …","p":["Budaya bangsa","Kepentingan pribadi","Persaingan"],"k":0},
{"t":"Gotong royong sebagai budaya bangsa harus …","p":["Dilestarikan","Ditinggalkan","Dihilangkan"],"k":0},
{"t":"Gotong royong melatih masyarakat hidup …","p":["Rukun","Bermusuhan","Terpisah"],"k":0},
{"t":"Gotong royong mencerminkan nilai …","p":["Kekeluargaan","Keegoisan","Paksaan"],"k":0},
{"t":"Rela berkorban dalam gotong royong berarti siap …","p":["Memberi waktu dan tenaga","Meminta imbalan","Menghindar"],"k":0},
{"t":"Gotong royong membantu menyadarkan manusia sebagai makhluk …","p":["Sosial","Individual","Bebas"],"k":0},
{"t":"Nilai kepedulian dalam gotong royong berarti …","p":["Peka terhadap lingkungan sekitar","Acuh","Egois"],"k":0},
{"t":"Gotong royong mengajarkan sikap bertanggung jawab terhadap …","p":["Diri sendiri","Kepentingan bersama","Keuntungan pribadi"],"k":1},
{"t":"Gotong royong menumbuhkan kesadaran akan pentingnya …","p":["Kerja sama","Persaingan","Paksaan"],"k":0},
{"t":"Gotong royong merupakan bentuk bela negara karena …","p":["Menjaga persatuan","Menimbulkan konflik","Memecah belah"],"k":0},
{"t":"Sikap gotong royong harus diterapkan dalam kehidupan …","p":["Sehari-hari","Tertentu saja","Orang dewasa saja"],"k":0},
{"t":"Gotong royong menciptakan masyarakat yang …","p":["Harmonis","Bermusuhan","Terpecah"],"k":0},
{"t":"Gotong royong merupakan wujud pengamalan nilai …","p":["Pancasila","Individualisme","Kapitalisme"],"k":0},
{"t":"Sikap gotong royong perlu dilatih agar tidak tumbuh sikap …","p":["Egois","Peduli","Tanggung jawab"],"k":0},
{"t":"Gotong royong dapat memperkuat persatuan karena …","p":["Mengutamakan kebersamaan","Menghilangkan perbedaan","Memaksakan kehendak"],"k":0},
{"t":"Bela negara melalui gotong royong dilakukan dengan cara …","p":["Damai","Kekerasan","Ancaman"],"k":0},
{"t":"Mengamalkan gotong royong berarti ikut menjaga …","p":["NKRI","Kepentingan pribadi","Persaingan"],"k":0}

];

// Fungsi acak soal agar total 100
function acakSoal(daftarSoal, total=100){
    let hasil=[];
    while(hasil.length<total){
        let s=daftarSoal[Math.floor(Math.random()*daftarSoal.length)];
        if(!hasil.includes(s)) hasil.push(s);
        if(hasil.length===daftarSoal.length) break;
    }
    while(hasil.length<total){
        hasil.push(daftarSoal[Math.floor(Math.random()*daftarSoal.length)]);
    }
    return hasil;
}

let soal=[]; // nanti berisi 100 soal acak
let totalSoal=100;
let i=0, benar=0, salah=0;
let waktuMulai, namaSiswa="";
let kotakSoal=[];

// ===== Mulai Kuis =====
document.getElementById("mulaiBtn").addEventListener("click", function(){
    const input = document.getElementById("namaSiswaInput");
    if(input.value.trim()===""){ 
        alert("Masukkan nama siswa!"); 
        return; 
    }
    namaSiswa = input.value.trim();
    document.getElementById("namaSertifikat").textContent = namaSiswa;

    const teksSambutan = `Assalamualaikum ${namaSiswa}! Mari Belajar PKn Bersama Pak Solihul.Tentang Bela Negara dan Gotong Royong. Semoga belajar dengan semangat dan menyenangkan!..Aamiin`;
    
    document.getElementById("kataSambutan").textContent = teksSambutan;
    ucapkan(teksSambutan);

    document.getElementById("halaman1").style.display="none";
    document.getElementById("halaman2").style.display="flex";

    i = 0; benar = 0; salah = 0;
    waktuMulai = new Date();
    soal = acakSoal(soalPKn, totalSoal);
    statusJawaban = new Array(totalSoal).fill(null);


    buatProgressTracker();
    tampilSoal();
});

// ===== Tampil Soal =====
function tampilSoal(){
    document.getElementById("soal").textContent = `${i+1}. ${soal[i].t}`;
    const tombol = document.querySelectorAll("#pilihan button");

    tombol.forEach((btn,index)=>{
        btn.textContent = soal[i].p[index];
        btn.disabled = false;
        btn.classList.remove("blink-green","blink-red"); 
    });

    document.getElementById("feedback").textContent="";
    document.getElementById("infoSkor").textContent =
        `Soal: ${i+1} / ${totalSoal} | Benar: ${benar} | Salah: ${salah}`;

    updateProgress();
}

// ===== Cek Jawaban =====
function cekJawaban(btn){
    const semuaBtn = document.querySelectorAll("#pilihan button");
    semuaBtn.forEach(b => b.disabled = true);

    let jawabanAnak = btn.textContent;
    let jawabanBenar = soal[i].p[soal[i].k];
    if(statusJawaban[i] !== null) return; // cegah jawab ulang


    btn.classList.remove("blink-green","blink-red");

    if(jawabanAnak === jawabanBenar){
        benar++;
        statusJawaban[i] = true;
        if(suaraBenar) suaraBenar.play();
        document.getElementById("feedback").textContent="Benar! 🎉";
        document.getElementById("feedback").style.color="#00c853";
        void btn.offsetWidth;
        btn.classList.add("blink-green");
        updateProgressJawaban(i,true);
    }else{
        salah++;
        statusJawaban[i] = false;
        if(suaraSalah) suaraSalah.play();
        if(navigator.vibrate) navigator.vibrate(200);
        document.getElementById("feedback").textContent =
            `Salah 😢 Jawaban benar: ${jawabanBenar}`;
        document.getElementById("feedback").style.color = "#ffab00";
        void btn.offsetWidth;
        btn.classList.add("blink-red");

        document.querySelectorAll("#pilihan button").forEach(b=>{
            if(b.textContent === jawabanBenar){
                b.classList.add("blink-green");
            }
        });

        updateProgressJawaban(i,false);
    }

    document.getElementById("infoSkor").textContent =
        `Soal: ${i+1} / ${totalSoal} | Benar: ${benar} | Salah: ${salah}`;

    let next = statusJawaban.findIndex((v, idx) => v === null && idx > i);

    if(next !== -1){
        i = next;
        setTimeout(tampilSoal,1200);
    }else{
        setTimeout(selesaiUjian,1200);
    }
} // ← INI WAJIB (penutup cekJawaban)



// ===== Selesai Ujian =====
function selesaiUjian(){
    document.getElementById("halaman2").style.display="none";
    document.getElementById("halaman3").style.display="flex";

    let waktuSelesai = new Date();
    let durasiDetik = Math.floor((waktuSelesai - waktuMulai)/1000);
    let menit = Math.floor(durasiDetik/60);
    let detik = durasiDetik%60;
    let durasiText = `${menit} menit ${detik} detik`;

    let predikat;
    if(benar>=90) predikat="A (Sangat Baik)";
    else if(benar>=75) predikat="B (Baik)";
    else if(benar>=60) predikat="C (Cukup)";
    else predikat="D (Perlu Latihan)";

    document.getElementById("sertifBenar").textContent = benar;
    document.getElementById("sertifSalah").textContent = salah;
    document.getElementById("sertifSkor").textContent = `${benar} / ${totalSoal}`;
    document.getElementById("sertifPredikat").textContent = predikat;
    document.getElementById("durasiSertifikat").textContent = durasiText;
    document.getElementById("tanggalSertifikat").textContent = "Tanggal: " + waktuSelesai.toLocaleDateString('id-ID')+' '+waktuSelesai.toLocaleTimeString('id-ID');

    document.getElementById("sambutanSertifikat").textContent =
    `Selamat ya, ${namaSiswa}! 
    Kamu telah berhasil menyelesaikan pembelajaran dan mendapatkan Sertifikat Belajar. 
    Teruslah semangat belajar, patuh kepada guru dan orang tua, serta menjadi anak yang berakhlak baik dan berprestasi.Aamiin`;
    const teksSertifikat =
    `Selamat ya, ${namaSiswa}!
    Kamu telah berhasil menyelesaikan pembelajaran dan mendapatkan Sertifikat Belajar.
    Teruslah semangat belajar, patuh kepada guru dan orang tua, serta menjadi anak yang berakhlak baik dan berprestasi.`;

    document.getElementById("sambutanSertifikat").textContent = teksSertifikat;
    ucapkan(teksSertifikat);


}

// ===== Cetak Sertifikat =====
document.getElementById("cetakBtn").addEventListener("click",function(){
    this.style.display="none";
    window.print();
    this.style.display="inline-block";
});

// ===== Progress Tracker =====
function buatProgressTracker(){
    const progressDiv = document.getElementById("progress");
    progressDiv.innerHTML = "";
    kotakSoal = [];
    for(let idx=0; idx<soal.length; idx++){
        let box = document.createElement("div");
        box.className = "kotak-soal";
        box.textContent = idx + 1;
        box.addEventListener("click", ()=>gotoSoal(idx));
        progressDiv.appendChild(box);
        kotakSoal.push(box);
    }
}

function gotoSoal(idx){
    i = idx;
    tampilSoal();
}

function updateProgress(){
    kotakSoal.forEach((b,j)=>{
        b.classList.remove("saatIni");
        if(j===i) b.classList.add("saatIni");
    });
}

function updateProgressJawaban(idx, isBenar){
    const box = kotakSoal[idx];
    if(isBenar) box.classList.add("benar");
    else box.classList.add("salah");
}

// ===== Navigasi Next / Prev =====
document.getElementById("prevBtn").addEventListener("click", ()=>{
    if(i>0){ i--; tampilSoal(); }
});
document.getElementById("nextBtn").addEventListener("click", ()=>{
    if(i<soal.length-1){ i++; tampilSoal(); }
});
