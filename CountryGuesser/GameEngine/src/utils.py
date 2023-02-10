# Utility functions for the project

# check if the country is valid i.e. it exists in the list of countries
# if it is valid, return True and the correct spelling of the country
# if it is not valid, return False and the original spelling of the country
def is_valid_country(country, countries=None):
    # some processing to make the country names more consistent and easier to compare
    initial = [c.strip() for c in countries]
    countries = [c.strip().lower() for c in countries]

    country = country.strip().lower()
    # generate variants of the country name
    variants = generate_variants(country)

    # check if any of the variants of the guess is in the list of countries
    # if there are no matches, return False and the original spelling of the country
    # if there is one match, return True and the correct spelling of the country
    result = [c for c in variants if c in countries]
    if len(result) == 0:
        return [False, country]
    elif len(result) == 1:
        return [True, initial[countries.index(result[0])]]


# generates a list of variants of the country name to allow for more flexibility in guessing
# e.g. st becomes saint
# this can be further improved by allowing abbreviations such as "U.S." -> "United States"
def generate_variants(country):
    return list({
        country,
        country.replace("st", "saint"),
        country.replace("st.", "saint"),
        country.replace("&", "and")
    })
