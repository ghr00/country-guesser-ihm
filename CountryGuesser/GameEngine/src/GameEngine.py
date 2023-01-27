#!/usr/bin/env -P /usr/bin:/usr/local/bin python3 -B
# coding: utf-8

#
#  GameEngine.py
#  GameEngine version 1.0
#  Created by Ingenuity i/o on 2023/01/24
#
# The agent that will receive player inputs' (text), then process it, then broadcast the current game's state to all
# connected players.
#

import ingescape as igs


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class GameEngine(metaclass=Singleton):
    def __init__(self):
        # inputs
        self.player_inputI = None

        # outputs
        self._game_state_jsonO = None
        self._status_jsonO = None

    # outputs
    @property
    def game_state_jsonO(self):
        return self._game_state_jsonO

    @game_state_jsonO.setter
    def game_state_jsonO(self, value):
        self._game_state_jsonO = value
        if self._game_state_jsonO is not None:
            igs.output_set_string("game_state_json", self._game_state_jsonO)

    @property
    def status_jsonO(self):
        return self._status_jsonO

    @status_jsonO.setter
    def status_jsonO(self, value):
        self._status_jsonO = value
        if self._status_jsonO is not None:
            igs.output_set_string("status_json", self._status_jsonO)

    # services
    def player(self, sender_agent_name, sender_agent_uuid, name):
        pass
        # add code here if needed