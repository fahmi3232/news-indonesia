document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/teknologi/');
    const data = await response.json();
        // console.log(data); // Lihat struktur data yang diterima

        const news = data.data.posts; // Akses array berita dalam data

        // console.log('ini data berita 1: ',news)

        const newsCards = document.getElementById('content-empat');

        news.slice(0, 6).forEach(item => {
          const card = document.createElement('div');
          card.classList.add('card');

            const path = new URL(item.link).pathname; // Ambil path dari URL artikel

            const date = new Date(item.pubDate)
            const hours = date.getHours();
            const minutes = date.getMinutes()

            card.innerHTML = `
            <div>
            <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-full mb-2">
            <h4 class="text-lg font-bold text-gray-900">${item.title}</h4>
            <p class="text-sm text-gray-600 mt-4">${`Published at ${hours}:${minutes == 0 ? "00" : minutes}`}</p>
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



    // Content Empat sub satu
      try {
        let currentPage = 1;
        const maxPage = 5;
        const itemsPerPage = 6;
        const newsCards = document.getElementById('content-empat-sub-satu');
        const loadMoreButton = document.getElementById('load-more');

        async function loadNews(page) {
          const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/teknologi/');
          const data = await response.json();
          const news = data.data.posts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

          news.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

                const path = new URL(item.link).pathname; // Ambil path dari URL artikel
                const thumbnail = item.thumbnail ? item.thumbnail : 'https://placehold.co/200x150';

                const date = new Date(item.pubDate);
                const hours = date.getHours();
                const minutes = date.getMinutes();

                card.innerHTML = `
                <div class="flex mb-6">
                <img data-url="${path}" src="${thumbnail}" alt="${item.title}" class="w-32 h-24 object-cover">
                <div class="ml-4 items-center">
                <h2 class="text-xl font-semibold">${item.title}</h2>
                <p class="text-gray-600">${`Published at: ${hours}:${minutes === 0 ? "00" : minutes} WIB`}</p>
                </div>
                </div>
                `;

                newsCards.appendChild(card);
              });
        }

        // Tombol Load More
        loadMoreButton.addEventListener('click', () => {
          if (currentPage < maxPage) {
            loadNews(currentPage);
            currentPage++;
          } else {
                window.location.href = 'https://example.com/all-news'; // Ganti dengan URL halaman baru
              }
            });

        // Load the first set of news on initial load
        loadNews(currentPage);
        currentPage++;
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