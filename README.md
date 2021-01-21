# Router

API Router for Readable Code.
## Table of Contents

  - [Features](#features)
  - [Browser Support](#browser-support)
  - [Installing](#installing)
  - [Example](#example)

## Features
- mostly covered basic HTTP method
- provide method which make payload resource for HTTP client
- easily set and override HTTP client configuration with less code 
- modify partially basic routing configuration with builder pattern 

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

## Installing

Using npm:

```bash
$ npm install @coldbrew/router
```

Using yarn:

```bash
$ yarn add @coldbrew/router
```

## Example

Performing a `GET` request

```typescript
import { Router } from '@coldbrew/router';

const router = new Router();

// Make a request with callback pattern
router.uri('/user?id=12345')
  .get((err: RouterError, response: RouterResponse) => {
        if (err) {
          console.log('err:', err.response);
        }

        console.log(response.data);
  });

// Make a request with promise pattern
router.uri('/user?id=12345')
  .get()
  .then((response: RouterResponse) => {
          console.log(response.data.length);
  })
  .catch((err: RouterError) => {
          console.log(err.response);
  });

// Make a request with async/await pattern
async function getUser() {
  try {
    const results: RouterResponse = await router.uri('/user?id=12345').get();
  } catch (e) {
    console.log(e.response.data);
  }
}
```

> **NOTE:** `async/await` is part of ECMAScript 2017 and is not supported in Internet
> Explorer and older browsers, so use with caution.

Performing a `POST` request

```typescript

```

Performing multiple concurrent requests

```typescript

```