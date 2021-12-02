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
 Roadmap and checklist for v2.0.0 release
 
 - [x] Make current view 'disappear' or go off screen if back button is pressed and there is no view to nativage to. <br>
 **Current behaviour:** The browser does nothing when back button is clicked and exits page on second click <br>
 **Expected behaviour:** To remove current view from screen by making it disappear <br>
 **Caveat:** When a template is the base view, clicking back to remove it from screen might not be user friendly <br><br>
 - [x] refine Lifecycle hooks to help handle views entry and exit more effectively. <br>
 **proposed Lifecycle hooks:** <br> beforeEnter() <br> onEnter() <br> beforeLeave() <br> onLeave() 
 
- [x] Change from using ```<template></template>``` to define views to using any block-level elements. This removes the need to mount views.
- [x] Use HTML attributes to specify in and out transitions. ```data-v-in="fade-in"``` and ```data-v-out="fade-out"```
- [x] Implement scroll options — ```resetScroll: true||false```



 # Updates 🚀
 v2.0.0 updates - Two new methods 

 ## New Lifecycle Methods

 **Description:** v2.0.0 introduces new lifecycle hooks: ```beforeEnter```, ```onEnter```, ```beforeLeave``` and ```onLeave```. 
 ```javascript
 let v = new ViewRouter({
   views: [
     {
       hooks: {
        beforeEnter(data){},
        onEnter(data){},
        beforeLeave(data){},
        onLeave(data){}
      }
    },
  ]
 ```

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
  id: String
 }, 
}
```
**```data.previous```:** Contains previous view data.<br> 
**```data.current```:** Contains current view data


**Lifecycle hooks:** <br>
**```beforeEnter```:** The view is called but yet to be displayed. Note that the previous view is out of screen by now. It is called after ```onLeave``` of the previous view. <br><br>

**```onEnter```:** The view is now on screen. This hook is called after ```beforeEnter``` <br><br>

**```beforeLeave```:** This hook is called before the current view leaves the screen. That is, the view is still on screen though  a new view has been called. <br><br>

**```onLeave```:** The view is now out of screen and the incoming view is also not on screen. It is called before ```beforeEnter``` of incoming view

> **Caution 💡:** <br>
The HTMLElement from ```data.current.view``` might be hidden when accessed from ```beforeEnter``` and ```onLeave``` hooks. This is because the ```data.current``` is not visible yet.

---
 
## ```start```<br>
**Description:** Make ViewRouter navigates to the url path on page load. This function accepts a callback function with just one argument which is the view ID of the url path on page load. It is defined outside the ```new ViewRouter()``` instance.<br>
```javascript
let v = new ViewRouter({...});

v.start((id) => {
  if (id == undefined) {
    v.routeTo('welcome')
  }
  
  if (id == 'dashboard' && isLogin == false) {
    v.routeTo('login')
  }
})
```

> **Note:** You can call ```routeTo()``` inside callback function to navigate to your base/default view if the callback function returns undefined (that is, path on page load does not exist). 

## ```notFound()```<br>
**Description:** This function executes whenever there is a navigation to an unmatched path (that is, the requested url path does not exist in ```views:[]```).  <br>
This method executes a callback function which accepts two arguments:
- ```previous path``` (optional): The former path where the navigation comes from
- ```current path``` (optional): The unmatched and non-existent view path.

```javascript
let v = new ViewRouter({
  views: [...],
  notFound: (prev, curr) {
    return '404' // 404 is a view ID
  }
})
```
> **Note:** You cannot call ```routeTo()``` inside this callback. To navigate to a 404 view or any other view, you must return the view ID instead. For example ```return "404"``` navigates to a 404 view. <br> ```return true``` or ```undefined```, takes the current view out of the screen while ```return false``` leaves the view on screen. 

## ```resetScroll```
**Description:** Navigation to a new view preserves the window scroll position, this is the expected browser behaviour. However, this is usually unintuitive when a view takes up the whole screen. ```resetScroll: true``` returns scroll position to top of the screen when entering a new view. <br>
> **Note:** If you want a more elegant solution to scroll implantation, you can set ```resetScroll:false``` and use hooks to adjust scroll effects. 

## ```data-v-in``` and ```data-v-out``` attributes
**Description:** Introduced new HTML data attributes to apply in and out animations on views. These attributes should be used to apply animation classes. 
```html
<div id='view' data-v-in='fade-in' data-v-out='fade-out'>
  <!-- view -->
</div>
```
> **Note:** You can use the prebundled animations from ```viewrouter.css``` (also in the default library build) to apply on views or your custom animation classes.

# Breaking Changes 🚩
- Changed lifecycle hooks. ```render()``` and ```mounted()``` are no longer supported.
- Removed ```transition``` property.
- View Router is now distributed in two formats: UMD and ES module. View Router also ships some default entry/exit transition classes for views.
> **Note:** <br> Check ```viewrouter.css``` for simple entry and exit animatons for views. It also includes all animations in ```viewrouter.slim.css```. Amimation classes should be used with  ```data-v-in(out)``` attributes. These animations can also be used alongside with fully-fledged animation libraries like GSAP, popmotion, e.t.c
- The use of ```template``` tags to define views in HTML is now deprecated and should not be used anymore. Use any block-level container (like ```div``` or ```section```) to define views instead.

*Deprecated:*<br> 
```html 
<template id='page1' class='v-router'>
  <!-- view -->
</template>
```
*Now use:*<br>
```html
<div id='page1' class='v-router' hidden>
<!-- view -->
</div>
```

# Bugs
- wrong or non-existent animation class in ```data-v-in``` or ```data-v-out``` breaks ```vAnimate``` [**FIXED** - used ```animationExists()```]


# Credits 🙌
## [Animista](https://animista.net/)
All transitions in ```viewrouter.css``` and ```viewrouter.slim.css``` was generated by [Animista](https://animista.net/)
