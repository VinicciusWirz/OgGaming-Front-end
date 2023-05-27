export function dateYYYYMMDD(date) {
  const dateArr = date.split("/");
  const day = dateArr[0];
  const month = dateArr[1];
  const year = dateArr[2];
  return `${year}-${month}-${day}`;
}

export function dateDDMMYYYY(date) {
  const dateArr = date.split("-");
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  return `${day}/${month}/${year}`;
}