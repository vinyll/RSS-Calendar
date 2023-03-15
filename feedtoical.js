import ical from 'ical-generator';


function convert(feedItems) {
  const sortedItems = feedItems.sort((a, b) => {
    const dateA = new Date(a.pubDate[0]);
    const dateB = new Date(b.pubDate[0]);
    return dateB - dateA;
  });

  const events = sortedItems.map((item) => {
    const title = item.title[0];
    const description = item.description[0];
    const start = new Date(item.pubDate[0]);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // Add one hour
    const url = item.link[0];
    return {
      start,
      end,
      summary: title,
      description,
      url,
      uid: `${url}-${start.toISOString()}`,
    };
  });

  const calendar = ical({
    domain: 'example.com',
    name: 'Aggregated Events',
    prodId: '//example.com//Aggregated Events//EN',
  });

  for (const event of events) {
    calendar.createEvent(event);
  }

  const icalOutput = calendar.toString();
  return icalOutput
}


export default convert
