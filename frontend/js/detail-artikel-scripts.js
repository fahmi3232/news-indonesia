document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let articleUrl = urlParams.get('url');

  if (articleUrl) {

    articleUrl = 'https://www.cnnindonesia.com' + articleUrl;


    try {
      // Mengambil detail artikel dari server
      const response = await fetch('/article?url=' + encodeURIComponent(articleUrl));
      const article = await response.json();

      const detailTitle = document.getElementById('detail-title');
      const detailDate = document.getElementById('detail-date');
      const detailContent = document.getElementById('detail-content');
      const detailImage = document.getElementById('detail-image');
      const detailRelatedLinks = document.getElementById('detail-related-links');

      detailTitle.innerText = article.title;
      detailDate.innerText = article.date;
      detailContent.innerHTML = article.content;

      // if (article.images && article.images.length > 0) {
      //   detailImage.src = article.images[0];
      //   detailImage.style.display = 'block';
      // } else {
      //   detailImage.style.display = 'block';
      //   detailImage.src = '../image/error.png'
      //   detailContent.innerHTML = 'Data tidak ditemukan';
      //   detailContent.style.color = 'red'; // Warna merah
      //   detailContent.style.fontSize = '18px'; // Ukuran font lebih besar
      //   detailContent.style.fontWeight = 'bold'; // Teks tebal
      //   detailContent.style.textAlign = 'center'; // Rata tengah
      // }


      // Detail artikel beserta animasi preloader
      // Menampilkan preloader saat proses loading
      // Menampilkan preloader saat proses loading
      document.getElementById('preloader').style.display = 'block';

      // Menambahkan delay agar preloader muncul lebih lama
      setTimeout(function() {
        if (article.images && article.images.length > 0) {
          detailImage.src = article.images[0];
          detailImage.style.display = 'block';

          // Menyembunyikan preloader setelah delay
          document.getElementById('preloader').style.display = 'none';
        } else {
          setTimeout(function() {
            // Gambar error dan pesan teks
            detailImage.style.display = 'block';
            detailImage.src = '../image/error.png';
            detailContent.innerHTML = 'Data tidak ditemukan';
            detailContent.style.color = 'red'; // Warna merah
            detailContent.style.fontSize = '18px'; // Ukuran font lebih besar
            detailContent.style.fontWeight = 'bold'; // Teks tebal
            detailContent.style.textAlign = 'center'; // Rata tengah

            // Menyembunyikan preloader setelah delay
            document.getElementById('preloader').style.display = 'none';
          }, 3000)
        }
      }, 1500); // Delay selama 2 detik (2000 ms)




      // Menampilkan link terkait
      detailRelatedLinks.innerHTML = article.relatedLinks;

      // console.log('ini adalah link', article.relatedLinks)

      const links = detailContent.getElementsByTagName('a');
      for (let link of links) {
        link.setAttribute('href', 'index.html'); // Mengarahkan ke halaman beranda
        link.setAttribute('target', '_self'); // Membuka di tab yang sama
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  } else {
    console.error('URL artikel tidak ditemukan');
  }
});
