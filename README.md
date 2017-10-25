# Replacement for GPX web site
This is a replacment for the website at <http://navaid.com/GPX/> because it
looks like it hasn't been updated in 15+ years and it hasn't. Plus I need to
learn a JavaScript framework to be employable in the front end and I have
reasons to choose React.

## Steps
 * Make a prototype of the UI in straight html (Done)
 * Replace parts of the front end code with React (Done)
 * Add some validation and error checking (Done)
 * Realize I don't like the way I structured the classes before and redo them (Done)
 * Write a backend to make it live
 * Replace the existing website

## Running.
This uses React and React-Redux. So to run it, you
may need to do
```
    npm install
```
At that point, you can either just load index.html as a file into your
browser, or
```
    npm run dev
```
and access it on <http://localhost:8080>
