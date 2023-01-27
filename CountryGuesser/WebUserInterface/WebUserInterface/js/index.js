//
//  index.js
//  WebUserInterface version 1.0
//  Created by Ingenuity i/o on 2023/01/27
//
//  no description
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

//server connection
function isConnectedToServerChanged(isConnected)
{
    if (isConnected)
        document.getElementById("connectedToServer").style.background = 'green';
    else
        document.getElementById("connectedToServer").style.background = 'red';
}

//inputs
function textInputCallback(type, name, valueType, value, myData) {
    console.log(name + " changed to " + value);
    //add code here if needed

    document.getElementById("text_input").innerHTML = value;
}


IGS.netSetServerURL("ws://localhost:5000");
IGS.agentSetName("WebUserInterface");
IGS.observeWebSocketState(isConnectedToServerChanged);

IGS.definitionSetVersion("1.0");


IGS.inputCreate("text", iopTypes.IGS_STRING_T, "");

IGS.outputCreate("player_input", iopTypes.IGS_STRING_T, "");


//Initialize agent
IGS.observeInput("text", textInputCallback);

//actually start ingescape
IGS.start();


//
// HTML example
//

document.getElementById("serverURL").value = IGS.netServerURL();
document.getElementById("name").innerHTML = IGS.agentName();

function executeAction() {
    //add code here if needed
}

//update websocket config
function setServerURL() {
    IGS.netSetServerURL(document.getElementById("serverURL").value);
}

//write outputs
function setplayer_inputOutput() {
    IGS.outputSetString("player_input", document.getElementById("player_input_output").value);
}

