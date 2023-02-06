//
//  index.js
//  WebUserInterface version 1.0
//  Created by Ingenuity i/o on 2023/01/27
//
//  no description
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

var chart;
var username;
var serverURL = "ws://localhost:5000";
var jsonText;

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


IGS.netSetServerURL(serverURL);
IGS.agentSetName("WebUserInterface");
IGS.observeWebSocketState(isConnectedToServerChanged);

IGS.definitionSetVersion("1.0");


IGS.inputCreate("text", iopTypes.IGS_STRING_T, "");

IGS.outputCreate("player_input", iopTypes.IGS_STRING_T, "");


//Initialize agent
IGS.observeInput("text", textInputCallback);

//actually start ingescape
IGS.start();

//Jquery controls
$(document).ready(function(){

    chart = createGlobe(false);    

    // Get value on button click and show alert
    $("#button-subscribe").click(function(){
        username = $("#username-input").val();
        console.log(username);
        chart.dispose();
        chart = createGlobe(true);
        $("#username").hide("fast");
        $("#country").show("fast");
        $('#word').text(`Hello ${username}, type your guess and send it!`)
    });

    $("#button-submit").click(function(){
        country = $("#country-input").val();
        jsonText = `{"name": "${username}", "guess": "${country}"}`;
        IGS.outputSetString("player_input", jsonText);
        alert(`Your guess (${country}) has been sent!`);
        console.log(country);
    });
});