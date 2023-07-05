let session = new Session()
session_id = session.getSession()
if (session_id !== "") {
	let user = new User()
	data = user.get(session_id) 
} else {
	window.location.href = '/'
}


document.querySelector('#logout').addEventListener('click', e => {
	e.preventDefault()
	session.destroySession()
	window.location.href = '/'
})
document.querySelector('#editAccount').addEventListener('click', e => {
	let izmena = document.querySelector('.izmeni form')
	izmena.style.display = 'block'
})
document.querySelector('form div #izmeniti').addEventListener('click', e => {
	e.preventDefault()
	let user = new User()
	user.email = document.querySelector('#email2').value
	user.password = document.querySelector('#lozinka2').value
	user.edit()
})
document.querySelector('#postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

    let content = document.querySelector('#postContent').value;
    document.querySelector('#postContent').value = '';

    let post = new Post();
    post.post_content = content;
    post = await post.create();
    let html = document.querySelector('#allPostsWrapper').innerHTML

    document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
    <div class="post-content">${post.content}</div><div class="post-actioons">
    <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span</button></div></div>` + html
});
async function allPost (){
	let all = new Post()
	all = await all.getAllPost()
	all.forEach(function(p){
		let post = new Post()
		post = post.getAllPost()
		let html = document.querySelector('#allPostsWrapper').innerHTML
		document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post">${p.content} <br> 
		<button onclick="likePost(this)" class="likePostJS like-btn"><span>${p.likes} LIKES</span</button></div>` + html
	})
}
allPost()
function likePost (event) {
	let main = event.closest('.single-post')
	let post = event.closest('.single-post').getAttribute('data-post_id')
	let number_of_likes = parseInt(event.querySelector('span').innerText)
	event.querySelector('span').innerText = number_of_likes + 1
	event.setAttribute('disabled', 'true')

	let postt = new Post()
	postt.like(number_of_likes + 1)
}

/*
document.querySelector('#postForm').addEventListener('submit',async (e) => {
	e.preventDefault()
	async function createPost(){
		let content = document.querySelector('#postContent').value
		document.querySelector('#postContent').value = ''
		
		let post = new Post()
		post.post_content = content
		await post.create()
		
		let cr_user = new User()
		await cr_user.get(session_id)
		
		document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}"><div class="post-content">${post.content}</div></div>`
	}
	createPost()
}) */