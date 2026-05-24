const navbar = document.getElementById('navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const slides = document.querySelectorAll('.slide');
const navContainer = document.getElementById('verticalNav');

let currentSlide = 0;
const slideInterval = 5000;
let timer;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

function createNavItems() {
    if (!navContainer) return;
    navContainer.innerHTML = '';

    slides.forEach((_, index) => {
        const navItem = document.createElement('div');
        navItem.classList.add('nav-item');
        if (index === 0) navItem.classList.add('active');

        const displayNum = (index + 1).toString().padStart(2, '0');

        navItem.innerHTML = `
            <span class="nav-number">${displayNum}</span>
            <span class="nav-line"></span>
        `;

        navItem.addEventListener('click', () => {
            clearInterval(timer);
            updateSlider(index);
            timer = setInterval(autoNextSlide, slideInterval);
        });

        navContainer.appendChild(navItem);
    });
}

function updateSlider(index) {
    const allNavItems = document.querySelectorAll('.nav-item');

    slides.forEach(s => s.classList.remove('active'));
    allNavItems.forEach(n => n.classList.remove('active'));

    slides[index].classList.add('active');
    if (allNavItems[index]) allNavItems[index].classList.add('active');

    currentSlide = index;
}

function autoNextSlide() {
    let next = (currentSlide + 1) % slides.length;
    updateSlider(next);
}

if (slides.length > 0) {
    createNavItems();
    timer = setInterval(autoNextSlide, slideInterval);
}

const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            el.classList.add('active');
        }
    });
}

const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage'); // Selektor baru untuk gambar
const closeModalBtn = document.querySelector('.close-modal');

// Rubah Konten Modal berdasarkan judul layanan yang diklik

const serviceDetails = {
    "Jasa Pekerjaan Sipil": `CV. Asa Presisi Nusantara menyediakan layanan konstruksi sipil menyeluruh dengan standar ketahanan tinggi yang disesuaikan untuk kebutuhan sektor industri maupun komersial.\n\nRuang lingkup kerja kami meliputi:\n• Konstruksi & perbaikan struktur atap gedung/gudang.\n• Pengecatan dinding eksterior dan interior skala besar.\n• Pengaplikasian Epoxy Lantai berstandar industri (anti slip, tahan kimia, dan beban berat).\n• Pekerjaan renovasi ruangan kantor, workshop, serta penataan drainase area pabrik.`,

    "Jasa Pabrikasi": `Kami menghadirkan tim engineering ahli untuk pengerjaan fabrikasi logam dan baja custom guna mendukung efisiensi alur operasional di lini produksi Anda.\n\nLayanan fabrikasi kami mencakup:\n• Pembuatan struktur baja ringan maupun berat untuk overhead crane atau mezzanine.\n• Perakitan material handling equipment seperti Trolley Custom, Pallet Besi, dan Rak Gudang.\n• Instalasi dan pengelasan sistem perpipaan (piping system) cairan/gas industri.\n• Pengerjaan presisi sheet metal cutting, bending, dan stamping sesuai blueprint teknis.`,

    "Jasa Air Conditioner": `Layanan tata udara terintegrasi untuk menjaga temperatur ruang kerja, mesin, dan lingkungan produksi tetap optimal demi kenyamanan dan performa maksimal.\n\nPenanganan AC kami meliputi:\n• Perancangan & Instalasi baru unit AC Split, AC Cassette, hingga sistem AC Central (VRV/VRF).\n• Perawatan cuci rutin berkala untuk mencegah kerusakan dini dan menjaga efisiensi energi.\n• Deteksi dini kebocoran freon, perbaikan kompresor, penggantian sparepart original.\n• Jasa relokasi pembongkaran dan pemasangan kembali unit AC antar ruangan/gedung.`,

    "General Supplier": `Sebagai mitra suplai All-Item Support strategis, kami memangkas rantai pasokan logistik Anda dengan menyediakan segala material operasional industri secara cepat, tepat spesifikasi, dan harga kompetitif.\n\nKategori suplai reguler kami meliputi:\n• Kebutuhan MRO (Maintenance, Repair, and Operations) & komponen permesinan.\n• Alat Pelindung Diri (APD Safety) lengkap seperti Helm, Rompi, Sepatu Safety, dan Masker Khusus.\n• Consumables industri, kelistrikan (electrical), fitting pipa, lampu hemat energi, serta perangkat IT hardware pendukung kantor.`
};

document.querySelectorAll('.service-img-card').forEach(card => {
    const btn = card.querySelector('.btn-selengkapnya');
    const title = card.querySelector('h3').innerText;

    // Mengambil properti background-image dari class .card-bg-img
    const bgImgElement = card.querySelector('.card-bg-img');

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            modalTitle.innerText = title;
            modalDescription.innerHTML = serviceDetails[title] || "Detail informasi layanan belum tersedia.";

            // Ekstrak URL gambar asli dari inline style background-image
            if (bgImgElement) {
                const bgImageUrl = window.getComputedStyle(bgImgElement).backgroundImage;
                // Bersihkan string url("...") menjadi harafiah path-nya saja
                const cleanUrl = bgImageUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

                // Masukkan gambar ke dalam wadah di bawah judul modal
                modalImage.innerHTML = `<img src="${cleanUrl}" alt="${title}">`;
            }

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    }
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';

    setTimeout(() => {
        modal.style.display = 'none';
        modalImage.innerHTML = '';
    }, 400);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

const catalogGrid = document.querySelector('.product-catalog-grid');
const catalogCards = document.querySelectorAll('#catalog .product-item-card');
const prevCatalogBtn = document.querySelector('.prev-btn');
const nextCatalogBtn = document.querySelector('.next-btn');

let catalogIndex = 0;

function getCardsPerView() {
    // Menghitung berapa jumlah kartu yang tampil di layar saat ini berdasarkan media query CSS
    if (window.innerWidth <= 576) return 1;  // Mobile
    if (window.innerWidth <= 992) return 2;  // Tablet
    return 3;                                // Desktop
}

function updateCatalogSlider() {
    if (!catalogGrid || catalogCards.length === 0) return;

    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, catalogCards.length - cardsPerView);

    // Validasi batas index agar tidak meluncur ke area kosong
    if (catalogIndex > maxIndex) catalogIndex = maxIndex;
    if (catalogIndex < 0) catalogIndex = 0;

    // Ambil ukuran lebar kartu pertama ditambah celah gap-nya
    const cardStyle = window.getComputedStyle(catalogCards[0]);
    const cardWidth = catalogCards[0].getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(catalogGrid).gap) || 0;

    // Geser container lintasan berdasarkan index saat ini
    const scrollAmount = catalogIndex * (cardWidth + gap);
    catalogGrid.style.transform = `translateX(-${scrollAmount}px)`;

    // Mengatur transparansi tombol kontrol (opsional: matikan jika sudah mentok)
    prevCatalogBtn.style.opacity = catalogIndex === 0 ? '0.5' : '1';
    nextCatalogBtn.style.opacity = catalogIndex === maxIndex ? '0.5' : '1';
}

if (nextCatalogBtn && prevCatalogBtn) {
    nextCatalogBtn.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        if (catalogIndex < catalogCards.length - cardsPerView) {
            catalogIndex++;
            updateCatalogSlider();
        }
    });

    prevCatalogBtn.addEventListener('click', () => {
        if (catalogIndex > 0) {
            catalogIndex--;
            updateCatalogSlider();
        }
    });

    // Jalankan kalkulasi awal saat halaman dimuat
    window.addEventListener('load', updateCatalogSlider);
    // Jalankan ulang kalkulasi jika pengguna mengubah orientasi atau ukuran resolusi browser
    window.addEventListener('resize', updateCatalogSlider);
}

window.addEventListener('scroll', checkReveal);
checkReveal();