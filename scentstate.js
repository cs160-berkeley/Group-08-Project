import {returnToCal} from "main";
export var currentScent = "";
export var currentScentString = "";

let scentText = new Style({ font: "24px Brandon Grotesque", color: "white" });
let scentTextStyle = new Style({ font: "20px Brandon Grotesque", color: "white"});
let backgroundGray = new Skin({fill: "#FFFFFF"});
let rose = new Skin({fill: "#f792d2"});
let lavender = new Skin({fill: "#c282ed"});
let jasmine = new Skin({fill: "#00dd6e"});
let vanilla = new Skin({fill: "#90D7FF"});
let grass = new Skin({fill: "#00d216"});
let ocean = new Skin({fill: "#48beff"});
let rain = new Skin({fill: "#016fb9"});
let forest = new Skin({fill: "#157145"});
let tangerine = new Skin({fill: "#fb6107"});
let peaches = new Skin({fill: "#f85a3e"});
let shake = new Skin({fill: "#edae49"});
let cinammon = new Skin({fill: "#e3170a"});
let lightblue = new Skin({fill: "#5cc8ff"});
let car = new Skin({fill: "#586ba4"});
let orange = new Skin({fill: "#ff9900"});
let lgreen = new Skin({fill: "#57a773"});
var lblue = new Skin({fill: "#3993DD"});
let yellow = new Skin({fill: "#44355b"});
let dgreen = new Skin({fill: "#335115"});
let dblue = new Skin({fill: "#6f9ceb"});
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

export var intensity = 50;
export var timeHour = 4;
let timeMinute = 30;
let timeLabel = Label.template($ => ({style: new Style({color: "black", font: "28px"}), left: 75, top: 425, string: timeHour + " hrs" }));//":" + timeMinute}));
let intensityLabel = Label.template($ => ({style: new Style({color: "black", font: "28px"}), left: 250, top: 425, string: intensity + "%"}));
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
            new Label({style: new Style({color: "black", font: "28px Brandon Grotesque"}), left: 72, top: 0, string: "Duration"}),
            new Label({style: new Style({color: "black", font: "28px Brandon Grotesque"}), right: 72, top: 0, string: "Intensity"}),
            new Container({left: 55, top: 40, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),
            new Container({right: 55, top: 40, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),
            //new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 145, string: timeHour + ":" + timeMinute}),
            //new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 145, string: intensity}),
            new Picture({top: 95, left: 80,active:true, width: 50, height:50, url:"./plus_big.png",// "http://i.imgur.com/OPaTPDB.png", active: true, 
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
                    tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 425, string: timeHour + " hrs"});
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
            new Picture({top: 160, left: 80, active:true, width: 50, height:50,url:"./minus_big.png",// "http://i.imgur.com/CfWKqwY.png",
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
                    tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 425, string: timeHour + " hrs"});
                    // if (timeMinute == 0){
                    //     tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":00"});
                    // } else {
                    //     tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":" + timeMinute});
                    // }
                    application.add(tempTimeLabel);                                                             
                }})
            }),
            new Picture({top: 95, left: 245,active:true, width: 50, height:50,url:"./plus_big.png",//"http://i.imgur.com/OPaTPDB.png", active: true,
                behavior: Behavior({ 
                onTouchEnded: function(content) { 
                    if (intensity < 100) {
                        intensity += 10;
                    }
                    application.remove(tempIntensityLabel);
                    if (intensity == 100) {
                        tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 240, top: 425, string: intensity+"%"});
                    } else {
                        tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 250, top: 425, string: intensity+"%"});
                    }
                    application.add(tempIntensityLabel);                                                            
                }})
            }),
            new Picture({top: 160, left: 245, active:true, width: 50, height:50,url:"./minus_big.png",// "http://i.imgur.com/CfWKqwY.png", active: true,
                behavior: Behavior({ 
                onTouchEnded: function(content) { 
                    if (intensity > 0) {
                        intensity -= 10;
                    }
                    application.remove(tempIntensityLabel);
                    if (intensity == 0){
                    	tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 425, string: intensity+"%"});
                    } else {
                    	tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 250, top: 425, string: intensity+"%"});
                    }
                   
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
	active: true, left: 5, width: 95, height: 70, top: 5, skin: lblue,
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
	active: true, left: 5, width: 95, height: 70,top: 74, skin: lgreen,
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
	active: true, left: 5, width: 95, height: 70,top: 143, skin: yellow,
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
	active: true, left: 5, width: 95, height: 70, top: 212, skin: dblue,
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
	active: true, left: 100, height: 277, top: 5, width:270, skin: lblue, 
	contents: [
	   new scent({ string: "Rose Petal", top: 30, left: 30, fill: "#f075a8", skin: rose}),
	   new scent({ string: "Lavender", top: 30, left: 142, fill: "#a84de6", skin: lavender}),
	   new scent({ string: "Jasmine", top: 140, left: 30, fill: "#38c138", skin: jasmine}),
	   new scent({ string: "Vanilla\nOrchids", top: 140, left: 142, fill: "#1ab2ff", skin: vanilla})
	] });

var outdoorOptions = new Container({
	active: true, left: 100, height: 277, width: 270, top: 5, skin: lgreen,
	contents: [
	   new scent({ string: "Freshly Cut Grass", top: 30, left: 30, fill: "#33cc00", skin: grass }),
	   new scent({ string: "Ocean Breeze", top: 30, left:142, fill: "#0099ff", skin: ocean }),
	   new scent({ string: "After the\nRain", top: 140, left: 30, fill: "#0052cc", skin: rain}),
	   new scent({ string: "The Forest", top: 140, left: 142, fill: "#008000", skin: forest}),
	] });
	
var foodOptions = new Container({
	active: true, left: 100, height: 277, width: 270, top: 5, skin: yellow,
	contents: [
	   new scent({ string: "Tangerine", top: 30, left:30, fill: "#ff9900", skin: tangerine }),
	   new scent({ string: "Peaches and Creme", top: 30, left: 142, fill:"#ff884d", skin: peaches}),
	   new scent({ string: "Milkshake\nand Fries", top: 140, left: 30, fill:"#cc9900", skin: shake}),
	   new scent({ string: "Cinnamon", top: 140, left: 142, fill: "#b30000", skin: cinammon})
	] });
	
var miscOptions = new Container({
	active: true, left: 100, height: 277, width: 270, top: 5, skin: dblue,
	contents: [
	    new scent({ string: "Mom's Favorite", top: 30, left: 30, fill:"#f075a8",skin: rose }),
	    new scent({ string: "For Sally", top: 30, left:142, fill: "#a84de6", skin: lavender }),
	    new scent({ string: "Forget Me Not", top: 140, left:30, fill: "#5eceed", skin: lightblue }),
	    new scent({ string: "New Car", top: 140, left: 142, fill: "#5c5c8a", skin: car })
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

 
