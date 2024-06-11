

document.addEventListener('DOMContentLoaded', async () => {
});

function renderLatestPost(posts) {
  console.log("rendering latest post");
  const postContainer = document.querySelector('.col-md-8');
  if (!postContainer) {
    console.error('Post container not found');
    return;
  }
postContainer.innerHTML="";

  // Sort the posts array based on the post ID in descending order
  const sortedPosts = posts.sort((a, b) => b.id - a.id);

  // Get the latest post from the sorted array
  const latestPost = sortedPosts[0];

  // Create HTML elements for the latest post
  const postElement = document.createElement('div');
  postElement.classList.add('post', 'featured-post');
  postElement.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${latestPost.postTitle}</h5>
      <p class="card-text">${latestPost.post_content}</p>
      <a href="#" class="btn btn-primary">Create New Post</a>
    </div>
    <ol class="comment-section">
      <h3 class="comment-section-title">Comments</h3>
    </ol>
    <form id="comment-form">
      <label for="comment_text">Add a comment:</label>
      <input type="text" id="comment_text" name="comment_text" class="form-control">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `;

  // Append the post element to the container
  postContainer.appendChild(postElement);
}


function renderComments(comments) {
  return comments.map(comment => `
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto comment">
        <div class="comment_text">${comment.comment_text}</div>
      </div>
      <span class="badge bg-primary rounded-pill">0</span>
    </li>
  `).join('');
}

async function handleCommentSubmit(event) {
  event.preventDefault();

  const commentText = document.getElementById('comment_text').value.trim();
  if (!commentText) {
    return;
  }

  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment_text: commentText })
    });

    if (!response.ok) {
      throw new Error('Failed to submit comment');
    }

    // Reload the page to show the new comment
    location.reload();
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit comment');
  }
}

(async () => {
  try {
    // Fetch the latest post data
    // debugger;
    const response = await fetch('/api/posts')
    if (!response.ok) {
      throw new Error('Failed to fetch latest post');
    }
    const latestPost = await response.json();

    // Render the latest post on the page
    renderLatestPost(latestPost);

    // Add event listener for submitting comments
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', handleCommentSubmit);
  } catch (error) {
    console.error('Error:', error);
  };
})();