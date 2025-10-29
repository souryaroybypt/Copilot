/**
 * Parses a string to extract numbers separated by commas.
 * Returns an array of numbers.
 * Throws if input is not a string or contains invalid numbers.
 * @param {string} str
 * @returns {number[]}
 */
function parseNumbers(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    if (str.trim() === '') return [];
    return str.split(',')
        .map(s => s.trim())
        .map(s => {
            const n = Number(s);
            if (isNaN(n)) throw new Error(`Invalid number: ${s}`);
            return n;
        });
}

/**
 * Returns the sum, product, and average of an array of numbers.
 * Throws if input is not an array of numbers.
 * @param {number[]} arr
 * @returns {{sum: number, product: number, average: number}}
 */
function mathStats(arr) {
    if (!Array.isArray(arr) || arr.some(n => typeof n !== 'number' || isNaN(n))) {
        throw new Error('Input must be an array of numbers');
    }
    if (arr.length === 0) return { sum: 0, product: 0, average: 0 };
    const sum = arr.reduce((a, b) => a + b, 0);
    const product = arr.reduce((a, b) => a * b, 1);
    const average = sum / arr.length;
    return { sum, product, average };
}

/**
 * Fetches user data from a public API.
 * Returns a user object.
 * Throws on network or API error.
 * @param {number} id
 * @returns {Promise<Object>}
 */
async function fetchUser(id) {
    if (typeof id !== 'number' || id <= 0) throw new Error('Invalid user ID');
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    if (!res.ok) throw new Error('User not found');
    return await res.json();
}

module.exports = { parseNumbers, mathStats, fetchUser };