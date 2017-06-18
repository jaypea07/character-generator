export class AbilityScore {
  name: string;
  score: number | undefined;
  modifier: string | undefined;

  constructor(name: string, score?: number) {
    this.name = name;
    this.score = score || 0;
    this.modifier = this.formatModifier(this.score);
  }

  private formatModifier(score: number): string {
    let modifier = Math.floor((score - 10) / 2);
    let formattedString;
    
    if (modifier < 0) {
      formattedString = modifier.toString();
    } else {
      formattedString = '+' + modifier;
    }

    return formattedString;
  }
}