import express from 'express'
import icalfeed from './icalfeed.js'

const app = express()
const port = 3000

app.get('/events.ics', async (req, res) => {
  // Generate the iCal object
  const cal = await icalfeed()

  // Set the response headers
  res.setHeader('Content-Type', 'text/calendar')
  res.setHeader('Content-Disposition', 'attachment filename="events.ics"')

  // Send the iCal response
  res.send(cal.toString())
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
