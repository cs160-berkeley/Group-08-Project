/* *     Copyright (C) 2010-2016 Marvell International Ltd. *     Copyright (C) 2002-2010 Kinoma, Inc. * *     Licensed under the Apache License, Version 2.0 (the "License"); *     you may not use this file except in compliance with the License. *     You may obtain a copy of the License at * *      http://www.apache.org/licenses/LICENSE-2.0 * *     Unless required by applicable law or agreed to in writing, software *     distributed under the License is distributed on an "AS IS" BASIS, *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *     See the License for the specific language governing permissions and *     limitations under the License. */import Pins from "pins";import {VerticalScroller} from "scroller"; // TODO This is not the best scroller, it works but it covers up the header bar// Consider finding a better scroller if we need it (I'm not sure we do)// Scroller is only necessary for the calendar I believe let basicTextStyle = new Style({ font: "24px Brandon Grotesque", color: "black" });let largerTextStyle = new Style({ font: "30px Brandon Grotesque", color: "white" });let headerTextStyle = new Style({ font: "bold 50px Brandon Grotesque", color: "white"});let headerSymbolStyle = new Style({ font: "bold italic 30px Brandon Grotesque", color: "white"});let elemTextStyle = new Style({ font: "14px Brandon Grotesque", color: "#3c4241"});let elemLinkStyle = new Style({ font: "italic 14px Brandon Grotesque", color: "#007aff"}); //this is the apple Link colorlet mainTextStyle = new Style({ font: "bold italic 80px Brandon Grotesque", color: "white"});let backgroundGray = new Skin({fill: "#FFFFFF"}) //default apple background color #efeff4let scentText = new Style({ font: "24px", color: "white" });
let scentTextStyle = new Style({ font: "20px Brandon Grotesque", color: "white"}); var currentScent = "";let selectedCalendarCell;
//Scent Colorslet rose = new Skin({fill: "#f7b7d2"});
let lavender = new Skin({fill: "#c282ed"});
let jasmine = new Skin({fill: "#80ff80"});
let vanilla = new Skin({fill: "#66ccff"});
let grass = new Skin({fill: "#39e600"});let ocean = new Skin({fill: "#33adff"});
let rain = new Skin({fill: "#0066ff"});
let forest = new Skin({fill: "#009900"});let tangerine = new Skin({fill: "#ffa31a"});
let peaches = new Skin({fill: "#ff9966"});
let shake = new Skin({fill: "#cc9900"});
let cinammon = new Skin({fill: "#cc0000"});let lightblue = new Skin({fill: "#8cdcf2"});
let car = new Skin({fill: "#666699"});

//Theme Colors
let orange = new Skin({fill: "#ff9900"});
let lgreen = new Skin({fill: "#86BD3E"});
var lblue = new Skin({fill: "#66AEF2"});
let yellow = new Skin({fill: "#DFA20A"});
let dgreen = new Skin({fill: "#335115"});
let dblue = new Skin({fill: "#0254B6"});var pinkBorderSkin = new Skin({    fill: "#f7b7d2",     borders: {left: 3, right: 3, top: 5, bottom: 5},     stroke: "black"}); let currentScreen;let screenStack = new Array();let hasConnectedDevice = 0; let mainMainContainer = new Container({    top:0,left:0,right:0,bottom:0}); let MainContainer = Column.template($ => ({    top: 0, bottom: 0, left: 0, right: 0,    skin: backgroundGray,    contents: [        new header({left:"<", right:"+", title:"Aromafy home", touchRightFxn: nullFxn}),    ],})); let HomeScreen = Column.template( $ => ({    top:0,bottom:0,left:0,right:0,    skin: backgroundGray,    contents: [        new header({left: " ", right:"", title:"Aromafy", touchRightFxn: nullFxn}),        new Label({            string: "Welcome Home",            top:40, left: 0, right: 0,            height:40,            style: new Style({ font: "60px Brandon Grotesque", color: "#66AEF2" }),            horizontal: "center"        }),        new Label({            string: "Connect your device",            active:true,            top:40, width: 260, height: 40,            horizontal: "center",
            skin: lgreen,            style: largerTextStyle,            behavior: Behavior({                onTouchEnded(content, id,x,y,ticks) {                    transition(connectScreen);                }            })        }),        new Label({            string: "Create/Manage Schedules",            active:true,            top:15, width: 260, height: 40,            style: largerTextStyle,
            skin: lgreen,            horizontal: "center",            behavior: Behavior({                onTouchEnded(content, id,x,y,ticks) {                    //calendarScreen = new scheduleTemp();                    transition(calendarScreen);                }            })        }),        new Label({            string: "Current Scent State",            active:true,            top:15, width: 260, height: 40,            horizontal: "center",
            skin: lgreen,            style: largerTextStyle,            behavior: Behavior({                onTouchEnded(content, id,x,y,ticks) {                    transition(currentStateScreen);                }            })        })/*,        new Label({            string: "Create a Scent",            active:true,            top:15, width: 260, height: 40,            style: largerTextStyle,            horizontal: "center",
            skin: lgreen,            behavior: Behavior({                onTouchEnded(content, id,x,y,ticks) {                    transition(newScentScreen);                }            })        })*/    ]})) let IntroScreen = Container.template($ => ({    top:0, bottom:0,left:0,right:0,    contents: [
		new Picture({          height:675,           url: 'http://weneedfun.com/wp-content/uploads/2016/01/Blue-Flower-13.jpg'         }),
          new Label({string: "Aromafy", style: mainTextStyle, bottom: 80, height:120}),
          getStartedButton    ]})); //TODO This make this look goodlet getStartedButton = new Container({    bottom:60, //TODO Might need to add other constraints    width:150,height:30,    skin: new Skin({fill: "white"}),    active:true,    contents: [        new Label({string: "Get Started", style: basicTextStyle})    ],    behavior: Behavior({        onTouchEnded(content,id,x,y,ticks) {            //TODO transition to home here            //removeIntroScreen();            mmc.remove(is);            mmc.add(hs);            currentScreen = hs;        }    })})  let header = Line.template($ => ({    top:0, left:0, right:0, height:50,    skin: dblue, //Apple safari skin, videos use #5ac8fa    contents: [        new Container({            top:0,left:0,right:0,bottom:0,            contents: [            new Label({                string: $.left,                style: headerSymbolStyle,                horizontal: "left",                active:true,                behavior: Behavior({                    onTouchEnded(content,id,x,y,ticks) {                        //TODO what to do when left header clicked                        goBack()                    }                })            }),            ]        }),        new Container({            top:0,left:0,right:0,bottom:0,            name: "title",            contents: [            new Label({                string: $.title,                style: headerTextStyle,             }),            ]        }),        new Container({            top:0,left:0,right:0,bottom:0,            contents: [            new Label({                string: $.right,                style: headerSymbolStyle,                horizontal: "right",                active:true,                behavior: Behavior({                    onTouchEnded(content,id,x,y,ticks) {                        //TODO what to do when right header clicked                        if ($.touchRightFxn) {                            $.touchRightFxn()                        }                    }                })            }),            ]        })    ]})); let deviceEntry = Column.template($ => ({    top:0,bottom:10, left:5,right:0,    width:200,    contents: [        new Label({string: $.name, style: basicTextStyle, left:0}),        new Label({string: $.dist + "ft from you", style: elemTextStyle,left:10}),        new Label({string: $.status, style: elemTextStyle,left:10})    ]})); let connectedMenu = new Container({    name: "connectedMenu",    top: 40,    height: 30, width: 200,    skin: lgreen,    active:true,    contents: [        new Label({ style: basicTextStyle, string: "John's Aroma Dispenser"})    ],    behavior: Behavior ({        onTouchEnded(content,id,x,y,ticks) {            content.container.container.remove(yourDevice);            content.container.add(expandedConnectMenu);            content.container.container.add(yourDevice);            content.container.remove(content);        }    })}) let yourDevice = new Column({    bottom: 20,    left:0,    contents: [        new Label({string: "Your Device", style: largerTextStyle}),        new Line({            top:0,bottom:0,left:10,right:0,            contents: [                new Picture({                     height:120,width:120,                    url: 'http://cdn.pocket-lint.com/r/c/742x526/assets/images/phpadneab.jpg'                }),                new Column({                    top:10,left:0,right:0,bottom:0,                    contents: [                        new Label({string: "John's Aroma Dispenser", style: elemTextStyle,left:10}),                        new Label({string: "Currently connected", style: elemTextStyle,left:10}),                        new Label({string: "Currently relseasing scent:", left:10, style: elemTextStyle}),                        new Label({string: "After the rain, until 5:30pm", left:20, style: elemTextStyle}),                    ]                })            ]        })    ]}) let expandedConnectMenu = new Column({    name: "expandedConnectMenu",    top: 40,    width: 200,    skin: lblue,    active:true,    contents: [        new deviceEntry({name: "John's Aroma dispenser", dist:60, status: "Remembered"}),        new deviceEntry({name: "Neighbor's Aroma dispenser", dist: 200, status: "Password protected"})    ],    behavior: Behavior ({        onTouchEnded(content,id,x,y,ticks) {            if (hasConnectedDevice) {                content.container.container.remove(yourDevice);            }            content.container.add(connectedMenu);            content.container.container.add(yourDevice);            content.container.remove(content);            hasConnectedDevice = 1;        }    })}) let ConnectScreen = Column.template( $ => ({    top:0,bottom:0,left:0,right:0,    skin: backgroundGray,    contents: [        new header({left:"<", right:"", title:"Device Connect", touchRightFxn: nullFxn}),        new Label({            string: "Device link",            top:20,            height:40,            style: new Style({ font: "34px", color: "black" }),            horizontal: "center"        }),        new Container({            name: "connectMenu",            top: 40,            height: 30, width: 200,            skin: lblue,            active:true,            contents: [                new Label({ style: basicTextStyle, string: "Select Device         v"})            ],            behavior: Behavior ({                onTouchEnded(content,id,x,y,ticks) {                    content.container.add(expandedConnectMenu);                    content.container.remove(content);                }            })        })     ]})); //create a label with label = new lbl({str: "some string", style: someStyle, touchFxn: uncalledFxn (if any)}) // Also include params to the touch function in the label paramslet lbl = Label.template($ => ({    left:10,    string: $.str,    style: $.style,    active: true,    behavior: Behavior({        onTouchEnded(content, id, x,y,ticks) {            $.touchFxn($)        }    })})); function nullFxn() {    //do nothing} //TODO generally customize this modal window (size, position, message, style)let Modal = Column.template($ => ({    bottom: 200,//TODO change this value as desired    skin: new Skin({fill:"white"}),    contents: [        new Container({            height:50, width:200, //TODO change values            skin: new Skin({fill:"white"}),            contents: [                new Label({string: $.string, style: basicTextStyle}),             ]        }),        new Line({            height:40,width:200, //TODO change values            skin: lblue,            active: true,            contents: [                new Label({string: "Okay!", style: headerTextStyle, left:0,right:0})                //TODO change this string            ],            behavior: Behavior({                onTouchEnded(content,id,x,y,ticks) {                    //TODO what to do when bar at bottom of modal is clicked                }            })        }),    ]})); function transition(destination) {    screenStack.push(currentScreen);    mmc.remove(currentScreen);    mmc.add(destination);    currentScreen = destination;} function goBack() {    if (currentScreen == currentStateScreen){        application.remove(tempTimeLabel);        application.remove(tempIntensityLabel);    }    mmc.remove(currentScreen);    currentScreen = screenStack.pop();    if (!currentScreen) {        currentScreen = hs;    }    mmc.add(currentScreen);    //scheduleItem.skin=pinkBorderSkin;} let mmc = mainMainContainer;let mc = new MainContainer({});let is = new IntroScreen({});let hs = new HomeScreen({});let connectScreen = new ConnectScreen({});let currentStateScreen = new MainContainer({});let calendarScreen = new MainContainer({});let newScentScreen = new MainContainer({}); application.add(mmc);mmc.add(is)currentScreen = is; //The screen named Group 4 in the figma prototype: the customize scent screen//Used a 375 x 667 screen to make this, don't know how it would look on other screen dimentions or other devices//Behaviors not implemented yetlet intensity = 8;let timeHour = 5;let timeMinute = 30;let timeLabel = Label.template($ => ({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":" + timeMinute}));let intensityLabel = Label.template($ => ({style: new Style({color: "black", font: "28px"}), left: 260, top: 445, string: intensity}));let tempIntensityLabel = new intensityLabel();let tempTimeLabel = new timeLabel();let group4 = new Container({  left: 0, right: 0, top: 300, bottom: 0,  active: true,  skin: backgroundGray,  contents: [            new Label({style: new Style({color: "black", font: "24px Brandon Grotesque"}), left: 75, top: 100, string: "Time"}),            new Label({style: new Style({color: "black", font: "24px Brandon Grotesque"}), right: 68, top: 100, string: "Intensity"}),            new Container({left: 55, top: 140, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),            new Container({right: 55, top: 140, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),            //new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 145, string: timeHour + ":" + timeMinute}),            //new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 145, string: intensity}),            new Picture({top: 200, left: 75,url:"http://i.imgur.com/OPaTPDB.png", active: true,                 behavior: Behavior({                 onTouchEnded: function(content) {                     timeMinute += 10;                    if (timeMinute == 60) {                        timeHour += 1;                        timeMinute = 0;                    }                    application.remove(tempTimeLabel);                    if (timeMinute == 0){                        tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":00"});                    } else {                        tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":" + timeMinute});                    }                    application.add(tempTimeLabel);                                                                             }, onDisplayed: function(content) {                    application.add(tempTimeLabel);                    application.add(tempIntensityLabel);                }})            }),            new Picture({top: 265, left: 75, url:"http://i.imgur.com/CfWKqwY.png", active: true,                behavior: Behavior({                 onTouchEnded: function(content) {                     timeMinute -= 10;                    if (timeMinute == -10) {                        timeHour -= 1;                        timeMinute = 50;                    }                    application.remove(tempTimeLabel);                    if (timeMinute == 0){                        tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":00"});                    } else {                        tempTimeLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 445, string: timeHour + ":" + timeMinute});                    }                    application.add(tempTimeLabel);                                                                             }})            }),            new Picture({top: 200, left: 236,url:"http://i.imgur.com/OPaTPDB.png", active: true,                behavior: Behavior({                 onTouchEnded: function(content) {                     if (intensity < 10) {                        intensity += 1;                    }                    application.remove(tempIntensityLabel);                    if (intensity == 10) {                        tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 250, top: 445, string: intensity});                    } else {                        tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 445, string: intensity});                    }                    application.add(tempIntensityLabel);                                                                            }})            }),            new Picture({top: 265, left: 236, url:"http://i.imgur.com/CfWKqwY.png", active: true,                behavior: Behavior({                 onTouchEnded: function(content) {                     if (intensity > 0) {                        intensity -= 1;                    }                    application.remove(tempIntensityLabel);                    tempIntensityLabel = new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 445, string: intensity});                    application.add(tempIntensityLabel);                                                                            }})            })            ]  });let isCurrentScent = 0;let currentColor = whiteBorderSkin;let saveSkin = orange;  var scent = Container.template($ => ({    active: true, width: 100, height: 100, right: $.right, left: $.left, top: $.top,    behavior: Behavior({        onTouchEnded: function(content) {            if (isCurrentScent) {                currentScent.first.skin = saveSkin;            }            currentScent = content;            saveSkin = content.first.skin;            currentScent.first.skin = new Skin({                fill: $.fill,//content.data.fill,                stroke: "white",                borders: {left: 3, right: 3, top: 3, bottom: 3}            })            currentColor = $.fill;            isCurrentScent = 1;            //trace(currentColor.fill);             //trace("Current Scent selected: " + currentScent + "\n");        }    }),    contents: [        Text($, {top: 0, bottom: 0, left: 0, right: 0, string: $.string,style:scentText, skin: $.skin})    ]}));function returnToCal() {    selectedCalendarCell.skin = new Skin({        fill: currentColor,        borders: {left: 3, right: 3, top: 5, bottom: 5},        stroke: "black"    })//currentColor;    goBack();}  /* let scentWheel = new Container({    left: 0, right: 0, top: 100,     active: true,    contents: [        new scent({ string: "Freshly Cut Grass", top: 0, left: 37.5, fill: "green", skin: green }),        new scent({ string: "Mom's Favorite", top: 0, left: 137.5, fill:"#F7B7D2",skin: pink }),        new scent({ string: "Ocean Breeze", top: 0, right:38, fill: "blue", skin: blue }),        new scent({ string: "For Sally", top: 100, left:37.5, fill: "#c282ed", skin: purple }),        new scent({ string: "Tangerine", top: 100, left:137.5, fill: "#edc082", skin: orange }),        new scent({ string: "Forget Me Not", top: 100, right:38, fill: "#b7e9f7", skin: lightblue })    ]});let scentWheel2 = new Container({    left: 0, right: 0, top: 100,     active: true,    contents: [        new scent({ string: "Freshly Cut Grass", top: 0, left: 37.5, fill: "green", skin: green }),        new scent({ string: "Mom's Favorite", top: 0, left: 137.5, fill:"#F7B7D2",skin: pink }),        new scent({ string: "Ocean Breeze", top: 0, right:38, fill: "blue", skin: blue }),        new scent({ string: "For Sally", top: 100, left:37.5, fill: "#c282ed", skin: purple }),        new scent({ string: "Tangerine", top: 100, left:137.5, fill: "#edc082", skin: orange }),        new scent({ string: "Forget Me Not", top: 100, right:38, fill: "#b7e9f7", skin: lightblue })    ]});*/

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

var scents = new Container ({
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
});         // schedule of the devicevar greenSkin = new Skin({fill: "green"});var redSkin = new Skin({fill: "red"});var blueSkin = new Skin({fill: "blue"});var whiteBorderSkin = new Skin({    fill: "white",     borders: {left: 3, right: 3, top: 5, bottom: 5},     stroke: "black"});   var scheduleItem = Container.template($ => ({active: true, left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin,                     behavior: Behavior({                        onTouchEnded(content, id,x,y,ticks) {                            transition(currentStateScreen);                            selectedCalendarCell = content;                        }                    })                }))var scheduleItem2 = new Container({active: true, left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin,                     behavior: Behavior({                        onTouchEnded(content, id,x,y,ticks) {                            transition(currentStateScreen);                            selectedCalendarCell = content;                        }                    })                })                 let scheduleColumn = new Column({    left: 60, right: 60, top: 50, bottom:50,    skin: lightblue,    contents: [        new Line({height:30,              contents: [                new Label({string: "  Mon   ", style: new Style({ font: "16.5 Brandon Grotesque", color: "black" }),horizontal: "center"}),                new Label({string: "  Tue   ", style: new Style({ font: "16.5 Brandon Grotesque", color: "black" }),horizontal: "center"}),                new Label({string: "  Wed   ", style: new Style({ font: "16.5 Brandon Grotesque", color: "black" }),horizontal: "center"}),                new Label({string: "  Thu   ", style: new Style({ font: "16.5 Brandon Grotesque", color: "black" }),horizontal: "center"}),                new Label({string: "  Fri   ", style: new Style({ font: "16.5 Brandon Grotesque", color: "black" }),horizontal: "center"}),                new Label({string: "  Sat   ", style: new Style({ font: "16.5 Brandon Grotesque", color: "black" }),horizontal: "center"}),                new Label({string: "  Sun  ", style: new Style({ font: "16.5 Brandon Grotesque", color: "black" }),horizontal: "center"}),            ]        }),                 new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: pink,            contents: [                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                // scheduleItem2,                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),            ]        }),                new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: pinkBorderSkin,             contents: [                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),            ]        }),                new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: whiteBorderSkin,            contents: [                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),            ]        }),                           new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: pinkBorderSkin,             contents: [                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                new scheduleItem({}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),                // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),            ]        }),     ]});let labelHeight = 22;let timeColumn = new Column({    left: 20, top: 85, width:40,    contents: [        new Label({string: "12am", style: basicTextStyle, height:labelHeight}),        new Label({string: "1am", style: basicTextStyle, height:labelHeight}),        new Label({string: "2am", style: basicTextStyle, height:labelHeight}),        new Label({string: "3am", style: basicTextStyle, height:labelHeight}),        new Label({string: "4am", style: basicTextStyle, height:labelHeight}),        new Label({string: "5am", style: basicTextStyle, height:labelHeight}),        new Label({string: "6am", style: basicTextStyle, height:labelHeight}),        new Label({string: "7am", style: basicTextStyle, height:labelHeight}),        new Label({string: "8am", style: basicTextStyle, height:labelHeight}),        new Label({string: "9am", style: basicTextStyle, height:labelHeight}),        new Label({string: "10am", style: basicTextStyle, height:labelHeight}),        new Label({string: "11am", style: basicTextStyle, height:labelHeight}),        new Label({string: "12pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "1pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "2pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "3pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "4pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "5pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "6pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "7pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "8pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "9pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "10pm", style: basicTextStyle, height:labelHeight}),        new Label({string: "11pm", style: basicTextStyle, height:labelHeight}),            ]}) //application.add(group4);currentStateScreen = new Container({    top:0,bottom:0,left:0,right:0,    skin: backgroundGray,    contents: [        new header({left:"<", right:"", title:"Current Scent State", touchRightFxn: returnToCal}),        group4,        scents    ]}); calendarScreen = new Container({    top:0,bottom:0,left:0,right:0,    skin: backgroundGray,    contents: [        new header({left:"<", right:"", title:"Schedules", touchRightFxn: nullFxn}),        scheduleColumn,        timeColumn    ]}); newScentScreen = new Container({    top:0,bottom:0,left:0,right:0,    skin: backgroundGray,    contents: [        new header({left:"<", right:"", title:"New Scent", touchRightFxn: nullFxn})    ]});