
export default class ViewRouter {
	constructor (options) {
		this.options = options;
		this.views = this.options.views;
		this.manageNavigation(this.options.navigation);
		this.prepareContainer()
		
		//other inits
		this.container;
		this.mountedViews = [];
		this.previousViewID; //previous view ID
		this.previousPath;
		this.currentViewID; //current view ID
		this.currentPath;
		this.saveNotFound = this.options.notFound
	}

	prepareContainer() {
		if (document.getElementById('v-router-container') == null) {
			let container = document.createElement('div')
			container.id = 'v-router-container'
			document.body.insertAdjacentElement('afterbegin', container)
		}
		this.container = document.getElementById('v-router-container')
	}
	
	
	/**
	 * Navigates to current url path on ViewRouter initialization
	 * @param {function} id
	 * @returns view ID
	 */
	 start(callback) {
	 	let path = window.location.hash.split('#')[1];
	 	let view = this.convertToView(path);
	 	
	 	if (view != undefined) {
	 		this.show(view)
	 		callback(view.id)
	 	} else {
	 		callback(undefined);
	 	}
	 }
	
	
	/**
	 * Navigates to the specified view Id
	 * @param {string} id
	 * Executes 'this.handle404' for undefined views
	 */
	routeTo(id) {
		let view = this.convertToView(id);
		
		if (view == undefined) {
			let path;
			switch (this.options.navigation) {
				case 'hash':
					path = window.location.hash.split('#')[1];
					this.handle404(path);
					break
				case 'history':
					path = window.location.pathname;
					this.handle404(path);
					break;
				default:
					this.handle404(undefined);
			}
			return false;
		}
		
		switch (this.options.navigation) {
			case 'hash':
				if (view.path != this.currentPath) {
					window.location.hash = view.path;
				}
				break;
			case 'history':
				if (view.id != this.currentViewID) {
					this.show(view);
					window.history.pushState({path:view.path, id:view.id} ,'', view.path)
				}
				break;
			default:
				if (view.id != this.currentViewID) {
					this.show(view)
				}
		}
	}
	
	
	/**
	 * Redirect to a view through the view ID
	 * entry point to ViewRouter
	 */
	show (view) {
		this.manageView(view);
	}
	
	
	/**
	 * Returns view object from id or path
	 * Function returns undefined if id or path does not exist
	 */
	convertToView(str) {
		let result;
		this.views.some((view) => {
			if (view.id == str || view.path == str) {
				result = view;
				return true;
			}
		})
		
		return result;
	}
	
	
	/**
	 * check navigation preference and set up behaviour
	 * add event listener based on navigation type
	 */
	manageNavigation(nav) {
		if (nav == 'hash') {
			window.addEventListener('hashchange', this._hashChange.bind(this))
		}
		
		if (nav == 'history') {
			window.addEventListener('popstate', this._popstate.bind(this))
		}
	}
	
	
	/**
	 * checks if view has been mounted and toggle _hidden_ attribute
	 * sets currentViewID to currently on-screen view
	 */
async manageView(view) {
		if (view.origin != undefined && view.origin != false) {
			await this.fetchView(view.origin, view.id);
			view.origin = undefined;
		}
		
		let viewEl = document.getElementById(view.id);
		if (viewEl == null) {
			throw new Error(`No such template as: ${view.id}`)
		}
		
	
		if (this.currentViewID != null && this.currentViewID != view.id) {
			//currentViewID Exists!
			let cv = this.convertToView(this.currentViewID)
			await this.manageLifecycle('beforeLeave', cv)
			await this.vAnimate('beforeLeave', document.getElementById(this.currentViewID)) // animate out and hidden = true;
			this.container.insertAdjacentElement('afterend', document.getElementById(this.currentViewID))
			this.container.innerHTML = '';
			this.manageLifecycle('onLeave', cv);
		}

		this.manageLifecycle('beforeEnter', view)
		this.container.appendChild(viewEl) // put in container with hidden attribue
		await this.vAnimate('onEnter', viewEl) // hidden = false and animate in;
		this.manageLifecycle('onEnter', view);
		
		this.previousViewID = this.currentViewID;
		this.currentViewID = view.id;
		this.previousPath = this.currentPath
		this.currentPath = view.path;
	}


	vAnimate(action, view) {
		if (action == 'onEnter') {
			if (view.dataset.vIn) {
				return new Promise(resolve => {
					view.hidden = false;
					view.classList.add(view.dataset.vIn)
					if (animationExists(view)) {
						view.addEventListener('animationend', (e) => {
							view.classList.remove(view.dataset.vIn)
							resolve()
						}, {once: true})
					} else {
						view.classList.remove(view.dataset.vIn)
						resolve(false)
						return true;
					}
				})
			} else {
				view.hidden = false;
			}
		} else if (action == 'beforeLeave') {
			if (view.dataset.vOut) {
				return new Promise (resolve => {
					view.classList.add(view.dataset.vOut)
					if (animationExists(view)) {
						view.addEventListener('animationend', (e) => {
							view.hidden = true
							view.classList.remove(view.dataset.vOut)
							resolve()
						}, {once: true})
					} else {
						view.hidden = true
						view.classList.remove(view.dataset.vOut)
						resolve()
					}
				 })
			} else {
				view.hidden = true;
			}
		}

		// helper func: get animation-duration of view
		function animationExists (view) {
			return parseFloat(window.getComputedStyle(view).getPropertyValue('animation-duration')) > 0;
		}
	
	}



	async fetchView (origin, id) {
		try {
			//let page = new URL(origin, document.baseURI).href
			let res = await fetch(origin);
			if (!res.ok) {
			 let err = `An error has occurred: ${res.status}`;
			 throw new Error(err);
			}
			
			const html = await res.text();
			let parser = new DOMParser();
			let doc = parser.parseFromString(html, 'text/html');
			let view = doc.getElementById(id);
			this.container.insertAdjacentElement('afterend', view)
			
		} catch(error) {
			console.log(error);
		}
	}
	
	
	/**
	 * NEW HOOKS
	 * Returns ViewRouter Lifestyle methods
	 * hook methods: beforeEnter(), onEnter(), beforeLeave() and onLeave()
	 * returns onEnter() whenever view comes on screen
	 * emits data [Object] argument in hooks callback function
	 */
	manageLifecycle(action, view) {
		if (view == undefined || view.hooks == undefined) {
			return false;
		}
		
		let data;
		// beforeLeave and onLeave
		if (action == 'beforeLeave' || action == 'onLeave') {
		 data = {
		  previous: {
		   view: document.getElementById(this.previousViewID),
		   id: this.previousViewID,
		   path: this.previousPath,
		  },
		  current: {
		   view: document.getElementById(this.currentViewID),
		   id: this.currentViewID,
		   path: this.currentPath
		  }
		 }
		}
		
		// beforeEnter and onEnter
		if (action == 'beforeEnter' || action == 'onEnter') {
		  data = {
		   previous: {
		   view: document.getElementById(this.currentViewID),
		   id: this.currentViewID,
		   path: this.currentPath
		  }, 
		  current: {
		   view: document.getElementById(view.id), 
		   id: view.id, 
		   path: view.path
		  }
		 }
		}
		
		//resetScroll implementation
		if (this.options.resetScroll && action == 'beforeEnter') {
		 window.scrollTo(0, 0)
		}
		
		
		if (action == 'beforeEnter' && view.hooks.beforeEnter != undefined) {
			view.hooks.beforeEnter(data)
		}
		
		if (action == 'onEnter' && view.hooks.onEnter != undefined) {
			view.hooks.onEnter(data)
		}
		
		if (action == 'beforeLeave' && view.hooks.beforeLeave != undefined) {
			view.hooks.beforeLeave(data)
		}
		
		if (action == 'onLeave' && view.hooks.onLeave != undefined) {
			view.hooks.onLeave(data)
		}
	}
	
	/**
	 * Hide visible view from screen
	 */
	 hideView(view) {
	 	if (this.currentViewID == view) {
	 		document.getElementById(view).hidden = true;
	 	}
	 }

	
	/**
	 * Navigate to url hash path on hash change event
	 * Handles unspecified url path by call this.notFound bound function
	 * @var re: represents the return value of notFound() callback
	 * Hide view if re is true or undefined
	 * Navigates to view id if re value is a string
	 */
	_hashChange() {
		let path = window.location.hash.split('#')[1];
		let view = this.convertToView(path)
		
		if (view == undefined) {
			this.handle404(path)
			return false;
		} else {
			this.show(view)
		}
	}
	
	
	/**
	 * Note that the popstate event is not triggered by pushstate()
	 * _popstate is triggered by browser navigation - back/forward button
	 * e.state is null when browser navigation calls undefined path
	 * e.state is not null when browser navigation calls existing path
	 * If e.state is null, the return value (re) of notFound() callback is considered
	 * Hide view if re is true or undefined;navigates to view id if re value is a string
	 */
	_popstate(e) {
		if (e.state == null) {
			this.handle404(window.location.pathname)
			return false;
		}
		
		let currentPath = e.state.path
		this.show(this.convertToView(currentPath))
	}
	
	
	/**
	 * Handle callback for unspecified path
	 * If callback returns false, view dissapears from screen
	 * If callback returns true, view remains in screen. 
	 * Default behaviour is false
	 * @param {path} - the undefined path
	 * @returns current path and undefined path in `notFound`
	 */
	 handle404(path) {
	 	let re = this.saveNotFound(this.currentPath, path)
	 	if (re == true || re == undefined) {
	 		this.hideView(this.currentViewID);
	 		this.currentPath = null
	 	} else if (typeof(re) == 'string') {
	 			this.show(this.convertToView(re));
	 	}
	 }
	
	
	
	
} //CLASS END




