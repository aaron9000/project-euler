import {expect} from 'chai';
import R from 'ramda';
import * as Euler from '../euler';

// Data
import p8 from '../data/p8_data';
import p11 from '../data/p11_data';
import p13 from '../data/p13_data';
import p18 from '../data/p18_data';

describe("Problem #1", () => {
    it("calculates the sample solution correctly", () => {
        expect(Euler.sumOfMultiples(10)).to.equal(23);
    });
    it("calculates the solution", () => {
        expect(Euler.sumOfMultiples(1000)).to.equal(233168);
    });
});

describe("Problem #2", () => {
    it("calculates fibonacci terms correctly", () => {
        expect(Euler.fibonacciTerms(7)).to.deep.equal([1, 2, 3, 5, 8, 13, 21]);
    });
    it("calculates fibonacci terms bounded by sum correctly", () => {
        expect(Euler.fibonacciTermsLessThan(22)).to.deep.equal([1, 2, 3, 5, 8, 13, 21]);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.sumOfEvenFibonacciTerms(13)).to.equal(10);
    });
    it("calculates the solution", () => {
        expect(Euler.sumOfEvenFibonacciTerms(4000000)).to.equal(4613732);
    });
});

describe("Problem #3", () => {
    it("factorizes numbers correctly", () => {
        expect(Euler.factors(1)).to.deep.equal([1]);
        expect(Euler.factors(3)).to.deep.equal([1, 3]);
        expect(Euler.factors(4)).to.deep.equal([1, 2, 4]);
        expect(Euler.factors(6)).to.deep.equal([1, 2, 3, 6]);
    });
    it("generates random integers correctly", () => {
        expect(Euler.randInt(0, 0)).to.equal(0);
        expect(Euler.randInt(1, 1)).to.equal(1);
        expect(Euler.randInt(1, 2)).to.equal(1);
    });
    it("identifies composite numbers correctly", () => {
        expect(Euler.isComposite(5)).to.equal(false);
        expect(Euler.isComposite(7)).to.equal(false);
        expect(Euler.isComposite(11)).to.equal(false);
        expect(Euler.isComposite(23)).to.equal(false);
        expect(Euler.isComposite(137)).to.equal(false);
        expect(Euler.isComposite(4)).to.equal(true);
        expect(Euler.isComposite(74)).to.equal(true);
        expect(Euler.isComposite(129)).to.equal(true);
        expect(Euler.isComposite(10)).to.equal(true);

    });
    it("identifies exponent of largest power of 2 divisor", () => {
        expect(Euler.exponentOfLargestDividingPowerOfTwo(3)).to.equal(0);
        expect(Euler.exponentOfLargestDividingPowerOfTwo(16)).to.equal(4);
        expect(Euler.exponentOfLargestDividingPowerOfTwo(32)).to.equal(5);
        expect(Euler.exponentOfLargestDividingPowerOfTwo(33)).to.equal(0);
        expect(Euler.exponentOfLargestDividingPowerOfTwo(28)).to.equal(2);
    });
    it("identifies prime numbers correctly", () => {
        expect(Euler.isPrime(1)).to.equal(true);
        expect(Euler.isPrime(2)).to.equal(true);
        expect(Euler.isPrime(3)).to.equal(true);
        expect(Euler.isPrime(4)).to.equal(false);
        expect(Euler.isPrime(6)).to.equal(false);
        expect(Euler.isPrime(8)).to.equal(false);
        expect(Euler.isPrime(9)).to.equal(false);
        expect(Euler.isPrime(5)).to.equal(true);
        expect(Euler.isPrime(29)).to.equal(true);
        expect(Euler.isPrime(29)).to.equal(true);
        expect(Euler.isPrime(29)).to.equal(true);
        expect(Euler.isPrime(29)).to.equal(true);
        expect(Euler.isPrime(29)).to.equal(true);
        expect(Euler.isPrime(29)).to.equal(true);
        expect(Euler.isPrime(8462696833)).to.equal(false);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.largestPrimeFactor(13195)).to.equal(29);
    });
    it("calculates the solution", () => {
        expect(Euler.largestPrimeFactor(600851475143)).to.equal(6857);
    });
});

describe("Problem #4", () => {
    it("identifies palindrome numbers correctly", () => {
        expect(Euler.isPalindrome(10)).to.equal(false);
        expect(Euler.isPalindrome(-23)).to.equal(false);
        expect(Euler.isPalindrome(9)).to.equal(true);
        expect(Euler.isPalindrome(101)).to.equal(true);
        expect(Euler.isPalindrome(3233)).to.equal(false);

    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.largestPalindromeProduct(2)).to.equal(9009);
    });
    it("calculates the solution", () => {
        expect(Euler.largestPalindromeProduct(3)).to.equal(906609);
    });
});

describe("Problem #5", () => {
    it("calculates prime factors correctly", () => {
        expect(Euler.primeFactorization(1)).to.deep.equal([1]);
        expect(Euler.primeFactorization(2)).to.deep.equal([2]);
        expect(Euler.primeFactorization(3)).to.deep.equal([3]);
        expect(Euler.primeFactorization(10)).to.deep.equal([2, 5]);
        expect(Euler.primeFactorization(20)).to.deep.equal([2, 2, 5]);
        expect(Euler.primeFactorization(36)).to.deep.equal([2, 2, 3, 3]);
        expect(Euler.primeFactorization(2520)).to.deep.equal([2, 2, 2, 3, 3, 5, 7]);
    });
    it("finds the max & min values by key in an object", () => {
        expect(Euler.maxValueByKey({a: 2, b: 3}, {c: 3, a: 3})).to.deep.equal({a: 3, b: 3, c: 3});
        expect(Euler.minValueByKey({a: 2, b: 3}, {c: 3, a: 3})).to.deep.equal({a: 2, b: 3, c: 3});
    });
    it("converts array of factors into exponent map", () => {
        expect(Euler.factorsToExponentMap([2, 2, 2, 3, 3, 5])).to.deep.equal({'2': 3, '3': 2, '5': 1});
    });
    it("converts exponent map into array of factors", () => {
        expect(Euler.exponentMapToFactors({'2': 3, '3': 2, '5': 1})).to.deep.equal([2, 2, 2, 3, 3, 5]);
    });
    it("correctly finds the max exponents of an array of numbers", () => {
        expect(Euler.maxExponentMapForPrimeFactorsOfArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).to.deep.equal({
            '1': 1,
            '2': 3,
            '3': 2,
            '5': 1,
            '7': 1
        });
    });
    it("correctly reduces primes", () => {
        const a = [2, 2, 2, 2, 2, 3, 3, 3, 5, 5, 7, 7];
        const b = [1, 2, 2, 2, 3, 3, 5, 7];
        expect(Euler.reducePrimesForDivision(a, R.range(0, 10))).to.deep.equal(b);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.smallestFactor(10)).to.equal(2520);
    });
    it("calculates the solution correctly", () => {
        expect(Euler.smallestFactor(20)).to.equal(232792560);
    });
});

describe("Problem #6", () => {
    it("calculates sum of squares", () => {
        expect(Euler.sumOfSquares(R.range(0, 11))).to.equal(385);
    });
    it("calculates squares of sums", () => {
        expect(Euler.squareOfSums(R.range(0, 11))).to.equal(3025);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.squareOfSumMinusSumOfSquares(R.range(0, 11))).to.equal(2640);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.squareOfSumMinusSumOfSquares(R.range(0, 101))).to.equal(25164150);
    });
});

describe("Problem #7", () => {
    it("find primes under a number", () => {
        expect(Euler.findPrimesUpTo(20)).to.deep.equal([2, 3, 5, 7, 11, 13, 17, 19]);
        expect(Euler.findPrimesUpTo(30)).to.deep.equal([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.findNthPrime(4, 20)).to.equal(7);
        expect(Euler.findNthPrime(6, 20)).to.equal(13);
        expect(Euler.findNthPrime(11, 100)).to.equal(31);
    });
    it("calculates the solution correctly", () => {
        expect(Euler.findNthPrime(10001, 120000)).to.equal(104743);
    });
});

describe("Problem #8", () => {
    it("converts a number to digits correctly", () => {
        expect(Euler.numberStringToDigitsArray('1234')).to.deep.equal([1, 2, 3, 4]);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.largestAdjacentProductInString(p8, 4)).to.equal(5832);
    });
    it("calculates the solution", () => {
        expect(Euler.largestAdjacentProductInString(p8, 13)).to.equal(23514624000);
    });
});

describe("Problem #9", () => {
    it("identifies pythagorean triplets", () => {
        expect(Euler.isPythagoreanTriplet(1, 2, 3)).to.equal(false);
        expect(Euler.isPythagoreanTriplet(3, 4, 5)).to.equal(true);
        expect(Euler.isPythagoreanTriplet(2, 3, 4)).to.equal(false);
    });
    it("identifies triplets with sum", () => {
        expect(Euler.tripletsWithSum(3)).to.deep.equal([[0, 1, 2]]);
    });
    it("calculates the sample solution correctly", () => {
        expect(Euler.productOfPythagoreanTripletWithSum(12)).to.equal(60);
    });
    it("calculates the solution", () => {
        expect(Euler.productOfPythagoreanTripletWithSum(1000)).to.equal(31875000);
    });
});

describe("Problem #10", () => {
    it("sum primes below 10 correctly", () => {
        expect(Euler.sumOfPrimesBelow(10)).to.equal(17);
        expect(Euler.sumOfPrimesBelow(20)).to.equal(77);
    });
    it("calculates the solution", () => {
        expect(Euler.sumOfPrimesBelow(2000000)).to.equal(142913828922);
    });
});

describe("Problem #11", () => {
    it("calculates the solution", () => {
        expect(Euler.largestAdjacentProductInGrid(4, p11)).to.equal(70600674);
    });
});

describe("Problem #12", () => {
    it("calculates the sample solution", () => {
        expect(Euler.firstTriangleNumberWithDivisorCount(5)).to.equal(28);
    });
    it("calculates the solution", () => {
        expect(Euler.firstTriangleNumberWithDivisorCount(500)).to.equal(76576500);
    });
});

describe("Problem #13", () => {
    it("calculates a large number sum", () => {
        expect(Euler.largeNumberSum(['1', '1'])).to.equal('2');
        expect(Euler.largeNumberSum(['12', '12'])).to.equal('24');
    });
    it("finds first n digits of number", () => {
        expect(Euler.firstDigits(1, '1')).to.equal('1');
        expect(Euler.firstDigits(2, '123')).to.equal('12');
        expect(Euler.firstDigits(4, '123')).to.equal('123');
    });
    it("calculates digits of large number sum", () => {
        expect(Euler.digitsOfLargeNumberSum(3, ['123', '1'])).to.equal('124');
    });
    it("calculates the solution", () => {
        expect(Euler.digitsOfLargeNumberSum(10, p13)).to.equal('5537376230');
    });
});

describe("Problem #14", () => {
    it("calculates a collatz sequence", () => {
        expect(Euler.collatzSequence(13)).to.deep.equal([13, 40, 20, 10, 5, 16, 8, 4, 2, 1]);
        expect(Euler.collatzSequence(3)).to.deep.equal([3, 10, 5, 16, 8, 4, 2, 1]);
    });
    it("calculates longest sequences", () => {
        expect(Euler.longestCollatzSequence(1)).to.equal(1);
        expect(Euler.longestCollatzSequence(2)).to.equal(2);
        expect(Euler.longestCollatzSequence(3)).to.equal(3);
        expect(Euler.longestCollatzSequence(4)).to.equal(3);
        expect(Euler.longestCollatzSequence(5)).to.equal(3);
        expect(Euler.longestCollatzSequence(6)).to.equal(6);
        expect(Euler.longestCollatzSequence(7)).to.equal(7);
        expect(Euler.longestCollatzSequence(11)).to.equal(9);
    });
    it("calculates the solution", () => {
        expect(Euler.longestCollatzSequence(1000000)).to.equal(837799);
    });
});

describe("Problem #15", () => {
    it("calculate factorial", () => {
        expect(Euler.factorial(1)).to.equal(1);
        expect(Euler.factorial(2)).to.equal(2);
        expect(Euler.factorial(3)).to.equal(6);
        expect(Euler.factorial(4)).to.equal(24);
    });
    it("calculates sample solution", () => {
        expect(Euler.latticePaths(2)).to.equal(6);
    });
    it("calculates the solution", () => {
        expect(Euler.latticePaths(20)).to.equal(137846528820);
    });
});

describe("Problem #16", () => {
    it("calculates pentagonal numbers", () => {
        expect(Euler.pentagonalNumbers(8)).to.deep.equal([1, 2, 5, 7, 12, 15, 22]);
        expect(Euler.pentagonalNumbers(9)).to.deep.equal([1, 2, 5, 7, 12, 15, 22, 26]);
    });
    it("calculates partitions", () => {
        expect(Euler.countPartitions(0)).to.equal(1);
        expect(Euler.countPartitions(1)).to.equal(1);
        expect(Euler.countPartitions(2)).to.equal(2);
        expect(Euler.countPartitions(3)).to.equal(3);
        expect(Euler.countPartitions(4)).to.equal(5);
        expect(Euler.countPartitions(5)).to.equal(7);
        expect(Euler.countPartitions(13)).to.equal(101);
    });
    it("calculates sample solution", () => {
        expect(Euler.powerOfTwoDigitSum(15)).to.equal(26);
    });
    it("calculates the solution", () => {
        expect(Euler.powerOfTwoDigitSum(1000)).to.equal(1366);
    });
});


describe("Problem #17", () => {
    it("calculates digits", () => {
        expect(Euler.rangeOfDigits(0, 1, 123)).to.equal(3);
        expect(Euler.rangeOfDigits(0, 2, 123)).to.equal(23);
        expect(Euler.rangeOfDigits(0, 3, 123)).to.equal(123);
    });
    it("converts numbers into strings", () => {
        expect(Euler.numberToString(0)).to.equal('zero');
        expect(Euler.numberToString(1)).to.equal('one');
        expect(Euler.numberToString(4)).to.equal('four');
        expect(Euler.numberToString(10)).to.equal('ten');
        expect(Euler.numberToString(14)).to.equal('fourteen');
        expect(Euler.numberToString(20)).to.equal('twenty');
        expect(Euler.numberToString(21)).to.equal('twenty one');
        expect(Euler.numberToString(50)).to.equal('fifty');
        expect(Euler.numberToString(99)).to.equal('ninety nine');
        expect(Euler.numberToString(100)).to.equal('one hundred');
        expect(Euler.numberToString(111)).to.equal('one hundred and eleven');
        expect(Euler.numberToString(500)).to.equal('five hundred');
        expect(Euler.numberToString(999)).to.equal('nine hundred and ninety nine');
        expect(Euler.numberToString(1000)).to.equal('one thousand');
    });
    it("sum letters correctly", () => {
        expect(Euler.sumOfLetters(5)).to.equal(19);
        expect(Euler.sumOfLetters(6)).to.equal(22);
    });
    it("calculates the solution", () => {
        expect(Euler.sumOfLetters(1000)).to.equal(21124);
    });
});

describe("Problem #18", () => {
    it("calculates the sample solution", () => {
        const s0 = [[3],
                    [7, 4],
                    [2, 4, 6],
                    [8, 5, 9, 3]];
        expect(Euler.maximumPathSum(s0)).to.equal(23);

        const s1 = [[3],
                    [7, 4],
                    [2, 4, 6],
                    [8, 5, 9, 3],
                    [100, 1, 1, 20, 1]];
        expect(Euler.maximumPathSum(s1)).to.equal(120);

        const s2 = [[75],
                    [95, 64],
                    [17, 47, 82],
                    [18, 35, 87, 10]];
        expect(Euler.maximumPathSum(s2)).to.equal(308);

        const s3 = [[3],
                    [7, 4],
                    [2, 4, 6],
                    [8, 9, 5, 3]];
        expect(Euler.maximumPathSum(s3)).to.equal(23);

        const s4 = [[3],
                    [60, 4],
                    [60, 4, 6],
                    [8, 9, 5, 100]];
        expect(Euler.maximumPathSum(s4)).to.equal(132);

        const s5 = [[1],
                    [10, 1],
                    [10, 1, 1],
                    [10, 1, 1, 1],
                    [10, 1, 1, 1, 100],
                    [10, 1, 1, 1, 1, 1]];
        expect(Euler.maximumPathSum(s5)).to.equal(105);
    });
    it("calculates the solution", () => {
        expect(Euler.maximumPathSum(p18)).to.equal(1074);
    });
});

describe("Problem #30", () => {
    it("calculates digits", () => {
        expect(Euler.sortedDigitString(1234, 4)).to.equal('1234');
        expect(Euler.sortedDigitString(4321, 4)).to.equal('1234');
        expect(Euler.sortedDigitString(430, 4)).to.equal('0034');
        expect(Euler.sortedDigitString(1, 4)).to.equal('0001');
    });
    it("calculates the sample solution", () => {
        expect(Euler.sumOfNarcissisticNumbers(4)).to.equal(19316);
    });
    it("calculates the solution", () => {
        expect(Euler.sumOfNarcissisticNumbers(5)).to.equal(443839);
    });
});

describe("Problem #67", () => {
    it("parses grid text files", () => {
        const grid = Euler.parseGridFromFile('data/p67_data.txt');
        expect(grid[3]).to.deep.equal([26, 53, 6, 34]);
    });
    it("calculates the solution", () => {
        const grid = Euler.parseGridFromFile('data/p67_data.txt');
        expect(Euler.maximumPathSum(grid)).to.equal(7273);
    });
});