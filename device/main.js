//@program
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
let Pins = require("pins");
let backgroundSkin = new Skin({ fill:'white' });
let lgreen = new Skin({fill: "#86BD3E"});
let titleStyle = new Style({ font: "40px Brandon Grotesque", color: "white" });
let textStyle = new Style({ font: "34px Brandon Grotesque", color: "white" });
var deviceURL = "";

Handler.bind("/discover", Behavior({    onInvoke: function(handler, message){        deviceURL = JSON.parse(message.requestText).url;
        trace(deviceURL + "\n");    }}));

Handler.bind("/respond", Behavior({
	onInvoke: function(handler, message){
		message.status = 200;
	}
}));

Pins.repeat("/led/read", 1000, function(result) {   if (result) {
   	  trace("led on\n");      new Message(deviceURL + "getScent").invoke(Message.TEXT).then(TEXT => 
      {currentScent.string = scent;});   }});

var currentScent = new Label({
		top: 75, left: 0, right: 0, string: "Mom's Favorite", style: textStyle});
var time = new Label({
		top: 130, left: 0, right: 0, string: "2:00", style: textStyle});
var intensity = new Label({
		top: 185, left: 0, right: 0, string: "3", style: textStyle});

var MainContainer = new Container({    top: 0, bottom: 0, left: 0, right: 0,    skin: lgreen,    contents: [        new Label({            top: 5, left: 70, right: 70,            style: titleStyle,  string: "Aromafy Device",        }),
        new Label({            top: 50, left: 70, right: 70,            style: textStyle,  string: "Current Scent:",        }),
        currentScent,
        new Label({            top: 105, left: 70, right: 70,            style: textStyle,  string: "Time Remaining:",        }),
        time,
        new Label({            top: 160, left: 70, right: 70,            style: textStyle,  string: "Intensity:",        }),
        intensity    ],});

class AppBehavior extends Behavior {    onLaunch(application) {
    	//application.shared = true;
    	application.add(MainContainer);
    	application.discover("app.project.kinoma.marvell.com");
    	Pins.configure({            led: {                require: "Digital",                pins: {                    ground: { pin: 51, type: "Ground" },                    digital: { pin: 52, direction: "output" },                }            },            },  success => {            if (success) {                Pins.share("ws", {zeroconf: true, name: "pins-share-led"});
                trace("Success!\n");            } else {				trace("Error\n");               };        });
            }
    onQuit(application) {
    	application.shared = false;
    }}application.behavior = new AppBehavior();
