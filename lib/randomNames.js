import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

/* Generate a random name to use as a Client ID for new 
members joining the channel */

export function generateRandomName() {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
  });
  return randomName;
}
