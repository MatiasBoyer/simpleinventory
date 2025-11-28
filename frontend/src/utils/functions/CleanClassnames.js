export default function CleanClassnames(cls) {
  return cls
    .replace(/(null|undefined|NaN)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
