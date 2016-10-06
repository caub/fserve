#!/usr/bin/env node

var express = require('express');

express()
.use(express.static('.'))
.listen(parseInt(process.argv[2])||3000);