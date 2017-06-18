export const Utilities = {

  /**
   * Provides a random integer between the supplied min and max.
   */
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

};
