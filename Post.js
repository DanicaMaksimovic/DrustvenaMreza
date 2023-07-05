class Post {
	post_id = '';
	post_content = '';
	user_id = '';
	likes = '';
	api_url = 'https://6491c9c22f2c7ee6c2c8e77a.mockapi.io';
	async create(){
		let session = new Session()
		let session_id = session.getSession()

		let data = {
			user_id: session_id,
			content: this.post_content,
			likes: 0,
		}
		data = JSON.stringify(data)
		let response = await fetch(this.api_url + '/posts', {
			method: 'POST', 
			headers: {
				'Content-Type' : 'application/json'
			},
			body: data
		});

		data = await response.json()

		return data 
	} 
	async getAllPost(){
		let response = await fetch(this.api_url + '/posts')
		let data = await response.json()
		return data
	}
	like(likes){
		let data ={
			likes: likes,
		}
		data = JSON.stringify(data)
		fetch(this.api_url + '/posts' , {
			method: 'PUT' ,
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		})
		.then(response => response.json())
		.then(data =>{
			alert('LIKE')
		})
	}
}