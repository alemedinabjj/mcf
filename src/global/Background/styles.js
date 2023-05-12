import styled from "@emotion/styled";

export const BackgroundContainer = styled.div`
@keyframes move {
  100% {
      transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${props => (props.theme === "dark" ? "#1A202C" : "white")};
  overflow: hidden;
  z-index: -1;
}

.background span {
  width: 5vmin;
  height: 5vmin;
  border-radius: 5vmin;
  backface-visibility: hidden;
  position: absolute;
  animation: move;
  animation-duration: 33;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}


.background span:nth-child(0) {
  color: #583C87;
  top: 69%;
  left: 25%;
  animation-duration: 71s;
  animation-delay: -37s;
  transform-origin: 5vw -12vh;
  box-shadow: -10vmin 0 1.5208280775299425vmin currentColor;
}
.background span:nth-child(1) {
  color: #FFACAC;
  top: 16%;
  left: 48%;
  animation-duration: 38s;
  animation-delay: -72s;
  transform-origin: -9vw -6vh;
  box-shadow: 10vmin 0 1.5852396911214581vmin currentColor;
}
.background span:nth-child(2) {
  color: #E45A84;
  top: 33%;
  left: 2%;
  animation-duration: 104s;
  animation-delay: -133s;
  transform-origin: 25vw 8vh;
  box-shadow: 10vmin 0 1.8511837454543094vmin currentColor;
}
.background span:nth-child(3) {
  color: #E45A84;
  top: 23%;
  left: 72%;
  animation-duration: 34s;
  animation-delay: -79s;
  transform-origin: 0vw -20vh;
  box-shadow: -10vmin 0 1.527011910059769vmin currentColor;
}
.background span:nth-child(4) {
  color: #FFACAC;
  top: 62%;
  left: 44%;
  animation-duration: 85s;
  animation-delay: -5s;
  transform-origin: -21vw 24vh;
  box-shadow: -10vmin 0 1.553894000573997vmin currentColor;
}
.background span:nth-child(5) {
  color: #E45A84;
  top: 52%;
  left: 61%;
  animation-duration: 40s;
  animation-delay: -41s;
  transform-origin: -22vw -1vh;
  box-shadow: -10vmin 0 1.8513437430321094vmin currentColor;
}
.background span:nth-child(6) {
  color: #FFACAC;
  top: 30%;
  left: 72%;
  animation-duration: 42s;
  animation-delay: -64s;
  transform-origin: 22vw 2vh;
  box-shadow: -10vmin 0 2.1804166473917896vmin currentColor;
}
.background span:nth-child(7) {
  color: #E45A84;
  top: 41%;
  left: 69%;
  animation-duration: 54s;
  animation-delay: -169s;
  transform-origin: 25vw 15vh;
  box-shadow: 10vmin 0 1.7362580656407245vmin currentColor;
}
.background span:nth-child(8) {
  color: #E45A84;
  top: 75%;
  left: 9%;
  animation-duration: 35s;
  animation-delay: -134s;
  transform-origin: 7vw 5vh;
  box-shadow: -10vmin 0 1.7820779971066625vmin currentColor;
}
.background span:nth-child(9) {
  color: #583C87;
  top: 6%;
  left: 3%;
  animation-duration: 69s;
  animation-delay: -170s;
  transform-origin: 10vw 25vh;
  box-shadow: 10vmin 0 1.538460973448823vmin currentColor;
}
.background span:nth-child(10) {
  color: #E45A84;
  top: 73%;
  left: 99%;
  animation-duration: 20s;
  animation-delay: -28s;
  transform-origin: -19vw -22vh;
  box-shadow: 10vmin 0 2.0280477675988653vmin currentColor;
}
.background span:nth-child(11) {
  color: #FFACAC;
  top: 74%;
  left: 56%;
  animation-duration: 150s;
  animation-delay: -31s;
  transform-origin: 20vw -17vh;
  box-shadow: -10vmin 0 1.4094642280895002vmin currentColor;
}
.background span:nth-child(12) {
  color: #583C87;
  top: 21%;
  left: 62%;
  animation-duration: 47s;
  animation-delay: -65s;
  transform-origin: -23vw -7vh;
  box-shadow: 10vmin 0 1.593919040565703vmin currentColor;
}
.background span:nth-child(13) {
  color: #583C87;
  top: 10%;
  left: 47%;
  animation-duration: 34s;
  animation-delay: -168s;
  transform-origin: 17vw -7vh;
  box-shadow: -10vmin 0 2.0518310371930735vmin currentColor;
}
.background span:nth-child(14) {
  color: #FFACAC;
  top: 48%;
  left: 70%;
  animation-duration: 113s;
  animation-delay: -114s;
  transform-origin: 19vw 10vh;
  box-shadow: 10vmin 0 1.66710282597707vmin currentColor;
}
.background span:nth-child(15) {
  color: #FFACAC;
  top: 66%;
  left: 92%;
  animation-duration: 106s;
  animation-delay: -111s;
  transform-origin: -2vw -2vh;
  box-shadow: -10vmin 0 1.4041730314754526vmin currentColor;
}
.background span:nth-child(16) {
  color: #FFACAC;
  top: 21%;
  left: 66%;
  animation-duration: 78s;
  animation-delay: -60s;
  transform-origin: 3vw 10vh;
  box-shadow: -10vmin 0 1.6841470386123356vmin currentColor;
}
.background span:nth-child(17) {
  color: #E45A84;
  top: 81%;
  left: 10%;
  animation-duration: 33s;
  animation-delay: -92s;
  transform-origin: 16vw -4vh;
  box-shadow: -10vmin 0 1.2998162103284239vmin currentColor;
}
.background span:nth-child(18) {
  color: #E45A84;
  top: 88%;
  left: 72%;
  animation-duration: 63s;
  animation-delay: -77s;
  transform-origin: 15vw 0vh;
  box-shadow: 10vmin 0 1.8599274349930432vmin currentColor;
}
.background span:nth-child(19) {
  color: #583C87;
  top: 3%;
  left: 59%;
  animation-duration: 111s;
  animation-delay: -102s;
  transform-origin: -22vw -16vh;
  box-shadow: 10vmin 0 1.9498230907467773vmin currentColor;
}
.background span:nth-child(20) {
  color: #FFACAC;
  top: 11%;
  left: 7%;
  animation-duration: 44s;
  animation-delay: -116s;
  transform-origin: 13vw 25vh;
  box-shadow: 10vmin 0 1.6719409605274898vmin currentColor;
}
.background span:nth-child(21) {
  color: #583C87;
  top: 97%;
  left: 97%;
  animation-duration: 131s;
  animation-delay: -104s;
  transform-origin: -5vw -13vh;
  box-shadow: -10vmin 0 1.8549021203455418vmin currentColor;
}
.background span:nth-child(22) {
  color: #E45A84;
  top: 94%;
  left: 21%;
  animation-duration: 162s;
  animation-delay: -77s;
  transform-origin: 20vw 4vh;
  box-shadow: 10vmin 0 1.7423189921033022vmin currentColor;
}
.background span:nth-child(23) {
  color: #583C87;
  top: 61%;
  left: 43%;
  animation-duration: 41s;
  animation-delay: -58s;
  transform-origin: -9vw -12vh;
  box-shadow: 10vmin 0 1.6829269382594492vmin currentColor;
}
.background span:nth-child(24) {
  color: #FFACAC;
  top: 25%;
  left: 100%;
  animation-duration: 83s;
  animation-delay: -151s;
  transform-origin: -22vw -10vh;
  box-shadow: 10vmin 0 1.9259644627732655vmin currentColor;
}
.background span:nth-child(25) {
  color: #FFACAC;
  top: 79%;
  left: 40%;
  animation-duration: 151s;
  animation-delay: -158s;
  transform-origin: 13vw 2vh;
  box-shadow: 10vmin 0 1.8930708902111875vmin currentColor;
}

`;
