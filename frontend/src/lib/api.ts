import foundryConfig from '../../../foundry.json' with { type: 'json' };

// Get backend URL from foundry.json (falls back to default if missing)
const BASE_URL = foundryConfig?.host?.backend ;

interface CountResponse {
  count: number;
}

export async function fetchCount(): Promise<number> {
  const response = await fetch(`${BASE_URL}/count`);
  if (!response.ok) {
    throw new Error(`Failed to fetch count: ${response.statusText}`);
  }
  const data: CountResponse = await response.json();
  return data.count;
}

export async function increaseCount(): Promise<number> {
  const response = await fetch(`${BASE_URL}/count`, {
    method: 'PUT',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch count: ${response.statusText}`);
  }
  const data: CountResponse = await response.json();
  return data.count;
}

export async function resetCount(): Promise<number> {
  const response = await fetch(`${BASE_URL}/reset`);
  if (!response.ok) {
    throw new Error(`Failed to reset count: ${response.statusText}`);
  }
  const data: CountResponse = await response.json();
  return data.count;
}