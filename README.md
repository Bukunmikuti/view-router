# View Router

<p align="center">A minimal, super simple in-page router ⚡ </p>

<p align="center">
<a href="#">
  <img src="https://img.shields.io/bundlephobia/min/@bukunmikuti/hello?color=Blue&style=flat-square">
</a>
 <a href="">
 <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/Bukunmikuti/Hello?style=flat-square">
 </a>
 <a href="https://www.npmjs.com/package/@bukunmikuti/hello">
  <img alt="npm" src="https://img.shields.io/npm/v/@bukunmikuti/hello?style=flat-square">
 </a>
 </p>
 
 -------------------------
 ## Features 🎉
 View Router is a simple library that helps you navigate between different views with style<br>
 
 - Super fast and minimal <br>
 - Includes view transitions <br>
 - Easy to set up <br>
 - History API or hash navigation — Optional<br>
 - Small sized (<10kb) <br>
 
 
 ## Demo 🛩️
 You might want to see how it works in a test environment before installing: <br>
 Demo coming soon
 
 ## Installation
 ### NPM
 ```
 npm i @bukunmikuti/view-router
 ```
 ### </ script> tag (Browser)
 ```html
 <script src="cdn"></script>
 ```
 ### ES Module
 ```javascript
 import ViewRouter from "cdn"
 ```
 
 ## Set up ⛱️
 View router exposes a single object: ```ViewRouter```, where you can pass your options.
 
 ```javascript
 const ViewRouter = new ViewRouter(options)
 ```

 This class should be instantiated by passing a [object Object] which must include ```views: []``` and other optional properties.
 
 ```javascript
 const ViewRouter = new ViewRouter({
	views: [], //required
	navigation: "history"||"hash",
	transitions: true||false, 
})
 ```
 ### Options: ```views: []```
 ```Type:``` Array of objects [{...}] — required <br>
 ```description:``` This property stores each view's property in an object. It can contain several view definitions.
 
 ```javascript
 const ViewRouter = new ViewRouter({
	views: [
		{
			id: "login", //required
			path: "/login",
			origin: "/login.html",
			mounted() {}, //callback
			render() {} //callback
		},
		
		{/* another view */}
		{/* another view */}
	]
})
 ```
 Each view definition should include the following properties:
 
 | View property | Description | Default Value |
| :---------------: | :---------------: | :---------------: |
| ```id``` | The 'id' attribute of the view template tag — Required| undefined |
| ```path``` | The URL path that triggers the view when navigated to | undefined |
| ```origin``` | If the view is located in another html document, this will contain the relative path to the document. | undefined |
| ```mounted``` | Views are not part of the DOM by default, they only get mounted when routed to for the first time. Put any logic that depends on accessing elements in the view in this callback. It is called only once | callback undefined |
| ```render``` | This callback is called each time a view is routed to on the page | callback undefined |