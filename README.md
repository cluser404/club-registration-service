# club-registration-service

A generic and flexible **club registration service** designed for easy integration and extensibility.

![Static Badge](https://img.shields.io/badge/Javascript-black?logo=javascript&logoColor=%23F7DF1E)
![Static Badge](https://img.shields.io/badge/Docker-black?logo=docker&logoColor=%232496ED)
![Static Badge](https://img.shields.io/badge/swagger-black?logo=swagger&logoColor=%2385EA2D)
---

## Getting Started

1. Clone this repository
2. Ensure you have all your application files in place
3. Run the following command:

```bash
docker-compose up -d
```

## Stopping The Service
```bash
docker-compose down
```

## Using it on Client or Other Backend

### Swagger documentation

The service comes with swagger documentation which is accessible on /docs endpoint.

### Client Library

There is a client library in demo folder `demo/registration-api-client.ts`.
This library can be copied into any frontend or meta-framework project for
easy service usage.

Example useage:
```typescript
import { fetchRegistrations } from './registration-api-client';

const { data } = await fetchRegistrations({ program: 'Microbiology', page: 1 });
console.log(data);
```