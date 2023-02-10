# GameEngine
The GameEngine Agent is a python program that accepts an input from the WebUserInterface Agent, processes it
and updates the game state and status accordingly before forwarding the result to the GameStateTransformer Agent.


# DISCLAIMER
Even the base generated code - from Ingescape Circle - did not run properly in Windows 10, a Segmentation Fault was
raised.

The code was developed and tested in Ubuntu 20.04 and Python 3.8.10 where it runs flawlessly.

By commenting out the _assertion_ in the ``on_agent_event_callback`` function in the [main.py](src/main.py) file,
the code runs in Windows 10 as well without any Segmentation Fault, however, it does not exit properly with ``Ctrl+C``.


# How to run (in Ubuntu 20.04 and Python 3.8.10)
Install the requirements: **ingescape**, then launch the ``main.py`` file: ``python3 main.py``, options are available,
see below.
```bash
cd country-guesser-ihm/CountryGuesser/GameEngine/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd src/
python3 main.py # see below for options
```


## To change the device and port
```bash
python3 main.py --device <device> --port <port>
```
or
```bash
python3 main.py -d <device> -p <port>
```
by default, the device is _enp0s3_ and the port is _5670_:
```bash
python3 main.py -d enp0s3 -p 5670
```
