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
 
 > View Router is not in any way related to [vue-router](https://github.com/vuejs/vue-router) the official router of vue.js, neither are they alternatives. 
 > 
 > View Router is a simple standalone in-page navigator.
 
 -------------------------
 
 # Features 🎉
 View Router is a simple library that helps you navigate between different views with style<br>
 
 - Super fast and minimal <br>
 - Includes view transitions <br>
 - Easy to set up <br>
 - History API or hash navigation — Optional<br>
 - Small sized (<10kb) <br>
 
 
 # Demo
 You might want to see how it works in a test environment before installing: <br>
 Demo coming soon
 
 # Installation
View Router ships a browser build for 
```<script>``` tags 
and an ES Module format. You can also install via npm.
<details>
<summary>Check all options</summary>

 ### NPM
 ```
 npm i @bukunmikuti/view-router
 ```
 ### Script include
 ```html
 <script src="cdn"></script>
 ```
 ### ES Module
 ```javascript
 import ViewRouter from "cdn"
 ```
</details>
 
 # Set up 🛰️
 View router exposes a single object: ```ViewRouter``` where you can pass your options.
 
 ```javascript
 const viewrouter = new ViewRouter(options)
 ```

 Instantiate the class by passing an object parameter which must include ```views: []``` and other optional properties.
 
 ```javascript
 const viewrouter = new ViewRouter({
	views: [], //required
	navigation: "history"||"hash",
	transition: true||false, 
})
 ```

 <details>
 <summary>

## ```views: []```

</summary>

 ```Type:``` Array of objects — required <br>
 ```Description:``` This property stores each view's property in an object. It can contain several view definitions.
 
 ```javascript
 const viewrouter = new ViewRouter({
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
 A view definition should include the following properties:
 
 | View property | Description | Default Value |
| :---------------: | :---------------: | :---------------: |
| ```id``` | The 'id' attribute of the template tag — Required| undefined |
| ```path``` | The URL path that triggers the view when navigated to. | undefined |
| ```origin``` | If the view is located in another html document, this will contain the relative path to the document. | undefined |
| ```mounted``` | Views are not part of the DOM by default, they only get mounted when routed to for the first time. Put any logic that depends on accessing elements of the view here. It is called only once | callback undefined |
| ```render``` | This method is called each time a view is routed to | callback undefined |
</details>

<details>
<summary>

## ```navigation```

</summary>

 ```Type:``` String — history or hash (optional) <br>
 ```Description:``` Use hash navigation or Web history API. If undefined or false then routing is automatically disabled, else ```views: [{path: ""}]``` must be specified.
 </details>

<details>
<summary>

## ```transition```

</summary>
  
 ```Type:``` Boolean — optional<br>
 ```Description:``` Enable or disable view transitions. Transition type must be specified on the view ```<template>``` tag. <br>All transitions — ```fadeIn``` ```fadeInTop``` ```fadeInBottom``` ```fadeInLeft``` ```fadeInRight```
 
 ```html
 <!--index.html-->
 <template id="login" class="v-router fadeInLeft"></template>
 
 <script type="module">
 import ViewRouter from "..."
 
 let v = new ViewRouter({
  //...
  transition: true
 })
 </script>
 
 ```
</details>

<details>
<summary>

## Methods

</summary>

| Method | Description | Return Value |
| :---------------: | :---------------: | :---------------: |
| ```routeTo()``` | Navigate to the specified view. Accepts view id as parameter | executes render() |
 </details>

 # Contribution
 You can contribute by making pull requests to fix issues, 
dropping a code review/demo example or updating the readme.<br>
Your objectives should be clearly stated<br>
Thank you! 

 # Liscense
 This project is available under the [ISC Liscense]()
