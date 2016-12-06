import {returnToCal} from "main";
export var currentScent = "";
export var currentScentString = "";

let scentText = new Style({ font: "24px Brandon Grotesque", color: "white" });
let scentTextStyle = new Style({ font: "20px Brandon Grotesque", color: "white"});
let backgroundGray = new Skin({fill: "#FFFFFF"})
let rose = new Skin({fill: "#f7b7d2"});
let lavender = new Skin({fill: "#c282ed"});
let jasmine = new Skin({fill: "#80ff80"});
let vanilla = new Skin({fill: "#66ccff"});
let grass = new Skin({fill: "#39e600"});
let ocean = new Skin({fill: "#33adff"});
let rain = new Skin({fill: "#0066ff"});
let forest = new Skin({fill: "#009900"});
let tangerine = new Skin({fill: "#ffa31a"});
let peaches = new Skin({fill: "#ff9966"});
let shake = new Skin({fill: "#cc9900"});
let cinammon = new Skin({fill: "#cc0000"});
let lightblue = new Skin({fill: "#8cdcf2"});
let car = new Skin({fill: "#666699"});
let orange = new Skin({fill: "#ff9900"});
let lgreen = new Skin({fill: "#86BD3E"});
var lblue = new Skin({fill: "#66AEF2"});
let yellow = new Skin({fill: "#DFA20A"});
let dgreen = new Skin({fill: "#335115"});
let dblue = new Skin({fill: "#0254B6"});
var pinkBorderSkin = new Skin({
    fill: "#f7b7d2", 
    borders: {left: 3, right: 3, top: 5, bottom: 5}, 
    stroke: "black"
});
var whiteBorderSkin = new Skin({
    fill: "white", 
    borders: {left: 3, right: 3, top: 5, bottom: 5}, 
    stroke: "black"
});

export var isCurrentScent = 0;
export var currentColor = whiteBorderSkin;
export var saveSkin = orange;

let intensity = 5;
export var timeHour = 1;
let timeMinute = 30;
let timeLabel = Label.template($ => ({style: new Style({color: "black", font: "28px"}), left: 75, top: 425, string: timeHour + " hrs" }));//":" + timeMinute}));
let intensityLabel = Label.template($ => ({style: new Style({color: "black", font: "28px"}), left: 260, top: 425, string: intensity}));
export var tempIntensityLabel = new intensityLabel();
export var tempTimeLabel = new timeLabel();
export var group4 = new Container({
  left: 0, right: 0, top: 380, bottom: 0,
  active: true,
  skin: backgroundGray,
  contents: [
  			new Container({left: 105, top: 230, height: 40, width: 170, skin: new Skin({fill: "#DDDDDD"}), active: true, behavior: Behavior({ 
                onTouchEnded: function(content) {returnToCal(timeHour) }})}),
  			new Label({style: new Style({color: "green", font: "30px Brandon Grotesque"}), left: 145, top: 235, string: "Add Scent"}),

            new Label({style: new Style({color: "black", font: "24px Brandon Grotesque"}), left: 75, top: 0, string: "Duration"}),
            new Label({style: new Style({color: "black", font: "24px Brandon Grotesque"}), right: 75, top: 0, string: "Intensity"}),
            new Container({left: 55, top: 40, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),
            new Container({right: 55, top: 40, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),
            //new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 145, string: timeHour + ":" + timeMinute}),
            //new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 145, string: intensity}),
            new Picture({top: 100, left: 75,url:"http://i.imgur.com/OPaTPDB.png", active: true, 
                behavior: Behavior({ 
                onTouchEnded: function(content) {
                    // timeMinute += 10;
                    // if (timeMinute == 60) {
                    //     timeHour += 1;
                    //     timeMinute = 0;
                    // }
                    timeHour += 1;
                    if (timeHour > 7*24) {
                        timeHour = 7*24;
                    }
                    application.remove(tempTimeLabel);
                    tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + " hrs"});
                    // if (timeMinute == 0){
                    //     tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":00"});
                    // } else {
                    //     tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":" + timeMinute});
                    // }
                    application.add(tempTimeLabel);                                                             
                }, onDisplayed: function(content) {
                    application.add(tempTimeLabel);
                    application.add(tempIntensityLabel);
                }})
            }),
            new Picture({top: 165, left: 75, url:"http://i.imgur.com/CfWKqwY.png", active: true,
                behavior: Behavior({ 
                onTouchEnded: function(content) { 
                    // timeMinute -= 10;
                    // if (timeMinute == -10) {
                    //     timeHour -= 1;
                    //     timeMinute = 50;
                    // }
                    timeHour -= 1;
                    if (timeHour < 1) {
                        timeHour = 1;
                    }
                    application.remove(tempTimeLabel);
                    tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + " hrs"});
                    // if (timeMinute == 0){
                    //     tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":00"});
                    // } else {
                    //     tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":" + timeMinute});
                    // }
                    application.add(tempTimeLabel);                                                             
                }})
            }),
            new Picture({top: 100, left: 236,url:"http://i.imgur.com/OPaTPDB.png", active: true,
                behavior: Behavior({ 
                onTouchEnded: function(content) { 
                    if (intensity < 10) {
                        intensity += 1;
                    }
                    application.remove(tempIntensityLabel);
                    if (intensity == 10) {
                        tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 250, top: 445, string: intensity});
                    } else {
                        tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 445, string: intensity});
                    }
                    application.add(tempIntensityLabel);                                                            
                }})
            }),
            new Picture({top: 165, left: 236, url:"http://i.imgur.com/CfWKqwY.png", active: true,
                behavior: Behavior({ 
                onTouchEnded: function(content) { 
                    if (intensity > 0) {
                        intensity -= 1;
                    }
                    application.remove(tempIntensityLabel);
                    tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 445, string: intensity});
                    application.add(tempIntensityLabel);                                                            
                }})
            })
            ]
  });

  
var scent = Container.template($ => ({
    active: true, width: 100, height: 100, right: $.right, left: $.left, top: $.top,
    behavior: Behavior({
        onTouchEnded: function(content) {
            if (isCurrentScent) {
                currentScent.first.skin = saveSkin;
            }
            currentScentString = $.string;
            currentScent = content;
            saveSkin = content.first.skin;
            currentScent.first.skin = new Skin({
                fill: $.fill,//content.data.fill,
                stroke: "white",
                borders: {left: 3, right: 3, top: 3, bottom: 3}
            })
            currentColor = $.fill;
            isCurrentScent = 1;
            //trace(currentColor.fill); 
            //trace("Current Scent selected: " + currentScent + "\n");
        }
    }),
    contents: [
        Text($, {top: 0, bottom: 0, left: 0, right: 0, string: $.string,style:scentText, skin: $.skin})
    ]
}));


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
		new Picture({url: "./Flowers.png", top: 0, height: 50})
		//new Picture({ url: "http://www.clker.com/cliparts/b/d/d/0/1368552262301808347Buttercup%20Flower%20Outline.svg.hi.png", top:5, height: 45})
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
		new Picture({ url: "./Outdoors.png", top: 0, height: 50}),
		//new Picture({ url: "http://www.clker.com/cliparts/V/q/Y/F/8/B/tree-outline-md.png", top: 5, height: 45}),
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
		new Picture({ url: "./Apples.png", top: 0, height: 50})
		//new Picture({ url: "https://cdn1.iconfinder.com/data/icons/food-drink-6/24/Apple-512.png", top: 5, height: 45 })
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
		new Picture({ url: "./Swirl.png",left: 20, right:10, width: 60}),
		//new Picture({ url: "http://www.freeiconspng.com/uploads/windy-png-6.png", width: 65}),
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

 
