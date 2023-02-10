#!/usr/bin/env -P /usr/bin:/usr/local/bin python3 -B
# coding: utf-8

#
#  main.py
#  GameEngine version 1.0
#  Created by Ingenuity i/o on 2023/01/27
#
# The agent that will receive player inputs' (text), then process it, then broadcast the current game's state to all
# connected players.
#

import argparse
import getopt
import signal
import sys
import time
from pathlib import Path

from GameEngine import *

DEFAULT_DEVICE = "enp0s3"
DEFAULT_PORT = 5670

parser = argparse.ArgumentParser()
parser.add_argument("--device", "-d", help="name of the network device to be used", default=DEFAULT_DEVICE)
parser.add_argument("--port", "-p", help="port to be used", default=DEFAULT_PORT)

args = parser.parse_args()

device = args.device
port = args.port
agent_name = "GameEngine"
verbose = False
is_interrupted = False

short_flag = "hvip:d:n:"
long_flag = ["help", "verbose", "interactive_loop", "port=", "device=", "name="]

ingescape_path = Path("~/Documents/Ingescape").expanduser()


def print_usage():
    print("Usage example: ", agent_name, " --verbose --port 5670 --device device_name")
    print("\nthese parameters have default value (indicated here above):")
    print("--verbose : enable verbose mode in the application (default is disabled)")
    print("--port port_number : port used for autodiscovery between agents (default: 31520)")
    print("--device device_name : name of the network device to be used (useful if several devices available)")
    print("--name agent_name : published name for this agent (default: ", agent_name, ")")
    print("--interactive_loop : enables interactive loop to pass commands in CLI (default: false)")


def print_usage_help():
    print("Available commands in the terminal:")
    print("	/quit : quits the agent")
    print("	/help : displays this message")


def return_iop_value_type_as_str(value_type):
    if value_type == igs.INTEGER_T:
        return "Integer"
    elif value_type == igs.DOUBLE_T:
        return "Double"
    elif value_type == igs.BOOL_T:
        return "Bool"
    elif value_type == igs.STRING_T:
        return "String"
    elif value_type == igs.IMPULSION_T:
        return "Impulsion"
    elif value_type == igs.DATA_T:
        return "Data"
    else:
        return "Unknown"


def return_event_type_as_str(event_type):
    if event_type == igs.PEER_ENTERED:
        return "PEER_ENTERED"
    elif event_type == igs.PEER_EXITED:
        return "PEER_EXITED"
    elif event_type == igs.AGENT_ENTERED:
        return "AGENT_ENTERED"
    elif event_type == igs.AGENT_UPDATED_DEFINITION:
        return "AGENT_UPDATED_DEFINITION"
    elif event_type == igs.AGENT_KNOWS_US:
        return "AGENT_KNOWS_US"
    elif event_type == igs.AGENT_EXITED:
        return "AGENT_EXITED"
    elif event_type == igs.AGENT_UPDATED_MAPPING:
        return "AGENT_UPDATED_MAPPING"
    elif event_type == igs.AGENT_WON_ELECTION:
        return "AGENT_WON_ELECTION"
    elif event_type == igs.AGENT_LOST_ELECTION:
        return "AGENT_LOST_ELECTION"
    else:
        return "UNKNOWN"


def signal_handler(signal_received, frame):
    global is_interrupted
    print("\n", signal.strsignal(signal_received), sep="")
    is_interrupted = True


# FOR SOME REASON
# THIS FUNCTION CAUSES THE PROGRAM TO CRASH WHEN RUN IN WINDOWS
# IT EXITS WITH A SEGMENTATION FAULT ERROR
# WHEN COMMENTED OUT, THE PROGRAM RUNS FINE IN WINDOWS
# IT IS ENOUGH TO COMMENT OUT THE ASSERTION LINE TO MAKE IT WORK
# HOWEVER IT DOES NOT EXIT WHEN CTRL+C IS PRESSED
# IN LINUX, IT RUNS FINE WITH THIS FUNCTION
def on_agent_event_callback(event, uuid, name, event_data, my_data):
    agent_object = my_data
    # assert isinstance(agent_object, GameEngine)
    # add code here if needed
    pass


def on_freeze_callback(is_frozen, my_data):
    agent_object = my_data
    assert isinstance(agent_object, GameEngine)
    # add code here if needed


# inputs
def player_input_input_callback(iop_type, name, value_type, value, my_data):
    agent_object = my_data
    assert isinstance(agent_object, GameEngine)

    # set the player input value
    agent_object.player_inputI = value
    # and run the main game logic in GameEngine.py
    agent_object.run()


if __name__ == "__main__":

    # catch SIGINT handler before starting agent
    signal.signal(signal.SIGINT, signal_handler)
    interactive_loop = False

    try:
        opts, args = getopt.getopt(sys.argv[1:], short_flag, long_flag)
    except getopt.GetoptError as err:
        igs.error(err)
        sys.exit(2)
    for o, a in opts:
        if o == "-h" or o == "--help":
            print_usage()
            exit(0)
        elif o == "-v" or o == "--verbose":
            verbose = True
        elif o == "-i" or o == "--interactive_loop":
            interactive_loop = True
        elif o == "-p" or o == "--port":
            port = int(a)
        elif o == "-d" or o == "--device":
            device = a
        elif o == "-n" or o == "--name":
            agent_name = a
        else:
            assert False, "unhandled option"

    igs.agent_set_name(agent_name)
    igs.definition_set_version("1.0")
    igs.definition_set_description("""The agent that will receive player inputs' (text), then process it, 
    then broadcast the current game's state to all connected players.""")
    igs.log_set_console(verbose)
    igs.log_set_file(True, None)
    igs.log_set_stream(verbose)
    igs.set_command_line(sys.executable + " " + " ".join(sys.argv))

    if device is None:
        # we have no device to start with: try to find one
        list_devices = igs.net_devices_list()
        list_addresses = igs.net_addresses_list()
        if len(list_devices) == 1:
            device = list_devices[0].decode('utf-8')
            igs.info("using %s as default network device (this is the only one available)" % str(device))
        elif len(list_devices) == 2 and (list_addresses[0] == "127.0.0.1" or list_addresses[1] == "127.0.0.1"):
            if list_addresses[0] == "127.0.0.1":
                device = list_devices[1].decode('utf-8')
            else:
                device = list_devices[0].decode('utf-8')
            print("using %s as de fault network device (this is the only one available that is not the loopback)" % str(
                device))
        else:
            if len(list_devices) == 0:
                igs.error("No network device found: aborting.")
            else:
                igs.error("No network device passed as command line parameter and several are available.")
                print("Please use one of these network devices:")
                for device in list_devices:
                    print("	", device)
                print_usage()
            exit(1)

    agent = GameEngine()

    igs.observe_agent_events(on_agent_event_callback, agent)
    igs.observe_freeze(on_freeze_callback, agent)

    igs.input_create("player_input", igs.STRING_T, None)

    igs.output_create("game_state_json", igs.STRING_T, None)
    igs.output_create("status_json", igs.STRING_T, None)

    igs.observe_input("player_input", player_input_input_callback, agent)

    igs.start_with_device(device, port)
    # catch SIGINT handler after starting agent
    signal.signal(signal.SIGINT, signal_handler)

    if interactive_loop:
        print_usage_help()
        while True:
            command = input()
            if command == "/quit":
                break
            elif command == "/help":
                print_usage_help()
    else:
        while (not is_interrupted) and igs.is_started():
            time.sleep(2)

    if igs.is_started():
        igs.stop()
