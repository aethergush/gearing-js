

# Gearing • js

> ### Crafted by @AetherGush

**An SVG and JavaScript library for rendering beautiful 2D graphics on a browser!!** *YAY*

OK!! Guess your here to use Gearing, so you need to learn about it.

So, first I'd advise you to add a proper HTML document to a project repo/folder, otherwise it might be a bit hard to run your code (apart if you're using some sort of code editor like CodePen or JSBin). I'd also advise you to add jQuery (because it makes life easier — if you don't want it, you can check out youmightnotneedjquery.com, which is really cool for *not* using jQuery). So, it should be kinda like THIS:

```html
<!doctype HTML>

<html>
<head>
	<!-- jQuery -->
	<script src="https://code.jquery.com/jquery-3.1.4.min.js"></script>
	<!-- Gearing.js -->
	<script src="https://aethergush.github.io/gearing-js/dist/gearing.min.js"></script>
</head>
<div id="my-drawing-area"></div>
<script type="text/javascript">
	// our code goes here
</script>
</html>
```

The `<div>` with `#my-drawing-area` is — guess what? The drawing area!! Where the graphics are gonna go, basically.

So, easy. Now let's actually add code to do something because now our code just gives us a white, blank page, which is pretty boring especially if you're aiming to do a Gearing page.

So, let's add some code! First of all, we ***obviously*** need to add a `new Gearing()` attached to a variable to actually be able to run the code. So, in the `<script>` with `// our code goes here`, add:

```js
var element = $("#my-drawing-area");

var gear = new Gearing({
	fullscreen: true
}).appendTo(element);

// our code goes here

gear.update();
```

Epic and easy. The `gear.update()` draws and updates the screen.

Whoah, wait a minute!! It's all good we've got a drawing space set up, but... — What's this `fullscreen: true` thing about? It just means that the drawing (or generated SVG) will constantly be updated to have a width and height of the browser screen itself.

But some people *wouldn't* want that!! So let's try to remove it, by doing this:

```js
var element = $("#my-drawing-area");

var gear = new Gearing({
	width: 300,
	height: 250 // or whatever
}).appendTo(element);

// our code goes here

gear.update();
```

You'll notice that in further examples I'll keep the fullscreen param.

So. A blank page again, even with a bit of code. When are we gonna get to drawing something?

Never. (Just kidding)

So, let's add some code to draw a circle:

```js
var element = $("#my-drawing-area");

var gear = new Gearing({
	width: 300,
	height: 250 // or whatever
}).appendTo(element);

var textStyle = {  
	size: 18,  
	family: 'Lato'
};

var circle = two.makeCircle(150, 250, 75);
circle.fill = 'yellow';
circle.noStroke();
two.makeText('My groovy(?) circle', 150, 250, textStyle);

gear.update();
```

You probably noticed that this also creates text, inside the circle.

That's all for now!! I'll continue this incredible tutorial later!!!
