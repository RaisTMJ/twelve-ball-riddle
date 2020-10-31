import {prompt} from 'prompts';


function TwelveBallRiddle(random?: number, index?: number) {
    let scaleUse = 0;
    let weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    weights[index ? index : Math.floor(Math.random() * 12)] = random ? random : Math.random() * 2;
    // weights[0] = Math.random() * 2;
    console.log(weights.join(', '))

    function sumValue(arrayGroup: number[]): number {
        return arrayGroup.reduce((sum: number, num: number) => sum + num)
    }

    // 0 for balance, 1 for testGroup heavier, and -1 if compareGroup lighter
    function UseScaleBalance(testGroup: number[], compareGroup: number[]): 0 | 1 | -1 {
        scaleUse++;
        if (scaleUse > 3) {
            console.error('You already exceed use scale')
            throw 'U failed';
        }
        let val: number = sumValue(testGroup) - sumValue(compareGroup);
        console.log('Scale  use %s times, for  %s, %s', scaleUse, testGroup, compareGroup,);
        return val > 0 ? 1 : val == 0 ? 0 : -1;
    }

    function comparingIfTestGroupHeavier(compareFunction: (testGroup: number[], compareGroup: number[]) => (0 | 1 | -1), balanceBall: number[], ball: any, unbalanceBall: number[]) {
        let val4 = compareFunction([balanceBall[0]], [balanceBall[1]]);
        if (val4 == 1) {
            ball = balanceBall[0];
        } else if (val4 == 0) {
            ball = unbalanceBall[0];
        } else {
            ball = balanceBall[1];
        }
        return ball;
    }

    function comparingIfTestGroupLighter(compareFunction: (testGroup: number[], compareGroup: number[]) => (0 | 1 | -1), balanceBall: number[], ball: any, unbalanceBall: number[]) {
        let val4 = compareFunction([balanceBall[0]], [balanceBall[1]]);
        if (val4 == -1) {
            ball = balanceBall[0];
        } else if (val4 == 0) {
            ball = unbalanceBall[0];
        } else {
            ball = balanceBall[1];
        }
        return ball;
    }
    function twoBallComparison(groupTest: number[], compareBall: number[]) {
        let val3 = UseScaleBalance(groupTest.slice(0, 1), compareBall);
        if (val3 != 0) {
            ball = groupTest[0];
        } else {
            ball = groupTest[1];
        }
    }

    //1) start split to 6 subset and 3 group; todo
    // createSubset
    let subSetA = weights.slice(0, 2);
    let subSetB = weights.slice(2, 4);
    let subSetC = weights.slice(4, 6);
    let subSetD = weights.slice(6, 8);
    let subSetE = weights.slice(8, 10);
    let subSetF = weights.slice(10, 12);
    let group1: number[] = [...subSetA, ...subSetB];
    let group2: number[] = [...subSetC, ...subSetD];
    let group3: number[] = [...subSetE, ...subSetF];
    let ball: any = 'unknown';



    // first main compare of group todo
    switch (UseScaleBalance(group1, group2)) {
        case 1: {
            let rightGroup = [...subSetC, ...subSetA] // swap 2 item from 2 left group 1 member go to left group one go to unscale group
            let leftGroup = [subSetD[0], subSetB[0], ...subSetE] // swap 1 item from right group 1 item go to right group 1 item go to unscale group ammd additional 2 normal ball to make it balance
            let unScaleGroup = [subSetD[1], subSetB[1]] // 2 item from both group that did not go to scale.
            let val2 = UseScaleBalance(rightGroup, leftGroup);
            // swap between an element ^ todo then compare case left heavier than right
            switch (val2) {
                case 0: {
                    twoBallComparison(unScaleGroup, subSetE.slice(0, 1));
                    break
                }
                case -1: {
                    ball = comparingIfTestGroupLighter(UseScaleBalance, subSetC, ball, subSetB);
                    break
                }
                case 1: {
                    ball = comparingIfTestGroupHeavier(UseScaleBalance, subSetA, ball, subSetD);
                    break
                }
            }
            break;
        }
        case -1: {
            let lighterGroup = [...subSetC, ...subSetA] // swap 2 item from 2 left group 1 member go to left group one go to unscale group
            let heavierGroup = [subSetD[0], subSetB[0], ...subSetE] // swap 1 item from right group 1 item go to right group 1 item go to unscale group ammd additional 2 normal ball to make it balance
            let unScaleGroup = [subSetD[1], subSetB[1]] // 2 item from both group that did not go to scale.
            // swap between an element ^ todo then compare case left lighter than right
            let val2 = UseScaleBalance(lighterGroup, heavierGroup);
            switch (val2) {
                case 0: {
                    twoBallComparison(unScaleGroup, subSetE.slice(0, 1));
                    break
                }
                case 1: {
                    ball = comparingIfTestGroupHeavier(UseScaleBalance, subSetC, ball, subSetB);
                    break
                }
                case -1: {
                    ball = comparingIfTestGroupLighter(UseScaleBalance, subSetA, ball, subSetD);
                    break
                }
            }
            break;
        }
        case 0: {
            // group 3 is test here
            let val = UseScaleBalance(subSetE, subSetA);
            if (val != 0) {
                twoBallComparison(subSetE, subSetA.slice(0, 1));
            } else {
                twoBallComparison(subSetF, subSetA.slice(0, 1));
            }
            break;
        }

    }
    if (ball == 1) {
        console.error('error', weights.join(', '))
        return false
    }
    if (ball > 1) {
        console.log('heavier ball at location %s with weight %s', weights.indexOf(ball), ball);
    } else {
        console.log('lighter at location %s with weight %s', weights.indexOf(ball), ball);
    }
    return true;
}


function input() {
    // @ts-ignore
    (async () => {
        const response = await prompt({
                type: 'text',
                name: 'value',
                message: 'Do you want to test manually y/n',
            }
        )
        if (response['value'] == 'y') {
            const response2 = await prompt({
                type: 'number',
                name: 'value',
                message: 'Type a value yo place the value in ball set',
            })
            for (let i = 11; i >= 0; i--) {
                TwelveBallRiddle(response2['value'], i)

            }
            console.log('success')

        } else if (response['value'] == 'n') {
            let tryAgain: boolean = true
            let testCount: number = 0
            while (tryAgain) {
                console.log('-------------------------------------------------------')
                tryAgain = TwelveBallRiddle()
                if (testCount > 1000) {
                    console.log('You already test it 1000 times');
                    tryAgain = false;
                }
                testCount++;
                console.log('--------------------------------------------------------')

            }

        } else {
            input();
        }

    })();

}

input()
