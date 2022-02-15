# Setup 🎈
It is so easy to get started with View Router. First, define your `view` in HTML. <br>
Each view is identified by its `id` attribute and must include the ```v-router``` class
```html
<div id='page1' class='v-router' hidden>
<!-- view -->
</div>
```
Your view must also have the `hidden` attribute. This will make the view 'off-screen' by default. Displaying views will be handled internally by View Router.

## Container
The `v-router-container` contains the view that is currently on-screen (that is, visible). All hidden views are placed outside of the container until they become visible. The container is automatically created and appended right below body tag if not already created.
```html{2-4}
<body>
    <div id="v-router-container">
        /* The visible view stays here */
    </div>

    /* Hidden views are moved outside the container */
</body>
```

You can use the  `v-router-container` to position the visible view separately in the page, style to fit the whole page or place below an header e.t.c

## Enable View Router
After defining your views in HTML, you can then enable View Router in your javascript file
```js

const v = new ViewRouter(/* options */)
```
All that remains is to configure the options and make great stuff 🎉