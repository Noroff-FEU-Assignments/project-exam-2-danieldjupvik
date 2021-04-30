export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = (date) => {
  var d = new Date(date);

  var year = d.getFullYear();
  var month = monthNames[d.getMonth()];
  var day = d.getDate();
  var created = `${day}. ${month} ${year}`;
  return created;
};
