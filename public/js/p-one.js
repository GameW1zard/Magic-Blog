const postelement = document.getElementById('title')
const post_id = postelement.getAttribute('data-postid');
console.log(post_id);
const postcommethandler = async function (event) {
    event.preventDefault();

    const comment_content = document.getElementById('comment-text').value;

    await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            comment_content,
            post_id
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    document.location.reload();
}


document
    .querySelector('#comment-form')
    .addEventListener('submit', postcommethandler);

