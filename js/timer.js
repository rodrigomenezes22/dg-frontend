let i = 1;

function timer(i) {
    console.log(i);
}

function loop() {
    setTimeout(function() {
        timer(i);
        i++;
        if (i < 10) {
            loop();
        }
    }, 1000)
}

loop();