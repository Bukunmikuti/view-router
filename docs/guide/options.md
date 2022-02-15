# Options 🔧
There are several options you can pass into a View Router instance. 
```js
const v = new ViewRouter({
    views: [], //required
    navigation: 'history'||'hash',
    notFound: () {},
    resetScroll: true||false,
})
```

## ```views``` <Badge type="tip" text="required" vertical="top" />
 ```Description:``` This property stores each view's property in an object. It can contain several view definitions.<br>
 ```Type:``` Array of objects<br>
 
 ```javascript
 const v = new ViewRouter ({
	 views: [
		 {
			 id: "login", //required
			 path: "/login",
			 origin: "/login.html",
		 },
		
		{/* another view definition */}
		{/* another view definition */}
	]
})
 ```
 A view definition should include the following properties:
 
 | View property | Description |
| :---------------: | :---------------: |
| ```id``` <Badge type="tip" text="required" vertical="top" /> | The HTML `id` attribute of the template tag |
| ```path``` | The URL path that triggers the view |
| ```origin``` | If the view is located in a different HTML document, this will contain the relative path to the document. |
| ```hooks``` | This contains all lifecycle methods attached to the view |

### Lifecycle Hooks
Use the lifecycle hooks inside a view definition to create a callback that runs at each specified lifecycle phase.
```js{7-12}
const v = new ViewRouter ({
	views: [
		{
			id: "login",
			path: "/login",
			origin: "/login.html",
			hooks: {
				beforeEnter(data) {},
				onEnter(data) {},
				beforeLeave(data) {},
				onLeave(data) {},
			}
		},

		{/* another view definition */}
	]
})
```
There are four phases of lifecycle for every view - `beforeEnter`, `onEnter`, `beforeLeave` and `onLeave` (**executed accordingly**)
 | Lifecycle | Description |
| :---------------: | :---------------: |
| ```beforeEnter``` | This is called before the view enters the screen and after the previous screen is out of screen|
| ```onEnter``` | This is called when the view is now on screen |
| ```beforeLeave``` | This hook is called before the view leaves the screen. The view is still visible although a new view has been called|
| ```onLeave``` | The view has left the screen and is now hidden. The incoming view is also not on screen yet. |

All lifecycle hooks receives a `data` argument. `data` is an object which contains some properties of the previous and current view.
```js
data: {
	previous: {
		view: HTMLElement, //PREVIOUS view Element
		path: String,
		id: String
	}, 
	current: {
		view: HTMLElement, //CURRENT view Element
		path: String,
		id: String
	}
}
```
`data.previous` - Contains previous view data.<br>
`data.current` - Contains current view data

::: warning CAUTION ⚠
- The HTMLElement from `data.current.view` might be hidden when accessed from `beforeEnter` and `onLeave` hooks. This is because the view is not visible and still has the `hidden` attribute at that phase in the lifecycle.
- The same applies to `data.previous.view` in certain hooks where the previous view is already hidden <br>

- It is not advisable to toggle the `hidden` attribute on any view using hooks. Let View Router handle this for you natively.
:::

You can also define hooks using the [`setHook`](#hooks) method.