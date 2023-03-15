import { promises as fs } from 'fs'
import https from 'https'
import xml2js from 'xml2js'
import rsstoical from './feedtoical.js'


async function main() {
  const urls = await fs.readFile('urls.txt', 'utf-8')
  
  const feedItems = []
  for (const url of urls.trim().split('\n')) {
    try {
      const xml = await fetchFeed(url)
      const feed = await parseFeed(xml)
      feedItems.push(...feed.rss.channel[0].item)
    } catch (error) {
      console.error(`Error fetching feed for ${url}: ${error.message}`)
    }
  }

  const events = feedItems.sort((a, b) => {
    const dateA = new Date(a.pubDate[0])
    const dateB = new Date(b.pubDate[0])
    return dateB - dateA
  })

  const rss = eventsToFeed(events)
  // await fs.writeFile('output.xml', rss)


  return rsstoical(events)
}

function fetchFeed(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let xml = ''

      res.on('data', (chunk) => {
        xml += chunk
      })

      res.on('end', () => {
        resolve(xml)
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}

function eventsToFeed(events) {
  const feed = {
    rss: {
      $: { version: '2.0' },
      channel: [
        {
          title: 'Your RSS feed for your calendar',
          description: 'Read your RSS feeds from as calendar',
          link: '',
          item: events,
        },
      ],
    },
  }
  return buildXml(feed)
}

function parseFeed(xml) {
  return xml2js.parseStringPromise(xml)
}

function buildXml(obj) {
  const builder = new xml2js.Builder()
  return builder.buildObject(obj)
}

export default main
