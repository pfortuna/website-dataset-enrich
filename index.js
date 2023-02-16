const { program } = require('commander');
const query = require('dns-query').query;
const geoip = require('geoip-lite');
const tldparser = require('tld-extract');
var domain,tld,ip,geo;

program
  .option('-d, --domain <domain>');
program.parse();
const options = program.opts();
if (!options.domain) {
  console.log("You have to pass the -d/--domain parameter with a valid domain.");
  process.exit(-1);
}

function output(domain, tld, ip, geo) {
  console.log(
    domain + "," +
    (tld || "") + "," + 
    (ip || "") + "," + 
    (geo || "")
  );    
}

if (options.domain) {
  domain = options.domain;
  tld = tldparser("https://"+domain).tld;
  query(
    { question: { type: 'A', name: domain }}, 
    { endpoints: ['8.8.8.8'] }
  ).then(res => {
    if (res && res.answers.length > 0) {
      ip = res.answers[0].data;
      var found = res.answers.find(o => o.type === "A");
      if (found && found.data) {
        ip = found.data;
        geo = geoip.lookup(ip).country;
      }
    }
    output(options.domain, tld, ip, geo);
    
  }).catch(e =>  {
    console.log("Error querying DNS "+e);
  });
}
