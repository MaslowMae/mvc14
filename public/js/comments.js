const commentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector("#comment_text").Value.trim();
    if (comment_text) {
        const response = await fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({ comment_text }),
            headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                document.location.replace("/homepage");
            } else {
                alert(response.statusText);
            }
        }
    };
document
.querySelector("#comment-form")
.addEventListener("submit", commentHandler);
