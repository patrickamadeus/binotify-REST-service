const os = require('os');
const dns = require('dns');
dnsPromises = dns.promises;

const hostIP = "192.168.14.171"

const getIP = async () => {
  console.log(os.hostname())
  let data = await dnsPromises.lookup(os.hostname());
  return data.address
}

module.exports = { getIP, hostIP };




