//Return only Numbers
export function isNumbers(value) {
  return value.replace(/[^0-9]/g, "");
}
//Retun only Letters
export function isLetters(value) {
  return value.replace(/[^A-Za-z\s'-]/g, "");
}

// Returns true if file is valid type, otherwise false
export function isValidFileType(
  file,
  validTypes = ["image/png", "image/jpeg"],
) {
  return file && validTypes.includes(file.type);
}
