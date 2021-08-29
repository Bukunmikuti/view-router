import embedTransition from './transitions.js';
import fetchView from './fetch_view.js'

export default class ViewRouter {
	constructor (options) {
		//options is an object {...}
		this.options = options;
		this.views = this.options.views;
		this.enableTransition();
		this.manageNavigation(this.options.navigation);
		
		//other inits
		this.mountedViews = [];
		this.previousView; //previous view ID
		this.currentView; //current view ID
		this.currentPath;
	}
	
	
	routeTo(id) {
		let view;
		this.views.some((route) => {
			if (route.id == id) {
				view = route;
				return true;
			}
		})
		
		if (view == undefined) {
			throw new Error(`ViewRouter: Cannot find view ID of ${id}`);
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
					window.history.pushState({view:view.path} ,'', view.path)
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
		this.manageLifecycle(view);
	}
	
	/**
	 * check navigation preference and set up behaviour
	 * add event listener based on navigation type
	 */
	manageNavigation(nav) {
		if (nav == 'hash') {
			window.location.hash = '';
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
			this._error(`No such template as: ${view.id}`)
		}
		
		if (this.currentView != null && this.currentView != view.id) {
			document.getElementById(this.currentView).hidden = true;
		}

		if (this.mountedViews.includes(view.id) == false) {
			this.mountView(temp, temp.content, view.id);
		} else {
			temp.hidden = false;
		}
		
		this.previousView = this.currentView;
		this.currentView = view.id;
		this.currentPath = view.path;
	}
	
	
	/**
	 * Returns ViewRouter Lifestyle methods
	 * methods: mounted and render
	 */
	manageLifecycle(view) {
		//mounted callback
		if (view.mounted != undefined) {
			view.mounted();
			view.mounted = undefined;
		}
		
		//render callback
		if (view.render != undefined) {
				view.render();
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
	
	
	enableTransition() {
		if (this.options.transition) {
			embedTransition();
		}
	}
	
	
	_hashChange() {
		let currentPath = window.location.hash.split('#')[1];
		
		this.views.some((view) => {
			if (view.path == currentPath) {
				//path exists in ViewRouter config
				this.show(view)
				return true;
			}
		})
	}
	
	
	_popstate(e) {
		if (e.state == null) {
			console.log('null')
			window.history.go(-1);
			return false;
		}
		
		let currentPath = e.state.view
		
		this.views.some((view) => {
			if (view.path == currentPath) {
				this.show(view)
				return true;
			}
		})
	}
	
	
	
	
}