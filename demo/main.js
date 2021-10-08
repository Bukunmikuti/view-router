//import ViewRouter from 'https://cdn.jsdelivr.net/npm/@bukunmikuti/view-router/+esm';
import ViewRouter from '../src/viewrouter.js';




let v = new ViewRouter({
	views: [
		{
			id: 'welcome',
			path: '/welcome',
			mounted() {welcome()},
		},
		{
			id: 'signup',
			path: '/register',
			mounted() {register()},
			render() {console.log('Rendered 🎉')},
		},
		{
			id: 'login',
			path: '/login',
			mounted() {login()},
			render() {console.log('Rendered 2')}
	    },
		{
			id: '404',
			path: '/not-found',
	    }
	],

	navigation: 'hash',
	transition: false,
})


v.start((id) => {
	if (id == undefined) {
		v.routeTo('404')
	} else if (id == 'welcome') {
		v.routeTo('signup')
	}
})


v.notFound((prevPath,currPath) => {
	return '404'
})

function welcome(){
	let signupBtn = document.querySelector('#signup-btn')
	let loginBtn = document.querySelector('#login-btn')
	signupBtn.onclick = () => {
		v.routeTo('signup')
	}
	loginBtn.onclick = () => {
		v.routeTo('login')
	}
}

function register() {
	let toLogin = document.querySelector('#toLogin')
	toLogin.onclick = () => {
		v.routeTo('login')
	}
}

function login() {
	let toRegister = document.querySelector('#toRegister')
	toRegister.onclick = () => {
		v.routeTo('signup')
	}	
}








