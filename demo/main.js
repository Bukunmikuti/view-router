import ViewRouter from '../src/viewrouter.js';

const login_btn = document.getElementById('login-btn');
const signup_btn = document.getElementById('signup-btn');
const about = document.getElementById('about-btn');
const xx = document.getElementById('x');

let v = new ViewRouter({
	views: [
		{
		id: 'signup',
		path: '/register',
		mounted() {
			template1();
		},
		render() {
			console.log('Rendered 🎉');
		}
		},
		
		{
		id: 'login',
		path: '/login',
		mounted() {
			setTimeout(() => {
				document.querySelector('#h').textContent = 'Dynamic Template 2'
			}, 2000)
		}, 
		render() {
			console.log('Rendered Template 2')
		}
	}, 
	
	{
		id: 'about',
		path: '',
		origin: '../demo/about.html',
	}
	],
	
	navigation: 'history',
	transitions: true, 
})


login_btn.onclick = e => {
	v.routeTo('login');
}

signup_btn.onclick = e => {
	v.routeTo('signup')
}

about.onclick = () => {
	v.routeTo('about');
}

let template1 = () => {
	let alertBtn = document.querySelector('#alert')
	alertBtn.onclick = e => {
		hello()
	};
	let hello = () => {
		alert('hello');
	}
}

x.onclick = () => {
	
}


v.routeTo('signup');