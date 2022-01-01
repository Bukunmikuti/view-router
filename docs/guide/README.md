# Introduction
## What is View Router?
View Router is a minimal in-page (or sometimes called, on-page) navigation library. View Router helps manage multiple ```views``` in a page by providing flexible routing methods to control what is on page at any particular instance.<br><br>
View Router does not replace client-side routers but can be used alongside for flexible routing options.

## In-page Navigation
In-page navigation refers to how users are directed to different sections (we call them ```views```) of a webpage without a browser reload. A common example is toggling a full-screen prompt modal while on a page, or a checkout page coming up on screen.<br><br>
While this might sound like what a client-side router does (and much more), View Router eliminates the complexity and code overhead of using a fully-fleged client-side router for these navigations especially for static views - with added support for transitions. 😎<br><br>
**To further understand in-page navigations:**
- [https://www.oreilly.com/library/view/designing-web-navigation/9780596528102/ch04.html](https://www.oreilly.com/library/view/designing-web-navigation/9780596528102/ch04.html) check *internal page navigation* 
- [https://www.w3.org/WAI/tutorials/page-structure/in-page-navigation/](https://www.w3.org/WAI/tutorials/page-structure/in-page-navigation/) W3C - An in-progress draft on in-page navigation

## How View Router Works
View Router collects all views defined by the HTML ```id``` attributes. Navigation to any specific view is triggered by a provided method which modifies either the URL hash (hash-based navigation) or History entry (via History API) to bring the view in/out of screen. These navigations can be attached to callbacks through hooks, for defined behaviours of the entry and exit of each view.<br>
### Transitions
View Router provides a native, out-of-the-box, support for transitions. You can either use the prebundled transitions in ```viewrouter.css``` together with the ```v-in``` and ```v-out``` attribute, use a proper animation library like GSAP, or your custom solution 😉. <br><br>
You would see how to implement all these later on in the docs.