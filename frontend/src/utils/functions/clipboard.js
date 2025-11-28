async function CopyToClipboard(text, onCopy = undefined) {
  try {
    await navigator.clipboard.writeText(text);
    onCopy?.(text);
  } catch (err) {
    console.error(err);
  }
}

async function GetFromClipboard(onObtained = undefined) {
  try {
    const txt = await navigator.clipboard.readText();
    onObtained?.(txt);
    return txt;
  } catch (err) {
    console.error(err);
    return '';
  }
}

export { CopyToClipboard, GetFromClipboard };
