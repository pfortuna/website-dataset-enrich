# website-dataset-enrich
A simple tool to data-enrich a domain with geoip data.

You pass it a domain, and it returns a comma-separated list that contains

* the domain (you passed e.g. google.com)
* the TLD (e.g. "com")
* the IP address resolved by a simple DNS query
* the GeoIP country


## Build
``npm i``

Now we need to install Maxmind's geoip license and download the free database

Please register an account at maxmind.com and issue a license key to use with the free geoip-lite database. Use the following link:
https://dev.maxmind.com/geoip/geolite2-free-geolocation-data?lang=en

Then, follow the 2 installation steps in this page:
https://www.npmjs.com/package/geoip-lite

## Run


You need to pass a fully qualified domain name:

``
node index.js --domain=<fqdn>
``

Example output:

``
node index.js --domain=google.com

google.com,com,142.250.200.142,US
``
