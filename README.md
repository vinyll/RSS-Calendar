# RSS Feeds To Calendar

Read multiple RSS feeds from your calendar.

This script is a web server that read RSS feed urls from a text file and serves them as an calendar file (`.ics` file) that can be read from your favorite calendar app.

## Installation

```
git clone https://github.com/vinyll/RSS-Calendar.git
cd RSS-Calendar
npm i
cp urls.{example.txt,txt}  # Get some sample RSS urls
```

## Running

Run the server:
```
npm start
```

For testing purpose you can open your browser at http://localhost:3000/events.ics.
That will download a calendar file `events.ics` that you can add to your calendar.

However your will probably want to add this URL instead directly into your calendar (add New Calendar Subscription from your menu) and paste the URL http://localhost:3000/events.ics.
When your calendar refresh the new events from the feeds will update.

## Settings

The _urls.txt_ file has a few feed urls for testing.
You do want to insert several URLs corresponding to the feeds you want to follow.
Make sure these feeds are events in order to make sense in a calendar…
