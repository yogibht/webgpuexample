`npm install`
`npm start`

To generate ssl certs in windows, install openssl then,

########## DON'T USE THESE ##################
#openssl genrsa -out server.key 2048
#openssl req -new -key server.key -out server.csr -sha256 -config D:\RESOURCES\TOOLS\openssl-1.1\ssl\openssl.cnf
#openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
###############################################

######## USE THIS ####################
openssl req -nodes -new -x509 -keyout server.key -out server.cert -config D:\RESOURCES\TOOLS\openssl-1.1\ssl\openssl.cnf