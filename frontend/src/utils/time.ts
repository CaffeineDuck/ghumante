export const parseTime = (minutes: number) => {
  if (minutes < 60) return minutes + "min";
  var hours = minutes / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  if (rminutes === 0) return rhours + "hr";
  return `${rhours}hr ${rminutes}min`;
};
