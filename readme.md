# Inventory

I started building this when I was preparing to move most of my stuff into self storage, I considered using a note on Google Keep for each box, but considering I was starting out with 19 boxes I decided that would become unruly.

The basic brief I set myself was:

 * Ability to manage boxes
 * Ability to manage what is in each box, as a list
 * Store data as JSON to allow it to be saved in Dropbox

## Usage

To start the server run `./app.js` from the project root. Then go to: [localhost:2693][inventory]

## Markdown

I decided it might be useful to have a markdown output showing the content of all boxes to present to the self storage facility.

```
# Open in Mou
./markdown.js > ./boxes.md && open -a Mou ./boxes.md

# Save raw markdown as a PDF
./markdown.js > ./boxes.md && cupsfilter ./boxes.md > boxes.pdf 2> /dev/null
```

  [inventory]: http://localhost:2693/
