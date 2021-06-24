# View Router

<p align="center">A minimal, super simple on-page router ⚡ </p>

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
 ## Features
 View Router is a simple solution to navigation between views. <br>
 
 🌠 Super fast and minimal <br>
 🌠 Includes view transitions <br>
 🌠 Easy to set up <br>
 🌠 Hash or history API navigation (optional) <br>
 🌠 Small sized (<10kb) <br>
 
 
 ## Demo
 You might want to see how it works in a test environment before installing: <br>
 Demo coming soon
 
 ## Installation
 ### NPM
 ```
 npm i @bukunmikuti/view-router
 ```
 ### Script tag (browser)
 ```html
 <script src="cdn"></script>
 ```
 ### ES Module
 ```javascript
 import ViewRouter from "cdn"
 ```
 
 ## Set up
 View router exposes a single object: ```ViewRouter```, where you can pass your options and control the router.
 
 ```javascript
 const ViewRouter = new ViewRouter(options)
 ```

 This class object should be initialized by passing an [Object object] which must include ```views: []``` and other optional properties.
 
 ```javascript
 const ViewRouter = new ViewRouter({
	views: [], //required
	navigation: "history"||"hash",
	transitions: true||false, 
})
 ```
 ### Options: ```views: []```
 Type: Array of objects [{...}]<br>
 description: This property stores each view's property in an object. It can contain several views.
 
  ```javascript
 const ViewRouter = new ViewRouter({
	views: [
		{
			id: "login", //string (required)
			path: "/login", //string
			origin: "/login.html", //string
			mounted() {}, //callback
			render() {} //callback
		},
		
		{/* another view */}
		{/* another view */}
	]
})
 ```