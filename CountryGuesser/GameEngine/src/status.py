# Enum for the status of a guess

from enum import Enum


# Status of a guess
# UNDEFINED: the guess has not been processed yet - initial value
# CORRECT_GUESS: the guess is correct and has not been made before
# ALREADY_GUESSED: the guess has already been made
# INVALID_GUESS: the guess is incorrect - the country does not exist
class Status(Enum):
    UNDEFINED = "UNDEFINED"
    CORRECT_GUESS = "CORRECT_GUESS"
    ALREADY_GUESSED = "ALREADY_GUESSED"
    INVALID_GUESS = "INVALID_GUESS"
