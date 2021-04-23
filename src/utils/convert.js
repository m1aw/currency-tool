/**
 * Given a base value and the rate of both currencies retrives the target value
 * @param {number} baseValue 
 * @param {number} baseRate 
 * @param {number} targetRate 
 * @returns 
 */
export const convertValue = (baseValue, baseRate, targetRate) => {
  return (baseValue * targetRate) / baseRate;
};
