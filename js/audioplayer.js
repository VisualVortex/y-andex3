"use strict";
var audio = new Audio();
var files, tags;
var playlist = [];

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    files = "";
    if (evt.target.id === "drop_zone") {
        files = evt.dataTransfer.files;
    } else if (evt.target.id === "files") {
        files = evt.target.files;
    }
    if (!playlist.length) {
        audio.src = URL.createObjectURL(files[0]);
        updateMetaData(files[0]);
    }

    var file = files[0];
    audio.src = URL.createObjectURL(files[0]);

    ID3.loadTags(file.name,
        function () {
            tags = ID3.getAllTags(file.name);
        },
        {
            tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
            dataReader: FileAPIReader(file)
        });
    var output = [];

    document.getElementById('drop_zone').innerHTML = output.join('');
    audio.play();
    play = true;
    playButton.className = 'pause';
    seektimeupdate();
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<strong>', f.name, '</strong>');
    }
    document.getElementById('drop_zone').innerHTML = output.join('');

}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    evt.target.id = "drop_zone";
}

// dnd listener.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

document.getElementById('files').addEventListener('change', handleFileSelect, false);

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context;
context = new AudioContext();
var source;
var volumeSample = context.createGain();
var volumeInput = document.querySelector('input[type="range"]');
volumeInput.addEventListener('input', function (e) {
    volumeSample.gain.value = e.target.value;
});


var play = false;
var playButton = document.getElementById('play');
var stopButton = document.getElementById('stop');
function togglePlay() {
    if (files) {
        if (!play) {
            audio.play();
            playButton.className = 'pause';
            play = true;
        } else {
            audio.pause();
            playButton.className = 'play';
            play = false;
        }
    }
}
function stopPlay() {
    audio.pause();
    audio.currentTime = 0;
    playButton.className = 'play';
    play = false;
}


playButton.addEventListener('click', function () {
    togglePlay();
});

stopButton.addEventListener('click', function () {
    stopPlay();
});
/*visualization*/
var WIDTH = 400;
var HEIGHT = 80;
var analyser = context.createAnalyser();
var canvas = document.getElementById('waveform');
var canvasCtx = waveform.getContext('2d');
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

/*Wave*/
function drawWaveform() {
    analyser.fftSize = 2048;
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    function draw() {
        analyser.getByteTimeDomainData(dataArray);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(256, 256, 256)';
        canvasCtx.beginPath();
        var sliceWidth = WIDTH / bufferLength;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;
            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
        requestAnimationFrame(draw);
    }

    draw();
}
/*Spectrum*/
function drawSpectrum() {
    analyser.fftSize = 256;
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        var barWidth = (WIDTH / bufferLength) * 17;
        var barHeight;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;
            canvasCtx.fillStyle = 'rgb(' + barHeight + ',' + barHeight + ',' + barHeight * 3 + ')';
            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);
            x += barWidth + 1.5;
        }
    }

    draw();
}

var radios = document.getElementsByName('visualization');

function setVisualization(value) {
    if (value === 'wave') {
        drawWaveform();
    } else if (value === 'spectrum') {
        drawSpectrum();
    }
}

for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function (e) {
        setVisualization(e.target.value);
    })
}

/*Presets equalizer*/
var frequencyArr = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
var filterArr = frequencyArr.map(function (item) {
    var filter = context.createBiquadFilter();
    filter.type = "peaking";
    filter.frequency.value = item;
    filter.Q.value = 1;
    filter.gain.value = 0;
    return filter;
});
filterArr.reduce(function (prev, curr) {
    prev.connect(curr);
    return curr;
});


var presets = {
    rock: [-1, 1, 2, 3, -1, -1, 0, 0, 4, 4],
    normal: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pop: [-2, -1, 0, 2, 4, 4, 2, 0, -1, -2],
    classic: [0, 6, 6, 3, 0, 0, 0, 0, 2, 2],
    jazz: [0, 0, 0, 3, 3, 3, 0, 2, 4, 4]
};

var genres = document.getElementsByName('genre');

function setPreset(preset) {
    for (var i = 0; i < filterArr.length; i++) {
        filterArr[i].gain.value = presets[preset][i];
    }
}

for (i = 0; i < genres.length; i++) {
    genres[i].addEventListener('change', function (e) {
        setPreset(e.target.value);
    });
}

window.addEventListener('load', function () {
    source = context.createMediaElementSource(audio);
    source.connect(volumeSample);
    volumeSample.connect(filterArr[0]);
    filterArr[filterArr.length - 1].connect(analyser);
    filterArr[filterArr.length - 1].connect(context.destination);
}, false);

/*Progress bar*/
function updateProgress() {
    var progress = document.getElementById("progress");
    var value = 0;
    if (audio.currentTime > 0) {
        value = ((100 / audio.duration) * audio.currentTime).toFixed(2);
    }
    progress.style.width = value + "%";
}
audio.addEventListener("timeupdate", updateProgress, true);

/*  Time */
var curtimetext, durtimetext, seekslider, seeking = false, seekto;
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
seekslider = document.getElementById("progressBar");
seekslider.addEventListener("mousedown", function (event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener("mousemove", function (event) {
    seek(event);
});
seekslider.addEventListener("mouseup", function () {
    seeking = false;
});
audio.addEventListener("timeupdate", function () {
    seektimeupdate();
});
function seek(event) {
    if (seeking) {
        seekslider.value = event.offsetX / 100 * 93 / 3;
        seekto = audio.duration * (seekslider.value / 100);
        audio.currentTime = seekto;
    }
}
function seektimeupdate() {
    seekslider.value = audio.currentTime * (100 / audio.duration);
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (isNaN(dursecs)) {
        dursecs = "0"
    }
    if (isNaN(durmins)) {
        durmins = "0"
    }
    if (cursecs < 10) {
        cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
        dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
        curmins = "0" + curmins;
    }
    if (durmins < 10) {
        durmins = "0" + durmins;
    }
    curtimetext.innerHTML = curmins + ":" + cursecs;
    durtimetext.innerHTML = durmins + ":" + dursecs;
}

/* Meta */
function updateMetaData(file) {
    ID3.loadTags(file.name,
        function () {
            tags = ID3.getAllTags(file.name);
            document.getElementById("artist").textContent = " | " + tags.artist || "";
            document.getElementById("title").textContent = tags.title || "";
            document.styleSheets[0].insertRule(".meta {height: 18 !important;}", 0);
            var meta = document.getElementById('meta').style.height = "18px";
            document.getElementById('meta').style.opacity = "1";
        },
        {
            tags: ["artist", "title"],
            dataReader: FileAPIReader(file)
        });
}