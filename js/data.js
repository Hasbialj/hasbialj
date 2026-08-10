/**
 * data.js — Pusat konten website
 * ================================
 * Edit file ini untuk memperbarui semua konten di seluruh website.
 * Cari komentar "// EDIT:" untuk menemukan bagian yang perlu diisi.
 */

const SITE_DATA = {

  // ============================================================
  // PROFIL UTAMA
  // ============================================================
  // ============================================================
  // PROFIL UTAMA
  // ============================================================
  profile: {
    name: "Hasbial Jamil Mardia Putra",  // Nama lengkap
    initials: "HJM",                    // Inisial untuk logo
    photo: "Hasbial Jamil Mardia Putra_41155050220081.jpg",  // Foto profil
    tagline: "Mengejar karir profesional dalam IT Support & Operasional — berfokus pada efisiensi dan pengembangan SDM.",
    bio_short: "Software developer & IT Support berdedikasi tinggi dengan pengalaman manajemen operasional gudang dan pendidikan Teknik Informatika.",
    location: "Kab. Bandung, Jawa Barat, Indonesia",
    profession: "Software Developer & IT Support",
    phone: "089628188728",
    address: "Kp. Babakan Sondari No. 34 RT 01 RW 07, Pangauban, Kec. Katapang, Kab. Bandung 40921",

    // Bio panjang halaman "Tentang Saya"
    bio_long: [
      "Saya Hasbial Jamil Mardia Putra — seorang pengembang perangkat lunak dan spesialis IT Support dari Katapang, Kabupaten Bandung.",
      "Perjalanan karir saya dibentuk oleh kombinasi pengalaman praktis di industri operasional & logistik (seperti di PT. Nokha Warehouse dan PT. Sarana Pancakarya Nusa) serta pemahaman akademis di bidang Teknik Informatika.",
      "Pengalaman di lapangan melatih saya untuk menjadi pribadi yang teliti, cekatan, dan memiliki keterampilan komunikasi yang ramah serta solutif dalam menangani kebutuhan klien maupun tim.",
      "Saat ini saya menempuh pendidikan S1 Teknik Informatika di Universitas Langlangbuana (2022–2026) dengan komitmen untuk terus berkembang dan memberikan kontribusi nyata bagi organisasi."
    ],

    // Nilai/prinsip utama
    values: [
      { icon: "✦", label: "Teliti & Cekatan", desc: "Memastikan setiap proses pencatatan, pengemasan, dan troubleshoot dilakukan dengan akurat." },
      { icon: "◈", label: "Komunikatif & Ramah", desc: "Membangun hubungan kerja yang efektif dan pelayanan yang ramah kepada klien." },
      { icon: "◎", label: "Continuous Growth", desc: "Komitmen tinggi untuk terus belajar teknologi baru dan mengembangkan potensi SDM." }
    ],

    // Minat/hobi
    interests: ["Kegiatan Sosial", "Internet & Teknologi", "IT Infrastructure", "Open Source", "Pengembangan SDM"],

    // Kontak & sosial media
    email: "bhie.dia@gmail.com",
    socials: [
      { name: "GitHub",    url: "https://github.com/Hasbialj", icon: "github" },
      { name: "LinkedIn",  url: "https://www.linkedin.com/in/hasbial-jamil-mardia-putra-1877b7425/", icon: "linkedin" },
      { name: "Instagram", url: "https://www.instagram.com/m30w1999/", icon: "instagram" }
    ]
  },

  // ============================================================
  // SKILL
  // ============================================================
  skills: [
    { name: "IT Support & Troubleshooting",    level: 92, category: "technical" },
    { name: "Web Development (HTML/CSS/JS)",    level: 90, category: "technical" },
    { name: "Warehouse & Inventory Management",level: 78, category: "technical" },
    { name: "Packing & Quality Control",       level: 75, category: "technical" },
    { name: "Ketelitian & Detail-Oriented",     level: 95, category: "soft"      },
    { name: "Komunikasi & Pelayanan Client",    level: 90, category: "soft"      },
    { name: "Cekatan & Adaptabilitas",          level: 92, category: "soft"      },
    { name: "Kerja Sama Tim",                  level: 88, category: "soft"      },
  ],

  // ============================================================
  // TIMELINE (PENDIDIKAN & KARIR)
  // ============================================================
  timeline: [
    {
      year: "Juni 2020 — Juli 2020",
      type: "work",
      title: "Staff Packing & Operasional",
      org: "PT. Sarana Pancakarya Nusa",
      location: "Bandung, ID",
      desc: "Bertanggung jawab melakukan penataan dan pengemasan barang (packing) secara tepat dan presisi guna mencegah kesalahan saat pengangkatan ke armada angkut sebelum pengiriman.",
      tags: ["Packing", "Quality Control", "Operasional"]
    },
    {
      year: "Februari 2018 — Juli 2018",
      type: "work",
      title: "Staff Warehouse",
      org: "PT. Nokha Warehouse",
      location: "Bandung, ID",
      desc: "Membantu pengecekan persediaan gudang (stock checking), menyusun laporan pengiriman dan penyimpanan barang masuk/keluar, serta memastikan barang sampai dengan tepat ke tangan klien.",
      tags: ["Stock Management", "Laporan Logistik", "Warehouse"]
    },
    {
      year: "2016",
      type: "milestone",
      title: "Sertifikat Pembekalan Wawasan Kebangsaan & Bela Negara",
      org: "Kodam III / Siliwangi",
      location: "Bandung, ID",
      desc: "Mendapat sertifikat pembekalan wawasan kebangsaan dan bela negara di lingkungan Pondok Pesantren Kodam III/Siliwangi TA 2016.",
      tags: ["Bela Negara", "Wawasan Kebangsaan", "Kodam III/Siliwangi"]
    },
    {
      year: "2022 — 2026",
      type: "education",
      title: "S1 Teknik Informatika",
      org: "Universitas Langlangbuana",
      location: "Bandung, ID",
      desc: "Berfokus pada pengembangan perangkat lunak, sistem informasi, infrastruktur IT, dan jaringan.",
      tags: ["Teknik Informatika", "Web Development", "IT Infrastructure"]
    },
    {
      year: "2015 — 2018",
      type: "education",
      title: "Pendidikan Menengah Atas",
      org: "SMA Darul Falah",
      location: "Bandung, ID",
      desc: "Lulus tahun 2018. Aktif dalam kegiatan organisasi sekolah serta wawasan kebangsaan.",
      tags: ["SMA", "Darul Falah"]
    },
  ],

  // ============================================================
  // PROJECTS / PORTFOLIO
  // ============================================================
  projects: [
    {
      id: "beligadget",
      title: "BeliGadget - E-Commerce Platform",
      description: "Platform e-commerce untuk gadget dengan integrasi payment gateway Midtrans. Fitur lengkap termasuk shopping cart, manajemen produk, dan sistem pembayaran online.",
      tech: ["PHP", "CodeIgniter", "MySQL", "Midtrans API"],
      category: "E-Commerce",
      year: "2024",
      image: "",
      url: "",
      github: ""
    },
    {
      id: "sistem-rekomendasi-bahan-masakan",
      title: "Sistem Rekomendasi Bahan Masakan",
      description: "Sistem rekomendasi bahan masakan berbasis web sebagai project skripsi. Membantu pengguna menemukan kombinasi bahan masakan yang sesuai dengan preferensi dan ketersediaan bahan.",
      tech: ["PHP", "CodeIgniter", "MySQL", "Algorithm"],
      category: "Web App",
      year: "2026",
      image: "",
      url: "",
      github: ""
    },
    {
      id: "bimbel-adhiwikarta",
      title: "Sistem Manajemen Bimbel Adhiwikarta",
      description: "Aplikasi manajemen untuk bimbel Adhiwikarta dengan fitur manajemen siswa, jadwal, pembayaran, dan laporan. Mempermudah operasional bimbel sehari-hari.",
      tech: ["PHP", "CodeIgniter", "MySQL"],
      category: "Management System",
      year: "2025",
      image: "",
      url: "",
      github: ""
    },
    {
      id: "perpustakaan",
      title: "Sistem Perpustakaan Digital",
      description: "Sistem manajemen perpustakaan dengan fitur katalog buku, peminjaman, pengembalian, dan laporan. Membantu perpustakaan mengelola koleksi dan transaksi peminjaman.",
      tech: ["PHP", "CodeIgniter", "MySQL"],
      category: "Management System",
      year: "2026",
      image: "",
      url: "",
      github: ""
    },
    {
      id: "catshop081",
      title: "CatShop081 - Online Pet Shop",
      description: "Platform online shop untuk produk kebutuhan hewan peliharaan dengan sistem katalog dan manajemen produk.",
      tech: ["PHP", "CodeIgniter", "MySQL"],
      category: "E-Commerce",
      year: "2024",
      image: "",
      url: "",
      github: ""
    },
    {
      id: "personal-portfolio",
      title: "Personal Portfolio Website",
      description: "Website portfolio profesional dengan dark/light mode, animasi smooth, dan konten dinamis. Dibangun untuk showcase keahlian dan pengalaman karir.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      category: "Website",
      year: "2026",
      image: "",
      url: "",
      github: ""
    }
  ],

  // ============================================================
  // SERTIFIKAT & PELATIHAN
  // ============================================================
  // Untuk menambah: salin satu objek {}, isi data, simpan.
  // category: "teknologi" | "kepemimpinan" | "pelatihan" | "penghargaan"
  certificates: [
    {
      title: "Online Short Course: Meningkatkan Kecerdasan Copilot dengan RAG & Fine-Tuning di Azure",
      issuer: "Microsoft Elevate Training Center (METC)",
      year: "7 Mei 2026",
      category: "teknologi",
      icon: "🤖",
      url: "sertifikat/1.pdf"
    },
    {
      title: "Online Short Course: Menerapkan Model AI Terpadu di Microsoft Fabric",
      issuer: "Microsoft Elevate Training Center (METC)",
      year: "21 Mei 2026",
      category: "teknologi",
      icon: "🤖",
      url: "sertifikat/2.pdf"
    },
    {
      title: "Tech Skill Series: AI for Everyone — Build Smart Solutions",
      issuer: "Microsoft Elevate Training Center (METC)",
      year: "2 Juni 2026",
      category: "teknologi",
      icon: "💡",
      url: "sertifikat/3.pdf"
    },
    {
      title: "Soft Skill Series: Problem Solving & Mindset on Point",
      issuer: "Microsoft Elevate Training Center (METC)",
      year: "Mei – Juni 2026",
      category: "kepemimpinan",
      icon: "🧠",
      url: "sertifikat/4.pdf"
    },
    {
      title: "Virtual Roadshow METC x Startup Bandung: End-to-End Data Science for AI",
      issuer: "Microsoft Elevate Training Center (METC)",
      year: "29 Mei 2026",
      category: "teknologi",
      icon: "📊",
      url: "sertifikat/5.pdf"
    },
    {
      title: "DevCoach 155: Data Science & Machine Learning Algorithms",
      issuer: "Dicoding Indonesia",
      year: "14 Juni 2024",
      category: "teknologi",
      icon: "🎓",
      url: "sertifikat/6.pdf"
    },
    {
      title: "DevCoach 236: Rekrut, Ospek, Lepas — Ubah LLM Open-Source Menjadi Asisten Rekrutmen",
      issuer: "Dicoding Indonesia",
      year: "5 Juni 2026",
      category: "teknologi",
      icon: "🎓",
      url: "sertifikat/7.pdf"
    },
    {
      title: "IDCamp Alumni Dialogue: Personal Branding & Professional Presence",
      issuer: "Indosat Ooredoo Hutchison Digital Camp (IDCamp)",
      year: "20 Mei 2026",
      category: "kepemimpinan",
      icon: "🏅",
      url: "sertifikat/8.pdf"
    },
    {
      title: "Webinar Nasional: Transformasi Penulisan Jurnal & Buku Ilmiah via AI",
      issuer: "CV. Nulis Hemat Indonesia",
      year: "4 Juli 2025",
      category: "pelatihan",
      icon: "✍️",
      url: "sertifikat/9.pdf"
    },
    {
      title: "Sarasehan Lead and Develop: Membangun Jiwa Kepemimpinan Beretika",
      issuer: "HMTI Universitas Langlangbuana",
      year: "2022/2023",
      category: "kepemimpinan",
      icon: "🌟",
      url: "sertifikat/10.pdf"
    },
    {
      title: "Study Club Dasar Pemrograman",
      issuer: "HMTI Universitas Langlangbuana",
      year: "Februari 2020",
      category: "teknologi",
      icon: "💻",
      url: "sertifikat/11.pdf"
    },
    {
      title: "Sertifikat Pembekalan Wawasan Kebangsaan & Bela Negara",
      issuer: "Kodam III / Siliwangi",
      year: "26–28 Oktober 2016",
      category: "penghargaan",
      icon: "🎖️",
      url: "sertifikat/12.pdf"
    },
    {
      title: "Sertifikat Penghargaan – Table Manner",
      issuer: "Penyelenggara Workshop",
      year: "2023",
      category: "pelatihan",
      icon: "🍽️",
      url: "sertifikat/13.pdf"
    },
    {
      title: "METC Soft Skill Series #1 – Problem Solving: Boost Your Career Impact",
      issuer: "Microsoft Elevate Training Center (METC)",
      year: "19 Mei 2026",
      category: "kepemimpinan",
      icon: "🧠",
      url: "sertifikat/14.pdf"
    },
    {
      title: "METC Soft Skill Series #3 – Mindset on Point: Cara Berpikir yang Dicari di Dunia Kerja",
      issuer: "Microsoft Elevate Training Center (METC)",
      year: "5 Juni 2026",
      category: "kepemimpinan",
      icon: "💡",
      url: "sertifikat/15.pdf"
    },
    {
      title: "Seminar Transformasi Digital – Diesnatalis Informatika-29",
      issuer: "HMJ Teknik Informatika, Universitas Langlangbuana",
      year: "27 Februari 2024",
      category: "pelatihan",
      icon: "🎓",
      url: "sertifikat/16.pdf"
    },
    {
      title: "Juara 1 Purwa Paskibra – Lomba Keterampilan Baris-Berbaris Tingkat Jawa Barat",
      issuer: "Universitas Nurtanio Bandung",
      year: "23 April 2016",
      category: "penghargaan",
      icon: "🏆",
      url: "sertifikat/17.pdf"
    },
    {
      title: "Juara III Cabor Sepak Takraw – Pekan Olahraga Pelajar Tingkat Kabupaten Bandung",
      issuer: "Dinas Pemuda Olahraga dan Pariwisata Kab. Bandung",
      year: "3–6 Mei 2011",
      category: "penghargaan",
      icon: "🥉",
      url: "sertifikat/18.pdf"
    },
    {
      title: "Peserta Bandung Barat Digital Festival 2017",
      issuer: "Relawan TIK & Diskominfo Kab. Bandung Barat",
      year: "2017",
      category: "pelatihan",
      icon: "💻",
      url: "sertifikat/19.pdf"
    },
    {
      title: "Panitia Class Meeting Semester Genap 2016",
      issuer: "OSIS SMA Darul Falah Cihampelas",
      year: "30 Mei – 4 Juni 2016",
      category: "kepemimpinan",
      icon: "🤝",
      url: "sertifikat/20.pdf"
    },
    {
      title: "Panitia Peringatan Isra Mi'raj Nabi Muhammad SAW 1437 H",
      issuer: "OSIS SMA Darul Falah Cihampelas",
      year: "2–5 Mei 2016",
      category: "kepemimpinan",
      icon: "🤝",
      url: "sertifikat/20.pdf"
    },
  ],

  // ============================================================
  // ARTIKEL BLOG
  // ============================================================
  posts: [
    {
      id: "belajar-dari-kegagalan-proyek-pertama",
      title: "Apa yang Diajarkan Proyek Gagal Pertama Saya",
      date: "2026-07-15",
      date_display: "15 Juli 2026",
      category: "Refleksi",
      read_time: "6 menit",
      excerpt: "Proyek pertama saya bukan hanya gagal — ia meledak secara spektakuler. Tapi justru dari puing-puingnya, saya belajar sesuatu yang tidak bisa diajarkan di kelas manapun.",
      cover_color: "#e94560",
      content: `
<p>Ini adalah cerita yang jarang saya ceritakan. Bukan karena memalukan — tapi karena tiap kali saya mengingatnya, ada rasa campur aduk yang sulit dijelaskan dengan kata-kata biasa.</p>

<p>Tahun kedua kuliah, saya dan dua teman membangun aplikasi marketplace untuk produk lokal. Kami bersemangat, bekerja keras, dan yakin ide ini akan mengubah dunia. Tiga bulan kemudian, kami membubarkan tim.</p>

<h2>Mengapa gagal?</h2>

<p>Jawabannya klise: kami tidak memvalidasi ide. Kami terlalu fokus membangun fitur yang kami pikir keren, bukan fitur yang dibutuhkan pengguna. Kami membangun solusi sebelum benar-benar memahami masalah.</p>

<blockquote>"Jatuh bukan masalah. Masalahnya adalah jatuh di tempat yang sama dua kali."</blockquote>

<p>Tapi pelajaran yang lebih dalam bukan soal validasi atau product-market fit. Pelajaran yang paling berharga adalah tentang <strong>cara bertanya</strong>.</p>

<h2>Seni Bertanya yang Jujur</h2>

<p>Selama tiga bulan itu, kami menanyakan hal yang salah kepada pengguna. Kami bertanya: <em>"Apakah Anda suka fitur ini?"</em> — dan tentu saja mereka menjawab ya, karena tidak ada yang mau menyakiti perasaan orang yang bekerja keras.</p>

<p>Pertanyaan yang seharusnya kami tanyakan: <em>"Ceritakan bagaimana Anda biasanya melakukan ini sekarang."</em> Pertanyaan terbuka, bukan pertanyaan yang butuh validasi.</p>

<h2>Setelah Kegagalan</h2>

<p>Setelah proyek itu bubar, saya menghabiskan dua minggu tidak melakukan apa-apa. Lalu, perlahan, saya mulai menulis — bukan kode, tapi catatan. Tentang apa yang salah, apa yang saya pelajari, apa yang akan saya lakukan berbeda.</p>

<p>Menulis itu, ternyata, adalah awal dari segalanya.</p>

<p>Proyek gagal mengajarkan saya bahwa kegagalan bukan lawan dari keberhasilan — ia adalah bagiannya. Dan satu-satunya cara untuk tidak belajar dari kegagalan adalah berhenti merefleksikannya.</p>
      `
    },
    {
      id: "mengapa-saya-menulis",
      title: "Mengapa Saya Menulis (Meski Tidak Ada yang Membaca)",
      date: "2026-06-28",
      date_display: "28 Juni 2026",
      category: "Proses",
      read_time: "4 menit",
      excerpt: "Menulis bukan soal pembaca. Setidaknya, bukan di awalnya. Menulis adalah cara saya berpikir — dan ini yang saya temukan setelah 200+ tulisan.",
      cover_color: "#f5a623",
      content: `
<p>Pertanyaan yang paling sering saya terima setelah orang tahu saya rutin menulis: <em>"Tulisanmu banyak yang baca?"</em></p>

<p>Jawaban jujur saya: tidak selalu. Dan itu tidak pernah benar-benar menjadi alasan utama saya menulis.</p>

<h2>Menulis Sebagai Berpikir</h2>

<p>Ada kutipan yang selalu saya ingat — saya lupa sumbernya, tapi bunyinya seperti ini: <em>"Saya tidak tahu apa yang saya pikirkan sampai saya menuliskannya."</em></p>

<p>Itu persis yang terjadi pada saya. Sebelum menulis, ide-ide di kepala saya terasa lengkap dan logis. Tapi saat mulai dituliskan, celah-celahnya muncul. Asumsi yang tidak dipertanyakan. Logika yang lompat terlalu jauh.</p>

<p>Menulis memaksa saya untuk jujur dengan pemikiran saya sendiri.</p>

<h2>Manfaat yang Tidak Terduga</h2>

<p>Setelah rutin menulis selama dua tahun, ada beberapa hal yang tidak saya ekspektasi:</p>

<ul>
  <li><strong>Kemampuan komunikasi membaik drastis.</strong> Presentasi, email, diskusi — semua terasa lebih mudah karena saya sudah terbiasa mengorganisir pikiran.</li>
  <li><strong>Portofolio yang terus berkembang sendiri.</strong> Setiap tulisan adalah bukti cara saya berpikir — lebih powerful dari CV mana pun.</li>
  <li><strong>Komunitas yang datang sendiri.</strong> Orang-orang yang membaca dan merespons tulisan saya biasanya adalah orang-orang yang satu frekuensi.</li>
</ul>

<h2>Mulai Menulis Hari Ini</h2>

<p>Jika ada satu hal yang ingin saya sampaikan: mulailah menulis, meski tidak ada yang membaca. Tulis untuk diri sendiri. Tulis untuk menjernihkan pikiran. Tulis untuk merekam perjalanan.</p>

<p>Pembaca akan datang, atau tidak. Tapi kemampuan berpikir yang lebih jernih — itu akan selalu ada.</p>
      `
    },
    {
      id: "desain-yang-tidak-terasa-desain",
      title: "Desain Terbaik adalah yang Tidak Terasa Seperti Desain",
      date: "2026-05-10",
      date_display: "10 Mei 2026",
      category: "Design",
      read_time: "5 menit",
      excerpt: "Ketika pengguna tidak memperhatikan interface, itu bukan kegagalan — itu pencapaian tertinggi seorang desainer.",
      cover_color: "#0f3460",
      content: `
<p>Ada paradoks menarik di dunia desain: semakin baik sebuah desain, semakin tidak terlihat keberadaannya.</p>

<p>Pernahkah Anda menggunakan aplikasi yang terasa begitu natural sehingga Anda tidak pernah berpikir tentang cara menggunakannya? Itulah puncak dari desain yang baik.</p>

<h2>Desain yang Meneriakkan Dirinya Sendiri</h2>

<p>Sebagai designer pemula, saya dulu berpikir desain yang bagus adalah desain yang membuat orang berkata, "Wow, desainnya keren!" Saya menghabiskan waktu berjam-jam pada animasi mewah, gradien yang kompleks, tipografi yang eksperimental.</p>

<p>Lalu saya mulai mengamati pengguna yang menggunakan apa yang saya buat — dan menyadari mereka bingung. Mereka tidak merasakan "wow", mereka merasakan "hm, tombol ini ada di mana?"</p>

<h2>Prinsip yang Mengubah Cara Saya Bekerja</h2>

<p>Don Norman dalam bukunya <em>The Design of Everyday Things</em> menulis tentang konsep "affordance" — properti suatu objek yang menunjukkan cara penggunaannya. Pintu yang baik tidak perlu label "TARIK" atau "DORONG".</p>

<p>Sejak itu, saya selalu bertanya: <em>apakah pengguna perlu membaca untuk memahami ini?</em> Jika ya, berarti ada yang bisa diperbaiki.</p>

<h2>Invisible Design dalam Praktik</h2>

<p>Beberapa prinsip yang selalu saya pegang:</p>

<ul>
  <li>Konsistensi lebih penting dari kreativitas (dalam UI)</li>
  <li>Setiap elemen harus punya alasan untuk ada</li>
  <li>Test dengan pengguna nyata, bukan dengan sesama designer</li>
</ul>

<p>Desain terbaik bukan yang mendapat pujian — tapi yang membuat pekerjaan pengguna menjadi lebih mudah, lebih cepat, dan lebih menyenangkan. Bahkan jika mereka tidak pernah menyadari keberadaannya.</p>
      `
    },
  ],

  // ============================================================
  // TESTIMONI / REKOMENDASI
  // ============================================================
  testimonials: [
    {
      name: "Rekan Tim Proyek",
      role: "Sesama Mahasiswa — Universitas Langlangbuana",
      avatar: "R",
      rating: 5,
      text: "Hasbial adalah anggota tim yang sangat bisa diandalkan. Dalam pengerjaan proyek skripsi, beliau selalu proaktif mencari solusi teknis dan memastikan deadline terpenuhi. Kemampuan problem-solving-nya sangat baik.",
      color: "#e94560"
    },
    {
      name: "Supervisor Lapangan",
      role: "Kepala Operasional — PT. Nokha Warehouse",
      avatar: "S",
      rating: 5,
      text: "Selama bekerja di PT. Nokha, Hasbial menunjukkan dedikasi tinggi dalam pengelolaan gudang dan sistem inventory. Teliti, cekatan, dan selalu siap membantu rekan kerja. Sangat direkomendasikan untuk posisi IT Support maupun operasional.",
      color: "#7c3aed"
    },
    {
      name: "Koordinator Kegiatan",
      role: "Pembimbing Akademik — UNLA",
      avatar: "K",
      rating: 5,
      text: "Hasbial memiliki kemampuan komunikasi yang baik dan mudah beradaptasi dengan lingkungan baru. Aktif dalam kegiatan organisasi dan selalu menunjukkan sikap profesional. Mahasiswa yang memiliki potensi besar di bidang IT.",
      color: "#0ea5e9"
    }
  ]
};
