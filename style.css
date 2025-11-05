* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    overflow: hidden;
    position: relative;
    min-height: 100vh;
    color: #fff;
}

/* Фон с градиентом */
.background {
    position: fixed;
    inset: 0;
    background: 
        linear-gradient(0deg, rgba(2,0,36,1) 0%,
        rgba(9,9,121,1) 35%,
        rgba(0,212,255,1) 100%);
    z-index: -2;
}

/* Падающий снег */
.snowfall {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
}

.snowfall::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(#fff 15%, transparent 20%),
        radial-gradient(#fff 15%, transparent 20%);
    background-size: 50px 50px, 100px 100px;
    animation: snow 20s linear infinite;
}

@keyframes snow {
    0% { transform: translate(0, 0); }
    100% { transform: translate(20px, 100vh); }
}

/* Гирлянды в углах */
.garland-corner {
    position: fixed;
    width: 120px;
    height: 120px;
    background:
        radial-gradient(#f00 15%, transparent 30%),
        radial-gradient(#ff0 15%, transparent 30%),
        radial-gradient(#0f0 15%, transparent 30%);
    background-size: 30px 30px;
    filter: blur(2px);
    animation: flicker 0.8s infinite alternate;
    z-index: -1;
}

.top-left { top: 20px; left: 20px; }
.top-right { top: 20px; right: 20px; }

/* Центральная гирлянда */
.garland-center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 6px;
    background:
        repeating-linear-gradient(
            90deg,
            #f00 0, #f00 5px,
            transparent 5px, transparent 15px,
            #ff0 15px, #ff0 20px,
            transparent 20px, transparent 30px
        );
    filter: blur(1px);
    animation: pulse 1.5s infinite alternate;
    z-index: -1;
}

@keyframes flicker {
    0% { opacity: 0.6; filter: brightness(0.8) blur(1px); }
    50% { opacity: 1; filter: brightness(1.4) blur(0.5px); }
    100% { opacity: 0.7; filter: brightness(1)
