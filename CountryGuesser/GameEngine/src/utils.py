def is_valid_country(country, countries=None):
    initial = [c.strip() for c in countries]
    countries = [c.strip().lower() for c in countries]

    country = country.strip().lower()
    variants = generate_variants(country)

    result = [c for c in variants if c in countries]
    if len(result) == 0:
        return [False, country]
    elif len(result) == 1:
        return [True, initial[countries.index(result[0])]]


def generate_variants(country):
    return list({
        country,
        country.replace("st", "saint"),
        country.replace("st.", "saint"),
        country.replace("&", "and")
    })
