const getCalendarDates = (year, month) => {
  let arr = [];

  let d = new Date(year, month - 1, 1);
  let offset = d.getDay() - 1;

  for (var i = 1; i <= 42; i++) {
    let d = new Date(year, month - 1, i);
    let day = d.getDay();
    arr[offset + i] = d;
  }
  for (var i = -offset; i <= offset; i++) {
    let d = new Date(year, month - 1, i);
    let day = d.getDay();
    arr[offset + i] = d;
  }

  arr.slice(0, 42);

  let twoDimensionalArray = [];
  for (i = 0; i < 5; i++) {
    let clonedArray = [...arr].splice(i * 7, 7);
    twoDimensionalArray[i] = clonedArray;
  }
  return twoDimensionalArray;
};

const getWeekRangeList = (year, month) => {
  let x = getCalendarDates(year, month);
  return x.map(weekList => ({
    from: weekList[0],
    to: weekList[6]
  }));
};

const getYearRange = year => {
  let from = new Date(year, 0, 1);
  let to = new Date(year + 1, 0, 0);
  return {
    from,
    to
  };
};

export { getCalendarDates, getWeekRangeList, getYearRange };
