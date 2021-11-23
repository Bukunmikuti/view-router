import ViewRouter from '../../src/viewrouter.js';

let v = new ViewRouter({
	views: [
		{
			id: 'welcome',
			path: '/welcome',

			hooks: {
				onEnter(data) {
					console.log('helooo welcome')
				},
				onLeave() {
					console.log('welcome on leave')
				}
			}
		},

		{
			id: 'signup',
			path: '/register',
			hooks: {
				beforeEnter(data) {
					console.log('Register before Enter')
				},
				onEnter(data) {
					console.log('Register entered!')
					data.current.view.classList.add('scale-in-hor-left');
					let login = data.current.view.querySelector('#toLogin')
					login.onclick = () => {
						v.routeTo('login')
					}
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
			hooks: {
				onEnter(data) {
					data.current.view.classList.add('fade-in');
				}
			}
		},
		{
			id: 'second',
			origin: '../second.html',
			path: '/second',

			hooks: {
				onEnter(data) {

				}
			}
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
	resetScroll: true, 
	notFound: (prevPath, currPath) => {
		console.log(prevPath + '' + currPath)
		return '404'
	}
})


v.start((id) => {
	if (id == undefined) {
		v.routeTo('welcome')
	}
})

let signupBtn = document.querySelector('#signup-btn')
signupBtn.onclick = () => {
	v.routeTo('signup')
}







