/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
function getClosest( elem, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }

    return null;
}

function underscored(str) {
  return str.trim().replace(/[\(\)\+\-]/g,"_").replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
}

function addGitButton() {
    // Grab any action div's
    var editActions = document.querySelectorAll("div.actions");
    // If there were some action divs
    if (editActions.length > 0) {
        // Loop through the action divs
        editActions.forEach(function(singleAction) {
            var story = getClosest(singleAction, ".story");
            var textArea = story.querySelectorAll("textarea.name");
            var title = underscored(textArea[0].defaultValue);

            // Get the id copy button
            var idCopyButton = singleAction.childNodes[5];
            // If the child node isn't undefined and it does not already have a git button, add one
            var existingButton = document.querySelectorAll(".story_copy_git");
            if (typeof singleAction.childNodes[7].className != 'undefined') {
                if (!singleAction.childNodes[7].className.includes('story_copy_git')) {
                    // Grab the story ID
                    var storyIdInput = singleAction.querySelector("input.text_value");
                    var storyId = storyIdInput.value.substr(1);
                    // Create a new git command button
                    var button = document.createElement("button");
                    button.style.background = "url('data:image/svg+xml;utf8,<svg width=\"10px\" height=\"16px\" viewBox=\"0 0 10 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><!-- Generator: Sketch 40.3 (33839) - http://www.bohemiancoding.com/sketch --><title>git-branch</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Octicons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g id=\"git-branch\" fill=\"#000000\"><path d=\"M10,5 C10,3.89 9.11,3 8,3 C6.89,3 6,3.89 6,5 C6,5.73 6.41,6.38 7,6.72 L7,7.02 C6.98,7.54 6.77,8 6.37,8.4 C5.97,8.8 5.51,9.01 4.99,9.03 C4.16,9.05 3.51,9.19 2.99,9.48 L2.99,4.72 C3.58,4.38 3.99,3.74 3.99,3 C3.99,1.89 3.1,1 1.99,1 C0.88,1 0,1.89 0,3 C0,3.73 0.41,4.38 1,4.72 L1,11.28 C0.41,11.63 0,12.27 0,13 C0,14.11 0.89,15 2,15 C3.11,15 4,14.11 4,13 C4,12.47 3.8,12 3.47,11.64 C3.56,11.58 3.95,11.23 4.06,11.17 C4.31,11.06 4.62,11 5,11 C6.05,10.95 6.95,10.55 7.75,9.75 C8.55,8.95 8.95,7.77 9,6.73 L8.98,6.73 C9.59,6.37 10,5.73 10,5 L10,5 Z M2,1.8 C2.66,1.8 3.2,2.35 3.2,3 C3.2,3.65 2.65,4.2 2,4.2 C1.35,4.2 0.8,3.65 0.8,3 C0.8,2.35 1.35,1.8 2,1.8 L2,1.8 Z M2,14.21 C1.34,14.21 0.8,13.66 0.8,13.01 C0.8,12.36 1.35,11.81 2,11.81 C2.65,11.81 3.2,12.36 3.2,13.01 C3.2,13.66 2.65,14.21 2,14.21 L2,14.21 Z M8,6.21 C7.34,6.21 6.8,5.66 6.8,5.01 C6.8,4.36 7.35,3.81 8,3.81 C8.65,3.81 9.2,4.36 9.2,5.01 C9.2,5.66 8.65,6.21 8,6.21 L8,6.21 Z\" id=\"Shape\"></path></g></g></svg>') 50%";
                    button.style.backgroundSize = "12px 12px";
                    button.style.backgroundRepeat = "no-repeat";
                    button.style.backgroundColor = "#eee";
                    button.type = "button";
                    button.className = "autosaves clipboard_button hoverable capped story_copy_git";
                    button.title = "Copy Git branch command to your clipboard";
                    button.setAttribute("data-clipboard-text", "git checkout -b " + storyId + "_" + title);
                    // TODO: Change the icon to https://raw.githubusercontent.com/primer/octicons/master/lib/svg/git-branch.svg
                    // Get the id copy button
                    var idCopyButton = singleAction.childNodes[5]; // The 5th child is the id button and field
                    // Insert the new button before the id copy button
                    singleAction.insertBefore(button, idCopyButton); // .nextSibling
                }
            }
        });
    }
}

function shrinkCloseButtons() {
    var close = document.querySelectorAll(".persistence.use_click_to_copy .close");
    close.forEach(function (thisCloseButton) {
        thisCloseButton.style.width = "82px";
    });
}

function drawButtons() {
    shrinkCloseButtons();
    addGitButton();
};

setInterval(drawButtons, 500);
