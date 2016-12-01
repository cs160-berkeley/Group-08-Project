var currentScent = "";
var currentScentString = "";

let scentText = new Style({ font: "24px Brandon Grotesque", color: "white" });
let scentTextStyle = new Style({ font: "20px Brandon Grotesque", color: "white"});
let backgroundGray = new Skin({fill: "#FFFFFF"})
let lavender = new Skin({fill: "#c282ed"});
let jasmine = new Skin({fill: "#80ff80"});
let vanilla = new Skin({fill: "#66ccff"});
let grass = new Skin({fill: "#39e600"});
let rain = new Skin({fill: "#0066ff"});
let forest = new Skin({fill: "#009900"});
let peaches = new Skin({fill: "#ff9966"});
let shake = new Skin({fill: "#cc9900"});
let cinammon = new Skin({fill: "#cc0000"});
let car = new Skin({fill: "#666699"});
let orange = new Skin({fill: "#ff9900"});
let lgreen = new Skin({fill: "#86BD3E"});
var lblue = new Skin({fill: "#66AEF2"});
let yellow = new Skin({fill: "#DFA20A"});
let dgreen = new Skin({fill: "#335115"});
let dblue = new Skin({fill: "#0254B6"});
var whiteBorderSkin = new Skin({

let isCurrentScent = 0;

let intensity = 8;
            currentScentString = $.string;


var flowers = new Container ({
	active: true, left: 0, width: 100, height: 70, top: 0, skin: lblue,
	behavior: Behavior({
		onTouchBegan: function(content) {
			scents.remove(currentOptions);
			currentOptions = flowerOptions;
			scents.add(currentOptions);
		}
	}), contents: [
		new Label({ string: "Flowers", style: scentTextStyle, bottom: 0}),
		new Picture({ url: "http://www.clker.com/cliparts/b/d/d/0/1368552262301808347Buttercup%20Flower%20Outline.svg.hi.png", top:5, height: 45})
	]
});
var outdoors = new Column ({
	active: true, left: 0, width: 100, height: 70,top: 70, skin: lgreen,
	behavior: Behavior({
		onTouchBegan: function(content) {
			scents.remove(currentOptions);
			currentOptions = outdoorOptions;
			scents.add(currentOptions);
		}
	}), contents: [
		new Picture({ url: "http://www.clker.com/cliparts/V/q/Y/F/8/B/tree-outline-md.png", top: 5, height: 45}),
		new Label({ string: "Outdoors", style: scentTextStyle, bottom: 0})
	]
});
var foods = new Container ({
	active: true, left: 0, width: 100, height: 70,top: 140, skin: yellow,
	behavior: Behavior({
		onTouchBegan: function(content) {
			scents.remove(currentOptions);
			currentOptions = foodOptions;
			scents.add(currentOptions);
		}
	}), contents: [
		new Label({ string: "Foods", style: scentTextStyle, bottom: 0}),
		new Picture({ url: "https://cdn1.iconfinder.com/data/icons/food-drink-6/24/Apple-512.png", top: 5, height: 45 })
	]
});

var misc = new Container ({
	active: true, left: 0, width: 100, height: 70, top: 210, skin: dblue,
	behavior: Behavior({
		onTouchBegan: function(content) {
			scents.remove(currentOptions);
			currentOptions = miscOptions;
			scents.add(currentOptions);
		}
	}), contents: [
		new Picture({ url: "http://www.freeiconspng.com/uploads/windy-png-6.png", width: 65}),
		new Label({ string: "Misc.", style: scentTextStyle, bottom: 0})
	]
});
		
var flowerOptions = new Container({
	active: true, left: 100, height: 280, width: 305, top: 0, skin: lblue, 
	contents: [
	   new scent({ string: "Rose Petal", top: 10, left: 30, fill: "#f075a8", skin: rose}),
	   new scent({ string: "Lavender", top: 10, left: 142, fill: "#a84de6", skin: lavender}),
	   new scent({ string: "Jasmine", top: 120, left: 30, fill: "#4dff4d", skin: jasmine}),
	   new scent({ string: "Vanilla Orchids", top: 120, left: 142, fill: "#1ab2ff", skin: vanilla})
	] });

var outdoorOptions = new Container({
	active: true, left: 100, height: 280, width: 305, top: 0, skin: lgreen,
	contents: [
	   new scent({ string: "Freshly Cut Grass", top: 10, left: 30, fill: "#33cc00", skin: grass }),
	   new scent({ string: "Ocean Breeze", top: 10, left:142, fill: "#0099ff", skin: ocean }),
	   new scent({ string: "After the Rain", top: 120, left: 30, fill: "#0052cc", skin: rain}),
	   new scent({ string: "The Forest", top: 120, left: 142, fill: "#008000", skin: forest}),
	] });
	
var foodOptions = new Container({
	active: true, left: 100, height: 280, width: 305, top: 0, skin: yellow,
	contents: [
	   new scent({ string: "Tangerine", top: 10, left:30, fill: "#ff9900", skin: tangerine }),
	   new scent({ string: "Peaches and Creme", top: 10, left: 142, fill:"#ff884d", skin: peaches}),
	   new scent({ string: "Milkshake and Fries", top: 120, left: 30, fill:"#b38600", skin: shake}),
	   new scent({ string: "Cinnamon", top: 120, left: 142, fill: "#b30000", skin: cinammon})
	] });
	
var miscOptions = new Container({
	active: true, left: 100, height: 280, width: 305, top: 0, skin: dblue,
	contents: [
	    new scent({ string: "Mom's Favorite", top: 10, left: 30, fill:"#f075a8",skin: rose }),
	    new scent({ string: "For Sally", top: 10, left:142, fill: "#a84de6", skin: lavender }),
	    new scent({ string: "Forget Me Not", top: 120, left:30, fill: "#5eceed", skin: lightblue }),
	    new scent({ string: "New Car", top: 120, left: 142, fill: "#5c5c8a", skin: car })
	] });
	
var currentOptions = flowerOptions;

export var scents = new Container ({
	left: 0, top: 50, width: 750, height: 280, active: true, skin: new Skin({fill: "#FFFFFF"}),
	behavior: Behavior({
		onCreate: function(content) {
		}
	}),
	contents: [
		flowers,
		outdoors,
		foods,
		misc,
		currentOptions
	]
});