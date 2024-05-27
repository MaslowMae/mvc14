//code help


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
  
    // Function to fetch posts data and render it on the page
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const body = await response.text();
          const data = await response.json();
          renderPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    // Function to render posts on the page
    function renderPosts(posts) {
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = ''; // Clear existing content
  
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <button data-id="${post.id}" class="like-btn">Like</button>
        `;
        postsContainer.appendChild(postElement);
      });
  
      // Add event listeners to like buttons
      document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', handleLikeButtonClick);
      });
    }
  
    // Event handler for like button click
    async function handleLikeButtonClick(event) {
      const postId = event.target.dataset.id;
  
      try {
        const response = await fetch(`/api/posts/${postId}/like`, {
          method: 'POST',
        });
  
        if (response.ok) {
          console.log(`Post ${postId} liked successfully`);
        } else {
          console.error('Failed to like post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    // Fetch and render posts when the page loads
    fetchPosts();
  });