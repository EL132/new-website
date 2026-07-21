export const journeyStops = [
    {
        id: 'first-home',
        x: 488,
        y: 623,
        title: 'The beginning',
        question: 'What was the cost of the best pick up line OAT?',
        answer: '1 kidney',
        options: ['a kiss', '1 kidney', 'jack & coke', 'blacking out']
    },
    {
        id: 'little-house',
        x: 552,
        y: 610,
        title: 'A little farther',
        question: 'Where do the souls condemned to Earth\'s Fields of Asphodel roam?',
        answer: 'DC',
        options: ['Milan', 'Gaiss', 'DC', 'Santo Domingo']
    },
    {
        id: 'lake-house',
        x: 432,
        y: 491,
        title: 'By the water',
        question: 'What year did the US make alcohol illegal?',
        answer: 'I\'m Italian',
        options: ['1776', '2026', 'I\'m Italian', '1940']
    },
    {
        id: 'road-house',
        x: 772,
        y: 503,
        title: 'The last house',
        question: 'Dude let\'s think about this crazyyyyy hypothetical—what would you do if you had no way of getting home (let\'s say, for sake of the example, that America is your home) and you\'re in rural Switzerland and you needed to be home the next day?',
        answer: 'Overnight bus to Munich',
        options: [
            'Take a train to Zurich and fly out from the nearest airport',
            'Overnight bus to Munich',
            'Fly to Dublin and then America',
            'Fly to Madrid and then America (via the Detroit → Houston → Atlanta route)'
        ]
    }
];

export const journeyGates = [
    { x: 552, y: 638, width: 46, height: 10, unlockAt: 1 },
    { x: 392, y: 551, width: 34, height: 10, unlockAt: 2 },
    { x: 688, y: 528, width: 10, height: 42, unlockAt: 3 }
];

export const offPathJokes = [
    'are you dumb. don\'t go this way',
    'River, buddy. The path is over there.',
    'This is not an open-world game. I had a deadline.',
    'Bold route. Completely wrong, but bold.',
    'You found the scenic route to absolutely nowhere.'
];
