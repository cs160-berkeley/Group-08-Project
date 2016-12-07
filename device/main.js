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

Handler.bind("/discover", Behavior({
        trace(deviceURL + "\n");

Handler.bind("/respond", Behavior({
	onInvoke: function(handler, message){
		message.status = 200;
	}
}));

Pins.repeat("/led/read", 1000, function(result) {
   	  trace("led on\n");
      {currentScent.string = scent;});

var currentScent = new Label({
		top: 75, left: 0, right: 0, string: "Mom's Favorite", style: textStyle});
var time = new Label({
		top: 130, left: 0, right: 0, string: "2:00", style: textStyle});
var intensity = new Label({
		top: 185, left: 0, right: 0, string: "3", style: textStyle});

var MainContainer = new Container({
        new Label({
        currentScent,
        new Label({
        time,
        new Label({
        intensity

class AppBehavior extends Behavior {
    	//application.shared = true;
    	application.add(MainContainer);
    	application.discover("app.project.kinoma.marvell.com");
    	Pins.configure({
                trace("Success!\n");
        
    onQuit(application) {
    	application.shared = false;
    }