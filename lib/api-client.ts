export async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function postForm(url: string, formData: FormData, csrfToken?: string | null) {
  const headers = csrfToken ? { "X-CSRF-Token": csrfToken } : undefined;
  const res = await fetch(url, { method: "POST", body: formData, headers });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}
