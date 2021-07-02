import ViewRouter from 'https://cdn.jsdelivr.net/npm/@bukunmikuti/view-router/+esm';
//import ViewRouter from '../src/viewrouter.js';


let v = new ViewRouter({
	views: [
		{
			id: 'welcome',
			path: '?welcome',
		},

		{
			id: 'signup',
			path: '?register',
			mounted() {
				template1();
			},
			render() {
				console.log('Rendered 🎉');
			}
		},

		{
			id: 'login',
			path: '?login',
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
			path: '?about',
	}
	],

	navigation: 'history',
	transition: true,
})


let template1 = () => {
	let alertBtn = document.querySelector('#alert')
	alertBtn.onclick = e => {
		hello()
	};
	let hello = () => {
		alert('hello');
	}
}



v.routeTo('welcome');





