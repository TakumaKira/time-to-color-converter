module.exports = function convert(date, southernHemisphere) {
  if ( typeof date.getMonth !== 'function' ) { return null; }

  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();

  const isLeapYear = (year%4 == 0) && (year%100 != 0) || (year%400 == 0);

  const daysInYear = isLeapYear ? 366 : 365;

  const winterSolstice = new Date(year, 12 - 1, isLeapYear ? 23 : 22, 0, 0, 0, 0);
  const daysFromWinterSolstice = (date.getTime() - winterSolstice.getTime()) / 1000 / 60 / 60 / 24;

  const startOfTheDate = new Date(year, month - 1, day, 0, 0, 0, 0);
  const millisecondsFromStartOfTheDate = date.getTime() - startOfTheDate.getTime();
  const millisecondsOfADay = 1000 * 60 * 60 * 24;

  const luminanceCoeff = .75;
  const saturationCoeff = .75;

  const dayOfTheWeekFromLatestSaturday = date.getDay() > 5 ? date.getDay() - 7 + 1 : date.getDay() + 1;
  const latestSaturday = new Date(year, month - 1, day - dayOfTheWeekFromLatestSaturday, 0, 0, 0, 0);
  const weeksFromLatestSaturday = (date.getTime() - latestSaturday.getTime()) / 1000 / 60 / 60 / 24 / 7;

  const hueInWinterSolstice = southernHemisphere ? 60 : 240;

  const h = Number('0.' + String( hueInWinterSolstice / 360 - daysFromWinterSolstice / daysInYear ).split('.')[1]) * 360; // Rotate once a year
  const s = ( 0.5 + Math.sin( Math.PI / 2 + 2 * Math.PI * weeksFromLatestSaturday ) / 2 * saturationCoeff ) * 100; // Rotate once a week
  const l = ( 0.5 + Math.sin( - Math.PI / 2 + 2 * Math.PI * millisecondsFromStartOfTheDate / millisecondsOfADay ) / 2 * luminanceCoeff ) * 100; // Rotate once a day
  return { h, s, l };
}
