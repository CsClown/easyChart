# Testing
## Code Validation
The easyChart site has be thoroughly tested. All the code has been run through the [W3C html Validator](https://validator.w3.org/) and the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/). Minor errors were found on the home and inspiration pages. After a fix and retest, no errors were returned for both. 


## Responsiveness Test

* The responsive design tests were carried out manually with [Google Chrome DevTools](https://developer.chrome.com/docs/devtools/) and [Responsive Design Checker](https://www.responsivedesignchecker.com/).

|        | Google Pixel | Galaxy S5 | iPhone 5 | iPad | iPad Pro | Display <1200px | Display >1200px |
|--------|---------|-----------|----------|------|----------|-----------------|-----------------|
| Render | pass    | pass      | pass     | pass | pass     | pass            | pass            |
| Images | pass    | pass      | pass     | pass | pass     | pass            | pass            |
| Links  | pass    | pass      | pass     | pass | pass     | pass            | pass            |

Note: On wide display types the contents of the site are restricted in width to 1150px. This helps the UX by not spreading the content too wide on the extra wide screens.

## Browser Compatibility

easyChart site was tested on the following browsers:

* Google Chrome 
* Microsoft Edge
* Safari 
* Mozilla Firefox.

i noticed that on Safari the fonts are rendered differently and appear a little smaller.


## Known Bugs
* ### Resolved


* Landscape orientation for moblile doesnt work. (apple doesnt support API).  Chose to switch to JS charts instead of google charts and removing feature. JS charts offers better responsive configuration

* After implementing JS charts and removing google charts, the title naming isnt working anymore.
Realization: if JS throws an compilation error nothing works anymore and i had some wrong code at the other end of the world. Lesson learned.

* +row button doesnt work after implementing the DOM change with example chart
Fixed: changed the event listeners to parent and adressed the element with 'target.matches"

* button hover effects not consistent
resolved through better css targeting

* the check for empty title input doesnt work if once executed with enter. AND enter-input doesnt work at all after first input with enter. Resolved by simply not reacting to empty input field and keeping default title.

* if users clicks on "create your own data set", the title is not the set title but "generic chart"
resolved through js.click() on rename-btn to reset the title-setter

* focus() method doesnt work on +row button.
Resolved: It actually does work, but only selects element for keyboard input not with the mouse cursor. removed feature due to ugly frame around button element i.e in safari browser

* active chart indicator doesnt reset on data wipe.
Resolved by adding resetActive() function

* Chart image downloads as PNG in firefox instead of jpg
Fixed: Typo jpg -> jpeg in dataURL

* ### Unresolved
    * 

## Additional Testing
### Lighthouse
The site was also tested using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) in Chrome Developer Tools to test each of the pages for:
* Performance - How the page performs whilst loading.
* Accessibility - Is the site accessible for all users and how can it be improved.
* Best Practices - Site conforms to industry best practices.
* SEO - Search engine optimization. Is the site optimized for search engine result rankings.

As an example the results for easyChart home page are below:
![Lighthouse test results](assets/readme-images/easyChartlighthouse.png)

This part of the testing process showed up that the accessability was 79%. Through adding aria-labels i could ramp it up to 92%.

### Peer review
In addition to the above testing the beta version of the site was put through its paces by peers, both in the software development field and outside. 

Back to [README.md](./README.md#contents).