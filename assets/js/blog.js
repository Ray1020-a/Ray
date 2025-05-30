document.addEventListener('DOMContentLoaded', function() {
  const blogPostsList = document.querySelector('.blog-posts-list');
  const apiEndpoint = 'https://blog.ray-tw.com/api.php';
  const defaultImage = './assets/images/noimg.png';
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const machineReadableDate = date.toISOString().split('T')[0];
    let humanReadableDate = date.toLocaleDateString('zh-TW', options);
    humanReadableDate = humanReadableDate.replace(',', '');

    return {
        datetime: machineReadableDate,
        display: humanReadableDate
    };
  }

  function createBlogPostItem(post) {
    const listItem = document.createElement('li');
    listItem.classList.add('blog-post-item');
    const link = document.createElement('a');
    link.href = `https://blog.ray-tw.com?p=${post.slug}`;
    const figure = document.createElement('figure');
    figure.classList.add('blog-banner-box');

    const img = document.createElement('img');
    
    img.src = post.cover_image ? post.cover_image : defaultImage;
    img.alt = post.title;
    img.loading = 'lazy';
    figure.appendChild(img);

    const blogContent = document.createElement('div');
    blogContent.classList.add('blog-content');

    const blogMeta = document.createElement('div');
    blogMeta.classList.add('blog-meta');

    const time = document.createElement('time');
    const formattedDate = formatDate(post.created_at);
    time.dateTime = formattedDate.datetime;
    time.textContent = formattedDate.display;
    blogMeta.appendChild(time);

    const title = document.createElement('h3');
    title.classList.add('h3', 'blog-item-title');
    title.textContent = post.title;

    blogContent.appendChild(blogMeta);
    blogContent.appendChild(title);

    link.appendChild(figure);
    link.appendChild(blogContent);
    listItem.appendChild(link);

    return listItem;
  }

  async function loadBlogPosts() {
    if (!blogPostsList) {
      console.error('錯誤：找不到 .blog-posts-list 元素。');
      return;
    }


    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP 錯誤! 狀態: ${response.status} - ${response.statusText}`);
      }
      const apiData = await response.json();

      if (apiData.status === 'success' && apiData.data && Array.isArray(apiData.data)) {
        blogPostsList.innerHTML = '';

        if (apiData.data.length > 0) {
          apiData.data.forEach(post => {
            const postItem = createBlogPostItem(post);
            blogPostsList.appendChild(postItem);
          });
        } else {
          blogPostsList.innerHTML = '<li>目前沒有文章。</li>';
        }
      } else {
        console.error('API 回應格式不正確或沒有文章數據:', apiData);
        throw new Error('API 回應格式不正確或沒有文章數據。');
      }

    } catch (error) {
      console.error('無法獲取部落格文章:', error);
      if (blogPostsList) {
        blogPostsList.innerHTML = `<li>載入文章失敗：${error.message}</li>`;
      }
    }
  }
  loadBlogPosts();
});