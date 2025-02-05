document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tag = urlParams.get('tag');

  if (tag) {
    document.getElementById('tag-name').textContent = tag;

    try {
      const response = await fetch(`/api/articles?tag=${encodeURIComponent(tag)}`);
      const articles = await response.json();

      console.log('iki', response)

      const articlesContainer = document.getElementById('articles');
      articlesContainer.innerHTML = articles.map(article => `
        <div class="article-card">
        <h3><a href="${article.url}">${article.title}</a></h3>
        <p>${article.summary}</p>
        </div>
        `).join('');
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  } else {
    console.error('Tag not found');
  }
});
