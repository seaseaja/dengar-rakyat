"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/ui/StatusBadge";
type Post = { id: number; judul: string; isi: string; kategori: string; status: string; created_at: string; wilayah: string; nama: string; comment_count: number };
type Comment = { id: number; isi: string; created_at: string; author: string };

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [next, setNext] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  async function load(before?: number) {
    const response = await fetch(`/api/feed?limit=20${before ? `&before=${before}` : ""}`);
    const data = await response.json();
    if (response.ok) { setPosts((current) => before ? [...current, ...data.posts] : data.posts); setNext(data.next); }
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);
  async function showComments(id: number) {
    const target = open === id ? null : id; setOpen(target); setMessage("");
    if (target && !comments[id]) {
      const response = await fetch(`/api/feed/${id}/comments`);
      const data = await response.json(); if (response.ok) setComments((all) => ({ ...all, [id]: data }));
    }
  }
  async function submitComment(id: number) {
    setMessage("");
    const csrf = await fetch("/api/auth/csrf").then((r) => r.json());
    const response = await fetch(`/api/feed/${id}/comments`, { method: "POST", headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf.token }, body: JSON.stringify({ isi: drafts[id] || "" }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "Komentar gagal dikirim"); return; }
    setDrafts((all) => ({ ...all, [id]: "" }));
    const updated = await fetch(`/api/feed/${id}/comments`).then((r) => r.json());
    setComments((all) => ({ ...all, [id]: updated })); setPosts((all) => all.map((post) => post.id === id ? { ...post, comment_count: post.comment_count + 1 } : post));
  }
  if (loading) return <p className="text-gray-400">Memuat Ruang Warga...</p>;
  return <div className="mx-auto max-w-3xl space-y-4">
    {posts.length === 0 && <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">Belum ada laporan yang dibagikan. Saat membuat laporan, pemiliknya bisa memilih untuk membagikannya di sini.</div>}
    {posts.map((post) => <article key={post.id} className="surface-card rounded-2xl border border-slate-700/70 bg-slate-900/75 p-5 shadow-lg shadow-black/20 sm:p-6">
      <div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-100">{post.nama}</p><p className="text-xs text-slate-400">{post.wilayah} · {new Date(post.created_at).toLocaleString("id-ID")}</p></div><StatusBadge status={post.status} /></div>
      <p className="eyebrow mt-5">{post.kategori}</p><h2 className="mt-1 text-lg font-semibold text-slate-100">{post.judul}</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">{post.isi}</p>
      <button onClick={() => void showComments(post.id)} className="mt-4 text-sm font-medium text-cyan-300 hover:text-cyan-200">{post.comment_count} komentar · {open === post.id ? "Tutup" : "Lihat dan komentar"}</button>
      {open === post.id && <section className="mt-4 border-t border-slate-700 pt-4"><div className="max-h-64 space-y-3 overflow-y-auto">{(comments[post.id] || []).map((comment) => <div key={comment.id} className="rounded-lg bg-slate-800/80 p-3"><p className="text-xs text-slate-400">{comment.author} · {new Date(comment.created_at).toLocaleString("id-ID")}</p><p className="mt-1 whitespace-pre-wrap text-sm text-slate-200">{comment.isi}</p></div>)}</div>
        <textarea maxLength={1000} value={drafts[post.id] || ""} onChange={(e) => setDrafts((all) => ({ ...all, [post.id]: e.target.value }))} placeholder="Tulis komentar..." className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500" />
        {message && <p className="mt-2 text-sm text-rose-300">{message}</p>}<button onClick={() => void submitComment(post.id)} className="mt-2 rounded-lg bg-cyan-800 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700">Kirim komentar</button>
      </section>}
    </article>)}
    {next && <button onClick={() => void load(next)} className="w-full rounded-xl border border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-200">Muat laporan lainnya</button>}
  </div>;
}
