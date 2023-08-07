export default function isDirectImageLink(url) {
  const imageExtensions = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  return imageExtensions.test(url);
}
