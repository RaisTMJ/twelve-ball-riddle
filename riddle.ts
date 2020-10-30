function TwelveBallRiddle() {
    let scaleUse = 0;
    let weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    weights[Math.floor(Math.random() * 12)] = Math.random() * 2;
// weights[0] = Math.random() * 2;
    console.log(weights.join(', '))

    function sumValue(arrayGroup: number[]): number {
        return arrayGroup.reduce((sum: number, num: number) => sum + num)
    }

// 0 for balance, 1 for testGroup heavier, and -1 if compareGroup lighter
    function UseScaleBalance(testGroup: number[], compareGroup: number[]): 0 | 1 | -1 {
        scaleUse++;
        if(scaleUse > 3){
            console.error('You already exceed use scale')
            throw  'U failed';
        }
        let val: number = sumValue(testGroup) - sumValue(compareGroup);
        console.log('Scale  use %s times, for  %s, %s', scaleUse, testGroup, compareGroup,);
        return val > 0 ? 1 : val == 0 ? 0 : -1;
    }

    function comparingIfTestGroupHeavier(compareFunction: (testGroup: number[], compareGroup: number[]) => (0 | 1 | -1), balanceBall: number[], ball: any, unbalanceBall: number[]) {
        let val4 = compareFunction([balanceBall[0]], [balanceBall[1]]);
        if (val4 == 1) {
            ball = balanceBall [0];
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
            ball = balanceBall [0];
        } else if (val4 == 0) {
            ball = unbalanceBall[0];
        } else {
            ball = balanceBall[1];
        }
        return ball;
    }
    let group1: number[] = weights.slice(0, 4);
    let group2: number[] = weights.slice(4, 8);
    let group3: number[] = weights.slice(8, 12);
    let ball: any = 'unknown';
    let group1_1: number[] = group1.slice(0, 2);
    let group1_2: number[] = group1.slice(2, 4);
    let group2_1: number[] = group2.slice(0, 2);
    let group2_2: number[] = group2.slice(2, 4);

    function twoBallComparison(groupTest: number[], compareBall: number[]) {
        let val3 = UseScaleBalance(groupTest.slice(0, 1), compareBall);
        if (val3 != 0) {
            ball = groupTest[0];
        } else {
            ball = groupTest[1];
        }
    }
    switch (UseScaleBalance(group1, group2)) {
        case 1: {
            let groupTest1 = [...group2_1, ...group1_1]
            let groupTest2 = [group2_2[0], group1_2[0], ...group3.slice(0, 2)]
            let groupTest3 = [group2_2[1], group1_2[1]]
            let val2 = UseScaleBalance(groupTest1, groupTest2);
            switch (val2) {
                case 0: {
                    twoBallComparison(groupTest3, groupTest1.slice(0, 1));
                    break
                }
                case -1: {
                    ball = comparingIfTestGroupLighter(UseScaleBalance, group2_1, ball, group1_2);
                    break
                }
                case 1: {
                    ball = comparingIfTestGroupHeavier(UseScaleBalance, group1_1, ball, group2_2);
                    break
                }
            }
            break;
        }
        case -1: {
            let groupTest1 = [...group2_1, ...group1_1]
            let groupTest2 = [group2_2[0], group1_2[0], ...group3.slice(0, 2)]
            let groupTest3 = [group2_2[1], group1_2[1]]
            let val2 = UseScaleBalance(groupTest1, groupTest2);
            switch (val2) {
                case 0: {
                    twoBallComparison(groupTest3, groupTest1.slice(0, 1));
                    break
                }
                case 1: {
                    ball = comparingIfTestGroupHeavier(UseScaleBalance, group2_1, ball, group1_2);
                    break
                }
                case -1: {
                    ball = comparingIfTestGroupLighter(UseScaleBalance, group1_1, ball, group2_2);
                    break
                }
            }
            break;
        }
        case 0: {
            let group3_1: number[] = group3.slice(0, 2);
            let group3_2: number[] = group3.slice(2, 4);
            let val = UseScaleBalance(group3_1, group2.slice(0, 2));
            if (val != 0) {
                twoBallComparison(group3_1, group2.slice(0, 1));
            } else {
                twoBallComparison(group3_2, group2.slice(0, 1));
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

let tryAgain: boolean = true
let testCount: number  = 0
while (tryAgain) {
    console.log('-------------------------------------------------------')
    tryAgain = TwelveBallRiddle()
    if(testCount >1000){
        console.log('You already test it 1000 times');
        tryAgain = false;
    }
    testCount++;
    console.log('--------------------------------------------------------')

}
