import R from 'ramda';
import bigInt from 'big-integer';
import Heap from 'heap';
import fs from 'fs';

const sortAscending = R.sort((a, b) => a - b);
const sortDescending = R.sort((a, b) => b - a);

export function sumOfMultiples(lessThan:Number):Number {
    return R.pipe(
        R.reduce((accum, v) => {
            return (v % 3 === 0 || v % 5 === 0) ? R.append(v, accum) : accum;
        }, []),
        R.sum
    )(R.range(0, lessThan));
}

export function fibonacciTermsLessThan(lessThan:Number):Array<Number> {
    const seed = [1, 2];
    return R.pipe(
        R.until(terms => (R.last(terms) || 0) > lessThan,
            terms => {
                const i = terms.length;
                const term = i < seed.length ? seed[i] : terms[i - 1] + terms[i - 2];
                return R.append(term, terms);
            }),
        R.slice(0, -1)
    )([]);
}

export function fibonacciTerms(numTerms:Number):Array<Number> {
    const seed = [1, 2];
    return R.reduce((accum, i) => {
        const newTerm = i < seed.length ? seed[i] : accum[i - 1] + accum[i - 2];
        return R.append(newTerm, accum);
    }, [seed[0]], R.range(1, numTerms));
}

export function sumOfEvenFibonacciTerms(maxSum:Number):Number {
    return R.pipe(
        R.filter(v => (v % 2 === 0)),
        R.sum
    )(fibonacciTermsLessThan(maxSum));
}

export function randInt(low:Number, high:Number) {
    return Math.floor(Math.random() * (high - low)) + low;
}

export function exponentOfLargestDividingPowerOfTwo(n:Number) {
    const maxExponent = Math.floor(Math.round(Math.log2(n))) + 1;
    return R.reduce((accum, value) => {
        const divisor = Math.pow(2, value);
        return Number.isInteger(n / divisor) ? value : accum;
    }, 0, R.range(1, maxExponent));
}

export function powMod(base:Number, exponent:Number, modulos:Number):Number {
    return bigInt(base).modPow(exponent, modulos).valueOf();
}

export function isComposite(n:Number):Boolean {
    if (n === 1 || n === 3) return false;
    if (n % 2 === 0) return n !== 2;
    const nMinusOne = n - 1;
    const s = exponentOfLargestDividingPowerOfTwo(nMinusOne);
    const d = Math.floor(nMinusOne / Math.pow(2, s));
    const isDefinitelyComposite = () => {
        let x = powMod(randInt(2, nMinusOne), d, n);
        if (x === 1) return false;
        for (let i = 0; i <= s - 1; i++) {
            if (x === nMinusOne) return false;
            x = powMod(x, 2, n);
        }
        return true;
    };
    for (let k = 0; k < 10; k++) {
        if (isDefinitelyComposite()) return true;
    }
    return false;
}

export function isPalindrome(n:Number):Boolean {
    const s = R.toString(n);
    const h = Math.floor(R.length(s) / 2);
    const left = R.slice(0, h, s);
    const right = R.slice(0, h, R.reverse(s));
    return left === right;
}

export function largestPalindromeProduct(digits:Number):Number {
    const low = Math.pow(10, digits - 1);
    const high = Math.pow(10, digits);
    return R.pipe(
        R.range(low),
        R.reverse,
        R.reduce((outerAccum, i) => {
            return R.pipe(
                R.range(low),
                R.reverse,
                R.reduce((innerAccum, j) => {
                    const product = i * j;
                    return (product > innerAccum && isPalindrome(product)) ? product : innerAccum;
                }, outerAccum)
            )(i);
        }, 0)
    )(high);
}

export function isPrime(n:Number):Boolean {
    return !isComposite(n);
}

export function firstFactorPair(n:Number):Array<Number> {
    const range = R.pipe(
        Math.sqrt,
        R.inc,
        Math.floor,
        R.range(2)
    )(n);
    for (let i = 0; i < range.length; i++) {
        const value = range[i];
        if (n % value === 0) {
            return [value, n / value];
        }
    }
    return [];
}

export function factors(n:Number):Array<Number> {
    // This is faster than reduce
    const factorsFromRange = (range) => {
        let f = [];
        singleLoop(0, range.length, (x) => {
            const value = range[x];
            if (n % value === 0) {
                f.push(value);
                f.push(n / value);
            }
        });
        return f;
    };
    return R.pipe(
        Math.sqrt,
        R.inc,
        Math.floor,
        R.range(1),
        factorsFromRange,
        R.uniq,
        sortAscending
    )(n);
}

export function largestPrimeFactor(n:Number):Number {
    return R.pipe(
        R.filter(isPrime),
        sortAscending,
        R.last
    )(factors(n));
}

export function primeFactorization(n:Number):Array<Number> {
    return primeFactorizationOfArray([n]);
}

export function primeFactorizationOfArray(array:Array<Number>):Array<Number> {
    const start = {
        factors: array,
        primes: R.filter(isPrime, array)
    };
    return R.pipe(
        R.until(
            tuple => R.length(tuple.factors) <= 0,
            tuple => {
                const factorization = R.flatten(R.map(v => firstFactorPair(v), tuple.factors));
                const primes = R.filter(isPrime, factorization);
                return {
                    factors: R.filter(isComposite, factorization),
                    primes: R.concat(tuple.primes, primes)
                };
            }
        ),
        R.prop('primes'),
        sortAscending
    )(start);
}

export function multiplyArray(array:Array<Number>):Number {
    return R.reduce((accum, value) => {
        return accum * value;
    }, 1, array);
}

export function factorsToExponentMap(factors:Array<Number>):Object {
    return R.reduce((accum, value) => {
        return R.assoc(value, (R.prop(value, accum) || 0) + 1, accum);
    }, {}, factors);
}

export function exponentMapToFactors(exponentMap:Object):Array<Number> {
    return R.pipe(
        R.toPairs,
        R.reduce((accum, value) => {
            return R.concat(accum, R.repeat(Number(value[0]), value[1]));
        }, [])
    )(exponentMap);
}

export function maxValueByKey(a:Object, b:Object):Object {
    return R.reduce((accum, key) => {
        const maxValue = Math.max(R.prop(key, a) || -1000000, R.prop(key, b) || -1000000);
        return R.assoc(key, maxValue, accum);
    }, {}, R.union(R.keys(a), R.keys(b)));
}

export function minValueByKey(a:Object, b:Object):Object {
    return R.reduce((accum, key) => {
        const minValue = Math.min(R.prop(key, a) || 1000000, R.prop(key, b) || 1000000);
        return R.assoc(key, minValue, accum);
    }, {}, R.union(R.keys(a), R.keys(b)));
}

export function maxExponentMapForPrimeFactorsOfArray(factors:Array<Number>):Object {
    return R.pipe(
        R.map(primeFactorization),
        R.map(factorsToExponentMap),
        R.reduce((maxExponentMap, exponentMap) => {
            return maxValueByKey(maxExponentMap, exponentMap);
        }, {})
    )(factors);
}

export function reducePrimesForDivision(primeFactors:Array<Number>, divisors:Array<Number>):Array<Number> {
    const maxExponentMapForDivisors = maxExponentMapForPrimeFactorsOfArray(divisors);
    return R.pipe(
        factorsToExponentMap,
        R.curry(minValueByKey)(maxExponentMapForDivisors),
        exponentMapToFactors,
        sortAscending
    )(primeFactors);
}

export function smallestFactor(largestFactor:Number):Number {
    const range = R.range(1, largestFactor);
    return R.pipe(
        primeFactorizationOfArray,
        R.curry(reducePrimesForDivision)(R.__, range),
        multiplyArray
    )(range);
}

export function sumOfSquares(numbers:Array<Number>):Number {
    return R.pipe(
        R.map(v => v * v),
        R.sum
    )(numbers);
}

export function squareOfSums(numbers:Array<Number>):Number {
    return R.pipe(
        R.sum,
        v => v * v
    )(numbers);
}

export function squareOfSumMinusSumOfSquares(numbers:Array<Number>):Number {
    return squareOfSums(numbers) - sumOfSquares(numbers);
}

export function tripleLoop(x0:Number, x1:Number, y0:Number, y1:Number, z0:Number, z1:Number, callback:Function) {
    for (let x = x0; x < x1; x++) {
        for (let y = y0; y < y1; y++) {
            for (let z = z0; z < z1; z++) {
                callback(x, y, z);
            }
        }
    }
}

export function doubleLoop(x0:Number, x1:Number, y0:Number, y1:Number, callback:Function) {
    for (let x = x0; x < x1; x++) {
        for (let y = y0; y < y1; y++) {
            callback(x, y);
        }
    }
}

export function singleLoop(x0:Number, x1:Number, callback:Function) {
    for (let x = x0; x < x1; x++) {
        callback(x);
    }
}

// Loops for speed
export function sieveOfAtkin(ceiling:Number):Array<Boolean> {

    // Start with empty sieve
    let sieve = R.pipe(
        R.map(v => false),
        R.update(2, true),
        R.update(3, true)
    )(R.range(0, ceiling));

    // Use quadratics to find primes
    const rootCeiling = Math.sqrt(ceiling);
    doubleLoop(1, rootCeiling, 1, rootCeiling, (x, y) => {
        const x2 = x * x;
        const y2 = y * y;
        const nA = (4 * x2) + y2;
        if (nA <= ceiling && (nA % 12 === 1 || nA % 12 === 5)) {
            sieve[nA] = !sieve[nA];
        }
        const nB = (3 * x2) + y2;
        if (nB <= ceiling && (nB % 12 === 7)) {
            sieve[nB] = !sieve[nB];
        }
        const nC = (3 * x2) - y2;
        if (x > y && nC <= ceiling && (nC % 12 === 11)) {
            sieve[nC] = !sieve[nC];
        }
    });

    // Mark multiples of primes
    let square = 0;
    singleLoop(5, rootCeiling, (m) => {
        if (sieve[m] === true) {
            square = m * m;
            for (let i = square; i <= ceiling; i += square) {
                sieve[i] = false;
            }
        }
    });
    return sieve;
}

export function findPrimesUpTo(ceiling:Number):Array<Number> {
    function primesFromSieve(sieve:Array<Boolean>):Array<Number> {
        let primes = [];
        singleLoop(0, ceiling, (x) => {
            if (sieve[x]) primes.push(x);
        });
        return primes;
    }

    return R.pipe(
        sieveOfAtkin,
        primesFromSieve
    )(ceiling);
}

export function findNthPrime(n:Number, limit:Number):Number {
    const primes = findPrimesUpTo(limit);
    return primes.length > n ? primes[n - 1] : null;
}

export function numberStringToDigitsArray(n:String):Array<Number> {
    return R.map(v => parseInt(v), R.splitEvery(1, n));
}

export function largestAdjacentProductInArray(array:Array<Number>, windowSize:Number):Number {
    return R.pipe(
        R.length,
        R.subtract(R.__, windowSize),
        R.range(0),
        R.reduce((accum, value) => {
            return R.pipe(
                R.slice(value, value + windowSize),
                R.product,
                v => v > accum ? v : accum
            )(array);
        }, 0)
    )(array);
}

export function largestAdjacentProductInString(number:String, windowSize:Number):Number {
    return largestAdjacentProductInArray(numberStringToDigitsArray(number), windowSize);
}

export function isPythagoreanTriplet(a:Number, b:Number, c:Number):Boolean {
    return a * a + b * b === c * c;
}

export function tripletsWithSum(sum:Number):Array<Number> {
    // Edit array in place for speed
    let triplets = [];
    singleLoop(0, sum, (i) => {
        R.forEach(j => {
            const k = sum - (i + j);
            const triplet = [i, j, k];
            if (k > j && R.sum(triplet) === sum) {
                triplets.push(triplet);
            }
        }, R.range(i + 1, sum))
    });
    return triplets;
}

export function productOfPythagoreanTripletWithSum(sum:Number):Number {
    return R.pipe(
        tripletsWithSum,
        R.filter(t => isPythagoreanTriplet(t[0], t[1], t[2])),
        R.head,
        R.product
    )(sum);
}

export function sumOfPrimesBelow(below:Number):Number {
    return R.pipe(
        findPrimesUpTo,
        R.sum
    )(below);
}

export function largestAdjacentProductInGrid(digits:Number, grid:Array<Number>):Number {
    const size = Math.sqrt(grid.length);
    const padding = Math.floor(digits / 2);
    const directionSeeds = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];

    function getValue(x:Number, y:Number, offset:Array<Number>, distance:Number):Number {
        const tx = x + offset[0] * distance;
        const ty = y + offset[1] * distance;
        const index = tx + ty * size;
        return (tx >= 0 && tx < size && ty >= 0 && ty < size) ? grid[index] : 0;
    }

    let largest = 0;
    tripleLoop(padding, size - padding, padding, size - padding, 0, R.length(directionSeeds), (x, y, z) => {
        const product = R.pipe(
            R.range(0),
            R.map(offset => {
                return getValue(x, y, directionSeeds[z], offset);
            }),
            R.product
        )(digits);
        largest = product > largest ? product : largest;
    });
    return largest;
}

export function firstTriangleNumberWithDivisorCount(divisors:Number):Number {
    const seed = {sum: 1, count: 1};
    return R.pipe(
        R.until(
            t => R.length(factors(t.sum)) > divisors,
            t => ({count: t.count + 1, sum: t.sum + t.count + 1})
        ),
        R.prop('sum')
    )(seed);
}

export function largeNumberSum(numbers:Array<String>):String {
    return R.reduce((accum, value) => {
        return accum.add(value);
    }, bigInt.zero, numbers).toString();
}

export function firstDigits(digits:Number, number:String):String {
    return R.slice(0, digits, number);
}

export function digitsOfLargeNumberSum(digits:Number, numbers:Array<String>):String {
    return firstDigits(digits, largeNumberSum(numbers));

}

export function collatzSequence(start:Number):Array<Number> {
    const seed = {value: start, sequence: [start]};
    return R.until(
        tuple => tuple.value === 1 || tuple.value < 0,
        (tuple) => {
            const {value, sequence} = tuple;
            const nextValue = value % 2 === 0 ? value / 2 : value * 3 + 1;
            return {
                value: nextValue,
                sequence: R.append(nextValue, sequence)
            };
        }
        , seed).sequence;
}

export function longestCollatzSequence(ceiling:Number):Number {
    let cache = {};
    let longestLength = 1;
    let longest = 1;

    singleLoop(1, ceiling + 1, (start) => {
        const seed = {value: start, length: 1};

        // Find length of collatz sequence
        const {length} = R.until(
            tuple => tuple.value === 1 || tuple.value < 0,
            tuple => {
                const {value, length} = tuple;
                const nextValue = value % 2 === 0 ? value / 2 : value * 3 + 1;
                if (cache[nextValue]) {
                    return {value: 1, length: length + cache[nextValue]};
                } else {
                    return {value: nextValue, length: length + 1};
                }
            }
            , seed);

        // Cache value
        cache[start] = length;

        // Take largest
        if (length > longestLength) {
            longest = start;
            longestLength = length;
        }
    });
    return longest;
}

export function factorial(n:Number):Number {
    return R.pipe(
        R.inc,
        R.range(1, R.__),
        R.product
    )(n);
}

export function nChooseK(n:Number, k:Number):Number {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

export function latticePaths(size:Number):Number {
    return factorial(size * 2) / Math.pow(factorial(size), 2);
}

export function pentagonalNumbers(count:Number):Number {
    return R.pipe(
        R.range(1),
        R.map(v => Math.round(v / 2) * (v % 2 === 0 ? -1 : 1)),
        R.map(n => ((3 * n * n) - n) / 2)
    )(count);
}

export function countPartitions(number:Number):Number {
    // TODO: dont use arbitrary length
    const pents = pentagonalNumbers(20);
    let cache = {};
    const mapWithIndex = R.addIndex(R.map);
    const hasCachedValue = n => R.pipe(
        R.prop(R.__, cache),
        R.complement(R.isNil)
    )(n);
    const cachedValue = n => R.prop(n, cache);
    const cacheAndRecurse = n => R.pipe(
        n => {
            return mapWithIndex((pent, k) => {
                const l = k + 1;
                return (l % 3 === 0 || l % 4 === 0 ? -1 : 1) * p(n - pent);
            })(pents);
        },
        R.sum,
        sum => {
            cache[n] = sum;
            return sum;
        }
    )(n);

    function p(n:Number):Number {
        return R.cond([
            [R.lt(R.__, 0),     R.always(0)],
            [R.equals(0),       R.always(1)],
            [hasCachedValue,    cachedValue],
            [R.T,               cacheAndRecurse]
        ])(n);
    }
    return p(number);
}

export function powerOfTwoDigitSum(exponent:Number):Number {
    const digits = bigInt(2).pow(exponent).toString().split('');
    return R.pipe(
        R.map(v => Number(v)),
        R.sum
    )(digits);
}

export function rangeOfDigits(digitStart:Number, digitEnd:Number, n:Number):String {
    return R.pipe(
        R.toString,
        R.split(''),
        R.reverse,
        R.slice(digitStart, digitEnd),
        R.reverse,
        R.join(''),
        v => Number(v)
    )(n);
}

export function sortedDigitString(n:Number, length:Number):String{
    return R.pipe(
        R.toString,
        sortAscending,
        R.join(''),
        s => {
            const zeroes = Math.max(length - s.length, 0);
            return R.join('', R.times(v => '0', zeroes)) + s;
        }
    )(n);
}

export function numberToString(n:Number):String {
    const zeroToNineteen = [
        '',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'fifteen',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen'];
    const tens = [
        '',
        '',
        'twenty',
        'thirty',
        'forty',
        'fifty',
        'sixty',
        'seventy',
        'eighty',
        'ninety'
    ];

    function lowerDigitString(n:Number):String {
        return R.cond([
            [R.lt(R.__, 0),     R.always('out of range')],
            [R.lte(R.__, 19),   R.always(zeroToNineteen[n])],
            [R.lte(R.__, 99),   t => {
                const onesDigit = rangeOfDigits(0, 1, t);
                const tensDigit = rangeOfDigits(1, 2, t);
                return `${tens[tensDigit]} ${zeroToNineteen[onesDigit]}`;
            }],
            [R.gt(R.__, 99),    R.always('out of range')]
        ])(n);
    }

    function hundredsDigitString(n:Number):String{
        const lowerDigits = rangeOfDigits(0, 2, n);
        const hundredsDigit = rangeOfDigits(2, 3, n);
        const lowerString = lowerDigitString(lowerDigits);
        const hundredsString = `${zeroToNineteen[hundredsDigit]} hundred`;
        const spaceBetween = lowerDigits > 0 ? ' and ' : '';
        return `${hundredsString}${spaceBetween}${lowerString}`;
    }

    return R.pipe(
        R.cond([
            [R.lt(R.__, 0),     R.always('out of range')],
            [R.equals(0),       R.always('zero')],
            [R.lte(R.__, 99),   lowerDigitString],
            [R.lte(R.__, 999),  hundredsDigitString],
            [R.equals(1000),    R.always('one thousand')],
            [R.gt(R.__, 1000),  R.always('out of range')]
        ]),
        R.trim
    )(n);
}

export function sumOfLetters(ceiling:Number):Number {
    return R.pipe(
        R.inc,
        R.range(1),
        R.map(R.pipe(
            numberToString,
            R.replace(/ /g, ''),
            R.length
        )),
        R.sum
    )(ceiling);
}

export function sumOfNarcissisticNumbers(power:Number):Number{
    const maxNumber = Math.pow(9, power) * power;
    const maxDigits = R.length(R.toString(maxNumber));
    const powers = R.map(v => Math.pow(v, power), R.range(0, 10));
    const sumOfPowers = R.memoize(R.pipe(
        R.split(''),
        R.map(d => powers[d]),
        R.sum
    ));
    return R.pipe(
        R.range(0),
        R.reduce((accum, value) => {
            const digitString = sortedDigitString(value, maxDigits);
            const sum = sumOfPowers(digitString);
            return sum === value ? R.append(sum, accum) : accum;
        }, []),
        R.sum,
        R.add(-1)
    )(maxNumber);
}

export function maximumPathSum(grid:Array<Array>):Number{

    // Because Dijkstra finds the shortest path, we must invert the weights
    const maxWeight = 1000;

    // Build binary heap & node representations
    let nodeGrid = [];
    let heap = new Heap((a, b) => {
        return a.distance - b.distance;
    });
    const forEachWithIndex = R.addIndex(R.forEach);
    forEachWithIndex((row, rowIndex) => {
        let nodeRow = [];
        forEachWithIndex((weight, columnIndex) => {
            const node = {
                parent: null,
                distance: Number.POSITIVE_INFINITY,
                weight: maxWeight - weight, // Weight inversion
                columnIndex,
                rowIndex
            };
            nodeRow.push(node);
            heap.push(node);
        }, row);
        nodeGrid.push(nodeRow);
    }, grid);

    // Node helpers
    const nodeForColumnAndRow = (columnIndex, rowIndex) => {
        return nodeGrid[rowIndex][columnIndex]
    };
    const modifyNode = (columnIndex, rowIndex, parent, parentDistance) => {
        try {
            let node = nodeForColumnAndRow(columnIndex, rowIndex);
            let newDistance = parentDistance + node.weight;
            if (newDistance < node.distance){
                node.parent = parent;
                node.distance = node.weight + parentDistance;
                heap.updateItem(node);
            }
        }catch (e){
            // Out of bounds
        }
    };
    const updateChildren = (columnIndex, rowIndex) => {
        let node = nodeForColumnAndRow(columnIndex, rowIndex);
        modifyNode(columnIndex, rowIndex + 1, node, node.distance);
        modifyNode(columnIndex + 1, rowIndex + 1, node, node.distance);
    };

    // Dijkstra
    modifyNode(0, 0, null, 0);
    R.until(
        R.identity,
        () => {
            let best = heap.pop();
            updateChildren(best.columnIndex, best.rowIndex);
            return heap.empty();
        },
        false
    );

    // Look at bottom row to find max length path
    return R.pipe(
        R.last,
        R.pluck('distance'),
        sortAscending,
        R.head,
        R.subtract(R.length(grid) * maxWeight) // Invert the weights again
    )(nodeGrid);
}

export function parseGridFromFile(filepath:String):Array<Array>{
    const lines = fs.readFileSync(filepath).toString().split('\n');
    return R.map(l => {
        return R.map(n => parseInt(n), l.split(' '));
    }, lines);
}