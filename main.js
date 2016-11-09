/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */
import Pins from "pins";
import {VerticalScroller} from "scroller"; 
// TODO This is not the best scroller, it works but it covers up the header bar
// Consider finding a better scroller if we need it (I'm not sure we do)
// Scroller is only necessary for the calendar I believe

let basicTextStyle = new Style({ font: "14px", color: "black" });
let largerTextStyle = new Style({ font: "22px", color: "black" });
let headerTextStyle = new Style({ font: "bold italic 24px", color: "white"});
let headerSymbolStyle = new Style({ font: "bold italic 30px", color: "white"});
let elemTextStyle = new Style({ font: "14px", color: "#3c4241"});
let elemLinkStyle = new Style({ font: "italic 14px", color: "#007aff"}); //this is the apple Link color
let mainTextStyle = new Style({ font: "bold italic 50px", color: "white"});
let backgroundGray = new Skin({fill: "#efeff4"}) //default apple background color

let currentScreen;
let screenStack = new Array();
let hasConnectedDevice = 0;

let mainMainContainer = new Container({
    top:0,left:0,right:0,bottom:0
});

let MainContainer = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    skin: backgroundGray,
    contents: [
        new header({left:"<", right:"+", title:"Aromafy home", touchRightFxn: nullFxn}),
        new VerticalScroller($, {
            name: 'scroller',
            contents: [
                new Column({
                    top:0,left:0,right:0,
                    contents: [
                        // TODO INSERT SCROLLING PAGE CONTENT HERE

                    ]
                })
            ]
        })
    ],
}));

let HomeScreen = Column.template( $ => ({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"<", right:"+", title:"Aromafy home", touchRightFxn: nullFxn}),
        new Label({
            string: "Welcome Home",
            top:20,
            height:40,
            style: new Style({ font: "34px", color: "black" }),
            horizontal: "center"
        }),
        new Label({
            string: "Connect your device",
            active:true,
            top:10, left: 20,
            horizontal: "left",
            style: largerTextStyle,
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    transition(connectScreen);
                }
            })
        }),
        new Label({
            string: "Create and Manage Schedules",
            active:true,
            top:10, left: 20,
            style: largerTextStyle,
            horizontal: "left",
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    transition(calendarScreen);
                }
            })
        }),
        new Label({
            string: "Current Scent State",
            active:true,
            top:10, left: 20,
            horizontal: "left",
            style: largerTextStyle,
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    transition(currentStateScreen);
                }
            })
        }),
        new Label({
            string: "Create a Scent",
            active:true,
            top:10, left: 20,
            horizontal: "left",
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    transition(newScentScreen);
                }
            })
        })
    ]
}))

let IntroScreen = Column.template($ => ({
    top:0, bottom:0,left:0,right:0,
    skin: new Skin({fill: "#0BCBCF"}),
    contents: [
        new IntroBlock(),
        //TODO make this look nice
    ]
}));

//TODO This make this look good
let getStartedButton = new Container({
    top:10, //TODO Might need to add other constraints
    width:150,height:30,
    skin: new Skin({fill: "white"}),
    active:true,
    contents: [
        new Label({string: "Get Started", style: basicTextStyle})
    ],
    behavior: Behavior({
        onTouchEnded(content,id,x,y,ticks) {
            //TODO transition to home here
            //removeIntroScreen();
            mmc.remove(is);
            mmc.add(hs);
            currentScreen = hs;
        }
    })
})

//TODO make this look good
let IntroBlock = Column.template($ => ({
    top:300, width:350, //TODO might need to add other constraints
    contents: [
        new Line({
            height:120,left: 20,
            //skin: new Skin({fill:"blue"}),
            contents: [
                new Label({string: "Aromafy", style: mainTextStyle, height:120}),
                new Picture({
                    width:120,height:120, 
                    url: 'http://static.greatbigcanvas.com/images/square/national-geographic/mountains-of-baffin-island-are-reflected-in-fjords-northwest-territories-canada,ng525960.jpg?max=128'
                })
            ]
        }),
        getStartedButton
    ]
}));


let header = Line.template($ => ({
    top:0, left:0, right:0, height:40,
    skin: new Skin({ fill: "#007AFF"}), //Apple safari skin, videos use #5ac8fa
    contents: [
        new Container({
            top:0,left:0,right:0,bottom:0,
            contents: [
            new Label({
                string: $.left,
                top:5,
                style: headerSymbolStyle,
                horizontal: "left",
                active:true,
                behavior: Behavior({
                    onTouchEnded(content,id,x,y,ticks) {
                        //TODO what to do when left header clicked
                        goBack()
                    }
                })
            }),
            ]
        }),
        new Container({
            top:0,left:0,right:0,bottom:0,
            name: "title",
            contents: [
            new Label({
                string: $.title,
                top:5,
                style: headerTextStyle
            }),
            ]
        }),
        new Container({
            top:0,left:0,right:0,bottom:0,
            contents: [
            new Label({
                string: $.right,
                top:5,
                style: headerSymbolStyle,
                horizontal: "right",
                active:true,
                behavior: Behavior({
                    onTouchEnded(content,id,x,y,ticks) {
                        //TODO what to do when right header clicked
                        if ($.touchRightFxn) {
                            $.touchRightFxn()
                        }
                    }
                })
            }),
            ]
        })
    ]
}));

//create a label with label = new lbl({str: "some string", style: someStyle, touchFxn: uncalledFxn (if any)}) 
// Also include params to the touch function in the label params
let lbl = Label.template($ => ({
    left:10,
    string: $.str,
    style: $.style,
    active: true,
    behavior: Behavior({
        onTouchEnded(content, id, x,y,ticks) {
            $.touchFxn($)
        }
    })
}));

function nullFxn() {
	//do nothing
}

//TODO generally customize this modal window (size, position, message, style)
let Modal = Column.template($ => ({
    bottom: 200,//TODO change this value as desired
    skin: new Skin({fill:"white"}),
    contents: [
        new Container({
            height:50, width:200, //TODO change values
            skin: new Skin({fill:"white"}),
            contents: [
                new Label({string: $.string, style: basicTextStyle}),

            ]
        }),
        new Line({
            height:40,width:200, //TODO change values
            skin: new Skin({fill:"blue"}),
            active: true,
            contents: [
                new Label({string: "Okay!", style: headerTextStyle, left:0,right:0})
                //TODO change this string
            ],
            behavior: Behavior({
                onTouchEnded(content,id,x,y,ticks) {
                	//TODO what to do when bar at bottom of modal is clicked
                }
            })
        }),
    ]
}));

function transition(destination) {
    screenStack.push(currentScreen);
    mmc.remove(currentScreen);
    mmc.add(destination);
    currentScreen = destination;
}

function goBack() {
    mmc.remove(currentScreen);
    currentScreen = screenStack.pop();
    if (!currentScreen) {
        currentScreen = homescreen;
    }
    mmc.add(currentScreen);
}

let mmc = mainMainContainer;
let mc = new MainContainer({});
let is = new IntroScreen({});
let hs = new HomeScreen({});
let connectScreen = new MainContainer({});
let currentStateScreen = new MainContainer({});
let calendarScreen = new MainContainer({});
let newScentScreen = new MainContainer({});

application.add(mmc);
mmc.add(is)
currentScreen = is;

//The screen named Group 4 in the figma prototype: the customize scent screen
//Used a 375 x 667 screen to make this, don't know how it would look on other screen dimentions or other devices
//Behaviors not implemented yet
let intensity = 8;
let timeHour = 5;
let timeMinute = 30;
let group4 = new Container({
  left: 0, right: 0, top: 300, bottom: 0,
  active: true,
  skin: backgroundGray,
  contents: [
            new Label({style: new Style({color: "black", font: "24px"}), left: 75, top: 100, string: "Time"}),
  			new Label({style: new Style({color: "black", font: "24px"}), right: 68, top: 100, string: "Intensity"}),
  			new Container({left: 55, top: 140, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),
  			new Container({right: 55, top: 140, height: 40, width: 100, skin: new Skin({fill: "gray"}), active: true}),
  			new Label({style: new Style({color: "black", font: "28px"}), left: 75, top: 145, string: timeHour + ":" + timeMinute}),
  			new Label({style: new Style({color: "black", font: "28px"}), left: 260, top: 145, string: intensity}),
  			new Picture({top: 200, left: 75,url:"http://i.imgur.com/OPaTPDB.png"}),
  			new Picture({top: 265, left: 75, url:"http://i.imgur.com/CfWKqwY.png"}),
  			new Picture({top: 200, left: 236,url:"http://i.imgur.com/OPaTPDB.png"}),
  			new Picture({top: 265, left: 236, url:"http://i.imgur.com/CfWKqwY.png"})
  			]
  });
//application.add(group4);
currentStateScreen = new Column({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"<", right:"+", title:"Aromafy home", touchRightFxn: nullFxn}),
        group4
    ]
});
