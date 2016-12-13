//@program/* *     Copyright (C) 2010-2016 Marvell International Ltd. *     Copyright (C) 2002-2010 Kinoma, Inc. * *     Licensed under the Apache License, Version 2.0 (the "License"); *     you may not use this file except in compliance with the License. *     You may obtain a copy of the License at * *      http://www.apache.org/licenses/LICENSE-2.0 * *     Unless required by applicable law or agreed to in writing, software *     distributed under the License is distributed on an "AS IS" BASIS, *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *     See the License for the specific language governing permissions and *     limitations under the License. */let Pins = require("pins");let backgroundSkin = new Skin({ fill:'white' });let titleStyle = new Style({ font: "40px Brandon Grotesque", color: "white" });let textStyle = new Style({ font: "34px Brandon Grotesque", color: "white" });var deviceURL = "";
let scent = "none";
let intensity2 = "0%";
let duration = "0";
let color = "#86BD3E";
Handler.bind("/discover", Behavior({    onInvoke: function(handler, message){        deviceURL = JSON.parse(message.requestText).url;
        application.discover("app.project.kinoma.marvell.com");
        trace(deviceURL + "\n");
        trace("discovered device\n");    }}));Handler.bind("/respond", Behavior({	onInvoke: function(handler, message){		message.status = 200;	}}));

Handler.bind("/updateScent", Behavior({	onInvoke: function(handler, message){
		handler.invoke(new Message(deviceURL + "getScent"), Message.TEXT);	},
	onComplete: function(handler, message, text){        scent = text;
        currentScent.string = text;    }}));
Handler.bind("/updateIntensity", Behavior({	onInvoke: function(handler, message){
		handler.invoke(new Message(deviceURL + "getIntensity"), Message.TEXT);	},
	onComplete: function(handler, message, text){        intensity2 = text + "%";
        intensity.string = intensity2;    }}));
Handler.bind("/updateDuration", Behavior({	onInvoke: function(handler, message){
		handler.invoke(new Message(deviceURL + "getDuration"), Message.TEXT);	},
	onComplete: function(handler, message, text){        duration = text;
        time.string = text;    }}));
Handler.bind("/updateColor", Behavior({	onInvoke: function(handler, message){
		handler.invoke(new Message(deviceURL + "getColor"), Message.TEXT);	},
	onComplete: function(handler, message, text){        color = text;
        MainContainer.skin = new Skin({fill: color});    }}));
Pins.repeat("/led/read", 1000, function(result) {   if (result) {   	  trace("led on\n");      new Message(deviceURL + "getScent").invoke(Message.TEXT).then(TEXT =>       {currentScent.string = scent;});   }});var currentScent = new Label({		top: 75, left: 0, right: 0, string: scent, style: textStyle});var time = new Label({		top: 130, left: 0, right: 0, string: duration + " hours", style: textStyle});var intensity = new Label({		top: 185, left: 0, right: 0, string: intensity2, style: textStyle});

var MainContainer = new Container({    top: 0, bottom: 0, left: 0, right: 0,    skin: new Skin({fill: color}),    contents: [        new Label({            top: 5, left: 70, right: 70,            style: titleStyle,  string: "Aromafy Device",        }),        new Label({            top: 50, left: 70, right: 70,            style: textStyle,  string: "Current Scent:",        }),        currentScent,        new Label({            top: 105, left: 70, right: 70,            style: textStyle,  string: "Time Remaining:",        }),        time,        new Label({            top: 160, left: 70, right: 70,            style: textStyle,  string: "Intensity:",        }),        intensity    ],});class AppBehavior extends Behavior {    onLaunch(application) {    	application.shared = true;    	application.add(MainContainer);    	application.discover("app.project.kinoma.marvell.com");    	Pins.configure({            led: {                require: "Digital",                pins: {                    ground: { pin: 51, type: "Ground" },                    digital: { pin: 52, direction: "output" },                }            },            },  success => {            if (success) {                Pins.share("ws", {zeroconf: true, name: "pins-share-led"});                trace("Success!\n");            } else {				trace("Error\n");               };        });            }    onQuit(application) {    	application.shared = false;    }}application.behavior = new AppBehavior();