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
 
 - [x] Make current view 'disappear' or go off screen if back button is pressed and there is no view to nativage to. <br><br>
 **Current behaviour:** The browser does nothing when back button is clicked and exits page on second click <br><br>
 **Expected behaviour:** To remove current view from screen by making it disappear <br><br>
 **Caveat:** When a template is the base view, clicking back to remove it from screen might not be user friendly
 - [ ] refine Lifecycle hooks to help handle views entry and exit more effectively



 # Updates 🚀
 v1.1.1 updates - Two new methods 
 
## ```start```<br>
Description: Make ViewRouter navigates to the url path on page load. This function accepts a callback function which takes just one argument which is the view ID of the url path. <br>

> **Note:** You can call ```routeTo()``` inside callback function to navigate to your base/default view if the callback function returns undefined (that is, path on page load does not exist). 

## ```notFound()```<br>
Description: Defines ViewRouter behaviour if url path does not exist in ```views:[]```. This function executes a callback function which accepts two arguments
		- ```previous path``` (optional): The former path where the navigation comes from
		- ```current path``` (optional): The unmatched and non-existent view path
	The callback function executes whenever there is a navigation to an unmatched path. 

> **Note:** You cannot call ```routeTo()``` inside this callback. To navigate to a 404 view or any other view, you must return the view ID instead. For example ```return "404"``` navigates to a 404 view. <br> ```return true``` or ```undefined```, takes the current view out of the screen while ```return false``` leaves the view on screen. 

## Breaking Changes
- removed ```transition``` property
- view router is now distributed in two build: defaut build (with transitions) and core build (excluding all transitions)
> **Note:** Default build comes with all transition classes prebundled while the core build defines only view router main functionality. You can use the ```viewrouter.css``` file in the distribution to include transitions seperately or use a different animation library to handle transitions.
