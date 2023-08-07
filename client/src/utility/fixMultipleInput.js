export default function fixMultipleInput(arr) {
  let newArray = arr.filter((item) => {
    return item.trim() !== '';
  });
  return newArray;
}
