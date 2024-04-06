import * as Clipboard from "expo-clipboard";

const copyToClipboard = async (text) => {
  await Clipboard.setStringAsync(text);
};

const fetchCopiedText = async () => {
  const text = await Clipboard.getStringAsync();
  return text;
};

export { copyToClipboard, fetchCopiedText };
