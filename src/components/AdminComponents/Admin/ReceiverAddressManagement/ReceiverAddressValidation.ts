export const isValidAddress = (address: string) => {
  // Check if the address is a string
  if (typeof address !== "string") return false;

  // Check if the address starts with 'T' and has a length of 34 characters
  if (!address.match(/^T.{33}$/)) return false;

  // Check if the address contains only alphanumeric characters
  if (!/^[a-zA-Z0-9]*$/.test(address)) return false;

  // Perform additional checks if needed (e.g., checksum validation, network verification)
  return true; // Address passes all validation checks
};
