# View Router

<p align="center">A minimal, super simple in-page router ⚡ </p>

<p align="center">
<a href="#">
 <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/min/@bukunmikuti/view-router?style=flat-square">
</a>
 <a href="https://www.npmjs.com/package/@bukunmikuti/view-router">
 <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@bukunmikuti/view-router?style=flat-square">
 </a>
 <a href="">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Bukunmikuti/view-router?logoColor=%23880000&style=flat-square">
 </a>
 </p>
 
 -------------------------
 
 > View Router is not in any way related to [vue-router](https://github.com/vuejs/vue-router) the official router of vue.js, neither are they alternatives. 
 > 
 > View Router is a simple standalone in-page navigator.
 
 -------------------------
 
 # Roadmap 🚧
 Roadmap and checklist for v1.1.1 release
 
 - [x] Make current view 'disappear' or go off screen if back button is pressed and there is no view to nativage to. <br>
 **Current behaviour:** The browser does nothing when back button is clicked and exits page on second click <br>
 **Expected behaviour:** To remove current view from screen by making it disappear <br>
 **Caveat:** When a template is the base view, clicking back to remove it from screen might not be user friendly <br><br>
 - [ ] refine Lifecycle hooks to help handle views entry and exit more effectively. <br>
 **proposed Lifecycle hooks:** <br> beforeEnter() <br> onEnter() <br> beforeLeave() <br> onLeave() 
 
---
All Lifecycle hooks receives a ```data``` argument:
```javascript
data: {
 previous: {
   view: HTMLElement //PREVIOUS view Element
   path: String 
   id: String
 }, 
 current: {
  view: HTMLElement //CURRENT view Element
  path: String //CURRENT path
  id: String
 }, 
}
```
**```data.previous```:** Contains previous view data. 
**```data.current```:** Contains current view data


**Note:** <br>
**```beforeEnter```:** The view is called but yet to be displayed. Note that the previous view is out of screen by now. It is called after ```onLeave``` of the previous view. <br><br>

**```onEnter```:** The view is now on screen. This hook is called after ```beforeEnter``` <br><br>

**```beforeLeave```:** This hook is called before the current view leaves the screen. That is, the view is still on screen though  a new view has been called. <br><br>

**```onLeave```:** The view is now out of screen and the incoming view is also not on screen. It is called before ```beforeEnter``` of incoming view

> **Caution 💡:** <br>
The current view from ```data.current.view``` might be off screen and hidden when accessed from ```beforeEnter``` and ```onLeave``` hooks. This is because the ```data.current``` only retrieves
data regarding the current view definition and not the incoming view

---

 - [ ] Use HTML attributes to specify in and out transitions. ```v:in="fade-in"``` and ```v:out="fade-out"``` or ```v:animate="fade-in fade-out"```
 - [ ] Implement scroll options — ```resetScroll: true||false```



 # Updates 🚀
 v1.1.1 updates - Two new methods 
 
## ```start```<br>
Description: Make ViewRouter navigates to the url path on page load. This function accepts a callback function which takes just one argument which is the view ID of the url path. It is defined outside the ```new ViewRouter()``` instance.<br>

> **Note:** You can call ```routeTo()``` inside callback function to navigate to your base/default view if the callback function returns undefined (that is, path on page load does not exist). 

## ```notFound()```<br>
Description: Defines ViewRouter behaviour if requested url path does not exist in ```views:[]```. This method executes a callback function which accepts two arguments
		- ```previous path``` (optional): The former path where the navigation comes from
		- ```current path``` (optional): The unmatched and non-existent view path.
		<br>
	This function executes whenever there is a navigation to an unmatched path. 

> **Note:** You cannot call ```routeTo()``` inside this callback. To navigate to a 404 view or any other view, you must return the view ID instead. For example ```return "404"``` navigates to a 404 view. <br> ```return true``` or ```undefined```, takes the current view out of the screen while ```return false``` leaves the view on screen. 

## ```resetScroll```
Description: Navigation to a new view preserves the window scroll position, this is the expected browser behaviour. However, this is usually unintuitive when a view takes up the whole screen. Therefore, setting ```resetScroll: true``` returns scroll position to top of the screen when entering a new view. <br>
> **Note:** If you want a more elegant solution to scroll implantation, you can set ```resetScroll:false``` and use hooks to adjust scroll effects. 

## Breaking Changes
- removed ```transition``` property
- view router is now distributed in two build: default build (with transitions) and core build (excluding all transitions)
> **Note:** <br> Default build comes with all transition classes prebundled while the core build defines only view router main functionality. You can use the ```viewrouter.css``` file in the distribution to include transitions seperately or use a different animation library to handle transitions.

## Credits
### Animista
All transitions in ```viewrouter.css``` and prebundled in the default build was generated by [Animista](https://animista.net/)