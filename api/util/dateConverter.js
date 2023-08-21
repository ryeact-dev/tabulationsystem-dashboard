function dateConverter() {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateTimeFormat = new Intl.DateTimeFormat("en-us", dateOptions);
  const dateToday = dateTimeFormat.format(new Date());

  return dateToday;
}

exports.dateConverter = dateConverter;
