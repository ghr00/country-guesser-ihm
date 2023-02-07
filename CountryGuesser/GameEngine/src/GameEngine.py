#!/usr/bin/env -P /usr/bin:/usr/local/bin python3 -B
# coding: utf-8

#
#  GameEngine.py
#  GameEngine version 1.0
#  Created by Ingenuity i/o on 2023/01/27
#
# The agent that will receive player inputs' (text), then process it, then broadcast the current game's state to all
# connected players.
#

import json

import ingescape as igs

from status import Status
from utils import is_valid_country


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


with open("data/countries.txt", "r") as f:
    world_countries = f.readlines()


class GameEngine(metaclass=Singleton):
    def __init__(self):
        # inputs
        # {"name": "player_name", "guess": "country_guess"}
        self.player_inputI = None

        # outputs
        # {"countries": [{"name": "country", "guesser": "player"}], "ladder": [{"name": "player", "score": score}]}
        self._game_state_jsonO = {"countries": [], "ladder": []}
        # {"status": Status.UNDEFINED.value}
        self._status_jsonO = {"status": Status.UNDEFINED.value}

        self.player_name = None
        self.country_guess = None

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

    def run(self):
        self.parse_input()
        self.process_username()
        self.process_guess()

    def parse_input(self):
        player_input = json.loads(self.player_inputI)
        self.player_name = player_input["name"]
        self.country_guess = player_input["guess"]

    def process_username(self):
        name = self.player_name
        if name not in [player["name"] for player in self._game_state_jsonO["ladder"]]:
            print("Player", name, "joined the game.")
            self._game_state_jsonO["ladder"].append({"name": name, "score": 0})

    def process_guess(self):
        guess = self.country_guess
        [is_valid, guess] = is_valid_country(guess, world_countries)
        if not is_valid:
            self._status_jsonO["status"] = Status.INVALID_GUESS.value
        else:
            if guess in [element["name"] for element in self._game_state_jsonO["countries"]]:
                self._status_jsonO["status"] = Status.ALREADY_GUESSED.value
            else:
                print("Player", self.player_name, "guessed", guess, "correctly.")
                self._game_state_jsonO["countries"].append({"name": guess, "guesser": self.player_name})
                self._status_jsonO["status"] = Status.CORRECT_GUESS.value
                next(p for p in self._game_state_jsonO["ladder"] if p["name"] == self.player_name)['score'] += 1
                self._game_state_jsonO["ladder"] = sorted(self._game_state_jsonO["ladder"], key=lambda k: k['score'],
                                                          reverse=True)
        igs.output_set_string("game_state_json", json.dumps(self._game_state_jsonO))
        igs.output_set_string("status_json", json.dumps(self._status_jsonO))
