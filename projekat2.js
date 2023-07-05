let session = new Session()
session = session.getSession()
if (session !== "") {
	window.location.href = 'DrustvenaMreza.js'
}

document.querySelector('#registruj').addEventListener('click', () => {
	let div = document.querySelector('.div3')
	div.style.display = 'block'
})
document.querySelector('#zatvori').addEventListener('click', () => {
	let div = document.querySelector('.div3')
	div.style.display = 'none'
})
let config = {
	'ime_prezime':{
		required: true ,
		minlength: 3,
		maxlength: 50,
	},
	'korisnicko_ime':{
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	'email':{
		required: true,
		email: true,
		minlength: 7,
		maxlength: 50,
	},
	'lozinka':{
		required: true,
		minlength: 7,
		maxlength: 50,
		metching: 'ponovi_lozinku',
	},
	'ponovi_lozinku':{
		required: true,
		minlength: 7,
		maxlength: 50,
		matching: 'lozinka',
	},
}
let validator = new Validator(config, '#formID')
document.querySelector('#formID').addEventListener('submit', e => {
	e.preventDefault();
	if (validator.validationPassed()) {
		let user = new User();
		user.username = document.querySelector('#korisnicko_ime').value
		user.email = document.querySelector('#email').value
		user.password = document.querySelector('#lozinka').value
		user.create()
	} else {
		alert('Polja nisu ispravno uneta')
	}
})
document.querySelector('#form').addEventListener('submit', e=> {
	e.preventDefault()
	let email = document.querySelector('#email1').value
	let password = document.querySelector('#lozinka1').value
	let user = new User()
	user.email = email
	user.password = password
	user.login()
})