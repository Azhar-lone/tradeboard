/**
 * Suggests a related username if the original one is taken.
 * @param {string} originalUsername - The original username.
 * @param {(username: string) => Promise<any>} checkUserExists - Function to check if username exists.
 * @returns {Promise<string>} - A unique related username.
 */
export async function suggestRelatedUsername(originalUsername, checkUserExists) {
    while (true) {
      const number = Math.ceil(Math.random() * 100);
      const relatedUsername = `${originalUsername}-${number}`;
  
      const existingUser = await checkUserExists(relatedUsername);
  
      if (!existingUser) {
        return relatedUsername;
      }
    }
  }
  