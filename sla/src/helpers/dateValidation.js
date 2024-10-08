const compareDates = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate > endDate) {
    return false;
  }
  return true;
};

export default compareDates;
