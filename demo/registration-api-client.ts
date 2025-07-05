// registrationApiClient.ts

export type Gender = 'male' | 'female' | 'other';

export type Program =
  | 'Applied Physics & Electronics'
  | 'Anthropology'
  | 'Architecture'
  | 'BBA'
  | 'Biotechnology'
  | 'Computer Science'
  | 'Computer Science & Engineering'
  | 'Economics'
  | 'Electrical & Electronic Engineering'
  | 'Electronics & Communication Engineering'
  | 'English'
  | 'LLB'
  | 'Mathematics'
  | 'Microbiology'
  | 'Pharmacy'
  | 'Physics'
  | 'Other';

export interface Registration {
  studentId: string;
  name: string;
  semester?: string;
  program?: Program;
  personalEmail?: string;
  orgEmail: string;
  mobile?: string;
  address?: string;
  bio?: string;
  dateOfBirth?: string; // ISO 8601
  gender?: Gender;
  residentialSemester?: string;
  preferredDepartments?: string[];
  githubProfileLink?: string;
  facebookProfileLink?: string;
  linkedInProfileLink?: string;
  instagramProfileLink?: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface FetchRegistrationsResponse {
  success: boolean;
  data: Registration[];
  filters: Record<string, any>;
  pagination: PaginationInfo;
}

export interface FetchSingleResponse {
  success: boolean;
  data: Registration;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface RegistrationQueryParams {
  page?: number;
  limit?: number;
  gender?: Gender;
  name?: string;
  studentId?: string;
  semester?: string;
  mobile?: string;
  program?: Program;
  preferredDepartment?: string;
  personalEmail?: string;
  orgEmail?: string;
  startDate?: string; // ISO 8601
  endDate?: string;   // ISO 8601
}

const BASE_URL = 'http://localhost:6969/api/registrations';

function buildQuery(params: Record<string, any>): string {
  const esc = encodeURIComponent;
  return Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${esc(k)}=${esc(v)}`)
    .join('&');
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error ${res.status}`);
  }
  return res.json();
}

export async function fetchRegistrations(
  queryParams: RegistrationQueryParams = {}
): Promise<FetchRegistrationsResponse> {
  const query = buildQuery(queryParams);
  const res = await fetch(`${BASE_URL}?${query}`);
  return handleResponse(res);
}

export async function fetchRegistrationById(
  id: string
): Promise<FetchSingleResponse> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
}

export async function createRegistration(
  data: Registration
): Promise<FetchSingleResponse> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateRegistration(
  id: string,
  data: Partial<Registration>
): Promise<FetchSingleResponse> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteRegistration(id: string): Promise<DeleteResponse> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
