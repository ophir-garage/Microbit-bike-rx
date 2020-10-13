radio.onReceivedNumber(function (receivedNumber) {
    rxData = receivedNumber
    rxCount += 1
})
let rxCount = 0
let rxData = 0
let nextState = 0
let currentState = 0
let lastRX=0
radio.setGroup(1)
basic.forever(function () {
    switch(currentState) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 8:
                basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `,100);
                if (lastRX == rxCount)
                {
                    nextState = currentState+1;
                } else
                {
                    nextState = rxData==0 ? 20 : 21
                }
                
                break;

        case 20:
                basic.showLeds(`
                . . . # #
                . . # # #
                # # # # #
                . . # # #
                . . . # #
                `,100);
                if (lastRX == rxCount)
                {
                    nextState = 0;
                } else
                {
                    nextState = rxData==0 ? 20 : 21
                }
                break;

        case 21:
                basic.showLeds(`
                # # . . .
                # # # . .
                # # # # #
                # # # . .
                # # . . .
                `,100);
                if (lastRX == rxCount)
                {
                    nextState = 0;
                } else
                {
                    nextState = rxData==0 ? 20 : 21
                }
                break;

        default:
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `,100)
                if (lastRX == rxCount)
                {
                    if (currentState >= 19) {
                    nextState = 0
                    } else {
                        nextState = currentState+1;
                    }
                } else
                {
                    nextState = rxData==0 ? 20 : 21
                }
                
        }
// last line
    currentState = nextState
})
