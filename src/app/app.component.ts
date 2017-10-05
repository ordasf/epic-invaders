import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Epic Invaders XIII - Decrypt';
  encryptedData: string;
  decryptedData: object[];

  decrypt(): void[] {
    if (this.encryptedData === null || this.encryptedData === undefined) {
      return;
    }

    const solution = [];
    const lines = this.encryptedData.split('\n');
    for (const line of lines) {
      const params = line.split(',');
      if (params.length !== 3) {
        console.log('Error parsing the encrypted data!!!');
        break;
      }
      const [ username, symbols, encryptedPoints ] = params;

      const symbolsWithValue = this.createSymbolsWithValue(symbols);
      const decryptedScore = this.calculateScore(encryptedPoints, symbolsWithValue);

      solution.push({ username, symbols, encryptedPoints, decryptedPoints: decryptedScore });
    }
    solution.sort((a, b) => {
      return b.decryptedPoints - a.decryptedPoints;
    });
    this.decryptedData = solution;
  }

  /**
   * Function to assign a value to each symbol provided depending on the position
   * in the string of symbols
   *
   * @param {string} symbols
   * @returns {Map<string, number>}
   */
  private createSymbolsWithValue(symbols: string): Map<string, number> {
    const symbolsWithValue = new Map();
    let valueForSymbol = 0;
    for (const symbol of symbols) {
      symbolsWithValue.set(symbol, valueForSymbol);
      valueForSymbol++;
    }
    return symbolsWithValue;
  }

  /**
   * Returns the decrypted score value. The algorithm will take the encryptedScore, and the value assigned
   * to each symbol. It gets the base of the encryption (number of different symbols) and for each symbol
   * gets its value and multiply it with the power of the base at the position of that symbol in
   * the encryptedPoints and add it to the solution. SUM(value(symbol) * pow(base, i)) being i = 0..input.length - 1
   *
   * The examples will illustrate better the idea:
   *
   * encrypted: 23, symbols: 0123456789 (base 10) -> (2 * pow(10, 1)) + (3 * pow(10, 0))
   * encrypted: 101, symbols: 01 (base 2) -> (1 * pow(2, 2)) + (0 * pow(2, 1)) + (1 * pow(2, 0))
   *
   * @param {string} encryptedScore
   * @param {Map<string, number>} symbolsWithValue
   * @returns {number} the score in decimal base (decrypted)
   */
  private calculateScore(encryptedScore: string, symbolsWithValue: Map<string, number>): number {
    const base = symbolsWithValue.size;
    const encryptedScoreLength = encryptedScore.length;
    let exponent = 0;
    let decryptedScore = 0;
    for (let i = encryptedScoreLength - 1; i >= 0; i--) {
      const currentSymbol = encryptedScore.charAt(i);
      const partialValue = symbolsWithValue.get(currentSymbol) * Math.pow(base, exponent);
      decryptedScore += partialValue;
      exponent++;
    }
    return decryptedScore;
  }
}
