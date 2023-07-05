	class User {
	user_id = '';
	username = '';
	email = '';
	password = '';
	api_url = 'https://6491c9c22f2c7ee6c2c8e77a.mockapi.io';
	create(){
		let data = {
			usernama: this.username,
			email: this.email,
			password: this.password,
		}		
		data = JSON.stringify(data)
		fetch(this.api_url + '/users', {
			method: 'POST' ,
			headers: {
				'Content-Type' : 'application/json'
			},
			body: data
		})
		.then(response => response.json())
		.then(data => {
			let session = new Session()
			session.user_id = data.id
			session.startSession()
			window.location.href = 'DrustvenaMreza.html'
		})
	}
	async get(user_id){
		let api_url = this.api_url + '/users/' + user_id
		fetch(api_url)
		.then(response => response.json())
		.then(data => {
			document.querySelector('#username').innerText = data['username']
			document.querySelector('#email').innerText = data['email']  
		})
	}
	edit(){
		let data = {
			email: this.email,
			password: this.password,
		}
		data = JSON.stringify(data)
		let session = new Session()
		session_id = session.getSession()
		fetch(this.api_url + '/users/' + session_id, {
			method: 'POST' ,
			headers: {
				'Content-Type' : 'application/json'
		},
		body: data
	})
		.then(response => response.json())
		.then(data => {
			window.location.href = 'DrustvenaMreza.html'
		})
	}
	login(){
		fetch(this.api_url + '/users')
		.then(response => response.json())
		.then(data =>{
			let broj = 0 
			data.forEach(db_user => {
				if (db_user.email === this.email && db_user.password === this.password) {
					let session = new Session()
					session.user_id = db_user.id
					session.startSession()
					broj = 1
					window.location.href = 'DrustvenaMreza.html'
				}
			})
			if (broj === 0) {
				alert('Pogrešan mail ili lozinka')
			}
		})
	}
	getAllPost(){
		let response = fetch(this.api_url + '/posts')
		let data = response.json()
		return data
	}
}