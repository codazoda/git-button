function addGitButton() {
    // Grab any action div's
    var editActions = document.querySelectorAll("div.actions");
    // If there were some action divs
    if (editActions.length > 0) {
        // TODO: If it does not already have the git button
        // Loop through the action divs
        editActions.forEach(function(singleAction) {
            // TODO: Change the icon to https://raw.githubusercontent.com/primer/octicons/master/lib/svg/git-branch.svg
            // Create a new git command button
            var button = document.createElement("button");
            button.style.background = "url('https://raw.githubusercontent.com/primer/octicons/master/lib/svg/git-branch.svg') 50%";
            button.style.backgroundSize = "12px 12px";
            button.type = "button";
            button.className = "autosaves clipboard_button hoverable capped";
            button.title = "Copy Git branch command to your clipboard";
            button.id = "story_copy_git";
            button.setAttribute("data-clipboard-text", "git checkout -b 1234567");
            // Get the id copy button
            var idCopyButton = singleAction.childNodes[5]; // The 5th child is the id button and field
            // Insert the new button before the id copy button
            singleAction.insertBefore(button, idCopyButton); // .nextSibling
        });
    }
}

function shrinkCloseButtons() {
    var close = document.querySelectorAll(".persistence.use_click_to_copy .close");
    close.forEach(function (thisCloseButton) {
        thisCloseButton.style.width = "82px";
    });
}

addGitButton();
shrinkCloseButtons();
