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
import {scents, group4, tempIntensityLabel, tempTimeLabel, isCurrentScent, currentColor, saveSkin, timeHour, intensity, currentScentString} from "scentstate"
import {scentsM, group4M, tempIntensityLabelM, tempTimeLabelM} from "modifystate";
// TODO This is not the best scroller, it works but it covers up the header bar
// Consider finding a better scroller if we need it (I'm not sure we do)
// Scroller is only necessary for the calendar I believe

let appTextColor = "#66AEF2";
let basicTextStyle = new Style({ font: "24px Brandon Grotesque", color: "black" });
let slightlyLargerBasicTextStyle = new Style({ font: "30px Brandon Grotesque", color: "black" });
let largerTextStyle = new Style({ font: "30px Brandon Grotesque", color: "white" });
let bluishLargerTextStyle = new Style({ font: "30px Brandon Grotesque", color: appTextColor });
let headerTextStyle = new Style({ font: "bold 50px Brandon Grotesque", color: "#66AEF2"});
let headerSymbolStyle = new Style({ font: "bold italic 50px Brandon Grotesque", color: "#66AEF2"});
let elemTextStyle = new Style({ font: "20px Brandon Grotesque", color: "#3c4241"});
let elem1TextStyle = new Style({ font: "25px Brandon Grotesque", color: "#3c4241"});
let elem2TextStyle = new Style({ font: "25px Brandon Grotesque", color: "#86BD3E"});
let elemLinkStyle = new Style({ font: "italic 14px Brandon Grotesque", color: "#007aff"}); //this is the apple Link color
let mainTextStyle = new Style({ font: "bold italic 80px Brandon Grotesque", color: "white"});
let backgroundGray = new Skin({fill: "#FFFFFF"}) //default apple background color #efeff4
let scentText = new Style({ font: "24px Brandon Grotesque", color: "white" });
let scentTextStyle = new Style({ font: "20px Brandon Grotesque", color: "white"});
let suggestTextStyle = new Style({ font: "25px Brandon Grotesque", color: "#66AEF2" });
let scentNow = "";
let durationNow = "";
let intensityNow = "";
let settingTextStyle = new Style({ font: "40px Brandon Grotesque", color: "#66AEF2" });

var currentScent = "";
//var currentScentString = "";
var deviceURL = "";
export var selectedCalendarCell;
let selected_i=0;
let selected_j=0;
let selectedDay = "Sup";
let selectedTime = "";
let remotePins;

//Theme Colors
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
    ],
}));
 
let HomeScreen = Column.template( $ => ({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left: " ", right:"", title:"Aromafy", touchRightFxn: nullFxn}),
        new Label({
            string: "Welcome Home",
            top:40, left: 0, right: 0,
            height:40,
            style: new Style({ font: "60px Brandon Grotesque", color: "#66AEF2" }),
            horizontal: "center"
        }),
        new Label({
            string: "Connect your device",
            active:true,
            top:50, width: 260, height: 40,
            horizontal: "center",
            skin: lgreen,
            style: largerTextStyle,
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    transition(connectScreen);
                }
            })
        }),
        new Label({
            string: "My Calendar",
            active:true,
            top:20, width: 260, height: 40,
            style: largerTextStyle,
            skin: lgreen,
            horizontal: "center",
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    //calendarScreen = new scheduleTemp();
                    transition(calendarScreen);
                }
            })
        }),
        new Label({
            string: "Current Scent State",
            active:true,
            top:20, width: 260, height: 40,
            horizontal: "center",
            skin: lgreen,
            style: largerTextStyle,
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    var d = new Date();
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var suffix = "am";
                    var hour = d.getHours();
                    selected_i = d.getHours();
                    selected_j = d.getDay();
                    if (selected_j < 0) {
                        selected_j += 7;
                    }
                    if (hour > 12) {
                        suffix = "pm";
                        hour -= 12;
                    }
                    if (hour == 0) {
                        hour = 12;
                    }
                    var filler = "";
                    if (d.getMinutes() < 10) {
                        filler = "0";
                    }
                    timeStatus.string = "Currently " + days[selected_j] + " at " + hour + ":" + filler + d.getMinutes() + " " + suffix;
                    transition(currentStateScreen);
                }
            })
        }),
        // new Label({
        //     string: "suggest scent screen",
        //     active:true,
        //     top:15, width: 260, height: 40,
        //     horizontal: "center",
        //     skin: lgreen,
        //     style: largerTextStyle,
        //     behavior: Behavior({
        //         onTouchEnded(content, id,x,y,ticks) {
        //             transition(suggestYouScreen);
        //         }
        //     })
        // }),
        /*,
        new Label({
            string: "Create a Scent",
            active:true,
            top:15, width: 260, height: 40,
            style: largerTextStyle,
            horizontal: "center",
            skin: lgreen,
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    transition(newScentScreen);
                }
            })
        })*/
        
    ]
}))
 
let IntroScreen = Container.template($ => ({
    top:0, bottom:0,left:0,right:0,
    contents: [
		new Picture({
          height:675, 
          url: 'http://weneedfun.com/wp-content/uploads/2016/01/Blue-Flower-13.jpg'
         }),
          new Label({string: "Aromafy", style: mainTextStyle, bottom: 80, height:120}),
          getStartedButton
    ]
}));
 
//TODO This make this look good
let getStartedButton = new Container({
    bottom:60, //TODO Might need to add other constraints
    width:150,height:30,
    skin: new Skin({fill: "white"}),
    active:true,
    contents: [
        new Label({string: "Get Started", style: basicTextStyle})
    ],
    behavior: Behavior({
        onTouchEnded(content,id,x,y,ticks) {
        	var handler = new Handler("/");
            //TODO transition to home here
            //removeIntroScreen();
            mmc.remove(is);
            mmc.add(connectScreen);
            currentScreen = connectScreen;
        }
    })
})
 
 
let header = Line.template($ => ({
    top:0, left:8, right:8, height:50,
    skin: new Skin({fill: "white", borders:{left:0,right:0,top:0,bottom:1}, stroke: "#5ac8fa"}), //Apple safari skin, videos use #5ac8fa
    contents: [
        new Container({
            top:0,left:0,right:0,bottom:0,
            contents: [
            new Label({
                string: $.left,
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
                style: headerTextStyle, 
            }),
            ]
        }),
        new Container({
            top:0,left:0,right:0,bottom:0,
            contents: [
            new Label({
                string: $.right,
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
 
let deviceEntry = Column.template($ => ({
    top:0,bottom:10, left:5,right:0,
    width:200,
    contents: [
        new Label({string: $.name, style: basicTextStyle, left:0}),
        new Label({string: $.dist + " ft from you", style: elemTextStyle,left:10}),
        new Label({string: $.status, style: elemTextStyle,left:10})
    ]
}));
 
let connectedMenu = new Container({
    name: "connectedMenu",
    top: 70,
    height: 30, width: 200,
    skin: lgreen,
    active:true,
    contents: [
        new Label({ style: basicTextStyle, string: "John's Aroma Dispenser"})
    ]/*,
    behavior: Behavior ({
        onTouchEnded(content,id,x,y,ticks) {
            content.container.container.remove(yourDevice);
            content.container.add(expandedConnectMenu);
            content.container.container.add(yourDevice);
            content.container.remove(content);
        }
    })*/
})
 
let yourDevice = new Column({
    top: 60,
    left:0, right:0,
    contents: [
        //new Label({string: "Your Device", left: 125, style: bluishLargerTextStyle}),
        new Container({
            top:0,bottom:0,left:0,right:0,
            contents: [
                new Picture({left: 0, right: 0, height:150,width:150, top: 0,
                    url: 'http://cdn.pocket-lint.com/r/c/742x526/assets/images/phpadneab.jpg'
                }),                        
                new Label({string: "Aromafier 2.0", style: elem1TextStyle, top:150}),
                new Line({
                    top:170,left:120,bottom:0, horizontal: "center",
                    contents: [
                        new Label({string: "Status:", style: elem1TextStyle}),
                        new Label({string: " Connected", style: elem2TextStyle}),
                        //new Label({string: "After the rain, until 5:30pm", left:20, style: elemTextStyle}),
                    ]
                })
            ]
        })
    ]
})
let goToCalendar = new Label({
            		string: "Go to My Calendar >",
            		active:true,
            		top:150, skin: new Skin({borders: {bottom: 2}, 
    				stroke: "#66AEF2"}),
            		horizontal: "center",
            		style: settingTextStyle,
            		behavior: Behavior({
                		onTouchEnded() {
                    	transition(calendarScreen);
                		}
            		})
            	}) 
let expandedConnectMenu = new Column({
    name: "expandedConnectMenu",
    top: 70,
    width: 200,
    skin: lblue,
    active:true,
    contents: [
        new deviceEntry({name: "John's Aroma Dispenser", dist:5, status: "Remembered"}),
        //new deviceEntry({name: "Neighbor's Aroma dispenser", dist: 200, status: "Password protected"})
    ],
    behavior: Behavior ({
        onTouchEnded(content,id,x,y,ticks) {
            if (hasConnectedDevice) {
                //content.container.container.remove(yourDevice);
            }
            content.container.add(connectedMenu);
            content.container.add(yourDevice);
            content.container.add(goToCalendar);
            content.container.remove(content);
            hasConnectedDevice = 1;
        }
    })
})
 
let ConnectScreen = Column.template( $ => ({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"", right:"", title:"Device Connect", touchRightFxn: nullFxn}),/*
        new Label({
            string: "Device Link",
            top:20,
            height:40,
            style: new Style({ font: "34px", color: appTextColor}),
            horizontal: "center"
        }),*/
        new Container({
            name: "connectMenu",
            top: 70,
            height: 30, width: 200,
            skin: lblue,
            active:true,
            contents: [
                new Label({ style: slightlyLargerBasicTextStyle, string: "Select Device         v"})
            ],
            behavior: Behavior ({
                onTouchEnded(content,id,x,y,ticks) {
                    content.container.add(expandedConnectMenu);
                    content.container.remove(content);
                }
            })
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
            skin: lblue,
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
    if (destination == connectScreen && hasConnectedDevice) {
    	//destination.add(yourDevice);
    }
    currentScreen = destination;
}
 
export function goBack() {
    if (currentScreen == currentStateScreen){
        application.remove(tempTimeLabel);
        application.remove(tempIntensityLabel);
    }
    if (currentScreen == modifyStateScreen){
        application.remove(tempTimeLabelM);
        application.remove(tempIntensityLabelM);
    }
    mmc.remove(currentScreen);
    currentScreen = screenStack.pop();
    if (!currentScreen) {
        currentScreen = hs;
    }
    mmc.add(currentScreen);
    //scheduleItem.skin=pinkBorderSkin;
}
 
let mmc = mainMainContainer;
let mc = new MainContainer({});
let is = new IntroScreen({});
let hs = new HomeScreen({});
let connectScreen = new ConnectScreen({});
let currentStateScreen = new MainContainer({});
let modifyStateScreen = new MainContainer({});
let calendarScreen = new MainContainer({});
let newScentScreen = new MainContainer({});
let suggestYouScreen = new MainContainer({});
 
application.add(mmc);
mmc.add(is)
currentScreen = is;

// let isCurrentScent = 0;
// let currentColor = whiteBorderSkin;
// let saveSkin = orange;

 
   
// schedule of the device
var greenSkin = new Skin({fill: "green"});
var redSkin = new Skin({fill: "red"});
var blueSkin = new Skin({fill: "blue"});
var whiteBorderSkin = new Skin({
    fill: "white", 
    borders: {left: 2, right: 2, top: 1, bottom: 1}, 
    stroke: "black"
});
  
var scheduleItem = Container.template($ => ({active: true, left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin, 
                    behavior: Behavior({
                        onTouchEnded(content, id,x,y,ticks) {
                            selectedCalendarCell = content;
                            selected_j = $.j;
                            selected_i = $.i;
                            timeStatus.string = calendarTime(selected_j, selected_i);
                            if (has_scent[selected_j][selected_i]){
                            	transition(modifyStateScreen);
                            } else {
                            	transition(currentStateScreen);// suggestYouScreen);
                            }
                        }
                    })
                }))
// var scheduleItem2 = new Container({active: true, left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin, 
//                     behavior: Behavior({
//                         onTouchEnded(content, id,x,y,ticks) {
//                             transition(currentStateScreen);
//                             selectedCalendarCell = content;
//                         }
//                     })
//                 })

export function returnToCal(duration=1, del=false) {
	
    if (isCurrentScent == 0) {
        goBack();
        //transition(calendarScreen)
        return;
    }
    if (del == true) {
        remove_scent(selected_i, selected_j);
        goBack();
        //transition(calendarScreen)
    }
    else {
    	updateDeviceScent(currentScentString);
    	updateDeviceDuration(timeHour);
    	updateDeviceIntensity(intensity);
        if (has_scent[selected_j][selected_i] == true) {
            var prev_i = selected_i - 1;
            var prev_j = selected_j;
            if (prev_i == -1) {
                prev_i = 23;
                prev_j -= 1;
                if (prev_j == -1) {
                    prev_j = 6
                }
            }
            ends_scent[prev_j][prev_i] = true;
        }
        write_color(selected_i,selected_j,currentColor,duration);
        starts_scent[selected_j][selected_i] = true;
        has_scent[selected_j][selected_i] = true;
        goBack();
        //transition(calendarScreen)
    }
    if (currentScreen != calendarScreen) {
        transition(calendarScreen);
    }
}

function write_1_color(i,j, color) {
    calendar_blocks[j][i].skin = new Skin({
            fill: color,
            borders: {left: 2, right: 2, top: 1, bottom: 1},
            stroke: "black"
        })
}
function write_1_white(i,j) {
    calendar_blocks[j][i].skin = new Skin({
            fill: "white",
            borders: {left: 2, right: 2, top: 1, bottom: 1},
            stroke: "black"
        })
}

function write_color(i,j,color,duration) {
    while (duration > 0) {
        if (i > 23) {
            j++;
            i -= 24;
        }
        if (j == 7) {
        	j = 0;
        }
        if (duration == 1) {
            if (has_scent[j][i] && !ends_scent[j][i]) {
                var next_i = i + 1;
                var next_j = j;
                if (next_i > 23) {
                    next_j++;
                    next_i -= 24;
                }
                if (next_j == 7) {
                    next_j = 0;
                }
                starts_scent[next_j][next_i] = true;
            }
        }
        ends_scent[j][i] = false;
        starts_scent[j][i] = false;
        write_1_color(i,j, color)
        has_scent[j][i] = true;
        duration -= 1;
        if (duration == 0) {
            ends_scent[j][i] = true;
        }
        i++;
    }
}

function calendarTime(j,i) {
	if (i< 12){
		if (i==0){
			selectedTime = "12am"
		}
		else{
			selectedTime = i + "am"
		}
	}
	else {
		if (i==12){
			selectedTime = "12pm"
		}
		else{
			selectedTime = (i-12) + "pm"
		}
	}
	if (j==0) {
		return "Start time: Monday " +selectedTime
	}
	if (j==1) {
		return "Start time: Tuesday "+selectedTime
	}
	if (j==2) {
		return "Start time: Wednesday "+selectedTime
	}
	if (j==3) {
		return "Start time: Thursday "+selectedTime
	}
	if (j==4) {
		return "Start time: Friday "+selectedTime
	}
	if (j==5) {
		return "Start time: Saturday "+selectedTime
	}
	if (j==6) {
		return "Start time: Sunday "+selectedTime
	}
}

function remove_scent(i,j) {
    if (has_scent[j][i] == false) {
        return;
    }
    let i_copy = i;
    let j_copy = j;

    while (!starts_scent[j][i]) {
        write_1_white(i,j);
        has_scent[j][i] = false;
        ends_scent[j][i] = false;
        i--;
        if (i < 0) {
            j--;
            i += 24;
        }
        if (j == -1) {
            j = 6;
        }
    }
    write_1_white(i,j);
    has_scent[j][i] = false;
    starts_scent[j][i] = false;
    ends_scent[j][i] = false;

    i = i_copy;
    j = j_copy;

    while (!ends_scent[j][i]) {
        write_1_white(i,j);
        has_scent[j][i] = false;
        starts_scent[j][i] = false;
        i++;
        if (i > 23) {
            j++;
            i -= 24;
        }
        if (j == 7) {
            j = 0;
        }
    }
    write_1_white(i,j);
    has_scent[j][i] = false;
    ends_scent[j][i] = false;
    starts_scent[j][i] = false;

}
                 
let scheduleColumn = new Column({
    left: 45, right: 10, top: 50, bottom:10,
    skin: new Skin({fill:"white"}),
    contents: [
        new Line({height:30,  
            contents: [
                new Label({string: " Mon    ", style: new Style({ font: "24px Brandon Grotesque", color: "black" }),horizontal: "center"}),
                new Label({string: " Tue    ", style: new Style({ font: "24px Brandon Grotesque", color: "black" }),horizontal: "center"}),
                new Label({string: " Wed    ", style: new Style({ font: "24px Brandon Grotesque", color: "black" }),horizontal: "center"}),
                new Label({string: " Thu     ", style: new Style({ font: "24px Brandon Grotesque", color: "black" }),horizontal: "center"}),
                new Label({string: " Fri    ", style: new Style({ font: "24px Brandon Grotesque", color: "black" }),horizontal: "center"}),
                new Label({string: "  Sat   ", style: new Style({ font: "24px Brandon Grotesque", color: "black" }),horizontal: "center"}),
                new Label({string: "   Sun ", style: new Style({ font: "24px Brandon Grotesque", color: "black" }),horizontal: "center"}),
            ]
        }),
    ]
         
    //     new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: pink,
    //         contents: [
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             // scheduleItem2,
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //         ]
    //     }),
        
    //     new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: pinkBorderSkin, 
    //         contents: [
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //         ]
    //     }),
        
    //     new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: whiteBorderSkin,
    //         contents: [
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //         ]
    //     }),
         
          
    //     new Line({left: 0, right: 0, top: 0, bottom: 0, //skin: pinkBorderSkin, 
    //         contents: [
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             new scheduleItem({}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //             // new Content({left: 0, right: 0, top: 0, bottom: 0, skin: whiteBorderSkin}),
    //         ]
    //     }), 
    // ]
});

//let cal_columns = [7];
let calendar_blocks = new Array(7); //indexed [day][hour] where hour in 0...23
let starts_scent = Array(7);
let ends_scent = Array(7);
let has_scent = Array(7);
setup_cal()
function setup_cal() {
	var i;
	var j;
    for (i = 0; i<7;i++) {
        calendar_blocks[i] = new Array(24);
        starts_scent[i] = new Array(24);
        ends_scent[i] = new Array(24);
        has_scent[i] = new Array(24);
    }
    for (i = 0; i < 24; i++) {
        let line = new Line({top:0,bottom:0,left:0,right:0, contents:[]})
        for (j = 0; j < 7; j++) {
            let block = new scheduleItem({i:i,j:j});
            //cal_columns[j] = block;
            calendar_blocks[j][i] = block;
            starts_scent[j][i] = false;
            ends_scent[j][i] = false;
            has_scent[j][i] = false;
            line.add(block);
        }
        scheduleColumn.add(line)
    }
}

let labelHeight = 24;
let timeColumn = new Column({
    left: 5, top: 68, width:40,
    contents: [
        new Label({string: "12am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "1am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "2am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "3am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "4am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "5am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "6am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "7am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "8am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "9am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "10am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "11am", style: basicTextStyle, height:labelHeight}),
        new Label({string: "12pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "1pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "2pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "3pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "4pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "5pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "6pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "7pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "8pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "9pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "10pm", style: basicTextStyle, height:labelHeight}),
        new Label({string: "11pm", style: basicTextStyle, height:labelHeight}),
        
    ]

})

// let plusButton = new Picture({
//     url: "./plus_blue.png",
//     right: 5,bottom:5,
//     width: 60,height:60,
//     active: true,
//     behavior: Behavior({
//         onTouchBegan: function(container) {
//             application.distribute("onToggleLight", 1);
//         },
//         onTouchEnded(content, id,x,y,ticks) {
//             application.distribute("onToggleLight", 0);
//             returnToCal(timeHour);  
//             transition(calendarScreen);
//         }
//     })
// })
let calendarBlur = new Picture({
     url: "./calendarblur.png", left:0, width: 178.5,
     active: true,     behavior: Behavior({
         onTouchEnded(content, id,x,y,ticks) {
         	settingScreen.moveBy(375,0);
         	settingScreenOn = false;
		 }      
     })
})
let logo = new Picture({
     url: "http://cdn.pocket-lint.com/r/c/742x526/assets/images/phpadneab.jpg", left: 220, top: 75,
     height:120, width: 120
})
let settingUI  = new Line({
    top:0, left:175, right:0, height:50, 
    active:true,
    skin: new Skin({fill: "white", borders:{left:0,right:0,top:0,bottom:1}, stroke: "#5ac8fa"}),
    behavior: Behavior({
                onTouchEnded() {
                	settingScreen.moveBy(375,0);
         			settingScreenOn = false;
                    
                }})
})

let settingString = new Label({
			string: "Settings",
			top: 5,
			right: 40,
			style: settingTextStyle,
			})  
			
let deviceUI  = new Line({
    top:225, left:178.5, right:0, height:25, 
    active:true,
    skin: new Skin({fill: "white", borders:{left:0,right:0,top:0,bottom:1}, stroke: "#5ac8fa"}),
    behavior: Behavior({
                onTouchEnded() {
                	settingScreen.moveBy(375,0);
         			settingScreenOn = false;
                    transition(connectScreen);
                }
    })})  
    
let deviceSetting = new Label({
            string: "View My Device",
            active:true,
            left: 200,
            top:220,
            style: suggestTextStyle,
            behavior: Behavior({
                onTouchEnded() {
                	settingScreen.moveBy(375,0);
         			settingScreenOn = false;
                    transition(connectScreen);
                }
            })
        })  
        
         

let currentScentUI  = new Line({
    top:275, left:178.5, right:0, height:25, 
    active:true,
    skin: new Skin({fill: "white", borders:{left:0,right:0,top:0,bottom:1}, stroke: "#5ac8fa"}),
    behavior: Behavior({
                onTouchEnded() {
                	settingScreen.moveBy(375,0);
         			settingScreenOn = false;
                    transition(connectScreen);
                }
    })})  
    
let currentScentSetting = new Label({
            string: "Current Scent",
            active:true,
            left:200,
            top:270,
            style: suggestTextStyle,
            behavior: Behavior({
                onTouchEnded(content, id,x,y,ticks) {
                    var d = new Date();
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var suffix = "am";
                    var hour = d.getHours();
                    selected_i = d.getHours();
                    selected_j = d.getDay();
                    if (selected_j < 0) {
                        selected_j += 7;
                    }
                    if (hour > 12) {
                        suffix = "pm";
                        hour -= 12;
                    }
                    if (hour == 0) {
                        hour = 12;
                    }
                    var filler = "";
                    if (d.getMinutes() < 10) {
                        filler = "0";
                    }
                    timeStatus.string = "Currently " + days[selected_j] + " at " + hour + ":" + filler + d.getMinutes() + " " + suffix;
                    settingScreen.moveBy(375,0);
         			settingScreenOn = false;
                    transition(currentStateScreen);
                }
            })
        })  

let settingScreen = new Container({left: 375, width: 375, height: 667, active:true, skin: new Skin({fill: "white"}),
									contents: [calendarBlur, settingUI, settingString, logo, deviceUI, deviceSetting,
									currentScentUI, currentScentSetting]})
let settingScreenOn = false
let settingButton = new Picture({
     url: "./aromify_setting.jpg",
     right: 20,top:10,
     width: 30,height:30,
     active: true,     behavior: Behavior({
         onTouchEnded(content, id,x,y,ticks) {
         	if (settingScreenOn == false) {
         		settingScreen.moveBy(-375,0);
         		settingScreenOn = true;
         	}
         	else {
         		settingScreen.moveBy(375,0);
         		settingScreenOn = false;
         	}
		 }      
     })
})

let timeStatus = new Label({style: new Style({color: "black", font: "28px Brandon Grotesque"}),  left: 0, right: 0, top: 350, string:""}) 


//application.add(group4);\

currentStateScreen = new Container({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"<", right:"", title:"Add a Scent!", touchRightFxn: returnToCal}),
        timeStatus,
        group4,
        scents
    ]
});
modifyStateScreen = new Container({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"<", right:"", title:"Modify a Scent!", touchRightFxn: returnToCal}),
        group4M,
        scentsM
    ]
});
calendarScreen = new Container({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"", right:"", title:"Schedules", touchRightFxn: nullFxn}),
        scheduleColumn,
        timeColumn,
        settingButton,
        settingScreen
    ]
});
suggestYouScreen = new Container({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"<", right:"", title:"Suggest Scent", touchRightFxn: nullFxn}),
        new Label({
            string: "Do you want a suggestion?",
            active:true,
            top:200,
            horizontal: "center",
            style: suggestTextStyle,
        }),
        new Label({
            string: "yes ✓",
            active:true,
            top:250, width: 150, height: 40,
            horizontal: "center",
            skin: lblue,
            style: largerTextStyle,
            behavior: Behavior({
                onTouchEnded() {
                    transition(currentStateScreen);
                }
            })
        }),  
      new Label({
            string: "no ✖",
            active:true,
            top:330, width: 150, height: 40,
            horizontal: "center",
            skin: lblue,
            style: largerTextStyle,
            behavior: Behavior({
                onTouchEnded(content,id,x,y,ticks) {
                    transition(hs);
                }
            })
        }),
    ]
}); 
newScentScreen = new Container({
    top:0,bottom:0,left:0,right:0,
    skin: backgroundGray,
    contents: [
        new header({left:"<", right:"", title:"New Scent", touchRightFxn: nullFxn})
    ]
});

Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        trace("Found the device.\n");
        deviceURL = JSON.parse(message.requestText).url; 
    }
}));

Handler.bind("/forget", Behavior({
    onInvoke: function(handler, message){
        deviceURL = "";
    }
}));

function updateDeviceScent(s) {
	scentNow = s;
	var handler = new Handler("/");
	handler.invoke(new Message(deviceURL + "updateScent"));
}
function updateDeviceIntensity(s) {
	intensityNow = s;
	var handler = new Handler("/");
	handler.invoke(new Message(deviceURL + "updateIntensity"));
}
function updateDeviceDuration(s) {
	durationNow = s;
	var handler = new Handler("/");
	handler.invoke(new Message(deviceURL + "updateDuration"));
}

Handler.bind("/getScent", Behavior({
    onInvoke: function(handler, message){;
        message.responseText = scentNow;
		message.status = 200;
    }
}));
Handler.bind("/getIntensity", Behavior({
    onInvoke: function(handler, message){
    	//trace("invoked1\n");
        message.responseText = intensityNow;
		message.status = 200;
    }
}));
Handler.bind("/getDuration", Behavior({
    onInvoke: function(handler, message){
    	//trace("invoked1\n");
        message.responseText = durationNow;
		message.status = 200;
    }
}));

class ApplicationBehavior extends Behavior {
    onDisplayed(application) {
    	application.shared = true;
        application.discover("aromaDevice.project.kinoma.marvell.com");
        let discoveryInstance = Pins.discover(
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Connecting to remote pins\n");
                    remotePins = Pins.connect(connectionDesc);
                }
            }, 
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Disconnected from remote pins\n");
                    remotePins = undefined;
                }
            }
        );
    }
    onToggleLight(application, value) {
        if (remotePins) remotePins.invoke("/led/write", value);
    }
    onQuit(application) {
        application.shared = false;
        application.forget("aromaDevice.project.kinoma.marvell.com");
    }
}

application.behavior = new ApplicationBehavior();
