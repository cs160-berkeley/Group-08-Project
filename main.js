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
let headerTextStyle = new Style({ font: "bold italic 18px", color: "white"});
let elemTextStyle = new Style({ font: "14px", color: "#3c4241"});
let elemLinkStyle = new Style({ font: "italic 14px", color: "#007aff"}); //this is the apple Link color

let hasConnectedDevice = 0;

let MainContainer = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    skin: new Skin({ fill: "#efeff4" }), //default Apple background
    contents: [
        new header(),
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
            removeIntroScreen();
        }
    })
})

function removeIntroScreen() {
    application.remove(is);
}

//TODO make this look good
let IntroBlock = Column.template($ => ({
    bottom:400, //TODO might need to add other constraints
    contents: [
        new Line({
            height:120,width:375,
            skin: new Skin({fill:"blue"}),
            contents: [
                new Label({string: "placeholder", style: headerTextStyle}),
                new Picture({
                    width:120,height:120, url: 'http://feelgrafix.com/data_images/out/12/857240-mountain-lake-wallpaper.jpg'
                })
            ]
        }),
        getStartedButton
    ]
}));


let header = Line.template($ => ({
    top:0, left:0, right:0,
    skin: new Skin({ fill: "#007AFF"}), //Apple safari skin, videos use #5ac8fa
    contents: [
        new Container({
            top:0,left:0,right:0,bottom:0,
            contents: [
            new Label({
                string: "Left",
                top:5,
                style: headerTextStyle,
                horizontal: "left",
                active:true,
                behavior: Behavior({
                    onTouchEnded(content,id,x,y,ticks) {
                        //TODO what to do when left header clicked
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
                string: "Center header",
                top:5,
                style: headerTextStyle
            }),
            ]
        }),
        new Container({
            top:0,left:0,right:0,bottom:0,
            contents: [
            new Label({
                string: "Right",
                top:5,
                style: headerTextStyle,
                horizontal: "right",
                active:true,
                behavior: Behavior({
                    onTouchEnded(content,id,x,y,ticks) {
                        //TODO what to do when right header clicked
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


let mc = new MainContainer({});
let is = new IntroScreen({});
application.add(mc);
