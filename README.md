# fserve
basic static file server, like http-server

`npm i -g fserve`

usage: 

`serve optionalPort`

`serve -s optionalPort` (for https)

`serve -s=~/.certs/ optionalPort` (define where to search cert.pem and key.pem)

### notes

generate certs with
```
openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
openssl rsa -in keytmp.pem -out key.pem
```

we could use pem npm module and/or `chrome --allow-insecure-localhost --ignore-certificate-errors`