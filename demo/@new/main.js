import ViewRouter from '../../src/viewrouter.js';

let v = new ViewRouter({
	views: [
		{
			id: 'welcome',
			path: '/welcome',
			hooks: {
			 onEnter(data) {
			  let signupBtn = document.querySelector('#signup-btn')
			  signupBtn.onclick = () => {
			   v.routeTo('signup')
			  }
			 }
			}
		},
		
		{
			id: 'signup',
			path: '/register',
			hooks: {
				beforeEnter() {
					console.log('Register before Enter')
				},
				onEnter(el) {
					console.log('Register entered!')
					//el.style.background = 'red'
				},
				beforeLeave(el) {
					console.log('Register would leave now')
				},
				onLeave() {
					console.log('Register Left')
				},
			}
		},
		
		{
			id: 'login',
			path: '/login',
	 },
	 
		{
			id: '404',
			path: '/not-found',
			hooks: {
			 beforeEnter() {
			  console.log('🙄')
			 }, 
			 onEnter() {
			  console.log('😐😐')
			 }
			}
	 }
	],

	navigation: 'hash',
	transition: false, //deprecated
	notFound: (prevPath, currPath) => {
		console.log(prevPath + '' + currPath)
		return '404'
	}
})


v.start((id) => {
	if (id == undefined) {
		v.routeTo('welcomee')
	}
})


	
function welcome(){
	
	let loginBtn = document.querySelector('#login-btn')
	
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








