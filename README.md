# chs73be

[contributors-shield]: https://img.shields.io/github/contributors/jdmedlock/chs73be.svg?style=for-the-badge
[contributors-url]: https://github.com/jdmedlock/chs73be/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jdmedlock/chs73be.svg?style=for-the-badge
[forks-url]: https://github.com/jdmedlock/chs73be/network/members
[stars-shield]: https://img.shields.io/github/stars/jdmedlock/chs73be.svg?style=for-the-badge
[stars-url]: https://github.com/jdmedlock/chs73be/stargazers
[issues-shield]: https://img.shields.io/github/issues/jdmedlock/chs73be.svg?style=for-the-badge
[issues-url]: https://github.com/jdmedlock/chs73be/issues

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
## Table of Contents

* [Overview](#overview)
* [Application Architecture](#application-architecture)
* [Installation & Configuration](#installation-configuration)
* [Release History](#release-history)
* [License](#license)


## Overview

CHS73BE is the backend application server supporting  the Central High School Class of 1973
reunion website. The goal of the website is to generate anticipation among
alumni, inform them about reunion news and upcoming events, and to periodically
poll members for their opinions.

## Application Architecture

The application consists of a web frontend ([this repo](https://github.com/jdmedlock/chs73)).
This backend provides services for the FE including emailing and managing classmate & faculty
data. GraphQL is used to request email services, while a traditional REST API
is used for processing classmate & faculty data.

The frontend is built using these libraries, services, and tools:

| Dependency  | Description                 |
|-------------|-----------------------------|
| Airtable    | Data source for classmate, faculty, & payment history |
| ExpressJS   | Web server functionality    |
| GraphQL     | GraphQL API services        |
| node-mailjet | MailJet API services       |

## routes

| Dependency  | Description                 |
|-------------|-----------------------------|
| /classmates   | Retrieve all classmates info |
| /faculty      | Retreive all faculty member info |
| /logPayment   | Create a payment record in Airtable |
| /sendEventAck | Send a payment aknowledgement email |
| /wakeup       | Wakeup the server         |
## Installation & Configuration

1. Clone or fork this repo using git. Don't forget that to create a runnable application you'll also need the backend.

2. `npm install`

3. To run the app locally enter `npm run dev`

4. Open a new browser window and navigate to the URL `http://localhost:3100` (or whatever port you've specified in `.env`). This assumes that you haven't changed the default port number.

### Environment variables

The following environment variables must be set up for the app to run properly:

| Key              | Value                                |
|------------------|--------------------------------------|
| AIRTABLE_API_KEY     | Your unique Airtable API key     |
| AIRTABLE_BASE        | Id of the Airtable base containing the data |
| MAILJET_API_KEY      | Your unique MailJet API key      |
| MAILJET_SECRET_KEY   | Your MailJet secret key          |
| EMAIL_RECIPIENT_ADDR | Recipient address for emails     |
| EMAIL_RECIPIENT_NAME | Recipient name for emails        |
| EMAIL_SENDER_ADDR    | Sender address for emails        |
| EMAIL_SENDER_ADDR    | Sender address for emails        |
| PORT                 | Server port number (default: 3100) |

## Release History

You can find what changed, when in the [release history](./docs/RELEASE_HISTORY.md)

## License

Copyright 2021, 2022 <COPYRIGHT Jim D. Medlock>

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
