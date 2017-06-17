export class AbilityScore {
  name: string;
  score: number | undefined;
  modifier: number | undefined;

  constructor(name: string, score?: number, modifier?: number) {
    this.name = name;
    this.score = score;
    this.modifier = modifier;
  }
}