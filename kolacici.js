class Session {
	user_id = '';
	startSession(){
		const datum = new Date()
		datum.setTime(datum.getTime() + (2*24*60*60*1000))
		let expires = "expires=" + datum.toUTCString()
		document.cookie = "user_id=" + this.user_id + ";" + expires
	}
	getSession(){
		let name = 'user_id='
		let c = document.cookie.split(";")
		for (let i=0; i < c.length; i++) {
			let ca = c[i]
			while(ca.charAt(0) == ' '){
				ca = ca.substring(1)
			}
			if (ca.indexOf(name) == 0) {
				return ca.substring(name.length, ca.length)
			}
		}
		return "";
	}
	destroySession(){
		let cookies = document.cookie.split(';')
		for(let i=0; i< cookies.length; i++){
			let cookie = cookies[i]
			let eqPos = cookie.indexOf("=")
			let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
		}
	}
}