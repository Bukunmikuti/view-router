import fetchView from './fetch_view.js'

export default class ViewRouter {
	constructor (options) {
		this.options = options;
		this.views = this.options.views;
		this.manageNavigation(this.options.navigation);
		
		//other inits
		this.mountedViews = [];
		this.previousView; //previous view ID
		this.currentView; //current view ID
		this.currentPath;
		this.saveNotFound = this.options.notFound
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
				if (view.id != this.currentView) {
					this.show(view);
					window.history.pushState({path:view.path, id:view.id} ,'', view.path)
				}
				break;
			default:
				if (view.id != this.currentView) {
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
		/*this.manageLifecycle(view);*/
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
	 * calls mountView() if view has not been mounted
	 * sets currentView to currently on-screen view
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
		
		if (this.currentView != null && this.currentView != view.id) {
			//currentView Exists! 
			let cv = this.convertToView(this.currentView)
			this.manageLifecycle('beforeLeave', cv);
			document.getElementById(this.currentView).hidden = true;
			this.manageLifecycle('onLeave', cv);
		}

		if (this.mountedViews.includes(view.id) == false) {
			this.manageLifecycle('beforeEnter', view);
			this.mountView(temp, temp.content, view.id);
			this.manageLifecycle('onEnter', view)
		} else {
			this.manageLifecycle('beforeEnter', view)
			temp.hidden = false;
			this.manageLifecycle('onEnter', view);
		}
		
		this.previousView = this.currentView;
		this.currentView = view.id;
		this.currentPath = view.path;
	}
	
	
	/**
	 * NEW HOOKS
	 * Returns ViewRouter Lifestyle methods
	 * View methods: beforeEnter(), onEnter(), beforeLeave() and onLeave()
	 * returns onEnter() whenever view comes on screen
	 */
	manageLifecycle(action, view) {
		if (view == undefined || view.hooks == undefined) {
			return false;
		}
		
		if (action == 'beforeEnter' && view.hooks.beforeEnter != undefined) {
			//implemented
			view.hooks.beforeEnter()
		}
		
		if (action == 'onEnter' && view.hooks.onEnter != undefined) {
			//implemented
			let element = document.getElementById(view.id)
			view.hooks.onEnter(element)
		}
		
		if (action == 'beforeLeave' && view.hooks.beforeLeave != undefined) {
			//implemented
			let element = document.getElementById(view.id)
			view.hooks.beforeLeave(element)
		}
		
		if (action == 'onLeave' && view.hooks.onLeave != undefined) {
			//implemented
			view.hooks.onLeave()
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
		hiddenDiv.hidden = false;
		hiddenDiv.id = id;
		hiddenDiv.className = temp.className;
		temp.parentNode.replaceChild(hiddenDiv, temp);
		this.mountedViews.push(id);
	}
	
	
	/**
	 * Hide visible view from screen
	 */
	 hideView(view) {
	 	if (this.currentView == view) {
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
	
	
	$animate(sel) {
		console.log(sel)
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
	 		this.hideView(this.currentView);
	 		this.currentPath = null
	 	} else if (typeof(re) == 'string') {
	 			this.show(this.convertToView(re));
	 	}
	 }
	
	
	
	
} //CLASS END




