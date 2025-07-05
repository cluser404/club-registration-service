import { fetchRegistrations } from './registration-api-client';

const { data } = await fetchRegistrations({ program: 'Microbiology', page: 1 });
console.log(data);