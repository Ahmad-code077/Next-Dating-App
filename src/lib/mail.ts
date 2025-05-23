export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const timestamp = Date.now();

  const response = await fetch(`${baseUrl}/api/mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, token, type: 'verification', timestamp }),
  });

  if (!response.ok) {
    throw new Error('Failed to send verification email');
  }

  return response.json();
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const timestamp = Date.now();

  const response = await fetch(`${baseUrl}/api/mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, token, type: 'reset', timestamp }),
  });

  if (!response.ok) {
    throw new Error('Failed to send password reset email');
  }

  return response.json();
}
