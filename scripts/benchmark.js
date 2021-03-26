require('dotenv').config()
const autocannon = require('autocannon')

const URL = process.env.URL

const benchmark = async () => {
  const result = await autocannon({
    url: URL,
    connections: 10,
    pipelining: 1,
    duration: 10
  })

  // eslint-disable-next-line no-console
  console.log({
    latencyAvg: result?.latency?.average,
    throughputAvg: result?.throughput?.average,
    errors: result?.errors
  })
}

benchmark()
