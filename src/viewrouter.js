import fetchView from './fetch_view.js'

export default class ViewRouter {
	constructor (options) {
		this.options = options;
		this.views = this.options.views;
		this.manageNavigation(this.options.navigation);
		
		//other inits
		this.mountedViews = [];
		this.previousViewID; //previous view ID
		this.previousPath;
		this.currentViewID; //current view ID
		this.currentPath;
		this.saveNotFound = this.options.notFound
		
		this.resetAllViews()
	}
	
	
	resetAllViews() {
		let views = document.querySelectorAll('.v-router');
		views.forEach(view => {
			let temp = document.getElementById(view.id)
			this.mountView(temp, temp.content, view.id);
		})
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
	 * calls mountView() if view has not been mounted - BREAKING: All views have already been mounted by resetAllViews() on initialization
	 * sets currentViewID to currently on-screen view
	 */
async manageView(view) {
		if (view.origin != undefined && view.origin != false) {
			await fetchView(view.origin, view.id);
			view.origin = undefined;
		}
		
		let temp = document.getElementById(view.id);
		if (temp == null) {
			throw new Error(`No such template as: ${view.id}`)
		}
		
		if (this.currentViewID != null && this.currentViewID != view.id) {
			//currentViewID Exists! 
			let cv = this.convertToView(this.currentViewID)
			this.manageLifecycle('beforeLeave', cv);
			document.getElementById(this.currentViewID).hidden = true;
			this.manageLifecycle('onLeave', cv);
		}

		this.manageLifecycle('beforeEnter', view)
		temp.hidden = false;
		this.manageLifecycle('onEnter', view);
		
		this.previousViewID = this.currentViewID;
		this.currentViewID = view.id;
		this.previousPath = this.currentPath
		this.currentPath = view.path;
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
	 * replace <template> with <div>
	 * make div hidden
	 * add div/view ID to mountedViews[]
	 */
	mountView(temp, content, id) {
		let hiddenDiv = document.createElement('div');
		hiddenDiv.append(content);
		hiddenDiv.hidden = true;
		hiddenDiv.id = id;
		hiddenDiv.className = temp.className;
		temp.parentNode.replaceChild(hiddenDiv, temp);
		this.mountedViews.push(id);
	}
	
	
	/**
	 * Hide visible view from screen
	 */
	 hideView(view) {
	 	if (this.currentViewID == view) {
	 		console.log(view)
	 		document.getElementById(view).hidden = true;
	 	}
	 }

	
	/**
	 * Navi to url hash path on hash change event
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




