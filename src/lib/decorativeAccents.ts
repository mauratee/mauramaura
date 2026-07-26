// From DESIGN.md's "Decorative Glyphs & Accents" — cute accents, celestial,
// and ornate frames, pooled together for random selection across the site.
export const DECORATIVE_ACCENTS = [
  "ᖭི༏ᖫྀ",
  "˚ʚ♡ɞ˚",
  "✌︎㋡",
  "⋆.˚ ☾⭒.˚",
  "⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆",
  "꧁⎝ 𓆩༺✧༻𓆪 ⎠꧂",
  "࿔‧ ֶָ֢˚˖𐦍˖˚ֶָ֢ ‧࿔",
];

// Fisher-Yates shuffle; returns a new array.
export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
