document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/terbaru/');
    const data = await response.json();
    // console.log(data); // Lihat struktur data yang diterima
    
    const news = data.data.posts; // Akses array berita dalam data

    // console.log('ini data berita 1: ',news)
    
    const newsCards = document.getElementById('news-cards');

    // Tentukan jumlah card yang akan ditampilkan berdasarkan lebar layar
    const cardsToShow = window.innerWidth < 1024 ? 4 : 5;
    
    news.slice(0, cardsToShow).forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const path = new URL(item.link).pathname; // Ambil path dari URL artikel
      
      card.innerHTML = `
      <div class="bg-white shadow-md p-4">
      <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-full h-32 object-cover mb-2 cursor-pointer view-deta">
      <h2 data-url="${path}" class="title-webkit font-bold text-sm view-deta cursor-pointer">${item.title}</h2>
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



  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/nasional/');
    const data = await response.json();
    // console.log(data); // Lihat struktur data yang diterima
    
    const news = data.data.posts; // Akses array berita dalam data

    // console.log('ini data berita 1: ',news)
    
    const newsCards = document.getElementById('news-cards-dua');
    
    news.slice(0,1).forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const path = new URL(item.link).pathname; // Ambil path dari URL artikel

      // Ambil jam dari pubDate
      const pubDateNew = new Date(item.pubDate);
    const hours = pubDateNew.getHours(); // mengambil hours
    const minutes = pubDateNew.getMinutes(); // mengambil menit

    // console.log(`jam ${hours} Menit ${minutes == 0 ? "00" : minutes}`)

    card.innerHTML = `
    <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-full h-90 object-cover mb-4 view-detail">
    <h1 class="font-bold text-2xl mb-2" view-detail>${item.title}</h1>
    <p class="text-sm text-gray-600 mb-4">${`Published at ${hours}:${minutes == 0 ? "00" : minutes} WIB`}</p>
    `;

      // <img class="view-deta" data-url="${path}" src="${item.thumbnail}" alt="${item.title}">
      // <h2>${item.title}</h2>


      // <button class="view-deta" data-url="${path}">Lihat Selengkapnya</button>
      // <button class="view-details" data-url="${item.link}">View Details</button>

    newsCards.appendChild(card);
  });
    
    // document.getElementById('see-more-btn').addEventListener('click', () => {
    //   window.location.href = 'all-news.html'; // Halaman untuk menampilkan semua berita
    // });

    document.querySelectorAll('.view-detail').forEach(butt => {
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
