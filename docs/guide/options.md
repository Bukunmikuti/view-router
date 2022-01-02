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
 ```Description:``` This property stores each view's property in an object. It can contain several view definitions.
 ```Type:``` Array of objects<br>
 
 ```javascript
 const viewrouter = new ViewRouter({
	views: [
		{
			id: "login", //required
			path: "/login",
			origin: "/login.html",
		},
		{/* another view */}
		{/* another view */}
	]
})
 ```
 A view definition should include the following properties:
 
 | View property | Description | Default Value |
| :---------------: | :---------------: | :---------------: |
| ```id``` | The 'id' attribute of the template tag <Badge type="tip" text="required" vertical="top" />| undefined |
| ```path``` | The URL path that triggers the view | undefined |
| ```origin``` | If the view is located in another html document, this will contain the relative path to the document. | undefined |