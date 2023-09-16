// 23. Browser Support...



// 1. What Is "Browser Support" About?....

// We wanna use some feature for eg: fetch() as a JS dev.
// But we can't decide which browsers our users use.
// We can test our app on a set of browsers but there's not telling which browsers or which platform(mobile & desktop) browsers are used.
// Fetch() is supported on chrome, firefox, edge - and as we know IE has been retired and replaced by edge, safari..
// But for the browsers that don't support fetch() - the app using this API would crash.

// As devs it's our responsibility to target all the browsers and make our code compatible with them.

// There are browser features and JS syntax.
// Kinda related but not the same.
// Browser decides which features it offers.
// Eg: fetch() API, geolocation, DOM API...
// These features aren't part of JS core language.
// The browser's JS engine defines which JS syntax/version is supported.
// Syntax eg: let, const, async/await, promises..

// Browser features are implemented individually.
// If chrome offers some features doesn't have to mean other browsers do it too.
// For JS features are also implemented individually but also in chunks for eg: ES6 and such.
// It's safer to rely on JS syntax rather than browser APIs which may be technically new.

// We'll also learn transpiling a code that transforms into old version code which supports older browsers.


-------------------------------------------------------------------------------------------------------------


// 2. Determining Browser Support For A JavaScript Feature...

// Is a certain feature availble on the browser? We need to find that out when we write our JS code.
// Core feature set is availble on most of the browsers.

// Resources to find the support feature:
// MDN - has browser support table in the feature article. Also often includes notes, fallbacks, workarounds(if missing support).
// caniuse.com - helps when features are search. Shows detailed overview with how many users uses which browser. Also includes the stuff as same as MDN - notes and so on.
// Google - google the question about browser support for a feature.
// ES6/JS Compat table - for JS syntax feature support. Also shows the support of transpilers - where a code doesn't work but we make it work with transpilation tools..

// These resources are very helpful. Look into them.


--------------------------------------------------------------------------------------------------------------


// 3. Determining Required Support....

// DON'T WORK TO SUPPORT ALL BROWSERS & ALL VERSION.
// DON'T EVER PASS UP ON SOME FEATURES AND IMPROVEMENTS TO TARGET A LITTLE NUMBER OF USER BASE.
// Analyse the market - make & use features for users targetted for the app.

// For eg: internal systems in companies are often web apps - used by it's employees - we would set a policy to use a particular browser or not to use a unsupported browser.
// Any web page/app targetting tech savvy or modern users - they would have cutting edge browsers - don't go for older support here.
// We don't have to support old legacy browsers if the user base / targetted audience for that is low to none.
// We can add legacy/old browser support if we target the old audience.

// We also need to test our code regarding the browser supports.


-----------------------------------------------------------------------------------------------------------


// 4. Solution: Feature Detection + Fallback Code....

// We can use feature detection and fallback for a certain feature not available/supported by a browser.

// Eg: Clipboard API - works in some and doesn't work in others. We check the support on the resources.
// SIDE NOTE - Unknown means that the browser vendors don't give any update regarding the feature.

// We use feature detection - check availability of a feature - 'not undefined' - if available, execute & if not, execute fallback or error code.

// We run a dev server - npm run build:dev here for the app.
// We wanna use clipboard API - so we change the HTML code by adding a paragraph which we need to be copied to clipboard when we click the button.

// We get access to the paragraph and place it inside the button EL.
const textParagraph = document.querySelector("p");
// We get our text by accessing textParagraph's text content.
const text = textParagraph.textContent;

// We wanna use the clipboard API and place this in the clipboard of the user.
navigator.clipboard
// It will take writeText() method which will need a data in there.
navigator.clipboard.writeText(text);
// Thereafter it gives a promise.
// So we see the result and also add the catch method or we could use asyn await too, and console the error we might be getting.
navigator.clipboard.writeText(text).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error)
});

// We click on the copy button - we see undefined inside the console but if we CTRL+V - paste on the console, we see our text being pasted there - so it got copied to clipboard. 

// This works cause firefox supports it.
// Let's open the server in edge and see if it still works there.
// Yes it works there cause it's supported there...
// But if it doesn't work on another browser it won't move to catch and throw error - it would crash the app - cause it's not the copy action that went wrong - but the whole method which navigator.clipboard works on yields undefined.
// We could try TRY method but that would only make the code look ugly.

// Let's use feature detection.
// We wrap the code in if check and pass in the condition navigator.clipboard - as it's undefined & undefined is falsy value - the code will only run where undefined isn't falsy, meaning it'll work on the browsers which supports the API.

if(navigator.clipboard){
  navigator.clipboard
    .writeText(text)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

// In the browsers where this doesn't work - it won't crash the app.
// Now we need to provide some fallback code for browsers where it's not supported by else.

else{
  alert('Feature not available, please copy manually')
} ;
// The fallback code depends on the devs and how they want the user experience to be better.

// Feature detection & fallback code are nice to have so that even if any feature isn't supported by browsers - the app would work on other things and these unsupported things won't effect the users and the use of app.
// It's better to show alert or an error message than doing nothing.


-----------------------------------------------------------------------------------------------------------


// 5. Using Polyfills...

// It's a third-party package which adds a functionality which otherwise might be missing in a browser.
// Lets say we wanna use promises - but promises doesn't support on all browsers.
// Polyfills teaches the browser how to use that feature - not possible for all features.

// How do we find such a polyfill?
// We can search on google or we can use the resources that were given to use by Max..
// For eg: we search for fetch polyfill on google and look into it's usages and stuff..

// Basically what a polyfill does here - on fetch - is that it adds the fetch function to global window object.
// Polyfill rebuild the function with other tools that are supported on that browser.

// Promises and fetch api are the examples which we can make work in older browsers with polyfills.


------------------------------------------------------------------------------------------------------------


// 6. Solution: Transpiling Code...

// Links available on resources of this lecture...
// https://babeljs.io/docs/
// https://github.com/babel/babel-loader
// https://babeljs.io/docs/babel-preset-env
// https://github.com/browserslist/browserslist#full-list

// For some features we can't use feature detection, fallback code or polyfills. 
// There are JS syntax features - Core JS feature - which won't be supported on older browsers.
// Keywords like const or arrow functions won't work on older browsers which then will crash.
// And there's no other workaround to make them work - we use TRANSPILATION, to ship or deploy code that does work.

// TRANSPILATION - to transform modern code to older code.
// There are third-party tools to do this - BABEL - is the most prominent tool.
// It can be integrated to our webpack workflow so everything happens at one step.
// Helps us ship cutting edge modern code into cross browser code.

// We search for babel-loader which is part of webpack integration.
// The links are above.
// Babel.io will help us understand it cause of all the info about it there.

// There are 3 packages for babel-loader.
// We have babel-loader for integration to webpack, babel tool & babel preset env is a preset that controlls which features are compiled in which way.

// To use this - we enter/paste an entry in webpack.config.js - the entry is copied from the usage of babel loader page.
// In the entry = we see inside the module - there are rules and in the rules - test is there which is a RegEx - test: /\.m?js$/.
// We copy the pasted module inside the prod config file too cause it's the code we would ship to our users.

// Babel preset is a set of rules that controls which features are translated to which older code.
// We wanna tell babel and preset package - for which browser is the compilation should be fine tuned.

// How do we pass the info to babel?
// In package.json - above devdependencies we add a new entry - 'browserslist' - it will hold value in strings.
// Browserslist is a package used by babel/preset-env.
// In links we can find which options we can set there.

// If we set >2% means we wanna output code that works in browsers with market share greater than 2%...
// With this - we run build.
// In scripts folder - we see our code - app.js - in there the code has changed.

// Now if we set the market share to 0.2% - babel will convert the code to much older code.
// We can also be specific about different browser versions - chrome v58. 
// We can also add multiple configurations like ">0.2%, not dead"

// One more problem we get is that in our code we use promises - and it's there in the transpiled code - the browsers don't have that feature to work with.
// So we might wanna combine this approach with polyfills.


----------------------------------------------------------------------------------------------------------------


// 7. Improvement: Automatically Detect + Add Polyfills....

// To make some features work in older browsers - we use polyfills to teach it. 
// Thus we have - feature detection, transpilled code & polyfills.
// If we know which polyfill to add - we can search about that and add it but if the project is bigger and bigger - it would be a problem.
// We want it in a way that - if babel sees that we use a promise, it would be nice to just include a polyfill for that.
// Babel can do it - it relies on a package called core-js which is a collection of polyfills..

// We can import core-js but then we would be using everything - including the features that we don't need.
// We work with it and further...
// npm install --save core-js, cause it's not part of some development server but a third party package.

// Add it on top of app.js
import 'core-js';
// When we run build:dev - there is problems with this..
// In network tab we see our app.js is huge - 3.74MB
// If we remove import - it gets small..

// If we import the feature that we need - the file will get smaller - 1.30MB.
// We import the promise feature like this & for more we can look into core-js web page how to import specific feature.
import 'core-js/features/promise'

// But the problem with this is that we have to manually manage that we use - we want babel to manage it.

// So in config.js we tell babel to do auto polyfilling.
// The presets in there should be tweaked - into nested array.
presets: [["@babel/preset-env"]]
// We add an object.
// In the object we use - useBuiltIns: - this allow us to control polyfilling behavior.
presets: [["@babel/preset-env", {useBuiltIns:}]]
// Default to it is false.
// We can set it to 'usage' or 'entry'.
// With entry we manually need to add a polyfill import, with usage babel will add polyfills as it detects it.
// We try usage. 
presets: [["@babel/preset-env", {useBuiltIns:'usage'}]]
// NOTE: we need to install another package here - regenerator-runtime.
// This is another polyfill package handling some other features which core-js doesn't handle which babel will utilize if in use.

// We also need to add corejs into the mix for the moment.
// We tell the version of core-js we're using to babel.
presets: [
  [
    "@babel/preset-env",
    { useBuiltIns: "usage", corejs: { version: 3 } },
  ],
]

// We run build:dev.
// We don't see any change cause - babel see that clipboard API use promises but it itself won't work on older browsers - so no adding of polyfills for promises.

// To see the example we add a new promise and get some output.
const promise = new Promise()
console.log(promise)

// Now babel adds polyfill for promise and the file size got a bit bigger.

// If we use ENTRY instead of usage - we have to import these things.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// This imports will be replaced by babel with polyfills imports.

// We see the file size is big cause babel will load all polyfills according to the browserslist - browsers - we mentioned.
// This is a good thing when we don't know which exact features we wanna use & if our code isn't all the code that should be taken into account as we use third-party packages which babel doesn't check.
// This is why browser list is the best indicator.

// We copy the presets to production config too so it can use the polyfills our code may require.


----------------------------------------------------------------------------------------------------------------


// 8. What about Support Outside of Browsers?...

// JS is a hosted language which runs outside browsers too.
// Outside we control which version of JS or Node.js we use which would support certain features.
// On browser-side we don't have control.


-------------------------------------------------------------------------------------------------------------


// 9. Browser Support Outside of JavaScript Files...

// If we add modules on index.html script file - older browsers won't support this.
// Then we can use nomodule inside scripts
<script nomodule></script>

// Older browser won't understand nomodule attribute and execute the script.
// nomodule can hold any fallback code which works with older browsers.

// If the users disables JS - we might wanna show them message regarding that in html file.
/* <noscript>
  Please enable JS to use this page...
</noscript> */


----------------------------------------------------------------------------------------------------------------


