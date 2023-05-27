export default function colorChanging(id, func, arr, errColor) {
  func({ ...arr, [id]: errColor });
}
