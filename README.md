# CS160 Group 8 (Team Hufflepuff) V1 coded prototype

## Use this readme to post tips for other group members to ease development. For example:
* Tempates you created, how they can be created, and what parameters they must take (sample code is great)
* Other protocalls/functions that are helpful or necessary to know (basically so that nobody ever has to dig through code they didn't write looking for exactly what arguments they need to pass into something)
* Design specifications/generalizations/guidelines we should follow, for consistency
* Project roadmap and other important notes. I imagine much of this can go in the facebook chat as well

## Screens:
* MainController - generic screen with header
* new IntroScreen({}) - first screen seen by user, contains logo and "Get started" Button

## Templates, models, constants, and other functions

new header({left:"left title"(usually < signifying back), title: "title string", right: "right title" (usually + or new), touchRightFxn: uncalledFxn}) - Create header for each page. Will need to customize this for each page and maintain a stack of pages for the back functionality. TouchRightFxn will be called when the top right lebel is tapped

new Modal({string: "some string"}) - a simple modal window that pops up in the middle of the screen. Position must be hard coded for screen size. Default confirmation string is currently "Okay!"

new lbl({str: "some string", style: someStyle, touchFxn: someFxn}) - just put the uncalled function here and define it globally. Use nullFxn if you don't want any touch behavior

### Constants

* hasConnectedDevice - 0 if there is no connected device, 1 if there is (so that the initial connect a device screen can be skipped). Corresponds to the existance of a device summary on the bottom of the pairing page

## Design Guidelines

* Screen Dimension: IPhone 6: 375 x 667

### Styles
* basicTextStyle: for normal text (14px black)
* headerTextStyle: for header use (18 black)
* elemTextStyle: for text in elements (14 gray)
* linkTextStyle: same as elemText only blue and italic

### General Design 
* [Apple design Guidelines](https://designcode.io/iosdesign-guidelines)
* [Readme markdown guide](https://daringfireball.net/projects/markdown/basics)


## Roadmap