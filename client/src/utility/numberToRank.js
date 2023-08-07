export default function numberToRank(number) {
  if (number === '1') {
    return number + 'st';
  } else if (number[number.length - 1] === '1') {
    return number + 'st';
  } else if (number[number.length - 1] === '2') {
    return number + 'nd';
  } else if (number[number.length - 1] === '3') {
    return number + 'rd';
  } else {
    return number + 'th';
  }
}
