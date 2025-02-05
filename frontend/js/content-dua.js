document.addEventListener('DOMContentLoaded', async () => {

  // Seng Bener
  async function fetchNews() {
    try {
      let response = await fetch('/api/news/olahraga');
      if (!response.ok) {
        throw new Error('Endpoint /api/news/olahraga tidak tersedia');
      }
      let data = await response.json();

      displayNews(data.posts);
    } catch (error) {
      console.warn('Gagal mengambil data dari endpoint pertama:', error);
      try {
        const alternativeResponse = await fetch('https://api-berita-indonesia.vercel.app/cnn/olahraga/');
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
    const newsCards = document.getElementById('content-dua');

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
      // const formattedDate = `${day.toString().padStart(2, '0')} ${month} ${year}`;



      // Ambil jam dari pubDate
      const pubDateNew = new Date(item.pubDate);
      const hours = pubDateNew.getHours(); // mengambil hours
      const minutes = pubDateNew.getMinutes(); // mengambil menit

      // console.log(`jam ${hours} Menit ${minutes == 0 ? "00" : minutes}`)



        // FORMAT TANGGAL 2
      const pubDate = new Date(item.pubDate);
      const relativeTime = item.relativeTime;

      card.innerHTML = `
      <div class="flex-1 bg-gray-100 p-4">
      <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-full h-36 object-cover mb-2 view-detail cursor-pointer">
      <p class="text-gray-600 text-sm">${relativeTime ? item.relativeTime : `Published at: ${hours}:${minutes == 0 ? "00" : minutes} WIB`}</p>
      <p class="text-sm font-semibold view-detail cursor-pointer hover:text-gray-700 transition duration-200" data-url="${path}">${item.title}</p>
      </div>
      `;

      newsCards.appendChild(card);
    });

    document.querySelectorAll('.view-detail').forEach(butt => {
      butt.addEventListener('click', () => {
        const url = butt.getAttribute('data-url');
        window.location.href = `detail.html?url=${encodeURIComponent(url)}`;
      });
    });
  }

  fetchNews();
});
