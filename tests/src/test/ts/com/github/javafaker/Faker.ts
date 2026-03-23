class NameGenerator {
  firstName() {
    const names = ["Alex", "Jordan", "Taylor", "Sam", "Riley", "Casey", "Morgan", "Jamie"];
    return names[Math.floor(Math.random() * names.length)];
  }
}

export class Faker {
  name() {
    return new NameGenerator();
  }
}
