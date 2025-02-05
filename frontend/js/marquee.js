document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/nasional/');
    const data = await response.json();
    // console.log(data); // Lihat struktur data yang diterima
    
    const news = data.data.posts; // Akses array berita dalam data

    // console.log('ini data berita 1: ',news)
    
    const newsCards = document.getElementById('marquee');

    // Tentukan jumlah card yang akan ditampilkan berdasarkan lebar layar
    const cardsToShow = window.innerWidth < 1024 ? 4 : 5;
    
    news.slice(0, 2).forEach(item => {
      const ul = document.createElement('ul');
      ul.classList.add('li');

      const path = new URL(item.link).pathname; // Ambil path dari URL artikel
      
      ul.innerHTML = `
      <p class="text-sm">${item.title}</p>
      `;
      
      newsCards.appendChild(ul);
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
        window.location.href = `detail-artikel.html?url=${encodeURIComponent(url)}`;
        console.log('ini baru:', news)
      });
    });

    
  } catch (error) {
    console.error('Error fetching news:', error);
  }



  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/terbaru/');
    const data = await response.json();
    // console.log(data); // Lihat struktur data yang diterima
    
    const news = data.data.posts; // Akses array berita dalam data

    // console.log('ini data berita 1: ',news)
    
    const newsCards = document.getElementById('marquee-dua');

    // Tentukan jumlah card yang akan ditampilkan berdasarkan lebar layar
    const cardsToShow = window.innerWidth < 1024 ? 4 : 5;
    
    news.slice(0, 2).forEach(item => {
      const ul = document.createElement('ul');
      ul.classList.add('li');

      const path = new URL(item.link).pathname; // Ambil path dari URL artikel
      
      ul.innerHTML = `
      <p class="text-sm">${item.title}</p>
      `;
      
      newsCards.appendChild(ul);
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
        window.location.href = `detail-artikel.html?url=${encodeURIComponent(url)}`;
        console.log('ini baru:', news)
      });
    });

    
  } catch (error) {
    console.error('Error fetching news:', error);
  }
});


