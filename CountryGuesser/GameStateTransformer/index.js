//
//  index.js
//  GameStateTransformer version 1.0
//  Created by Ingenuity i/o on 2023/01/20
//
//  no description
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

const igs = require('ingescape');
const commandLineArgs = require('command-line-args')
const fs = require('fs');
const GameStateTransformer = require("./src/GameStateTransformer").GameStateTransformer;

const iopTypes = igs.iopTypes();
const iopValueTypes = igs.iopValueTypes();

let verbose = false;
let networkDevice = "";
let port = 5670;
let agentName = "GameStateTransformer";
let igsCertPath = "";
let publicCertsDir = "";

let gameStateTransformer = new GameStateTransformer();

//inputs
function gameStateJsonInputCallback(iopType, name, valueType, value, myData) {
  igs.info(name + " changed to " + value);
  gameStateTransformer.setGameStateJsonI(value);
}

function statusJsonInputCallback(iopType, name, valueType, value, myData) {
  igs.info(name + " changed to " + value);
  gameStateTransformer.setStatusJsonI(value);
}


// Command line interpreter
function printUsage() {
    console.info("Usage examples:");
    console.info("    node index.js --verbose --device en0 --port 5670");
    console.info("\nIngescape parameters:");
    console.info("--verbose : enable verbose mode in the application (default is disabled)");
    console.info("--device device_name : name of the network device to be used (useful if several devices are available)");
    console.info("--port port_number : port used for autodiscovery between agents (default: " + port + ")");
    console.info("--name agent_name : published name of this agent (default: " + agentName + ")");
    console.info("Security:");
    console.info("--igsCert filePath : path to a private certificate used to connect to a secure platform");
    console.info("--publicCerts directoryPath : path to a directory providing public certificates usable by ingescape");
}

const optionDefinitions = [
    { name : 'verbose', alias: 'v', type: Boolean},
    { name : 'device', alias: 'd', type: String},
    { name : 'port', alias: 'p', type: Number},
    { name : 'name', alias: 'n', type: String},
    { name : 'igsCert', type: String},
    { name : 'publicCerts', type: String},
    { name : 'help', alias: 'h', type: Boolean}
];

const options = commandLineArgs(optionDefinitions);
if (options.help) {
    printUsage();
    process.exit(0);
}
if (options.verbose)
    verbose = true;
if (options.device)
    networkDevice = options.device;
if (options.port)
    port = options.port;
if (options.name)
    agentName = options.name;
if (options.igsCert)
    igsCertPath = options.igsCert
if (options.publicCerts)
    publicCertsDir = options.publicCerts


igs.agentSetName(agentName);
igs.logSetConsole(verbose);
igs.logSetFile(true, null);
igs.logSetStream(verbose);
igs.definitionSetVersion("1.0");
igs.setCommandLine(process.argv.join(" "));

//security
if (igsCertPath.length > 0) {
    if (fs.existsSync(igsCertPath)) {
        igs.enableSecurity(igsCertPath, publicCertsDir);
    }
    else {
        igs.error("Could not find Ingescape certificate file '" + igsCertPath + "': exiting");
        process.exit();
    }
}

//network device if not set
if (networkDevice.length === 0) {
    //we have no device to start with: try to find one
    let devices = igs.netDevicesList();
    let addresses = igs.netAddressesList();
    if (devices.length === 1) {
        //we have exactly one compliant network device available: we use it
        networkDevice = devices[0];
        igs.info("using " + networkDevice + " as default network device (this is the only one available)");
    }
    else if ((devices.length === 2) && ((addresses[0] === "127.0.0.1") || (addresses[1] === "127.0.0.1"))) {
        //we have two devices, one of which is the loopback
        //pick the device that is NOT the loopback
        if (addresses[0] === "127.0.0.1")
            networkDevice = devices[1];
        else
            networkDevice = devices[0];
        igs.info("using " + networkDevice + " as default network device (this is the only one available that is not the loopback)");
    }
    else {
        if (devices.length === 0)
            igs.error("No network device found: aborting.");
        else {
            igs.error("No network device passed as command line parameter and several are available.");
            console.info("Please use one of these network devices:");
            for (let i = 0; i < devices.length; i++)
                console.info(devices[i]);
            console.info();
            printUsage();
        }
        process.exit();
    }
}

igs.inputCreate("game_state_json", iopValueTypes.IGS_STRING_T, "");
igs.inputCreate("status_json", iopValueTypes.IGS_STRING_T, "");
igs.observeInput("game_state_json", gameStateJsonInputCallback, null);
igs.observeInput("status_json", statusJsonInputCallback, null);

//actually start ingescape
igs.startWithDevice(networkDevice, port);

// Properly stop our agent/process
function forcedStopCallback(myData) {
    process.exit();
}
igs.observeForcedStop(forcedStopCallback, null);

process.on('SIGINT', function() {
    process.exit();
});

process.on('exit', (code) => {
    igs.stop();
});

