document.addEventListener('DOMContentLoaded', async () => {
  async function fetchNews() {
    try {
      let response = await fetch('/api/news/internasional');
      if (!response.ok) {
        throw new Error('Endpoint /api/news/internasional tidak tersedia');
      }
      let data = await response.json();

      displayNews(data.posts);
    } catch (error) {
      console.warn('Gagal mengambil data dari endpoint pertama:', error);
      try {
        const alternativeResponse = await fetch('https://api-berita-indonesia.vercel.app/cnn/internasional/');
        if (!alternativeResponse.ok) {
          throw new Error('Endpoint alternatif juga tidak tersedia');
        }
        const alternativeData = await alternativeResponse.json();

        displayNews(alternativeData.data.posts);
      } catch (alternativeError) {
        console.error('Error fetching news from alternative API:', alternativeError);
      }
    }
  }

  function displayNews(news) {
    const newsCards = document.getElementById('content-tiga');

    news.slice(0, 1).forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const path = new URL(item.link).pathname;

      // FORMAT TANGGAL 1
      // Tanggal dalam format asli
      const originalDate = item.pubDate;

      // Konversi string tanggal ke objek Date
      const date = new Date(originalDate);

      // Daftar bulan dalam bahasa Indonesia
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

      // Ambil hari, bulan, dan tahun
      const day = date.getUTCDate();
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();

      // Format tanggal
      const formattedDate = `${day.toString().padStart(2, '0')} ${month} ${year}`;



      // Ambil jam dari pubDate
      const pubDateNew = new Date(item.pubDate);
      const hours = pubDateNew.getHours(); // mengambil hours
      const minutes = pubDateNew.getMinutes(); // mengambil menit

      // console.log(`jam ${hours} Menit ${minutes == 0 ? "00" : minutes}`)



        // FORMAT TANGGAL 2
      const pubDate = new Date(item.pubDate);
      const relativeTime = item.relativeTime;
      console.log('ini relative time satu:', relativeTime)


      card.innerHTML = `
      <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-full mb-4 rounded-lg view-deta-satu cursor-pointer">
      <h2 data-url="${path}" class="text-xl font-bold mb-2 view-deta-satu cursor-pointer hover:text-gray-700 transition duration-200">${item.title}</h2>
      <p class="text-gray-600 text-sm">${relativeTime ? item.relativeTime : `Published at: ${hours}:${minutes == 0 ? "00" : minutes} WIB`}</p>
      `;

      newsCards.appendChild(card);
    });

    document.querySelectorAll('.view-deta-satu').forEach(butt => {
      butt.addEventListener('click', () => {
        const url = butt.getAttribute('data-url');
        window.location.href = `detail.html?url=${encodeURIComponent(url)}`;
      });
    });
  }

  fetchNews();




  // Content tiga sub
  async function fetchNewsDua() {
    try {
      let response = await fetch('/api/news/gayaHidup');
      if (!response.ok) {
        throw new Error('Endpoint /api/news/gayaHidup tidak tersedia');
      }
      let data = await response.json();

      displayNewsDua(data.posts);
    } catch (error) {
      console.warn('Gagal mengambil data dari endpoint pertama:', error);
      try {
        const alternativeResponse = await fetch('https://api-berita-indonesia.vercel.app/cnn/gayaHidup/');
        if (!alternativeResponse.ok) {
          throw new Error('Endpoint alternatif juga tidak tersedia');
        }
        const alternativeData = await alternativeResponse.json();

        displayNewsDua(alternativeData.data.posts);
      } catch (alternativeError) {
        console.error('Error fetching news from alternative API:', alternativeError);
      }
    }
  }

  function displayNewsDua(news) {
    const newsCards = document.getElementById('content-tiga-sub');

    news.slice(0, 3).forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const path = new URL(item.link).pathname;

      // FORMAT TANGGAL 1
      // Tanggal dalam format asli
      const originalDate = item.pubDate;

      // Konversi string tanggal ke objek Date
      const date = new Date(originalDate);

      // Daftar bulan dalam bahasa Indonesia
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

      // Ambil hari, bulan, dan tahun
      const day = date.getUTCDate();
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();

      // Format tanggal
      const formattedDate = `${day.toString().padStart(2, '0')} ${month} ${year}`;



      // Ambil jam dari pubDate
      const pubDateNew = new Date(item.pubDate);
      const hours = pubDateNew.getHours(); // mengambil hours
      const minutes = pubDateNew.getMinutes(); // mengambil menit

      // console.log(`jam ${hours} Menit ${minutes == 0 ? "00" : minutes}`)



        // FORMAT TANGGAL 2
      const pubDate = new Date(item.pubDate);
      const relativeTime = item.relativeTime;
      console.log('ini relative time dua:', relativeTime)


      card.innerHTML = `
      <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-full mb-4 rounded-lg view-deta-dua cursor-pointer">
      <h2 data-url="${path}" class="title-webkit font-bold mb-2 view-deta-dua cursor-pointer hover:text-gray-700 transition duration-200">${item.title}</h2>
      <p class="text-gray-600 text-sm">${relativeTime ? item.relativeTime : `Published at: ${hours}:${minutes == 0 ? "00" : minutes} WIB`}</p>
      `;

      newsCards.appendChild(card);
    });

    document.querySelectorAll('.view-deta-dua').forEach(butt => {
      butt.addEventListener('click', () => {
        const url = butt.getAttribute('data-url');
        window.location.href = `detail.html?url=${encodeURIComponent(url)}`;
      });
    });
  }

  fetchNewsDua();


  // content tiga sub dua
  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/gayaHidup/');
    const data = await response.json();
    // console.log(data); // Lihat struktur data yang diterima
    
    const news = data.data.posts; // Akses array berita dalam data

    // console.log('ini data berita 1: ',news)
    
    const newsCards = document.getElementById('content-tiga-sub-dua');


    // Card Data akan ditampilkan secara random
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Shuffle the news array
    const shuffledNews = shuffleArray(news.slice());
    
    shuffledNews.slice(0,3).forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const path = new URL(item.link).pathname; // Ambil path dari URL artikel

      // FORMAT TANGGAL 1
      // Tanggal dalam format asli
      const originalDate = item.pubDate;

      // Konversi string tanggal ke objek Date
      const date = new Date(originalDate);

      // Daftar bulan dalam bahasa Indonesia
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

      // Ambil hari, bulan, dan tahun
      const day = date.getUTCDate();
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();

      // Format tanggal
      const formattedDate = `${day.toString().padStart(2, '0')} ${month} ${year}`;



      // Ambil jam dari pubDate
      const pubDateNew = new Date(item.pubDate);
      const hours = pubDateNew.getHours(); // mengambil hours
      const minutes = pubDateNew.getMinutes(); // mengambil menit

      // console.log(`jam ${hours} Menit ${minutes == 0 ? "00" : minutes}`)

        // FORMAT TANGGAL 2
      const pubDate = new Date(item.pubDate);
      const relativeTime = item.relativeTime;
      
      card.innerHTML = `
      <div class="flex mb-6">
      <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-32 h-24 object-cover">
      <div class="ml-4 items-center">
      <h2 class="text-xl font-semibold">${item.title}</h2>
      <p class="text-gray-600">${relativeTime ? item.relativeTime : `Published at: ${hours}:${minutes == 0 ? "00" : minutes} WIB`}</p>
      </div>
      </div>
      `;
      
      newsCards.appendChild(card);
    });

      // <img class="view-deta" data-url="${path}" src="${item.thumbnail}" alt="${item.title}">
      // <h2>${item.title}</h2>


      // <button class="view-deta" data-url="${path}">Lihat Selengkapnya</button>
      // <button class="view-details" data-url="${item.link}">View Details</button>
    
    // document.getElementById('see-more-btn').addEventListener('click', () => {
    //   window.location.href = 'all-news.html'; // Halaman untuk menampilkan semua berita
    // });

    document.querySelectorAll('.view-deta').forEach(butt => {
      butt.addEventListener('click', () => {
        const url = butt.getAttribute('data-url');
        window.location.href = `detail.html?url=${encodeURIComponent(url)}`;
        console.log('ini baru:', news)
      });
    });

    
  } catch (error) {
    console.error('Error fetching news:', error);
  }



  // Content tiga sub empat
  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/hiburan/');
    const data = await response.json();
    // console.log(data); // Lihat struktur data yang diterima
    
    const news = data.data.posts; // Akses array berita dalam data

    // console.log('ini data berita 1: ',news)
    
    const newsCards = document.getElementById('content-tiga-sub-empat');
    
    news.slice(0,3).forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const path = new URL(item.link).pathname; // Ambil path dari URL artikel


      // FORMAT TANGGAL
      // Tanggal dalam format asli
      const originalDate = item.pubDate;

      // Konversi string tanggal ke objek Date
      const date = new Date(originalDate);

      // Daftar bulan dalam bahasa Indonesia
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

      // Ambil hari, bulan, dan tahun
      const day = date.getUTCDate();
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();

      // Format tanggal
      const formattedDate = `${day.toString().padStart(2, '0')} ${month} ${year}`;


      // Ambil jam dari pubDate
      const pubDateNew = new Date(item.pubDate);
      const hours = pubDateNew.getHours(); // mengambil hours
      const minutes = pubDateNew.getMinutes(); // mengambil menit

      // console.log(`jam ${hours} Menit ${minutes == 0 ? "00" : minutes}`)


      
      card.innerHTML = `
      <div class="flex mb-4" id="content-tiga-sub-empat">
      <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-20 h-16 object-cover">
      <div class="ml-2">
      <p class="text-sm text-blue-600">${`Published at: ${hours}:${minutes == 0 ? "00" : minutes} WIB`}</p>
      <h4 class="text-sm font-semibold">${item.title}</h4>
      </div>
      </div>
      `;
      
      newsCards.appendChild(card);
    });

      // <img class="view-deta" data-url="${path}" src="${item.thumbnail}" alt="${item.title}">
      // <h2>${item.title}</h2>


      // <button class="view-deta" data-url="${path}">Lihat Selengkapnya</button>
      // <button class="view-details" data-url="${item.link}">View Details</button>
    
    // document.getElementById('see-more-btn').addEventListener('click', () => {
    //   window.location.href = 'all-news.html'; // Halaman untuk menampilkan semua berita
    // });

    document.querySelectorAll('.view-deta').forEach(butt => {
      butt.addEventListener('click', () => {
        const url = butt.getAttribute('data-url');
        window.location.href = `detail.html?url=${encodeURIComponent(url)}`;
        console.log('ini baru:', news)
      });
    });

    
  } catch (error) {
    console.error('Error fetching news:', error);
  }
});
