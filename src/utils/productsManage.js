const fs = require("fs/promises");

const readProductsFile = async (file) => {
  try {
    const data = await fs.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products file:", error);
    return [];
  }
};
const writeProductsFile = async (file, newList) => {
  try {
    await fs.writeFile(file, JSON.stringify(newList, null, 2));
  } catch (error) {
    console.error("Error writing products file:", error);
  }
};
module.exports = {
  readProductsFile,
  writeProductsFile,
};