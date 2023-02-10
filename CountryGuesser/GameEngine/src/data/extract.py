# Extracts the country names from the SVG map and saves them to a text file countries.txt

from xml.dom import minidom

svg = minidom.parse("world.svg")

countries = [path.getAttribute('title') for path in svg.getElementsByTagName('path')]

svg.unlink()

with open("countries.txt", "w") as f:
    for country in countries:
        f.write(country + "\n")
