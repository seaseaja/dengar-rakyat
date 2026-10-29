--
-- PostgreSQL database dump
--

\restrict lWM7vKGXLk7YS6hHF1zktcYzP3b8CdOTwoeQ2NhN0HknPT2t1YHJGqplA9TeZPy

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: wilayah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wilayah (id, kode, nama, tipe, parent_id) FROM stdin;
1	11	Aceh	provinsi	\N
2	12	Sumatera Utara	provinsi	\N
3	13	Sumatera Barat	provinsi	\N
4	14	Riau	provinsi	\N
5	15	Jambi	provinsi	\N
6	16	Sumatera Selatan	provinsi	\N
7	17	Bengkulu	provinsi	\N
8	18	Lampung	provinsi	\N
9	19	Kepulauan Bangka Belitung	provinsi	\N
10	21	Kepulauan Riau	provinsi	\N
11	31	Daerah Khusus Ibukota Jakarta	provinsi	\N
12	32	Jawa Barat	provinsi	\N
13	33	Jawa Tengah	provinsi	\N
14	34	Daerah Istimewa Yogyakarta	provinsi	\N
15	35	Jawa Timur	provinsi	\N
16	36	Banten	provinsi	\N
17	51	Bali	provinsi	\N
18	52	Nusa Tenggara Barat	provinsi	\N
19	53	Nusa Tenggara Timur	provinsi	\N
20	61	Kalimantan Barat	provinsi	\N
21	62	Kalimantan Tengah	provinsi	\N
22	63	Kalimantan Selatan	provinsi	\N
23	64	Kalimantan Timur	provinsi	\N
24	65	Kalimantan Utara	provinsi	\N
25	71	Sulawesi Utara	provinsi	\N
26	72	Sulawesi Tengah	provinsi	\N
27	73	Sulawesi Selatan	provinsi	\N
28	74	Sulawesi Tenggara	provinsi	\N
29	75	Gorontalo	provinsi	\N
30	76	Sulawesi Barat	provinsi	\N
31	81	Maluku	provinsi	\N
32	82	Maluku Utara	provinsi	\N
33	91	Papua	provinsi	\N
34	92	Papua Barat	provinsi	\N
35	93	Papua Selatan	provinsi	\N
36	94	Papua Tengah	provinsi	\N
37	95	Papua Pegunungan	provinsi	\N
38	96	Papua Barat Daya	provinsi	\N
39	11.01	Kabupaten Aceh Selatan	kota_kab	1
40	11.02	Kabupaten Aceh Tenggara	kota_kab	1
41	11.03	Kabupaten Aceh Timur	kota_kab	1
42	11.04	Kabupaten Aceh Tengah	kota_kab	1
43	11.05	Kabupaten Aceh Barat	kota_kab	1
44	11.06	Kabupaten Aceh Besar	kota_kab	1
45	11.07	Kabupaten Pidie	kota_kab	1
46	11.08	Kabupaten Aceh Utara	kota_kab	1
47	11.09	Kabupaten Simeulue	kota_kab	1
48	11.10	Kabupaten Aceh Singkil	kota_kab	1
49	11.11	Kabupaten Bireuen	kota_kab	1
50	11.12	Kabupaten Aceh Barat Daya	kota_kab	1
51	11.13	Kabupaten Gayo Lues	kota_kab	1
52	11.14	Kabupaten Aceh Jaya	kota_kab	1
53	11.15	Kabupaten Nagan Raya	kota_kab	1
54	11.16	Kabupaten Aceh Tamiang	kota_kab	1
55	11.17	Kabupaten Bener Meriah	kota_kab	1
56	11.18	Kabupaten Pidie Jaya	kota_kab	1
57	11.71	Kota Banda Aceh	kota_kab	1
58	11.72	Kota Sabang	kota_kab	1
59	11.73	Kota Lhokseumawe	kota_kab	1
60	11.74	Kota Langsa	kota_kab	1
61	11.75	Kota Subulussalam	kota_kab	1
62	12.01	Kabupaten Tapanuli Tengah	kota_kab	2
63	12.02	Kabupaten Tapanuli Utara	kota_kab	2
64	12.03	Kabupaten Tapanuli Selatan	kota_kab	2
65	12.04	Kabupaten Nias	kota_kab	2
66	12.05	Kabupaten Langkat	kota_kab	2
67	12.06	Kabupaten Karo	kota_kab	2
68	12.07	Kabupaten Deli Serdang	kota_kab	2
69	12.08	Kabupaten Simalungun	kota_kab	2
70	12.09	Kabupaten Asahan	kota_kab	2
71	12.10	Kabupaten Labuhanbatu	kota_kab	2
72	12.11	Kabupaten Dairi	kota_kab	2
73	12.12	Kabupaten Toba	kota_kab	2
74	12.13	Kabupaten Mandailing Natal	kota_kab	2
75	12.14	Kabupaten Nias Selatan	kota_kab	2
76	12.15	Kabupaten Pakpak Bharat	kota_kab	2
77	12.16	Kabupaten Humbang Hasundutan	kota_kab	2
78	12.17	Kabupaten Samosir	kota_kab	2
79	12.18	Kabupaten Serdang Bedagai	kota_kab	2
80	12.19	Kabupaten Batu Bara	kota_kab	2
81	12.20	Kabupaten Padang Lawas Utara	kota_kab	2
82	12.21	Kabupaten Padang Lawas	kota_kab	2
83	12.22	Kabupaten Labuhanbatu Selatan	kota_kab	2
84	12.23	Kabupaten Labuhanbatu Utara	kota_kab	2
85	12.24	Kabupaten Nias Utara	kota_kab	2
86	12.25	Kabupaten Nias Barat	kota_kab	2
87	12.71	Kota Medan	kota_kab	2
88	12.72	Kota Pematangsiantar	kota_kab	2
89	12.73	Kota Sibolga	kota_kab	2
90	12.74	Kota Tanjungbalai	kota_kab	2
91	12.75	Kota Binjai	kota_kab	2
92	12.76	Kota Tebing Tinggi	kota_kab	2
93	12.77	Kota Padangsidimpuan	kota_kab	2
94	12.78	Kota Gunungsitoli	kota_kab	2
95	13.01	Kabupaten Pesisir Selatan	kota_kab	3
96	13.02	Kabupaten Solok	kota_kab	3
97	13.03	Kabupaten Sijunjung	kota_kab	3
98	13.04	Kabupaten Tanah Datar	kota_kab	3
99	13.05	Kabupaten Padang Pariaman	kota_kab	3
100	13.06	Kabupaten Agam	kota_kab	3
101	13.07	Kabupaten Lima Puluh Kota	kota_kab	3
102	13.08	Kabupaten Pasaman	kota_kab	3
103	13.09	Kabupaten Kepulauan Mentawai	kota_kab	3
104	13.10	Kabupaten Dharmasraya	kota_kab	3
105	13.11	Kabupaten Solok Selatan	kota_kab	3
106	13.12	Kabupaten Pasaman Barat	kota_kab	3
107	13.71	Kota Padang	kota_kab	3
108	13.72	Kota Solok	kota_kab	3
109	13.73	Kota Sawahlunto	kota_kab	3
110	13.74	Kota Padang Panjang	kota_kab	3
111	13.75	Kota Bukittinggi	kota_kab	3
112	13.76	Kota Payakumbuh	kota_kab	3
113	13.77	Kota Pariaman	kota_kab	3
114	14.01	Kabupaten Kampar	kota_kab	4
115	14.02	Kabupaten Indragiri Hulu	kota_kab	4
116	14.03	Kabupaten Bengkalis	kota_kab	4
117	14.04	Kabupaten Indragiri Hilir	kota_kab	4
118	14.05	Kabupaten Pelalawan	kota_kab	4
119	14.06	Kabupaten Rokan Hulu	kota_kab	4
120	14.07	Kabupaten Rokan Hilir	kota_kab	4
121	14.08	Kabupaten Siak	kota_kab	4
122	14.09	Kabupaten Kuantan Singingi	kota_kab	4
123	14.10	Kabupaten Kepulauan Meranti	kota_kab	4
124	14.71	Kota Pekanbaru	kota_kab	4
125	14.72	Kota Dumai	kota_kab	4
126	15.01	Kabupaten Kerinci	kota_kab	5
127	15.02	Kabupaten Merangin	kota_kab	5
128	15.03	Kabupaten Sarolangun	kota_kab	5
129	15.04	Kabupaten Batanghari	kota_kab	5
130	15.05	Kabupaten Muaro Jambi	kota_kab	5
131	15.06	Kabupaten Tanjung Jabung Barat	kota_kab	5
132	15.07	Kabupaten Tanjung Jabung Timur	kota_kab	5
133	15.08	Kabupaten Bungo	kota_kab	5
134	15.09	Kabupaten Tebo	kota_kab	5
135	15.71	Kota Jambi	kota_kab	5
136	15.72	Kota Sungai Penuh	kota_kab	5
137	16.01	Kabupaten Ogan Komering Ulu	kota_kab	6
138	16.02	Kabupaten Ogan Komering Ilir	kota_kab	6
139	16.03	Kabupaten Muara Enim	kota_kab	6
140	16.04	Kabupaten Lahat	kota_kab	6
141	16.05	Kabupaten Musi Rawas	kota_kab	6
142	16.06	Kabupaten Musi Banyuasin	kota_kab	6
143	16.07	Kabupaten Banyuasin	kota_kab	6
144	16.08	Kabupaten Ogan Komering Ulu Timur	kota_kab	6
145	16.09	Kabupaten Ogan Komering Ulu Selatan	kota_kab	6
146	16.10	Kabupaten Ogan Ilir	kota_kab	6
147	16.11	Kabupaten Empat Lawang	kota_kab	6
148	16.12	Kabupaten Penukal Abab Lematang Ilir	kota_kab	6
149	16.13	Kabupaten Musi Rawas Utara	kota_kab	6
150	16.71	Kota Palembang	kota_kab	6
151	16.72	Kota Pagar Alam	kota_kab	6
152	16.73	Kota Lubuk Linggau	kota_kab	6
153	16.74	Kota Prabumulih	kota_kab	6
154	17.01	Kabupaten Bengkulu Selatan	kota_kab	7
155	17.02	Kabupaten Rejang Lebong	kota_kab	7
156	17.03	Kabupaten Bengkulu Utara	kota_kab	7
157	17.04	Kabupaten Kaur	kota_kab	7
158	17.05	Kabupaten Seluma	kota_kab	7
159	17.06	Kabupaten Mukomuko	kota_kab	7
160	17.07	Kabupaten Lebong	kota_kab	7
161	17.08	Kabupaten Kepahiang	kota_kab	7
162	17.09	Kabupaten Bengkulu Tengah	kota_kab	7
163	17.71	Kota Bengkulu	kota_kab	7
164	18.01	Kabupaten Lampung Selatan	kota_kab	8
165	18.02	Kabupaten Lampung Tengah	kota_kab	8
166	18.03	Kabupaten Lampung Utara	kota_kab	8
167	18.04	Kabupaten Lampung Barat	kota_kab	8
168	18.05	Kabupaten Tulang Bawang	kota_kab	8
169	18.06	Kabupaten Tanggamus	kota_kab	8
170	18.07	Kabupaten Lampung Timur	kota_kab	8
171	18.08	Kabupaten Way Kanan	kota_kab	8
172	18.09	Kabupaten Pesawaran	kota_kab	8
173	18.10	Kabupaten Pringsewu	kota_kab	8
174	18.11	Kabupaten Mesuji	kota_kab	8
175	18.12	Kabupaten Tulang Bawang Barat	kota_kab	8
176	18.13	Kabupaten Pesisir Barat	kota_kab	8
177	18.71	Kota Bandar Lampung	kota_kab	8
178	18.72	Kota Metro	kota_kab	8
179	19.01	Kabupaten Bangka	kota_kab	9
180	19.02	Kabupaten Belitung	kota_kab	9
181	19.03	Kabupaten Bangka Selatan	kota_kab	9
182	19.04	Kabupaten Bangka Tengah	kota_kab	9
183	19.05	Kabupaten Bangka Barat	kota_kab	9
184	19.06	Kabupaten Belitung Timur	kota_kab	9
185	19.71	Kota Pangkal Pinang	kota_kab	9
186	21.01	Kabupaten Bintan	kota_kab	10
187	21.02	Kabupaten Karimun	kota_kab	10
188	21.03	Kabupaten Natuna	kota_kab	10
189	21.04	Kabupaten Lingga	kota_kab	10
190	21.05	Kabupaten Kepulauan Anambas	kota_kab	10
191	21.71	Kota Batam	kota_kab	10
192	21.72	Kota Tanjung Pinang	kota_kab	10
193	31.01	Kabupaten Administrasi Kepulauan Seribu	kota_kab	11
194	31.71	Kota Administrasi Jakarta Pusat	kota_kab	11
195	31.72	Kota Administrasi Jakarta Utara	kota_kab	11
196	31.73	Kota Administrasi Jakarta Barat	kota_kab	11
197	31.74	Kota Administrasi Jakarta Selatan	kota_kab	11
198	31.75	Kota Administrasi Jakarta Timur	kota_kab	11
199	32.01	Kabupaten Bogor	kota_kab	12
200	32.02	Kabupaten Sukabumi	kota_kab	12
201	32.03	Kabupaten Cianjur	kota_kab	12
202	32.04	Kabupaten Bandung	kota_kab	12
203	32.05	Kabupaten Garut	kota_kab	12
204	32.06	Kabupaten Tasikmalaya	kota_kab	12
205	32.07	Kabupaten Ciamis	kota_kab	12
206	32.08	Kabupaten Kuningan	kota_kab	12
207	32.09	Kabupaten Cirebon	kota_kab	12
208	32.10	Kabupaten Majalengka	kota_kab	12
209	32.11	Kabupaten Sumedang	kota_kab	12
210	32.12	Kabupaten Indramayu	kota_kab	12
211	32.13	Kabupaten Subang	kota_kab	12
212	32.14	Kabupaten Purwakarta	kota_kab	12
213	32.15	Kabupaten Karawang	kota_kab	12
214	32.16	Kabupaten Bekasi	kota_kab	12
215	32.17	Kabupaten Bandung Barat	kota_kab	12
216	32.18	Kabupaten Pangandaran	kota_kab	12
217	32.71	Kota Bogor	kota_kab	12
218	32.72	Kota Sukabumi	kota_kab	12
219	32.73	Kota Bandung	kota_kab	12
220	32.74	Kota Cirebon	kota_kab	12
221	32.75	Kota Bekasi	kota_kab	12
222	32.76	Kota Depok	kota_kab	12
223	32.77	Kota Cimahi	kota_kab	12
224	32.78	Kota Tasikmalaya	kota_kab	12
225	32.79	Kota Banjar	kota_kab	12
226	33.01	Kabupaten Cilacap	kota_kab	13
227	33.02	Kabupaten Banyumas	kota_kab	13
228	33.03	Kabupaten Purbalingga	kota_kab	13
229	33.04	Kabupaten Banjarnegara	kota_kab	13
230	33.05	Kabupaten Kebumen	kota_kab	13
231	33.06	Kabupaten Purworejo	kota_kab	13
232	33.07	Kabupaten Wonosobo	kota_kab	13
233	33.08	Kabupaten Magelang	kota_kab	13
234	33.09	Kabupaten Boyolali	kota_kab	13
235	33.10	Kabupaten Klaten	kota_kab	13
236	33.11	Kabupaten Sukoharjo	kota_kab	13
237	33.12	Kabupaten Wonogiri	kota_kab	13
238	33.13	Kabupaten Karanganyar	kota_kab	13
239	33.14	Kabupaten Sragen	kota_kab	13
240	33.15	Kabupaten Grobogan	kota_kab	13
241	33.16	Kabupaten Blora	kota_kab	13
242	33.17	Kabupaten Rembang	kota_kab	13
243	33.18	Kabupaten Pati	kota_kab	13
244	33.19	Kabupaten Kudus	kota_kab	13
245	33.20	Kabupaten Jepara	kota_kab	13
246	33.21	Kabupaten Demak	kota_kab	13
247	33.22	Kabupaten Semarang	kota_kab	13
248	33.23	Kabupaten Temanggung	kota_kab	13
249	33.24	Kabupaten Kendal	kota_kab	13
250	33.25	Kabupaten Batang	kota_kab	13
251	33.26	Kabupaten Pekalongan	kota_kab	13
252	33.27	Kabupaten Pemalang	kota_kab	13
253	33.28	Kabupaten Tegal	kota_kab	13
254	33.29	Kabupaten Brebes	kota_kab	13
255	33.71	Kota Magelang	kota_kab	13
256	33.72	Kota Surakarta	kota_kab	13
257	33.73	Kota Salatiga	kota_kab	13
258	33.74	Kota Semarang	kota_kab	13
259	33.75	Kota Pekalongan	kota_kab	13
260	33.76	Kota Tegal	kota_kab	13
261	34.01	Kabupaten Kulon Progo	kota_kab	14
262	34.02	Kabupaten Bantul	kota_kab	14
263	34.03	Kabupaten Gunungkidul	kota_kab	14
264	34.04	Kabupaten Sleman	kota_kab	14
265	34.71	Kota Yogyakarta	kota_kab	14
266	35.01	Kabupaten Pacitan	kota_kab	15
267	35.02	Kabupaten Ponorogo	kota_kab	15
268	35.03	Kabupaten Trenggalek	kota_kab	15
269	35.04	Kabupaten Tulungagung	kota_kab	15
270	35.05	Kabupaten Blitar	kota_kab	15
271	35.06	Kabupaten Kediri	kota_kab	15
272	35.07	Kabupaten Malang	kota_kab	15
273	35.08	Kabupaten Lumajang	kota_kab	15
274	35.09	Kabupaten Jember	kota_kab	15
275	35.10	Kabupaten Banyuwangi	kota_kab	15
276	35.11	Kabupaten Bondowoso	kota_kab	15
277	35.12	Kabupaten Situbondo	kota_kab	15
278	35.13	Kabupaten Probolinggo	kota_kab	15
279	35.14	Kabupaten Pasuruan	kota_kab	15
280	35.15	Kabupaten Sidoarjo	kota_kab	15
281	35.16	Kabupaten Mojokerto	kota_kab	15
282	35.17	Kabupaten Jombang	kota_kab	15
283	35.18	Kabupaten Nganjuk	kota_kab	15
284	35.19	Kabupaten Madiun	kota_kab	15
285	35.20	Kabupaten Magetan	kota_kab	15
286	35.21	Kabupaten Ngawi	kota_kab	15
287	35.22	Kabupaten Bojonegoro	kota_kab	15
288	35.23	Kabupaten Tuban	kota_kab	15
289	35.24	Kabupaten Lamongan	kota_kab	15
290	35.25	Kabupaten Gresik	kota_kab	15
291	35.26	Kabupaten Bangkalan	kota_kab	15
292	35.27	Kabupaten Sampang	kota_kab	15
293	35.28	Kabupaten Pamekasan	kota_kab	15
294	35.29	Kabupaten Sumenep	kota_kab	15
295	35.71	Kota Kediri	kota_kab	15
296	35.72	Kota Blitar	kota_kab	15
297	35.73	Kota Malang	kota_kab	15
298	35.74	Kota Probolinggo	kota_kab	15
299	35.75	Kota Pasuruan	kota_kab	15
300	35.76	Kota Mojokerto	kota_kab	15
301	35.77	Kota Madiun	kota_kab	15
302	35.78	Kota Surabaya	kota_kab	15
303	35.79	Kota Batu	kota_kab	15
304	36.01	Kabupaten Pandeglang	kota_kab	16
305	36.02	Kabupaten Lebak	kota_kab	16
306	36.03	Kabupaten Tangerang	kota_kab	16
307	36.04	Kabupaten Serang	kota_kab	16
308	36.71	Kota Tangerang	kota_kab	16
309	36.72	Kota Cilegon	kota_kab	16
310	36.73	Kota Serang	kota_kab	16
311	36.74	Kota Tangerang Selatan	kota_kab	16
312	51.01	Kabupaten Jembrana	kota_kab	17
313	51.02	Kabupaten Tabanan	kota_kab	17
314	51.03	Kabupaten Badung	kota_kab	17
315	51.04	Kabupaten Gianyar	kota_kab	17
316	51.05	Kabupaten Klungkung	kota_kab	17
317	51.06	Kabupaten Bangli	kota_kab	17
318	51.07	Kabupaten Karangasem	kota_kab	17
319	51.08	Kabupaten Buleleng	kota_kab	17
320	51.71	Kota Denpasar	kota_kab	17
321	52.01	Kabupaten Lombok Barat	kota_kab	18
322	52.02	Kabupaten Lombok Tengah	kota_kab	18
323	52.03	Kabupaten Lombok Timur	kota_kab	18
324	52.04	Kabupaten Sumbawa	kota_kab	18
325	52.05	Kabupaten Dompu	kota_kab	18
326	52.06	Kabupaten Bima	kota_kab	18
327	52.07	Kabupaten Sumbawa Barat	kota_kab	18
328	52.08	Kabupaten Lombok Utara	kota_kab	18
329	52.71	Kota Mataram	kota_kab	18
330	52.72	Kota Bima	kota_kab	18
331	53.01	Kabupaten Kupang	kota_kab	19
332	53.02	Kabupaten Timor Tengah Selatan	kota_kab	19
333	53.03	Kabupaten Timor Tengah Utara	kota_kab	19
334	53.04	Kabupaten Belu	kota_kab	19
335	53.05	Kabupaten Alor	kota_kab	19
444	73.08	Kabupaten Bone	kota_kab	27
336	53.06	Kabupaten Flores Timur	kota_kab	19
337	53.07	Kabupaten Sikka	kota_kab	19
338	53.08	Kabupaten Ende	kota_kab	19
339	53.09	Kabupaten Ngada	kota_kab	19
340	53.10	Kabupaten Manggarai	kota_kab	19
341	53.11	Kabupaten Sumba Timur	kota_kab	19
342	53.12	Kabupaten Sumba Barat	kota_kab	19
343	53.13	Kabupaten Lembata	kota_kab	19
344	53.14	Kabupaten Rote Ndao	kota_kab	19
345	53.15	Kabupaten Manggarai Barat	kota_kab	19
346	53.16	Kabupaten Nagekeo	kota_kab	19
347	53.17	Kabupaten Sumba Tengah	kota_kab	19
348	53.18	Kabupaten Sumba Barat Daya	kota_kab	19
349	53.19	Kabupaten Manggarai Timur	kota_kab	19
350	53.20	Kabupaten Sabu Raijua	kota_kab	19
351	53.21	Kabupaten Malaka	kota_kab	19
352	53.71	Kota Kupang	kota_kab	19
353	61.01	Kabupaten Sambas	kota_kab	20
354	61.02	Kabupaten Mempawah	kota_kab	20
355	61.03	Kabupaten Sanggau	kota_kab	20
356	61.04	Kabupaten Ketapang	kota_kab	20
357	61.05	Kabupaten Sintang	kota_kab	20
358	61.06	Kabupaten Kapuas Hulu	kota_kab	20
359	61.07	Kabupaten Bengkayang	kota_kab	20
360	61.08	Kabupaten Landak	kota_kab	20
361	61.09	Kabupaten Sekadau	kota_kab	20
362	61.10	Kabupaten Melawi	kota_kab	20
363	61.11	Kabupaten Kayong Utara	kota_kab	20
364	61.12	Kabupaten Kubu Raya	kota_kab	20
365	61.71	Kota Pontianak	kota_kab	20
366	61.72	Kota Singkawang	kota_kab	20
367	62.01	Kabupaten Kotawaringin Barat	kota_kab	21
368	62.02	Kabupaten Kotawaringin Timur	kota_kab	21
369	62.03	Kabupaten Kapuas	kota_kab	21
370	62.04	Kabupaten Barito Selatan	kota_kab	21
371	62.05	Kabupaten Barito Utara	kota_kab	21
372	62.06	Kabupaten Katingan	kota_kab	21
373	62.07	Kabupaten Seruyan	kota_kab	21
374	62.08	Kabupaten Sukamara	kota_kab	21
375	62.09	Kabupaten Lamandau	kota_kab	21
376	62.10	Kabupaten Gunung Mas	kota_kab	21
377	62.11	Kabupaten Pulang Pisau	kota_kab	21
378	62.12	Kabupaten Murung Raya	kota_kab	21
379	62.13	Kabupaten Barito Timur	kota_kab	21
380	62.71	Kota Palangkaraya	kota_kab	21
381	63.01	Kabupaten Tanah Laut	kota_kab	22
382	63.02	Kabupaten Kotabaru	kota_kab	22
383	63.03	Kabupaten Banjar	kota_kab	22
384	63.04	Kabupaten Barito Kuala	kota_kab	22
385	63.05	Kabupaten Tapin	kota_kab	22
386	63.06	Kabupaten Hulu Sungai Selatan	kota_kab	22
387	63.07	Kabupaten Hulu Sungai Tengah	kota_kab	22
388	63.08	Kabupaten Hulu Sungai Utara	kota_kab	22
389	63.09	Kabupaten Tabalong	kota_kab	22
390	63.10	Kabupaten Tanah Bumbu	kota_kab	22
391	63.11	Kabupaten Balangan	kota_kab	22
392	63.71	Kota Banjarmasin	kota_kab	22
393	63.72	Kota Banjarbaru	kota_kab	22
394	64.01	Kabupaten Paser	kota_kab	23
395	64.02	Kabupaten Kutai Kartanegara	kota_kab	23
396	64.03	Kabupaten Berau	kota_kab	23
397	64.07	Kabupaten Kutai Barat	kota_kab	23
398	64.08	Kabupaten Kutai Timur	kota_kab	23
399	64.09	Kabupaten Penajam Paser Utara	kota_kab	23
400	64.11	Kabupaten Mahakam Ulu	kota_kab	23
401	64.71	Kota Balikpapan	kota_kab	23
402	64.72	Kota Samarinda	kota_kab	23
403	64.74	Kota Bontang	kota_kab	23
404	65.01	Kabupaten Bulungan	kota_kab	24
405	65.02	Kabupaten Malinau	kota_kab	24
406	65.03	Kabupaten Nunukan	kota_kab	24
407	65.04	Kabupaten Tana Tidung	kota_kab	24
408	65.71	Kota Tarakan	kota_kab	24
409	71.01	Kabupaten Bolaang Mongondow	kota_kab	25
410	71.02	Kabupaten Minahasa	kota_kab	25
411	71.03	Kabupaten Kepulauan Sangihe	kota_kab	25
412	71.04	Kabupaten Kepulauan Talaud	kota_kab	25
413	71.05	Kabupaten Minahasa Selatan	kota_kab	25
414	71.06	Kabupaten Minahasa Utara	kota_kab	25
415	71.07	Kabupaten Minahasa Tenggara	kota_kab	25
416	71.08	Kabupaten Bolaang Mongondow Utara	kota_kab	25
417	71.09	Kabupaten Kep. Siau Tagulandang Biaro	kota_kab	25
418	71.10	Kabupaten Bolaang Mongondow Timur	kota_kab	25
419	71.11	Kabupaten Bolaang Mongondow Selatan	kota_kab	25
420	71.71	Kota Manado	kota_kab	25
421	71.72	Kota Bitung	kota_kab	25
422	71.73	Kota Tomohon	kota_kab	25
423	71.74	Kota Kotamobagu	kota_kab	25
424	72.01	Kabupaten Banggai	kota_kab	26
425	72.02	Kabupaten Poso	kota_kab	26
426	72.03	Kabupaten Donggala	kota_kab	26
427	72.04	Kabupaten Toli-Toli	kota_kab	26
428	72.05	Kabupaten Buol	kota_kab	26
429	72.06	Kabupaten Morowali	kota_kab	26
430	72.07	Kabupaten Banggai Kepulauan	kota_kab	26
431	72.08	Kabupaten Parigi Moutong	kota_kab	26
432	72.09	Kabupaten Tojo Una Una	kota_kab	26
433	72.10	Kabupaten Sigi	kota_kab	26
434	72.11	Kabupaten Banggai Laut	kota_kab	26
435	72.12	Kabupaten Morowali Utara	kota_kab	26
436	72.71	Kota Palu	kota_kab	26
437	73.01	Kabupaten Kepulauan Selayar	kota_kab	27
438	73.02	Kabupaten Bulukumba	kota_kab	27
439	73.03	Kabupaten Bantaeng	kota_kab	27
440	73.04	Kabupaten Jeneponto	kota_kab	27
441	73.05	Kabupaten Takalar	kota_kab	27
442	73.06	Kabupaten Gowa	kota_kab	27
443	73.07	Kabupaten Sinjai	kota_kab	27
445	73.09	Kabupaten Maros	kota_kab	27
446	73.10	Kabupaten Pangkajene dan Kepulauan	kota_kab	27
447	73.11	Kabupaten Barru	kota_kab	27
448	73.12	Kabupaten Soppeng	kota_kab	27
449	73.13	Kabupaten Wajo	kota_kab	27
450	73.14	Kabupaten Sidenreng Rappang	kota_kab	27
451	73.15	Kabupaten Pinrang	kota_kab	27
452	73.16	Kabupaten Enrekang	kota_kab	27
453	73.17	Kabupaten Luwu	kota_kab	27
454	73.18	Kabupaten Tana Toraja	kota_kab	27
455	73.22	Kabupaten Luwu Utara	kota_kab	27
456	73.24	Kabupaten Luwu Timur	kota_kab	27
457	73.26	Kabupaten Toraja Utara	kota_kab	27
458	73.71	Kota Makassar	kota_kab	27
459	73.72	Kota Parepare	kota_kab	27
460	73.73	Kota Palopo	kota_kab	27
461	74.01	Kabupaten Kolaka	kota_kab	28
462	74.02	Kabupaten Konawe	kota_kab	28
463	74.03	Kabupaten Muna	kota_kab	28
464	74.04	Kabupaten Buton	kota_kab	28
465	74.05	Kabupaten Konawe Selatan	kota_kab	28
466	74.06	Kabupaten Bombana	kota_kab	28
467	74.07	Kabupaten Wakatobi	kota_kab	28
468	74.08	Kabupaten Kolaka Utara	kota_kab	28
469	74.09	Kabupaten Konawe Utara	kota_kab	28
470	74.10	Kabupaten Buton Utara	kota_kab	28
471	74.11	Kabupaten Kolaka Timur	kota_kab	28
472	74.12	Kabupaten Konawe Kepulauan	kota_kab	28
473	74.13	Kabupaten Muna Barat	kota_kab	28
474	74.14	Kabupaten Buton Tengah	kota_kab	28
475	74.15	Kabupaten Buton Selatan	kota_kab	28
476	74.71	Kota Kendari	kota_kab	28
477	74.72	Kota Bau Bau	kota_kab	28
478	75.01	Kabupaten Gorontalo	kota_kab	29
479	75.02	Kabupaten Boalemo	kota_kab	29
480	75.03	Kabupaten Bone Bolango	kota_kab	29
481	75.04	Kabupaten Pohuwato	kota_kab	29
482	75.05	Kabupaten Gorontalo Utara	kota_kab	29
483	75.71	Kota Gorontalo	kota_kab	29
484	76.01	Kabupaten Pasangkayu	kota_kab	30
485	76.02	Kabupaten Mamuju	kota_kab	30
486	76.03	Kabupaten Mamasa	kota_kab	30
487	76.04	Kabupaten Polewali Mandar	kota_kab	30
488	76.05	Kabupaten Majene	kota_kab	30
489	76.06	Kabupaten Mamuju Tengah	kota_kab	30
490	81.01	Kabupaten Maluku Tengah	kota_kab	31
491	81.02	Kabupaten Maluku Tenggara	kota_kab	31
492	81.03	Kabupaten Kepulauan Tanimbar	kota_kab	31
493	81.04	Kabupaten Buru	kota_kab	31
494	81.05	Kabupaten Seram Bagian Timur	kota_kab	31
495	81.06	Kabupaten Seram Bagian Barat	kota_kab	31
496	81.07	Kabupaten Kepulauan Aru	kota_kab	31
497	81.08	Kabupaten Maluku Barat Daya	kota_kab	31
498	81.09	Kabupaten Buru Selatan	kota_kab	31
499	81.71	Kota Ambon	kota_kab	31
500	81.72	Kota Tual	kota_kab	31
501	82.01	Kabupaten Halmahera Barat	kota_kab	32
502	82.02	Kabupaten Halmahera Tengah	kota_kab	32
503	82.03	Kabupaten Halmahera Utara	kota_kab	32
504	82.04	Kabupaten Halmahera Selatan	kota_kab	32
505	82.05	Kabupaten Kepulauan Sula	kota_kab	32
506	82.06	Kabupaten Halmahera Timur	kota_kab	32
507	82.07	Kabupaten Pulau Morotai	kota_kab	32
508	82.08	Kabupaten Pulau Taliabu	kota_kab	32
509	82.71	Kota Ternate	kota_kab	32
510	82.72	Kota Tidore Kepulauan	kota_kab	32
511	91.03	Kabupaten Jayapura	kota_kab	33
512	91.05	Kabupaten Kepulauan Yapen	kota_kab	33
513	91.06	Kabupaten Biak Numfor	kota_kab	33
514	91.10	Kabupaten Sarmi	kota_kab	33
515	91.11	Kabupaten Keerom	kota_kab	33
516	91.15	Kabupaten Waropen	kota_kab	33
517	91.19	Kabupaten Supiori	kota_kab	33
518	91.20	Kabupaten Mamberamo Raya	kota_kab	33
519	91.71	Kota Jayapura	kota_kab	33
520	92.02	Kabupaten Manokwari	kota_kab	34
521	92.03	Kabupaten Fak Fak	kota_kab	34
522	92.06	Kabupaten Teluk Bintuni	kota_kab	34
523	92.07	Kabupaten Teluk Wondama	kota_kab	34
524	92.08	Kabupaten Kaimana	kota_kab	34
525	92.11	Kabupaten Manokwari Selatan	kota_kab	34
526	92.12	Kabupaten Pegunungan Arfak	kota_kab	34
527	93.01	Kabupaten Merauke	kota_kab	35
528	93.02	Kabupaten Boven Digoel	kota_kab	35
529	93.03	Kabupaten Mappi	kota_kab	35
530	93.04	Kabupaten Asmat	kota_kab	35
531	94.01	Kabupaten Nabire	kota_kab	36
532	94.02	Kabupaten Puncak Jaya	kota_kab	36
533	94.03	Kabupaten Paniai	kota_kab	36
534	94.04	Kabupaten Mimika	kota_kab	36
535	94.05	Kabupaten Puncak	kota_kab	36
536	94.06	Kabupaten Dogiyai	kota_kab	36
537	94.07	Kabupaten Intan Jaya	kota_kab	36
538	94.08	Kabupaten Deiyai	kota_kab	36
539	95.01	Kabupaten Jayawijaya	kota_kab	37
540	95.02	Kabupaten Pegunungan Bintang	kota_kab	37
541	95.03	Kabupaten Yahukimo	kota_kab	37
542	95.04	Kabupaten Tolikara	kota_kab	37
543	95.05	Kabupaten Mamberamo Tengah	kota_kab	37
544	95.06	Kabupaten Yalimo	kota_kab	37
545	95.07	Kabupaten Lanny Jaya	kota_kab	37
546	95.08	Kabupaten Nduga	kota_kab	37
547	96.01	Kabupaten Sorong	kota_kab	38
548	96.02	Kabupaten Sorong Selatan	kota_kab	38
549	96.03	Kabupaten Raja Ampat	kota_kab	38
550	96.04	Kabupaten Tambrauw	kota_kab	38
551	96.05	Kabupaten Maybrat	kota_kab	38
552	96.71	Kota Sorong	kota_kab	38
553	11.01.01	Bakongan	kecamatan	39
554	11.01.02	Kluet Utara	kecamatan	39
555	11.01.03	Kluet Selatan	kecamatan	39
556	11.01.04	Labuhanhaji	kecamatan	39
557	11.01.05	Meukek	kecamatan	39
558	11.01.06	Samadua	kecamatan	39
559	11.01.07	Sawang	kecamatan	39
560	11.01.08	Tapaktuan	kecamatan	39
561	11.01.09	Trumon	kecamatan	39
562	11.01.10	Pasie Raja	kecamatan	39
563	11.01.11	Labuhanhaji Timur	kecamatan	39
564	11.01.12	Labuhanhaji Barat	kecamatan	39
565	11.01.13	Kluet Tengah	kecamatan	39
566	11.01.14	Kluet Timur	kecamatan	39
567	11.01.15	Bakongan Timur	kecamatan	39
568	11.01.16	Trumon Timur	kecamatan	39
569	11.01.17	Kota Bahagia	kecamatan	39
570	11.01.18	Trumon Tengah	kecamatan	39
571	11.02.01	Lawe Alas	kecamatan	40
572	11.02.02	Lawe Sigala-Gala	kecamatan	40
573	11.02.03	Bambel	kecamatan	40
574	11.02.04	Babussalam	kecamatan	40
575	11.02.05	Badar	kecamatan	40
576	11.02.06	Babul Makmur	kecamatan	40
577	11.02.07	Darul Hasanah	kecamatan	40
578	11.02.08	Lawe Bulan	kecamatan	40
579	11.02.09	Bukit Tusam	kecamatan	40
580	11.02.10	Semadam	kecamatan	40
581	11.02.11	Babul Rahmah	kecamatan	40
582	11.02.12	Ketambe	kecamatan	40
583	11.02.13	Deleng Pokhkisen	kecamatan	40
584	11.02.14	Lawe Sumur	kecamatan	40
585	11.02.15	Tanoh Alas	kecamatan	40
586	11.02.16	Leuser	kecamatan	40
587	11.03.01	Darul Aman	kecamatan	41
588	11.03.02	Julok	kecamatan	41
589	11.03.03	Idi Rayeuk	kecamatan	41
590	11.03.04	Birem Bayeun	kecamatan	41
591	11.03.05	Serbajadi	kecamatan	41
592	11.03.06	Nurussalam	kecamatan	41
593	11.03.07	Peureulak	kecamatan	41
594	11.03.08	Rantau Selamat	kecamatan	41
595	11.03.09	Simpang Ulim	kecamatan	41
596	11.03.10	Ranto Peureulak	kecamatan	41
597	11.03.11	Pante Bidari	kecamatan	41
598	11.03.12	Madat	kecamatan	41
599	11.03.13	Indra Makmu	kecamatan	41
600	11.03.14	Idi Tunong	kecamatan	41
601	11.03.15	Banda Alam	kecamatan	41
602	11.03.16	Peudawa	kecamatan	41
603	11.03.17	Peureulak Timur	kecamatan	41
604	11.03.18	Peureulak Barat	kecamatan	41
605	11.03.19	Sungai Raya	kecamatan	41
606	11.03.20	Simpang Jernih	kecamatan	41
607	11.03.21	Darul Ihsan	kecamatan	41
608	11.03.22	Darul Falah	kecamatan	41
609	11.03.23	Idi Timur	kecamatan	41
610	11.03.24	Peunaron	kecamatan	41
611	11.04.01	Linge	kecamatan	42
612	11.04.02	Silih Nara	kecamatan	42
613	11.04.03	Bebesen	kecamatan	42
614	11.04.07	Pegasing	kecamatan	42
615	11.04.08	Bintang	kecamatan	42
616	11.04.10	Ketol	kecamatan	42
617	11.04.11	Kebayakan	kecamatan	42
618	11.04.12	Kute Panang	kecamatan	42
619	11.04.13	Celala	kecamatan	42
620	11.04.17	Laut Tawar	kecamatan	42
621	11.04.18	Atu Lintang	kecamatan	42
622	11.04.19	Jagong Jeget	kecamatan	42
623	11.04.20	Bies	kecamatan	42
624	11.04.21	Rusip Antara	kecamatan	42
625	11.05.01	Johan Pahlawan	kecamatan	43
626	11.05.02	Kaway XVI	kecamatan	43
627	11.05.03	Sungai Mas	kecamatan	43
628	11.05.04	Woyla	kecamatan	43
629	11.05.05	Samatiga	kecamatan	43
630	11.05.06	Bubon	kecamatan	43
631	11.05.07	Arongan Lambalek	kecamatan	43
632	11.05.08	Pante Ceureumen	kecamatan	43
633	11.05.09	Meureubo	kecamatan	43
634	11.05.10	Woyla Barat	kecamatan	43
635	11.05.11	Woyla Timur	kecamatan	43
636	11.05.12	Panton Reu	kecamatan	43
637	11.06.01	Lhoong	kecamatan	44
638	11.06.02	Lhoknga	kecamatan	44
639	11.06.03	Indrapuri	kecamatan	44
640	11.06.04	Seulimeum	kecamatan	44
641	11.06.05	Montasik	kecamatan	44
642	11.06.06	Sukamakmur	kecamatan	44
643	11.06.07	Darul Imarah	kecamatan	44
644	11.06.08	Peukan Bada	kecamatan	44
645	11.06.09	Mesjid Raya	kecamatan	44
646	11.06.10	Ingin Jaya	kecamatan	44
647	11.06.11	Kuta Baro	kecamatan	44
648	11.06.12	Darussalam	kecamatan	44
649	11.06.13	Pulo Aceh	kecamatan	44
650	11.06.14	Lembah Seulawah	kecamatan	44
651	11.06.15	Kota Jantho	kecamatan	44
652	11.06.16	Kuta Cot Glie	kecamatan	44
653	11.06.17	Kuta Malaka	kecamatan	44
654	11.06.18	Simpang Tiga	kecamatan	44
655	11.06.19	Darul Kamal	kecamatan	44
656	11.06.20	Baitussalam	kecamatan	44
657	11.06.21	Krueng Barona Jaya	kecamatan	44
658	11.06.22	Leupung	kecamatan	44
659	11.06.23	Blang Bintang	kecamatan	44
660	11.07.03	Batee	kecamatan	45
661	11.07.04	Delima	kecamatan	45
662	11.07.05	Geumpang	kecamatan	45
663	11.07.06	Glumpang Tiga	kecamatan	45
664	11.07.07	Indrajaya	kecamatan	45
665	11.07.08	Kembang Tanjong	kecamatan	45
666	11.07.09	Kota Sigli	kecamatan	45
667	11.07.11	Mila	kecamatan	45
668	11.07.12	Muara Tiga	kecamatan	45
669	11.07.13	Mutiara	kecamatan	45
670	11.07.14	Padang Tiji	kecamatan	45
671	11.07.15	Peukan Baro	kecamatan	45
672	11.07.16	Pidie	kecamatan	45
673	11.07.17	Sakti	kecamatan	45
674	11.07.18	Simpang Tiga	kecamatan	45
675	11.07.19	Tangse	kecamatan	45
676	11.07.21	Tiro/Truseb	kecamatan	45
677	11.07.22	Keumala	kecamatan	45
678	11.07.24	Mutiara Timur	kecamatan	45
679	11.07.25	Grong-grong	kecamatan	45
680	11.07.27	Mane	kecamatan	45
681	11.07.29	Glumpang Baro	kecamatan	45
682	11.07.31	Titeue	kecamatan	45
683	11.08.01	Baktiya	kecamatan	46
684	11.08.02	Dewantara	kecamatan	46
685	11.08.03	Kuta Makmur	kecamatan	46
686	11.08.04	Lhoksukon	kecamatan	46
687	11.08.05	Matangkuli	kecamatan	46
688	11.08.06	Muara Batu	kecamatan	46
689	11.08.07	Meurah Mulia	kecamatan	46
690	11.08.08	Samudera	kecamatan	46
691	11.08.09	Seunuddon	kecamatan	46
692	11.08.10	Syamtalira Aron	kecamatan	46
693	11.08.11	Syamtalira Bayu	kecamatan	46
694	11.08.12	Tanah Luas	kecamatan	46
695	11.08.13	Tanah Pasir	kecamatan	46
696	11.08.14	Tanah Jambo Aye	kecamatan	46
697	11.08.15	Sawang	kecamatan	46
698	11.08.16	Nisam	kecamatan	46
699	11.08.17	Cot Girek	kecamatan	46
700	11.08.18	Langkahan	kecamatan	46
701	11.08.19	Baktiya Barat	kecamatan	46
702	11.08.20	Paya Bakong	kecamatan	46
703	11.08.21	Nibong	kecamatan	46
704	11.08.22	Simpang Keuramat	kecamatan	46
705	11.08.23	Lapang	kecamatan	46
706	11.08.24	Pirak Timu	kecamatan	46
707	11.08.25	Geureudong Pase	kecamatan	46
708	11.08.26	Banda Baro	kecamatan	46
709	11.08.27	Nisam Antara	kecamatan	46
710	11.09.01	Simeulue Tengah	kecamatan	47
711	11.09.02	Salang	kecamatan	47
712	11.09.03	Teupah Barat	kecamatan	47
713	11.09.04	Simeulue Timur	kecamatan	47
714	11.09.05	Teluk Dalam	kecamatan	47
715	11.09.06	Simeulue Barat	kecamatan	47
716	11.09.07	Teupah Selatan	kecamatan	47
717	11.09.08	Alafan	kecamatan	47
718	11.09.09	Teupah Tengah	kecamatan	47
719	11.09.10	Simeulue Cut	kecamatan	47
720	11.10.01	Pulau Banyak	kecamatan	48
721	11.10.02	Simpang Kanan	kecamatan	48
722	11.10.04	Singkil	kecamatan	48
723	11.10.06	Gunung Meriah	kecamatan	48
724	11.10.09	Kota Baharu	kecamatan	48
725	11.10.10	Singkil Utara	kecamatan	48
726	11.10.11	Danau Paris	kecamatan	48
727	11.10.12	Suro Makmur	kecamatan	48
728	11.10.13	Singkohor	kecamatan	48
729	11.10.14	Kuala Baru	kecamatan	48
730	11.10.16	Pulau Banyak Barat	kecamatan	48
731	11.11.01	Samalanga	kecamatan	49
732	11.11.02	Jeunieb	kecamatan	49
733	11.11.03	Peudada	kecamatan	49
734	11.11.04	Jeumpa	kecamatan	49
735	11.11.05	Peusangan	kecamatan	49
736	11.11.06	Makmur	kecamatan	49
737	11.11.07	Gandapura	kecamatan	49
738	11.11.08	Pandrah	kecamatan	49
739	11.11.09	Juli	kecamatan	49
740	11.11.10	Jangka	kecamatan	49
741	11.11.11	Simpang Mamplam	kecamatan	49
742	11.11.12	Peulimbang	kecamatan	49
743	11.11.13	Kota Juang	kecamatan	49
744	11.11.14	Kuala	kecamatan	49
745	11.11.15	Peusangan Siblah Krueng	kecamatan	49
746	11.11.16	Peusangan Selatan	kecamatan	49
747	11.11.17	Kuta Blang	kecamatan	49
748	11.12.01	Blangpidie	kecamatan	50
749	11.12.02	Tangan-Tangan	kecamatan	50
750	11.12.03	Manggeng	kecamatan	50
751	11.12.04	Susoh	kecamatan	50
752	11.12.05	Kuala Batee	kecamatan	50
753	11.12.06	Babah Rot	kecamatan	50
754	11.12.07	Setia	kecamatan	50
755	11.12.08	Jeumpa	kecamatan	50
756	11.12.09	Lembah Sabil	kecamatan	50
757	11.13.01	Blangkejeren	kecamatan	51
758	11.13.02	Kutapanjang	kecamatan	51
759	11.13.03	Rikit Gaib	kecamatan	51
760	11.13.04	Terangun	kecamatan	51
761	11.13.05	Pining	kecamatan	51
762	11.13.06	Blangpegayon	kecamatan	51
763	11.13.07	Puteri Betung	kecamatan	51
764	11.13.08	Dabun Gelang	kecamatan	51
765	11.13.09	Blangjerango	kecamatan	51
766	11.13.10	Teripe Jaya	kecamatan	51
767	11.13.11	Pantan Cuaca	kecamatan	51
768	11.14.01	Teunom	kecamatan	52
769	11.14.02	Krueng Sabee	kecamatan	52
770	11.14.03	Setia Bakti	kecamatan	52
771	11.14.04	Sampoi Niet	kecamatan	52
772	11.14.05	Jaya	kecamatan	52
773	11.14.06	Panga	kecamatan	52
774	11.14.07	Indra Jaya	kecamatan	52
775	11.14.08	Darul Hikmah	kecamatan	52
776	11.14.09	Pasie Raya	kecamatan	52
777	11.15.01	Kuala	kecamatan	53
778	11.15.02	Seunagan	kecamatan	53
779	11.15.03	Seunagan Timur	kecamatan	53
780	11.15.04	Beutong	kecamatan	53
781	11.15.05	Darul Makmur	kecamatan	53
782	11.15.06	Suka Makmue	kecamatan	53
783	11.15.07	Kuala Pesisir	kecamatan	53
784	11.15.08	Tadu Raya	kecamatan	53
785	11.15.09	Tripa Makmur	kecamatan	53
786	11.15.10	Beutong Ateuh Banggalang	kecamatan	53
787	11.16.01	Manyak Payed	kecamatan	54
788	11.16.02	Bendahara	kecamatan	54
789	11.16.03	Karang Baru	kecamatan	54
790	11.16.04	Seruway	kecamatan	54
791	11.16.05	Kota Kualasinpang	kecamatan	54
792	11.16.06	Kejuruan Muda	kecamatan	54
793	11.16.07	Tamiang Hulu	kecamatan	54
794	11.16.08	Rantau	kecamatan	54
795	11.16.09	Banda Mulia	kecamatan	54
796	11.16.10	Bandar Pusaka	kecamatan	54
797	11.16.11	Tenggulun	kecamatan	54
798	11.16.12	Sekerak	kecamatan	54
799	11.17.01	Pintu Rime Gayo	kecamatan	55
800	11.17.02	Permata	kecamatan	55
801	11.17.03	Syiah Utama	kecamatan	55
802	11.17.04	Bandar	kecamatan	55
803	11.17.05	Bukit	kecamatan	55
804	11.17.06	Wih Pesam	kecamatan	55
805	11.17.07	Timang gajah	kecamatan	55
806	11.17.08	Bener Kelipah	kecamatan	55
807	11.17.09	Mesidah	kecamatan	55
808	11.17.10	Gajah Putih	kecamatan	55
809	11.18.01	Meureudu	kecamatan	56
810	11.18.02	Ulim	kecamatan	56
811	11.18.03	Jangka Buya	kecamatan	56
812	11.18.04	Bandar Dua	kecamatan	56
813	11.18.05	Meurah Dua	kecamatan	56
814	11.18.06	Bandar Baru	kecamatan	56
815	11.18.07	Panteraja	kecamatan	56
816	11.18.08	Trienggadeng	kecamatan	56
817	11.71.01	Baiturrahman	kecamatan	57
818	11.71.02	Kuta Alam	kecamatan	57
819	11.71.03	Meuraxa	kecamatan	57
820	11.71.04	Syiah Kuala	kecamatan	57
821	11.71.05	Lueng Bata	kecamatan	57
822	11.71.06	Kuta Raja	kecamatan	57
823	11.71.07	Banda Raya	kecamatan	57
824	11.71.08	Jaya Baru	kecamatan	57
825	11.71.09	Ulee Kareng	kecamatan	57
826	11.72.01	Sukakarya	kecamatan	58
827	11.72.02	Sukajaya	kecamatan	58
828	11.72.03	Sukamakmue	kecamatan	58
829	11.73.01	Muara Dua	kecamatan	59
830	11.73.02	Banda Sakti	kecamatan	59
831	11.73.03	Blang Mangat	kecamatan	59
832	11.73.04	Muara Satu	kecamatan	59
833	11.74.01	Langsa Timur	kecamatan	60
834	11.74.02	Langsa Barat	kecamatan	60
835	11.74.03	Langsa Kota	kecamatan	60
836	11.74.04	Langsa Lama	kecamatan	60
837	11.74.05	Langsa Baro	kecamatan	60
838	11.75.01	Simpang Kiri	kecamatan	61
839	11.75.02	Penanggalan	kecamatan	61
840	11.75.03	Rundeng	kecamatan	61
841	11.75.04	Sultan Daulat	kecamatan	61
842	11.75.05	Longkib	kecamatan	61
843	12.01.01	Barus	kecamatan	62
844	12.01.02	Sorkam	kecamatan	62
845	12.01.03	Pandan	kecamatan	62
846	12.01.04	Pinangsori	kecamatan	62
847	12.01.05	Manduamas	kecamatan	62
848	12.01.06	Kolang	kecamatan	62
849	12.01.07	Tapian Nauli	kecamatan	62
850	12.01.08	Sibabangun	kecamatan	62
851	12.01.09	Sosorgadong	kecamatan	62
852	12.01.10	Sorkam Barat	kecamatan	62
853	12.01.11	Sirandorung	kecamatan	62
854	12.01.12	Andam Dewi	kecamatan	62
855	12.01.13	Sitahuis	kecamatan	62
856	12.01.14	Tukka	kecamatan	62
857	12.01.15	Badiri	kecamatan	62
858	12.01.16	Pasaribu Tobing	kecamatan	62
859	12.01.17	Barus Utara	kecamatan	62
860	12.01.18	Suka Bangun	kecamatan	62
861	12.01.19	Lumut	kecamatan	62
862	12.01.20	Sarudik	kecamatan	62
863	12.02.01	Tarutung	kecamatan	63
864	12.02.02	Siatas Barita	kecamatan	63
865	12.02.03	Adiankoting	kecamatan	63
866	12.02.04	Sipoholon	kecamatan	63
867	12.02.05	Pahae Julu	kecamatan	63
868	12.02.06	Pahae Jae	kecamatan	63
869	12.02.07	Simangumban	kecamatan	63
870	12.02.08	Purbatua	kecamatan	63
871	12.02.09	Siborongborong	kecamatan	63
872	12.02.10	Pagaran	kecamatan	63
873	12.02.11	Parmonangan	kecamatan	63
874	12.02.12	Sipahutar	kecamatan	63
875	12.02.13	Pangaribuan	kecamatan	63
876	12.02.14	Garoga	kecamatan	63
877	12.02.15	Muara	kecamatan	63
878	12.03.01	Angkola Barat	kecamatan	64
879	12.03.02	Batang Toru	kecamatan	64
880	12.03.03	Angkola Timur	kecamatan	64
881	12.03.04	Sipirok	kecamatan	64
882	12.03.05	Saipar Dolok Hole	kecamatan	64
883	12.03.06	Angkola Selatan	kecamatan	64
884	12.03.07	Batang Angkola	kecamatan	64
885	12.03.14	Arse	kecamatan	64
886	12.03.20	Marancar	kecamatan	64
887	12.03.21	Sayur Matinggi	kecamatan	64
888	12.03.22	Aek Bilah	kecamatan	64
889	12.03.29	Muara Batang Toru	kecamatan	64
890	12.03.30	Tano Tombangan Angkola	kecamatan	64
891	12.03.31	Angkola Sangkunur	kecamatan	64
892	12.03.32	Angkola Muara Tais	kecamatan	64
893	12.04.05	Hiliduho	kecamatan	65
894	12.04.06	Gido	kecamatan	65
895	12.04.10	Idanogawo	kecamatan	65
896	12.04.11	Bawolato	kecamatan	65
897	12.04.20	Hiliserangkai	kecamatan	65
898	12.04.21	Botomuzoi	kecamatan	65
899	12.04.27	Ulugawo	kecamatan	65
900	12.04.28	Ma'u	kecamatan	65
901	12.04.29	Somolo-molo	kecamatan	65
902	12.04.35	Sogae'adu	kecamatan	65
903	12.05.01	Bahorok	kecamatan	66
904	12.05.02	Salapian	kecamatan	66
905	12.05.03	Kuala	kecamatan	66
906	12.05.04	Sei Bingai	kecamatan	66
907	12.05.05	Binjai	kecamatan	66
908	12.05.06	Selesai	kecamatan	66
909	12.05.07	Stabat	kecamatan	66
910	12.05.08	Wampu	kecamatan	66
911	12.05.09	Secanggang	kecamatan	66
912	12.05.10	Hinai	kecamatan	66
913	12.05.11	Tanjung Pura	kecamatan	66
914	12.05.12	Padang Tualang	kecamatan	66
915	12.05.13	Gebang	kecamatan	66
916	12.05.14	Babalan	kecamatan	66
917	12.05.15	Pangkalan Susu	kecamatan	66
918	12.05.16	Besitang	kecamatan	66
919	12.05.17	Sei Lepan	kecamatan	66
920	12.05.18	Berandan Barat	kecamatan	66
921	12.05.19	Batang Serangan	kecamatan	66
922	12.05.20	Sawit Seberang	kecamatan	66
923	12.05.21	Sirapit	kecamatan	66
924	12.05.22	Kutambaru	kecamatan	66
925	12.05.23	Pematang Jaya	kecamatan	66
926	12.06.01	Kabanjahe	kecamatan	67
927	12.06.02	Berastagi	kecamatan	67
928	12.06.03	Barusjahe	kecamatan	67
929	12.06.04	Tigapanah	kecamatan	67
930	12.06.05	Merek	kecamatan	67
931	12.06.06	Munte	kecamatan	67
932	12.06.07	Juhar	kecamatan	67
933	12.06.08	Tigabinanga	kecamatan	67
934	12.06.09	Laubaleng	kecamatan	67
935	12.06.10	Mardingding	kecamatan	67
936	12.06.11	Payung	kecamatan	67
937	12.06.12	Simpang Empat	kecamatan	67
938	12.06.13	Kutabuluh	kecamatan	67
939	12.06.14	Dolat Rayat	kecamatan	67
940	12.06.15	Merdeka	kecamatan	67
941	12.06.16	Naman Teran	kecamatan	67
942	12.06.17	Tiganderket	kecamatan	67
943	12.07.01	Gunung Meriah	kecamatan	68
944	12.07.02	Tanjung Morawa	kecamatan	68
945	12.07.03	Sibolangit	kecamatan	68
946	12.07.04	Kutalimbaru	kecamatan	68
947	12.07.05	Pancur Batu	kecamatan	68
948	12.07.06	Namo Rambe	kecamatan	68
949	12.07.07	Biru-Biru	kecamatan	68
950	12.07.08	Sinembah Tanjung Muda Hilir	kecamatan	68
951	12.07.09	Bangun Purba	kecamatan	68
952	12.07.19	Galang	kecamatan	68
953	12.07.20	Sinembah Tanjung Muda Hulu	kecamatan	68
954	12.07.21	Patumbak	kecamatan	68
955	12.07.22	Deli Tua	kecamatan	68
956	12.07.23	Sunggal	kecamatan	68
957	12.07.24	Hamparan Perak	kecamatan	68
958	12.07.25	Labuhan Deli	kecamatan	68
959	12.07.26	Percut Sei Tuan	kecamatan	68
960	12.07.27	Batang Kuis	kecamatan	68
961	12.07.28	Lubuk Pakam	kecamatan	68
962	12.07.31	Pagar Merbau	kecamatan	68
963	12.07.32	Pantai Labu	kecamatan	68
964	12.07.33	Beringin	kecamatan	68
965	12.08.01	Siantar	kecamatan	69
966	12.08.02	Gunung Malela	kecamatan	69
967	12.08.03	Gunung Maligas	kecamatan	69
968	12.08.04	Panei	kecamatan	69
969	12.08.05	Panombeian Panei	kecamatan	69
970	12.08.06	Jorlang Hataran	kecamatan	69
971	12.08.07	Raya Kahean	kecamatan	69
972	12.08.08	Bosar Maligas	kecamatan	69
973	12.08.09	Sidamanik	kecamatan	69
974	12.08.10	Pamatang Sidamanik	kecamatan	69
975	12.08.11	Tanah Jawa	kecamatan	69
976	12.08.12	Hatonduhan	kecamatan	69
977	12.08.13	Dolok Panribuan	kecamatan	69
978	12.08.14	Purba	kecamatan	69
979	12.08.15	Haranggaol Horisan	kecamatan	69
980	12.08.16	Girsang Sipangan Bolon	kecamatan	69
981	12.08.17	Dolok Batu Nanggar	kecamatan	69
982	12.08.18	Hutabayu Raja	kecamatan	69
983	12.08.19	Jawa Maraja Bah Jambi	kecamatan	69
984	12.08.20	Dolok Pardamean	kecamatan	69
985	12.08.21	Pematang Bandar	kecamatan	69
986	12.08.22	Bandar Huluan	kecamatan	69
987	12.08.23	Bandar	kecamatan	69
988	12.08.24	Bandar Masilam	kecamatan	69
989	12.08.25	Silimakuta	kecamatan	69
990	12.08.26	Dolok Silao	kecamatan	69
991	12.08.27	Silou Kahean	kecamatan	69
992	12.08.28	Tapian Dolok	kecamatan	69
993	12.08.29	Raya	kecamatan	69
994	12.08.30	Ujung Padang	kecamatan	69
995	12.08.31	Pamatang Silima Huta	kecamatan	69
996	12.08.32	Dolog Masagal	kecamatan	69
997	12.09.08	Meranti	kecamatan	70
998	12.09.09	Air Joman	kecamatan	70
999	12.09.10	Tanjung Balai	kecamatan	70
1000	12.09.11	Sei Kepayang	kecamatan	70
1001	12.09.12	Simpang Empat	kecamatan	70
1002	12.09.13	Air Batu	kecamatan	70
1003	12.09.14	Pulau Rakyat	kecamatan	70
1004	12.09.15	Bandar Pulau	kecamatan	70
1005	12.09.16	Buntu Pane	kecamatan	70
1006	12.09.17	Bandar Pasir Mandoge	kecamatan	70
1007	12.09.18	Aek Kuasan	kecamatan	70
1008	12.09.19	Kota Kisaran Barat	kecamatan	70
1009	12.09.20	Kota Kisaran Timur	kecamatan	70
1010	12.09.21	Aek Songsongan	kecamatan	70
1011	12.09.22	Rahuning	kecamatan	70
1012	12.09.23	Sei Dadap	kecamatan	70
1013	12.09.24	Sei Kepayang Barat	kecamatan	70
1014	12.09.25	Sei Kepayang Timur	kecamatan	70
1015	12.09.26	Tinggi Raja	kecamatan	70
1016	12.09.27	Setia Janji	kecamatan	70
1017	12.09.28	Silau Laut	kecamatan	70
1018	12.09.29	Rawang Panca Arga	kecamatan	70
1019	12.09.30	Pulo Bandring	kecamatan	70
1020	12.09.31	Teluk Dalam	kecamatan	70
1021	12.09.32	Aek Ledong	kecamatan	70
1022	12.10.01	Rantau Utara	kecamatan	71
1023	12.10.02	Rantau Selatan	kecamatan	71
1024	12.10.07	Bilah Barat	kecamatan	71
1025	12.10.08	Bilah Hilir	kecamatan	71
1026	12.10.09	Bilah Hulu	kecamatan	71
1027	12.10.14	Pangkatan	kecamatan	71
1028	12.10.18	Panai Tengah	kecamatan	71
1029	12.10.19	Panai Hilir	kecamatan	71
1030	12.10.20	Panai Hulu	kecamatan	71
1031	12.11.01	Sidikalang	kecamatan	72
1032	12.11.02	Sumbul	kecamatan	72
1033	12.11.03	Tigalingga	kecamatan	72
1034	12.11.04	Siempat Nempu	kecamatan	72
1035	12.11.05	Silima Pungga Pungga	kecamatan	72
1036	12.11.06	Tanah Pinem	kecamatan	72
1037	12.11.07	Siempat Nempu Hulu	kecamatan	72
1038	12.11.08	Siempat Nempu Hilir	kecamatan	72
1039	12.11.09	Pegagan Hilir	kecamatan	72
1040	12.11.10	Parbuluan	kecamatan	72
1041	12.11.11	Lae Parira	kecamatan	72
1042	12.11.12	Gunung Sitember	kecamatan	72
1043	12.11.13	Berampu	kecamatan	72
1044	12.11.14	Silahisabungan	kecamatan	72
1045	12.11.15	Sitinjo	kecamatan	72
1046	12.12.01	Balige	kecamatan	73
1047	12.12.02	Laguboti	kecamatan	73
1048	12.12.03	Silaen	kecamatan	73
1049	12.12.04	Habinsaran	kecamatan	73
1050	12.12.05	Pintu Pohan Meranti	kecamatan	73
1051	12.12.06	Borbor	kecamatan	73
1052	12.12.07	Porsea	kecamatan	73
1053	12.12.08	Ajibata	kecamatan	73
1054	12.12.09	Lumban Julu	kecamatan	73
1055	12.12.10	Uluan	kecamatan	73
1056	12.12.19	Sigumpar	kecamatan	73
1057	12.12.20	Siantar Narumonda	kecamatan	73
1058	12.12.21	Nassau	kecamatan	73
1059	12.12.22	Tampahan	kecamatan	73
1060	12.12.23	Bonatua Lunasi	kecamatan	73
1061	12.12.24	Parmaksian	kecamatan	73
1062	12.13.01	Panyabungan	kecamatan	74
1063	12.13.02	Panyabungan Utara	kecamatan	74
1064	12.13.03	Panyabungan Timur	kecamatan	74
1065	12.13.04	Panyabungan Selatan	kecamatan	74
1066	12.13.05	Panyabungan Barat	kecamatan	74
1067	12.13.06	Siabu	kecamatan	74
1068	12.13.07	Bukit Malintang	kecamatan	74
1069	12.13.08	Kotanopan	kecamatan	74
1070	12.13.09	Lembah Sorik Marapi	kecamatan	74
1071	12.13.10	Tambangan	kecamatan	74
1072	12.13.11	Ulu Pungkut	kecamatan	74
1073	12.13.12	Muara Sipongi	kecamatan	74
1074	12.13.13	Batang Natal	kecamatan	74
1075	12.13.14	Lingga Bayu	kecamatan	74
1076	12.13.15	Batahan	kecamatan	74
1077	12.13.16	Natal	kecamatan	74
1078	12.13.17	Muara Batang Gadis	kecamatan	74
1079	12.13.18	Ranto Baek	kecamatan	74
1080	12.13.19	Huta Bargot	kecamatan	74
1081	12.13.20	Puncak Sorik Marapi	kecamatan	74
1082	12.13.21	Pakantan	kecamatan	74
1083	12.13.22	Sinunukan	kecamatan	74
1084	12.13.23	Naga Juang	kecamatan	74
1085	12.14.01	Lolomatua	kecamatan	75
1086	12.14.02	Gomo	kecamatan	75
1087	12.14.03	Lahusa	kecamatan	75
1088	12.14.04	Hibala	kecamatan	75
1089	12.14.05	Pulau-Pulau Batu	kecamatan	75
1090	12.14.06	Teluk Dalam	kecamatan	75
1091	12.14.07	Amandraya	kecamatan	75
1092	12.14.08	Lolowau	kecamatan	75
1093	12.14.09	Susua	kecamatan	75
1094	12.14.10	Maniamolo	kecamatan	75
1095	12.14.11	Hilimegai	kecamatan	75
1096	12.14.12	Toma	kecamatan	75
1097	12.14.13	Mazino	kecamatan	75
1098	12.14.14	Umbunasi	kecamatan	75
1099	12.14.15	Aramo	kecamatan	75
1100	12.14.16	Pulau-Pulau Batu Timur	kecamatan	75
1101	12.14.17	Mazo	kecamatan	75
1102	12.14.18	Fanayama	kecamatan	75
1103	12.14.19	Ulunoyo	kecamatan	75
1104	12.14.20	Huruna	kecamatan	75
1105	12.14.21	O'o'u	kecamatan	75
1106	12.14.22	Onohazumba	kecamatan	75
1107	12.14.23	Hilisalawa'ahe	kecamatan	75
1108	12.14.24	Ulususua	kecamatan	75
1109	12.14.25	Sidua'ori	kecamatan	75
1110	12.14.26	Somambawa	kecamatan	75
1111	12.14.27	Boronadu	kecamatan	75
1112	12.14.28	Simuk	kecamatan	75
1113	12.14.29	Pulau-Pulau Batu Barat	kecamatan	75
1114	12.14.30	Pulau-Pulau Batu Utara	kecamatan	75
1115	12.14.31	Tanah Masa	kecamatan	75
1116	12.14.32	Luahagundre Maniamolo	kecamatan	75
1117	12.14.33	Onolalu	kecamatan	75
1118	12.14.34	Ulu Idanotae	kecamatan	75
1119	12.14.35	Idanotae	kecamatan	75
1120	12.15.01	Sitelu Tali Urang Jehe	kecamatan	76
1121	12.15.02	Kerajaan	kecamatan	76
1122	12.15.03	Salak	kecamatan	76
1123	12.15.04	Sitelu Tali Urang Julu	kecamatan	76
1124	12.15.05	Pergetteng Getteng Sengkut	kecamatan	76
1125	12.15.06	Pagindar	kecamatan	76
1126	12.15.07	Tinada	kecamatan	76
1127	12.15.08	Siempat Rube	kecamatan	76
1128	12.16.01	Parlilitan	kecamatan	77
1129	12.16.02	Pollung	kecamatan	77
1130	12.16.03	Baktiraja	kecamatan	77
1131	12.16.04	Paranginan	kecamatan	77
1132	12.16.05	Lintong Nihuta	kecamatan	77
1133	12.16.06	Dolok Sanggul	kecamatan	77
1134	12.16.07	Sijamapolang	kecamatan	77
1135	12.16.08	Onan Ganjang	kecamatan	77
1136	12.16.09	Pakkat	kecamatan	77
1137	12.16.10	Tarabintang	kecamatan	77
1138	12.17.01	Simanindo	kecamatan	78
1139	12.17.02	Onan Runggu	kecamatan	78
1140	12.17.03	Nainggolan	kecamatan	78
1141	12.17.04	Palipi	kecamatan	78
1142	12.17.05	Harian	kecamatan	78
1143	12.17.06	Sianjar Mula Mula	kecamatan	78
1144	12.17.07	Ronggur Nihuta	kecamatan	78
1145	12.17.08	Pangururan	kecamatan	78
1146	12.17.09	Sitio-tio	kecamatan	78
1147	12.18.01	Pantai Cermin	kecamatan	79
1148	12.18.02	Perbaungan	kecamatan	79
1149	12.18.03	Teluk Mengkudu	kecamatan	79
1150	12.18.04	Sei Rampah	kecamatan	79
1151	12.18.05	Tanjung Beringin	kecamatan	79
1152	12.18.06	Bandar Khalipah	kecamatan	79
1153	12.18.07	Dolok Merawan	kecamatan	79
1154	12.18.08	Sipispis	kecamatan	79
1155	12.18.09	Dolok Masihul	kecamatan	79
1156	12.18.10	Kotarih	kecamatan	79
1157	12.18.11	Silinda	kecamatan	79
1158	12.18.12	Serba Jadi	kecamatan	79
1159	12.18.13	Tebing Tinggi	kecamatan	79
1160	12.18.14	Pegajahan	kecamatan	79
1161	12.18.15	Sei Bamban	kecamatan	79
1162	12.18.16	Tebing Syahbandar	kecamatan	79
1163	12.18.17	Bintang Bayu	kecamatan	79
1164	12.19.01	Medang Deras	kecamatan	80
1165	12.19.02	Sei Suka	kecamatan	80
1166	12.19.03	Air Putih	kecamatan	80
1167	12.19.04	Lima Puluh	kecamatan	80
1168	12.19.05	Talawi	kecamatan	80
1169	12.19.06	Tanjung Tiram	kecamatan	80
1170	12.19.07	Sei Balai	kecamatan	80
1171	12.19.08	Laut Tador	kecamatan	80
1172	12.19.09	Lima Puluh Pesisir	kecamatan	80
1173	12.19.10	Datuk Lima Puluh	kecamatan	80
1174	12.19.11	Datuk Tanah Datar	kecamatan	80
1175	12.19.12	Nibung Hangus	kecamatan	80
1176	12.20.01	Dolok Sigompulon	kecamatan	81
1177	12.20.02	Dolok	kecamatan	81
1178	12.20.03	Halongonan	kecamatan	81
1179	12.20.04	Padang Bolak	kecamatan	81
1180	12.20.05	Padang Bolak Julu	kecamatan	81
1181	12.20.06	Portibi	kecamatan	81
1182	12.20.07	Batang Onang	kecamatan	81
1183	12.20.08	Simangambat	kecamatan	81
1184	12.20.09	Hulu Sihapas	kecamatan	81
1185	12.20.10	Padang Bolak Tenggara	kecamatan	81
1186	12.20.11	Halongonan Timur	kecamatan	81
1187	12.20.12	Ujung Batu	kecamatan	81
1188	12.21.01	Sosopan	kecamatan	82
1189	12.21.02	Barumun Tengah	kecamatan	82
1190	12.21.03	Huristak	kecamatan	82
1191	12.21.04	Lubuk Barumun	kecamatan	82
1192	12.21.05	Hutaraja Tinggi	kecamatan	82
1193	12.21.06	Ulu Barumun	kecamatan	82
1194	12.21.07	Barumun	kecamatan	82
1195	12.21.08	Sosa	kecamatan	82
1196	12.21.09	Batang Lubu Sutam	kecamatan	82
1197	12.21.10	Barumun Selatan	kecamatan	82
1198	12.21.11	Aek Nabara Barumun	kecamatan	82
1199	12.21.12	Sihapas Barumun	kecamatan	82
1200	12.21.13	Barumun Baru	kecamatan	82
1201	12.21.14	Ulu Sosa	kecamatan	82
1202	12.21.15	Sosa Julu	kecamatan	82
1203	12.21.16	Barumun Barat	kecamatan	82
1204	12.21.17	Sosa Timur	kecamatan	82
1205	12.22.01	Kotapinang	kecamatan	83
1206	12.22.02	Kampung Rakyat	kecamatan	83
1207	12.22.03	Torgamba	kecamatan	83
1208	12.22.04	Sungai Kanan	kecamatan	83
1209	12.22.05	Silangkitang	kecamatan	83
1210	12.23.01	Kualuh Hulu	kecamatan	84
1211	12.23.02	Kualuh Leidong	kecamatan	84
1212	12.23.03	Kualuh Hilir	kecamatan	84
1213	12.23.04	Aek Kuo	kecamatan	84
1214	12.23.05	Marbau	kecamatan	84
1215	12.23.06	Na IX-X	kecamatan	84
1216	12.23.07	Aek Natas	kecamatan	84
1217	12.23.08	Kualuh Selatan	kecamatan	84
1218	12.24.01	Lotu	kecamatan	85
1219	12.24.02	Sawo	kecamatan	85
1220	12.24.03	Tuhemberua	kecamatan	85
1221	12.24.04	Sitolu Ori	kecamatan	85
1222	12.24.05	Namohalu Esiwa	kecamatan	85
1223	12.24.06	Alasa Talumuzoi	kecamatan	85
1224	12.24.07	Alasa	kecamatan	85
1225	12.24.08	Tugala Oyo	kecamatan	85
1226	12.24.09	Afulu	kecamatan	85
1227	12.24.10	Lahewa	kecamatan	85
1228	12.24.11	Lahewa Timur	kecamatan	85
1229	12.25.01	Lahomi	kecamatan	86
1230	12.25.02	Sirombu	kecamatan	86
1231	12.25.03	Mandrehe Barat	kecamatan	86
1232	12.25.04	Moro'o	kecamatan	86
1233	12.25.05	Mandrehe	kecamatan	86
1234	12.25.06	Mandrehe Utara	kecamatan	86
1235	12.25.07	Lolofitu Moi	kecamatan	86
1236	12.25.08	Ulu Moro'o	kecamatan	86
1237	12.71.01	Medan Kota	kecamatan	87
1238	12.71.02	Medan Sunggal	kecamatan	87
1239	12.71.03	Medan Helvetia	kecamatan	87
1240	12.71.04	Medan Denai	kecamatan	87
1241	12.71.05	Medan Barat	kecamatan	87
1242	12.71.06	Medan Deli	kecamatan	87
1243	12.71.07	Medan Tuntungan	kecamatan	87
1244	12.71.08	Medan Belawan	kecamatan	87
1245	12.71.09	Medan Amplas	kecamatan	87
1246	12.71.10	Medan Area	kecamatan	87
1247	12.71.11	Medan Johor	kecamatan	87
1248	12.71.12	Medan Marelan	kecamatan	87
1249	12.71.13	Medan Labuhan	kecamatan	87
1250	12.71.14	Medan Tembung	kecamatan	87
1251	12.71.15	Medan Maimun	kecamatan	87
1252	12.71.16	Medan Polonia	kecamatan	87
1253	12.71.17	Medan Baru	kecamatan	87
1254	12.71.18	Medan Perjuangan	kecamatan	87
1255	12.71.19	Medan Petisah	kecamatan	87
1256	12.71.20	Medan Timur	kecamatan	87
1257	12.71.21	Medan Selayang	kecamatan	87
1258	12.72.01	Siantar Timur	kecamatan	88
1259	12.72.02	Siantar Barat	kecamatan	88
1260	12.72.03	Siantar Utara	kecamatan	88
1261	12.72.04	Siantar Selatan	kecamatan	88
1262	12.72.05	Siantar Marihat	kecamatan	88
1263	12.72.06	Siantar Martoba	kecamatan	88
1264	12.72.07	Siantar Sitalasari	kecamatan	88
1265	12.72.08	Siantar Marimbun	kecamatan	88
1266	12.73.01	Sibolga Utara	kecamatan	89
1267	12.73.02	Sibolga Kota	kecamatan	89
1268	12.73.03	Sibolga Selatan	kecamatan	89
1269	12.73.04	Sibolga Sambas	kecamatan	89
1270	12.74.01	Tanjungbalai Selatan	kecamatan	90
1271	12.74.02	Tanjungbalai Utara	kecamatan	90
1272	12.74.03	Sei Tualang Raso	kecamatan	90
1273	12.74.04	Teluk Nibung	kecamatan	90
1274	12.74.05	Datuk Bandar	kecamatan	90
1275	12.74.06	Datuk Bandar Timur	kecamatan	90
1276	12.75.01	Binjai Utara	kecamatan	91
1277	12.75.02	Binjai Kota	kecamatan	91
1278	12.75.03	Binjai Barat	kecamatan	91
1279	12.75.04	Binjai Timur	kecamatan	91
1280	12.75.05	Binjai Selatan	kecamatan	91
1281	12.76.01	Padang Hulu	kecamatan	92
1282	12.76.02	Rambutan	kecamatan	92
1283	12.76.03	Padang Hilir	kecamatan	92
1284	12.76.04	Bajenis	kecamatan	92
1285	12.76.05	Tebing Tinggi Kota	kecamatan	92
1286	12.77.01	Padangsidimpuan Utara	kecamatan	93
1287	12.77.02	Padangsidimpuan Selatan	kecamatan	93
1288	12.77.03	Padangsidimpuan Batunadua	kecamatan	93
1289	12.77.04	Padangsidimpuan Hutaimbaru	kecamatan	93
1290	12.77.05	Padangsidimpuan Tenggara	kecamatan	93
1291	12.77.06	Padangsidimpuan Angkola Julu	kecamatan	93
1292	12.78.01	Gunungsitoli	kecamatan	94
1293	12.78.02	Gunungsitoli Selatan	kecamatan	94
1294	12.78.03	Gunungsitoli Utara	kecamatan	94
1295	12.78.04	Gunungsitoli Idanoi	kecamatan	94
1296	12.78.05	Gunungsitoli Alo'oa	kecamatan	94
1297	12.78.06	Gunungsitoli Barat	kecamatan	94
1298	13.01.01	Pancung Soal	kecamatan	95
1299	13.01.02	Ranah Pesisir	kecamatan	95
1300	13.01.03	Lengayang	kecamatan	95
1301	13.01.04	Batang Kapas	kecamatan	95
1302	13.01.05	IV Jurai	kecamatan	95
1303	13.01.06	Bayang	kecamatan	95
1304	13.01.07	Koto XI Tarusan	kecamatan	95
1305	13.01.08	Sutera	kecamatan	95
1306	13.01.09	Linggo Sari Baganti	kecamatan	95
1307	13.01.10	Lunang	kecamatan	95
1308	13.01.11	Basa Ampek Balai Tapan	kecamatan	95
1309	13.01.12	IV Nagari Bayang Utara	kecamatan	95
1310	13.01.13	Airpura	kecamatan	95
1311	13.01.14	Ranah Ampek Hulu Tapan	kecamatan	95
1312	13.01.15	Silaut	kecamatan	95
1313	13.02.03	Pantai Cermin	kecamatan	96
1314	13.02.04	Lembah Gumanti	kecamatan	96
1315	13.02.05	Payung Sekaki	kecamatan	96
1316	13.02.06	Lembang Jaya	kecamatan	96
1317	13.02.07	Gunung Talang	kecamatan	96
1318	13.02.08	Bukit Sundi	kecamatan	96
1319	13.02.09	IX Koto Sungai Lasi	kecamatan	96
1320	13.02.10	Kubung	kecamatan	96
1321	13.02.11	X Koto Singkarak	kecamatan	96
1322	13.02.12	X Koto Diatas	kecamatan	96
1323	13.02.13	Junjung Sirih	kecamatan	96
1324	13.02.17	Hiliran Gumanti	kecamatan	96
1325	13.02.18	Tigo Lurah	kecamatan	96
1326	13.02.19	Danau Kembar	kecamatan	96
1327	13.03.03	Tanjung Gadang	kecamatan	97
1328	13.03.04	Sijunjung	kecamatan	97
1329	13.03.05	IV Nagari	kecamatan	97
1330	13.03.06	Kamang Baru	kecamatan	97
1331	13.03.07	Lubuk Tarok	kecamatan	97
1332	13.03.08	Koto VII	kecamatan	97
1333	13.03.09	Sumpur Kudus	kecamatan	97
1334	13.03.10	Kupitan	kecamatan	97
1335	13.04.01	X Koto	kecamatan	98
1336	13.04.02	Batipuh	kecamatan	98
1337	13.04.03	Rambatan	kecamatan	98
1338	13.04.04	Lima Kaum	kecamatan	98
1339	13.04.05	Tanjung Emas	kecamatan	98
1340	13.04.06	Lintau Buo	kecamatan	98
1341	13.04.07	Sungayang	kecamatan	98
1342	13.04.08	Sungai Tarab	kecamatan	98
1343	13.04.09	Pariangan	kecamatan	98
1344	13.04.10	Salimpaung	kecamatan	98
1345	13.04.11	Padang Ganting	kecamatan	98
1346	13.04.12	Tanjuang Baru	kecamatan	98
1347	13.04.13	Lintau Buo Utara	kecamatan	98
1348	13.04.14	Batipuah Selatan	kecamatan	98
1349	13.05.01	Lubuak Aluang	kecamatan	99
1350	13.05.02	Batang Anai	kecamatan	99
1351	13.05.03	Nan Sabaris	kecamatan	99
1352	13.05.04	2 x 11 Anam Lingkuang	kecamatan	99
1353	13.05.05	VII Koto	kecamatan	99
1354	13.05.06	V Koto	kecamatan	99
1355	13.05.07	Sungai Garinggiang	kecamatan	99
1356	13.05.08	Sungai Limau	kecamatan	99
1357	13.05.09	IV Koto Aua Malintang	kecamatan	99
1358	13.05.10	Ulakan Tapakih	kecamatan	99
1359	13.05.11	Sintuak Toboh Gadang	kecamatan	99
1360	13.05.12	VII Koto Padang Sago	kecamatan	99
1361	13.05.13	Batang Gasan	kecamatan	99
1362	13.05.14	V Koto Timur	kecamatan	99
1363	13.05.15	2 x 11 Kayu Tanam	kecamatan	99
1364	13.05.16	Koto Patamuan	kecamatan	99
1365	13.05.17	Anam Lingkuang	kecamatan	99
1366	13.06.01	Tanjung Mutiara	kecamatan	100
1367	13.06.02	Lubuk Basung	kecamatan	100
1368	13.06.03	Tanjung Raya	kecamatan	100
1369	13.06.04	Matur	kecamatan	100
1370	13.06.05	IV Koto	kecamatan	100
1371	13.06.06	Banuhampu	kecamatan	100
1372	13.06.07	Ampek Angkek	kecamatan	100
1373	13.06.08	Baso	kecamatan	100
1374	13.06.09	Tilatang Kamang	kecamatan	100
1375	13.06.10	Palupuh	kecamatan	100
1376	13.06.11	Palembayan	kecamatan	100
1377	13.06.12	Sungai Pua	kecamatan	100
1378	13.06.13	Ampek Nagari	kecamatan	100
1379	13.06.14	Candung	kecamatan	100
1380	13.06.15	Kamang Magek	kecamatan	100
1381	13.06.16	Malalak	kecamatan	100
1382	13.07.01	Suliki	kecamatan	101
1383	13.07.02	Guguak	kecamatan	101
1384	13.07.03	Payakumbuh	kecamatan	101
1385	13.07.04	Luak	kecamatan	101
1386	13.07.05	Harau	kecamatan	101
1387	13.07.06	Pangkalan Koto Baru	kecamatan	101
1388	13.07.07	Kapur IX	kecamatan	101
1389	13.07.08	Gunuang Omeh	kecamatan	101
1390	13.07.09	Lareh Sago Halaban	kecamatan	101
1391	13.07.10	Situjuah Limo Nagari	kecamatan	101
1392	13.07.11	Mungka	kecamatan	101
1393	13.07.12	Bukik Barisan	kecamatan	101
1394	13.07.13	Akabiluru	kecamatan	101
1395	13.08.04	Bonjol	kecamatan	102
1396	13.08.05	Lubuk Sikaping	kecamatan	102
1397	13.08.07	Panti	kecamatan	102
1398	13.08.08	Mapat Tunggul	kecamatan	102
1399	13.08.12	Duo Koto	kecamatan	102
1400	13.08.13	Tigo Nagari	kecamatan	102
1401	13.08.14	Rao	kecamatan	102
1402	13.08.15	Mapat Tunggul Selatan	kecamatan	102
1403	13.08.16	Simpang Alahan Mati	kecamatan	102
1404	13.08.17	Padang Gelugur	kecamatan	102
1405	13.08.18	Rao Utara	kecamatan	102
1406	13.08.19	Rao Selatan	kecamatan	102
1407	13.09.01	Pagai Utara	kecamatan	103
1408	13.09.02	Sipora Selatan	kecamatan	103
1409	13.09.03	Siberut Selatan	kecamatan	103
1410	13.09.04	Siberut Utara	kecamatan	103
1411	13.09.05	Siberut Barat	kecamatan	103
1412	13.09.06	Siberut Barat Daya	kecamatan	103
1413	13.09.07	Siberut Tengah	kecamatan	103
1414	13.09.08	Sipora Utara	kecamatan	103
1415	13.09.09	Sikakap	kecamatan	103
1416	13.09.10	Pagai Selatan	kecamatan	103
1417	13.10.01	Koto Baru	kecamatan	104
1418	13.10.02	Pulau Punjung	kecamatan	104
1419	13.10.03	Sungai Rumbai	kecamatan	104
1420	13.10.04	Sitiung	kecamatan	104
1421	13.10.05	Sembilan Koto	kecamatan	104
1422	13.10.06	Timpeh	kecamatan	104
1423	13.10.07	Koto Salak	kecamatan	104
1424	13.10.08	Tiumang	kecamatan	104
1425	13.10.09	Padang Laweh	kecamatan	104
1426	13.10.10	Asam Jujuhan	kecamatan	104
1427	13.10.11	Koto Besar	kecamatan	104
1428	13.11.01	Sangir	kecamatan	105
1429	13.11.02	Sungai Pagu	kecamatan	105
1430	13.11.03	Koto Parik Gadang Diateh	kecamatan	105
1431	13.11.04	Sangir Jujuan	kecamatan	105
1432	13.11.05	Sangir Batang Hari	kecamatan	105
1433	13.11.06	Pauh Duo	kecamatan	105
1434	13.11.07	Sangir Balai Janggo	kecamatan	105
1435	13.12.01	Sungai Beremas	kecamatan	106
1436	13.12.02	Lembah Melintang	kecamatan	106
1437	13.12.03	Pasaman	kecamatan	106
1438	13.12.04	Talamau	kecamatan	106
1439	13.12.05	Kinali	kecamatan	106
1440	13.12.06	Gunung Tuleh	kecamatan	106
1441	13.12.07	Ranah Batahan	kecamatan	106
1442	13.12.08	Koto Balingka	kecamatan	106
1443	13.12.09	Sungai Aur	kecamatan	106
1444	13.12.10	Luhak Nan Duo	kecamatan	106
1445	13.12.11	Sasak Ranah Pasisie	kecamatan	106
1446	13.71.01	Padang Selatan	kecamatan	107
1447	13.71.02	Padang Timur	kecamatan	107
1448	13.71.03	Padang Barat	kecamatan	107
1449	13.71.04	Padang Utara	kecamatan	107
1450	13.71.05	Bungus Teluk Kabung	kecamatan	107
1451	13.71.06	Lubuk Begalung	kecamatan	107
1452	13.71.07	Lubuk Kilangan	kecamatan	107
1453	13.71.08	Pauh	kecamatan	107
1454	13.71.09	Kuranji	kecamatan	107
1455	13.71.10	Nanggalo	kecamatan	107
1456	13.71.11	Koto Tangah	kecamatan	107
1457	13.72.01	Lubuk Sikarah	kecamatan	108
1458	13.72.02	Tanjung Harapan	kecamatan	108
1459	13.73.01	Lembah Segar	kecamatan	109
1460	13.73.02	Barangin	kecamatan	109
1461	13.73.03	Silungkang	kecamatan	109
1462	13.73.04	Talawi	kecamatan	109
1463	13.74.01	Padang Panjang Timur	kecamatan	110
1464	13.74.02	Padang Panjang Barat	kecamatan	110
1465	13.75.01	Guguak Panjang	kecamatan	111
1466	13.75.02	Mandiangin Koto Selayan	kecamatan	111
1467	13.75.03	Aur Birugo Tigo Baleh	kecamatan	111
1468	13.76.01	Payakumbuh Barat	kecamatan	112
1469	13.76.02	Payakumbuh Utara	kecamatan	112
1470	13.76.03	Payakumbuh Timur	kecamatan	112
1471	13.76.04	Lamposi Tigo Nagori	kecamatan	112
1472	13.76.05	Payakumbuh Selatan	kecamatan	112
1473	13.77.01	Pariaman Tengah	kecamatan	113
1474	13.77.02	Pariaman Utara	kecamatan	113
1590	14.08.02	Sungai Apit	kecamatan	121
1475	13.77.03	Pariaman Selatan	kecamatan	113
1476	13.77.04	Pariaman Timur	kecamatan	113
1477	14.01.01	Bangkinang Kota	kecamatan	114
1478	14.01.02	Kampar	kecamatan	114
1479	14.01.03	Tambang	kecamatan	114
1480	14.01.04	XIII Koto Kampar	kecamatan	114
1481	14.01.05	Kuok	kecamatan	114
1482	14.01.06	Siak Hulu	kecamatan	114
1483	14.01.07	Kampar Kiri	kecamatan	114
1484	14.01.08	Kampar Kiri Hilir	kecamatan	114
1485	14.01.09	Kampar Kiri Hulu	kecamatan	114
1486	14.01.10	Tapung	kecamatan	114
1487	14.01.11	Tapung Hilir	kecamatan	114
1488	14.01.12	Tapung Hulu	kecamatan	114
1489	14.01.13	Salo	kecamatan	114
1490	14.01.14	Rumbio Jaya	kecamatan	114
1491	14.01.15	Bangkinang	kecamatan	114
1492	14.01.16	Perhentian Raja	kecamatan	114
1493	14.01.17	Kampa	kecamatan	114
1494	14.01.18	Kampar Utara	kecamatan	114
1495	14.01.19	Kampar Kiri Tengah	kecamatan	114
1496	14.01.20	Gunung Sahilan	kecamatan	114
1497	14.01.21	Koto Kampar Hulu	kecamatan	114
1498	14.02.01	Rengat	kecamatan	115
1499	14.02.02	Rengat Barat	kecamatan	115
1500	14.02.03	Kelayang	kecamatan	115
1501	14.02.04	Pasir Penyu	kecamatan	115
1502	14.02.05	Peranap	kecamatan	115
1503	14.02.06	Seberida	kecamatan	115
1504	14.02.07	Batang Cenaku	kecamatan	115
1505	14.02.08	Batang Gansal	kecamatan	115
1506	14.02.09	Lirik	kecamatan	115
1507	14.02.10	Kuala Cenaku	kecamatan	115
1508	14.02.11	Sungai Lala	kecamatan	115
1509	14.02.12	Lubuk Batu Jaya	kecamatan	115
1510	14.02.13	Rakit Kulim	kecamatan	115
1511	14.02.14	Batang Peranap	kecamatan	115
1512	14.03.01	Bengkalis	kecamatan	116
1513	14.03.02	Bantan	kecamatan	116
1514	14.03.03	Bukit Batu	kecamatan	116
1515	14.03.09	Mandau	kecamatan	116
1516	14.03.10	Rupat	kecamatan	116
1517	14.03.11	Rupat Utara	kecamatan	116
1518	14.03.12	Siak Kecil	kecamatan	116
1519	14.03.13	Pinggir	kecamatan	116
1520	14.03.14	Bandar Laksamana	kecamatan	116
1521	14.03.15	Talang Muandau	kecamatan	116
1522	14.03.16	Bathin Solapan	kecamatan	116
1523	14.04.01	Reteh	kecamatan	117
1524	14.04.02	Enok	kecamatan	117
1525	14.04.03	Kuala Indragiri	kecamatan	117
1526	14.04.04	Tembilahan	kecamatan	117
1527	14.04.05	Tempuling	kecamatan	117
1528	14.04.06	Gaung Anak Serka	kecamatan	117
1529	14.04.07	Mandah	kecamatan	117
1530	14.04.08	Kateman	kecamatan	117
1531	14.04.09	Keritang	kecamatan	117
1532	14.04.10	Tanah Merah	kecamatan	117
1533	14.04.11	Batang Tuaka	kecamatan	117
1534	14.04.12	Gaung	kecamatan	117
1535	14.04.13	Tembilahan Hulu	kecamatan	117
1536	14.04.14	Kemuning	kecamatan	117
1537	14.04.15	Pelangiran	kecamatan	117
1538	14.04.16	Teluk Belengkong	kecamatan	117
1539	14.04.17	Pulau Burung	kecamatan	117
1540	14.04.18	Concong	kecamatan	117
1541	14.04.19	Kempas	kecamatan	117
1542	14.04.20	Sungai Batang	kecamatan	117
1543	14.05.01	Ukui	kecamatan	118
1544	14.05.02	Pangkalan Kerinci	kecamatan	118
1545	14.05.03	Pangkalan Kuras	kecamatan	118
1546	14.05.04	Pangkalan Lesung	kecamatan	118
1547	14.05.05	Langgam	kecamatan	118
1548	14.05.06	Pelalawan	kecamatan	118
1549	14.05.07	Kerumutan	kecamatan	118
1550	14.05.08	Bunut	kecamatan	118
1551	14.05.09	Teluk Meranti	kecamatan	118
1552	14.05.10	Kuala Kampar	kecamatan	118
1553	14.05.11	Bandar Sei Kijang	kecamatan	118
1554	14.05.12	Bandar Petalangan	kecamatan	118
1555	14.06.01	Ujung Batu	kecamatan	119
1556	14.06.02	Rokan IV Koto	kecamatan	119
1557	14.06.03	Rambah	kecamatan	119
1558	14.06.04	Tambusai	kecamatan	119
1559	14.06.05	Kepenuhan	kecamatan	119
1560	14.06.06	Kunto Darussalam	kecamatan	119
1561	14.06.07	Rambah Samo	kecamatan	119
1562	14.06.08	Rambah Hilir	kecamatan	119
1563	14.06.09	Tambusai Utara	kecamatan	119
1564	14.06.10	Bangun Purba	kecamatan	119
1565	14.06.11	Tandun	kecamatan	119
1566	14.06.12	Kabun	kecamatan	119
1567	14.06.13	Bonai Darussalam	kecamatan	119
1568	14.06.14	Pagaran Tapah Darussalam	kecamatan	119
1569	14.06.15	Kepenuhan Hulu	kecamatan	119
1570	14.06.16	Pendalian IV Koto	kecamatan	119
1571	14.07.01	Kubu	kecamatan	120
1572	14.07.02	Bangko	kecamatan	120
1573	14.07.03	Tanah Putih	kecamatan	120
1574	14.07.04	Rimba Melintang	kecamatan	120
1575	14.07.05	Bagansinembah	kecamatan	120
1576	14.07.06	Pasir Limau Kapas	kecamatan	120
1577	14.07.07	Sinaboi	kecamatan	120
1578	14.07.08	Pujud	kecamatan	120
1579	14.07.09	Tanah Putih Tanjung Melawan	kecamatan	120
1580	14.07.10	Bangko Pusako	kecamatan	120
1581	14.07.11	Simpang Kanan	kecamatan	120
1582	14.07.12	Batu Hampar	kecamatan	120
1583	14.07.13	Rantau Kopar	kecamatan	120
1584	14.07.14	Pekaitan	kecamatan	120
1585	14.07.15	Kubu Babussalam	kecamatan	120
1586	14.07.16	Tanjung Medan	kecamatan	120
1587	14.07.17	Bagan Sinembah Raya	kecamatan	120
1588	14.07.18	Balai Jaya	kecamatan	120
1589	14.08.01	Siak	kecamatan	121
1591	14.08.03	Minas	kecamatan	121
1592	14.08.04	Tualang	kecamatan	121
1593	14.08.05	Sungai Mandau	kecamatan	121
1594	14.08.06	Dayun	kecamatan	121
1595	14.08.07	Kerinci Kanan	kecamatan	121
1596	14.08.08	Bunga Raya	kecamatan	121
1597	14.08.09	Koto Gasib	kecamatan	121
1598	14.08.10	Kandis	kecamatan	121
1599	14.08.11	Lubuk Dalam	kecamatan	121
1600	14.08.12	Sabak Auh	kecamatan	121
1601	14.08.13	Mempura	kecamatan	121
1602	14.08.14	Pusako	kecamatan	121
1603	14.09.01	Kuantan Mudik	kecamatan	122
1604	14.09.02	Kuantan Tengah	kecamatan	122
1605	14.09.03	Singingi	kecamatan	122
1606	14.09.04	Kuantan Hilir	kecamatan	122
1607	14.09.05	Cerenti	kecamatan	122
1608	14.09.06	Benai	kecamatan	122
1609	14.09.07	Gunungtoar	kecamatan	122
1610	14.09.08	Singingi Hilir	kecamatan	122
1611	14.09.09	Pangean	kecamatan	122
1612	14.09.10	Logas Tanah Darat	kecamatan	122
1613	14.09.11	Inuman	kecamatan	122
1614	14.09.12	Hulu Kuantan	kecamatan	122
1615	14.09.13	Kuantan Hilir Seberang	kecamatan	122
1616	14.09.14	Sentajo Raya	kecamatan	122
1617	14.09.15	Pucuk Rantau	kecamatan	122
1618	14.10.01	Tebing Tinggi	kecamatan	123
1619	14.10.02	Rangsang Barat	kecamatan	123
1620	14.10.03	Rangsang	kecamatan	123
1621	14.10.04	Tebing Tinggi Barat	kecamatan	123
1622	14.10.05	Merbau	kecamatan	123
1623	14.10.06	Pulaumerbau	kecamatan	123
1624	14.10.07	Tebing Tinggi Timur	kecamatan	123
1625	14.10.08	Tasik Putri Puyu	kecamatan	123
1626	14.10.09	Rangsang Pesisir	kecamatan	123
1627	14.71.01	Sukajadi	kecamatan	124
1628	14.71.02	Pekanbaru Kota	kecamatan	124
1629	14.71.03	Sail	kecamatan	124
1630	14.71.04	Limapuluh	kecamatan	124
1631	14.71.05	Senapelan	kecamatan	124
1632	14.71.06	Rumbai Barat	kecamatan	124
1633	14.71.07	Bukit Raya	kecamatan	124
1634	14.71.08	Binawidya	kecamatan	124
1635	14.71.09	Marpoyan Damai	kecamatan	124
1636	14.71.10	Tenayan Raya	kecamatan	124
1637	14.71.11	Payung Sekaki	kecamatan	124
1638	14.71.12	Rumbai	kecamatan	124
1639	14.71.13	Tuahmadani	kecamatan	124
1640	14.71.14	Kulim	kecamatan	124
1641	14.71.15	Rumbai Timur	kecamatan	124
1642	14.72.01	Dumai Barat	kecamatan	125
1643	14.72.02	Dumai Timur	kecamatan	125
1644	14.72.03	Bukit Kapur	kecamatan	125
1645	14.72.04	Sungai Sembilan	kecamatan	125
1646	14.72.05	Medang Kampai	kecamatan	125
1647	14.72.06	Dumai Kota	kecamatan	125
1648	14.72.07	Dumai Selatan	kecamatan	125
1649	15.01.01	Gunung Raya	kecamatan	126
1650	15.01.02	Danau Kerinci	kecamatan	126
1651	15.01.04	Sitinjau Laut	kecamatan	126
1652	15.01.05	Air Hangat	kecamatan	126
1653	15.01.06	Gunung Kerinci	kecamatan	126
1654	15.01.07	Batang Merangin	kecamatan	126
1655	15.01.08	Keliling Danau	kecamatan	126
1656	15.01.09	Kayu Aro	kecamatan	126
1657	15.01.11	Air Hangat Timur	kecamatan	126
1658	15.01.15	Gunung Tujuh	kecamatan	126
1659	15.01.16	Siulak	kecamatan	126
1660	15.01.17	Depati Tujuh	kecamatan	126
1661	15.01.18	Siulak Mukai	kecamatan	126
1662	15.01.19	Kayu Aro Barat	kecamatan	126
1663	15.01.20	Bukit Kerman	kecamatan	126
1664	15.01.21	Air Hangat Barat	kecamatan	126
1665	15.01.22	Tanah Cogok	kecamatan	126
1666	15.01.23	Danau Kerinci Barat	kecamatan	126
1667	15.02.01	Jangkat	kecamatan	127
1668	15.02.02	Bangko	kecamatan	127
1669	15.02.03	Muara Siau	kecamatan	127
1670	15.02.04	Sungai Manau	kecamatan	127
1671	15.02.05	Tabir	kecamatan	127
1672	15.02.06	Pamenang	kecamatan	127
1673	15.02.07	Tabir Ulu	kecamatan	127
1674	15.02.08	Tabir Selatan	kecamatan	127
1675	15.02.09	Lembah Masurai	kecamatan	127
1676	15.02.10	Bangko Barat	kecamatan	127
1677	15.02.11	Nalo Tantan	kecamatan	127
1678	15.02.12	Batang Masumai	kecamatan	127
1679	15.02.13	Pamenang Barat	kecamatan	127
1680	15.02.14	Tabir Ilir	kecamatan	127
1681	15.02.15	Tabir Timur	kecamatan	127
1682	15.02.16	Renah Pembarap	kecamatan	127
1683	15.02.17	Pangkalan Jambu	kecamatan	127
1684	15.02.18	Jangkat Timur	kecamatan	127
1685	15.02.19	Renah Pamenang	kecamatan	127
1686	15.02.20	Pamenang Selatan	kecamatan	127
1687	15.02.21	Margo Tabir	kecamatan	127
1688	15.02.22	Tabir Lintas	kecamatan	127
1689	15.02.23	Tabir Barat	kecamatan	127
1690	15.02.24	Tiang Pumpung	kecamatan	127
1691	15.03.01	Batang Asai	kecamatan	128
1692	15.03.02	Limun	kecamatan	128
1693	15.03.03	Sarolangun	kecamatan	128
1694	15.03.04	Pauh	kecamatan	128
1695	15.03.05	Pelawan	kecamatan	128
1696	15.03.06	Mandiangin	kecamatan	128
1697	15.03.07	Air Hitam	kecamatan	128
1698	15.03.08	Bathin VIII	kecamatan	128
1699	15.03.09	Singkut	kecamatan	128
1700	15.03.10	Cermin Nan Gedang	kecamatan	128
1701	15.03.11	Mandiangin Timur	kecamatan	128
1702	15.04.01	Mersam	kecamatan	129
1703	15.04.02	Muara Tembesi	kecamatan	129
1704	15.04.03	Muara Bulian	kecamatan	129
1705	15.04.04	Batin XXIV	kecamatan	129
1706	15.04.05	Pemayung	kecamatan	129
1707	15.04.06	Maro Sebo Ulu	kecamatan	129
1708	15.04.07	Bajubang	kecamatan	129
1709	15.04.08	Maro Sebo Ilir	kecamatan	129
1710	15.05.01	Jambi Luar Kota	kecamatan	130
1711	15.05.02	Sekernan	kecamatan	130
1712	15.05.03	Kumpeh	kecamatan	130
1713	15.05.04	Maro Sebo	kecamatan	130
1714	15.05.05	Mestong	kecamatan	130
1715	15.05.06	Kumpeh Ulu	kecamatan	130
1716	15.05.07	Sungai Bahar	kecamatan	130
1717	15.05.08	Sungai Gelam	kecamatan	130
1718	15.05.09	Bahar Utara	kecamatan	130
1719	15.05.10	Bahar Selatan	kecamatan	130
1720	15.05.11	Taman Rajo	kecamatan	130
1721	15.06.01	Tungkal Ulu	kecamatan	131
1722	15.06.02	Tungkal Ilir	kecamatan	131
1723	15.06.03	Pengabuan	kecamatan	131
1724	15.06.04	Betara	kecamatan	131
1725	15.06.05	Merlung	kecamatan	131
1726	15.06.06	Tebing Tinggi	kecamatan	131
1727	15.06.07	Batang Asam	kecamatan	131
1728	15.06.08	Renah Mendaluh	kecamatan	131
1729	15.06.09	Muara Papalik	kecamatan	131
1730	15.06.10	Seberang Kota	kecamatan	131
1731	15.06.11	Bram Itam	kecamatan	131
1732	15.06.12	Kuala Betara	kecamatan	131
1733	15.06.13	Senyerang	kecamatan	131
1734	15.07.01	Muara Sabak Timur	kecamatan	132
1735	15.07.02	Nipah Panjang	kecamatan	132
1736	15.07.03	Mendahara	kecamatan	132
1737	15.07.04	Rantau Rasau	kecamatan	132
1738	15.07.05	Sadu	kecamatan	132
1739	15.07.06	Dendang	kecamatan	132
1740	15.07.07	Muara Sabak Barat	kecamatan	132
1741	15.07.08	Kuala Jambi	kecamatan	132
1742	15.07.09	Mendahara Ulu	kecamatan	132
1743	15.07.10	Geragai	kecamatan	132
1744	15.07.11	Berbak	kecamatan	132
1745	15.08.01	Tanah Tumbuh	kecamatan	133
1746	15.08.02	Rantau Pandan	kecamatan	133
1747	15.08.03	Pasar Muaro Bungo	kecamatan	133
1748	15.08.04	Jujuhan	kecamatan	133
1749	15.08.05	Tanah Sepenggal	kecamatan	133
1750	15.08.06	Pelepat	kecamatan	133
1751	15.08.07	Limbur Lubuk Mengkuang	kecamatan	133
1752	15.08.08	Muko-muko Bathin VII	kecamatan	133
1753	15.08.09	Pelepat Ilir	kecamatan	133
1754	15.08.10	Batin II Babeko	kecamatan	133
1755	15.08.11	Bathin III	kecamatan	133
1756	15.08.12	Bungo Dani	kecamatan	133
1757	15.08.13	Rimbo Tengah	kecamatan	133
1758	15.08.14	Bathin III Ulu	kecamatan	133
1759	15.08.15	Bathin II Pelayang	kecamatan	133
1760	15.08.16	Jujuhan Ilir	kecamatan	133
1761	15.08.17	Tanah Sepenggal Lintas	kecamatan	133
1762	15.09.01	Tebo Tengah	kecamatan	134
1763	15.09.02	Tebo Ilir	kecamatan	134
1764	15.09.03	Tebo Ulu	kecamatan	134
1765	15.09.04	Rimbo Bujang	kecamatan	134
1766	15.09.05	Sumay	kecamatan	134
1767	15.09.06	VII Koto	kecamatan	134
1768	15.09.07	Rimbo Ulu	kecamatan	134
1769	15.09.08	Rimbo Ilir	kecamatan	134
1770	15.09.09	Tengah Ilir	kecamatan	134
1771	15.09.10	Serai Serumpun	kecamatan	134
1772	15.09.11	VII Koto Ilir	kecamatan	134
1773	15.09.12	Muara Tabir	kecamatan	134
1774	15.71.01	Telanaipura	kecamatan	135
1775	15.71.02	Jambi Selatan	kecamatan	135
1776	15.71.03	Jambi Timur	kecamatan	135
1777	15.71.04	Pasar Jambi	kecamatan	135
1778	15.71.05	Pelayangan	kecamatan	135
1779	15.71.06	Danau Teluk	kecamatan	135
1780	15.71.07	Kota Baru	kecamatan	135
1781	15.71.08	Jelutung	kecamatan	135
1782	15.71.09	Alam Barajo	kecamatan	135
1783	15.71.10	Danau Sipin	kecamatan	135
1784	15.71.11	Paal Merah	kecamatan	135
1785	15.72.01	Sungai Penuh	kecamatan	136
1786	15.72.02	Pesisir Bukit	kecamatan	136
1787	15.72.03	Hamparan Rawang	kecamatan	136
1788	15.72.04	Tanah Kampung	kecamatan	136
1789	15.72.05	Kumun Debai	kecamatan	136
1790	15.72.06	Pondok Tinggi	kecamatan	136
1791	15.72.07	Koto Baru	kecamatan	136
1792	15.72.08	Sungai Bungkal	kecamatan	136
1793	16.01.07	Sosoh Buay Rayap	kecamatan	137
1794	16.01.08	Pengandonan	kecamatan	137
1795	16.01.09	Peninjauan	kecamatan	137
1796	16.01.13	Baturaja Barat	kecamatan	137
1797	16.01.14	Baturaja Timur	kecamatan	137
1798	16.01.20	Ulu Ogan	kecamatan	137
1799	16.01.21	Semidang Aji	kecamatan	137
1800	16.01.22	Lubuk Batang	kecamatan	137
1801	16.01.28	Lengkiti	kecamatan	137
1802	16.01.29	Sinar Peninjauan	kecamatan	137
1803	16.01.30	Lubuk Raja	kecamatan	137
1804	16.01.31	Muara Jaya	kecamatan	137
1805	16.01.32	Kedaton Peninjauan Raya	kecamatan	137
1806	16.02.02	Tanjung Lubuk	kecamatan	138
1807	16.02.03	Pedamaran	kecamatan	138
1808	16.02.04	Mesuji	kecamatan	138
1809	16.02.05	Kayu Agung	kecamatan	138
1810	16.02.08	Sirah Pulau Padang	kecamatan	138
1811	16.02.11	Tulung Selapan	kecamatan	138
1812	16.02.12	Pampangan	kecamatan	138
1813	16.02.13	Lempuing	kecamatan	138
1814	16.02.14	Air Sugihan	kecamatan	138
1815	16.02.15	Sungai Menang	kecamatan	138
1816	16.02.17	Jejawi	kecamatan	138
1817	16.02.18	Cengal	kecamatan	138
1818	16.02.19	Pangkalan Lampam	kecamatan	138
1819	16.02.20	Mesuji Makmur	kecamatan	138
1820	16.02.21	Mesuji Raya	kecamatan	138
1821	16.02.22	Lempuing Jaya	kecamatan	138
1822	16.02.23	Teluk Gelam	kecamatan	138
1823	16.02.24	Pedamaran Timur	kecamatan	138
1824	16.03.01	Tanjung Agung	kecamatan	139
1825	16.03.02	Muara Enim	kecamatan	139
1826	16.03.03	Rambang Niru	kecamatan	139
1827	16.03.04	Gunung Megang	kecamatan	139
1828	16.03.06	Gelumbang	kecamatan	139
1829	16.03.07	Lawang Kidul	kecamatan	139
1830	16.03.08	Semende Darat Laut	kecamatan	139
1831	16.03.09	Semende Darat Tengah	kecamatan	139
1832	16.03.10	Semende Darat Ulu	kecamatan	139
1833	16.03.11	Ujan Mas	kecamatan	139
1834	16.03.14	Lubai	kecamatan	139
1835	16.03.15	Rambang	kecamatan	139
1836	16.03.16	Sungai Rotan	kecamatan	139
1837	16.03.17	Lembak	kecamatan	139
1838	16.03.19	Benakat	kecamatan	139
1839	16.03.21	Kelekar	kecamatan	139
1840	16.03.22	Muara Belida	kecamatan	139
1841	16.03.23	Belimbing	kecamatan	139
1842	16.03.24	Belida Darat	kecamatan	139
1843	16.03.25	Lubai Ulu	kecamatan	139
1844	16.03.26	Empat Petulai Dangku	kecamatan	139
1845	16.03.27	Panang Enim	kecamatan	139
1846	16.04.01	Tanjungsakti Pumu	kecamatan	140
1847	16.04.06	Jarai	kecamatan	140
1848	16.04.07	Kota Agung	kecamatan	140
1849	16.04.08	Pulau Pinang	kecamatan	140
1850	16.04.09	Merapi Barat	kecamatan	140
1851	16.04.10	Lahat	kecamatan	140
1852	16.04.12	Pajar Bulan	kecamatan	140
1853	16.04.15	Mulak Ulu	kecamatan	140
1854	16.04.16	Kikim Selatan	kecamatan	140
1855	16.04.17	Kikim Timur	kecamatan	140
1856	16.04.18	Kikim Tengah	kecamatan	140
1857	16.04.19	Kikim Barat	kecamatan	140
1858	16.04.20	Pseksu	kecamatan	140
1859	16.04.21	Gumay Talang	kecamatan	140
1860	16.04.22	Pagar Gunung	kecamatan	140
1861	16.04.23	Merapi Timur	kecamatan	140
1862	16.04.24	Tanjung Sakti Pumi	kecamatan	140
1863	16.04.25	Gumay Ulu	kecamatan	140
1864	16.04.26	Merapi Selatan	kecamatan	140
1865	16.04.27	Tanjungtebat	kecamatan	140
1866	16.04.28	Muarapayang	kecamatan	140
1867	16.04.29	Sukamerindu	kecamatan	140
1868	16.04.30	Mulak Sebingkai	kecamatan	140
1869	16.04.31	Lahat Selatan	kecamatan	140
1870	16.05.01	Tugumulyo	kecamatan	141
1871	16.05.02	Muara Lakitan	kecamatan	141
1872	16.05.03	Muara Kelingi	kecamatan	141
1873	16.05.08	Jayaloka	kecamatan	141
1874	16.05.09	Muara Beliti	kecamatan	141
1875	16.05.10	STL Ulu Terawas	kecamatan	141
1876	16.05.11	Selangit	kecamatan	141
1877	16.05.12	Megang Sakti	kecamatan	141
1878	16.05.13	Purwodadi	kecamatan	141
1879	16.05.14	BTS. Ulu	kecamatan	141
1880	16.05.18	Tiang Pumpung Kepungut	kecamatan	141
1881	16.05.19	Sumber Harta	kecamatan	141
1882	16.05.20	Tuah Negeri	kecamatan	141
1883	16.05.21	Suka Karya	kecamatan	141
1884	16.06.01	Sekayu	kecamatan	142
1885	16.06.02	Lais	kecamatan	142
1886	16.06.03	Sungai Keruh	kecamatan	142
1887	16.06.04	Batang Hari Leko	kecamatan	142
1888	16.06.05	Sanga Desa	kecamatan	142
1889	16.06.06	Babat Toman	kecamatan	142
1890	16.06.07	Sungai Lilin	kecamatan	142
1891	16.06.08	Keluang	kecamatan	142
1892	16.06.09	Bayung Lencir	kecamatan	142
1893	16.06.10	Plakat Tinggi	kecamatan	142
1894	16.06.11	Lalan	kecamatan	142
1895	16.06.12	Tungkal Jaya	kecamatan	142
1896	16.06.13	Lawan Wetan	kecamatan	142
1897	16.06.14	Babat Supat	kecamatan	142
1898	16.06.15	Jirak Jaya	kecamatan	142
1899	16.07.01	Banyuasin I	kecamatan	143
1900	16.07.02	Banyuasin II	kecamatan	143
1901	16.07.03	Banyuasin III	kecamatan	143
1902	16.07.04	Pulau Rimau	kecamatan	143
1903	16.07.05	Betung	kecamatan	143
1904	16.07.06	Rambutan	kecamatan	143
1905	16.07.07	Muara Padang	kecamatan	143
1906	16.07.08	Muara Telang	kecamatan	143
1907	16.07.09	Makarti Jaya	kecamatan	143
1908	16.07.10	Talang Kelapa	kecamatan	143
1909	16.07.11	Rantau Bayur	kecamatan	143
1910	16.07.12	Tanjung Lago	kecamatan	143
1911	16.07.13	Muara Sugihan	kecamatan	143
1912	16.07.14	Air Salek	kecamatan	143
1913	16.07.15	Tungkal Ilir	kecamatan	143
1914	16.07.16	Suak Tapeh	kecamatan	143
1915	16.07.17	Sembawa	kecamatan	143
1916	16.07.18	Sumber Marga Telang	kecamatan	143
1917	16.07.19	Air Kumbang	kecamatan	143
1918	16.07.20	Karang Agung Ilir	kecamatan	143
1919	16.07.21	Selat Penuguan	kecamatan	143
1920	16.08.01	Martapura	kecamatan	144
1921	16.08.02	Buay Madang	kecamatan	144
1922	16.08.03	Belitang	kecamatan	144
1923	16.08.04	Cempaka	kecamatan	144
1924	16.08.05	Buay Pemuka Peliung	kecamatan	144
1925	16.08.06	Madang Suku II	kecamatan	144
1926	16.08.07	Madang Suku I	kecamatan	144
1927	16.08.08	Semendawai Suku III	kecamatan	144
1928	16.08.09	Belitang II	kecamatan	144
1929	16.08.10	Belitang III	kecamatan	144
1930	16.08.11	Bunga Mayang	kecamatan	144
1931	16.08.12	Buay Madang Timur	kecamatan	144
1932	16.08.13	Madang Suku III	kecamatan	144
1933	16.08.14	Semendawai Barat	kecamatan	144
1934	16.08.15	Semendawai Timur	kecamatan	144
1935	16.08.16	Jayapura	kecamatan	144
2048	17.02.09	Curup	kecamatan	155
1936	16.08.17	Belitang Jaya	kecamatan	144
1937	16.08.18	Belitang Madang Raya	kecamatan	144
1938	16.08.19	Belitang Mulya	kecamatan	144
1939	16.08.20	Buay Pemuka Bangsa Raja	kecamatan	144
1940	16.09.01	Muara Dua	kecamatan	145
1941	16.09.02	Pulau Beringin	kecamatan	145
1942	16.09.03	Banding Agung	kecamatan	145
1943	16.09.04	Muara Dua Kisam	kecamatan	145
1944	16.09.05	Simpang	kecamatan	145
1945	16.09.06	Buay Sandang Aji	kecamatan	145
1946	16.09.07	Buay Runjung	kecamatan	145
1947	16.09.08	Mekakau Ilir	kecamatan	145
1948	16.09.09	Buay Pemaca	kecamatan	145
1949	16.09.10	Kisam Tinggi	kecamatan	145
1950	16.09.11	Kisam Ilir	kecamatan	145
1951	16.09.12	Buay Pematang Ribu Ranau Tengah	kecamatan	145
1952	16.09.13	Warkuk Ranau Selatan	kecamatan	145
1953	16.09.14	Runjung Agung	kecamatan	145
1954	16.09.15	Sungai Are	kecamatan	145
1955	16.09.16	Sindang Danau	kecamatan	145
1956	16.09.17	Buana Pemaca	kecamatan	145
1957	16.09.18	Tiga Dihaji	kecamatan	145
1958	16.09.19	Buay Rawan	kecamatan	145
1959	16.10.01	Muara Kuang	kecamatan	146
1960	16.10.02	Tanjung Batu	kecamatan	146
1961	16.10.03	Tanjung Raja	kecamatan	146
1962	16.10.04	Indralaya	kecamatan	146
1963	16.10.05	Pemulutan	kecamatan	146
1964	16.10.06	Rantau Alai	kecamatan	146
1965	16.10.07	Indralaya Utara	kecamatan	146
1966	16.10.08	Indralaya Selatan	kecamatan	146
1967	16.10.09	Pemulutan Selatan	kecamatan	146
1968	16.10.10	Pemulutan Barat	kecamatan	146
1969	16.10.11	Rantau Panjang	kecamatan	146
1970	16.10.12	Sungai Pinang	kecamatan	146
1971	16.10.13	Kandis	kecamatan	146
1972	16.10.14	Rambang Kuang	kecamatan	146
1973	16.10.15	Lubuk Keliat	kecamatan	146
1974	16.10.16	Payaraman	kecamatan	146
1975	16.11.01	Muara Pinang	kecamatan	147
1976	16.11.02	Pendopo	kecamatan	147
1977	16.11.03	Ulu Musi	kecamatan	147
1978	16.11.04	Tebing Tinggi	kecamatan	147
1979	16.11.05	Lintang Kanan	kecamatan	147
1980	16.11.06	Talang Padang	kecamatan	147
1981	16.11.07	Pasemah Air Keruh	kecamatan	147
1982	16.11.08	Sikap Dalam	kecamatan	147
1983	16.11.09	Saling	kecamatan	147
1984	16.11.10	Pendopo Barat	kecamatan	147
1985	16.12.01	Talang Ubi	kecamatan	148
1986	16.12.02	Penukal Utara	kecamatan	148
1987	16.12.03	Penukal	kecamatan	148
1988	16.12.04	Abab	kecamatan	148
1989	16.12.05	Tanah Abang	kecamatan	148
1990	16.13.01	Rupit	kecamatan	149
1991	16.13.02	Rawas Ulu	kecamatan	149
1992	16.13.03	Nibung	kecamatan	149
1993	16.13.04	Rawas Ilir	kecamatan	149
1994	16.13.05	Karang Dapo	kecamatan	149
1995	16.13.06	Karang Jaya	kecamatan	149
1996	16.13.07	Ulu Rawas	kecamatan	149
1997	16.71.01	Ilir Barat Dua	kecamatan	150
1998	16.71.02	Seberang Ulu Satu	kecamatan	150
1999	16.71.03	Seberang Ulu Dua	kecamatan	150
2000	16.71.04	Ilir Barat Satu	kecamatan	150
2001	16.71.05	Ilir Timur Satu	kecamatan	150
2002	16.71.06	Ilir Timur Dua	kecamatan	150
2003	16.71.07	Sukarami	kecamatan	150
2004	16.71.08	Sako	kecamatan	150
2005	16.71.09	Kemuning	kecamatan	150
2006	16.71.10	Kalidoni	kecamatan	150
2007	16.71.11	Bukitkecil	kecamatan	150
2008	16.71.12	Gandus	kecamatan	150
2009	16.71.13	Kertapati	kecamatan	150
2010	16.71.14	Plaju	kecamatan	150
2011	16.71.15	Alang-alang Lebar	kecamatan	150
2012	16.71.16	Sematangborang	kecamatan	150
2013	16.71.17	Jakabaring	kecamatan	150
2014	16.71.18	Ilir Timur Tiga	kecamatan	150
2015	16.72.01	Pagar Alam Utara	kecamatan	151
2016	16.72.02	Pagar Alam Selatan	kecamatan	151
2017	16.72.03	Dempo Utara	kecamatan	151
2018	16.72.04	Dempo Selatan	kecamatan	151
2019	16.72.05	Dempo Tengah	kecamatan	151
2020	16.73.01	Lubuk Linggau Timur I	kecamatan	152
2021	16.73.02	Lubuk Linggau Barat I	kecamatan	152
2022	16.73.03	Lubuk Linggau Selatan I	kecamatan	152
2023	16.73.04	Lubuk Linggau Utara I	kecamatan	152
2024	16.73.05	Lubuk Linggau Timur II	kecamatan	152
2025	16.73.06	Lubuk Linggau Barat II	kecamatan	152
2026	16.73.07	Lubuk Linggau Selatan II	kecamatan	152
2027	16.73.08	Lubuk Linggau Utara II	kecamatan	152
2028	16.74.01	Prabumulih Barat	kecamatan	153
2029	16.74.02	Prabumulih Timur	kecamatan	153
2030	16.74.03	Cambai	kecamatan	153
2031	16.74.04	Rambang Kapak Tengah	kecamatan	153
2032	16.74.05	Prabumulih Utara	kecamatan	153
2033	16.74.06	Prabumulih Selatan	kecamatan	153
2034	17.01.01	Kedurang	kecamatan	154
2035	17.01.02	Seginim	kecamatan	154
2036	17.01.03	Pino	kecamatan	154
2037	17.01.04	Manna	kecamatan	154
2038	17.01.05	Kota Manna	kecamatan	154
2039	17.01.06	Pino Raya	kecamatan	154
2040	17.01.07	Kedurang Ilir	kecamatan	154
2041	17.01.08	Air Nipis	kecamatan	154
2042	17.01.09	Ulu Manna	kecamatan	154
2043	17.01.10	Bunga Mas	kecamatan	154
2044	17.01.11	Pasar Manna	kecamatan	154
2045	17.02.06	Kota Padang	kecamatan	155
2046	17.02.07	Padang Ulak Tanding	kecamatan	155
2047	17.02.08	Sindang Kelingi	kecamatan	155
2049	17.02.10	Bermani Ulu	kecamatan	155
2050	17.02.11	Selupu Rejang	kecamatan	155
2051	17.02.16	Curup Utara	kecamatan	155
2052	17.02.17	Curup Timur	kecamatan	155
2053	17.02.18	Curup Selatan	kecamatan	155
2054	17.02.19	Curup Tengah	kecamatan	155
2055	17.02.20	Binduriang	kecamatan	155
2056	17.02.21	Sindang Beliti Ulu	kecamatan	155
2057	17.02.22	Sindang Dataran	kecamatan	155
2058	17.02.23	Sindang Beliti Ilir	kecamatan	155
2059	17.02.24	Bermani Ulu Raya	kecamatan	155
2060	17.03.01	Enggano	kecamatan	156
2061	17.03.06	Kerkap	kecamatan	156
2062	17.03.07	Kota Arga Makmur	kecamatan	156
2063	17.03.08	Giri Mulya	kecamatan	156
2064	17.03.09	Padang Jaya	kecamatan	156
2065	17.03.10	Lais	kecamatan	156
2066	17.03.11	Batik Nau	kecamatan	156
2067	17.03.12	Ketahun	kecamatan	156
2068	17.03.13	Napal Putih	kecamatan	156
2069	17.03.14	Putri Hijau	kecamatan	156
2070	17.03.15	Air Besi	kecamatan	156
2071	17.03.16	Air Napal	kecamatan	156
2072	17.03.19	Hulu Palik	kecamatan	156
2073	17.03.20	Air Padang	kecamatan	156
2074	17.03.21	Arma Jaya	kecamatan	156
2075	17.03.22	Tanjung Agung Palik	kecamatan	156
2076	17.03.23	Ulok Kupai	kecamatan	156
2077	17.03.24	Pinang Raya	kecamatan	156
2078	17.03.25	Marga Sakti Sebelat	kecamatan	156
2079	17.04.01	Kinal	kecamatan	157
2080	17.04.02	Tanjung Kemuning	kecamatan	157
2081	17.04.03	Kaur Utara	kecamatan	157
2082	17.04.04	Kaur Tengah	kecamatan	157
2083	17.04.05	Kaur Selatan	kecamatan	157
2084	17.04.06	Maje	kecamatan	157
2085	17.04.07	Nasal	kecamatan	157
2086	17.04.08	Semidang Gumay	kecamatan	157
2087	17.04.09	Kelam Tengah	kecamatan	157
2088	17.04.10	Luas	kecamatan	157
2089	17.04.11	Muara Sahung	kecamatan	157
2090	17.04.12	Tetap	kecamatan	157
2091	17.04.13	Lungkang Kule	kecamatan	157
2092	17.04.14	Padang Guci Hilir	kecamatan	157
2093	17.04.15	Padang Guci Hulu	kecamatan	157
2094	17.05.01	Sukaraja	kecamatan	158
2095	17.05.02	Seluma	kecamatan	158
2096	17.05.03	Talo	kecamatan	158
2097	17.05.04	Semidang Alas	kecamatan	158
2098	17.05.05	Semidang Alas Maras	kecamatan	158
2099	17.05.06	Air Periukan	kecamatan	158
2100	17.05.07	Lubuk Sandi	kecamatan	158
2101	17.05.08	Seluma Barat	kecamatan	158
2102	17.05.09	Seluma Timur	kecamatan	158
2103	17.05.10	Seluma Utara	kecamatan	158
2104	17.05.11	Seluma Selatan	kecamatan	158
2105	17.05.12	Talo Kecil	kecamatan	158
2106	17.05.13	Ulu Talo	kecamatan	158
2107	17.05.14	Ilir Talo	kecamatan	158
2108	17.06.01	Lubuk Pinang	kecamatan	159
2109	17.06.02	Kota Mukomuko	kecamatan	159
2110	17.06.03	Teras Terunjam	kecamatan	159
2111	17.06.04	Pondok Suguh	kecamatan	159
2112	17.06.05	Ipuh	kecamatan	159
2113	17.06.06	Malin Deman	kecamatan	159
2114	17.06.07	Air Rami	kecamatan	159
2115	17.06.08	Teramang Jaya	kecamatan	159
2116	17.06.09	Selagan Raya	kecamatan	159
2117	17.06.10	Penarik	kecamatan	159
2118	17.06.11	XIV Koto	kecamatan	159
2119	17.06.12	V Koto	kecamatan	159
2120	17.06.13	Air Manjunto	kecamatan	159
2121	17.06.14	Air Dikit	kecamatan	159
2122	17.06.15	Sungai Rumbai	kecamatan	159
2123	17.07.01	Lebong Utara	kecamatan	160
2124	17.07.02	Lebong Atas	kecamatan	160
2125	17.07.03	Lebong Tengah	kecamatan	160
2126	17.07.04	Lebong Selatan	kecamatan	160
2127	17.07.05	Rimbo Pengadang	kecamatan	160
2128	17.07.06	Topos	kecamatan	160
2129	17.07.07	Bingin Kuning	kecamatan	160
2130	17.07.08	Lebong Sakti	kecamatan	160
2131	17.07.09	Tubei	kecamatan	160
2132	17.07.10	Amen	kecamatan	160
2133	17.07.11	Uram Jaya	kecamatan	160
2134	17.07.12	Pinang Belapis	kecamatan	160
2135	17.08.01	Bermani Ilir	kecamatan	161
2136	17.08.02	Ujan Mas	kecamatan	161
2137	17.08.03	Tebat Karai	kecamatan	161
2138	17.08.04	Kepahiang	kecamatan	161
2139	17.08.05	Merigi	kecamatan	161
2140	17.08.06	Kebawetan	kecamatan	161
2141	17.08.07	Seberang Musi	kecamatan	161
2142	17.08.08	Muara Kemumu	kecamatan	161
2143	17.09.01	Karang Tinggi	kecamatan	162
2144	17.09.02	Talang Empat	kecamatan	162
2145	17.09.03	Pondok Kelapa	kecamatan	162
2146	17.09.04	Pematang Tiga	kecamatan	162
2147	17.09.05	Pagar Jati	kecamatan	162
2148	17.09.06	Taba Penanjung	kecamatan	162
2149	17.09.07	Merigi Kelindang	kecamatan	162
2150	17.09.08	Merigi Sakti	kecamatan	162
2151	17.09.09	Pondok Kubang	kecamatan	162
2152	17.09.10	Bang Haji	kecamatan	162
2153	17.09.11	Semidang Lagan	kecamatan	162
2154	17.71.01	Selebar	kecamatan	163
2155	17.71.02	Gading Cempaka	kecamatan	163
2156	17.71.03	Teluk Segara	kecamatan	163
2157	17.71.04	Muara Bangka Hulu	kecamatan	163
2158	17.71.05	Kampung Melayu	kecamatan	163
2159	17.71.06	Ratu Agung	kecamatan	163
2160	17.71.07	Ratu Samban	kecamatan	163
2161	17.71.08	Sungai Serut	kecamatan	163
2162	17.71.09	Singaran Pati	kecamatan	163
2163	18.01.04	Natar	kecamatan	164
2164	18.01.05	Tanjung Bintang	kecamatan	164
2165	18.01.06	Kalianda	kecamatan	164
2166	18.01.07	Sidomulyo	kecamatan	164
2167	18.01.08	Katibung	kecamatan	164
2168	18.01.09	Penengahan	kecamatan	164
2169	18.01.10	Palas	kecamatan	164
2170	18.01.13	Jati Agung	kecamatan	164
2171	18.01.14	Ketapang	kecamatan	164
2172	18.01.15	Sragi	kecamatan	164
2173	18.01.16	Raja Basa	kecamatan	164
2174	18.01.17	Candipuro	kecamatan	164
2175	18.01.18	Merbau Mataram	kecamatan	164
2176	18.01.21	Bakauheni	kecamatan	164
2177	18.01.22	Tanjung Sari	kecamatan	164
2178	18.01.23	Way Sulan	kecamatan	164
2179	18.01.24	Way Panji	kecamatan	164
2180	18.02.01	Kalirejo	kecamatan	165
2181	18.02.02	Bangun Rejo	kecamatan	165
2182	18.02.03	Padang Ratu	kecamatan	165
2183	18.02.04	Gunung Sugih	kecamatan	165
2184	18.02.05	Trimurjo	kecamatan	165
2185	18.02.06	Punggur	kecamatan	165
2186	18.02.07	Terbanggi Besar	kecamatan	165
2187	18.02.08	Seputih Raman	kecamatan	165
2188	18.02.09	Rumbia	kecamatan	165
2189	18.02.10	Seputih Banyak	kecamatan	165
2190	18.02.11	Seputih Mataram	kecamatan	165
2191	18.02.12	Seputih Surabaya	kecamatan	165
2192	18.02.13	Terusan Nunyai	kecamatan	165
2193	18.02.14	Bumi Ratu Nuban	kecamatan	165
2194	18.02.15	Bekri	kecamatan	165
2195	18.02.16	Seputih Agung	kecamatan	165
2196	18.02.17	Way Pengubuan	kecamatan	165
2197	18.02.18	Bandar Mataram	kecamatan	165
2198	18.02.19	Pubian	kecamatan	165
2199	18.02.20	Selagai Lingga	kecamatan	165
2200	18.02.21	Anak Tuha	kecamatan	165
2201	18.02.22	Sendang Agung	kecamatan	165
2202	18.02.23	Kota Gajah	kecamatan	165
2203	18.02.24	Bumi Nabung	kecamatan	165
2204	18.02.25	Way Seputih	kecamatan	165
2205	18.02.26	Bandar Surabaya	kecamatan	165
2206	18.02.27	Anak Ratu Aji	kecamatan	165
2207	18.02.28	Putra Rumbia	kecamatan	165
2208	18.03.01	Bukit Kemuning	kecamatan	166
2209	18.03.02	Kotabumi	kecamatan	166
2210	18.03.03	Sungkai Selatan	kecamatan	166
2211	18.03.04	Tanjung Raja	kecamatan	166
2212	18.03.05	Abung Timur	kecamatan	166
2213	18.03.06	Abung Barat	kecamatan	166
2214	18.03.07	Abung Selatan	kecamatan	166
2215	18.03.08	Sungkai Utara	kecamatan	166
2216	18.03.09	Kotabumi Utara	kecamatan	166
2217	18.03.10	Kotabumi Selatan	kecamatan	166
2218	18.03.11	Abung Tengah	kecamatan	166
2219	18.03.12	Abung Tinggi	kecamatan	166
2220	18.03.13	Abung Semuli	kecamatan	166
2221	18.03.14	Abung Surakarta	kecamatan	166
2222	18.03.15	Muara Sungkai	kecamatan	166
2223	18.03.16	Bunga Mayang	kecamatan	166
2224	18.03.17	Hulu Sungkai	kecamatan	166
2225	18.03.18	Sungkai Tengah	kecamatan	166
2226	18.03.19	Abung Pekurun	kecamatan	166
2227	18.03.20	Sungkai Jaya	kecamatan	166
2228	18.03.21	Sungkai Barat	kecamatan	166
2229	18.03.22	Abung Kunang	kecamatan	166
2230	18.03.23	Blambangan Pagar	kecamatan	166
2231	18.04.04	Balik Bukit	kecamatan	167
2232	18.04.05	Sumber Jaya	kecamatan	167
2233	18.04.06	Belalau	kecamatan	167
2234	18.04.07	Way Tenong	kecamatan	167
2235	18.04.08	Sekincau	kecamatan	167
2236	18.04.09	Suoh	kecamatan	167
2237	18.04.10	Batu Brak	kecamatan	167
2238	18.04.11	Sukau	kecamatan	167
2239	18.04.15	Gedung Surian	kecamatan	167
2240	18.04.18	Kebun Tebu	kecamatan	167
2241	18.04.19	Air Hitam	kecamatan	167
2242	18.04.20	Pagar Dewa	kecamatan	167
2243	18.04.21	Batu Ketulis	kecamatan	167
2244	18.04.22	Lumbok Seminung	kecamatan	167
2245	18.04.23	Bandar Negeri Suoh	kecamatan	167
2246	18.05.02	Menggala	kecamatan	168
2247	18.05.06	Gedung Aji	kecamatan	168
2248	18.05.08	Banjar Agung	kecamatan	168
2249	18.05.11	Gedung Meneng	kecamatan	168
2250	18.05.12	Rawa Jitu Selatan	kecamatan	168
2251	18.05.13	Penawar Tama	kecamatan	168
2252	18.05.18	Rawa Jitu Timur	kecamatan	168
2253	18.05.20	Banjar Margo	kecamatan	168
2254	18.05.22	Rawa Pitu	kecamatan	168
2255	18.05.23	Penawar Aji	kecamatan	168
2256	18.05.25	Dente Teladas	kecamatan	168
2257	18.05.26	Meraksa Aji	kecamatan	168
2258	18.05.27	Gedung Aji Baru	kecamatan	168
2259	18.05.29	Banjar Baru	kecamatan	168
2260	18.05.30	Menggala Timur	kecamatan	168
2261	18.06.01	Kota Agung	kecamatan	169
2262	18.06.02	Talang Padang	kecamatan	169
2263	18.06.03	Wonosobo	kecamatan	169
2264	18.06.04	Pulau Panggung	kecamatan	169
2265	18.06.09	Cukuh Balak	kecamatan	169
2266	18.06.11	Pugung	kecamatan	169
2267	18.06.12	Semaka	kecamatan	169
2268	18.06.13	Sumberejo	kecamatan	169
2269	18.06.15	Ulu Belu	kecamatan	169
2270	18.06.16	Pematang Sawa	kecamatan	169
2271	18.06.17	Kelumbayan	kecamatan	169
2272	18.06.18	Kota Agung Barat	kecamatan	169
2273	18.06.19	Kota Agung Timur	kecamatan	169
2274	18.06.20	Gisting	kecamatan	169
2275	18.06.21	Gunung Alip	kecamatan	169
2276	18.06.24	Limau	kecamatan	169
2277	18.06.25	Bandar Negeri Semuong	kecamatan	169
2278	18.06.26	Air Naningan	kecamatan	169
2279	18.06.27	Bulok	kecamatan	169
2280	18.06.28	Kelumbayan Barat	kecamatan	169
2281	18.07.01	Sukadana	kecamatan	170
2282	18.07.02	Labuhan Maringgai	kecamatan	170
2283	18.07.03	Jabung	kecamatan	170
2284	18.07.04	Pekalongan	kecamatan	170
2285	18.07.05	Sekampung	kecamatan	170
2286	18.07.06	Batanghari	kecamatan	170
2287	18.07.07	Way Jepara	kecamatan	170
2288	18.07.08	Purbolinggo	kecamatan	170
2289	18.07.09	Raman Utara	kecamatan	170
2290	18.07.10	Metro Kibang	kecamatan	170
2291	18.07.11	Marga Tiga	kecamatan	170
2292	18.07.12	Sekampung Udik	kecamatan	170
2293	18.07.13	Batanghari Nuban	kecamatan	170
2294	18.07.14	Bumi Agung	kecamatan	170
2295	18.07.15	Bandar Sribhawono	kecamatan	170
2296	18.07.16	Mataram Baru	kecamatan	170
2297	18.07.17	Melinting	kecamatan	170
2298	18.07.18	Gunung Pelindung	kecamatan	170
2299	18.07.19	Pasir Sakti	kecamatan	170
2300	18.07.20	Waway Karya	kecamatan	170
2301	18.07.21	Labuhan Ratu	kecamatan	170
2302	18.07.22	Braja Selebah	kecamatan	170
2303	18.07.23	Way Bungur	kecamatan	170
2304	18.07.24	Marga Sekampung	kecamatan	170
2305	18.08.01	Blambangan Umpu	kecamatan	171
2306	18.08.02	Kasui	kecamatan	171
2307	18.08.03	Banjit	kecamatan	171
2308	18.08.04	Baradatu	kecamatan	171
2309	18.08.05	Bahuga	kecamatan	171
2310	18.08.06	Pakuan Ratu	kecamatan	171
2311	18.08.07	Negeri Agung	kecamatan	171
2312	18.08.08	Way Tuba	kecamatan	171
2313	18.08.09	Rebang Tangkas	kecamatan	171
2314	18.08.10	Gunung Labuhan	kecamatan	171
2315	18.08.11	Negara Batin	kecamatan	171
2316	18.08.12	Negeri Besar	kecamatan	171
2317	18.08.13	Buay Bahuga	kecamatan	171
2318	18.08.14	Bumi Agung	kecamatan	171
2319	18.08.15	Umpu Semenguk	kecamatan	171
2320	18.09.01	Gedong Tataan	kecamatan	172
2321	18.09.02	Negeri Katon	kecamatan	172
2322	18.09.03	Tegineneng	kecamatan	172
2323	18.09.04	Way Lima	kecamatan	172
2324	18.09.05	Padang Cermin	kecamatan	172
2325	18.09.06	Punduh Pidada	kecamatan	172
2326	18.09.07	Kedondong	kecamatan	172
2327	18.09.08	Marga Punduh	kecamatan	172
2328	18.09.09	Way Khilau	kecamatan	172
2329	18.09.10	Teluk Pandan	kecamatan	172
2330	18.09.11	Way Ratai	kecamatan	172
2331	18.10.01	Pringsewu	kecamatan	173
2332	18.10.02	Gading Rejo	kecamatan	173
2333	18.10.03	Ambarawa	kecamatan	173
2334	18.10.04	Pardasuka	kecamatan	173
2335	18.10.05	Pagelaran	kecamatan	173
2336	18.10.06	Banyumas	kecamatan	173
2337	18.10.07	Adiluwih	kecamatan	173
2338	18.10.08	Sukoharjo	kecamatan	173
2339	18.10.09	Pagelaran Utara	kecamatan	173
2340	18.11.01	Mesuji	kecamatan	174
2341	18.11.02	Mesuji Timur	kecamatan	174
2342	18.11.03	Rawa Jitu Utara	kecamatan	174
2343	18.11.04	Way Serdang	kecamatan	174
2344	18.11.05	Simpang Pematang	kecamatan	174
2345	18.11.06	Panca Jaya	kecamatan	174
2346	18.11.07	Tanjung Raya	kecamatan	174
2347	18.12.01	Tulang Bawang Tengah	kecamatan	175
2348	18.12.02	Tumijajar	kecamatan	175
2349	18.12.03	Tulang Bawang Udik	kecamatan	175
2350	18.12.04	Gunung Terang	kecamatan	175
2351	18.12.05	Gunung Agung	kecamatan	175
2352	18.12.06	Way Kenanga	kecamatan	175
2353	18.12.07	Lambu Kibang	kecamatan	175
2354	18.12.08	Pagar Dewa	kecamatan	175
2355	18.12.09	Batu Putih	kecamatan	175
2356	18.13.01	Pesisir Tengah	kecamatan	176
2357	18.13.02	Pesisir Selatan	kecamatan	176
2358	18.13.03	Lemong	kecamatan	176
2359	18.13.04	Pesisir Utara	kecamatan	176
2360	18.13.05	Karya Penggawa	kecamatan	176
2361	18.13.06	Pulau Pisang	kecamatan	176
2362	18.13.07	Way Krui	kecamatan	176
2363	18.13.08	Krui Selatan	kecamatan	176
2364	18.13.09	Ngambur	kecamatan	176
2365	18.13.10	Ngaras	kecamatan	176
2366	18.13.11	Bangkunat	kecamatan	176
2367	18.71.01	Kedaton	kecamatan	177
2368	18.71.02	Sukarame	kecamatan	177
2369	18.71.03	Tanjungkarang Barat	kecamatan	177
2370	18.71.04	Panjang	kecamatan	177
2371	18.71.05	Tanjungkarang Timur	kecamatan	177
2372	18.71.06	Tanjungkarang Pusat	kecamatan	177
2373	18.71.07	Telukbetung Selatan	kecamatan	177
2374	18.71.08	Telukbetung Barat	kecamatan	177
2375	18.71.09	Telukbetung Utara	kecamatan	177
2376	18.71.10	Rajabasa	kecamatan	177
2377	18.71.11	Tanjung Senang	kecamatan	177
2378	18.71.12	Sukabumi	kecamatan	177
2379	18.71.13	Kemiling	kecamatan	177
2380	18.71.14	Labuhan Ratu	kecamatan	177
2381	18.71.15	Way Halim	kecamatan	177
2382	18.71.16	Langkapura	kecamatan	177
2383	18.71.17	Enggal	kecamatan	177
2384	18.71.18	Kedamaian	kecamatan	177
2385	18.71.19	Telukbetung Timur	kecamatan	177
2386	18.71.20	Bumi Waras	kecamatan	177
2387	18.72.01	Metro Pusat	kecamatan	178
2388	18.72.02	Metro Utara	kecamatan	178
2389	18.72.03	Metro Barat	kecamatan	178
2390	18.72.04	Metro Timur	kecamatan	178
2391	18.72.05	Metro Selatan	kecamatan	178
2392	19.01.01	Sungailiat	kecamatan	179
2393	19.01.02	Belinyu	kecamatan	179
2394	19.01.03	Merawang	kecamatan	179
2395	19.01.04	Mendo Barat	kecamatan	179
2396	19.01.05	Pemali	kecamatan	179
2397	19.01.06	Bakam	kecamatan	179
2398	19.01.07	Riau Silip	kecamatan	179
2399	19.01.08	Puding Besar	kecamatan	179
2400	19.02.01	Tanjungpandan	kecamatan	180
2401	19.02.02	Membalong	kecamatan	180
2402	19.02.03	Selat Nasik	kecamatan	180
2403	19.02.04	Sijuk	kecamatan	180
2404	19.02.05	Badau	kecamatan	180
2405	19.03.01	Toboali	kecamatan	181
2406	19.03.02	Lepar	kecamatan	181
2407	19.03.03	Airgegas	kecamatan	181
2408	19.03.04	Simpang Rimba	kecamatan	181
2409	19.03.05	Payung	kecamatan	181
2410	19.03.06	Tukak Sadai	kecamatan	181
2411	19.03.07	Pulau Besar	kecamatan	181
2412	19.03.08	Kepulauan Pongok	kecamatan	181
2413	19.04.01	Koba	kecamatan	182
2414	19.04.02	Pangkalan Baru	kecamatan	182
2415	19.04.03	Sungai Selan	kecamatan	182
2416	19.04.04	Simpang Katis	kecamatan	182
2417	19.04.05	Namang	kecamatan	182
2418	19.04.06	Lubuk Besar	kecamatan	182
2419	19.05.01	Mentok	kecamatan	183
2420	19.05.02	Simpang Teritip	kecamatan	183
2421	19.05.03	Jebus	kecamatan	183
2422	19.05.04	Kelapa	kecamatan	183
2423	19.05.05	Tempilang	kecamatan	183
2424	19.05.06	Parittiga	kecamatan	183
2425	19.06.01	Manggar	kecamatan	184
2426	19.06.02	Gantung	kecamatan	184
2427	19.06.03	Dendang	kecamatan	184
2428	19.06.04	Kelapa Kampit	kecamatan	184
2429	19.06.05	Damar	kecamatan	184
2430	19.06.06	Simpang Renggiang	kecamatan	184
2431	19.06.07	Simpang Pesak	kecamatan	184
2432	19.71.01	Bukit Intan	kecamatan	185
2433	19.71.02	Taman Sari	kecamatan	185
2434	19.71.03	Pangkal Balam	kecamatan	185
2435	19.71.04	Rangkui	kecamatan	185
2436	19.71.05	Gerunggang	kecamatan	185
2437	19.71.06	Gabek	kecamatan	185
2438	19.71.07	Girimaya	kecamatan	185
2439	21.01.04	Gunung Kijang	kecamatan	186
2440	21.01.06	Bintan Timur	kecamatan	186
2441	21.01.07	Bintan Utara	kecamatan	186
2442	21.01.08	Teluk Bintan	kecamatan	186
2443	21.01.09	Tambelan	kecamatan	186
2444	21.01.10	Teluk Sebong	kecamatan	186
2445	21.01.12	Toapaya	kecamatan	186
2446	21.01.13	Mantang	kecamatan	186
2447	21.01.14	Bintan Pesisir	kecamatan	186
2448	21.01.15	Seri Kuala Lobam	kecamatan	186
2449	21.02.01	Moro	kecamatan	187
2450	21.02.02	Kundur	kecamatan	187
2451	21.02.03	Karimun	kecamatan	187
2452	21.02.04	Meral	kecamatan	187
2453	21.02.05	Tebing	kecamatan	187
2454	21.02.06	Buru	kecamatan	187
2455	21.02.07	Kundur Utara	kecamatan	187
2456	21.02.08	Kundur Barat	kecamatan	187
2457	21.02.09	Durai	kecamatan	187
2458	21.02.10	Meral Barat	kecamatan	187
2459	21.02.11	Ungar	kecamatan	187
2460	21.02.12	Belat	kecamatan	187
2461	21.02.13	Selat Gelam	kecamatan	187
2462	21.02.14	Sugie Besar	kecamatan	187
2463	21.03.04	Midai	kecamatan	188
2464	21.03.05	Bunguran Barat	kecamatan	188
2465	21.03.06	Serasan	kecamatan	188
2466	21.03.07	Bunguran Timur	kecamatan	188
2467	21.03.08	Bunguran Utara	kecamatan	188
2468	21.03.09	Subi	kecamatan	188
2469	21.03.10	Pulau Laut	kecamatan	188
2470	21.03.11	Pulau Tiga	kecamatan	188
2471	21.03.15	Bunguran Timur Laut	kecamatan	188
2472	21.03.16	Bunguran Tengah	kecamatan	188
2473	21.03.18	Bunguran Selatan	kecamatan	188
2474	21.03.19	Serasan Timur	kecamatan	188
2475	21.03.20	Bunguran Batubi	kecamatan	188
2476	21.03.21	Pulau Tiga Barat	kecamatan	188
2477	21.03.22	Suak Midai	kecamatan	188
2478	21.03.23	Pulau Panjang	kecamatan	188
2479	21.03.24	Pulau Seluan	kecamatan	188
2480	21.04.01	Singkep	kecamatan	189
2481	21.04.02	Lingga	kecamatan	189
2482	21.04.03	Senayang	kecamatan	189
2483	21.04.04	Singkep Barat	kecamatan	189
2484	21.04.05	Lingga Utara	kecamatan	189
2485	21.04.06	Singkep Pesisir	kecamatan	189
2486	21.04.07	Lingga Timur	kecamatan	189
2487	21.04.08	Selayar	kecamatan	189
2488	21.04.09	Singkep Selatan	kecamatan	189
2489	21.04.10	Kepulauan Posek	kecamatan	189
2490	21.04.11	Katang Bidare	kecamatan	189
2491	21.04.12	Temiang Pesisir	kecamatan	189
2492	21.04.13	Bakung Serumpun	kecamatan	189
2493	21.05.01	Siantan	kecamatan	190
2494	21.05.02	Palmatak	kecamatan	190
2495	21.05.03	Siantan Timur	kecamatan	190
2496	21.05.04	Siantan Selatan	kecamatan	190
2497	21.05.05	Jemaja Timur	kecamatan	190
2498	21.05.06	Jemaja	kecamatan	190
2499	21.05.07	Siantan Tengah	kecamatan	190
2500	21.05.08	Siantan Utara	kecamatan	190
2501	21.05.09	Jemaja Barat	kecamatan	190
2502	21.05.10	Kute Siantan	kecamatan	190
2503	21.71.01	Belakang Padang	kecamatan	191
2504	21.71.02	Batu Ampar	kecamatan	191
2505	21.71.03	Sekupang	kecamatan	191
2506	21.71.04	Nongsa	kecamatan	191
2507	21.71.05	Bulang	kecamatan	191
2508	21.71.06	Lubuk Baja	kecamatan	191
2509	21.71.07	Sei Beduk	kecamatan	191
2510	21.71.08	Galang	kecamatan	191
2511	21.71.09	Bengkong	kecamatan	191
2512	21.71.10	Batam Kota	kecamatan	191
2513	21.71.11	Sagulung	kecamatan	191
2514	21.71.12	Batu Aji	kecamatan	191
2515	21.72.01	Tanjung Pinang Barat	kecamatan	192
2516	21.72.02	Tanjung Pinang Timur	kecamatan	192
2517	21.72.03	Tanjung Pinang Kota	kecamatan	192
2518	21.72.04	Bukit Bestari	kecamatan	192
2519	31.01.01	Kepulauan Seribu Utara	kecamatan	193
2520	31.01.02	Kepulauan Seribu Selatan	kecamatan	193
2521	31.71.01	Gambir	kecamatan	194
2522	31.71.02	Sawah Besar	kecamatan	194
2523	31.71.03	Kemayoran	kecamatan	194
2524	31.71.04	Senen	kecamatan	194
2525	31.71.05	Cempaka Putih	kecamatan	194
2526	31.71.06	Menteng	kecamatan	194
2527	31.71.07	Tanah Abang	kecamatan	194
2528	31.71.08	Johar Baru	kecamatan	194
2529	31.72.01	Penjaringan	kecamatan	195
2530	31.72.02	Tanjung Priok	kecamatan	195
2531	31.72.03	Koja	kecamatan	195
2532	31.72.04	Cilincing	kecamatan	195
2533	31.72.05	Pademangan	kecamatan	195
2534	31.72.06	Kelapa Gading	kecamatan	195
2535	31.73.01	Cengkareng	kecamatan	196
2536	31.73.02	Grogol Petamburan	kecamatan	196
2537	31.73.03	Taman Sari	kecamatan	196
2538	31.73.04	Tambora	kecamatan	196
2539	31.73.05	Kebon Jeruk	kecamatan	196
2540	31.73.06	Kalideres	kecamatan	196
2541	31.73.07	Pal Merah	kecamatan	196
2542	31.73.08	Kembangan	kecamatan	196
2543	31.74.01	Tebet	kecamatan	197
2544	31.74.02	Setiabudi	kecamatan	197
2545	31.74.03	Mampang Prapatan	kecamatan	197
2546	31.74.04	Pasar Minggu	kecamatan	197
2547	31.74.05	Kebayoran Lama	kecamatan	197
2548	31.74.06	Cilandak	kecamatan	197
2549	31.74.07	Kebayoran Baru	kecamatan	197
2550	31.74.08	Pancoran	kecamatan	197
2551	31.74.09	Jagakarsa	kecamatan	197
2552	31.74.10	Pesanggrahan	kecamatan	197
2553	31.75.01	Matraman	kecamatan	198
2554	31.75.02	Pulogadung	kecamatan	198
2555	31.75.03	Jatinegara	kecamatan	198
2556	31.75.04	Kramatjati	kecamatan	198
2557	31.75.05	Pasar Rebo	kecamatan	198
2558	31.75.06	Cakung	kecamatan	198
2559	31.75.07	Duren Sawit	kecamatan	198
2560	31.75.08	Makasar	kecamatan	198
2561	31.75.09	Ciracas	kecamatan	198
2562	31.75.10	Cipayung	kecamatan	198
2563	32.01.01	Cibinong	kecamatan	199
2564	32.01.02	Gunungputri	kecamatan	199
2565	32.01.03	Citeureup	kecamatan	199
2566	32.01.04	Sukaraja	kecamatan	199
2567	32.01.05	Babakan Madang	kecamatan	199
2568	32.01.06	Jonggol	kecamatan	199
2569	32.01.07	Cileungsi	kecamatan	199
2570	32.01.08	Cariu	kecamatan	199
2571	32.01.09	Sukamakmur	kecamatan	199
2572	32.01.10	Parung	kecamatan	199
2573	32.01.11	Gunungsindur	kecamatan	199
2574	32.01.12	Kemang	kecamatan	199
2575	32.01.13	Bojonggede	kecamatan	199
2576	32.01.14	Leuwiliang	kecamatan	199
2577	32.01.15	Ciampea	kecamatan	199
2578	32.01.16	Cibungbulang	kecamatan	199
2579	32.01.17	Pamijahan	kecamatan	199
2580	32.01.18	Rumpin	kecamatan	199
2581	32.01.19	Jasinga	kecamatan	199
2582	32.01.20	Parungpanjang	kecamatan	199
2583	32.01.21	Nanggung	kecamatan	199
2584	32.01.22	Cigudeg	kecamatan	199
2585	32.01.23	Tenjo	kecamatan	199
2586	32.01.24	Ciawi	kecamatan	199
2587	32.01.25	Cisarua	kecamatan	199
2588	32.01.26	Megamendung	kecamatan	199
2589	32.01.27	Caringin	kecamatan	199
2590	32.01.28	Cijeruk	kecamatan	199
2591	32.01.29	Ciomas	kecamatan	199
2592	32.01.30	Dramaga	kecamatan	199
2593	32.01.31	Tamansari	kecamatan	199
2594	32.01.32	Klapanunggal	kecamatan	199
2595	32.01.33	Ciseeng	kecamatan	199
2596	32.01.34	Rancabungur	kecamatan	199
2597	32.01.35	Sukajaya	kecamatan	199
2598	32.01.36	Tanjungsari	kecamatan	199
2599	32.01.37	Tajurhalang	kecamatan	199
2600	32.01.38	Cigombong	kecamatan	199
2601	32.01.39	Leuwisadeng	kecamatan	199
2602	32.01.40	Tenjolaya	kecamatan	199
2603	32.02.01	Palabuhanratu	kecamatan	200
2604	32.02.02	Simpenan	kecamatan	200
2605	32.02.03	Cikakak	kecamatan	200
2606	32.02.04	Bantargadung	kecamatan	200
2607	32.02.05	Cisolok	kecamatan	200
2608	32.02.06	Cikidang	kecamatan	200
2609	32.02.07	Lengkong	kecamatan	200
2610	32.02.08	Jampangtengah	kecamatan	200
2611	32.02.09	Warungkiara	kecamatan	200
2612	32.02.10	Cikembar	kecamatan	200
2613	32.02.11	Cibadak	kecamatan	200
2614	32.02.12	Nagrak	kecamatan	200
2615	32.02.13	Parungkuda	kecamatan	200
2616	32.02.14	Bojonggenteng	kecamatan	200
2617	32.02.15	Parakansalak	kecamatan	200
2618	32.02.16	Cicurug	kecamatan	200
2619	32.02.17	Cidahu	kecamatan	200
2620	32.02.18	Kalapanunggal	kecamatan	200
2621	32.02.19	Kabandungan	kecamatan	200
2622	32.02.20	Waluran	kecamatan	200
2623	32.02.21	Jampangkulon	kecamatan	200
2624	32.02.22	Ciemas	kecamatan	200
2625	32.02.23	Kalibunder	kecamatan	200
2626	32.02.24	Surade	kecamatan	200
2627	32.02.25	Cibitung	kecamatan	200
2628	32.02.26	Ciracap	kecamatan	200
2629	32.02.27	Gunungguruh	kecamatan	200
2630	32.02.28	Cicantayan	kecamatan	200
2631	32.02.29	Cisaat	kecamatan	200
2632	32.02.30	Kadudampit	kecamatan	200
2633	32.02.31	Caringin	kecamatan	200
2634	32.02.32	Sukabumi	kecamatan	200
2635	32.02.33	Sukaraja	kecamatan	200
2636	32.02.34	Kebonpedes	kecamatan	200
2637	32.02.35	Cireunghas	kecamatan	200
2638	32.02.36	Sukalarang	kecamatan	200
2639	32.02.37	Pabuaran	kecamatan	200
2640	32.02.38	Purabaya	kecamatan	200
2641	32.02.39	Nyalindung	kecamatan	200
2642	32.02.40	Gegerbitung	kecamatan	200
2643	32.02.41	Sagaranten	kecamatan	200
2644	32.02.42	Curugkembar	kecamatan	200
2645	32.02.43	Cidolog	kecamatan	200
2646	32.02.44	Cidadap	kecamatan	200
2647	32.02.45	Tegalbuleud	kecamatan	200
2648	32.02.46	Cimanggu	kecamatan	200
2649	32.02.47	Ciambar	kecamatan	200
2650	32.03.01	Cianjur	kecamatan	201
2651	32.03.02	Warungkondang	kecamatan	201
2652	32.03.03	Cibeber	kecamatan	201
2653	32.03.04	Cilaku	kecamatan	201
2654	32.03.05	Ciranjang	kecamatan	201
2655	32.03.06	Bonjogpicung	kecamatan	201
2656	32.03.07	Karangtengah	kecamatan	201
2657	32.03.08	Mande	kecamatan	201
2658	32.03.09	Sukaluyu	kecamatan	201
2659	32.03.10	Pacet	kecamatan	201
2660	32.03.11	Cugenang	kecamatan	201
2661	32.03.12	Cikalongkulon	kecamatan	201
2662	32.03.13	Sukaresmi	kecamatan	201
2663	32.03.14	Sukanagara	kecamatan	201
2664	32.03.15	Campaka	kecamatan	201
2665	32.03.16	Takokak	kecamatan	201
2666	32.03.17	Kadupandak	kecamatan	201
2667	32.03.18	Pagelarang	kecamatan	201
2668	32.03.19	Tanggeung	kecamatan	201
2669	32.03.20	Cubinong	kecamatan	201
2670	32.03.21	Sindangbarang	kecamatan	201
2671	32.03.22	Agrabinta	kecamatan	201
2672	32.03.23	Cidaun	kecamatan	201
2673	32.03.24	Naringgul	kecamatan	201
2674	32.03.25	Campakamulya	kecamatan	201
2675	32.03.26	Cikadu	kecamatan	201
2676	32.03.27	Gekbrong	kecamatan	201
2677	32.03.28	Cipanas	kecamatan	201
2678	32.03.29	Cijati	kecamatan	201
2679	32.03.30	Leles	kecamatan	201
2680	32.03.31	Haurwangi	kecamatan	201
2681	32.03.32	Pasirkuda	kecamatan	201
2682	32.04.05	Cileunyi	kecamatan	202
2683	32.04.06	Cimenyan	kecamatan	202
2684	32.04.07	Cilengkrang	kecamatan	202
2685	32.04.08	Bojongsoang	kecamatan	202
2686	32.04.09	Margahayu	kecamatan	202
2687	32.04.10	Margaasih	kecamatan	202
2688	32.04.11	Katapang	kecamatan	202
2689	32.04.12	Dayeuhkolot	kecamatan	202
2690	32.04.13	Banjaran	kecamatan	202
2691	32.04.14	Pameungpeuk	kecamatan	202
2692	32.04.15	Pangalengan	kecamatan	202
2693	32.04.16	Arjasari	kecamatan	202
2694	32.04.17	Cimaung	kecamatan	202
2695	32.04.25	Cicalengka	kecamatan	202
2696	32.04.26	Nagreg	kecamatan	202
2697	32.04.27	Cikancung	kecamatan	202
2698	32.04.28	Rancaekek	kecamatan	202
2699	32.04.29	Ciparay	kecamatan	202
2700	32.04.30	Pacet	kecamatan	202
2701	32.04.31	Kertasari	kecamatan	202
2702	32.04.32	Baleendah	kecamatan	202
2703	32.04.33	Majalaya	kecamatan	202
2704	32.04.34	Solokanjeruk	kecamatan	202
2705	32.04.35	Paseh	kecamatan	202
2706	32.04.36	Ibun	kecamatan	202
2707	32.04.37	Soreang	kecamatan	202
2708	32.04.38	Pasirjambu	kecamatan	202
2709	32.04.39	Ciwidey	kecamatan	202
2710	32.04.40	Rancabali	kecamatan	202
2711	32.04.44	Cangkuang	kecamatan	202
2712	32.04.46	Kutawaringin	kecamatan	202
2713	32.05.01	Garut Kota	kecamatan	203
2714	32.05.02	Karangpawitan	kecamatan	203
2715	32.05.03	Wanaraja	kecamatan	203
2716	32.05.04	Tarogong Kaler	kecamatan	203
2717	32.05.05	Tarogong Kidul	kecamatan	203
2718	32.05.06	Banyuresmi	kecamatan	203
2719	32.05.07	Samarang	kecamatan	203
2720	32.05.08	Pasirwangi	kecamatan	203
2721	32.05.09	Leles	kecamatan	203
2722	32.05.10	Kadungora	kecamatan	203
2723	32.05.11	Leuwigoong	kecamatan	203
2724	32.05.12	Cibatu	kecamatan	203
2725	32.05.13	Kersamanah	kecamatan	203
2726	32.05.14	Malangbong	kecamatan	203
2727	32.05.15	Sukawening	kecamatan	203
2728	32.05.16	Karangtengah	kecamatan	203
2729	32.05.17	Bayongbong	kecamatan	203
2730	32.05.18	Cigedug	kecamatan	203
2731	32.05.19	Cilawu	kecamatan	203
2732	32.05.20	Cisurupan	kecamatan	203
2733	32.05.21	Sukaresmi	kecamatan	203
2734	32.05.22	Cikajang	kecamatan	203
2735	32.05.23	Banjarwangi	kecamatan	203
2736	32.05.24	Singajaya	kecamatan	203
2737	32.05.25	Cihurip	kecamatan	203
2738	32.05.26	Peundeuy	kecamatan	203
2739	32.05.27	Pameungpeuk	kecamatan	203
2740	32.05.28	Cisompet	kecamatan	203
2741	32.05.29	Cibalong	kecamatan	203
2742	32.05.30	Cikelet	kecamatan	203
2743	32.05.31	Bungbulang	kecamatan	203
2744	32.05.32	Mekarmukti	kecamatan	203
2745	32.05.33	Pakenjeng	kecamatan	203
2746	32.05.34	Pamulihan	kecamatan	203
2747	32.05.35	Cisewu	kecamatan	203
2748	32.05.36	Caringin	kecamatan	203
2749	32.05.37	Talegong	kecamatan	203
2750	32.05.38	Limbangan	kecamatan	203
2751	32.05.39	Selaawi	kecamatan	203
2752	32.05.40	Cibiuk	kecamatan	203
2753	32.05.41	Pangatikan	kecamatan	203
2754	32.05.42	Sucinaraja	kecamatan	203
2755	32.06.01	Cipatujah	kecamatan	204
2756	32.06.02	Karangnunggal	kecamatan	204
2757	32.06.03	Cikalong	kecamatan	204
2758	32.06.04	Pancatengah	kecamatan	204
2759	32.06.05	Cikatomas	kecamatan	204
2760	32.06.06	Cibalong	kecamatan	204
2761	32.06.07	Parungponteng	kecamatan	204
2762	32.06.08	Bantarkalong	kecamatan	204
2763	32.06.09	Bojongasih	kecamatan	204
2764	32.06.10	Culamega	kecamatan	204
2765	32.06.11	Bojonggambir	kecamatan	204
2766	32.06.12	Sodonghilir	kecamatan	204
2767	32.06.13	Taraju	kecamatan	204
2768	32.06.14	Salawu	kecamatan	204
2769	32.06.15	Puspahiang	kecamatan	204
2770	32.06.16	Tanjungjaya	kecamatan	204
2771	32.06.17	Sukaraja	kecamatan	204
2772	32.06.18	Salopa	kecamatan	204
2773	32.06.19	Jatiwaras	kecamatan	204
2774	32.06.20	Cineam	kecamatan	204
2775	32.06.21	Karang Jaya	kecamatan	204
2776	32.06.22	Manonjaya	kecamatan	204
2777	32.06.23	Gunung Tanjung	kecamatan	204
2778	32.06.24	Singaparna	kecamatan	204
2779	32.06.25	Mangunreja	kecamatan	204
2780	32.06.26	Sukarame	kecamatan	204
2781	32.06.27	Cigalontang	kecamatan	204
2782	32.06.28	Leuwisari	kecamatan	204
2783	32.06.29	Padakembang	kecamatan	204
2784	32.06.30	Sariwangi	kecamatan	204
2785	32.06.31	Sukaratu	kecamatan	204
2786	32.06.32	Cisayong	kecamatan	204
2787	32.06.33	Sukahening	kecamatan	204
2788	32.06.34	Rajapolah	kecamatan	204
2789	32.06.35	Jamanis	kecamatan	204
2790	32.06.36	Ciawi	kecamatan	204
2791	32.06.37	Kadipaten	kecamatan	204
2792	32.06.38	Pagerageung	kecamatan	204
2793	32.06.39	Sukaresik	kecamatan	204
2794	32.07.01	Ciamis	kecamatan	205
2795	32.07.02	Cikoneng	kecamatan	205
2796	32.07.03	Cijeungjing	kecamatan	205
2797	32.07.04	Sadananya	kecamatan	205
2798	32.07.05	Cidolog	kecamatan	205
2799	32.07.06	Cihaurbeuti	kecamatan	205
2800	32.07.07	Panumbangan	kecamatan	205
2801	32.07.08	Panjalu	kecamatan	205
2802	32.07.09	Kawali	kecamatan	205
2803	32.07.10	Panawangan	kecamatan	205
2804	32.07.11	Cipaku	kecamatan	205
2805	32.07.12	Jatinagara	kecamatan	205
2806	32.07.13	Rajadesa	kecamatan	205
2807	32.07.14	Sukadana	kecamatan	205
2808	32.07.15	Rancah	kecamatan	205
2809	32.07.16	Tambaksari	kecamatan	205
2810	32.07.17	Lakbok	kecamatan	205
2811	32.07.18	Banjarsari	kecamatan	205
2812	32.07.19	Pamarican	kecamatan	205
2813	32.07.29	Cimaragas	kecamatan	205
2814	32.07.30	Cisaga	kecamatan	205
2815	32.07.31	Sindangkasih	kecamatan	205
2816	32.07.32	Baregbeg	kecamatan	205
2817	32.07.33	Sukamantri	kecamatan	205
2818	32.07.34	Lumbung	kecamatan	205
2819	32.07.35	Purwadadi	kecamatan	205
2820	32.07.37	Banjaranyar	kecamatan	205
2821	32.08.01	Kadugede	kecamatan	206
2822	32.08.02	Ciniru	kecamatan	206
2823	32.08.03	Subang	kecamatan	206
2824	32.08.04	Ciwaru	kecamatan	206
2825	32.08.05	Cibingbin	kecamatan	206
2826	32.08.06	Luragung	kecamatan	206
2827	32.08.07	Lebakwangi	kecamatan	206
2828	32.08.08	Garawangi	kecamatan	206
2829	32.08.09	Kuningan	kecamatan	206
2830	32.08.10	Ciawigebang	kecamatan	206
2831	32.08.11	Cidahu	kecamatan	206
2832	32.08.12	Jalaksana	kecamatan	206
2833	32.08.13	Cilimus	kecamatan	206
2834	32.08.14	Mandirancan	kecamatan	206
2835	32.08.15	Selajambe	kecamatan	206
2836	32.08.16	Kramatmulya	kecamatan	206
2837	32.08.17	Darma	kecamatan	206
2838	32.08.18	Cigugur	kecamatan	206
2839	32.08.19	Pasawahan	kecamatan	206
2840	32.08.20	Nusaherang	kecamatan	206
2841	32.08.21	Cipicung	kecamatan	206
2842	32.08.22	Pancalang	kecamatan	206
2843	32.08.23	Japara	kecamatan	206
2844	32.08.24	Cimahi	kecamatan	206
2845	32.08.25	Cilebak	kecamatan	206
2846	32.08.26	Hantara	kecamatan	206
2847	32.08.27	Kalimanggis	kecamatan	206
2848	32.08.28	Cibeureum	kecamatan	206
2849	32.08.29	Karangkancana	kecamatan	206
2850	32.08.30	Maleber	kecamatan	206
2851	32.08.31	Sindangagung	kecamatan	206
2852	32.08.32	Cigandamekar	kecamatan	206
2853	32.09.01	Waled	kecamatan	207
2854	32.09.02	Ciledug	kecamatan	207
2855	32.09.03	Losari	kecamatan	207
2856	32.09.04	Pabedilan	kecamatan	207
2857	32.09.05	Babakan	kecamatan	207
2858	32.09.06	Karangsembung	kecamatan	207
2859	32.09.07	Lemahabang	kecamatan	207
2860	32.09.08	Susukan Lebak	kecamatan	207
2861	32.09.09	Sedong	kecamatan	207
2862	32.09.10	Astanajapura	kecamatan	207
2863	32.09.11	Pangenan	kecamatan	207
2864	32.09.12	Mundu	kecamatan	207
2865	32.09.13	Beber	kecamatan	207
2866	32.09.14	Talun	kecamatan	207
2867	32.09.15	Sumber	kecamatan	207
2868	32.09.16	Dukupuntang	kecamatan	207
2869	32.09.17	Palimanan	kecamatan	207
2870	32.09.18	Plumbon	kecamatan	207
2871	32.09.19	Weru	kecamatan	207
2872	32.09.20	Kedawung	kecamatan	207
2873	32.09.21	Gunung Jati	kecamatan	207
2874	32.09.22	Kepetakan	kecamatan	207
2875	32.09.23	Klangenan	kecamatan	207
2876	32.09.24	Arjawinangun	kecamatan	207
2877	32.09.25	Panguragan	kecamatan	207
2878	32.09.26	Ciwaringin	kecamatan	207
2879	32.09.27	Susukan	kecamatan	207
2880	32.09.28	Gegesik	kecamatan	207
2881	32.09.29	Kaliwedi	kecamatan	207
2882	32.09.30	Gebang	kecamatan	207
2883	32.09.31	Depok	kecamatan	207
2884	32.09.32	Pasaleman	kecamatan	207
2885	32.09.33	Pabuaran	kecamatan	207
2886	32.09.34	Karangwareng	kecamatan	207
2887	32.09.35	Tengah Tani	kecamatan	207
2888	32.09.36	Plered	kecamatan	207
2889	32.09.37	Gempol	kecamatan	207
2890	32.09.38	Greged	kecamatan	207
2891	32.09.39	Suranenggala	kecamatan	207
2892	32.09.40	Jamblang	kecamatan	207
2893	32.10.01	Lemahsugih	kecamatan	208
2894	32.10.02	Bantarujeg	kecamatan	208
2895	32.10.03	Cikijing	kecamatan	208
2896	32.10.04	Talaga	kecamatan	208
2897	32.10.05	Argapura	kecamatan	208
2898	32.10.06	Maja	kecamatan	208
2899	32.10.07	Majalengka	kecamatan	208
2900	32.10.08	Sukahaji	kecamatan	208
2901	32.10.09	Rajagaluh	kecamatan	208
2902	32.10.10	Leuwimunding	kecamatan	208
2903	32.10.11	Jatiwangi	kecamatan	208
2904	32.10.12	Dawuan	kecamatan	208
2905	32.10.13	Kadipaten	kecamatan	208
2906	32.10.14	Kertajati	kecamatan	208
2907	32.10.15	Jatitujuh	kecamatan	208
2908	32.10.16	Ligung	kecamatan	208
2909	32.10.17	Sumberjaya	kecamatan	208
2910	32.10.18	Panyingkiran	kecamatan	208
2911	32.10.19	Palasah	kecamatan	208
2912	32.10.20	Cigasong	kecamatan	208
2913	32.10.21	Sindangwangi	kecamatan	208
2914	32.10.22	Banjaran	kecamatan	208
2915	32.10.23	Cingambul	kecamatan	208
2916	32.10.24	Kasokandel	kecamatan	208
2917	32.10.25	Sindang	kecamatan	208
2918	32.10.26	Malausma	kecamatan	208
2919	32.11.01	Wado	kecamatan	209
2920	32.11.02	Jatinunggal	kecamatan	209
2921	32.11.03	Darmaraja	kecamatan	209
2922	32.11.04	Cibugel	kecamatan	209
2923	32.11.05	Cisitu	kecamatan	209
2924	32.11.06	Situraja	kecamatan	209
2925	32.11.07	Conggeang	kecamatan	209
2926	32.11.08	Paseh	kecamatan	209
2927	32.11.09	Surian	kecamatan	209
2928	32.11.10	Buahdua	kecamatan	209
2929	32.11.11	Tanjungsari	kecamatan	209
2930	32.11.12	Sukasari	kecamatan	209
2931	32.11.13	Pamulihan	kecamatan	209
2932	32.11.14	Cimanggung	kecamatan	209
2933	32.11.15	Jatinangor	kecamatan	209
2934	32.11.16	Rancakalong	kecamatan	209
2935	32.11.17	Sumedang Selatan	kecamatan	209
2936	32.11.18	Sumedang Utara	kecamatan	209
2937	32.11.19	Ganeas	kecamatan	209
2938	32.11.20	Tanjungkerta	kecamatan	209
2939	32.11.21	Tanjungmedar	kecamatan	209
2940	32.11.22	Cimalaka	kecamatan	209
2941	32.11.23	Cisarua	kecamatan	209
2942	32.11.24	Tomo	kecamatan	209
2943	32.11.25	Ujungjaya	kecamatan	209
2944	32.11.26	Jatigede	kecamatan	209
2945	32.12.01	Haurgeulis	kecamatan	210
2946	32.12.02	Kroya	kecamatan	210
2947	32.12.03	Gabuswetan	kecamatan	210
2948	32.12.04	Cikedung	kecamatan	210
2949	32.12.05	Lelea	kecamatan	210
2950	32.12.06	Bangodua	kecamatan	210
2951	32.12.07	Widasari	kecamatan	210
2952	32.12.08	Kertasemaya	kecamatan	210
2953	32.12.09	Krangkeng	kecamatan	210
2954	32.12.10	Karangampel	kecamatan	210
2955	32.12.11	Juntinyuat	kecamatan	210
2956	32.12.12	Sliyeg	kecamatan	210
2957	32.12.13	Jatibarang	kecamatan	210
2958	32.12.14	Balongan	kecamatan	210
2959	32.12.15	Indramayu	kecamatan	210
2960	32.12.16	Sindang	kecamatan	210
2961	32.12.17	Cantigi	kecamatan	210
2962	32.12.18	Lohbener	kecamatan	210
2963	32.12.19	Arahan	kecamatan	210
2964	32.12.20	Losarang	kecamatan	210
2965	32.12.21	Kandanghaur	kecamatan	210
2966	32.12.22	Bongas	kecamatan	210
2967	32.12.23	Anjatan	kecamatan	210
2968	32.12.24	Sukra	kecamatan	210
2969	32.12.25	Gantar	kecamatan	210
2970	32.12.26	Terisi	kecamatan	210
2971	32.12.27	Sukagumiwang	kecamatan	210
2972	32.12.28	Kedokan Bunder	kecamatan	210
2973	32.12.29	Pasekan	kecamatan	210
2974	32.12.30	Tukdana	kecamatan	210
2975	32.12.31	Patrol	kecamatan	210
2976	32.13.01	Sagalaherang	kecamatan	211
2977	32.13.02	Cisalak	kecamatan	211
2978	32.13.03	Subang	kecamatan	211
2979	32.13.04	Kalijati	kecamatan	211
2980	32.13.05	Pabuaran	kecamatan	211
2981	32.13.06	Purwadadi	kecamatan	211
2982	32.13.07	Pagaden	kecamatan	211
2983	32.13.08	Binong	kecamatan	211
2984	32.13.09	Ciasem	kecamatan	211
2985	32.13.10	Pusakanagara	kecamatan	211
2986	32.13.11	Pamanukan	kecamatan	211
2987	32.13.12	Jalancagak	kecamatan	211
2988	32.13.13	Blanakan	kecamatan	211
2989	32.13.14	Tanjungsiang	kecamatan	211
2990	32.13.15	Compreng	kecamatan	211
2991	32.13.16	Patokbeusi	kecamatan	211
2992	32.13.17	Cibogo	kecamatan	211
2993	32.13.18	Cipunagara	kecamatan	211
2994	32.13.19	Cijambe	kecamatan	211
2995	32.13.20	Cipeundeuy	kecamatan	211
2996	32.13.21	Legonkulon	kecamatan	211
2997	32.13.22	Cikaum	kecamatan	211
2998	32.13.23	Serangpanjang	kecamatan	211
2999	32.13.24	Sukasari	kecamatan	211
3000	32.13.25	Tambakdahan	kecamatan	211
3001	32.13.26	Kasomalang	kecamatan	211
3002	32.13.27	Dawuan	kecamatan	211
3003	32.13.28	Pagaden Barat	kecamatan	211
3004	32.13.29	Ciater	kecamatan	211
3005	32.13.30	Pusakajaya	kecamatan	211
3006	32.14.01	Purwakarta	kecamatan	212
3007	32.14.02	Campaka	kecamatan	212
3008	32.14.03	Jatiluhur	kecamatan	212
3009	32.14.04	Plered	kecamatan	212
3010	32.14.05	Sukatani	kecamatan	212
3011	32.14.06	Darangdan	kecamatan	212
3012	32.14.07	Maniis	kecamatan	212
3013	32.14.08	Tegalwaru	kecamatan	212
3014	32.14.09	Wanayasa	kecamatan	212
3015	32.14.10	Pasawahan	kecamatan	212
3016	32.14.11	Bojong	kecamatan	212
3017	32.14.12	Babakancikao	kecamatan	212
3018	32.14.13	Bungursari	kecamatan	212
3019	32.14.14	Cibatu	kecamatan	212
3020	32.14.15	Sukasari	kecamatan	212
3021	32.14.16	Pondoksalam	kecamatan	212
3022	32.14.17	Kiarapedes	kecamatan	212
3023	32.15.01	Karawang Barat	kecamatan	213
3024	32.15.02	Pangkalan	kecamatan	213
3025	32.15.03	Telukjambe Timur	kecamatan	213
3026	32.15.04	Ciampel	kecamatan	213
3027	32.15.05	Klari	kecamatan	213
3028	32.15.06	Rengasdengklok	kecamatan	213
3029	32.15.07	Kutawaluya	kecamatan	213
3030	32.15.08	Batujaya	kecamatan	213
3031	32.15.09	Tirtajaya	kecamatan	213
3032	32.15.10	Pedes	kecamatan	213
3033	32.15.11	Cibuaya	kecamatan	213
3034	32.15.12	Pakisjaya	kecamatan	213
3035	32.15.13	Cikampek	kecamatan	213
3036	32.15.14	Jatisari	kecamatan	213
3037	32.15.15	Cilamaya Wetan	kecamatan	213
3038	32.15.16	Tirtamulya	kecamatan	213
3039	32.15.17	Telagasari	kecamatan	213
3040	32.15.18	Rawamerta	kecamatan	213
3041	32.15.19	Lemahabang	kecamatan	213
3042	32.15.20	Tempuran	kecamatan	213
3043	32.15.21	Majalaya	kecamatan	213
3044	32.15.22	Jayakerta	kecamatan	213
3045	32.15.23	Cilamaya Kulon	kecamatan	213
3046	32.15.24	Banyusari	kecamatan	213
3047	32.15.25	Kota Baru	kecamatan	213
3048	32.15.26	Karawang Timur	kecamatan	213
3049	32.15.27	Telukjambe Barat	kecamatan	213
3050	32.15.28	Tegalwaru	kecamatan	213
3051	32.15.29	Purwasari	kecamatan	213
3052	32.15.30	Cilebar	kecamatan	213
3053	32.16.01	Tarumajaya	kecamatan	214
3054	32.16.02	Babelan	kecamatan	214
3055	32.16.03	Sukawangi	kecamatan	214
3056	32.16.04	Tambelang	kecamatan	214
3057	32.16.05	Tambun Utara	kecamatan	214
3058	32.16.06	Tambun Selatan	kecamatan	214
3059	32.16.07	Cibitung	kecamatan	214
3060	32.16.08	Cikarang Barat	kecamatan	214
3061	32.16.09	Cikarang Utara	kecamatan	214
3062	32.16.10	Karang Bahagia	kecamatan	214
3063	32.16.11	Cikarang Timur	kecamatan	214
3064	32.16.12	Kedung Waringin	kecamatan	214
3065	32.16.13	Pebayuran	kecamatan	214
3066	32.16.14	Sukakarya	kecamatan	214
3067	32.16.15	Sukatani	kecamatan	214
3068	32.16.16	Cabangbungin	kecamatan	214
3069	32.16.17	Muaragembong	kecamatan	214
3070	32.16.18	Setu	kecamatan	214
3071	32.16.19	Cikarang Selatan	kecamatan	214
3072	32.16.20	Cikarang Pusat	kecamatan	214
3073	32.16.21	Serang Baru	kecamatan	214
3074	32.16.22	Cibarusah	kecamatan	214
3075	32.16.23	Bojongmangu	kecamatan	214
3076	32.17.01	Lembang	kecamatan	215
3077	32.17.02	Parongpong	kecamatan	215
3078	32.17.03	Cisarua	kecamatan	215
3079	32.17.04	Cikalongwetan	kecamatan	215
3080	32.17.05	Cipeundeuy	kecamatan	215
3081	32.17.06	Ngamprah	kecamatan	215
3082	32.17.07	Cipatat	kecamatan	215
3083	32.17.08	Padalarang	kecamatan	215
3084	32.17.09	Batujajar	kecamatan	215
3085	32.17.10	Cihampelas	kecamatan	215
3086	32.17.11	Cililin	kecamatan	215
3087	32.17.12	Cipongkor	kecamatan	215
3088	32.17.13	Rongga	kecamatan	215
3089	32.17.14	Sindangkerta	kecamatan	215
3090	32.17.15	Gununghalu	kecamatan	215
3091	32.17.16	Saguling	kecamatan	215
3092	32.18.01	Parigi	kecamatan	216
3093	32.18.02	Cijulang	kecamatan	216
3094	32.18.03	Cimerak	kecamatan	216
3095	32.18.04	Cigugur	kecamatan	216
3096	32.18.05	Langkaplancar	kecamatan	216
3097	32.18.06	Mangunjaya	kecamatan	216
3098	32.18.07	Padaherang	kecamatan	216
3099	32.18.08	Kalipucang	kecamatan	216
3100	32.18.09	Pangandaran	kecamatan	216
3101	32.18.10	Sidamulih	kecamatan	216
3102	32.71.01	Bogor Selatan	kecamatan	217
3103	32.71.02	Bogor Timur	kecamatan	217
3104	32.71.03	Bogor Tengah	kecamatan	217
3105	32.71.04	Bogor Barat	kecamatan	217
3106	32.71.05	Bogor Utara	kecamatan	217
3107	32.71.06	Tanah Sareal	kecamatan	217
3108	32.72.01	Gunung Puyuh	kecamatan	218
3109	32.72.02	Cikole	kecamatan	218
3110	32.72.03	Citamiang	kecamatan	218
3111	32.72.04	Warudoyong	kecamatan	218
3112	32.72.05	Baros	kecamatan	218
3113	32.72.06	Lembursitu	kecamatan	218
3114	32.72.07	Cibeureum	kecamatan	218
3115	32.73.01	Sukasari	kecamatan	219
3116	32.73.02	Coblong	kecamatan	219
3117	32.73.03	Babakan Ciparay	kecamatan	219
3118	32.73.04	Bojongloa Kaler	kecamatan	219
3119	32.73.05	Andir	kecamatan	219
3120	32.73.06	Cicendo	kecamatan	219
3121	32.73.07	Sukajadi	kecamatan	219
3122	32.73.08	Cidadap	kecamatan	219
3123	32.73.09	Bandung Wetan	kecamatan	219
3124	32.73.10	Astanaanyar	kecamatan	219
3125	32.73.11	Regol	kecamatan	219
3126	32.73.12	Batununggal	kecamatan	219
3127	32.73.13	Lengkong	kecamatan	219
3128	32.73.14	Cibeunying Kidul	kecamatan	219
3129	32.73.15	Bandung Kulon	kecamatan	219
3130	32.73.16	Kiaracondong	kecamatan	219
3131	32.73.17	Bojongloa Kidul	kecamatan	219
3132	32.73.18	Cibeunying Kaler	kecamatan	219
3133	32.73.19	Sumur Bandung	kecamatan	219
3134	32.73.20	Antapani	kecamatan	219
3135	32.73.21	Bandung Kidul	kecamatan	219
3136	32.73.22	Buahbatu	kecamatan	219
3137	32.73.23	Rancasari	kecamatan	219
3138	32.73.24	Arcamanik	kecamatan	219
3139	32.73.25	Cibiru	kecamatan	219
3140	32.73.26	Ujungberung	kecamatan	219
3141	32.73.27	Gedebage	kecamatan	219
3142	32.73.28	Panyileukan	kecamatan	219
3143	32.73.29	Cinambo	kecamatan	219
3144	32.73.30	Mandalajati	kecamatan	219
3145	32.74.01	Kejaksan	kecamatan	220
3146	32.74.02	Lemahwungkuk	kecamatan	220
3147	32.74.03	Harjamukti	kecamatan	220
3148	32.74.04	Pekalipan	kecamatan	220
3149	32.74.05	Kesambi	kecamatan	220
3150	32.75.01	Bekasi Timur	kecamatan	221
3151	32.75.02	Bekasi Barat	kecamatan	221
3152	32.75.03	Bekasi Utara	kecamatan	221
3153	32.75.04	Bekasi Selatan	kecamatan	221
3154	32.75.05	Rawalumbu	kecamatan	221
3155	32.75.06	Medansatria	kecamatan	221
3156	32.75.07	Bantargebang	kecamatan	221
3157	32.75.08	Pondokgede	kecamatan	221
3158	32.75.09	Jatiasih	kecamatan	221
3159	32.75.10	Jatisampurna	kecamatan	221
3160	32.75.11	Mustikajaya	kecamatan	221
3161	32.75.12	Pondokmelati	kecamatan	221
3162	32.76.01	Pancoran Mas	kecamatan	222
3163	32.76.02	Cimanggis	kecamatan	222
3164	32.76.03	Sawangan	kecamatan	222
3165	32.76.04	Limo	kecamatan	222
3166	32.76.05	Sukmajaya	kecamatan	222
3167	32.76.06	Beji	kecamatan	222
3168	32.76.07	Cipayung	kecamatan	222
3169	32.76.08	Cilodong	kecamatan	222
3170	32.76.09	Cinere	kecamatan	222
3171	32.76.10	Tapos	kecamatan	222
3172	32.76.11	Bojongsari	kecamatan	222
3173	32.77.01	Cimahi Selatan	kecamatan	223
3174	32.77.02	Cimahi Tengah	kecamatan	223
3175	32.77.03	Cimahi Utara	kecamatan	223
3176	32.78.01	Cihideung	kecamatan	224
3177	32.78.02	Cipedes	kecamatan	224
3178	32.78.03	Tawang	kecamatan	224
3179	32.78.04	Indihiang	kecamatan	224
3180	32.78.05	Kawalu	kecamatan	224
3181	32.78.06	Cibeureum	kecamatan	224
3182	32.78.07	Tamansari	kecamatan	224
3183	32.78.08	Mangkubumi	kecamatan	224
3184	32.78.09	Bungursari	kecamatan	224
3185	32.78.10	Purbaratu	kecamatan	224
3186	32.79.01	Banjar	kecamatan	225
3187	32.79.02	Pataruman	kecamatan	225
3188	32.79.03	Purwaharja	kecamatan	225
3189	32.79.04	Langensari	kecamatan	225
3190	33.01.01	Kedungreja	kecamatan	226
3191	33.01.02	Kesugihan	kecamatan	226
3192	33.01.03	Adipala	kecamatan	226
3193	33.01.04	Binangun	kecamatan	226
3194	33.01.05	Nusawungu	kecamatan	226
3195	33.01.06	Kroya	kecamatan	226
3196	33.01.07	Maos	kecamatan	226
3197	33.01.08	Jeruklegi	kecamatan	226
3198	33.01.09	Kawunganten	kecamatan	226
3199	33.01.10	Gandrungmangu	kecamatan	226
3200	33.01.11	Sidareja	kecamatan	226
3201	33.01.12	Karangpucung	kecamatan	226
3202	33.01.13	Cimanggu	kecamatan	226
3203	33.01.14	Majenang	kecamatan	226
3204	33.01.15	Wanareja	kecamatan	226
3205	33.01.16	Dayeuhluhur	kecamatan	226
3206	33.01.17	Sampang	kecamatan	226
3207	33.01.18	Cipari	kecamatan	226
3208	33.01.19	Patimuan	kecamatan	226
3209	33.01.20	Bantarsari	kecamatan	226
3210	33.01.21	Cilacap Selatan	kecamatan	226
3211	33.01.22	Cilacap Tengah	kecamatan	226
3212	33.01.23	Cilacap Utara	kecamatan	226
3213	33.01.24	Kampung Laut	kecamatan	226
3214	33.02.01	Lumbir	kecamatan	227
3215	33.02.02	Wangon	kecamatan	227
3216	33.02.03	Jatilawang	kecamatan	227
3217	33.02.04	Rawalo	kecamatan	227
3218	33.02.05	Kebasen	kecamatan	227
3219	33.02.06	Kemranjen	kecamatan	227
3220	33.02.07	Sumpiuh	kecamatan	227
3221	33.02.08	Tambak	kecamatan	227
3222	33.02.09	Somagede	kecamatan	227
3223	33.02.10	Kalibagor	kecamatan	227
3224	33.02.11	Banyumas	kecamatan	227
3225	33.02.12	Patikraja	kecamatan	227
3226	33.02.13	Purwojati	kecamatan	227
3227	33.02.14	Ajibarang	kecamatan	227
3228	33.02.15	Gumelar	kecamatan	227
3229	33.02.16	Pekuncen	kecamatan	227
3230	33.02.17	Cilongok	kecamatan	227
3231	33.02.18	Karanglewas	kecamatan	227
3232	33.02.19	Sokaraja	kecamatan	227
3233	33.02.20	Kembaran	kecamatan	227
3234	33.02.21	Sumbang	kecamatan	227
3235	33.02.22	Baturraden	kecamatan	227
3236	33.02.23	Kedungbanteng	kecamatan	227
3237	33.02.24	Purwokerto Selatan	kecamatan	227
3238	33.02.25	Purwokerto Barat	kecamatan	227
3239	33.02.26	Purwokerto Timur	kecamatan	227
3240	33.02.27	Purwokerto Utara	kecamatan	227
3241	33.03.01	Kemangkon	kecamatan	228
3242	33.03.02	Bukateja	kecamatan	228
3243	33.03.03	Kejobong	kecamatan	228
3244	33.03.04	Kaligondang	kecamatan	228
3245	33.03.05	Purbalingga	kecamatan	228
3246	33.03.06	Kalimanah	kecamatan	228
3247	33.03.07	Kutasari	kecamatan	228
3248	33.03.08	Mrebet	kecamatan	228
3249	33.03.09	Bobotsari	kecamatan	228
3250	33.03.10	Karangreja	kecamatan	228
3251	33.03.11	Karanganyar	kecamatan	228
3252	33.03.12	Karangmoncol	kecamatan	228
3253	33.03.13	Rembang	kecamatan	228
3254	33.03.14	Bojongsari	kecamatan	228
3255	33.03.15	Padamara	kecamatan	228
3256	33.03.16	Pengadegan	kecamatan	228
3257	33.03.17	Karangjambu	kecamatan	228
3258	33.03.18	Kertanegara	kecamatan	228
3259	33.04.01	Susukan	kecamatan	229
3260	33.04.02	Purworeja Klampok	kecamatan	229
3261	33.04.03	Mandiraja	kecamatan	229
3262	33.04.04	Purwanegara	kecamatan	229
3263	33.04.05	Bawang	kecamatan	229
3264	33.04.06	Banjarnegara	kecamatan	229
3265	33.04.07	Sigaluh	kecamatan	229
3266	33.04.08	Madukara	kecamatan	229
3267	33.04.09	Banjarmangu	kecamatan	229
3268	33.04.10	Wanadadi	kecamatan	229
3269	33.04.11	Rakit	kecamatan	229
3270	33.04.12	Punggelan	kecamatan	229
3271	33.04.13	Karangkobar	kecamatan	229
3272	33.04.14	Pagentan	kecamatan	229
3273	33.04.15	Pejawaran	kecamatan	229
3274	33.04.16	Batur	kecamatan	229
3275	33.04.17	Wanayasa	kecamatan	229
3276	33.04.18	Kalibening	kecamatan	229
3277	33.04.19	Pandanarum	kecamatan	229
3278	33.04.20	Pagedongan	kecamatan	229
3279	33.05.01	Ayah	kecamatan	230
3280	33.05.02	Buayan	kecamatan	230
3281	33.05.03	Puring	kecamatan	230
3282	33.05.04	Petanahan	kecamatan	230
3283	33.05.05	Klirong	kecamatan	230
3284	33.05.06	Buluspesantren	kecamatan	230
3285	33.05.07	Ambal	kecamatan	230
3286	33.05.08	Mirit	kecamatan	230
3287	33.05.09	Prembun	kecamatan	230
3288	33.05.10	Kutowinangun	kecamatan	230
3289	33.05.11	Alian	kecamatan	230
3290	33.05.12	Kebumen	kecamatan	230
3291	33.05.13	Pejagoan	kecamatan	230
3292	33.05.14	Sruweng	kecamatan	230
3293	33.05.15	Adimulyo	kecamatan	230
3294	33.05.16	Kuwarasan	kecamatan	230
3295	33.05.17	Rowokele	kecamatan	230
3296	33.05.18	Sempor	kecamatan	230
3297	33.05.19	Gombong	kecamatan	230
3298	33.05.20	Karanganyar	kecamatan	230
3299	33.05.21	Karanggayam	kecamatan	230
3300	33.05.22	Sadang	kecamatan	230
3301	33.05.23	Bonorowo	kecamatan	230
3302	33.05.24	Padureso	kecamatan	230
3303	33.05.25	Poncowarno	kecamatan	230
3304	33.05.26	Karangsambung	kecamatan	230
3305	33.06.01	Grabag	kecamatan	231
3306	33.06.02	Ngombol	kecamatan	231
3307	33.06.03	Purwodadi	kecamatan	231
3308	33.06.04	Bagelen	kecamatan	231
3309	33.06.05	Kaligesing	kecamatan	231
3310	33.06.06	Purworejo	kecamatan	231
3311	33.06.07	Banyuurip	kecamatan	231
3312	33.06.08	Bayan	kecamatan	231
3313	33.06.09	Kutoarjo	kecamatan	231
3314	33.06.10	Butuh	kecamatan	231
3315	33.06.11	Pituruh	kecamatan	231
3316	33.06.12	Kemiri	kecamatan	231
3317	33.06.13	Bruno	kecamatan	231
3318	33.06.14	Gebang	kecamatan	231
3319	33.06.15	Loano	kecamatan	231
3320	33.06.16	Bener	kecamatan	231
3321	33.07.01	Wadaslintang	kecamatan	232
3322	33.07.02	Kepil	kecamatan	232
3323	33.07.03	Sapuran	kecamatan	232
3324	33.07.04	Kaliwiro	kecamatan	232
3325	33.07.05	Leksono	kecamatan	232
3326	33.07.06	Selomerto	kecamatan	232
3327	33.07.07	Kalikajar	kecamatan	232
3328	33.07.08	Kertek	kecamatan	232
3329	33.07.09	Wonosobo	kecamatan	232
3330	33.07.10	Watumalang	kecamatan	232
3331	33.07.11	Mojotengah	kecamatan	232
3332	33.07.12	Garung	kecamatan	232
3333	33.07.13	Kejajar	kecamatan	232
3334	33.07.14	Sukoharjo	kecamatan	232
3335	33.07.15	Kalibawang	kecamatan	232
3336	33.08.01	Salaman	kecamatan	233
3337	33.08.02	Borobudur	kecamatan	233
3338	33.08.03	Ngluwar	kecamatan	233
3339	33.08.04	Salam	kecamatan	233
3340	33.08.05	Srumbung	kecamatan	233
3341	33.08.06	Dukun	kecamatan	233
3342	33.08.07	Sawangan	kecamatan	233
3343	33.08.08	Muntilan	kecamatan	233
3344	33.08.09	Mungkid	kecamatan	233
3345	33.08.10	Mertoyudan	kecamatan	233
3346	33.08.11	Tempuran	kecamatan	233
3347	33.08.12	Kajoran	kecamatan	233
3348	33.08.13	Kaliangkrik	kecamatan	233
3349	33.08.14	Bandongan	kecamatan	233
3350	33.08.15	Candimulyo	kecamatan	233
3351	33.08.16	Pakis	kecamatan	233
3352	33.08.17	Ngablak	kecamatan	233
3353	33.08.18	Grabag	kecamatan	233
3354	33.08.19	Tegalrejo	kecamatan	233
3355	33.08.20	Secang	kecamatan	233
3356	33.08.21	Windusari	kecamatan	233
3357	33.09.01	Selo	kecamatan	234
3358	33.09.02	Ampel	kecamatan	234
3359	33.09.03	Cepogo	kecamatan	234
3360	33.09.04	Musuk	kecamatan	234
3361	33.09.05	Boyolali	kecamatan	234
3362	33.09.06	Mojosongo	kecamatan	234
3363	33.09.07	Teras	kecamatan	234
3364	33.09.08	Sawit	kecamatan	234
3365	33.09.09	Banyudono	kecamatan	234
3366	33.09.10	Sambi	kecamatan	234
3367	33.09.11	Ngemplak	kecamatan	234
3368	33.09.12	Nogosari	kecamatan	234
3369	33.09.13	Simo	kecamatan	234
3370	33.09.14	Karanggede	kecamatan	234
3371	33.09.15	Klego	kecamatan	234
3372	33.09.16	Andong	kecamatan	234
3373	33.09.17	Kemusu	kecamatan	234
3374	33.09.18	Wonosegoro	kecamatan	234
3375	33.09.19	Juwangi	kecamatan	234
3376	33.09.20	Gladagsari	kecamatan	234
3377	33.09.21	Tamansari	kecamatan	234
3378	33.09.22	Wonosamodro	kecamatan	234
3379	33.10.01	Prambanan	kecamatan	235
3380	33.10.02	Gantiwarno	kecamatan	235
3381	33.10.03	Wedi	kecamatan	235
3382	33.10.04	Bayat	kecamatan	235
3383	33.10.05	Cawas	kecamatan	235
3384	33.10.06	Trucuk	kecamatan	235
3385	33.10.07	Kebonarum	kecamatan	235
3386	33.10.08	Jogonalan	kecamatan	235
3387	33.10.09	Manisrenggo	kecamatan	235
3388	33.10.10	Karangnongko	kecamatan	235
3389	33.10.11	Ceper	kecamatan	235
3390	33.10.12	Pedan	kecamatan	235
3391	33.10.13	Karangdowo	kecamatan	235
3392	33.10.14	Juwiring	kecamatan	235
3393	33.10.15	Wonosari	kecamatan	235
3394	33.10.16	Delanggu	kecamatan	235
3395	33.10.17	Polanharjo	kecamatan	235
3396	33.10.18	Karanganom	kecamatan	235
3397	33.10.19	Tulung	kecamatan	235
3398	33.10.20	Jatinom	kecamatan	235
3399	33.10.21	Kemalang	kecamatan	235
3400	33.10.22	Ngawen	kecamatan	235
3401	33.10.23	Kalikotes	kecamatan	235
3402	33.10.24	Klaten Utara	kecamatan	235
3403	33.10.25	Klaten Tengah	kecamatan	235
3404	33.10.26	Klaten Selatan	kecamatan	235
3405	33.11.01	Weru	kecamatan	236
3406	33.11.02	Bulu	kecamatan	236
3407	33.11.03	Tawangsari	kecamatan	236
3408	33.11.04	Sukoharjo	kecamatan	236
3409	33.11.05	Nguter	kecamatan	236
3410	33.11.06	Bendosari	kecamatan	236
3411	33.11.07	Polokarto	kecamatan	236
3412	33.11.08	Mojolaban	kecamatan	236
3413	33.11.09	Grogol	kecamatan	236
3414	33.11.10	Baki	kecamatan	236
3415	33.11.11	Gatak	kecamatan	236
3416	33.11.12	Kartasura	kecamatan	236
3417	33.12.01	Pracimantoro	kecamatan	237
3418	33.12.02	Giritontro	kecamatan	237
3419	33.12.03	Giriwoyo	kecamatan	237
3420	33.12.04	Batuwarno	kecamatan	237
3421	33.12.05	Tirtomoyo	kecamatan	237
3422	33.12.06	Nguntoronadi	kecamatan	237
3423	33.12.07	Baturetno	kecamatan	237
3424	33.12.08	Eromoko	kecamatan	237
3425	33.12.09	Wuryantoro	kecamatan	237
3426	33.12.10	Manyaran	kecamatan	237
3427	33.12.11	Selogiri	kecamatan	237
3428	33.12.12	Wonogiri	kecamatan	237
3429	33.12.13	Ngadirojo	kecamatan	237
3430	33.12.14	Sidoharjo	kecamatan	237
3431	33.12.15	Jatiroto	kecamatan	237
3432	33.12.16	Kismantoro	kecamatan	237
3433	33.12.17	Purwantoro	kecamatan	237
3434	33.12.18	Bulukerto	kecamatan	237
3435	33.12.19	Slogohimo	kecamatan	237
3436	33.12.20	Jatisrono	kecamatan	237
3437	33.12.21	Jatipurno	kecamatan	237
3438	33.12.22	Girimarto	kecamatan	237
3439	33.12.23	Karangtengah	kecamatan	237
3440	33.12.24	Paranggupito	kecamatan	237
3441	33.12.25	Puhpelem	kecamatan	237
3442	33.13.01	Jatipuro	kecamatan	238
3443	33.13.02	Jatiyoso	kecamatan	238
3444	33.13.03	Jumapolo	kecamatan	238
3445	33.13.04	Jumantono	kecamatan	238
3446	33.13.05	Matesih	kecamatan	238
3447	33.13.06	Tawangmangu	kecamatan	238
3448	33.13.07	Ngargoyoso	kecamatan	238
3449	33.13.08	Karangpandan	kecamatan	238
3450	33.13.09	Karanganyar	kecamatan	238
3451	33.13.10	Tasikmadu	kecamatan	238
3452	33.13.11	Jaten	kecamatan	238
3453	33.13.12	Colomadu	kecamatan	238
3454	33.13.13	Gondangrejo	kecamatan	238
3455	33.13.14	Kebakkramat	kecamatan	238
3456	33.13.15	Mojogedang	kecamatan	238
3457	33.13.16	Kerjo	kecamatan	238
3458	33.13.17	Jenawi	kecamatan	238
3459	33.14.01	Kalijambe	kecamatan	239
3460	33.14.02	Plupuh	kecamatan	239
3461	33.14.03	Masaran	kecamatan	239
3462	33.14.04	Kedawung	kecamatan	239
3463	33.14.05	Sambirejo	kecamatan	239
3464	33.14.06	Gondang	kecamatan	239
3465	33.14.07	Sambungmacan	kecamatan	239
3466	33.14.08	Ngrampal	kecamatan	239
3467	33.14.09	Karangmalang	kecamatan	239
3468	33.14.10	Sragen	kecamatan	239
3469	33.14.11	Sidoharjo	kecamatan	239
3470	33.14.12	Tanon	kecamatan	239
3471	33.14.13	Gemolong	kecamatan	239
3472	33.14.14	Miri	kecamatan	239
3473	33.14.15	Sumberlawang	kecamatan	239
3474	33.14.16	Mondokan	kecamatan	239
3475	33.14.17	Sukodono	kecamatan	239
3476	33.14.18	Gesi	kecamatan	239
3477	33.14.19	Tangen	kecamatan	239
3478	33.14.20	Jenar	kecamatan	239
3479	33.15.01	Kedungjati	kecamatan	240
3480	33.15.02	Karangrayung	kecamatan	240
3481	33.15.03	Penawangan	kecamatan	240
3482	33.15.04	Toroh	kecamatan	240
3483	33.15.05	Geyer	kecamatan	240
3484	33.15.06	Pulokulon	kecamatan	240
3485	33.15.07	Kradenan	kecamatan	240
3486	33.15.08	Gabus	kecamatan	240
3487	33.15.09	Ngaringan	kecamatan	240
3488	33.15.10	Wirosari	kecamatan	240
3489	33.15.11	Tawangharjo	kecamatan	240
3490	33.15.12	Grobogan	kecamatan	240
3491	33.15.13	Purwodadi	kecamatan	240
3492	33.15.14	Brati	kecamatan	240
3493	33.15.15	Klambu	kecamatan	240
3494	33.15.16	Godong	kecamatan	240
3495	33.15.17	Gubug	kecamatan	240
3496	33.15.18	Tegowanu	kecamatan	240
3497	33.15.19	Tanggungharjo	kecamatan	240
3498	33.16.01	Jati	kecamatan	241
3499	33.16.02	Randublatung	kecamatan	241
3500	33.16.03	Kradenan	kecamatan	241
3501	33.16.04	Kedungtuban	kecamatan	241
3502	33.16.05	Cepu	kecamatan	241
3503	33.16.06	Sambong	kecamatan	241
3504	33.16.07	Jiken	kecamatan	241
3505	33.16.08	Jepon	kecamatan	241
3506	33.16.09	Blora	kecamatan	241
3507	33.16.10	Tunjungan	kecamatan	241
3508	33.16.11	Banjarejo	kecamatan	241
3509	33.16.12	Ngawen	kecamatan	241
3510	33.16.13	Kunduran	kecamatan	241
3511	33.16.14	Todanan	kecamatan	241
3512	33.16.15	Bogorejo	kecamatan	241
3513	33.16.16	Japah	kecamatan	241
3514	33.17.01	Sumber	kecamatan	242
3515	33.17.02	Bulu	kecamatan	242
3516	33.17.03	Gunem	kecamatan	242
3517	33.17.04	Sale	kecamatan	242
3518	33.17.05	Sarang	kecamatan	242
3519	33.17.06	Sedan	kecamatan	242
3520	33.17.07	Pamotan	kecamatan	242
3521	33.17.08	Sulang	kecamatan	242
3522	33.17.09	Kaliori	kecamatan	242
3523	33.17.10	Rembang	kecamatan	242
3524	33.17.11	Pancur	kecamatan	242
3525	33.17.12	Kragan	kecamatan	242
3526	33.17.13	Sluke	kecamatan	242
3527	33.17.14	Lasem	kecamatan	242
3528	33.18.01	Sukolilo	kecamatan	243
3529	33.18.02	Kayen	kecamatan	243
3530	33.18.03	Tambakromo	kecamatan	243
3531	33.18.04	Winong	kecamatan	243
3532	33.18.05	Pucakwangi	kecamatan	243
3533	33.18.06	Jaken	kecamatan	243
3534	33.18.07	Batangan	kecamatan	243
3535	33.18.08	Juwana	kecamatan	243
3536	33.18.09	Jakenan	kecamatan	243
3537	33.18.10	Pati	kecamatan	243
3538	33.18.11	Gabus	kecamatan	243
3539	33.18.12	Margorejo	kecamatan	243
3540	33.18.13	Gembong	kecamatan	243
3541	33.18.14	Tlogowungu	kecamatan	243
3542	33.18.15	Wedarijaksa	kecamatan	243
3543	33.18.16	Margoyoso	kecamatan	243
3544	33.18.17	Gunungwungkal	kecamatan	243
3545	33.18.18	Cluwak	kecamatan	243
3546	33.18.19	Tayu	kecamatan	243
3547	33.18.20	Dukuhseti	kecamatan	243
3548	33.18.21	Trangkil	kecamatan	243
3549	33.19.01	Kaliwungu	kecamatan	244
3550	33.19.02	Kota Kudus	kecamatan	244
3551	33.19.03	Jati	kecamatan	244
3552	33.19.04	Undaan	kecamatan	244
3553	33.19.05	Mejobo	kecamatan	244
3554	33.19.06	Jekulo	kecamatan	244
3555	33.19.07	Bae	kecamatan	244
3556	33.19.08	Gebog	kecamatan	244
3557	33.19.09	Dawe	kecamatan	244
3558	33.20.01	Kedung	kecamatan	245
3559	33.20.02	Pecangaan	kecamatan	245
3560	33.20.03	Welahan	kecamatan	245
3561	33.20.04	Mayong	kecamatan	245
3562	33.20.05	Batealit	kecamatan	245
3563	33.20.06	Jepara	kecamatan	245
3564	33.20.07	Mlonggo	kecamatan	245
3565	33.20.08	Bangsri	kecamatan	245
3566	33.20.09	Keling	kecamatan	245
3567	33.20.10	Karimunjawa	kecamatan	245
3568	33.20.11	Tahunan	kecamatan	245
3569	33.20.12	Nalumsari	kecamatan	245
3570	33.20.13	Kalinyamatan	kecamatan	245
3571	33.20.14	Kembang	kecamatan	245
3572	33.20.15	Pakis Aji	kecamatan	245
3573	33.20.16	Donorojo	kecamatan	245
3574	33.21.01	Mranggen	kecamatan	246
3575	33.21.02	Karangawen	kecamatan	246
3576	33.21.03	Guntur	kecamatan	246
3577	33.21.04	Sayung	kecamatan	246
3578	33.21.05	Karangtengah	kecamatan	246
3579	33.21.06	Wonosalam	kecamatan	246
3580	33.21.07	Dempet	kecamatan	246
3581	33.21.08	Gajah	kecamatan	246
3582	33.21.09	Karanganyar	kecamatan	246
3583	33.21.10	Mijen	kecamatan	246
3584	33.21.11	Demak	kecamatan	246
3585	33.21.12	Bonang	kecamatan	246
3586	33.21.13	Wedung	kecamatan	246
3587	33.21.14	Kebonagung	kecamatan	246
3588	33.22.01	Getasan	kecamatan	247
3589	33.22.02	Tengaran	kecamatan	247
3590	33.22.03	Susukan	kecamatan	247
3591	33.22.04	Suruh	kecamatan	247
3592	33.22.05	Pabelan	kecamatan	247
3593	33.22.06	Tuntang	kecamatan	247
3594	33.22.07	Banyubiru	kecamatan	247
3595	33.22.08	Jambu	kecamatan	247
3596	33.22.09	Sumowono	kecamatan	247
3597	33.22.10	Ambarawa	kecamatan	247
3598	33.22.11	Bawen	kecamatan	247
3599	33.22.12	Bringin	kecamatan	247
3600	33.22.13	Bergas	kecamatan	247
3601	33.22.15	Pringapus	kecamatan	247
3602	33.22.16	Bancak	kecamatan	247
3603	33.22.17	Kaliwungu	kecamatan	247
3604	33.22.18	Ungaran Barat	kecamatan	247
3605	33.22.19	Ungaran Timur	kecamatan	247
3606	33.22.20	Bandungan	kecamatan	247
3607	33.23.01	Bulu	kecamatan	248
3608	33.23.02	Tembarak	kecamatan	248
3609	33.23.03	Temanggung	kecamatan	248
3610	33.23.04	Pringsurat	kecamatan	248
3611	33.23.05	Kaloran	kecamatan	248
3612	33.23.06	Kandangan	kecamatan	248
3613	33.23.07	Kedu	kecamatan	248
3614	33.23.08	Parakan	kecamatan	248
3615	33.23.09	Ngadirejo	kecamatan	248
3616	33.23.10	Jumo	kecamatan	248
3617	33.23.11	Tretep	kecamatan	248
3618	33.23.12	Candiroto	kecamatan	248
3619	33.23.13	Kranggan	kecamatan	248
3620	33.23.14	Tlogomulyo	kecamatan	248
3621	33.23.15	Selopampang	kecamatan	248
3622	33.23.16	Bansari	kecamatan	248
3623	33.23.17	Kledung	kecamatan	248
3624	33.23.18	Bejen	kecamatan	248
3625	33.23.19	Wonoboyo	kecamatan	248
3626	33.23.20	Gemawang	kecamatan	248
3627	33.24.01	Plantungan	kecamatan	249
3628	33.24.02	Pageruyung	kecamatan	249
3629	33.24.03	Sukorejo	kecamatan	249
3630	33.24.04	Patean	kecamatan	249
3631	33.24.05	Singorojo	kecamatan	249
3632	33.24.06	Limbangan	kecamatan	249
3633	33.24.07	Boja	kecamatan	249
3634	33.24.08	Kaliwungu	kecamatan	249
3635	33.24.09	Brangsong	kecamatan	249
3636	33.24.10	Pegandon	kecamatan	249
3637	33.24.11	Gemuh	kecamatan	249
3638	33.24.12	Weleri	kecamatan	249
3639	33.24.13	Cepiring	kecamatan	249
3640	33.24.14	Patebon	kecamatan	249
3641	33.24.15	Kendal	kecamatan	249
3642	33.24.16	Rowosari	kecamatan	249
3643	33.24.17	Kangkung	kecamatan	249
3644	33.24.18	Ringinarum	kecamatan	249
3645	33.24.19	Ngampel	kecamatan	249
3646	33.24.20	Kaliwungu Selatan	kecamatan	249
3647	33.25.01	Wonotunggal	kecamatan	250
3648	33.25.02	Bandar	kecamatan	250
3649	33.25.03	Blado	kecamatan	250
3650	33.25.04	Reban	kecamatan	250
3651	33.25.05	Bawang	kecamatan	250
3652	33.25.06	Tersono	kecamatan	250
3653	33.25.07	Gringsing	kecamatan	250
3654	33.25.08	Limpung	kecamatan	250
3655	33.25.09	Subah	kecamatan	250
3656	33.25.10	Tulis	kecamatan	250
3657	33.25.11	Batang	kecamatan	250
3658	33.25.12	Warungasem	kecamatan	250
3659	33.25.13	Kandeman	kecamatan	250
3660	33.25.14	Pecalungan	kecamatan	250
3661	33.25.15	Banyuputih	kecamatan	250
3662	33.26.01	Kandangserang	kecamatan	251
3663	33.26.02	Paninggaran	kecamatan	251
3664	33.26.03	Lebakbarang	kecamatan	251
3665	33.26.04	Petungkriyono	kecamatan	251
3666	33.26.05	Talun	kecamatan	251
3667	33.26.06	Doro	kecamatan	251
3668	33.26.07	Karanganyar	kecamatan	251
3669	33.26.08	Kajen	kecamatan	251
3670	33.26.09	Kesesi	kecamatan	251
3671	33.26.10	Sragi	kecamatan	251
3672	33.26.11	Bojong	kecamatan	251
3673	33.26.12	Wonopringgo	kecamatan	251
3674	33.26.13	Kedungwuni	kecamatan	251
3675	33.26.14	Buaran	kecamatan	251
3676	33.26.15	Tirto	kecamatan	251
3677	33.26.16	Wiradesa	kecamatan	251
3678	33.26.17	Siwalan	kecamatan	251
3679	33.26.18	Karangdadap	kecamatan	251
3680	33.26.19	Wonokerto	kecamatan	251
3681	33.27.01	Moga	kecamatan	252
3682	33.27.02	Pulosari	kecamatan	252
3683	33.27.03	Belik	kecamatan	252
3684	33.27.04	Watukumpul	kecamatan	252
3685	33.27.05	Bodeh	kecamatan	252
3686	33.27.06	Bantarbolang	kecamatan	252
3687	33.27.07	Randudongkal	kecamatan	252
3688	33.27.08	Pemalang	kecamatan	252
3689	33.27.09	Taman	kecamatan	252
3690	33.27.10	Petarukan	kecamatan	252
3691	33.27.11	Ampelgading	kecamatan	252
3692	33.27.12	Comal	kecamatan	252
3693	33.27.13	Ulujami	kecamatan	252
3694	33.27.14	Warungpring	kecamatan	252
3695	33.28.01	Margasari	kecamatan	253
3696	33.28.02	Bumijawa	kecamatan	253
3697	33.28.03	Bojong	kecamatan	253
3698	33.28.04	Balapulang	kecamatan	253
3699	33.28.05	Pagerbarang	kecamatan	253
3700	33.28.06	Lebaksiu	kecamatan	253
3701	33.28.07	Jatinegara	kecamatan	253
3702	33.28.08	Kedungbanteng	kecamatan	253
3703	33.28.09	Pangkah	kecamatan	253
3704	33.28.10	Slawi	kecamatan	253
3705	33.28.11	Adiwerna	kecamatan	253
3706	33.28.12	Talang	kecamatan	253
3707	33.28.13	Dukuhturi	kecamatan	253
3708	33.28.14	Tarub	kecamatan	253
3709	33.28.15	Kramat	kecamatan	253
3710	33.28.16	Suradadi	kecamatan	253
3711	33.28.17	Warureja	kecamatan	253
3712	33.28.18	Dukuhwaru	kecamatan	253
3713	33.29.01	Salem	kecamatan	254
3714	33.29.02	Bantarkawung	kecamatan	254
3715	33.29.03	Bumiayu	kecamatan	254
3716	33.29.04	Paguyangan	kecamatan	254
3717	33.29.05	Sirampog	kecamatan	254
3718	33.29.06	Tonjong	kecamatan	254
3719	33.29.07	Jatibarang	kecamatan	254
3720	33.29.08	Wanasari	kecamatan	254
3721	33.29.09	Brebes	kecamatan	254
3722	33.29.10	Songgom	kecamatan	254
3723	33.29.11	Kersana	kecamatan	254
3724	33.29.12	Losari	kecamatan	254
3725	33.29.13	Tanjung	kecamatan	254
3726	33.29.14	Bulakamba	kecamatan	254
3727	33.29.15	Larangan	kecamatan	254
3728	33.29.16	Ketanggungan	kecamatan	254
3729	33.29.17	Banjarharjo	kecamatan	254
3730	33.71.01	Magelang Selatan	kecamatan	255
3731	33.71.02	Magelang Utara	kecamatan	255
3732	33.71.03	Magelang Tengah	kecamatan	255
3733	33.72.01	Laweyan	kecamatan	256
3734	33.72.02	Serengan	kecamatan	256
3735	33.72.03	Pasar Kliwon	kecamatan	256
3736	33.72.04	Jebres	kecamatan	256
3737	33.72.05	Banjarsari	kecamatan	256
3738	33.73.01	Sidorejo	kecamatan	257
3739	33.73.02	Tingkir	kecamatan	257
3740	33.73.03	Argomulyo	kecamatan	257
3741	33.73.04	Sidomukti	kecamatan	257
3742	33.74.01	Semarang Tengah	kecamatan	258
3743	33.74.02	Semarang Utara	kecamatan	258
3744	33.74.03	Semarang Timur	kecamatan	258
3745	33.74.04	Gayamsari	kecamatan	258
3746	33.74.05	Genuk	kecamatan	258
3747	33.74.06	Pedurungan	kecamatan	258
3748	33.74.07	Semarang Selatan	kecamatan	258
3749	33.74.08	Candisari	kecamatan	258
3750	33.74.09	Gajahmungkur	kecamatan	258
3751	33.74.10	Tembalang	kecamatan	258
3752	33.74.11	Banyumanik	kecamatan	258
3753	33.74.12	Gunungpati	kecamatan	258
3754	33.74.13	Semarang Barat	kecamatan	258
3755	33.74.14	Mijen	kecamatan	258
3756	33.74.15	Ngaliyan	kecamatan	258
3757	33.74.16	Tugu	kecamatan	258
3758	33.75.01	Pekalongan Barat	kecamatan	259
3759	33.75.02	Pekalongan Timur	kecamatan	259
3760	33.75.03	Pekalongan Utara	kecamatan	259
3761	33.75.04	Pekalongan Selatan	kecamatan	259
3762	33.76.01	Tegal Barat	kecamatan	260
3763	33.76.02	Tegal Timur	kecamatan	260
3764	33.76.03	Tegal Selatan	kecamatan	260
3765	33.76.04	Margadana	kecamatan	260
3766	34.01.01	Temon	kecamatan	261
3767	34.01.02	Wates	kecamatan	261
3768	34.01.03	Panjatan	kecamatan	261
3769	34.01.04	Galur	kecamatan	261
3770	34.01.05	Lendah	kecamatan	261
3771	34.01.06	Sentolo	kecamatan	261
3772	34.01.07	Pengasih	kecamatan	261
3773	34.01.08	Kokap	kecamatan	261
3774	34.01.09	Girimulyo	kecamatan	261
3775	34.01.10	Nanggulan	kecamatan	261
3776	34.01.11	Samigaluh	kecamatan	261
3777	34.01.12	Kalibawang	kecamatan	261
3778	34.02.01	Srandakan	kecamatan	262
3779	34.02.02	Sanden	kecamatan	262
3780	34.02.03	Kretek	kecamatan	262
3781	34.02.04	Pundong	kecamatan	262
3782	34.02.05	Bambanglipuro	kecamatan	262
3783	34.02.06	Pandak	kecamatan	262
3784	34.02.07	Pajangan	kecamatan	262
3785	34.02.08	Bantul	kecamatan	262
3786	34.02.09	Jetis	kecamatan	262
3787	34.02.10	Imogiri	kecamatan	262
3788	34.02.11	Dlingo	kecamatan	262
3789	34.02.12	Banguntapan	kecamatan	262
3790	34.02.13	Pleret	kecamatan	262
3791	34.02.14	Piyungan	kecamatan	262
3792	34.02.15	Sewon	kecamatan	262
3793	34.02.16	Kasihan	kecamatan	262
3794	34.02.17	Sedayu	kecamatan	262
3795	34.03.01	Wonosari	kecamatan	263
3796	34.03.02	Nglipar	kecamatan	263
3797	34.03.03	Playen	kecamatan	263
3798	34.03.04	Patuk	kecamatan	263
3799	34.03.05	Paliyan	kecamatan	263
3800	34.03.06	Panggang	kecamatan	263
3801	34.03.07	Tepus	kecamatan	263
3802	34.03.08	Semanu	kecamatan	263
3803	34.03.09	Karangmojo	kecamatan	263
3804	34.03.10	Ponjong	kecamatan	263
3805	34.03.11	Rongkop	kecamatan	263
3806	34.03.12	Semin	kecamatan	263
3807	34.03.13	Ngawen	kecamatan	263
3808	34.03.14	Gedangsari	kecamatan	263
3809	34.03.15	Saptosari	kecamatan	263
3810	34.03.16	Girisubo	kecamatan	263
3811	34.03.17	Tanjungsari	kecamatan	263
3812	34.03.18	Purwosari	kecamatan	263
3813	34.04.01	Gamping	kecamatan	264
3814	34.04.02	Godean	kecamatan	264
3815	34.04.03	Moyudan	kecamatan	264
3816	34.04.04	Minggir	kecamatan	264
3817	34.04.05	Seyegan	kecamatan	264
3818	34.04.06	Mlati	kecamatan	264
3819	34.04.07	Depok	kecamatan	264
3820	34.04.08	Berbah	kecamatan	264
3821	34.04.09	Prambanan	kecamatan	264
3822	34.04.10	Kalasan	kecamatan	264
3823	34.04.11	Ngemplak	kecamatan	264
3824	34.04.12	Ngaglik	kecamatan	264
3825	34.04.13	Sleman	kecamatan	264
3826	34.04.14	Tempel	kecamatan	264
3827	34.04.15	Turi	kecamatan	264
3828	34.04.16	Pakem	kecamatan	264
3829	34.04.17	Cangkringan	kecamatan	264
3830	34.71.01	Tegalrejo	kecamatan	265
3831	34.71.02	Jetis	kecamatan	265
3832	34.71.03	Gondokusuman	kecamatan	265
3833	34.71.04	Danurejan	kecamatan	265
3834	34.71.05	Gedongtengen	kecamatan	265
3835	34.71.06	Ngampilan	kecamatan	265
3836	34.71.07	Wirobrajan	kecamatan	265
3837	34.71.08	Mantrijeron	kecamatan	265
3838	34.71.09	Kraton	kecamatan	265
3839	34.71.10	Gondomanan	kecamatan	265
3840	34.71.11	Pakualaman	kecamatan	265
3841	34.71.12	Mergangsan	kecamatan	265
3842	34.71.13	Umbulharjo	kecamatan	265
3843	34.71.14	Kotagede	kecamatan	265
3844	35.01.01	Donorojo	kecamatan	266
3845	35.01.02	Pringkuku	kecamatan	266
3846	35.01.03	Punung	kecamatan	266
3847	35.01.04	Pacitan	kecamatan	266
3848	35.01.05	Kebonagung	kecamatan	266
3849	35.01.06	Arjosari	kecamatan	266
3850	35.01.07	Nawangan	kecamatan	266
3851	35.01.08	Bandar	kecamatan	266
3852	35.01.09	Tegalombo	kecamatan	266
3853	35.01.10	Tulakan	kecamatan	266
3854	35.01.11	Ngadirojo	kecamatan	266
3855	35.01.12	Sudimoro	kecamatan	266
3856	35.02.01	Slahung	kecamatan	267
3857	35.02.02	Ngrayun	kecamatan	267
3858	35.02.03	Bungkal	kecamatan	267
3859	35.02.04	Sambit	kecamatan	267
3860	35.02.05	Sawoo	kecamatan	267
3861	35.02.06	Sooko	kecamatan	267
3862	35.02.07	Pulung	kecamatan	267
3863	35.02.08	Mlarak	kecamatan	267
3864	35.02.09	Jetis	kecamatan	267
3865	35.02.10	Siman	kecamatan	267
3866	35.02.11	Balong	kecamatan	267
3867	35.02.12	Kauman	kecamatan	267
3868	35.02.13	Badegan	kecamatan	267
3869	35.02.14	Sampung	kecamatan	267
3870	35.02.15	Sukorejo	kecamatan	267
3871	35.02.16	Babadan	kecamatan	267
3872	35.02.17	Ponorogo	kecamatan	267
3873	35.02.18	Jenangan	kecamatan	267
3874	35.02.19	Ngebel	kecamatan	267
3875	35.02.20	Jambon	kecamatan	267
3876	35.02.21	Pudak	kecamatan	267
3877	35.03.01	Panggul	kecamatan	268
3878	35.03.02	Munjungan	kecamatan	268
3879	35.03.03	Pule	kecamatan	268
3880	35.03.04	Dongko	kecamatan	268
3881	35.03.05	Tugu	kecamatan	268
3882	35.03.06	Karangan	kecamatan	268
3883	35.03.07	Kampak	kecamatan	268
3884	35.03.08	Watulimo	kecamatan	268
3885	35.03.09	Bendungan	kecamatan	268
3886	35.03.10	Gandusari	kecamatan	268
3887	35.03.11	Trenggalek	kecamatan	268
3888	35.03.12	Pogalan	kecamatan	268
3889	35.03.13	Durenan	kecamatan	268
3890	35.03.14	Suruh	kecamatan	268
3891	35.04.01	Tulungagung	kecamatan	269
3892	35.04.02	Boyolangu	kecamatan	269
3893	35.04.03	Kedungwaru	kecamatan	269
3894	35.04.04	Ngantru	kecamatan	269
3895	35.04.05	Kauman	kecamatan	269
3896	35.04.06	Pagerwojo	kecamatan	269
3897	35.04.07	Sendang	kecamatan	269
3898	35.04.08	Karangrejo	kecamatan	269
3899	35.04.09	Gondang	kecamatan	269
3900	35.04.10	Sumbergempol	kecamatan	269
3901	35.04.11	Ngunut	kecamatan	269
3902	35.04.12	Pucanglaban	kecamatan	269
3903	35.04.13	Rejotangan	kecamatan	269
3904	35.04.14	Kalidawir	kecamatan	269
3905	35.04.15	Besuki	kecamatan	269
3906	35.04.16	Campurdarat	kecamatan	269
3907	35.04.17	Bandung	kecamatan	269
3908	35.04.18	Pakel	kecamatan	269
3909	35.04.19	Tanggunggunung	kecamatan	269
3910	35.05.01	Wonodadi	kecamatan	270
3911	35.05.02	Udanawu	kecamatan	270
3912	35.05.03	Srengat	kecamatan	270
3913	35.05.04	Kademangan	kecamatan	270
3914	35.05.05	Bakung	kecamatan	270
3915	35.05.06	Ponggok	kecamatan	270
3916	35.05.07	Sanankulon	kecamatan	270
3917	35.05.08	Wonotirto	kecamatan	270
3918	35.05.09	Nglegok	kecamatan	270
3919	35.05.10	Kanigoro	kecamatan	270
3920	35.05.11	Garum	kecamatan	270
3921	35.05.12	Sutojayan	kecamatan	270
3922	35.05.13	Panggungrejo	kecamatan	270
3923	35.05.14	Talun	kecamatan	270
3924	35.05.15	Gandusari	kecamatan	270
3925	35.05.16	Binangun	kecamatan	270
3926	35.05.17	Wlingi	kecamatan	270
3927	35.05.18	Doko	kecamatan	270
3928	35.05.19	Kesamben	kecamatan	270
3929	35.05.20	Wates	kecamatan	270
3930	35.05.21	Selorejo	kecamatan	270
3931	35.05.22	Selopuro	kecamatan	270
3932	35.06.01	Semen	kecamatan	271
3933	35.06.02	Mojo	kecamatan	271
3934	35.06.03	Kras	kecamatan	271
3935	35.06.04	Ngadiluwih	kecamatan	271
3936	35.06.05	Kandat	kecamatan	271
3937	35.06.06	Wates	kecamatan	271
3938	35.06.07	Ngancar	kecamatan	271
3939	35.06.08	Puncu	kecamatan	271
3940	35.06.09	Plosoklaten	kecamatan	271
3941	35.06.10	Gurah	kecamatan	271
3942	35.06.11	Pagu	kecamatan	271
3943	35.06.12	Gampengrejo	kecamatan	271
3944	35.06.13	Grogol	kecamatan	271
3945	35.06.14	Papar	kecamatan	271
3946	35.06.15	Purwoasri	kecamatan	271
3947	35.06.16	Plemahan	kecamatan	271
3948	35.06.17	Pare	kecamatan	271
3949	35.06.18	Kepung	kecamatan	271
3950	35.06.19	Kandangan	kecamatan	271
3951	35.06.20	Tarokan	kecamatan	271
3952	35.06.21	Kunjang	kecamatan	271
3953	35.06.22	Banyakan	kecamatan	271
3954	35.06.23	Ringinrejo	kecamatan	271
3955	35.06.24	Kayen Kidul	kecamatan	271
3956	35.06.25	Ngasem	kecamatan	271
3957	35.06.26	Badas	kecamatan	271
3958	35.07.01	Donomulyo	kecamatan	272
3959	35.07.02	Pagak	kecamatan	272
3960	35.07.03	Bantur	kecamatan	272
3961	35.07.04	Sumbermanjing Wetan	kecamatan	272
3962	35.07.05	Dampit	kecamatan	272
3963	35.07.06	Ampelgading	kecamatan	272
3964	35.07.07	Poncokusumo	kecamatan	272
3965	35.07.08	Wajak	kecamatan	272
3966	35.07.09	Turen	kecamatan	272
3967	35.07.10	Gondanglegi	kecamatan	272
3968	35.07.11	Kalipare	kecamatan	272
3969	35.07.12	Sumberpucung	kecamatan	272
3970	35.07.13	Kepanjen	kecamatan	272
3971	35.07.14	Bululawang	kecamatan	272
3972	35.07.15	Tajinan	kecamatan	272
3973	35.07.16	Tumpang	kecamatan	272
3974	35.07.17	Jabung	kecamatan	272
3975	35.07.18	Pakis	kecamatan	272
3976	35.07.19	Pakisaji	kecamatan	272
3977	35.07.20	Ngajum	kecamatan	272
3978	35.07.21	Wagir	kecamatan	272
3979	35.07.22	Dau	kecamatan	272
3980	35.07.23	Karangploso	kecamatan	272
3981	35.07.24	Singosari	kecamatan	272
3982	35.07.25	Lawang	kecamatan	272
3983	35.07.26	Pujon	kecamatan	272
3984	35.07.27	Ngantang	kecamatan	272
3985	35.07.28	Kasembon	kecamatan	272
3986	35.07.29	Gedangan	kecamatan	272
3987	35.07.30	Tirtoyudo	kecamatan	272
3988	35.07.31	Kromengan	kecamatan	272
3989	35.07.32	Wonosari	kecamatan	272
3990	35.07.33	Pagelaran	kecamatan	272
3991	35.08.01	Tempursari	kecamatan	273
3992	35.08.02	Pronojiwo	kecamatan	273
3993	35.08.03	Candipuro	kecamatan	273
3994	35.08.04	Pasirian	kecamatan	273
3995	35.08.05	Tempeh	kecamatan	273
3996	35.08.06	Kunir	kecamatan	273
3997	35.08.07	Yosowilangun	kecamatan	273
3998	35.08.08	Rowokangkung	kecamatan	273
3999	35.08.09	Tekung	kecamatan	273
4000	35.08.10	Lumajang	kecamatan	273
4001	35.08.11	Pasrujambe	kecamatan	273
4002	35.08.12	Senduro	kecamatan	273
4003	35.08.13	Gucialit	kecamatan	273
4004	35.08.14	Padang	kecamatan	273
4005	35.08.15	Sukodono	kecamatan	273
4006	35.08.16	Kedungjajang	kecamatan	273
4007	35.08.17	Jatiroto	kecamatan	273
4008	35.08.18	Randuagung	kecamatan	273
4009	35.08.19	Klakah	kecamatan	273
4010	35.08.20	Ranuyoso	kecamatan	273
4011	35.08.21	Sumbersuko	kecamatan	273
4012	35.09.01	Jombang	kecamatan	274
4013	35.09.02	Kencong	kecamatan	274
4014	35.09.03	Sumberbaru	kecamatan	274
4015	35.09.04	Gumukmas	kecamatan	274
4016	35.09.05	Umbulsari	kecamatan	274
4017	35.09.06	Tanggul	kecamatan	274
4018	35.09.07	Semboro	kecamatan	274
4019	35.09.08	Puger	kecamatan	274
4020	35.09.09	Bangsalsari	kecamatan	274
4021	35.09.10	Balung	kecamatan	274
4022	35.09.11	Wuluhan	kecamatan	274
4023	35.09.12	Ambulu	kecamatan	274
4024	35.09.13	Rambipuji	kecamatan	274
4025	35.09.14	Panti	kecamatan	274
4026	35.09.15	Sukorambi	kecamatan	274
4027	35.09.16	Jenggawah	kecamatan	274
4028	35.09.17	Ajung	kecamatan	274
4029	35.09.18	Tempurejo	kecamatan	274
4030	35.09.19	Kaliwates	kecamatan	274
4031	35.09.20	Patrang	kecamatan	274
4032	35.09.21	Sumbersari	kecamatan	274
4033	35.09.22	Arjasa	kecamatan	274
4034	35.09.23	Mumbulsari	kecamatan	274
4035	35.09.24	Pakusari	kecamatan	274
4036	35.09.25	Jelbuk	kecamatan	274
4037	35.09.26	Mayang	kecamatan	274
4038	35.09.27	Kalisat	kecamatan	274
4039	35.09.28	Ledokombo	kecamatan	274
4040	35.09.29	Sukowono	kecamatan	274
4041	35.09.30	Silo	kecamatan	274
4042	35.09.31	Sumberjambe	kecamatan	274
4043	35.10.01	Pesanggaran	kecamatan	275
4044	35.10.02	Bangorejo	kecamatan	275
4045	35.10.03	Purwoharjo	kecamatan	275
4046	35.10.04	Tegaldlimo	kecamatan	275
4047	35.10.05	Muncar	kecamatan	275
4048	35.10.06	Cluring	kecamatan	275
4049	35.10.07	Gambiran	kecamatan	275
4050	35.10.08	Srono	kecamatan	275
4051	35.10.09	Genteng	kecamatan	275
4052	35.10.10	Glenmore	kecamatan	275
4053	35.10.11	Kalibaru	kecamatan	275
4054	35.10.12	Singojuruh	kecamatan	275
4055	35.10.13	Rogojampi	kecamatan	275
4056	35.10.14	Kabat	kecamatan	275
4057	35.10.15	Glagah	kecamatan	275
4058	35.10.16	Banyuwangi	kecamatan	275
4059	35.10.17	Giri	kecamatan	275
4060	35.10.18	Wongsorejo	kecamatan	275
4061	35.10.19	Songgon	kecamatan	275
4062	35.10.20	Sempu	kecamatan	275
4063	35.10.21	Kalipuro	kecamatan	275
4064	35.10.22	Siliragung	kecamatan	275
4065	35.10.23	Tegalsari	kecamatan	275
4066	35.10.24	Licin	kecamatan	275
4067	35.10.25	Blimbingsari	kecamatan	275
4068	35.11.01	Maesan	kecamatan	276
4069	35.11.02	Tamanan	kecamatan	276
4070	35.11.03	Tlogosari	kecamatan	276
4071	35.11.04	Sukosari	kecamatan	276
4072	35.11.05	Pujer	kecamatan	276
4073	35.11.06	Grujugan	kecamatan	276
4074	35.11.07	Curahdami	kecamatan	276
4075	35.11.08	Tenggarang	kecamatan	276
4076	35.11.09	Wonosari	kecamatan	276
4077	35.11.10	Tapen	kecamatan	276
4078	35.11.11	Bondowoso	kecamatan	276
4079	35.11.12	Wringin	kecamatan	276
4080	35.11.13	Tegalampel	kecamatan	276
4081	35.11.14	Klabang	kecamatan	276
4082	35.11.15	Cermee	kecamatan	276
4083	35.11.16	Prajekan	kecamatan	276
4084	35.11.17	Pakem	kecamatan	276
4085	35.11.18	Sumberwringin	kecamatan	276
4086	35.11.19	Sempol	kecamatan	276
4087	35.11.20	Binakal	kecamatan	276
4088	35.11.21	Taman Krocok	kecamatan	276
4089	35.11.22	Botolinggo	kecamatan	276
4090	35.11.23	Jambesari Darus Sholah	kecamatan	276
4091	35.12.01	Jatibanteng	kecamatan	277
4092	35.12.02	Besuki	kecamatan	277
4093	35.12.03	Suboh	kecamatan	277
4094	35.12.04	Mlandingan	kecamatan	277
4095	35.12.05	Kendit	kecamatan	277
4096	35.12.06	Panarukan	kecamatan	277
4097	35.12.07	Situbondo	kecamatan	277
4098	35.12.08	Panji	kecamatan	277
4099	35.12.09	Mangaran	kecamatan	277
4100	35.12.10	Kapongan	kecamatan	277
4101	35.12.11	Arjasa	kecamatan	277
4102	35.12.12	Jangkar	kecamatan	277
4103	35.12.13	Asembagus	kecamatan	277
4104	35.12.14	Banyuputih	kecamatan	277
4105	35.12.15	Sumbermalang	kecamatan	277
4106	35.12.16	Banyuglugur	kecamatan	277
4107	35.12.17	Bungatan	kecamatan	277
4108	35.13.01	Sukapura	kecamatan	278
4109	35.13.02	Sumber	kecamatan	278
4110	35.13.03	Kuripan	kecamatan	278
4111	35.13.04	Bantaran	kecamatan	278
4112	35.13.05	Leces	kecamatan	278
4113	35.13.06	Banyuanyar	kecamatan	278
4114	35.13.07	Tiris	kecamatan	278
4115	35.13.08	Krucil	kecamatan	278
4116	35.13.09	Gading	kecamatan	278
4117	35.13.10	Pakuniran	kecamatan	278
4118	35.13.11	Kotaanyar	kecamatan	278
4119	35.13.12	Paiton	kecamatan	278
4120	35.13.13	Besuk	kecamatan	278
4121	35.13.14	Kraksaan	kecamatan	278
4122	35.13.15	Krejengan	kecamatan	278
4123	35.13.16	Pajarakan	kecamatan	278
4124	35.13.17	Maron	kecamatan	278
4125	35.13.18	Gending	kecamatan	278
4126	35.13.19	Dringu	kecamatan	278
4127	35.13.20	Tegalsiwalan	kecamatan	278
4128	35.13.21	Sumberasih	kecamatan	278
4129	35.13.22	Wonomerto	kecamatan	278
4130	35.13.23	Tongas	kecamatan	278
4131	35.13.24	Lumbang	kecamatan	278
4132	35.14.01	Purwodadi	kecamatan	279
4133	35.14.02	Tutur	kecamatan	279
4134	35.14.03	Puspo	kecamatan	279
4135	35.14.04	Lumbang	kecamatan	279
4136	35.14.05	Pasrepan	kecamatan	279
4137	35.14.06	Kejayan	kecamatan	279
4138	35.14.07	Wonorejo	kecamatan	279
4139	35.14.08	Purwosari	kecamatan	279
4140	35.14.09	Sukorejo	kecamatan	279
4141	35.14.10	Prigen	kecamatan	279
4142	35.14.11	Pandaan	kecamatan	279
4143	35.14.12	Gempol	kecamatan	279
4144	35.14.13	Beji	kecamatan	279
4145	35.14.14	Bangil	kecamatan	279
4146	35.14.15	Rembang	kecamatan	279
4147	35.14.16	Kraton	kecamatan	279
4148	35.14.17	Pohjentrek	kecamatan	279
4149	35.14.18	Gondangwetan	kecamatan	279
4150	35.14.19	Winongan	kecamatan	279
4151	35.14.20	Grati	kecamatan	279
4152	35.14.21	Nguling	kecamatan	279
4153	35.14.22	Lekok	kecamatan	279
4154	35.14.23	Rejoso	kecamatan	279
4155	35.14.24	Tosari	kecamatan	279
4156	35.15.01	Tarik	kecamatan	280
4157	35.15.02	Prambon	kecamatan	280
4158	35.15.03	Krembung	kecamatan	280
4159	35.15.04	Porong	kecamatan	280
4160	35.15.05	Jabon	kecamatan	280
4161	35.15.06	Tanggulangin	kecamatan	280
4162	35.15.07	Candi	kecamatan	280
4163	35.15.08	Sidoarjo	kecamatan	280
4164	35.15.09	Tulangan	kecamatan	280
4165	35.15.10	Wonoayu	kecamatan	280
4166	35.15.11	Krian	kecamatan	280
4167	35.15.12	Balongbendo	kecamatan	280
4168	35.15.13	Taman	kecamatan	280
4169	35.15.14	Sukodono	kecamatan	280
4170	35.15.15	Buduran	kecamatan	280
4171	35.15.16	Gedangan	kecamatan	280
4172	35.15.17	Sedati	kecamatan	280
4173	35.15.18	Waru	kecamatan	280
4174	35.16.01	Jatirejo	kecamatan	281
4175	35.16.02	Gondang	kecamatan	281
4176	35.16.03	Pacet	kecamatan	281
4177	35.16.04	Trawas	kecamatan	281
4178	35.16.05	Ngoro	kecamatan	281
4179	35.16.06	Pungging	kecamatan	281
4180	35.16.07	Kutorejo	kecamatan	281
4181	35.16.08	Mojosari	kecamatan	281
4182	35.16.09	Dlanggu	kecamatan	281
4183	35.16.10	Bangsal	kecamatan	281
4184	35.16.11	Puri	kecamatan	281
4185	35.16.12	Trowulan	kecamatan	281
4186	35.16.13	Sooko	kecamatan	281
4187	35.16.14	Gedeg	kecamatan	281
4188	35.16.15	Kemlagi	kecamatan	281
4189	35.16.16	Jetis	kecamatan	281
4190	35.16.17	Dawarblandong	kecamatan	281
4191	35.16.18	Mojoanyar	kecamatan	281
4192	35.17.01	Perak	kecamatan	282
4193	35.17.02	Gudo	kecamatan	282
4194	35.17.03	Ngoro	kecamatan	282
4195	35.17.04	Bareng	kecamatan	282
4196	35.17.05	Wonosalam	kecamatan	282
4197	35.17.06	Mojoagung	kecamatan	282
4198	35.17.07	Mojowarno	kecamatan	282
4199	35.17.08	Diwek	kecamatan	282
4200	35.17.09	Jombang	kecamatan	282
4201	35.17.10	Peterongan	kecamatan	282
4202	35.17.11	Sumobito	kecamatan	282
4203	35.17.12	Kesamben	kecamatan	282
4204	35.17.13	Tembelang	kecamatan	282
4205	35.17.14	Ploso	kecamatan	282
4206	35.17.15	Plandaan	kecamatan	282
4207	35.17.16	Kabuh	kecamatan	282
4208	35.17.17	Kudu	kecamatan	282
4209	35.17.18	Bandarkedungmulyo	kecamatan	282
4210	35.17.19	Jogoroto	kecamatan	282
4211	35.17.20	Megaluh	kecamatan	282
4212	35.17.21	Ngusikan	kecamatan	282
4213	35.18.01	Sawahan	kecamatan	283
4214	35.18.02	Ngetos	kecamatan	283
4215	35.18.03	Berbek	kecamatan	283
4216	35.18.04	Loceret	kecamatan	283
4217	35.18.05	Pace	kecamatan	283
4218	35.18.06	Prambon	kecamatan	283
4219	35.18.07	Ngronggot	kecamatan	283
4220	35.18.08	Kertosono	kecamatan	283
4221	35.18.09	Patianrowo	kecamatan	283
4222	35.18.10	Baron	kecamatan	283
4223	35.18.11	Tanjunganom	kecamatan	283
4224	35.18.12	Sukomoro	kecamatan	283
4225	35.18.13	Nganjuk	kecamatan	283
4226	35.18.14	Bagor	kecamatan	283
4227	35.18.15	Wilangan	kecamatan	283
4228	35.18.16	Rejoso	kecamatan	283
4229	35.18.17	Gondang	kecamatan	283
4230	35.18.18	Ngluyu	kecamatan	283
4231	35.18.19	Lengkong	kecamatan	283
4232	35.18.20	Jatikalen	kecamatan	283
4233	35.19.01	Kebonsari	kecamatan	284
4234	35.19.02	Dolopo	kecamatan	284
4235	35.19.03	Geger	kecamatan	284
4236	35.19.04	Dagangan	kecamatan	284
4237	35.19.05	Kare	kecamatan	284
4238	35.19.06	Gemarang	kecamatan	284
4239	35.19.07	Wungu	kecamatan	284
4240	35.19.08	Madiun	kecamatan	284
4241	35.19.09	Jiwan	kecamatan	284
4242	35.19.10	Balerejo	kecamatan	284
4243	35.19.11	Mejayan	kecamatan	284
4244	35.19.12	Saradan	kecamatan	284
4245	35.19.13	Pilangkenceng	kecamatan	284
4246	35.19.14	Sawahan	kecamatan	284
4247	35.19.15	Wonoasri	kecamatan	284
4248	35.20.01	Poncol	kecamatan	285
4249	35.20.02	Parang	kecamatan	285
4250	35.20.03	Lembeyan	kecamatan	285
4251	35.20.04	Takeran	kecamatan	285
4252	35.20.05	Kawedanan	kecamatan	285
4253	35.20.06	Magetan	kecamatan	285
4254	35.20.07	Plaosan	kecamatan	285
4255	35.20.08	Panekan	kecamatan	285
4256	35.20.09	Sukomoro	kecamatan	285
4257	35.20.10	Bendo	kecamatan	285
4258	35.20.11	Maospati	kecamatan	285
4259	35.20.12	Barat	kecamatan	285
4260	35.20.13	Karangrejo	kecamatan	285
4261	35.20.14	Karas	kecamatan	285
4262	35.20.15	Kartoharjo	kecamatan	285
4263	35.20.16	Ngariboyo	kecamatan	285
4264	35.20.17	Nguntoronadi	kecamatan	285
4265	35.20.18	Sidorejo	kecamatan	285
4266	35.21.01	Sine	kecamatan	286
4267	35.21.02	Ngrambe	kecamatan	286
4268	35.21.03	Jogorogo	kecamatan	286
4269	35.21.04	Kendal	kecamatan	286
4270	35.21.05	Geneng	kecamatan	286
4271	35.21.06	Kwadungan	kecamatan	286
4272	35.21.07	Karangjati	kecamatan	286
4273	35.21.08	Padas	kecamatan	286
4274	35.21.09	Ngawi	kecamatan	286
4275	35.21.10	Paron	kecamatan	286
4276	35.21.11	Kedunggalar	kecamatan	286
4277	35.21.12	Widodaren	kecamatan	286
4278	35.21.13	Mantingan	kecamatan	286
4279	35.21.14	Pangkur	kecamatan	286
4280	35.21.15	Bringin	kecamatan	286
4281	35.21.16	Pitu	kecamatan	286
4282	35.21.17	Karanganyar	kecamatan	286
4283	35.21.18	Gerih	kecamatan	286
4284	35.21.19	Kasreman	kecamatan	286
4285	35.22.01	Ngraho	kecamatan	287
4286	35.22.02	Tambakrejo	kecamatan	287
4287	35.22.03	Ngambon	kecamatan	287
4288	35.22.04	Ngasem	kecamatan	287
4289	35.22.05	Bubulan	kecamatan	287
4290	35.22.06	Dander	kecamatan	287
4291	35.22.07	Sugihwaras	kecamatan	287
4292	35.22.08	Kedungadem	kecamatan	287
4293	35.22.09	Kepohbaru	kecamatan	287
4294	35.22.10	Baureno	kecamatan	287
4295	35.22.11	Kanor	kecamatan	287
4296	35.22.12	Sumberrejo	kecamatan	287
4297	35.22.13	Balen	kecamatan	287
4298	35.22.14	Kapas	kecamatan	287
4299	35.22.15	Bojonegoro	kecamatan	287
4300	35.22.16	Kalitidu	kecamatan	287
4301	35.22.17	Malo	kecamatan	287
4302	35.22.18	Purwosari	kecamatan	287
4303	35.22.19	Padangan	kecamatan	287
4304	35.22.20	Kasiman	kecamatan	287
4305	35.22.21	Temayang	kecamatan	287
4306	35.22.22	Margomulyo	kecamatan	287
4307	35.22.23	Trucuk	kecamatan	287
4308	35.22.24	Sukosewu	kecamatan	287
4309	35.22.25	Kedewan	kecamatan	287
4310	35.22.26	Gondang	kecamatan	287
4311	35.22.27	Sekar	kecamatan	287
4312	35.22.28	Gayam	kecamatan	287
4313	35.23.01	Kenduruan	kecamatan	288
4314	35.23.02	Jatirogo	kecamatan	288
4315	35.23.03	Bangilan	kecamatan	288
4316	35.23.04	Bancar	kecamatan	288
4317	35.23.05	Senori	kecamatan	288
4318	35.23.06	Tambakboyo	kecamatan	288
4319	35.23.07	Singgahan	kecamatan	288
4320	35.23.08	Kerek	kecamatan	288
4321	35.23.09	Parengan	kecamatan	288
4322	35.23.10	Montong	kecamatan	288
4323	35.23.11	Soko	kecamatan	288
4324	35.23.12	Jenu	kecamatan	288
4325	35.23.13	Merakurak	kecamatan	288
4326	35.23.14	Rengel	kecamatan	288
4327	35.23.15	Semanding	kecamatan	288
4328	35.23.16	Tuban	kecamatan	288
4329	35.23.17	Plumpang	kecamatan	288
4330	35.23.18	Palang	kecamatan	288
4331	35.23.19	Widang	kecamatan	288
4332	35.23.20	Grabagan	kecamatan	288
4333	35.24.01	Sukorame	kecamatan	289
4334	35.24.02	Bluluk	kecamatan	289
4335	35.24.03	Modo	kecamatan	289
4336	35.24.04	Ngimbang	kecamatan	289
4337	35.24.05	Babat	kecamatan	289
4338	35.24.06	Kedungpring	kecamatan	289
4339	35.24.07	Brondong	kecamatan	289
4340	35.24.08	Laren	kecamatan	289
4341	35.24.09	Sekaran	kecamatan	289
4342	35.24.10	Maduran	kecamatan	289
4343	35.24.11	Sambeng	kecamatan	289
4344	35.24.12	Sugio	kecamatan	289
4345	35.24.13	Pucuk	kecamatan	289
4346	35.24.14	Paciran	kecamatan	289
4347	35.24.15	Solokuro	kecamatan	289
4348	35.24.16	Mantup	kecamatan	289
4349	35.24.17	Sukodadi	kecamatan	289
4350	35.24.18	Karanggeneng	kecamatan	289
4351	35.24.19	Kembangbahu	kecamatan	289
4352	35.24.20	Kalitengah	kecamatan	289
4353	35.24.21	Turi	kecamatan	289
4354	35.24.22	Lamongan	kecamatan	289
4355	35.24.23	Tikung	kecamatan	289
4356	35.24.24	Karangbinangun	kecamatan	289
4357	35.24.25	Deket	kecamatan	289
4358	35.24.26	Glagah	kecamatan	289
4359	35.24.27	Sarirejo	kecamatan	289
4360	35.25.01	Dukun	kecamatan	290
4361	35.25.02	Balongpanggang	kecamatan	290
4362	35.25.03	Panceng	kecamatan	290
4363	35.25.04	Benjeng	kecamatan	290
4364	35.25.05	Duduksampeyan	kecamatan	290
4365	35.25.06	Wringinanom	kecamatan	290
4366	35.25.07	Ujungpangkah	kecamatan	290
4367	35.25.08	Kedamean	kecamatan	290
4368	35.25.09	Sidayu	kecamatan	290
4369	35.25.10	Manyar	kecamatan	290
4370	35.25.11	Cerme	kecamatan	290
4371	35.25.12	Bungah	kecamatan	290
4372	35.25.13	Menganti	kecamatan	290
4373	35.25.14	Kebomas	kecamatan	290
4374	35.25.15	Driyorejo	kecamatan	290
4375	35.25.16	Gresik	kecamatan	290
4376	35.25.17	Sangkapura	kecamatan	290
4377	35.25.18	Tambak	kecamatan	290
4378	35.26.01	Bangkalan	kecamatan	291
4379	35.26.02	Socah	kecamatan	291
4380	35.26.03	Burneh	kecamatan	291
4381	35.26.04	Kamal	kecamatan	291
4382	35.26.05	Arosbaya	kecamatan	291
4383	35.26.06	Geger	kecamatan	291
4384	35.26.07	Klampis	kecamatan	291
4385	35.26.08	Sepulu	kecamatan	291
4386	35.26.09	Tanjung Bumi	kecamatan	291
4387	35.26.10	Kokop	kecamatan	291
4388	35.26.11	Kwanyar	kecamatan	291
4389	35.26.12	Labang	kecamatan	291
4390	35.26.13	Tanah Merah	kecamatan	291
4391	35.26.14	Tragah	kecamatan	291
4392	35.26.15	Blega	kecamatan	291
4393	35.26.16	Modung	kecamatan	291
4394	35.26.17	Konang	kecamatan	291
4395	35.26.18	Galis	kecamatan	291
4396	35.27.01	Sreseh	kecamatan	292
4397	35.27.02	Torjun	kecamatan	292
4398	35.27.03	Sampang	kecamatan	292
4399	35.27.04	Camplong	kecamatan	292
4400	35.27.05	Omben	kecamatan	292
4401	35.27.06	Kedungdung	kecamatan	292
4402	35.27.07	Jrengik	kecamatan	292
4403	35.27.08	Tambelangan	kecamatan	292
4404	35.27.09	Banyuates	kecamatan	292
4405	35.27.10	Robatal	kecamatan	292
4406	35.27.11	Sokobanah	kecamatan	292
4407	35.27.12	Ketapang	kecamatan	292
4408	35.27.13	Pangarengan	kecamatan	292
4409	35.27.14	Karangpenang	kecamatan	292
4410	35.28.01	Tlanakan	kecamatan	293
4411	35.28.02	Pademawu	kecamatan	293
4412	35.28.03	Galis	kecamatan	293
4413	35.28.04	Pamekasan	kecamatan	293
4414	35.28.05	Proppo	kecamatan	293
4415	35.28.06	Palengaan	kecamatan	293
4416	35.28.07	Pegantenan	kecamatan	293
4417	35.28.08	Larangan	kecamatan	293
4418	35.28.09	Pakong	kecamatan	293
4419	35.28.10	Waru	kecamatan	293
4420	35.28.11	Batumarmar	kecamatan	293
4421	35.28.12	Kadur	kecamatan	293
4422	35.28.13	Pasean	kecamatan	293
4423	35.29.01	Kota Sumenep	kecamatan	294
4424	35.29.02	Kalianget	kecamatan	294
4425	35.29.03	Manding	kecamatan	294
4426	35.29.04	Talango	kecamatan	294
4427	35.29.05	Bluto	kecamatan	294
4428	35.29.06	Saronggi	kecamatan	294
4429	35.29.07	Lenteng	kecamatan	294
4430	35.29.08	Giliginting	kecamatan	294
4431	35.29.09	Guluk-Guluk	kecamatan	294
4432	35.29.10	Ganding	kecamatan	294
4433	35.29.11	Pragaan	kecamatan	294
4434	35.29.12	Ambunten	kecamatan	294
4435	35.29.13	Pasongsongan	kecamatan	294
4436	35.29.14	Dasuk	kecamatan	294
4437	35.29.15	Rubaru	kecamatan	294
4438	35.29.16	Batang Batang	kecamatan	294
4439	35.29.17	Batuputih	kecamatan	294
4440	35.29.18	Dungkek	kecamatan	294
4441	35.29.19	Gapura	kecamatan	294
4442	35.29.20	Gayam	kecamatan	294
4443	35.29.21	Nonggunong	kecamatan	294
4444	35.29.22	Ra'as	kecamatan	294
4445	35.29.23	Masalembu	kecamatan	294
4446	35.29.24	Arjasa	kecamatan	294
4447	35.29.25	Sapeken	kecamatan	294
4448	35.29.26	Batuan	kecamatan	294
4449	35.29.27	Kangayan	kecamatan	294
4450	35.71.01	Mojoroto	kecamatan	295
4451	35.71.02	Kota	kecamatan	295
4452	35.71.03	Pesantren	kecamatan	295
4453	35.72.01	Kepanjenkidul	kecamatan	296
4454	35.72.02	Sukorejo	kecamatan	296
4455	35.72.03	Sananwetan	kecamatan	296
4456	35.73.01	Blimbing	kecamatan	297
4457	35.73.02	Klojen	kecamatan	297
4458	35.73.03	Kedungkandang	kecamatan	297
4459	35.73.04	Sukun	kecamatan	297
4460	35.73.05	Lowokwaru	kecamatan	297
4461	35.74.01	Kademangan	kecamatan	298
4462	35.74.02	Wonoasih	kecamatan	298
4463	35.74.03	Mayangan	kecamatan	298
4464	35.74.04	Kanigaran	kecamatan	298
4465	35.74.05	Kedopok	kecamatan	298
4466	35.75.01	Gadingrejo	kecamatan	299
4467	35.75.02	Purworejo	kecamatan	299
4468	35.75.03	Bugul Kidul	kecamatan	299
4469	35.75.04	Panggungrejo	kecamatan	299
4470	35.76.01	Prajuritkulon	kecamatan	300
4471	35.76.02	Magersari	kecamatan	300
4472	35.76.03	Kranggan	kecamatan	300
4473	35.77.01	Kartoharjo	kecamatan	301
4474	35.77.02	Manguharjo	kecamatan	301
4475	35.77.03	Taman	kecamatan	301
4476	35.78.01	Karang Pilang	kecamatan	302
4477	35.78.02	Wonocolo	kecamatan	302
4478	35.78.03	Rungkut	kecamatan	302
4479	35.78.04	Wonokromo	kecamatan	302
4480	35.78.05	Tegalsari	kecamatan	302
4481	35.78.06	Sawahan	kecamatan	302
4482	35.78.07	Genteng	kecamatan	302
4483	35.78.08	Gubeng	kecamatan	302
4484	35.78.09	Sukolilo	kecamatan	302
4485	35.78.10	Tambaksari	kecamatan	302
4486	35.78.11	Simokerto	kecamatan	302
4487	35.78.12	Pabean Cantian	kecamatan	302
4488	35.78.13	Bubutan	kecamatan	302
4489	35.78.14	Tandes	kecamatan	302
4490	35.78.15	Krembangan	kecamatan	302
4491	35.78.16	Semampir	kecamatan	302
4492	35.78.17	Kenjeran	kecamatan	302
4493	35.78.18	Lakarsantri	kecamatan	302
4494	35.78.19	Benowo	kecamatan	302
4495	35.78.20	Wiyung	kecamatan	302
4496	35.78.21	Dukuh Pakis	kecamatan	302
4497	35.78.22	Gayungan	kecamatan	302
4498	35.78.23	Jambangan	kecamatan	302
4499	35.78.24	Tenggilis Mejoyo	kecamatan	302
4500	35.78.25	Gunung Anyar	kecamatan	302
4501	35.78.26	Mulyorejo	kecamatan	302
4502	35.78.27	Sukomanunggal	kecamatan	302
4503	35.78.28	Asem Rowo	kecamatan	302
4504	35.78.29	Bulak	kecamatan	302
4505	35.78.30	Pakal	kecamatan	302
4506	35.78.31	Sambikerep	kecamatan	302
4507	35.79.01	Batu	kecamatan	303
4508	35.79.02	Bumiaji	kecamatan	303
4509	35.79.03	Junrejo	kecamatan	303
4510	36.01.01	Sumur	kecamatan	304
4511	36.01.02	Cimanggu	kecamatan	304
4512	36.01.03	Cibaliung	kecamatan	304
4513	36.01.04	Cikeusik	kecamatan	304
4514	36.01.05	Cigeulis	kecamatan	304
4515	36.01.06	Panimbang	kecamatan	304
4516	36.01.07	Angsana	kecamatan	304
4517	36.01.08	Munjul	kecamatan	304
4518	36.01.09	Pagelaran	kecamatan	304
4519	36.01.10	Bojong	kecamatan	304
4520	36.01.11	Picung	kecamatan	304
4521	36.01.12	Labuan	kecamatan	304
4522	36.01.13	Menes	kecamatan	304
4523	36.01.14	Saketi	kecamatan	304
4524	36.01.15	Cipeucang	kecamatan	304
4525	36.01.16	Jiput	kecamatan	304
4526	36.01.17	Mandalawangi	kecamatan	304
4527	36.01.18	Cimanuk	kecamatan	304
4528	36.01.19	Kaduhejo	kecamatan	304
4529	36.01.20	Banjar	kecamatan	304
4530	36.01.21	Pandeglang	kecamatan	304
4531	36.01.22	Cadasari	kecamatan	304
4532	36.01.23	Cisata	kecamatan	304
4533	36.01.24	Patia	kecamatan	304
4534	36.01.25	Karang Tanjung	kecamatan	304
4535	36.01.26	Cikedal	kecamatan	304
4536	36.01.27	Cibitung	kecamatan	304
4537	36.01.28	Carita	kecamatan	304
4538	36.01.29	Sukaresmi	kecamatan	304
4539	36.01.30	Mekarjaya	kecamatan	304
4540	36.01.31	Sindangresmi	kecamatan	304
4541	36.01.32	Pulosari	kecamatan	304
4542	36.01.33	Koroncong	kecamatan	304
4543	36.01.34	Majasari	kecamatan	304
4544	36.01.35	Sobang	kecamatan	304
4545	36.02.01	Malingping	kecamatan	305
4546	36.02.02	Panggarangan	kecamatan	305
4547	36.02.03	Bayah	kecamatan	305
4548	36.02.04	Cipanas	kecamatan	305
4549	36.02.05	Muncang	kecamatan	305
4550	36.02.06	Leuwidamar	kecamatan	305
4551	36.02.07	Bojongmanik	kecamatan	305
4552	36.02.08	Gunungkencana	kecamatan	305
4553	36.02.09	Banjarsari	kecamatan	305
4554	36.02.10	Cileles	kecamatan	305
4555	36.02.11	Cimarga	kecamatan	305
4556	36.02.12	Sajira	kecamatan	305
4557	36.02.13	Maja	kecamatan	305
4558	36.02.14	Rangkasbitung	kecamatan	305
4559	36.02.15	Warunggunung	kecamatan	305
4560	36.02.16	Cijaku	kecamatan	305
4561	36.02.17	Cikulur	kecamatan	305
4562	36.02.18	Cibadak	kecamatan	305
4563	36.02.19	Cibeber	kecamatan	305
4564	36.02.20	Cilograng	kecamatan	305
4565	36.02.21	Wanasalam	kecamatan	305
4566	36.02.22	Sobang	kecamatan	305
4567	36.02.23	Curugbitung	kecamatan	305
4568	36.02.24	Kalanganyar	kecamatan	305
4569	36.02.25	Lebakgedong	kecamatan	305
4570	36.02.26	Cihara	kecamatan	305
4571	36.02.27	Cirinten	kecamatan	305
4572	36.02.28	Cigemblong	kecamatan	305
4573	36.03.01	Balaraja	kecamatan	306
4574	36.03.02	Jayanti	kecamatan	306
4575	36.03.03	Tigaraksa	kecamatan	306
4576	36.03.04	Jambe	kecamatan	306
4577	36.03.05	Cisoka	kecamatan	306
4578	36.03.06	Kresek	kecamatan	306
4579	36.03.07	Kronjo	kecamatan	306
4580	36.03.08	Mauk	kecamatan	306
4581	36.03.09	Kemiri	kecamatan	306
4582	36.03.10	Sukadiri	kecamatan	306
4583	36.03.11	Rajeg	kecamatan	306
4584	36.03.12	Pasar Kemis	kecamatan	306
4585	36.03.13	Teluknaga	kecamatan	306
4586	36.03.14	Kosambi	kecamatan	306
4587	36.03.15	Pakuhaji	kecamatan	306
4588	36.03.16	Sepatan	kecamatan	306
4589	36.03.17	Curug	kecamatan	306
4590	36.03.18	Cikupa	kecamatan	306
4591	36.03.19	Panongan	kecamatan	306
4592	36.03.20	Legok	kecamatan	306
4593	36.03.22	Pagedangan	kecamatan	306
4594	36.03.23	Cisauk	kecamatan	306
4595	36.03.27	Sukamulya	kecamatan	306
4596	36.03.28	Kelapa Dua	kecamatan	306
4597	36.03.29	Sindang Jaya	kecamatan	306
4598	36.03.30	Sepatan Timur	kecamatan	306
4599	36.03.31	Solear	kecamatan	306
4600	36.03.32	Gunung Kaler	kecamatan	306
4601	36.03.33	Mekar Baru	kecamatan	306
4602	36.04.05	Kramatwatu	kecamatan	307
4603	36.04.06	Waringinkurung	kecamatan	307
4604	36.04.07	Bojonegara	kecamatan	307
4605	36.04.08	Pulo Ampel	kecamatan	307
4606	36.04.09	Ciruas	kecamatan	307
4607	36.04.11	Kragilan	kecamatan	307
4608	36.04.12	Pontang	kecamatan	307
4609	36.04.13	Tirtayasa	kecamatan	307
4610	36.04.14	Tanara	kecamatan	307
4611	36.04.15	Cikande	kecamatan	307
4612	36.04.16	Kibin	kecamatan	307
4613	36.04.17	Carenang	kecamatan	307
4614	36.04.18	Binuang	kecamatan	307
4615	36.04.19	Petir	kecamatan	307
4616	36.04.20	Tunjung Teja	kecamatan	307
4617	36.04.22	Baros	kecamatan	307
4618	36.04.23	Cikeusal	kecamatan	307
4619	36.04.24	Pamarayan	kecamatan	307
4620	36.04.25	Kopo	kecamatan	307
4621	36.04.26	Jawilan	kecamatan	307
4622	36.04.27	Ciomas	kecamatan	307
4623	36.04.28	Pabuaran	kecamatan	307
4624	36.04.29	Padarincang	kecamatan	307
4625	36.04.30	Anyar	kecamatan	307
4626	36.04.31	Cinangka	kecamatan	307
4627	36.04.32	Mancak	kecamatan	307
4628	36.04.33	Gunungsari	kecamatan	307
4629	36.04.34	Bandung	kecamatan	307
4630	36.04.35	Lebak Wangi	kecamatan	307
4631	36.71.01	Tangerang	kecamatan	308
4632	36.71.02	Jatiuwung	kecamatan	308
4633	36.71.03	Batuceper	kecamatan	308
4634	36.71.04	Benda	kecamatan	308
4635	36.71.05	Cipondoh	kecamatan	308
4636	36.71.06	Ciledug	kecamatan	308
4637	36.71.07	Karawaci	kecamatan	308
4638	36.71.08	Periuk	kecamatan	308
4639	36.71.09	Cibodas	kecamatan	308
4640	36.71.10	Neglasari	kecamatan	308
4641	36.71.11	Pinang	kecamatan	308
4642	36.71.12	Karang Tengah	kecamatan	308
4643	36.71.13	Larangan	kecamatan	308
4644	36.72.01	Cibeber	kecamatan	309
4645	36.72.02	Cilegon	kecamatan	309
4646	36.72.03	Pulomerak	kecamatan	309
4647	36.72.04	Ciwandan	kecamatan	309
4648	36.72.05	Jombang	kecamatan	309
4649	36.72.06	Gerogol	kecamatan	309
4650	36.72.07	Purwakarta	kecamatan	309
4651	36.72.08	Citangkil	kecamatan	309
4652	36.73.01	Serang	kecamatan	310
4653	36.73.02	Kasemen	kecamatan	310
4654	36.73.03	Walantaka	kecamatan	310
4655	36.73.04	Curug	kecamatan	310
4656	36.73.05	Cipocok Jaya	kecamatan	310
4657	36.73.06	Taktakan	kecamatan	310
4658	36.74.01	Serpong	kecamatan	311
4659	36.74.02	Serpong Utara	kecamatan	311
4660	36.74.03	Pondok Aren	kecamatan	311
4661	36.74.04	Ciputat	kecamatan	311
4662	36.74.05	Ciputat Timur	kecamatan	311
4663	36.74.06	Pamulang	kecamatan	311
4664	36.74.07	Setu	kecamatan	311
4665	51.01.01	Negara	kecamatan	312
4666	51.01.02	Mendoyo	kecamatan	312
4667	51.01.03	Pekutatan	kecamatan	312
4668	51.01.04	Melaya	kecamatan	312
4669	51.01.05	Jembrana	kecamatan	312
4670	51.02.01	Selemadeg	kecamatan	313
4671	51.02.02	Selemadeg Timur	kecamatan	313
4672	51.02.03	Selemadeg Barat	kecamatan	313
4673	51.02.04	Kerambitan	kecamatan	313
4674	51.02.05	Tabanan	kecamatan	313
4675	51.02.06	Kediri	kecamatan	313
4676	51.02.07	Marga	kecamatan	313
4677	51.02.08	Penebel	kecamatan	313
4678	51.02.09	Baturiti	kecamatan	313
4679	51.02.10	Pupuan	kecamatan	313
4680	51.03.01	Kuta	kecamatan	314
4681	51.03.02	Mengwi	kecamatan	314
4682	51.03.03	Abiansemal	kecamatan	314
4683	51.03.04	Petang	kecamatan	314
4684	51.03.05	Kuta Selatan	kecamatan	314
4685	51.03.06	Kuta Utara	kecamatan	314
4686	51.04.01	Sukawati	kecamatan	315
4687	51.04.02	Blahbatuh	kecamatan	315
4688	51.04.03	Gianyar	kecamatan	315
4689	51.04.04	Tampaksiring	kecamatan	315
4690	51.04.05	Ubud	kecamatan	315
4691	51.04.06	Tegallalang	kecamatan	315
4692	51.04.07	Payangan	kecamatan	315
4693	51.05.01	Nusa Penida	kecamatan	316
4694	51.05.02	Banjarangkan	kecamatan	316
4695	51.05.03	Klungkung	kecamatan	316
4696	51.05.04	Dawan	kecamatan	316
4697	51.06.01	Susut	kecamatan	317
4698	51.06.02	Bangli	kecamatan	317
4699	51.06.03	Tembuku	kecamatan	317
4700	51.06.04	Kintamani	kecamatan	317
4701	51.07.01	Rendang	kecamatan	318
4702	51.07.02	Sidemen	kecamatan	318
4703	51.07.03	Manggis	kecamatan	318
4704	51.07.04	Karangasem	kecamatan	318
4705	51.07.05	Abang	kecamatan	318
4706	51.07.06	Bebandem	kecamatan	318
4707	51.07.07	Selat	kecamatan	318
4708	51.07.08	Kubu	kecamatan	318
4709	51.08.01	Gerokgak	kecamatan	319
4710	51.08.02	Seririt	kecamatan	319
4711	51.08.03	Busungbiu	kecamatan	319
4712	51.08.04	Banjar	kecamatan	319
4713	51.08.05	Sukasada	kecamatan	319
4714	51.08.06	Buleleng	kecamatan	319
4715	51.08.07	Sawan	kecamatan	319
4716	51.08.08	Kubutambahan	kecamatan	319
4717	51.08.09	Tejakula	kecamatan	319
4718	51.71.01	Denpasar Selatan	kecamatan	320
4719	51.71.02	Denpasar Timur	kecamatan	320
4720	51.71.03	Denpasar Barat	kecamatan	320
4721	51.71.04	Denpasar Utara	kecamatan	320
4722	52.01.01	Gerung	kecamatan	321
4723	52.01.02	Kediri	kecamatan	321
4724	52.01.03	Narmada	kecamatan	321
4725	52.01.07	Sekotong	kecamatan	321
4726	52.01.08	Labuapi	kecamatan	321
4727	52.01.09	Gunungsari	kecamatan	321
4728	52.01.12	Lingsar	kecamatan	321
4729	52.01.13	Lembar	kecamatan	321
4730	52.01.14	Batu Layar	kecamatan	321
4731	52.01.15	Kuripan	kecamatan	321
4732	52.02.01	Praya	kecamatan	322
4733	52.02.02	Jonggat	kecamatan	322
4734	52.02.03	Batukliang	kecamatan	322
4735	52.02.04	Pujut	kecamatan	322
4736	52.02.05	Praya Barat	kecamatan	322
4737	52.02.06	Praya Timur	kecamatan	322
4738	52.02.07	Janapria	kecamatan	322
4739	52.02.08	Pringgarata	kecamatan	322
4740	52.02.09	Kopang	kecamatan	322
4741	52.02.10	Praya Tengah	kecamatan	322
4742	52.02.11	Praya Barat Daya	kecamatan	322
4743	52.02.12	Batukliang Utara	kecamatan	322
4744	52.03.01	Keruak	kecamatan	323
4745	52.03.02	Sakra	kecamatan	323
4746	52.03.03	Terara	kecamatan	323
4747	52.03.04	Sikur	kecamatan	323
4748	52.03.05	Masbagik	kecamatan	323
4749	52.03.06	Sukamulia	kecamatan	323
4750	52.03.07	Selong	kecamatan	323
4751	52.03.08	Pringgabaya	kecamatan	323
4752	52.03.09	Aikmel	kecamatan	323
4753	52.03.10	Sambelia	kecamatan	323
4754	52.03.11	Montong Gading	kecamatan	323
4755	52.03.12	Pringgasela	kecamatan	323
4756	52.03.13	Suralaga	kecamatan	323
4757	52.03.14	Wanasaba	kecamatan	323
4758	52.03.15	Sembalun	kecamatan	323
4759	52.03.16	Suwela	kecamatan	323
4760	52.03.17	Labuhan Haji	kecamatan	323
4761	52.03.18	Sakra Timur	kecamatan	323
4762	52.03.19	Sakra Barat	kecamatan	323
4763	52.03.20	Jerowaru	kecamatan	323
4764	52.03.21	Lenek	kecamatan	323
4765	52.04.02	Lunyuk	kecamatan	324
4766	52.04.05	Alas	kecamatan	324
4767	52.04.06	Utan	kecamatan	324
4768	52.04.07	Batu Lanteh	kecamatan	324
4769	52.04.08	Sumbawa	kecamatan	324
4770	52.04.09	Moyo Hilir	kecamatan	324
4771	52.04.10	Moyo Hulu	kecamatan	324
4772	52.04.11	Ropang	kecamatan	324
4773	52.04.12	Lape	kecamatan	324
4774	52.04.13	Plampang	kecamatan	324
4775	52.04.14	Empang	kecamatan	324
4776	52.04.17	Alas Barat	kecamatan	324
4777	52.04.18	Labuhan Badas	kecamatan	324
4778	52.04.19	Labangka	kecamatan	324
4779	52.04.20	Buer	kecamatan	324
4780	52.04.21	Rhee	kecamatan	324
4781	52.04.22	Unter Iwes	kecamatan	324
4782	52.04.23	Moyo Utara	kecamatan	324
4783	52.04.24	Maronge	kecamatan	324
4784	52.04.25	Tarano	kecamatan	324
4785	52.04.26	Lopok	kecamatan	324
4786	52.04.27	Lenangguar	kecamatan	324
4787	52.04.28	Orong Telu	kecamatan	324
4788	52.04.29	Lantung	kecamatan	324
4789	52.05.01	Dompu	kecamatan	325
4790	52.05.02	Kempo	kecamatan	325
4791	52.05.03	Hu'u	kecamatan	325
4792	52.05.04	Kilo	kecamatan	325
4793	52.05.05	Woja	kecamatan	325
4794	52.05.06	Pekat	kecamatan	325
4795	52.05.07	Manggalewa	kecamatan	325
4796	52.05.08	Pajo	kecamatan	325
4797	52.06.01	Monta	kecamatan	326
4798	52.06.02	Bolo	kecamatan	326
4799	52.06.03	Woha	kecamatan	326
4800	52.06.04	Belo	kecamatan	326
4801	52.06.05	Wawo	kecamatan	326
4802	52.06.06	Sape	kecamatan	326
4803	52.06.07	Wera	kecamatan	326
4804	52.06.08	Donggo	kecamatan	326
4805	52.06.09	Sanggar	kecamatan	326
4806	52.06.10	Ambalawi	kecamatan	326
4807	52.06.11	Langgudu	kecamatan	326
4808	52.06.12	Lambu	kecamatan	326
4809	52.06.13	Madapangga	kecamatan	326
4810	52.06.14	Tambora	kecamatan	326
4811	52.06.15	Soromandi	kecamatan	326
4812	52.06.16	Parado	kecamatan	326
4813	52.06.17	Lambitu	kecamatan	326
4814	52.06.18	Palibelo	kecamatan	326
4815	52.07.01	Jereweh	kecamatan	327
4816	52.07.02	Taliwang	kecamatan	327
4817	52.07.03	Seteluk	kecamatan	327
4818	52.07.04	Sekongkang	kecamatan	327
4819	52.07.05	Brang Rea	kecamatan	327
4820	52.07.06	Poto Tano	kecamatan	327
4821	52.07.07	Brang Ene	kecamatan	327
4822	52.07.08	Maluk	kecamatan	327
4823	52.08.01	Tanjung	kecamatan	328
4824	52.08.02	Gangga	kecamatan	328
4825	52.08.03	Kayangan	kecamatan	328
4826	52.08.04	Bayan	kecamatan	328
4827	52.08.05	Pemenang	kecamatan	328
4828	52.71.01	Ampenan	kecamatan	329
4829	52.71.02	Mataram	kecamatan	329
4830	52.71.03	Cakranegara	kecamatan	329
4831	52.71.04	Sekarbela	kecamatan	329
4832	52.71.05	Selaparang	kecamatan	329
4833	52.71.06	Sandubaya	kecamatan	329
4834	52.72.01	Rasanae Barat	kecamatan	330
4835	52.72.02	Rasanae Timur	kecamatan	330
4836	52.72.03	Asakota	kecamatan	330
4837	52.72.04	Raba	kecamatan	330
4838	52.72.05	Mpunda	kecamatan	330
4839	53.01.04	Semau	kecamatan	331
4840	53.01.05	Kupang Barat	kecamatan	331
4841	53.01.06	Kupang Timur	kecamatan	331
4842	53.01.07	Sulamu	kecamatan	331
4843	53.01.08	Kupang Tengah	kecamatan	331
4844	53.01.09	Amarasi	kecamatan	331
4845	53.01.10	Fatuleu	kecamatan	331
4846	53.01.11	Takari	kecamatan	331
4847	53.01.12	Amfoang Selatan	kecamatan	331
4848	53.01.13	Amfoang Utara	kecamatan	331
4849	53.01.16	Nekamese	kecamatan	331
4850	53.01.17	Amarasi Barat	kecamatan	331
4851	53.01.18	Amarasi Selatan	kecamatan	331
4852	53.01.19	Amarasi Timur	kecamatan	331
4853	53.01.20	Amabi Oefeto Timur	kecamatan	331
4854	53.01.21	Amfoang Barat Daya	kecamatan	331
4855	53.01.22	Amfoang Barat Laut	kecamatan	331
4856	53.01.23	Semau Selatan	kecamatan	331
4857	53.01.24	Taebenu	kecamatan	331
4858	53.01.25	Amabi Oefeto	kecamatan	331
4859	53.01.26	Amfoang Timur	kecamatan	331
4860	53.01.27	Fatuleu Barat	kecamatan	331
4861	53.01.28	Fatuleu Tengah	kecamatan	331
4862	53.01.30	Amfoang Tengah	kecamatan	331
4863	53.02.01	Kota Soe	kecamatan	332
4864	53.02.02	Mollo Selatan	kecamatan	332
4865	53.02.03	Mollo Utara	kecamatan	332
4866	53.02.04	Amanuban Timur	kecamatan	332
4867	53.02.05	Amanuban Tengah	kecamatan	332
4868	53.02.06	Amanuban Selatan	kecamatan	332
4869	53.02.07	Amanuban Barat	kecamatan	332
4870	53.02.08	Amanatun Selatan	kecamatan	332
4871	53.02.09	Amanatun Utara	kecamatan	332
4872	53.02.10	KI'E	kecamatan	332
4873	53.02.11	Kuanfatu	kecamatan	332
4874	53.02.12	Fatumnasi	kecamatan	332
4875	53.02.13	Polen	kecamatan	332
4876	53.02.14	Batu Putih	kecamatan	332
4877	53.02.15	Boking	kecamatan	332
4878	53.02.16	Toianas	kecamatan	332
4879	53.02.17	Nunkolo	kecamatan	332
4880	53.02.18	Oenino	kecamatan	332
4881	53.02.19	Kolbano	kecamatan	332
4882	53.02.20	Kot olin	kecamatan	332
4883	53.02.21	Kualin	kecamatan	332
4884	53.02.22	Mollo Barat	kecamatan	332
4885	53.02.23	Kok Baun	kecamatan	332
4886	53.02.24	Noebana	kecamatan	332
4887	53.02.25	Santian	kecamatan	332
4888	53.02.26	Noebeba	kecamatan	332
4889	53.02.27	Kuatnana	kecamatan	332
4890	53.02.28	Fautmolo	kecamatan	332
4891	53.02.29	Fatukopa	kecamatan	332
4892	53.02.30	Mollo Tengah	kecamatan	332
4893	53.02.31	Tobu	kecamatan	332
4894	53.02.32	Nunbena	kecamatan	332
5011	53.09.02	Golewa	kecamatan	339
4895	53.03.01	Miomaffo Timur	kecamatan	333
4896	53.03.02	Miomaffo Barat	kecamatan	333
4897	53.03.03	Biboki Selatan	kecamatan	333
4898	53.03.04	Noemuti	kecamatan	333
4899	53.03.05	Kota Kefamenanu	kecamatan	333
4900	53.03.06	Biboki Utara	kecamatan	333
4901	53.03.07	Biboki Anleu	kecamatan	333
4902	53.03.08	Insana	kecamatan	333
4903	53.03.09	Insana Utara	kecamatan	333
4904	53.03.10	Noemuti Timur	kecamatan	333
4905	53.03.11	Miomaffo Tengah	kecamatan	333
4906	53.03.12	Musi	kecamatan	333
4907	53.03.13	Mutis	kecamatan	333
4908	53.03.14	Bikomi Selatan	kecamatan	333
4909	53.03.15	Bikomi Tengah	kecamatan	333
4910	53.03.16	Bikomi Nilulat	kecamatan	333
4911	53.03.17	Bikomi Utara	kecamatan	333
4912	53.03.18	Naibenu	kecamatan	333
4913	53.03.19	Insana Fafinesu	kecamatan	333
4914	53.03.20	Insana Barat	kecamatan	333
4915	53.03.21	Insana Tengah	kecamatan	333
4916	53.03.22	Biboki Tan Pah	kecamatan	333
4917	53.03.23	Biboki Moenleu	kecamatan	333
4918	53.03.24	Biboki Feotleu	kecamatan	333
4919	53.04.01	Lamaknen	kecamatan	334
4920	53.04.02	Tasifeto Timur	kecamatan	334
4921	53.04.03	Raihat	kecamatan	334
4922	53.04.04	Tasifeto Barat	kecamatan	334
4923	53.04.05	Kakuluk Mesak	kecamatan	334
4924	53.04.12	Kota Atambua	kecamatan	334
4925	53.04.13	Raimanuk	kecamatan	334
4926	53.04.17	Lasiolat	kecamatan	334
4927	53.04.18	Lamaknen Selatan	kecamatan	334
4928	53.04.21	Atambua Barat	kecamatan	334
4929	53.04.22	Atambua Selatan	kecamatan	334
4930	53.04.23	Nanaet Duabesi	kecamatan	334
4931	53.05.01	Teluk Mutiara	kecamatan	335
4932	53.05.02	Alor Barat Laut	kecamatan	335
4933	53.05.03	Alor Barat Daya	kecamatan	335
4934	53.05.04	Alor Selatan	kecamatan	335
4935	53.05.05	Alor Timur	kecamatan	335
4936	53.05.06	Pantar	kecamatan	335
4937	53.05.07	Alor Tengah Utara	kecamatan	335
4938	53.05.08	Alor Timur Laut	kecamatan	335
4939	53.05.09	Pantar Barat	kecamatan	335
4940	53.05.10	Kabola	kecamatan	335
4941	53.05.11	Pulau Pura	kecamatan	335
4942	53.05.12	Mataru	kecamatan	335
4943	53.05.13	Pureman	kecamatan	335
4944	53.05.14	Pantar Timur	kecamatan	335
4945	53.05.15	Lembur	kecamatan	335
4946	53.05.16	Pantar Tengah	kecamatan	335
4947	53.05.17	Pantar Barat Laut	kecamatan	335
4948	53.05.18	Abad Selatan	kecamatan	335
4949	53.06.01	Wulanggitang	kecamatan	336
4950	53.06.02	Titehena	kecamatan	336
4951	53.06.03	Larantuka	kecamatan	336
4952	53.06.04	Ile Mandiri	kecamatan	336
4953	53.06.05	Tanjung Bunga	kecamatan	336
4954	53.06.06	Solor Barat	kecamatan	336
4955	53.06.07	Solor Timur	kecamatan	336
4956	53.06.08	Adonara Barat	kecamatan	336
4957	53.06.09	Wotan Ulumando	kecamatan	336
4958	53.06.10	Adonara Timur	kecamatan	336
4959	53.06.11	Kelubagolit	kecamatan	336
4960	53.06.12	Witihama	kecamatan	336
4961	53.06.13	Ile Boleng	kecamatan	336
4962	53.06.14	Demon Pagong	kecamatan	336
4963	53.06.15	Lewolema	kecamatan	336
4964	53.06.16	Ile Bura	kecamatan	336
4965	53.06.17	Adonara	kecamatan	336
4966	53.06.18	Adonara Tengah	kecamatan	336
4967	53.06.19	Solor Selatan	kecamatan	336
4968	53.07.01	Paga	kecamatan	337
4969	53.07.02	Mego	kecamatan	337
4970	53.07.03	Lela	kecamatan	337
4971	53.07.04	Nita	kecamatan	337
4972	53.07.05	Alok	kecamatan	337
4973	53.07.06	Palue	kecamatan	337
4974	53.07.07	Nelle	kecamatan	337
4975	53.07.08	Talibura	kecamatan	337
4976	53.07.09	Waigete	kecamatan	337
4977	53.07.10	Kewapante	kecamatan	337
4978	53.07.11	Bola	kecamatan	337
4979	53.07.12	Magepanda	kecamatan	337
4980	53.07.13	Waiblama	kecamatan	337
4981	53.07.14	Alok Barat	kecamatan	337
4982	53.07.15	Alok Timur	kecamatan	337
4983	53.07.16	Koting	kecamatan	337
4984	53.07.17	Tana Wawo	kecamatan	337
4985	53.07.18	Hewokloang	kecamatan	337
4986	53.07.19	Kangae	kecamatan	337
4987	53.07.20	Doreng	kecamatan	337
4988	53.07.21	Mapitara	kecamatan	337
4989	53.08.01	Nangapanda	kecamatan	338
4990	53.08.02	Pulau Ende	kecamatan	338
4991	53.08.03	Ende	kecamatan	338
4992	53.08.04	Ende Selatan	kecamatan	338
4993	53.08.05	Ndona	kecamatan	338
4994	53.08.06	Detusoko	kecamatan	338
4995	53.08.07	Wewaria	kecamatan	338
4996	53.08.08	Wolowaru	kecamatan	338
4997	53.08.09	Wolojita	kecamatan	338
4998	53.08.10	Maurole	kecamatan	338
4999	53.08.11	Maukaro	kecamatan	338
5000	53.08.12	Lio Timur	kecamatan	338
5001	53.08.13	Kota Baru	kecamatan	338
5002	53.08.14	Kelimutu	kecamatan	338
5003	53.08.15	Detukeli	kecamatan	338
5004	53.08.16	Ndona Timur	kecamatan	338
5005	53.08.17	Ndori	kecamatan	338
5006	53.08.18	Ende Utara	kecamatan	338
5007	53.08.19	Ende Tengah	kecamatan	338
5008	53.08.20	Ende Timur	kecamatan	338
5009	53.08.21	Lepembusu Kelisoke	kecamatan	338
5010	53.09.01	Aimere	kecamatan	339
5012	53.09.06	Bajawa	kecamatan	339
5013	53.09.07	Soa	kecamatan	339
5014	53.09.09	Riung	kecamatan	339
5015	53.09.12	Jerebuu	kecamatan	339
5016	53.09.14	Riung Barat	kecamatan	339
5017	53.09.15	Bajawa Utara	kecamatan	339
5018	53.09.16	Wolomeze	kecamatan	339
5019	53.09.18	Golewa Selatan	kecamatan	339
5020	53.09.19	Golewa Barat	kecamatan	339
5021	53.09.20	Inerie	kecamatan	339
5022	53.10.01	Wae Rii	kecamatan	340
5023	53.10.03	Ruteng	kecamatan	340
5024	53.10.05	Satar Mese	kecamatan	340
5025	53.10.06	Cibal	kecamatan	340
5026	53.10.11	Reok	kecamatan	340
5027	53.10.12	Langke Rembong	kecamatan	340
5028	53.10.13	Satar Mese Barat	kecamatan	340
5029	53.10.14	Rahong Utara	kecamatan	340
5030	53.10.15	Lelak	kecamatan	340
5031	53.10.16	Reok Barat	kecamatan	340
5032	53.10.17	Cibal barat	kecamatan	340
5033	53.10.18	Satar Mese Utara	kecamatan	340
5034	53.11.01	Kota Waingapu	kecamatan	341
5035	53.11.02	Haharu	kecamatan	341
5036	53.11.03	Lewa	kecamatan	341
5037	53.11.04	Nggaha Ori Angu	kecamatan	341
5038	53.11.05	Tabundung	kecamatan	341
5039	53.11.06	Pinu Pahar	kecamatan	341
5040	53.11.07	Pandawai	kecamatan	341
5041	53.11.08	Umalulu	kecamatan	341
5042	53.11.09	Rindi	kecamatan	341
5043	53.11.10	Pahunga Lodu	kecamatan	341
5044	53.11.11	Wulla Waijelu	kecamatan	341
5045	53.11.12	Paberiwai	kecamatan	341
5046	53.11.13	Karera	kecamatan	341
5047	53.11.14	Kahaungu Eti	kecamatan	341
5048	53.11.15	Matawai La Pawu	kecamatan	341
5049	53.11.16	Kambera	kecamatan	341
5050	53.11.17	Kambata Mapambuhang	kecamatan	341
5051	53.11.18	Lewa Tidahu	kecamatan	341
5052	53.11.19	Katala Hamu Lingu	kecamatan	341
5053	53.11.20	Kanatang	kecamatan	341
5054	53.11.21	Ngadu Ngala	kecamatan	341
5055	53.11.22	Mahu	kecamatan	341
5056	53.12.04	Tana Righu	kecamatan	342
5057	53.12.10	Loli	kecamatan	342
5058	53.12.11	Wanokaka	kecamatan	342
5059	53.12.12	Lamboya	kecamatan	342
5060	53.12.15	Kota Waikabubak	kecamatan	342
5061	53.12.18	Laboya Barat	kecamatan	342
5062	53.13.01	Naga Wutung	kecamatan	343
5063	53.13.02	Atadei	kecamatan	343
5064	53.13.03	Ile Ape	kecamatan	343
5065	53.13.04	Lebatukan	kecamatan	343
5066	53.13.05	Nubatukan	kecamatan	343
5067	53.13.06	Omesuri	kecamatan	343
5068	53.13.07	Buyasuri	kecamatan	343
5069	53.13.08	Wulandoni	kecamatan	343
5070	53.13.09	Ile Ape Timur	kecamatan	343
5071	53.14.01	Rote Barat Daya	kecamatan	344
5072	53.14.02	Rote Barat Laut	kecamatan	344
5073	53.14.03	Lobalain	kecamatan	344
5074	53.14.04	Rote Tengah	kecamatan	344
5075	53.14.05	Pantai Baru	kecamatan	344
5076	53.14.06	Rote Timur	kecamatan	344
5077	53.14.07	Rote Barat	kecamatan	344
5078	53.14.08	Rote Selatan	kecamatan	344
5079	53.14.09	Ndao Nuse	kecamatan	344
5080	53.14.10	Landu Leko	kecamatan	344
5081	53.14.11	Loaholu	kecamatan	344
5082	53.15.01	Macang Pacar	kecamatan	345
5083	53.15.02	Kuwus	kecamatan	345
5084	53.15.03	Lembor	kecamatan	345
5085	53.15.04	Sano Nggoang	kecamatan	345
5086	53.15.05	Komodo	kecamatan	345
5087	53.15.06	Boleng	kecamatan	345
5088	53.15.07	Welak	kecamatan	345
5089	53.15.08	Ndoso	kecamatan	345
5090	53.15.09	Lembor Selatan	kecamatan	345
5091	53.15.10	Mbeliling	kecamatan	345
5092	53.15.11	Pacar	kecamatan	345
5093	53.15.12	Kuwus Barat	kecamatan	345
5094	53.16.01	Aesesa	kecamatan	346
5095	53.16.02	Nangaroro	kecamatan	346
5096	53.16.03	Boawae	kecamatan	346
5097	53.16.04	Mauponggo	kecamatan	346
5098	53.16.05	Wolowae	kecamatan	346
5099	53.16.06	Keo Tengah	kecamatan	346
5100	53.16.07	Aesesa Selatan	kecamatan	346
5101	53.17.01	Katiku Tana	kecamatan	347
5102	53.17.02	Umbu Ratu Nggay Barat	kecamatan	347
5103	53.17.03	Mamboro	kecamatan	347
5104	53.17.04	Umbu Ratu Nggay	kecamatan	347
5105	53.17.05	Katiku Tana Selatan	kecamatan	347
5106	53.17.06	Umbu Ratu Nggay Tengah	kecamatan	347
5107	53.18.01	Loura	kecamatan	348
5108	53.18.02	Wewewa Utara	kecamatan	348
5109	53.18.03	Wewewa Timur	kecamatan	348
5110	53.18.04	Wewewa Barat	kecamatan	348
5111	53.18.05	Wewewa Selatan	kecamatan	348
5112	53.18.06	Kodi Bangedo	kecamatan	348
5113	53.18.07	Kodi	kecamatan	348
5114	53.18.08	Kodi Utara	kecamatan	348
5115	53.18.09	Kota Tambolaka	kecamatan	348
5116	53.18.10	Wewewa Tengah	kecamatan	348
5117	53.18.11	Kodi Balaghar	kecamatan	348
5118	53.19.01	Borong	kecamatan	349
5119	53.19.02	Lamba Leda Selatan	kecamatan	349
5120	53.19.03	Lamba Leda	kecamatan	349
5121	53.19.04	Sambi Rampas	kecamatan	349
5122	53.19.05	Elar	kecamatan	349
5123	53.19.06	Kota Komba	kecamatan	349
5124	53.19.07	Rana Mese	kecamatan	349
5125	53.19.08	Lamba Leda Timur	kecamatan	349
5126	53.19.09	Elar Selatan	kecamatan	349
5127	53.19.10	Kota Komba Utara	kecamatan	349
5128	53.19.11	Lamba Leda Utara	kecamatan	349
5129	53.19.12	Congkar	kecamatan	349
5130	53.20.01	Sabu Barat	kecamatan	350
5131	53.20.02	Sabu Tengah	kecamatan	350
5132	53.20.03	Sabu Timur	kecamatan	350
5133	53.20.04	Sabu Liae	kecamatan	350
5134	53.20.05	Hawu Mehara	kecamatan	350
5135	53.20.06	Raijua	kecamatan	350
5136	53.21.01	Malaka Tengah	kecamatan	351
5137	53.21.02	Malaka Barat	kecamatan	351
5138	53.21.03	Wewiku	kecamatan	351
5139	53.21.04	Weliman	kecamatan	351
5140	53.21.05	Rinhat	kecamatan	351
5141	53.21.06	Io Kufeu	kecamatan	351
5142	53.21.07	Sasitamean	kecamatan	351
5143	53.21.08	Laenmanen	kecamatan	351
5144	53.21.09	Malaka Timur	kecamatan	351
5145	53.21.10	Kobalima Timur	kecamatan	351
5146	53.21.11	Kobalima	kecamatan	351
5147	53.21.12	Botin Leobele	kecamatan	351
5148	53.71.01	Alak	kecamatan	352
5149	53.71.02	Maulafa	kecamatan	352
5150	53.71.03	Kelapa Lima	kecamatan	352
5151	53.71.04	Oebobo	kecamatan	352
5152	53.71.05	Kota Raja	kecamatan	352
5153	53.71.06	Kota Lama	kecamatan	352
5154	61.01.01	Sambas	kecamatan	353
5155	61.01.02	Teluk Keramat	kecamatan	353
5156	61.01.03	Jawai	kecamatan	353
5157	61.01.04	Tebas	kecamatan	353
5158	61.01.05	Pemangkat	kecamatan	353
5159	61.01.06	Sejangkung	kecamatan	353
5160	61.01.07	Selakau	kecamatan	353
5161	61.01.08	Paloh	kecamatan	353
5162	61.01.09	Sajingan Besar	kecamatan	353
5163	61.01.10	Subah	kecamatan	353
5164	61.01.11	Galing	kecamatan	353
5165	61.01.12	Tekarang	kecamatan	353
5166	61.01.13	Semparuk	kecamatan	353
5167	61.01.14	Sajad	kecamatan	353
5168	61.01.15	Sebawi	kecamatan	353
5169	61.01.16	Jawai Selatan	kecamatan	353
5170	61.01.17	Tangaran	kecamatan	353
5171	61.01.18	Salatiga	kecamatan	353
5172	61.01.19	Selakau Timur	kecamatan	353
5173	61.02.01	Mempawah Hilir	kecamatan	354
5174	61.02.06	Toho	kecamatan	354
5175	61.02.07	Sungai Pinyuh	kecamatan	354
5176	61.02.08	Jongkat	kecamatan	354
5177	61.02.12	Sungai Kunyit	kecamatan	354
5178	61.02.15	Segedong	kecamatan	354
5179	61.02.16	Anjongan	kecamatan	354
5180	61.02.17	Sadaniang	kecamatan	354
5181	61.02.18	Mempawah Timur	kecamatan	354
5182	61.03.01	Kapuas	kecamatan	355
5183	61.03.02	Mukok	kecamatan	355
5184	61.03.03	Noyan	kecamatan	355
5185	61.03.04	Jangkang	kecamatan	355
5186	61.03.05	Bonti	kecamatan	355
5187	61.03.06	Beduai	kecamatan	355
5188	61.03.07	Sekayam	kecamatan	355
5189	61.03.08	Kembayan	kecamatan	355
5190	61.03.09	Parindu	kecamatan	355
5191	61.03.10	Tayan Hulu	kecamatan	355
5192	61.03.11	Tayan Hilir	kecamatan	355
5193	61.03.12	Balai	kecamatan	355
5194	61.03.13	Toba	kecamatan	355
5195	61.03.20	Meliau	kecamatan	355
5196	61.03.21	Entikong	kecamatan	355
5197	61.04.01	Matan Hilir Utara	kecamatan	356
5198	61.04.02	Marau	kecamatan	356
5199	61.04.03	Manis Mata	kecamatan	356
5200	61.04.04	Kendawangan	kecamatan	356
5201	61.04.05	Sandai	kecamatan	356
5202	61.04.07	Sungai Laur	kecamatan	356
5203	61.04.08	Simpang Hulu	kecamatan	356
5204	61.04.11	Nanga Tayap	kecamatan	356
5205	61.04.12	Matan Hilir Selatan	kecamatan	356
5206	61.04.13	Tumbang Titi	kecamatan	356
5207	61.04.14	Jelai Hulu	kecamatan	356
5208	61.04.16	Delta Pawan	kecamatan	356
5209	61.04.17	Muara Pawan	kecamatan	356
5210	61.04.18	Benua Kayong	kecamatan	356
5211	61.04.19	Hulu Sungai	kecamatan	356
5212	61.04.20	Simpang Dua	kecamatan	356
5213	61.04.21	Air Upas	kecamatan	356
5214	61.04.22	Singkup	kecamatan	356
5215	61.04.24	Pemahan	kecamatan	356
5216	61.04.25	Sungai Melayu Rayak	kecamatan	356
5217	61.05.01	Sintang	kecamatan	357
5218	61.05.02	Tempunak	kecamatan	357
5219	61.05.03	Sepauk	kecamatan	357
5220	61.05.04	Ketungau Hilir	kecamatan	357
5221	61.05.05	Ketungau Tengah	kecamatan	357
5222	61.05.06	Ketungau Hulu	kecamatan	357
5223	61.05.07	Dedai	kecamatan	357
5224	61.05.08	Kayan Hilir	kecamatan	357
5225	61.05.09	Kayan Hulu	kecamatan	357
5226	61.05.14	Serawai	kecamatan	357
5227	61.05.15	Ambalau	kecamatan	357
5228	61.05.19	Kelam Permai	kecamatan	357
5229	61.05.20	Sungai Tebelian	kecamatan	357
5230	61.05.21	Binjai Hulu	kecamatan	357
5231	61.06.01	Putussibau Utara	kecamatan	358
5232	61.06.02	Bika	kecamatan	358
5233	61.06.03	Embaloh Hilir	kecamatan	358
5234	61.06.04	Embaloh Hulu	kecamatan	358
5235	61.06.05	Bunut Hilir	kecamatan	358
5236	61.06.06	Bunut Hulu	kecamatan	358
5237	61.06.07	Jongkong	kecamatan	358
5238	61.06.08	Hulu Gurung	kecamatan	358
5239	61.06.09	Selimbau	kecamatan	358
5240	61.06.10	Semitau	kecamatan	358
5241	61.06.11	Seberuang	kecamatan	358
5242	61.06.12	Batang Lupar	kecamatan	358
5243	61.06.13	Empanang	kecamatan	358
5244	61.06.14	Badau	kecamatan	358
5245	61.06.15	Silat Hilir	kecamatan	358
5246	61.06.16	Silat Hulu	kecamatan	358
5247	61.06.17	Putussibau Selatan	kecamatan	358
5248	61.06.18	Kalis	kecamatan	358
5249	61.06.19	Boyan Tanjung	kecamatan	358
5250	61.06.20	Mentebah	kecamatan	358
5251	61.06.21	Pengkadan	kecamatan	358
5252	61.06.22	Suhaid	kecamatan	358
5253	61.06.23	Puring Kencana	kecamatan	358
5254	61.07.01	Sungai Raya	kecamatan	359
5255	61.07.02	Samalantan	kecamatan	359
5256	61.07.03	Ledo	kecamatan	359
5257	61.07.04	Bengkayang	kecamatan	359
5258	61.07.05	Seluas	kecamatan	359
5259	61.07.06	Sanggau Ledo	kecamatan	359
5260	61.07.07	Jagoi Babang	kecamatan	359
5261	61.07.08	Monterado	kecamatan	359
5262	61.07.09	Teriak	kecamatan	359
5263	61.07.10	Suti Semarang	kecamatan	359
5264	61.07.11	Capkala	kecamatan	359
5265	61.07.12	Siding	kecamatan	359
5266	61.07.13	Lumar	kecamatan	359
5267	61.07.14	Sungai Betung	kecamatan	359
5268	61.07.15	Sungai Raya Kepulauan	kecamatan	359
5269	61.07.16	Lembah Bawang	kecamatan	359
5270	61.07.17	Tujuh Belas	kecamatan	359
5271	61.08.01	Ngabang	kecamatan	360
5272	61.08.02	Mempawah Hulu	kecamatan	360
5273	61.08.03	Menjalin	kecamatan	360
5274	61.08.04	Mandor	kecamatan	360
5275	61.08.05	Air Besar	kecamatan	360
5276	61.08.06	Menyuke	kecamatan	360
5277	61.08.07	Sengah Temila	kecamatan	360
5278	61.08.08	Meranti	kecamatan	360
5279	61.08.09	Kuala Behe	kecamatan	360
5280	61.08.10	Sebangki	kecamatan	360
5281	61.08.11	Jelimpo	kecamatan	360
5282	61.08.12	Banyuke Hulu	kecamatan	360
5283	61.08.13	Sompak	kecamatan	360
5284	61.09.01	Sekadau Hilir	kecamatan	361
5285	61.09.02	Sekadau Hulu	kecamatan	361
5286	61.09.03	Nanga Taman	kecamatan	361
5287	61.09.04	Nanga Mahap	kecamatan	361
5288	61.09.05	Belitang Hilir	kecamatan	361
5289	61.09.06	Belitang Hulu	kecamatan	361
5290	61.09.07	Belitang	kecamatan	361
5291	61.10.01	Belimbing	kecamatan	362
5292	61.10.02	Nanga Pinoh	kecamatan	362
5293	61.10.03	Ella Hilir	kecamatan	362
5294	61.10.04	Menukung	kecamatan	362
5295	61.10.05	Sayan	kecamatan	362
5296	61.10.06	Tanah Pinoh	kecamatan	362
5297	61.10.07	Sokan	kecamatan	362
5298	61.10.08	Pinoh Utara	kecamatan	362
5299	61.10.09	Pinoh Selatan	kecamatan	362
5300	61.10.10	Belimbing Hulu	kecamatan	362
5301	61.10.11	Tanah Pinoh Barat	kecamatan	362
5302	61.11.01	Sukadana	kecamatan	363
5303	61.11.02	Simpang Hilir	kecamatan	363
5304	61.11.03	Teluk Batang	kecamatan	363
5305	61.11.04	Pulau Maya	kecamatan	363
5306	61.11.05	Seponti	kecamatan	363
5307	61.11.06	Kepulauan Karimata	kecamatan	363
5308	61.12.01	Sungai Raya	kecamatan	364
5309	61.12.02	Kuala Mandor B	kecamatan	364
5310	61.12.03	Sungai Ambawang	kecamatan	364
5311	61.12.04	Terentang	kecamatan	364
5312	61.12.05	Batu Ampar	kecamatan	364
5313	61.12.06	Kubu	kecamatan	364
5314	61.12.07	Rasau Jaya	kecamatan	364
5315	61.12.08	Teluk Pakedai	kecamatan	364
5316	61.12.09	Sungai Kakap	kecamatan	364
5317	61.71.01	Pontianak Selatan	kecamatan	365
5318	61.71.02	Pontianak Timur	kecamatan	365
5319	61.71.03	Pontianak Barat	kecamatan	365
5320	61.71.04	Pontianak Utara	kecamatan	365
5321	61.71.05	Pontianak Kota	kecamatan	365
5322	61.71.06	Pontianak Tenggara	kecamatan	365
5323	61.72.01	Singkawang Tengah	kecamatan	366
5324	61.72.02	Singkawang Barat	kecamatan	366
5325	61.72.03	Singkawang Timur	kecamatan	366
5326	61.72.04	Singkawang Utara	kecamatan	366
5327	61.72.05	Singkawang Selatan	kecamatan	366
5328	62.01.01	Kumai	kecamatan	367
5329	62.01.02	Arut Selatan	kecamatan	367
5330	62.01.03	Kotawaringin Lama	kecamatan	367
5331	62.01.04	Arut Utara	kecamatan	367
5332	62.01.05	Pangkalan Lada	kecamatan	367
5333	62.01.06	Pangkalan Banteng	kecamatan	367
5334	62.02.01	Kota Besi	kecamatan	368
5335	62.02.02	Cempaga	kecamatan	368
5336	62.02.03	Mentaya Hulu	kecamatan	368
5337	62.02.04	Parenggean	kecamatan	368
5338	62.02.05	Baamang	kecamatan	368
5339	62.02.06	Mentawa Baru Ketapang	kecamatan	368
5340	62.02.07	Mentaya Hilir Utara	kecamatan	368
5341	62.02.08	Mentaya Hilir Selatan	kecamatan	368
5342	62.02.09	Pulau Hanaut	kecamatan	368
5343	62.02.10	Antang Kalang	kecamatan	368
5344	62.02.11	Teluk Sampit	kecamatan	368
5345	62.02.12	Seranau	kecamatan	368
5346	62.02.13	Cempaga Hulu	kecamatan	368
5347	62.02.14	Telawang	kecamatan	368
5348	62.02.15	Bukit Santuai	kecamatan	368
5349	62.02.16	Tualan Hulu	kecamatan	368
5350	62.02.17	Telaga Antang	kecamatan	368
5351	62.03.01	Selat	kecamatan	369
5352	62.03.02	Kapuas Hilir	kecamatan	369
5353	62.03.03	Kapuas Timur	kecamatan	369
5354	62.03.04	Kapuas Kuala	kecamatan	369
5355	62.03.05	Kapuas Barat	kecamatan	369
5356	62.03.06	Pulau Petak	kecamatan	369
5357	62.03.07	Kapuas Murung	kecamatan	369
5358	62.03.08	Basarang	kecamatan	369
5359	62.03.09	Mantangai	kecamatan	369
5360	62.03.10	Timpah	kecamatan	369
5361	62.03.11	Kapuas Tengah	kecamatan	369
5362	62.03.12	Kapuas Hulu	kecamatan	369
5363	62.03.13	Tamban Catur	kecamatan	369
5364	62.03.14	Pasak Talawang	kecamatan	369
5365	62.03.15	Mandau Talawang	kecamatan	369
5366	62.03.16	Dadahup	kecamatan	369
5367	62.03.17	Bataguh	kecamatan	369
5368	62.04.01	Jenamas	kecamatan	370
5369	62.04.02	Dusun Hilir	kecamatan	370
5370	62.04.03	Karau Kuala	kecamatan	370
5371	62.04.04	Dusun Utara	kecamatan	370
5372	62.04.05	Gn. Bintang Awai	kecamatan	370
5373	62.04.06	Dusun Selatan	kecamatan	370
5374	62.05.01	Montallat	kecamatan	371
5375	62.05.02	Gunung Timang	kecamatan	371
5376	62.05.03	Gunung Purei	kecamatan	371
5377	62.05.04	Teweh Timur	kecamatan	371
5378	62.05.05	Teweh Tengah	kecamatan	371
5379	62.05.06	Lahei	kecamatan	371
5380	62.05.07	Teweh Baru	kecamatan	371
5381	62.05.08	Teweh Selatan	kecamatan	371
5382	62.05.09	Lahei Barat	kecamatan	371
5383	62.06.01	Kamipang	kecamatan	372
5384	62.06.02	Katingan Hilir	kecamatan	372
5385	62.06.03	Tewang Sangalang Garing	kecamatan	372
5386	62.06.04	Pulau Malan	kecamatan	372
5387	62.06.05	Katingan Tengah	kecamatan	372
5388	62.06.06	Sanaman Mantikei	kecamatan	372
5389	62.06.07	Marikit	kecamatan	372
5390	62.06.08	Katingan Hulu	kecamatan	372
5391	62.06.09	Mendawai	kecamatan	372
5392	62.06.10	Katingan Kuala	kecamatan	372
5393	62.06.11	Tasik Payawan	kecamatan	372
5394	62.06.12	Petak Malai	kecamatan	372
5395	62.06.13	Bukit Raya	kecamatan	372
5396	62.07.01	Seruyan Hilir	kecamatan	373
5397	62.07.02	Seruyan Tengah	kecamatan	373
5398	62.07.03	Danau Sembuluh	kecamatan	373
5399	62.07.04	Hanau	kecamatan	373
5400	62.07.05	Seruyan Hulu	kecamatan	373
5401	62.07.06	Seruyan Hilir Timur	kecamatan	373
5402	62.07.07	Seruyan Raya	kecamatan	373
5403	62.07.08	Danau Seluluk	kecamatan	373
5404	62.07.09	Batu Ampar	kecamatan	373
5405	62.07.10	Suling Tambun	kecamatan	373
5406	62.08.01	Sukamara	kecamatan	374
5407	62.08.02	Jelai	kecamatan	374
5408	62.08.03	Balai Riam	kecamatan	374
5409	62.08.04	Pantai Lunci	kecamatan	374
5410	62.08.05	Permata Kecubung	kecamatan	374
5411	62.09.01	Lamandau	kecamatan	375
5412	62.09.02	Delang	kecamatan	375
5413	62.09.03	Bulik	kecamatan	375
5414	62.09.04	Bulik Timur	kecamatan	375
5415	62.09.05	Menthobi Raya	kecamatan	375
5416	62.09.06	Sematu Jaya	kecamatan	375
5417	62.09.07	Belantikan Raya	kecamatan	375
5418	62.09.08	Batang Kawa	kecamatan	375
5419	62.10.01	Sepang	kecamatan	376
5420	62.10.02	Kurun	kecamatan	376
5421	62.10.03	Tewah	kecamatan	376
5422	62.10.04	Kahayan Hulu Utara	kecamatan	376
5423	62.10.05	Rungan	kecamatan	376
5424	62.10.06	Manuhing	kecamatan	376
5425	62.10.07	Mihing Raya	kecamatan	376
5426	62.10.08	Damang Batu	kecamatan	376
5427	62.10.09	Miri Manasa	kecamatan	376
5428	62.10.10	Rungan Hulu	kecamatan	376
5429	62.10.11	Manuhing Raya	kecamatan	376
5430	62.10.12	Rungan Barat	kecamatan	376
5431	62.11.01	Pandih Batu	kecamatan	377
5432	62.11.02	Kahayan Kuala	kecamatan	377
5433	62.11.03	Kahayan Tengah	kecamatan	377
5434	62.11.04	Banama Tingang	kecamatan	377
5435	62.11.05	Kahayan Hilir	kecamatan	377
5436	62.11.06	Maliku	kecamatan	377
5437	62.11.07	Jabiren Raya	kecamatan	377
5438	62.11.08	Sebangau Kuala	kecamatan	377
5439	62.12.01	Murung	kecamatan	378
5440	62.12.02	Tanah Siang	kecamatan	378
5441	62.12.03	Laung Tuhup	kecamatan	378
5442	62.12.04	Permata Intan	kecamatan	378
5443	62.12.05	Sumber Barito	kecamatan	378
5444	62.12.06	Barito Tuhup Raya	kecamatan	378
5445	62.12.07	Tanah Siang Selatan	kecamatan	378
5446	62.12.08	Sungai Babuat	kecamatan	378
5447	62.12.09	Seribu Riam	kecamatan	378
5448	62.12.10	Uut Murung	kecamatan	378
5449	62.13.01	Dusun Timur	kecamatan	379
5450	62.13.02	Banua Lima	kecamatan	379
5451	62.13.03	Patangkep Tutui	kecamatan	379
5452	62.13.04	Awang	kecamatan	379
5453	62.13.05	Dusun Tengah	kecamatan	379
5454	62.13.06	Pematang Karau	kecamatan	379
5455	62.13.07	Paju Epat	kecamatan	379
5456	62.13.08	Raren Batuah	kecamatan	379
5457	62.13.09	Paku	kecamatan	379
5458	62.13.10	Karusen Janang	kecamatan	379
5459	62.71.01	Pahandut	kecamatan	380
5460	62.71.02	Bukit Batu	kecamatan	380
5461	62.71.03	Jekan Raya	kecamatan	380
5462	62.71.04	Sabangau	kecamatan	380
5463	62.71.05	Rakumpit	kecamatan	380
5464	63.01.01	Takisung	kecamatan	381
5465	63.01.02	Jorong	kecamatan	381
5466	63.01.03	Pelaihari	kecamatan	381
5467	63.01.04	Kurau	kecamatan	381
5468	63.01.05	Bati Bati	kecamatan	381
5469	63.01.06	Panyipatan	kecamatan	381
5470	63.01.07	Kintap	kecamatan	381
5471	63.01.08	Tambang Ulang	kecamatan	381
5472	63.01.09	Batu Ampar	kecamatan	381
5473	63.01.10	Bajuin	kecamatan	381
5474	63.01.11	Bumi Makmur	kecamatan	381
5475	63.02.01	Pulau Sembilan	kecamatan	382
5476	63.02.02	Pulau Laut Barat	kecamatan	382
5477	63.02.03	Pulau Laut Selatan	kecamatan	382
5478	63.02.04	Pulau Laut Timur	kecamatan	382
5479	63.02.05	Pulau Sebuku	kecamatan	382
5480	63.02.06	Pulaulaut Utara	kecamatan	382
5481	63.02.07	Kelumpang Selatan	kecamatan	382
5482	63.02.08	Kelumpang Hulu	kecamatan	382
5483	63.02.09	Kelumpang Tengah	kecamatan	382
5484	63.02.10	Kelumpang Utara	kecamatan	382
5485	63.02.11	Pamukan Selatan	kecamatan	382
5486	63.02.12	Sampanahan	kecamatan	382
5487	63.02.13	Pamukan Utara	kecamatan	382
5488	63.02.14	Hampang	kecamatan	382
5489	63.02.15	Sungai Durian	kecamatan	382
5490	63.02.16	Pulau Laut Tengah	kecamatan	382
5491	63.02.17	Kelumpang Hilir	kecamatan	382
5492	63.02.18	Kelumpang Barat	kecamatan	382
5493	63.02.19	Pamukan Barat	kecamatan	382
5494	63.02.20	Pulau Laut Kepulauan	kecamatan	382
5495	63.02.21	Pulau Laut Tanjung Selayar	kecamatan	382
5496	63.02.22	Pulaulaut Sigam	kecamatan	382
5497	63.03.01	Aluh Aluh	kecamatan	383
5498	63.03.02	Kertak Hanyar	kecamatan	383
5499	63.03.03	Gambut	kecamatan	383
5500	63.03.04	Sungai Tabuk	kecamatan	383
5501	63.03.05	Martapura	kecamatan	383
5502	63.03.06	Karang Intan	kecamatan	383
5503	63.03.07	Astambul	kecamatan	383
5504	63.03.08	Simpang Empat	kecamatan	383
5505	63.03.09	Pengaron	kecamatan	383
5506	63.03.10	Sungai Pinang	kecamatan	383
5507	63.03.11	Aranio	kecamatan	383
5508	63.03.12	Mataraman	kecamatan	383
5509	63.03.13	Beruntung Baru	kecamatan	383
5510	63.03.14	Martapura Barat	kecamatan	383
5511	63.03.15	Martapura Timur	kecamatan	383
5512	63.03.16	Sambung Makmur	kecamatan	383
5513	63.03.17	Paramasan	kecamatan	383
5514	63.03.18	Telaga Bauntung	kecamatan	383
5515	63.03.19	Tatah Makmur	kecamatan	383
5516	63.03.20	Cintapuri Darussalam	kecamatan	383
5517	63.04.01	Tabunganen	kecamatan	384
5518	63.04.02	Tamban	kecamatan	384
5519	63.04.03	Anjir Pasar	kecamatan	384
5520	63.04.04	Anjir Muara	kecamatan	384
5521	63.04.05	Alalak	kecamatan	384
5522	63.04.06	Mandastana	kecamatan	384
5523	63.04.07	Rantau Badauh	kecamatan	384
5524	63.04.08	Belawang	kecamatan	384
5525	63.04.09	Cerbon	kecamatan	384
5526	63.04.10	Bakumpai	kecamatan	384
5527	63.04.11	Kuripan	kecamatan	384
5528	63.04.12	Tabukan	kecamatan	384
5529	63.04.13	Mekarsari	kecamatan	384
5530	63.04.14	Barambai	kecamatan	384
5531	63.04.15	Marabahan	kecamatan	384
5532	63.04.16	Wanaraya	kecamatan	384
5533	63.04.17	Jejangkit	kecamatan	384
5534	63.05.01	Binuang	kecamatan	385
5535	63.05.02	Tapin Selatan	kecamatan	385
5536	63.05.03	Tapin Tengah	kecamatan	385
5537	63.05.04	Tapin Utara	kecamatan	385
5538	63.05.05	Candi Laras Selatan	kecamatan	385
5539	63.05.06	Candi Laras Utara	kecamatan	385
5540	63.05.07	Bakarangan	kecamatan	385
5541	63.05.08	Piani	kecamatan	385
5542	63.05.09	Bungur	kecamatan	385
5543	63.05.10	Lokpaikat	kecamatan	385
5544	63.05.11	Salam Babaris	kecamatan	385
5545	63.05.12	Hatungun	kecamatan	385
5546	63.06.01	Sungai Raya	kecamatan	386
5547	63.06.02	Padang Batung	kecamatan	386
5548	63.06.03	Telaga Langsat	kecamatan	386
5549	63.06.04	Angkinang	kecamatan	386
5550	63.06.05	Kandangan	kecamatan	386
5551	63.06.06	Simpur	kecamatan	386
5552	63.06.07	Daha Selatan	kecamatan	386
5553	63.06.08	Daha Utara	kecamatan	386
5554	63.06.09	Kalumpang	kecamatan	386
5555	63.06.10	Loksado	kecamatan	386
5556	63.06.11	Daha Barat	kecamatan	386
5557	63.07.01	Haruyan	kecamatan	387
5558	63.07.02	Batu Benawa	kecamatan	387
5559	63.07.03	Labuan Amas Selatan	kecamatan	387
5560	63.07.04	Labuan Amas Utara	kecamatan	387
5561	63.07.05	Pandawan	kecamatan	387
5562	63.07.06	Barabai	kecamatan	387
5563	63.07.07	Batang Alai Selatan	kecamatan	387
5564	63.07.08	Batang Alai Utara	kecamatan	387
5565	63.07.09	Hantakan	kecamatan	387
5566	63.07.10	Batang Alai Timur	kecamatan	387
5567	63.07.11	Limpasu	kecamatan	387
5568	63.08.01	Danau Panggang	kecamatan	388
5569	63.08.02	Babirik	kecamatan	388
5570	63.08.03	Sungai Pandan	kecamatan	388
5571	63.08.04	Amuntai Selatan	kecamatan	388
5572	63.08.05	Amuntai Tengah	kecamatan	388
5573	63.08.06	Amuntai Utara	kecamatan	388
5574	63.08.07	Banjang	kecamatan	388
5575	63.08.08	Haur Gading	kecamatan	388
5576	63.08.09	Paminggir	kecamatan	388
5577	63.08.10	Sungai Tabukan	kecamatan	388
5578	63.09.01	Banua Lawas	kecamatan	389
5579	63.09.02	Kelua	kecamatan	389
5580	63.09.03	Tanta	kecamatan	389
5581	63.09.04	Tanjung	kecamatan	389
5582	63.09.05	Haruai	kecamatan	389
5583	63.09.06	Murung Pudak	kecamatan	389
5584	63.09.07	Muara Uya	kecamatan	389
5585	63.09.08	Muara Harus	kecamatan	389
5586	63.09.09	Pugaan	kecamatan	389
5587	63.09.10	Upau	kecamatan	389
5588	63.09.11	Jaro	kecamatan	389
5589	63.09.12	Bintang Ara	kecamatan	389
5590	63.10.01	Batu Licin	kecamatan	390
5591	63.10.02	Kusan Hilir	kecamatan	390
5592	63.10.03	Sungai Loban	kecamatan	390
5593	63.10.04	Satui	kecamatan	390
5594	63.10.05	Kusan Hulu	kecamatan	390
5595	63.10.06	Simpang Empat	kecamatan	390
5596	63.10.07	Karang Bintang	kecamatan	390
5597	63.10.08	Mantewe	kecamatan	390
5598	63.10.09	Angsana	kecamatan	390
5599	63.10.10	Kuranji	kecamatan	390
5600	63.10.11	Kusan Tengah	kecamatan	390
5601	63.10.12	Teluk Kepayang	kecamatan	390
5602	63.11.01	Juai	kecamatan	391
5603	63.11.02	Halong	kecamatan	391
5604	63.11.03	Awayan	kecamatan	391
5605	63.11.04	Batu Mandi	kecamatan	391
5606	63.11.05	Lampihong	kecamatan	391
5607	63.11.06	Paringin	kecamatan	391
5608	63.11.07	Paringin Selatan	kecamatan	391
5609	63.11.08	Tebing Tinggi	kecamatan	391
5610	63.71.01	Banjarmasin Selatan	kecamatan	392
5611	63.71.02	Banjarmasin Timur	kecamatan	392
5612	63.71.03	Banjarmasin Barat	kecamatan	392
5613	63.71.04	Banjarmasin Utara	kecamatan	392
5614	63.71.05	Banjarmasin Tengah	kecamatan	392
5615	63.72.02	Landasan Ulin	kecamatan	393
5616	63.72.03	Cempaka	kecamatan	393
5617	63.72.04	Banjarbaru Utara	kecamatan	393
5618	63.72.05	Banjarbaru Selatan	kecamatan	393
5619	63.72.06	Liang Anggang	kecamatan	393
5620	64.01.01	Batu Sopang	kecamatan	394
5621	64.01.02	Tanjung Harapan	kecamatan	394
5622	64.01.03	Paser Belengkong	kecamatan	394
5623	64.01.04	Tanah Grogot	kecamatan	394
5624	64.01.05	Kuaro	kecamatan	394
5625	64.01.06	Long Ikis	kecamatan	394
5626	64.01.07	Muara Komam	kecamatan	394
5627	64.01.08	Long Kali	kecamatan	394
5628	64.01.09	Batu Engau	kecamatan	394
5629	64.01.10	Muara Samu	kecamatan	394
5630	64.02.01	Muara Muntai	kecamatan	395
5631	64.02.02	Loa Kulu	kecamatan	395
5632	64.02.03	Loa Janan	kecamatan	395
5633	64.02.04	Anggana	kecamatan	395
5634	64.02.05	Muara Badak	kecamatan	395
5635	64.02.06	Tenggarong	kecamatan	395
5636	64.02.07	Sebulu	kecamatan	395
5637	64.02.08	Kota Bangun	kecamatan	395
5638	64.02.09	Kenohan	kecamatan	395
5639	64.02.10	Kembang Janggut	kecamatan	395
5640	64.02.11	Muara Kaman	kecamatan	395
5641	64.02.12	Tabang	kecamatan	395
5642	64.02.13	Samboja	kecamatan	395
5643	64.02.14	Muara Jawa	kecamatan	395
5644	64.02.15	Sanga Sanga	kecamatan	395
5645	64.02.16	Tenggarong Seberang	kecamatan	395
5646	64.02.17	Marang Kayu	kecamatan	395
5647	64.02.18	Muara Wis	kecamatan	395
5648	64.02.19	Kota Bangun Darat	kecamatan	395
5649	64.02.20	Samboja Barat	kecamatan	395
5650	64.03.01	Kelay	kecamatan	396
5651	64.03.02	Talisayan	kecamatan	396
5652	64.03.03	Sambaliung	kecamatan	396
5653	64.03.04	Segah	kecamatan	396
5654	64.03.05	Tanjung Redeb	kecamatan	396
5655	64.03.06	Gunung Tabur	kecamatan	396
5656	64.03.07	Pulau Derawan	kecamatan	396
5657	64.03.08	Biduk-Biduk	kecamatan	396
5658	64.03.09	Teluk Bayur	kecamatan	396
5659	64.03.10	Tabalar	kecamatan	396
5660	64.03.11	Maratua	kecamatan	396
5661	64.03.12	Batu Putih	kecamatan	396
5662	64.03.13	Biatan	kecamatan	396
5663	64.07.05	Long Iram	kecamatan	397
5664	64.07.06	Melak	kecamatan	397
5665	64.07.07	Barong Tongkok	kecamatan	397
5666	64.07.08	Damai	kecamatan	397
5667	64.07.09	Muara Lawa	kecamatan	397
5668	64.07.10	Muara Pahu	kecamatan	397
5669	64.07.11	Jempang	kecamatan	397
5670	64.07.12	Bongan	kecamatan	397
5671	64.07.13	Penyinggahan	kecamatan	397
5672	64.07.14	Bentian Besar	kecamatan	397
5673	64.07.15	Linggang Bigung	kecamatan	397
5674	64.07.16	Nyuatan	kecamatan	397
5675	64.07.17	Siluq Ngurai	kecamatan	397
5676	64.07.18	Mook Manaar Bulatn	kecamatan	397
5677	64.07.19	Tering	kecamatan	397
5678	64.07.20	Sekolaq Darat	kecamatan	397
5679	64.08.01	Muara Ancalong	kecamatan	398
5680	64.08.02	Muara Wahau	kecamatan	398
5681	64.08.03	Muara Bengkal	kecamatan	398
5682	64.08.04	Sangatta Utara	kecamatan	398
5683	64.08.05	Sangkulirang	kecamatan	398
5684	64.08.06	Busang	kecamatan	398
5685	64.08.07	Telen	kecamatan	398
5686	64.08.08	Kombeng	kecamatan	398
5687	64.08.09	Bengalon	kecamatan	398
5688	64.08.10	Kaliorang	kecamatan	398
5689	64.08.11	Sandaran	kecamatan	398
5690	64.08.12	Sangatta Selatan	kecamatan	398
5691	64.08.13	Teluk Pandan	kecamatan	398
5692	64.08.14	Rantau Pulung	kecamatan	398
5693	64.08.15	Kaubun	kecamatan	398
5694	64.08.16	Karangan	kecamatan	398
5695	64.08.17	Batu Ampar	kecamatan	398
5696	64.08.18	Long Mesangat	kecamatan	398
5697	64.09.01	Penajam	kecamatan	399
5698	64.09.02	Waru	kecamatan	399
5699	64.09.03	Babulu	kecamatan	399
5700	64.09.04	Sepaku	kecamatan	399
5701	64.11.01	Long Bagun	kecamatan	400
5702	64.11.02	Long Hubung	kecamatan	400
5703	64.11.03	Laham	kecamatan	400
5704	64.11.04	Long Apari	kecamatan	400
5705	64.11.05	Long Pahangai	kecamatan	400
5706	64.71.01	Balikpapan Timur	kecamatan	401
5707	64.71.02	Balikpapan Barat	kecamatan	401
5708	64.71.03	Balikpapan Utara	kecamatan	401
5709	64.71.04	Balikpapan Tengah	kecamatan	401
5710	64.71.05	Balikpapan Selatan	kecamatan	401
5711	64.71.06	Balikpapan Kota	kecamatan	401
5712	64.72.01	Palaran	kecamatan	402
5713	64.72.02	Samarinda Seberang	kecamatan	402
5714	64.72.03	Samarinda Ulu	kecamatan	402
5715	64.72.04	Samarinda Ilir	kecamatan	402
5716	64.72.05	Samarinda Utara	kecamatan	402
5717	64.72.06	Sungai Kunjang	kecamatan	402
5718	64.72.07	Sambutan	kecamatan	402
5719	64.72.08	Sungai Pinang	kecamatan	402
5720	64.72.09	Samarinda Kota	kecamatan	402
5721	64.72.10	Loa Janan Ilir	kecamatan	402
5722	64.74.01	Bontang Utara	kecamatan	403
5723	64.74.02	Bontang Selatan	kecamatan	403
5724	64.74.03	Bontang Barat	kecamatan	403
5725	65.01.01	Tanjung Palas	kecamatan	404
5726	65.01.02	Tanjung Palas Barat	kecamatan	404
5727	65.01.03	Tanjung Palas Utara	kecamatan	404
5728	65.01.04	Tanjung Palas Timur	kecamatan	404
5729	65.01.05	Tanjung Selor	kecamatan	404
5730	65.01.06	Tanjung Palas Tengah	kecamatan	404
5731	65.01.07	Peso	kecamatan	404
5732	65.01.08	Peso Hilir	kecamatan	404
5733	65.01.09	Sekatak	kecamatan	404
5734	65.01.10	Bunyu	kecamatan	404
5735	65.02.01	Mentarang	kecamatan	405
5736	65.02.02	Malinau Kota	kecamatan	405
5737	65.02.03	Pujungan	kecamatan	405
5738	65.02.04	Kayan Hilir	kecamatan	405
5739	65.02.05	Kayan Hulu	kecamatan	405
5740	65.02.06	Malinau Selatan	kecamatan	405
5741	65.02.07	Malinau Utara	kecamatan	405
5742	65.02.08	Malinau Barat	kecamatan	405
5743	65.02.09	Sungai Boh	kecamatan	405
5744	65.02.10	Kayan Selatan	kecamatan	405
5745	65.02.11	Bahau Hulu	kecamatan	405
5746	65.02.12	Mentarang Hulu	kecamatan	405
5747	65.02.13	Malinau Selatan Hilir	kecamatan	405
5748	65.02.14	Malinau Selatan Hulu	kecamatan	405
5749	65.02.15	Sungai Tubu	kecamatan	405
5750	65.03.01	Sebatik	kecamatan	406
5751	65.03.02	Nunukan	kecamatan	406
5752	65.03.03	Sembakung	kecamatan	406
5753	65.03.04	Lumbis	kecamatan	406
5754	65.03.05	Krayan	kecamatan	406
5755	65.03.06	Sebuku	kecamatan	406
5756	65.03.07	Krayan Selatan	kecamatan	406
5757	65.03.08	Sebatik Barat	kecamatan	406
5758	65.03.09	Nunukan Selatan	kecamatan	406
5759	65.03.10	Sebatik Timur	kecamatan	406
5760	65.03.11	Sebatik Utara	kecamatan	406
5761	65.03.12	Sebatik Tengah	kecamatan	406
5762	65.03.13	Sei Menggaris	kecamatan	406
5763	65.03.14	Tulin Onsoi	kecamatan	406
5764	65.03.15	Lumbis Ogong	kecamatan	406
5765	65.03.16	Sembakung Atulai	kecamatan	406
5766	65.03.17	Krayan Tengah	kecamatan	406
5767	65.03.18	Krayan Timur	kecamatan	406
5768	65.03.19	Krayan Barat	kecamatan	406
5769	65.03.20	Lumbis Pansiangan	kecamatan	406
5770	65.03.21	Lumbis Hulu	kecamatan	406
5771	65.04.01	Sesayap	kecamatan	407
5772	65.04.02	Sesayap Hilir	kecamatan	407
5773	65.04.03	Tana Lia	kecamatan	407
5774	65.04.04	Betayau	kecamatan	407
5775	65.04.05	Muruk Rian	kecamatan	407
5776	65.71.01	Tarakan Barat	kecamatan	408
5777	65.71.02	Tarakan Tengah	kecamatan	408
5778	65.71.03	Tarakan Timur	kecamatan	408
5779	65.71.04	Tarakan Utara	kecamatan	408
5780	71.01.05	Sang Tombolang	kecamatan	409
5781	71.01.09	Dumoga Barat	kecamatan	409
5782	71.01.10	Dumoga Timur	kecamatan	409
5783	71.01.11	Dumoga Utara	kecamatan	409
5784	71.01.12	Lolak	kecamatan	409
5785	71.01.13	Bolaang	kecamatan	409
5786	71.01.14	Lolayan	kecamatan	409
5787	71.01.19	Passi Barat	kecamatan	409
5788	71.01.20	Poigar	kecamatan	409
5789	71.01.22	Passi Timur	kecamatan	409
5790	71.01.31	Bolaang Timur	kecamatan	409
5791	71.01.32	Bilalang	kecamatan	409
5792	71.01.33	Dumoga	kecamatan	409
5793	71.01.34	Dumoga Tenggara	kecamatan	409
5794	71.01.35	Dumoga Tengah	kecamatan	409
5795	71.02.01	Tondano Barat	kecamatan	410
5796	71.02.02	Tondano Timur	kecamatan	410
5797	71.02.03	Eris	kecamatan	410
5798	71.02.04	Kombi	kecamatan	410
5799	71.02.05	Lembean Timur	kecamatan	410
5800	71.02.06	Kakas	kecamatan	410
5801	71.02.07	Tompaso	kecamatan	410
5802	71.02.08	Remboken	kecamatan	410
5803	71.02.09	Langowan Timur	kecamatan	410
5804	71.02.10	Langowan Barat	kecamatan	410
5805	71.02.11	Sonder	kecamatan	410
5806	71.02.12	Kawangkoan	kecamatan	410
5807	71.02.13	Pineleng	kecamatan	410
5808	71.02.14	Tombulu	kecamatan	410
5809	71.02.15	Tombariri	kecamatan	410
5810	71.02.16	Tondano Utara	kecamatan	410
5811	71.02.17	Langowan Selatan	kecamatan	410
5812	71.02.18	Tondano Selatan	kecamatan	410
5813	71.02.19	Langowan Utara	kecamatan	410
5814	71.02.20	Kakas Barat	kecamatan	410
5815	71.02.21	Kawangkoan Utara	kecamatan	410
5816	71.02.22	Kawangkoan Barat	kecamatan	410
5817	71.02.23	Mandolang	kecamatan	410
5818	71.02.24	Tombariri Timur	kecamatan	410
5819	71.02.25	Tompaso Barat	kecamatan	410
5820	71.03.08	Tabukan Utara	kecamatan	411
5821	71.03.09	Nusa Tabukan	kecamatan	411
5822	71.03.10	Manganitu Selatan	kecamatan	411
5823	71.03.11	Tatoareng	kecamatan	411
5824	71.03.12	Tamako	kecamatan	411
5825	71.03.13	Manganitu	kecamatan	411
5826	71.03.14	Tabukan Tengah	kecamatan	411
5827	71.03.15	Tabukan Selatan	kecamatan	411
5828	71.03.16	Kendahe	kecamatan	411
5829	71.03.17	Tahuna	kecamatan	411
5830	71.03.19	Tabukan Selatan Tengah	kecamatan	411
5831	71.03.20	Tabukan Selatan Tenggara	kecamatan	411
5832	71.03.23	Tahuna Barat	kecamatan	411
5833	71.03.24	Tahuna Timur	kecamatan	411
5834	71.03.25	Kepulauan Marore	kecamatan	411
5835	71.04.01	Lirung	kecamatan	412
5836	71.04.02	Beo	kecamatan	412
5837	71.04.03	Rainis	kecamatan	412
5838	71.04.04	Essang	kecamatan	412
5839	71.04.05	Nanusa	kecamatan	412
5840	71.04.06	Kabaruan	kecamatan	412
5841	71.04.07	Melonguane	kecamatan	412
5842	71.04.08	Gemeh	kecamatan	412
5843	71.04.09	Damau	kecamatan	412
5844	71.04.10	Tampan' Amma	kecamatan	412
5845	71.04.11	Salibabu	kecamatan	412
5846	71.04.12	Kalongan	kecamatan	412
5847	71.04.13	Miangas	kecamatan	412
5848	71.04.14	Beo Utara	kecamatan	412
5849	71.04.15	Pulutan	kecamatan	412
5850	71.04.16	Melonguane Timur	kecamatan	412
5851	71.04.17	Moronge	kecamatan	412
5852	71.04.18	Beo Selatan	kecamatan	412
5853	71.04.19	Essang Selatan	kecamatan	412
5854	71.05.01	Modoinding	kecamatan	413
5855	71.05.02	Tompaso Baru	kecamatan	413
5856	71.05.03	Ranoyapo	kecamatan	413
5857	71.05.07	Motoling	kecamatan	413
5858	71.05.08	Sinonsayang	kecamatan	413
5859	71.05.09	Tenga	kecamatan	413
5860	71.05.10	Amurang	kecamatan	413
5861	71.05.12	Tumpaan	kecamatan	413
5862	71.05.13	Tareran	kecamatan	413
5863	71.05.15	Kumelembuai	kecamatan	413
5864	71.05.16	Maesaan	kecamatan	413
5865	71.05.17	Amurang Barat	kecamatan	413
5866	71.05.18	Amurang Timur	kecamatan	413
5867	71.05.19	Tatapaan	kecamatan	413
5868	71.05.21	Motoling Barat	kecamatan	413
5869	71.05.22	Motoling Timur	kecamatan	413
5870	71.05.23	Suluun Tareran	kecamatan	413
5871	71.06.01	Kema	kecamatan	414
5872	71.06.02	Kauditan	kecamatan	414
5873	71.06.03	Airmadidi	kecamatan	414
5874	71.06.04	Wori	kecamatan	414
5875	71.06.05	Dimembe	kecamatan	414
5876	71.06.06	Likupang Barat	kecamatan	414
5877	71.06.07	Likupang Timur	kecamatan	414
5878	71.06.08	Kalawat	kecamatan	414
5879	71.06.09	Talawaan	kecamatan	414
5880	71.06.10	Likupang Selatan	kecamatan	414
5881	71.07.01	Ratahan	kecamatan	415
5882	71.07.02	Pusomaen	kecamatan	415
5883	71.07.03	Belang	kecamatan	415
5884	71.07.04	Ratatotok	kecamatan	415
5885	71.07.05	Tombatu	kecamatan	415
5886	71.07.06	Touluaan	kecamatan	415
5887	71.07.07	Touluaan Selatan	kecamatan	415
5888	71.07.08	Silian Raya	kecamatan	415
5889	71.07.09	Tombatu Timur	kecamatan	415
5890	71.07.10	Tombatu Utara	kecamatan	415
5891	71.07.11	Pasan	kecamatan	415
5892	71.07.12	Ratahan Timur	kecamatan	415
5893	71.08.01	Sangkub	kecamatan	416
5894	71.08.02	Bintauna	kecamatan	416
5895	71.08.03	Bolangitang Timur	kecamatan	416
5896	71.08.04	Bolangitang Barat	kecamatan	416
5897	71.08.05	Kaidipang	kecamatan	416
5898	71.08.06	Pinogaluman	kecamatan	416
5899	71.09.01	Siau Timur	kecamatan	417
5900	71.09.02	Siau Barat	kecamatan	417
5901	71.09.03	Tagulandang	kecamatan	417
5902	71.09.04	Siau Timur Selatan	kecamatan	417
5903	71.09.05	Siau Barat Selatan	kecamatan	417
5904	71.09.06	Tagulandang Utara	kecamatan	417
5905	71.09.07	Biaro	kecamatan	417
5906	71.09.08	Siau Barat Utara	kecamatan	417
5907	71.09.09	Siau Tengah	kecamatan	417
5908	71.09.10	Tagulandang Selatan	kecamatan	417
5909	71.10.01	Tutuyan	kecamatan	418
5910	71.10.02	Kotabunan	kecamatan	418
5911	71.10.03	Nuangan	kecamatan	418
5912	71.10.04	Modayag	kecamatan	418
5913	71.10.05	Modayag Barat	kecamatan	418
5914	71.10.06	Motongkad	kecamatan	418
5915	71.10.07	Mooat	kecamatan	418
5916	71.11.01	Bolaang Uki	kecamatan	419
5917	71.11.02	Posigadan	kecamatan	419
5918	71.11.03	Pinolosian	kecamatan	419
5919	71.11.04	Pinolosian Tengah	kecamatan	419
5920	71.11.05	Pinolosian Timur	kecamatan	419
5921	71.11.06	Helumo	kecamatan	419
5922	71.11.07	Tomini	kecamatan	419
5923	71.71.01	Bunaken	kecamatan	420
5924	71.71.02	Tuminting	kecamatan	420
5925	71.71.03	Singkil	kecamatan	420
5926	71.71.04	Wenang	kecamatan	420
5927	71.71.05	Tikala	kecamatan	420
5928	71.71.06	Sario	kecamatan	420
5929	71.71.07	Wanea	kecamatan	420
5930	71.71.08	Mapanget	kecamatan	420
5931	71.71.09	Malalayang	kecamatan	420
5932	71.71.10	Bunaken Kepulauan	kecamatan	420
5933	71.71.11	Paal Dua	kecamatan	420
5934	71.72.01	Lembeh Selatan	kecamatan	421
5935	71.72.02	Madidir	kecamatan	421
5936	71.72.03	Ranowulu	kecamatan	421
5937	71.72.04	Aertembaga	kecamatan	421
5938	71.72.05	Matuari	kecamatan	421
5939	71.72.06	Girian	kecamatan	421
5940	71.72.07	Maesa	kecamatan	421
5941	71.72.08	Lembeh Utara	kecamatan	421
5942	71.73.01	Tomohon Selatan	kecamatan	422
5943	71.73.02	Tomohon Tengah	kecamatan	422
5944	71.73.03	Tomohon Utara	kecamatan	422
5945	71.73.04	Tomohon Barat	kecamatan	422
5946	71.73.05	Tomohon Timur	kecamatan	422
5947	71.74.01	Kotamobagu Utara	kecamatan	423
5948	71.74.02	Kotamobagu Timur	kecamatan	423
5949	71.74.03	Kotamobagu Selatan	kecamatan	423
5950	71.74.04	Kotamobagu Barat	kecamatan	423
5951	72.01.01	Batui	kecamatan	424
5952	72.01.02	Bunta	kecamatan	424
5953	72.01.03	Kintom	kecamatan	424
5954	72.01.04	Luwuk	kecamatan	424
5955	72.01.05	Lamala	kecamatan	424
5956	72.01.06	Balantak	kecamatan	424
5957	72.01.07	Pagimana	kecamatan	424
5958	72.01.08	Bualemo	kecamatan	424
5959	72.01.09	Toili	kecamatan	424
5960	72.01.10	Masama	kecamatan	424
5961	72.01.11	Luwuk Timur	kecamatan	424
5962	72.01.12	Toili Barat	kecamatan	424
5963	72.01.13	Nuhon	kecamatan	424
5964	72.01.14	Moilong	kecamatan	424
5965	72.01.15	Batui Selatan	kecamatan	424
5966	72.01.16	Lobu	kecamatan	424
5967	72.01.17	Simpang Raya	kecamatan	424
5968	72.01.18	Balantak Selatan	kecamatan	424
5969	72.01.19	Balantak Utara	kecamatan	424
5970	72.01.20	Luwuk Selatan	kecamatan	424
5971	72.01.21	Luwuk Utara	kecamatan	424
5972	72.01.22	Mantoh	kecamatan	424
5973	72.01.23	Nambo	kecamatan	424
5974	72.01.24	Toili Jaya	kecamatan	424
5975	72.02.01	Poso Kota	kecamatan	425
5976	72.02.02	Poso Pesisir	kecamatan	425
5977	72.02.03	Lage	kecamatan	425
5978	72.02.04	Pamona Puselemba	kecamatan	425
5979	72.02.05	Pamona Timur	kecamatan	425
5980	72.02.06	Pamona Selatan	kecamatan	425
5981	72.02.07	Lore Utara	kecamatan	425
5982	72.02.08	Lore Tengah	kecamatan	425
5983	72.02.09	Lore Selatan	kecamatan	425
5984	72.02.18	Poso Pesisir Utara	kecamatan	425
5985	72.02.19	Poso Pesisir Selatan	kecamatan	425
5986	72.02.20	Pamona Barat	kecamatan	425
5987	72.02.21	Poso Kota Selatan	kecamatan	425
5988	72.02.22	Poso Kota Utara	kecamatan	425
5989	72.02.23	Lore Barat	kecamatan	425
5990	72.02.24	Lore Timur	kecamatan	425
5991	72.02.25	Lore Peore	kecamatan	425
5992	72.02.26	Pamona Tenggara	kecamatan	425
5993	72.02.27	Pamona Utara	kecamatan	425
5994	72.03.04	Rio Pakava	kecamatan	426
5995	72.03.06	Dampelas	kecamatan	426
5996	72.03.08	Banawa	kecamatan	426
5997	72.03.09	Labuan	kecamatan	426
5998	72.03.10	Sindue	kecamatan	426
5999	72.03.11	Sirenja	kecamatan	426
6000	72.03.12	Balaesang	kecamatan	426
6001	72.03.14	Sojol	kecamatan	426
6002	72.03.18	Banawa Selatan	kecamatan	426
6003	72.03.19	Tanantovea	kecamatan	426
6004	72.03.21	Pinembani	kecamatan	426
6005	72.03.24	Sindue Tombusabora	kecamatan	426
6006	72.03.25	Sindue Tobata	kecamatan	426
6007	72.03.27	Banawa Tengah	kecamatan	426
6008	72.03.30	Sojol Utara	kecamatan	426
6009	72.03.31	Balaesang Tanjung	kecamatan	426
6010	72.04.01	Dampal Selatan	kecamatan	427
6011	72.04.02	Dampal Utara	kecamatan	427
6012	72.04.03	Dondo	kecamatan	427
6013	72.04.04	Basidondo	kecamatan	427
6014	72.04.05	Ogodeide	kecamatan	427
6015	72.04.06	Lampasio	kecamatan	427
6016	72.04.07	Baolan	kecamatan	427
6017	72.04.08	Galang	kecamatan	427
6018	72.04.09	Tolitoli Utara	kecamatan	427
6019	72.04.10	Dako Pemean	kecamatan	427
6020	72.05.01	Momunu	kecamatan	428
6021	72.05.02	Lakea	kecamatan	428
6022	72.05.03	Bokat	kecamatan	428
6023	72.05.04	Bunobogu	kecamatan	428
6024	72.05.05	Paleleh	kecamatan	428
6025	72.05.06	Biau	kecamatan	428
6026	72.05.07	Tiloan	kecamatan	428
6027	72.05.08	Bukal	kecamatan	428
6028	72.05.09	Gadung	kecamatan	428
6029	72.05.10	Karamat	kecamatan	428
6030	72.05.11	Paleleh Barat	kecamatan	428
6031	72.06.05	Bungku Tengah	kecamatan	429
6032	72.06.06	Bungku Selatan	kecamatan	429
6033	72.06.07	Menui Kepulauan	kecamatan	429
6034	72.06.08	Bungku Barat	kecamatan	429
6035	72.06.09	Bumi Raya	kecamatan	429
6036	72.06.10	Bahodopi	kecamatan	429
6037	72.06.12	Wita Ponda	kecamatan	429
6038	72.06.15	Bungku Pesisir	kecamatan	429
6039	72.06.18	Bungku Timur	kecamatan	429
6040	72.06.20	Sombori Kepulauan	kecamatan	429
6041	72.07.03	Totikum	kecamatan	430
6042	72.07.04	Tinangkung	kecamatan	430
6043	72.07.05	Liang	kecamatan	430
6044	72.07.06	Bulagi	kecamatan	430
6045	72.07.07	Buko	kecamatan	430
6046	72.07.09	Bulagi Selatan	kecamatan	430
6047	72.07.11	Tinangkung Selatan	kecamatan	430
6048	72.07.15	Totikum Selatan	kecamatan	430
6049	72.07.16	Peling Tengah	kecamatan	430
6050	72.07.17	Bulagi Utara	kecamatan	430
6051	72.07.18	Buko Selatan	kecamatan	430
6052	72.07.19	Tinangkung Utara	kecamatan	430
6053	72.08.01	Parigi	kecamatan	431
6054	72.08.02	Ampibabo	kecamatan	431
6055	72.08.03	Tinombo	kecamatan	431
6056	72.08.04	Moutong	kecamatan	431
6057	72.08.05	Tomini	kecamatan	431
6058	72.08.06	Sausu	kecamatan	431
6059	72.08.07	Bolano Lambunu	kecamatan	431
6060	72.08.08	Kasimbar	kecamatan	431
6061	72.08.09	Torue	kecamatan	431
6062	72.08.10	Tinombo Selatan	kecamatan	431
6063	72.08.11	Parigi Selatan	kecamatan	431
6064	72.08.12	Mepanga	kecamatan	431
6065	72.08.13	Toribulu	kecamatan	431
6066	72.08.14	Taopa	kecamatan	431
6067	72.08.15	Balinggi	kecamatan	431
6068	72.08.16	Parigi Barat	kecamatan	431
6069	72.08.17	Siniu	kecamatan	431
6070	72.08.18	Palasa	kecamatan	431
6071	72.08.19	Parigi Utara	kecamatan	431
6072	72.08.20	Parigi Tengah	kecamatan	431
6073	72.08.21	Bolano	kecamatan	431
6074	72.08.22	Ongka Malino	kecamatan	431
6075	72.08.23	Sidoan	kecamatan	431
6076	72.09.01	Una Una	kecamatan	432
6077	72.09.02	Togean	kecamatan	432
6078	72.09.03	Walea Kepulauan	kecamatan	432
6079	72.09.04	Ampana Tete	kecamatan	432
6080	72.09.05	Ampana Kota	kecamatan	432
6081	72.09.06	Ulubongka	kecamatan	432
6082	72.09.07	Tojo Barat	kecamatan	432
6083	72.09.08	Tojo	kecamatan	432
6084	72.09.09	Walea Besar	kecamatan	432
6085	72.09.10	Ratolindo	kecamatan	432
6086	72.09.11	Batudaka	kecamatan	432
6087	72.09.12	Talatako	kecamatan	432
6088	72.10.01	Sigi Biromaru	kecamatan	433
6089	72.10.02	Palolo	kecamatan	433
6090	72.10.03	Nokilalaki	kecamatan	433
6091	72.10.04	Lindu	kecamatan	433
6092	72.10.05	Kulawi	kecamatan	433
6093	72.10.06	Kulawi Selatan	kecamatan	433
6094	72.10.07	Pipikoro	kecamatan	433
6095	72.10.08	Gumbasa	kecamatan	433
6096	72.10.09	Dolo Selatan	kecamatan	433
6097	72.10.10	Tanambulava	kecamatan	433
6098	72.10.11	Dolo Barat	kecamatan	433
6099	72.10.12	Dolo	kecamatan	433
6100	72.10.13	Kinovaro	kecamatan	433
6101	72.10.14	Marawola	kecamatan	433
6102	72.10.15	Marawola Barat	kecamatan	433
6103	72.11.01	Banggai	kecamatan	434
6104	72.11.02	Banggai Utara	kecamatan	434
6105	72.11.03	Bokan Kepulauan	kecamatan	434
6106	72.11.04	Bangkurung	kecamatan	434
6107	72.11.05	Labobo	kecamatan	434
6108	72.11.06	Banggai Selatan	kecamatan	434
6109	72.11.07	Banggai Tengah	kecamatan	434
6110	72.12.01	Petasia	kecamatan	435
6111	72.12.02	Petasia Timur	kecamatan	435
6112	72.12.03	Lembo Raya	kecamatan	435
6113	72.12.04	Lembo	kecamatan	435
6114	72.12.05	Mori Atas	kecamatan	435
6115	72.12.06	Mori Utara	kecamatan	435
6116	72.12.07	Soyo Jaya	kecamatan	435
6117	72.12.08	Bungku Utara	kecamatan	435
6118	72.12.09	Mamosalato	kecamatan	435
6119	72.12.10	Petasia Barat	kecamatan	435
6120	72.71.01	Palu Timur	kecamatan	436
6121	72.71.02	Palu Barat	kecamatan	436
6122	72.71.03	Palu Selatan	kecamatan	436
6123	72.71.04	Palu Utara	kecamatan	436
6124	72.71.05	Ulujadi	kecamatan	436
6125	72.71.06	Tatanga	kecamatan	436
6126	72.71.07	Tawaeli	kecamatan	436
6127	72.71.08	Mantikulore	kecamatan	436
6128	73.01.01	Benteng	kecamatan	437
6129	73.01.02	Bontoharu	kecamatan	437
6130	73.01.03	Bontomatene	kecamatan	437
6131	73.01.04	Bontomanai	kecamatan	437
6132	73.01.05	Bontosikuyu	kecamatan	437
6133	73.01.06	Pasimasunggu	kecamatan	437
6134	73.01.07	Pasimarannu	kecamatan	437
6135	73.01.08	Taka Bonerate	kecamatan	437
6136	73.01.09	Pasilambena	kecamatan	437
6137	73.01.10	Pasimasunggu Timur	kecamatan	437
6138	73.01.11	Buki	kecamatan	437
6139	73.02.01	Gantarang	kecamatan	438
6140	73.02.02	Ujung Bulu	kecamatan	438
6141	73.02.03	Bonto Bahari	kecamatan	438
6142	73.02.04	Bonto Tiro	kecamatan	438
6143	73.02.05	Herlang	kecamatan	438
6144	73.02.06	Kajang	kecamatan	438
6145	73.02.07	Bulukumpa	kecamatan	438
6146	73.02.08	Kindang	kecamatan	438
6147	73.02.09	Ujungloe	kecamatan	438
6148	73.02.10	Rilauale	kecamatan	438
6149	73.03.01	Bissappu	kecamatan	439
6150	73.03.02	Bantaeng	kecamatan	439
6151	73.03.03	Eremerasa	kecamatan	439
6152	73.03.04	Tompo Bulu	kecamatan	439
6153	73.03.05	Pajukukang	kecamatan	439
6154	73.03.06	Uluere	kecamatan	439
6155	73.03.07	Gantarang Keke	kecamatan	439
6156	73.03.08	Sinoa	kecamatan	439
6157	73.04.01	Bangkala	kecamatan	440
6158	73.04.02	Tamalatea	kecamatan	440
6159	73.04.03	Binamu	kecamatan	440
6160	73.04.04	Batang	kecamatan	440
6161	73.04.05	Kelara	kecamatan	440
6162	73.04.06	Bangkala Barat	kecamatan	440
6163	73.04.07	Bontoramba	kecamatan	440
6164	73.04.08	Turatea	kecamatan	440
6165	73.04.09	Arungkeke	kecamatan	440
6166	73.04.10	Rumbia	kecamatan	440
6167	73.04.11	Tarowang	kecamatan	440
6168	73.05.01	Mappakasunggu	kecamatan	441
6169	73.05.02	Mangarabombang	kecamatan	441
6287	73.13.12	Penrang	kecamatan	449
6170	73.05.03	Polongbangkeng Selatan	kecamatan	441
6171	73.05.04	Polongbangkeng Utara	kecamatan	441
6172	73.05.05	Galesong Selatan	kecamatan	441
6173	73.05.06	Galesong Utara	kecamatan	441
6174	73.05.07	Pattallassang	kecamatan	441
6175	73.05.08	Sanrobone	kecamatan	441
6176	73.05.09	Galesong	kecamatan	441
6177	73.05.10	Kepulauan Tanakeke	kecamatan	441
6178	73.05.11	Polongbangkeng Timur	kecamatan	441
6179	73.05.12	Laikang	kecamatan	441
6180	73.06.01	Bontonompo	kecamatan	442
6181	73.06.02	Bajeng	kecamatan	442
6182	73.06.03	Tompobulu	kecamatan	442
6183	73.06.04	Tinggimoncong	kecamatan	442
6184	73.06.05	Parangloe	kecamatan	442
6185	73.06.06	Bontomarannu	kecamatan	442
6186	73.06.07	Pallangga	kecamatan	442
6187	73.06.08	Somba Opu	kecamatan	442
6188	73.06.09	Bungaya	kecamatan	442
6189	73.06.10	Tombolopao	kecamatan	442
6190	73.06.11	Biringbulu	kecamatan	442
6191	73.06.12	Barombong	kecamatan	442
6192	73.06.13	Pattallasang	kecamatan	442
6193	73.06.14	Manuju	kecamatan	442
6194	73.06.15	Bontolempangang	kecamatan	442
6195	73.06.16	Bontonompo Selatan	kecamatan	442
6196	73.06.17	Parigi	kecamatan	442
6197	73.06.18	Bajeng Barat	kecamatan	442
6198	73.07.01	Sinjai Barat	kecamatan	443
6199	73.07.02	Sinjai Selatan	kecamatan	443
6200	73.07.03	Sinjai Timur	kecamatan	443
6201	73.07.04	Sinjai Tengah	kecamatan	443
6202	73.07.05	Sinjai Utara	kecamatan	443
6203	73.07.06	Bulupoddo	kecamatan	443
6204	73.07.07	Sinjai Borong	kecamatan	443
6205	73.07.08	Tellu Limpoe	kecamatan	443
6206	73.07.09	Pulau Sembilan	kecamatan	443
6207	73.08.01	Bontocani	kecamatan	444
6208	73.08.02	Kahu	kecamatan	444
6209	73.08.03	Kajuara	kecamatan	444
6210	73.08.04	Salomekko	kecamatan	444
6211	73.08.05	Tonra	kecamatan	444
6212	73.08.06	Libureng	kecamatan	444
6213	73.08.07	Mare	kecamatan	444
6214	73.08.08	Sibulue	kecamatan	444
6215	73.08.09	Barebbo	kecamatan	444
6216	73.08.10	Cina	kecamatan	444
6217	73.08.11	Ponre	kecamatan	444
6218	73.08.12	Lappariaja	kecamatan	444
6219	73.08.13	Lamuru	kecamatan	444
6220	73.08.14	Ulaweng	kecamatan	444
6221	73.08.15	Palakka	kecamatan	444
6222	73.08.16	Awangpone	kecamatan	444
6223	73.08.17	Tellu Siattinge	kecamatan	444
6224	73.08.18	Ajangale	kecamatan	444
6225	73.08.19	Dua Boccoe	kecamatan	444
6226	73.08.20	Cenrana	kecamatan	444
6227	73.08.21	Tanete Riattang	kecamatan	444
6228	73.08.22	Tanete Riattang Barat	kecamatan	444
6229	73.08.23	Tanete Riattang Timur	kecamatan	444
6230	73.08.24	Amali	kecamatan	444
6231	73.08.25	Tellulimpoe	kecamatan	444
6232	73.08.26	Bengo	kecamatan	444
6233	73.08.27	Patimpeng	kecamatan	444
6234	73.09.01	Mandai	kecamatan	445
6235	73.09.02	Camba	kecamatan	445
6236	73.09.03	Bantimurung	kecamatan	445
6237	73.09.04	Maros Baru	kecamatan	445
6238	73.09.05	Bontoa	kecamatan	445
6239	73.09.06	Malllawa	kecamatan	445
6240	73.09.07	Tanralili	kecamatan	445
6241	73.09.08	Marusu	kecamatan	445
6242	73.09.09	Simbang	kecamatan	445
6243	73.09.10	Cenrana	kecamatan	445
6244	73.09.11	Tompobulu	kecamatan	445
6245	73.09.12	Lau	kecamatan	445
6246	73.09.13	Moncongloe	kecamatan	445
6247	73.09.14	Turikale	kecamatan	445
6248	73.10.01	Liukang Tangaya	kecamatan	446
6249	73.10.02	Liukang Kalmas	kecamatan	446
6250	73.10.03	Liukang Tupabbiring	kecamatan	446
6251	73.10.04	Pangkajene	kecamatan	446
6252	73.10.05	Balocci	kecamatan	446
6253	73.10.06	Bungoro	kecamatan	446
6254	73.10.07	Labakkang	kecamatan	446
6255	73.10.08	Marang	kecamatan	446
6256	73.10.09	Segeri	kecamatan	446
6257	73.10.10	Minasate'ne	kecamatan	446
6258	73.10.11	Mandalle	kecamatan	446
6259	73.10.12	Tondong Tallasa	kecamatan	446
6260	73.10.13	Liukang Tupabbiring Utara	kecamatan	446
6261	73.11.01	Tanete Riaja	kecamatan	447
6262	73.11.02	Tanete Rilau	kecamatan	447
6263	73.11.03	Barru	kecamatan	447
6264	73.11.04	Soppeng Riaja	kecamatan	447
6265	73.11.05	Mallusetasi	kecamatan	447
6266	73.11.06	Pujananting	kecamatan	447
6267	73.11.07	Balusu	kecamatan	447
6268	73.12.01	Marioriwawo	kecamatan	448
6269	73.12.02	Liliriaja	kecamatan	448
6270	73.12.03	Lilirilau	kecamatan	448
6271	73.12.04	Lalabata	kecamatan	448
6272	73.12.05	Marioriawa	kecamatan	448
6273	73.12.06	Donri-Donri	kecamatan	448
6274	73.12.07	Ganra	kecamatan	448
6275	73.12.08	Citta	kecamatan	448
6276	73.13.01	Sabangparu	kecamatan	449
6277	73.13.02	Pammana	kecamatan	449
6278	73.13.03	Takkalalla	kecamatan	449
6279	73.13.04	Sajoanging	kecamatan	449
6280	73.13.05	Majauleng	kecamatan	449
6281	73.13.06	Tempe	kecamatan	449
6282	73.13.07	Belawa	kecamatan	449
6283	73.13.08	Tanasitolo	kecamatan	449
6284	73.13.09	Maniangpajo	kecamatan	449
6285	73.13.10	Pitumpanua	kecamatan	449
6286	73.13.11	Bola	kecamatan	449
6288	73.13.13	Gilireng	kecamatan	449
6289	73.13.14	Keera	kecamatan	449
6290	73.14.01	Panca Lautang	kecamatan	450
6291	73.14.02	Tellu Limpoe	kecamatan	450
6292	73.14.03	Watang Pulu	kecamatan	450
6293	73.14.04	Baranti	kecamatan	450
6294	73.14.05	Panca Rijang	kecamatan	450
6295	73.14.06	Kulo	kecamatan	450
6296	73.14.07	Maritengngae	kecamatan	450
6297	73.14.08	Watang Sidenreng	kecamatan	450
6298	73.14.09	Dua Pitue	kecamatan	450
6299	73.14.10	Pitu Riawa	kecamatan	450
6300	73.14.11	Pitu Riase	kecamatan	450
6301	73.15.01	Mattiro Sompe	kecamatan	451
6302	73.15.02	Suppa	kecamatan	451
6303	73.15.03	Mattiro Bulu	kecamatan	451
6304	73.15.04	Watang Sawitto	kecamatan	451
6305	73.15.05	Patampanua	kecamatan	451
6306	73.15.06	Duampanua	kecamatan	451
6307	73.15.07	Lembang	kecamatan	451
6308	73.15.08	Cempa	kecamatan	451
6309	73.15.09	Tiroang	kecamatan	451
6310	73.15.10	Lanrisang	kecamatan	451
6311	73.15.11	Paleteang	kecamatan	451
6312	73.15.12	Batulappa	kecamatan	451
6313	73.16.01	Maiwa	kecamatan	452
6314	73.16.02	Enrekang	kecamatan	452
6315	73.16.03	Baraka	kecamatan	452
6316	73.16.04	Anggeraja	kecamatan	452
6317	73.16.05	Alla	kecamatan	452
6318	73.16.06	Bungin	kecamatan	452
6319	73.16.07	Cendana	kecamatan	452
6320	73.16.08	Curio	kecamatan	452
6321	73.16.09	Malua	kecamatan	452
6322	73.16.10	Buntu Batu	kecamatan	452
6323	73.16.11	Masalle	kecamatan	452
6324	73.16.12	Baroko	kecamatan	452
6325	73.17.01	Basse Sangtempe	kecamatan	453
6326	73.17.02	Larompong	kecamatan	453
6327	73.17.03	Suli	kecamatan	453
6328	73.17.04	Bajo	kecamatan	453
6329	73.17.05	Bua Ponrang	kecamatan	453
6330	73.17.06	Walenrang	kecamatan	453
6331	73.17.07	Belopa	kecamatan	453
6332	73.17.08	Bua	kecamatan	453
6333	73.17.09	Lamasi	kecamatan	453
6334	73.17.10	Larompong Selatan	kecamatan	453
6335	73.17.11	Ponrang	kecamatan	453
6336	73.17.12	Latimojong	kecamatan	453
6337	73.17.13	Kamanre	kecamatan	453
6338	73.17.14	Belopa Utara	kecamatan	453
6339	73.17.15	Walenrang Barat	kecamatan	453
6340	73.17.16	Walenrang Utara	kecamatan	453
6341	73.17.17	Walenrang Timur	kecamatan	453
6342	73.17.18	Lamasi Timur	kecamatan	453
6343	73.17.19	Suli Barat	kecamatan	453
6344	73.17.20	Bajo Barat	kecamatan	453
6345	73.17.21	Ponrang Selatan	kecamatan	453
6346	73.17.22	Basse Sangtempe Utara	kecamatan	453
6347	73.18.01	Salupputti	kecamatan	454
6348	73.18.02	Bittuang	kecamatan	454
6349	73.18.03	Bonggakaradeng	kecamatan	454
6350	73.18.05	Makale	kecamatan	454
6351	73.18.09	Simbuang	kecamatan	454
6352	73.18.11	Rantetayo	kecamatan	454
6353	73.18.12	Mengkendek	kecamatan	454
6354	73.18.13	Sangalla'	kecamatan	454
6355	73.18.19	Gandangbatu Sillanan	kecamatan	454
6356	73.18.20	Rembon	kecamatan	454
6357	73.18.27	Makale Utara	kecamatan	454
6358	73.18.28	Mappak	kecamatan	454
6359	73.18.29	Makale Selatan	kecamatan	454
6360	73.18.31	Masanda	kecamatan	454
6361	73.18.33	Sangalla' Selatan	kecamatan	454
6362	73.18.34	Sangalla' Utara	kecamatan	454
6363	73.18.35	Malimbong Balepe'	kecamatan	454
6364	73.18.37	Rano	kecamatan	454
6365	73.18.38	Kurra	kecamatan	454
6366	73.22.01	Malangke	kecamatan	455
6367	73.22.02	Bone Bone	kecamatan	455
6368	73.22.03	Masamba	kecamatan	455
6369	73.22.04	Sabbang	kecamatan	455
6370	73.22.05	Rongkong	kecamatan	455
6371	73.22.06	Sukamaju	kecamatan	455
6372	73.22.07	Seko	kecamatan	455
6373	73.22.08	Malangke Barat	kecamatan	455
6374	73.22.09	Rampi	kecamatan	455
6375	73.22.10	Mappedeceng	kecamatan	455
6376	73.22.11	Baebunta	kecamatan	455
6377	73.22.12	Tana Lili	kecamatan	455
6378	73.22.13	Sukamaju Selatan	kecamatan	455
6379	73.22.14	Baebunta Selatan	kecamatan	455
6380	73.22.15	Sabbang Selatan	kecamatan	455
6381	73.24.01	Mangkutana	kecamatan	456
6382	73.24.02	Nuha	kecamatan	456
6383	73.24.03	Towuti	kecamatan	456
6384	73.24.04	Malili	kecamatan	456
6385	73.24.05	Angkona	kecamatan	456
6386	73.24.06	Wotu	kecamatan	456
6387	73.24.07	Burau	kecamatan	456
6388	73.24.08	Tomoni	kecamatan	456
6389	73.24.09	Tomoni Timur	kecamatan	456
6390	73.24.10	Kalaena	kecamatan	456
6391	73.24.11	Wasuponda	kecamatan	456
6392	73.26.01	Rantepao	kecamatan	457
6393	73.26.02	Sesean	kecamatan	457
6394	73.26.03	Nanggala	kecamatan	457
6395	73.26.04	Rindingallo	kecamatan	457
6396	73.26.05	Buntao	kecamatan	457
6397	73.26.06	Sa'dan	kecamatan	457
6398	73.26.07	Sanggalangi	kecamatan	457
6399	73.26.08	Sopai	kecamatan	457
6400	73.26.09	Tikala	kecamatan	457
6401	73.26.10	Balusu	kecamatan	457
6402	73.26.11	Tallunglipu	kecamatan	457
6403	73.26.12	Dende' Piongan Napo	kecamatan	457
6404	73.26.13	Buntu Pepasan	kecamatan	457
6405	73.26.14	Baruppu	kecamatan	457
6406	73.26.15	Kesu	kecamatan	457
6407	73.26.16	Tondon	kecamatan	457
6408	73.26.17	Bangkelekila	kecamatan	457
6409	73.26.18	Rantebua	kecamatan	457
6410	73.26.19	Sesean Suloara	kecamatan	457
6411	73.26.20	Kapala Pitu	kecamatan	457
6412	73.26.21	Awan Rante Karua	kecamatan	457
6413	73.71.01	Mariso	kecamatan	458
6414	73.71.02	Mamajang	kecamatan	458
6415	73.71.03	Makassar	kecamatan	458
6416	73.71.04	Ujung Pandang	kecamatan	458
6417	73.71.05	Wajo	kecamatan	458
6418	73.71.06	Bontoala	kecamatan	458
6419	73.71.07	Tallo	kecamatan	458
6420	73.71.08	Ujung Tanah	kecamatan	458
6421	73.71.09	Panakkukang	kecamatan	458
6422	73.71.10	Tamalate	kecamatan	458
6423	73.71.11	Biringkanaya	kecamatan	458
6424	73.71.12	Manggala	kecamatan	458
6425	73.71.13	Rappocini	kecamatan	458
6426	73.71.14	Tamalanrea	kecamatan	458
6427	73.71.15	Kepulauan Sangkarrang	kecamatan	458
6428	73.72.01	Bacukiki	kecamatan	459
6429	73.72.02	Ujung	kecamatan	459
6430	73.72.03	Soreang	kecamatan	459
6431	73.72.04	Bacukiki Barat	kecamatan	459
6432	73.73.01	Wara	kecamatan	460
6433	73.73.02	Wara Utara	kecamatan	460
6434	73.73.03	Wara Selatan	kecamatan	460
6435	73.73.04	Telluwanua	kecamatan	460
6436	73.73.05	Wara Timur	kecamatan	460
6437	73.73.06	Wara Barat	kecamatan	460
6438	73.73.07	Sendana	kecamatan	460
6439	73.73.08	Mungkajang	kecamatan	460
6440	73.73.09	Bara	kecamatan	460
6441	74.01.01	Wundulako	kecamatan	461
6442	74.01.04	Kolaka	kecamatan	461
6443	74.01.07	Pomalaa	kecamatan	461
6444	74.01.08	Watubangga	kecamatan	461
6445	74.01.10	Wolo	kecamatan	461
6446	74.01.12	Baula	kecamatan	461
6447	74.01.14	Latambaga	kecamatan	461
6448	74.01.18	Tanggetada	kecamatan	461
6449	74.01.20	Samaturu	kecamatan	461
6450	74.01.24	Toari	kecamatan	461
6451	74.01.25	Polinggona	kecamatan	461
6452	74.01.27	Iwoimendaa	kecamatan	461
6453	74.02.01	Lambuya	kecamatan	462
6454	74.02.02	Unaaha	kecamatan	462
6455	74.02.03	Wawotobi	kecamatan	462
6456	74.02.04	Pondidaha	kecamatan	462
6457	74.02.05	Sampara	kecamatan	462
6458	74.02.10	Abuki	kecamatan	462
6459	74.02.11	Soropia	kecamatan	462
6460	74.02.15	Tongauna	kecamatan	462
6461	74.02.16	Latoma	kecamatan	462
6462	74.02.17	Puriala	kecamatan	462
6463	74.02.18	Uepai	kecamatan	462
6464	74.02.19	Wonggeduku	kecamatan	462
6465	74.02.20	Besulutu	kecamatan	462
6466	74.02.21	Bondoala	kecamatan	462
6467	74.02.23	Routa	kecamatan	462
6468	74.02.24	Anggaberi	kecamatan	462
6469	74.02.25	Meluhu	kecamatan	462
6470	74.02.28	Amonggedo	kecamatan	462
6471	74.02.31	Asinua	kecamatan	462
6472	74.02.32	Konawe	kecamatan	462
6473	74.02.33	Kapoiala	kecamatan	462
6474	74.02.36	Lalonggasumeeto	kecamatan	462
6475	74.02.37	Onembute	kecamatan	462
6476	74.02.38	Padangguni	kecamatan	462
6477	74.02.39	Morosi	kecamatan	462
6478	74.02.40	Anggalomoare	kecamatan	462
6479	74.02.41	Wonggeduku Barat	kecamatan	462
6480	74.02.42	Tongauna Utara	kecamatan	462
6481	74.03.06	Napabalano	kecamatan	463
6482	74.03.07	Maligano	kecamatan	463
6483	74.03.13	Wakorumba Selatan	kecamatan	463
6484	74.03.14	Lasalepa	kecamatan	463
6485	74.03.15	Batalaiworu	kecamatan	463
6486	74.03.16	Katobu	kecamatan	463
6487	74.03.17	Duruka	kecamatan	463
6488	74.03.18	Lohia	kecamatan	463
6489	74.03.19	Watopute	kecamatan	463
6490	74.03.20	Kontunaga	kecamatan	463
6491	74.03.23	Kabangka	kecamatan	463
6492	74.03.24	Kabawo	kecamatan	463
6493	74.03.25	Parigi	kecamatan	463
6494	74.03.26	Bone	kecamatan	463
6495	74.03.27	Tongkuno	kecamatan	463
6496	74.03.28	Pasir Putih	kecamatan	463
6497	74.03.30	Kontu Kowuna	kecamatan	463
6498	74.03.31	Marobo	kecamatan	463
6499	74.03.32	Tongkuno Selatan	kecamatan	463
6500	74.03.33	Pasi Kolaga	kecamatan	463
6501	74.03.34	Batukara	kecamatan	463
6502	74.03.37	Towea	kecamatan	463
6503	74.04.11	Pasarwajo	kecamatan	464
6504	74.04.22	Kapontori	kecamatan	464
6505	74.04.23	Lasalimu	kecamatan	464
6506	74.04.24	Lasalimu Selatan	kecamatan	464
6507	74.04.27	Siotapina	kecamatan	464
6508	74.04.28	Wolowa	kecamatan	464
6509	74.04.29	Wabula	kecamatan	464
6510	74.05.01	Tinanggea	kecamatan	465
6511	74.05.02	Angata	kecamatan	465
6512	74.05.03	Andoolo	kecamatan	465
6513	74.05.04	Palangga	kecamatan	465
6514	74.05.05	Landono	kecamatan	465
6515	74.05.06	Lainea	kecamatan	465
6516	74.05.07	Konda	kecamatan	465
6517	74.05.08	Ranomeeto	kecamatan	465
6518	74.05.09	Kolono	kecamatan	465
6519	74.05.10	Moramo	kecamatan	465
6520	74.05.11	Laonti	kecamatan	465
6521	74.05.12	Lalembuu	kecamatan	465
6522	74.05.13	Benua	kecamatan	465
6523	74.05.14	Palangga Selatan	kecamatan	465
6524	74.05.15	Mowila	kecamatan	465
6525	74.05.16	Moramo Utara	kecamatan	465
6526	74.05.17	Buke	kecamatan	465
6527	74.05.18	Wolasi	kecamatan	465
6528	74.05.19	Laeya	kecamatan	465
6529	74.05.20	Baito	kecamatan	465
6530	74.05.21	Basala	kecamatan	465
6531	74.05.22	Ranomeeto Barat	kecamatan	465
6532	74.05.23	Kolono Timur	kecamatan	465
6533	74.05.24	Sabulakoa	kecamatan	465
6534	74.05.25	Andoolo Barat	kecamatan	465
6535	74.06.01	Poleang	kecamatan	466
6536	74.06.02	Poleang Timur	kecamatan	466
6537	74.06.03	Rarowatu	kecamatan	466
6538	74.06.04	Rumbia	kecamatan	466
6539	74.06.05	Kabaena	kecamatan	466
6540	74.06.06	Kabaena Timur	kecamatan	466
6541	74.06.07	Poleang Barat	kecamatan	466
6542	74.06.08	Mata Oleo	kecamatan	466
6543	74.06.09	Rarowatu Utara	kecamatan	466
6544	74.06.10	Poleang Utara	kecamatan	466
6545	74.06.11	Poleang Selatan	kecamatan	466
6546	74.06.12	Poleang Tenggara	kecamatan	466
6547	74.06.13	Kabaena Selatan	kecamatan	466
6548	74.06.14	Kabaena Barat	kecamatan	466
6549	74.06.15	Kabaena Utara	kecamatan	466
6550	74.06.16	Kabaena Tengah	kecamatan	466
6551	74.06.17	Kep. Masaloka Raya	kecamatan	466
6552	74.06.18	Rumbia Tengah	kecamatan	466
6553	74.06.19	Poleang Tengah	kecamatan	466
6554	74.06.20	Tontonunu	kecamatan	466
6555	74.06.21	Lantari Jaya	kecamatan	466
6556	74.06.22	Mata Usu	kecamatan	466
6557	74.07.01	Wangi-Wangi	kecamatan	467
6558	74.07.02	Kaledupa	kecamatan	467
6559	74.07.03	Tomia	kecamatan	467
6560	74.07.04	Binongko	kecamatan	467
6561	74.07.05	Wangi Wangi Selatan	kecamatan	467
6562	74.07.06	Kaledupa Selatan	kecamatan	467
6563	74.07.07	Tomia Timur	kecamatan	467
6564	74.07.08	Togo Binongko	kecamatan	467
6565	74.08.01	Lasusua	kecamatan	468
6566	74.08.02	Pakue	kecamatan	468
6567	74.08.03	Batu Putih	kecamatan	468
6568	74.08.04	Rante Angin	kecamatan	468
6569	74.08.05	Kodeoha	kecamatan	468
6570	74.08.06	Ngapa	kecamatan	468
6571	74.08.07	Wawo	kecamatan	468
6572	74.08.08	Lambai	kecamatan	468
6573	74.08.09	Watunohu	kecamatan	468
6574	74.08.10	Pakue Tengah	kecamatan	468
6575	74.08.11	Pakue Utara	kecamatan	468
6576	74.08.12	Porehu	kecamatan	468
6577	74.08.13	Katoi	kecamatan	468
6578	74.08.14	Tiwu	kecamatan	468
6579	74.08.15	Tolala	kecamatan	468
6580	74.09.01	Asera	kecamatan	469
6581	74.09.02	Wiwirano	kecamatan	469
6582	74.09.03	Langgikima	kecamatan	469
6583	74.09.04	Molawe	kecamatan	469
6584	74.09.05	Lasolo	kecamatan	469
6585	74.09.06	Lembo	kecamatan	469
6586	74.09.07	Sawa	kecamatan	469
6587	74.09.08	Oheo	kecamatan	469
6588	74.09.09	Andowia	kecamatan	469
6589	74.09.10	Motui	kecamatan	469
6590	74.09.11	Wawolesea	kecamatan	469
6591	74.09.12	Lasolo Kepulauan	kecamatan	469
6592	74.09.13	Landawe	kecamatan	469
6593	74.10.01	Kulisusu	kecamatan	470
6594	74.10.02	Kambowa	kecamatan	470
6595	74.10.03	Bonegunu	kecamatan	470
6596	74.10.04	Kulisusu Barat	kecamatan	470
6597	74.10.05	Kulisusu Utara	kecamatan	470
6598	74.10.06	Wakorumba Utara	kecamatan	470
6599	74.11.01	Tirawuta	kecamatan	471
6600	74.11.02	Loea	kecamatan	471
6601	74.11.03	Ladongi	kecamatan	471
6602	74.11.04	Poli Polia	kecamatan	471
6603	74.11.05	Lambandia	kecamatan	471
6604	74.11.06	Lalolae	kecamatan	471
6605	74.11.07	Mowewe	kecamatan	471
6606	74.11.08	Uluiwoi	kecamatan	471
6607	74.11.09	Tinondo	kecamatan	471
6608	74.11.10	Aere	kecamatan	471
6609	74.11.11	Ueesi	kecamatan	471
6610	74.11.12	Dangia	kecamatan	471
6611	74.12.01	Wawonii Barat	kecamatan	472
6612	74.12.02	Wawonii Utara	kecamatan	472
6613	74.12.03	Wawonii Timur Laut	kecamatan	472
6614	74.12.04	Wawonii Timur	kecamatan	472
6615	74.12.05	Wawonii Tenggara	kecamatan	472
6616	74.12.06	Wawonii Selatan	kecamatan	472
6617	74.12.07	Wawonii Tengah	kecamatan	472
6618	74.13.01	Sawerigadi	kecamatan	473
6619	74.13.02	Barangka	kecamatan	473
6620	74.13.03	Lawa	kecamatan	473
6621	74.13.04	Wadaga	kecamatan	473
6622	74.13.05	Tiworo Selatan	kecamatan	473
6623	74.13.06	Maginti	kecamatan	473
6624	74.13.07	Tiworo Tengah	kecamatan	473
6625	74.13.08	Tiworo Utara	kecamatan	473
6626	74.13.09	Tiworo Kepulauan	kecamatan	473
6627	74.13.10	Kusambi	kecamatan	473
6628	74.13.11	Napano Kusambi	kecamatan	473
6629	74.14.01	Lakudo	kecamatan	474
6630	74.14.02	Mawasangka Timur	kecamatan	474
6631	74.14.03	Mawasangka Tengah	kecamatan	474
6632	74.14.04	Mawasangka	kecamatan	474
6633	74.14.05	Talaga Raya	kecamatan	474
6634	74.14.06	Gu	kecamatan	474
6635	74.14.07	Sangia Wambulu	kecamatan	474
6636	74.15.01	Batauga	kecamatan	475
6637	74.15.02	Sampolawa	kecamatan	475
6638	74.15.03	Lapandewa	kecamatan	475
6639	74.15.04	Batu Atas	kecamatan	475
6640	74.15.05	Siompu Barat	kecamatan	475
6641	74.15.06	Siompu	kecamatan	475
6642	74.15.07	Kadatua	kecamatan	475
6643	74.71.01	Mandonga	kecamatan	476
6644	74.71.02	Kendari	kecamatan	476
6645	74.71.03	Baruga	kecamatan	476
6646	74.71.04	Poasia	kecamatan	476
6647	74.71.05	Kendari Barat	kecamatan	476
6648	74.71.06	Abeli	kecamatan	476
6649	74.71.07	Wua-Wua	kecamatan	476
6650	74.71.08	Kadia	kecamatan	476
6651	74.71.09	Puuwatu	kecamatan	476
6652	74.71.10	Kambu	kecamatan	476
6653	74.71.11	Nambo	kecamatan	476
6654	74.72.01	Betoambari	kecamatan	477
6655	74.72.02	Wolio	kecamatan	477
6656	74.72.03	Sorawolio	kecamatan	477
6657	74.72.04	Bungi	kecamatan	477
6658	74.72.05	Kokalukuna	kecamatan	477
6659	74.72.06	Murhum	kecamatan	477
6660	74.72.07	Lea-Lea	kecamatan	477
6661	74.72.08	Batupoaro	kecamatan	477
6662	75.01.01	Limboto	kecamatan	478
6663	75.01.02	Telaga	kecamatan	478
6664	75.01.03	Batudaa	kecamatan	478
6665	75.01.04	Tibawa	kecamatan	478
6666	75.01.05	Batudaa Pantai	kecamatan	478
6667	75.01.09	Boliyohuto	kecamatan	478
6668	75.01.10	Telaga Biru	kecamatan	478
6669	75.01.11	Bongomeme	kecamatan	478
6670	75.01.13	Tolangohula	kecamatan	478
6671	75.01.14	Mootilango	kecamatan	478
6672	75.01.16	Pulubala	kecamatan	478
6673	75.01.17	Limboto Barat	kecamatan	478
6674	75.01.18	Tilango	kecamatan	478
6675	75.01.19	Tabongo	kecamatan	478
6676	75.01.20	Biluhu	kecamatan	478
6677	75.01.21	Asparaga	kecamatan	478
6678	75.01.22	Talaga Jaya	kecamatan	478
6679	75.01.23	Bilato	kecamatan	478
6680	75.01.24	Dungaliyo	kecamatan	478
6681	75.02.01	Paguyaman	kecamatan	479
6682	75.02.02	Wonosari	kecamatan	479
6683	75.02.03	Dulupi	kecamatan	479
6684	75.02.04	Tilamuta	kecamatan	479
6685	75.02.05	Mananggu	kecamatan	479
6686	75.02.06	Botumoito	kecamatan	479
6687	75.02.07	Paguyaman Pantai	kecamatan	479
6688	75.03.01	Tapa	kecamatan	480
6689	75.03.02	Kabila	kecamatan	480
6690	75.03.03	Suwawa	kecamatan	480
6691	75.03.04	Bonepantai	kecamatan	480
6692	75.03.05	Bulango Utara	kecamatan	480
6693	75.03.06	Tilongkabila	kecamatan	480
6694	75.03.07	Botupingge	kecamatan	480
6695	75.03.08	Kabila Bone	kecamatan	480
6696	75.03.09	Bone	kecamatan	480
6697	75.03.10	Bone Raya	kecamatan	480
6698	75.03.11	Suwawa Timur	kecamatan	480
6699	75.03.12	Suwawa Selatan	kecamatan	480
6700	75.03.13	Suwawa Tengah	kecamatan	480
6701	75.03.14	Bulango Ulu	kecamatan	480
6702	75.03.15	Bulango Selatan	kecamatan	480
6703	75.03.16	Bulango Timur	kecamatan	480
6704	75.03.17	Bulawa	kecamatan	480
6705	75.03.18	Pinogu	kecamatan	480
6706	75.04.01	Popayato	kecamatan	481
6707	75.04.02	Lemito	kecamatan	481
6708	75.04.03	Randangan	kecamatan	481
6709	75.04.04	Marisa	kecamatan	481
6710	75.04.05	Paguat	kecamatan	481
6711	75.04.06	Patilanggio	kecamatan	481
6712	75.04.07	Taluditi	kecamatan	481
6713	75.04.08	Dengilo	kecamatan	481
6714	75.04.09	Buntulia	kecamatan	481
6715	75.04.10	Duhiadaa	kecamatan	481
6716	75.04.11	Wanggarasi	kecamatan	481
6717	75.04.12	Popayato Timur	kecamatan	481
6718	75.04.13	Popayato Barat	kecamatan	481
6719	75.05.01	Atinggola	kecamatan	482
6720	75.05.02	Kwandang	kecamatan	482
6721	75.05.03	Anggrek	kecamatan	482
6722	75.05.04	Sumalata	kecamatan	482
6723	75.05.05	Tolinggula	kecamatan	482
6724	75.05.06	Gentuma Raya	kecamatan	482
6725	75.05.07	Tomilito	kecamatan	482
6726	75.05.08	Ponelo Kepulauan	kecamatan	482
6727	75.05.09	Monano	kecamatan	482
6728	75.05.10	Biau	kecamatan	482
6729	75.05.11	Sumalata Timur	kecamatan	482
6730	75.71.01	Kota Barat	kecamatan	483
6731	75.71.02	Kota Selatan	kecamatan	483
6732	75.71.03	Kota Utara	kecamatan	483
6733	75.71.04	Dungingi	kecamatan	483
6734	75.71.05	Kota Timur	kecamatan	483
6735	75.71.06	Kota Tengah	kecamatan	483
6736	75.71.07	Sipatana	kecamatan	483
6737	75.71.08	Dumbo Raya	kecamatan	483
6738	75.71.09	Hulonthalangi	kecamatan	483
6739	76.01.01	Bambalamotu	kecamatan	484
6740	76.01.02	Pasangkayu	kecamatan	484
6741	76.01.03	Baras	kecamatan	484
6742	76.01.04	Sarudu	kecamatan	484
6743	76.01.05	Dapurang	kecamatan	484
6744	76.01.06	Duripoku	kecamatan	484
6745	76.01.07	Bulu Taba	kecamatan	484
6746	76.01.08	Tikke Raya	kecamatan	484
6747	76.01.09	Pedongga	kecamatan	484
6748	76.01.10	Bambaira	kecamatan	484
6749	76.01.11	Sarjo	kecamatan	484
6750	76.01.12	Lariang	kecamatan	484
6751	76.02.01	Mamuju	kecamatan	485
6752	76.02.02	Tapalang	kecamatan	485
6753	76.02.03	Kalukku	kecamatan	485
6754	76.02.04	Kalumpang	kecamatan	485
6755	76.02.07	Papalang	kecamatan	485
6756	76.02.08	Sampaga	kecamatan	485
6757	76.02.11	Tommo	kecamatan	485
6758	76.02.12	Simboro	kecamatan	485
6759	76.02.13	Tapalang Barat	kecamatan	485
6760	76.02.15	Bonehau	kecamatan	485
6761	76.02.16	Kepulauan Bala Balakang	kecamatan	485
6762	76.03.01	Mambi	kecamatan	486
6763	76.03.02	Aralle	kecamatan	486
6764	76.03.03	Mamasa	kecamatan	486
6765	76.03.04	Pana	kecamatan	486
6766	76.03.05	Tabulahan	kecamatan	486
6767	76.03.06	Sumarorong	kecamatan	486
6768	76.03.07	Messawa	kecamatan	486
6769	76.03.08	Sesenapadang	kecamatan	486
6770	76.03.09	Tanduk Kalua	kecamatan	486
6771	76.03.10	Tabang	kecamatan	486
6772	76.03.11	Bambang	kecamatan	486
6773	76.03.12	Balla	kecamatan	486
6774	76.03.13	Nosu	kecamatan	486
6775	76.03.14	Tawalian	kecamatan	486
6776	76.03.15	Rantebulahan Timur	kecamatan	486
6777	76.03.16	Buntumalangka	kecamatan	486
6778	76.03.17	Mehalaan	kecamatan	486
6779	76.04.01	Tinambung	kecamatan	487
6780	76.04.02	Campalagian	kecamatan	487
6781	76.04.03	Wonomulyo	kecamatan	487
6782	76.04.04	Polewali	kecamatan	487
6783	76.04.05	Tutar	kecamatan	487
6784	76.04.06	Binuang	kecamatan	487
6785	76.04.07	Tapango	kecamatan	487
6786	76.04.08	Mapilli	kecamatan	487
6787	76.04.09	Matangnga	kecamatan	487
6788	76.04.10	Luyo	kecamatan	487
6789	76.04.11	Limboro	kecamatan	487
6790	76.04.12	Balanipa	kecamatan	487
6791	76.04.13	Anreapi	kecamatan	487
6792	76.04.14	Matakali	kecamatan	487
6793	76.04.15	Allu	kecamatan	487
6794	76.04.16	Bulo	kecamatan	487
6795	76.05.01	Banggae	kecamatan	488
6796	76.05.02	Pamboang	kecamatan	488
6797	76.05.03	Sendana	kecamatan	488
6798	76.05.04	Malunda	kecamatan	488
6799	76.05.05	Ulumanda	kecamatan	488
6800	76.05.06	Tammerodo Sendana	kecamatan	488
6801	76.05.07	Tubo Sendana	kecamatan	488
6802	76.05.08	Banggae Timur	kecamatan	488
6803	76.06.01	Tobadak	kecamatan	489
6804	76.06.02	Pangale	kecamatan	489
6805	76.06.03	Budong-Budong	kecamatan	489
6806	76.06.04	Topoyo	kecamatan	489
6807	76.06.05	Karossa	kecamatan	489
6808	81.01.01	Amahai	kecamatan	490
6809	81.01.02	Teon Nila Serua	kecamatan	490
6810	81.01.06	Seram Utara	kecamatan	490
6811	81.01.09	Banda	kecamatan	490
6812	81.01.11	Tehoru	kecamatan	490
6813	81.01.12	Saparua	kecamatan	490
6814	81.01.13	Pulau Haruku	kecamatan	490
6815	81.01.14	Salahutu	kecamatan	490
6816	81.01.15	Leihitu	kecamatan	490
6817	81.01.16	Nusa Laut	kecamatan	490
6818	81.01.17	Kota Masohi	kecamatan	490
6819	81.01.20	Seram Utara Barat	kecamatan	490
6820	81.01.21	Teluk Elpaputih	kecamatan	490
6821	81.01.22	Leihitu Barat	kecamatan	490
6822	81.01.23	Telutih	kecamatan	490
6823	81.01.24	Seram Utara Timur Seti	kecamatan	490
6824	81.01.25	Seram Utara Timur Kobi	kecamatan	490
6825	81.01.26	Saparua Timur	kecamatan	490
6826	81.02.01	Kei Kecil	kecamatan	491
6827	81.02.03	Kei Besar	kecamatan	491
6828	81.02.04	Kei Besar Selatan	kecamatan	491
6829	81.02.05	Kei Besar Utara Timur	kecamatan	491
6830	81.02.13	Kei Kecil Timur	kecamatan	491
6831	81.02.14	Kei Kecil Barat	kecamatan	491
6832	81.02.15	Manyeuw	kecamatan	491
6833	81.02.16	Hoat Sorbay	kecamatan	491
6834	81.02.17	Kei Besar Utara Barat	kecamatan	491
6835	81.02.18	Kei Besar Selatan Barat	kecamatan	491
6836	81.02.19	Kei Kecil Timur Selatan	kecamatan	491
6837	81.03.01	Tanimbar Selatan	kecamatan	492
6838	81.03.02	Selaru	kecamatan	492
6839	81.03.03	Wertamrian	kecamatan	492
6840	81.03.04	Wermaktian	kecamatan	492
6841	81.03.05	Tanimbar Utara	kecamatan	492
6842	81.03.06	Fordata	kecamatan	492
6843	81.03.07	Wuar Labobar	kecamatan	492
6844	81.03.08	Kormomolin	kecamatan	492
6845	81.03.09	Nirunmas	kecamatan	492
6846	81.03.18	Molu Maru	kecamatan	492
6847	81.04.01	Namlea	kecamatan	493
6848	81.04.02	Air Buaya	kecamatan	493
6849	81.04.03	Waeapo	kecamatan	493
6850	81.04.06	Waplau	kecamatan	493
6851	81.04.10	Batabual	kecamatan	493
6852	81.04.11	Lolong Guba	kecamatan	493
6853	81.04.12	Waelata	kecamatan	493
6854	81.04.13	Fena Leisela	kecamatan	493
6855	81.04.14	Teluk Kaiely	kecamatan	493
6856	81.04.15	Lilialy	kecamatan	493
6857	81.05.01	Bula	kecamatan	494
6858	81.05.02	Seram Timur	kecamatan	494
6859	81.05.03	Werinama	kecamatan	494
6860	81.05.04	Pulau Gorom	kecamatan	494
6861	81.05.05	Wakate	kecamatan	494
6862	81.05.06	Tutuk Tolu	kecamatan	494
6863	81.05.07	Siwalalat	kecamatan	494
6864	81.05.08	Kilmury	kecamatan	494
6865	81.05.09	Pulau Panjang	kecamatan	494
6866	81.05.10	Teor	kecamatan	494
6867	81.05.11	Gorom Timur	kecamatan	494
6868	81.05.12	Bula Barat	kecamatan	494
6869	81.05.13	Kian Darat	kecamatan	494
6870	81.05.14	Siritaun Wida Timur	kecamatan	494
6871	81.05.15	Teluk Waru	kecamatan	494
6872	81.05.16	Ukar Sengan	kecamatan	494
6873	81.06.01	Kairatu	kecamatan	495
6874	81.06.02	Seram Barat	kecamatan	495
6875	81.06.03	Taniwel	kecamatan	495
6876	81.06.04	Huamual Belakang	kecamatan	495
6877	81.06.05	Amalatu	kecamatan	495
6878	81.06.06	Inamosol	kecamatan	495
6879	81.06.07	Kairatu Barat	kecamatan	495
6880	81.06.08	Huamual	kecamatan	495
6881	81.06.09	Kepulauan Manipa	kecamatan	495
6882	81.06.10	Taniwel Timur	kecamatan	495
6883	81.06.11	Elpaputih	kecamatan	495
6884	81.07.01	Pulau-Pulau Aru	kecamatan	496
6885	81.07.02	Aru Selatan	kecamatan	496
6886	81.07.03	Aru Tengah	kecamatan	496
6887	81.07.04	Aru Utara	kecamatan	496
6888	81.07.05	Aru Utara Timur Batuley	kecamatan	496
6889	81.07.06	Sir-Sir	kecamatan	496
6890	81.07.07	Aru Tengah Timur	kecamatan	496
6891	81.07.08	Aru Tengah Selatan	kecamatan	496
6892	81.07.09	Aru Selatan Timur	kecamatan	496
6893	81.07.10	Aru Selatan Utara	kecamatan	496
6894	81.08.01	Moa	kecamatan	497
6895	81.08.02	Damer	kecamatan	497
6896	81.08.03	Kepulauan Luang Sermata	kecamatan	497
6897	81.08.04	Babar Barat	kecamatan	497
6898	81.08.05	Pulau-pulau Babar Timur	kecamatan	497
6899	81.08.06	Wetar Selatan	kecamatan	497
6900	81.08.07	Kisar Selatan	kecamatan	497
6901	81.08.08	Pulau Leti	kecamatan	497
6902	81.08.09	Pulau Masela	kecamatan	497
6903	81.08.10	Dawelor Dawera	kecamatan	497
6904	81.08.11	Pulau Wetang	kecamatan	497
6905	81.08.12	Pulau Lakor	kecamatan	497
6906	81.08.13	Wetar Utara	kecamatan	497
6907	81.08.14	Wetar Barat	kecamatan	497
6908	81.08.15	Wetar Timur	kecamatan	497
6909	81.08.16	Kepulauan Roma	kecamatan	497
6910	81.08.17	Kisar Utara	kecamatan	497
6911	81.09.01	Namrole	kecamatan	498
6912	81.09.02	Waesama	kecamatan	498
6913	81.09.03	Ambalau	kecamatan	498
6914	81.09.04	Kepala Madan	kecamatan	498
6915	81.09.05	Leksula	kecamatan	498
6916	81.09.06	Fena Fafan	kecamatan	498
6917	81.71.01	Nusaniwe	kecamatan	499
6918	81.71.02	Sirimau	kecamatan	499
6919	81.71.03	Baguala	kecamatan	499
6920	81.71.04	Teluk Ambon	kecamatan	499
6921	81.71.05	Leitimur Selatan	kecamatan	499
6922	81.72.01	Pulau Dullah Utara	kecamatan	500
6923	81.72.02	Pulau Dullah Selatan	kecamatan	500
6924	81.72.03	Tayando Tam	kecamatan	500
6925	81.72.04	Pulau-Pulau Kur	kecamatan	500
6926	81.72.05	Kur Selatan	kecamatan	500
6927	82.01.01	Jailolo	kecamatan	501
6928	82.01.02	Loloda	kecamatan	501
6929	82.01.03	Ibu	kecamatan	501
6930	82.01.04	Sahu	kecamatan	501
6931	82.01.05	Jailolo Selatan	kecamatan	501
6932	82.01.07	Ibu Utara	kecamatan	501
6933	82.01.08	Ibu Selatan	kecamatan	501
6934	82.01.09	Sahu Timur	kecamatan	501
6935	82.01.10	Loloda Tengah	kecamatan	501
6936	82.02.01	Weda	kecamatan	502
6937	82.02.02	Patani	kecamatan	502
6938	82.02.03	Pulau Gebe	kecamatan	502
6939	82.02.04	Weda Utara	kecamatan	502
6940	82.02.05	Weda Selatan	kecamatan	502
6941	82.02.06	Patani Utara	kecamatan	502
6942	82.02.07	Weda Tengah	kecamatan	502
6943	82.02.08	Patani Barat	kecamatan	502
6944	82.02.09	Weda Timur	kecamatan	502
6945	82.02.10	Patani Timur	kecamatan	502
6946	82.03.04	Galela	kecamatan	503
6947	82.03.05	Tobelo	kecamatan	503
6948	82.03.06	Tobelo Selatan	kecamatan	503
6949	82.03.07	Kao	kecamatan	503
6950	82.03.08	Malifut	kecamatan	503
6951	82.03.09	Loloda Utara	kecamatan	503
6952	82.03.10	Tobelo Utara	kecamatan	503
6953	82.03.11	Tobelo Tengah	kecamatan	503
6954	82.03.12	Tobelo Timur	kecamatan	503
6955	82.03.13	Tobelo Barat	kecamatan	503
6956	82.03.14	Galela Barat	kecamatan	503
6957	82.03.15	Galela Utara	kecamatan	503
6958	82.03.16	Galela Selatan	kecamatan	503
6959	82.03.19	Loloda Kepulauan	kecamatan	503
6960	82.03.20	Kao Utara	kecamatan	503
6961	82.03.21	Kao Barat	kecamatan	503
6962	82.03.22	Kao Teluk	kecamatan	503
6963	82.04.01	Pulau Makian	kecamatan	504
6964	82.04.02	Kayoa	kecamatan	504
6965	82.04.03	Gane Timur	kecamatan	504
6966	82.04.04	Gane Barat	kecamatan	504
6967	82.04.05	Obi Selatan	kecamatan	504
6968	82.04.06	Obi	kecamatan	504
6969	82.04.07	Bacan Timur	kecamatan	504
6970	82.04.08	Bacan	kecamatan	504
6971	82.04.09	Bacan Barat	kecamatan	504
6972	82.04.10	Makian Barat	kecamatan	504
6973	82.04.11	Kayoa Barat	kecamatan	504
6974	82.04.12	Kayoa Selatan	kecamatan	504
6975	82.04.13	Kayoa Utara	kecamatan	504
6976	82.04.14	Bacan Barat Utara	kecamatan	504
6977	82.04.15	Kasiruta Barat	kecamatan	504
6978	82.04.16	Kasiruta Timur	kecamatan	504
6979	82.04.17	Bacan Selatan	kecamatan	504
6980	82.04.18	Kepulauan Botanglomang	kecamatan	504
6981	82.04.19	Mandioli Selatan	kecamatan	504
6982	82.04.20	Mandioli Utara	kecamatan	504
6983	82.04.21	Bacan Timur Selatan	kecamatan	504
6984	82.04.22	Bacan Timur Tengah	kecamatan	504
6985	82.04.23	Gane Barat Selatan	kecamatan	504
6986	82.04.24	Gane Barat Utara	kecamatan	504
6987	82.04.25	Kepulauan Joronga	kecamatan	504
6988	82.04.26	Gane Timur Selatan	kecamatan	504
6989	82.04.27	Gane Timur Tengah	kecamatan	504
6990	82.04.28	Obi Barat	kecamatan	504
6991	82.04.29	Obi Timur	kecamatan	504
6992	82.04.30	Obi Utara	kecamatan	504
6993	82.05.01	Mangoli Timur	kecamatan	505
6994	82.05.02	Sanana	kecamatan	505
6995	82.05.03	Sulabesi Barat	kecamatan	505
6996	82.05.06	Mangoli Barat	kecamatan	505
6997	82.05.07	Sulabesi Tengah	kecamatan	505
6998	82.05.08	Sulabesi Timur	kecamatan	505
6999	82.05.09	Sulabesi Selatan	kecamatan	505
7000	82.05.10	Mangoli Utara Timur	kecamatan	505
7001	82.05.11	Mangoli Tengah	kecamatan	505
7002	82.05.12	Mangoli Selatan	kecamatan	505
7003	82.05.13	Mangoli Utara	kecamatan	505
7004	82.05.18	Sanana Utara	kecamatan	505
7005	82.06.01	Wasile	kecamatan	506
7006	82.06.02	Maba	kecamatan	506
7007	82.06.03	Maba Selatan	kecamatan	506
7008	82.06.04	Wasile Selatan	kecamatan	506
7009	82.06.05	Wasile Tengah	kecamatan	506
7010	82.06.06	Wasile Utara	kecamatan	506
7011	82.06.07	Wasile Timur	kecamatan	506
7012	82.06.08	Maba Tengah	kecamatan	506
7013	82.06.09	Maba Utara	kecamatan	506
7014	82.06.10	Kota Maba	kecamatan	506
7015	82.07.01	Morotai Selatan	kecamatan	507
7016	82.07.02	Morotai Selatan Barat	kecamatan	507
7017	82.07.03	Morotai Jaya	kecamatan	507
7018	82.07.04	Morotai Utara	kecamatan	507
7019	82.07.05	Morotai Timur	kecamatan	507
7020	82.07.06	Pulau Rao	kecamatan	507
7021	82.08.01	Taliabu Barat	kecamatan	508
7022	82.08.02	Taliabu Barat Laut	kecamatan	508
7023	82.08.03	Lede	kecamatan	508
7024	82.08.04	Taliabu Utara	kecamatan	508
7025	82.08.05	Taliabu Timur	kecamatan	508
7026	82.08.06	Taliabu Timur Selatan	kecamatan	508
7027	82.08.07	Taliabu Selatan	kecamatan	508
7028	82.08.08	Tabona	kecamatan	508
7029	82.71.01	Pulau Ternate	kecamatan	509
7030	82.71.02	Kota Ternate Selatan	kecamatan	509
7031	82.71.03	Kota Ternate Utara	kecamatan	509
7032	82.71.04	Moti	kecamatan	509
7033	82.71.05	Pulau Batang Dua	kecamatan	509
7034	82.71.06	Kota Ternate Tengah	kecamatan	509
7035	82.71.07	Pulau Hiri	kecamatan	509
7036	82.71.08	Ternate Barat	kecamatan	509
7037	82.72.01	Tidore	kecamatan	510
7038	82.72.02	Oba Utara	kecamatan	510
7039	82.72.03	Oba	kecamatan	510
7040	82.72.04	Tidore Selatan	kecamatan	510
7041	82.72.05	Tidore Utara	kecamatan	510
7042	82.72.06	Oba Tengah	kecamatan	510
7043	82.72.07	Oba Selatan	kecamatan	510
7044	82.72.08	Tidore Timur	kecamatan	510
7045	91.03.01	Sentani	kecamatan	511
7046	91.03.02	Sentani Timur	kecamatan	511
7047	91.03.03	Depapre	kecamatan	511
7048	91.03.04	Sentani Barat	kecamatan	511
7049	91.03.05	Kemtuk	kecamatan	511
7050	91.03.06	Kemtuk Gresi	kecamatan	511
7051	91.03.07	Nimboran	kecamatan	511
7052	91.03.08	Nimbokrang	kecamatan	511
7053	91.03.09	Unurum Guay	kecamatan	511
7054	91.03.10	Demta	kecamatan	511
7055	91.03.11	Kaureh	kecamatan	511
7056	91.03.12	Ebungfao	kecamatan	511
7057	91.03.13	Waibu	kecamatan	511
7058	91.03.14	Nambluong	kecamatan	511
7059	91.03.15	Yapsi	kecamatan	511
7060	91.03.16	Airu	kecamatan	511
7061	91.03.17	Raveni Rara	kecamatan	511
7062	91.03.18	Gresi Selatan	kecamatan	511
7063	91.03.19	Yokari	kecamatan	511
7064	91.05.01	Yapen Selatan	kecamatan	512
7065	91.05.02	Yapen Barat	kecamatan	512
7066	91.05.03	Yapen Timur	kecamatan	512
7067	91.05.04	Angkaisera	kecamatan	512
7068	91.05.05	Poom	kecamatan	512
7069	91.05.06	Kosiwo	kecamatan	512
7070	91.05.07	Yapen Utara	kecamatan	512
7071	91.05.08	Raimbawi	kecamatan	512
7072	91.05.09	Teluk Ampimoi	kecamatan	512
7073	91.05.10	Kepulauan Ambai	kecamatan	512
7074	91.05.11	Wonawa	kecamatan	512
7075	91.05.12	Windesi	kecamatan	512
7076	91.05.13	Pulau Kurudu	kecamatan	512
7077	91.05.14	Pulau Yerui	kecamatan	512
7078	91.05.15	Anotaurei	kecamatan	512
7079	91.05.16	Yawakukat	kecamatan	512
7080	91.05.17	Nusawani	kecamatan	512
7081	91.06.01	Biak Kota	kecamatan	513
7082	91.06.02	Biak Utara	kecamatan	513
7083	91.06.03	Biak Timur	kecamatan	513
7084	91.06.04	Numfor Barat	kecamatan	513
7085	91.06.05	Numfor Timur	kecamatan	513
7086	91.06.08	Biak Barat	kecamatan	513
7087	91.06.09	Warsa	kecamatan	513
7088	91.06.10	Padaido	kecamatan	513
7089	91.06.11	Yendidori	kecamatan	513
7090	91.06.12	Samofa	kecamatan	513
7091	91.06.13	Yawosi	kecamatan	513
7092	91.06.14	Andey	kecamatan	513
7093	91.06.15	Swandiwe	kecamatan	513
7094	91.06.16	Bruyadori	kecamatan	513
7095	91.06.17	Orkeri	kecamatan	513
7096	91.06.18	Poiru	kecamatan	513
7097	91.06.19	Aimando Padaido	kecamatan	513
7098	91.06.20	Oridek	kecamatan	513
7099	91.06.21	Bondifuar	kecamatan	513
7100	91.10.01	Sarmi	kecamatan	514
7101	91.10.02	Tor Atas	kecamatan	514
7102	91.10.03	Pantai Barat	kecamatan	514
7103	91.10.04	Pantai Timur	kecamatan	514
7104	91.10.05	Bonggo	kecamatan	514
7105	91.10.09	Apawer Hulu	kecamatan	514
7106	91.10.12	Sarmi Selatan	kecamatan	514
7107	91.10.13	Sarmi Timur	kecamatan	514
7108	91.10.14	Pantai Timur Bagian Barat	kecamatan	514
7109	91.10.15	Bonggo Timur	kecamatan	514
7110	91.11.01	Waris	kecamatan	515
7111	91.11.02	Arso	kecamatan	515
7112	91.11.03	Senggi	kecamatan	515
7113	91.11.04	Web	kecamatan	515
7114	91.11.05	Skanto	kecamatan	515
7115	91.11.06	Arso Timur	kecamatan	515
7116	91.11.07	Towe	kecamatan	515
7117	91.11.08	Arso Barat	kecamatan	515
7118	91.11.09	Mannem	kecamatan	515
7119	91.11.10	Yaffi	kecamatan	515
7120	91.11.11	Kaisenar	kecamatan	515
7121	91.15.01	Waropen Bawah	kecamatan	516
7122	91.15.03	Masirei	kecamatan	516
7123	91.15.07	Risei Sayati	kecamatan	516
7124	91.15.08	Urei Faisei	kecamatan	516
7125	91.15.09	Inggerus	kecamatan	516
7126	91.15.10	Kirihi	kecamatan	516
7127	91.15.11	Oudate	kecamatan	516
7128	91.15.12	Wapoga	kecamatan	516
7129	91.15.13	Demba	kecamatan	516
7130	91.15.14	Wonti	kecamatan	516
7131	91.15.15	Soyoi Mambai	kecamatan	516
7132	91.19.01	Supiori Selatan	kecamatan	517
7133	91.19.02	Supiori Utara	kecamatan	517
7134	91.19.03	Supiori Timur	kecamatan	517
7135	91.19.04	Kepulauan Aruri	kecamatan	517
7136	91.19.05	Supiori Barat	kecamatan	517
7137	91.20.01	Mamberamo Tengah	kecamatan	518
7138	91.20.02	Mamberamo Hulu	kecamatan	518
7139	91.20.03	Rufaer	kecamatan	518
7140	91.20.04	Mamberamo Tengah Timur	kecamatan	518
7141	91.20.05	Mamberamo Hilir	kecamatan	518
7142	91.20.06	Waropen Atas	kecamatan	518
7143	91.20.07	Benuki	kecamatan	518
7144	91.20.08	Sawai	kecamatan	518
7145	91.71.01	Jayapura Utara	kecamatan	519
7146	91.71.02	Jayapura Selatan	kecamatan	519
7147	91.71.03	Abepura	kecamatan	519
7148	91.71.04	Muara Tami	kecamatan	519
7149	91.71.05	Heram	kecamatan	519
7150	92.02.03	Warmare	kecamatan	520
7151	92.02.04	Prafi	kecamatan	520
7152	92.02.05	Masni	kecamatan	520
7153	92.02.12	Manokwari Barat	kecamatan	520
7154	92.02.13	Manokwari Timur	kecamatan	520
7155	92.02.14	Manokwari Utara	kecamatan	520
7156	92.02.15	Manokwari Selatan	kecamatan	520
7157	92.02.17	Tanah Rubuh	kecamatan	520
7158	92.02.21	Sidey	kecamatan	520
7159	92.02.31	Aimasi	kecamatan	520
7160	92.02.32	Mokwam	kecamatan	520
7161	92.02.33	Masni Utara	kecamatan	520
7162	92.02.34	Wasirawi	kecamatan	520
7163	92.02.35	Moruj Mega	kecamatan	520
7164	92.03.01	Fak-Fak	kecamatan	521
7165	92.03.02	Fak-Fak Barat	kecamatan	521
7166	92.03.03	Fak-Fak Timur	kecamatan	521
7167	92.03.04	Kokas	kecamatan	521
7168	92.03.05	Fak-Fak Tengah	kecamatan	521
7169	92.03.06	Karas	kecamatan	521
7170	92.03.07	Bomberay	kecamatan	521
7171	92.03.08	Kramongmongga	kecamatan	521
7172	92.03.09	Teluk Patipi	kecamatan	521
7173	92.03.10	Pariwari	kecamatan	521
7174	92.03.11	Wartutin	kecamatan	521
7175	92.03.12	Fakfak Timur Tengah	kecamatan	521
7176	92.03.13	Arguni	kecamatan	521
7177	92.03.14	Mbahamdandara	kecamatan	521
7178	92.03.15	Kayauni	kecamatan	521
7179	92.03.16	Furwagi	kecamatan	521
7180	92.03.17	Tomage	kecamatan	521
7181	92.06.01	Bintuni	kecamatan	522
7182	92.06.02	Merdey	kecamatan	522
7183	92.06.03	Babo	kecamatan	522
7184	92.06.04	Aranday	kecamatan	522
7185	92.06.05	Moskona Selatan	kecamatan	522
7186	92.06.06	Moskona Utara	kecamatan	522
7187	92.06.07	Wamesa	kecamatan	522
7188	92.06.08	Fafurwar	kecamatan	522
7189	92.06.09	Tembuni	kecamatan	522
7190	92.06.10	Kuri	kecamatan	522
7191	92.06.11	Manimeri	kecamatan	522
7192	92.06.12	Tuhiba	kecamatan	522
7193	92.06.13	Dataran Beimes	kecamatan	522
7194	92.06.14	Sumuri	kecamatan	522
7195	92.06.15	Kaitaro	kecamatan	522
7196	92.06.16	Aroba	kecamatan	522
7197	92.06.17	Masyeta	kecamatan	522
7198	92.06.18	Biscoop	kecamatan	522
7199	92.06.19	Tomu	kecamatan	522
7200	92.06.20	Kamundan	kecamatan	522
7201	92.06.21	Weriagar	kecamatan	522
7202	92.06.22	Moskona Barat	kecamatan	522
7203	92.06.23	Meyado	kecamatan	522
7204	92.06.24	Moskona Timur	kecamatan	522
7205	92.07.01	Wasior	kecamatan	523
7206	92.07.02	Windesi	kecamatan	523
7207	92.07.03	Teluk Duairi	kecamatan	523
7208	92.07.04	Wondiboy	kecamatan	523
7209	92.07.05	Wamesa	kecamatan	523
7210	92.07.06	Rumberpon	kecamatan	523
7211	92.07.07	Naikere	kecamatan	523
7212	92.07.08	Rasiei	kecamatan	523
7213	92.07.09	Kuri Wamesa	kecamatan	523
7214	92.07.10	Roon	kecamatan	523
7215	92.07.11	Roswar	kecamatan	523
7216	92.07.12	Nikiwar	kecamatan	523
7217	92.07.13	Soug Jaya	kecamatan	523
7218	92.08.01	Kaimana	kecamatan	524
7219	92.08.02	Buruway	kecamatan	524
7220	92.08.03	Teluk Arguni Atas	kecamatan	524
7221	92.08.04	Teluk Etna	kecamatan	524
7222	92.08.05	Kambrau	kecamatan	524
7223	92.08.06	Teluk Arguni Bawah	kecamatan	524
7224	92.08.07	Yamor	kecamatan	524
7225	92.11.01	Ransiki	kecamatan	525
7226	92.11.02	Oransbari	kecamatan	525
7227	92.11.03	Neney	kecamatan	525
7228	92.11.04	Dataran Isim	kecamatan	525
7229	92.11.05	Momi Waren	kecamatan	525
7230	92.11.06	Tahota	kecamatan	525
7231	92.12.01	Anggi	kecamatan	526
7232	92.12.02	Anggi Gida	kecamatan	526
7233	92.12.03	Membey	kecamatan	526
7234	92.12.04	Sururey	kecamatan	526
7235	92.12.05	Didohu	kecamatan	526
7236	92.12.06	Taige	kecamatan	526
7237	92.12.07	Catubouw	kecamatan	526
7238	92.12.08	Testega	kecamatan	526
7239	92.12.09	Minyambaouw	kecamatan	526
7240	92.12.10	Hingk	kecamatan	526
7241	93.01.01	Merauke	kecamatan	527
7242	93.01.02	Muting	kecamatan	527
7243	93.01.03	Okaba	kecamatan	527
7244	93.01.04	Kimaam	kecamatan	527
7245	93.01.05	Semangga	kecamatan	527
7246	93.01.06	Tanah Miring	kecamatan	527
7247	93.01.07	Jagebob	kecamatan	527
7248	93.01.08	Sota	kecamatan	527
7249	93.01.09	Ulilin	kecamatan	527
7250	93.01.10	Elikobal	kecamatan	527
7251	93.01.11	Kurik	kecamatan	527
7252	93.01.12	Naukenjerai	kecamatan	527
7253	93.01.13	Animha	kecamatan	527
7254	93.01.14	Malind	kecamatan	527
7255	93.01.15	Tubang	kecamatan	527
7256	93.01.16	Ngguti	kecamatan	527
7257	93.01.17	Kaptel	kecamatan	527
7258	93.01.18	Tabonji	kecamatan	527
7259	93.01.19	Waan	kecamatan	527
7260	93.01.20	Ilwayab	kecamatan	527
7261	93.01.21	Padua	kecamatan	527
7262	93.01.22	Kontuar	kecamatan	527
7263	93.02.01	Mandobo	kecamatan	528
7264	93.02.02	Mindiptana	kecamatan	528
7265	93.02.03	Waropko	kecamatan	528
7266	93.02.04	Kouh	kecamatan	528
7267	93.02.05	Jair	kecamatan	528
7268	93.02.06	Bomakia	kecamatan	528
7269	93.02.07	Kombut	kecamatan	528
7270	93.02.08	Iniyandit	kecamatan	528
7271	93.02.09	Arimop	kecamatan	528
7272	93.02.10	Fofi	kecamatan	528
7273	93.02.11	Ambatkwi	kecamatan	528
7274	93.02.12	Manggelum	kecamatan	528
7275	93.02.13	Firiwage	kecamatan	528
7276	93.02.14	Yaniruma	kecamatan	528
7277	93.02.15	Subur	kecamatan	528
7278	93.02.16	Kombay	kecamatan	528
7279	93.02.17	Ninati	kecamatan	528
7280	93.02.18	Sesnuk	kecamatan	528
7281	93.02.19	Ki	kecamatan	528
7282	93.02.20	Kawagit	kecamatan	528
7283	93.03.01	Obaa	kecamatan	529
7284	93.03.02	Mambioman Bapai	kecamatan	529
7285	93.03.03	Citak-Mitak	kecamatan	529
7286	93.03.04	Edera	kecamatan	529
7287	93.03.05	Haju	kecamatan	529
7288	93.03.06	Assue	kecamatan	529
7289	93.03.07	Kaibar	kecamatan	529
7290	93.03.08	Passue	kecamatan	529
7291	93.03.09	Minyamur	kecamatan	529
7292	93.03.10	Venaha	kecamatan	529
7293	93.03.11	Syahcame	kecamatan	529
7294	93.03.12	Yakomi	kecamatan	529
7295	93.03.13	Bamgi	kecamatan	529
7296	93.03.14	Passue Bawah	kecamatan	529
7297	93.03.15	Ti Zain	kecamatan	529
7298	93.04.01	Agats	kecamatan	530
7299	93.04.02	Atsj	kecamatan	530
7300	93.04.03	Sawa Erma	kecamatan	530
7301	93.04.04	Akat	kecamatan	530
7302	93.04.05	Fayit	kecamatan	530
7303	93.04.06	Pantai Kasuari	kecamatan	530
7304	93.04.07	Suator	kecamatan	530
7305	93.04.08	Suru-suru	kecamatan	530
7306	93.04.09	Kolf Braza	kecamatan	530
7307	93.04.10	Unir Sirau	kecamatan	530
7308	93.04.11	Joerat	kecamatan	530
7309	93.04.12	Pulau Tiga	kecamatan	530
7310	93.04.13	Jetsy	kecamatan	530
7311	93.04.14	Der Koumur	kecamatan	530
7312	93.04.15	Kopay	kecamatan	530
7313	93.04.16	Safan	kecamatan	530
7314	93.04.17	Sirets	kecamatan	530
7315	93.04.18	Ayib	kecamatan	530
7316	93.04.19	Betcbamu	kecamatan	530
7317	93.04.20	Joutu	kecamatan	530
7318	93.04.21	Aswi	kecamatan	530
7319	93.04.22	Awyu	kecamatan	530
7320	93.04.23	Koroway Buluanop	kecamatan	530
7321	93.04.24	Tomor Birip	kecamatan	530
7322	93.04.25	Sor Ep	kecamatan	530
7323	94.01.01	Nabire	kecamatan	531
7324	94.01.02	Napan	kecamatan	531
7325	94.01.03	Yaur	kecamatan	531
7326	94.01.04	Uwapa	kecamatan	531
7327	94.01.05	Wanggar	kecamatan	531
7328	94.01.06	Siriwo	kecamatan	531
7329	94.01.07	Makimi	kecamatan	531
7330	94.01.08	Teluk Umar	kecamatan	531
7331	94.01.09	Teluk Kimi	kecamatan	531
7332	94.01.10	Yaro	kecamatan	531
7333	94.01.11	Wapoga	kecamatan	531
7334	94.01.12	Nabire Barat	kecamatan	531
7335	94.01.13	Moora	kecamatan	531
7336	94.01.14	Dipa	kecamatan	531
7337	94.01.15	Menou	kecamatan	531
7338	94.02.01	Mulia	kecamatan	532
7339	94.02.02	Ilu	kecamatan	532
7340	94.02.03	Fawi	kecamatan	532
7341	94.02.04	Mewoluk	kecamatan	532
7342	94.02.05	Yamo	kecamatan	532
7343	94.02.06	Nume	kecamatan	532
7344	94.02.07	Torere	kecamatan	532
7345	94.02.08	Tingginambut	kecamatan	532
7346	94.02.09	Pagaleme	kecamatan	532
7347	94.02.10	Gurage	kecamatan	532
7348	94.02.11	Irimuli	kecamatan	532
7349	94.02.12	Muara	kecamatan	532
7350	94.02.13	Ilamburawi	kecamatan	532
7351	94.02.14	Yambi	kecamatan	532
7352	94.02.15	Lumo	kecamatan	532
7353	94.02.16	Molanikime	kecamatan	532
7354	94.02.17	Dokome	kecamatan	532
7355	94.02.18	Kalome	kecamatan	532
7356	94.02.19	Wanwi	kecamatan	532
7357	94.02.20	Yamoneri	kecamatan	532
7358	94.02.21	Waegi	kecamatan	532
7359	94.02.22	Nioga	kecamatan	532
7360	94.02.23	Gubume	kecamatan	532
7361	94.02.24	Taganombak	kecamatan	532
7362	94.02.25	Dagai	kecamatan	532
7363	94.02.26	Kiyage	kecamatan	532
7364	94.03.01	Paniai Timur	kecamatan	533
7365	94.03.02	Paniai Barat	kecamatan	533
7366	94.03.03	Aradide	kecamatan	533
7367	94.03.04	Bogabaida	kecamatan	533
7368	94.03.05	Bibida	kecamatan	533
7369	94.03.06	Dumadama	kecamatan	533
7370	94.03.07	Siriwo	kecamatan	533
7371	94.03.08	Kebo	kecamatan	533
7372	94.03.09	Yatamo	kecamatan	533
7373	94.03.10	Ekadide	kecamatan	533
7374	94.03.11	Wegee Muka	kecamatan	533
7375	94.03.12	Wegee Bino	kecamatan	533
7376	94.03.13	Pugo Dagi	kecamatan	533
7377	94.03.14	Muye	kecamatan	533
7378	94.03.15	Nakama	kecamatan	533
7379	94.03.16	Teluk Deya	kecamatan	533
7380	94.03.17	Yagai	kecamatan	533
7381	94.03.18	Youtadi	kecamatan	533
7382	94.03.19	Baya Biru	kecamatan	533
7383	94.03.20	Deiyai Miyo	kecamatan	533
7384	94.03.21	Dogomo	kecamatan	533
7385	94.03.22	Aweida	kecamatan	533
7386	94.03.23	Topiyai	kecamatan	533
7387	94.03.24	Fajar Timur	kecamatan	533
7388	94.04.01	Mimika Baru	kecamatan	534
7389	94.04.02	Agimuga	kecamatan	534
7390	94.04.03	Mimika Timur	kecamatan	534
7391	94.04.04	Mimika Barat	kecamatan	534
7392	94.04.05	Jita	kecamatan	534
7393	94.04.06	Jila	kecamatan	534
7394	94.04.07	Mimika Timur Jauh	kecamatan	534
7395	94.04.08	Mimika Tengah	kecamatan	534
7396	94.04.09	Kuala Kencana	kecamatan	534
7397	94.04.10	Tembagapura	kecamatan	534
7398	94.04.11	Mimika Barat Jauh	kecamatan	534
7399	94.04.12	Mimika Barat Tengah	kecamatan	534
7400	94.04.13	Kwamki Narama	kecamatan	534
7401	94.04.14	Hoya	kecamatan	534
7402	94.04.15	Iwaka	kecamatan	534
7403	94.04.16	Wania	kecamatan	534
7404	94.04.17	Amar	kecamatan	534
7405	94.04.18	Alama	kecamatan	534
7406	94.05.01	Ilaga	kecamatan	535
7407	94.05.02	Wangbe	kecamatan	535
7408	94.05.03	Beoga	kecamatan	535
7409	94.05.04	Doufo	kecamatan	535
7410	94.05.05	Pogoma	kecamatan	535
7411	94.05.06	Sinak	kecamatan	535
7412	94.05.07	Agandugume	kecamatan	535
7413	94.05.08	Gome	kecamatan	535
7414	94.05.09	Dervos	kecamatan	535
7415	94.05.10	Beoga Barat	kecamatan	535
7416	94.05.11	Beoga Timur	kecamatan	535
7417	94.05.12	Ogamanim	kecamatan	535
7418	94.05.13	Kembru	kecamatan	535
7419	94.05.14	Bina	kecamatan	535
7420	94.05.15	Sinak Barat	kecamatan	535
7421	94.05.16	Mage'abume	kecamatan	535
7422	94.05.17	Yugumuak	kecamatan	535
7423	94.05.18	Ilaga Utara	kecamatan	535
7424	94.05.19	Mabugi	kecamatan	535
7425	94.05.20	Omukia	kecamatan	535
7426	94.05.21	Lambewi	kecamatan	535
7427	94.05.22	Oneri	kecamatan	535
7428	94.05.23	Amungkalpia	kecamatan	535
7429	94.05.24	Gome Utara	kecamatan	535
7430	94.05.25	Erelmakawia	kecamatan	535
7431	94.06.01	Kamu	kecamatan	536
7432	94.06.02	Mapia	kecamatan	536
7433	94.06.03	Piyaiye	kecamatan	536
7434	94.06.04	Kamu Utara	kecamatan	536
7435	94.06.05	Sukikai Selatan	kecamatan	536
7436	94.06.06	Mapia Barat	kecamatan	536
7437	94.06.07	Kamu Selatan	kecamatan	536
7438	94.06.08	Kamu Timur	kecamatan	536
7439	94.06.09	Mapia Tengah	kecamatan	536
7440	94.06.10	Dogiyai	kecamatan	536
7441	94.07.01	Sugapa	kecamatan	537
7442	94.07.02	Homeyo	kecamatan	537
7443	94.07.03	Wandai	kecamatan	537
7444	94.07.04	Biandoga	kecamatan	537
7445	94.07.05	Agisiga	kecamatan	537
7446	94.07.06	Hitadipa	kecamatan	537
7447	94.07.07	Ugimba	kecamatan	537
7448	94.07.08	Tomosiga	kecamatan	537
7449	94.08.01	Tigi	kecamatan	538
7450	94.08.02	Tigi Timur	kecamatan	538
7451	94.08.03	Bowobado	kecamatan	538
7452	94.08.04	Tigi Barat	kecamatan	538
7453	94.08.05	Kapiraya	kecamatan	538
7454	95.01.01	Wamena	kecamatan	539
7455	95.01.02	Kurulu	kecamatan	539
7456	95.01.03	Asologaima	kecamatan	539
7457	95.01.04	Hubikosi	kecamatan	539
7458	95.01.05	Bolakme	kecamatan	539
7459	95.01.06	Walelagama	kecamatan	539
7460	95.01.07	Musatfak	kecamatan	539
7461	95.01.08	Wolo	kecamatan	539
7462	95.01.09	Asolokobal	kecamatan	539
7463	95.01.10	Pelebaga	kecamatan	539
7464	95.01.11	Yalengga	kecamatan	539
7465	95.01.12	Trikora	kecamatan	539
7466	95.01.13	Napua	kecamatan	539
7467	95.01.14	Walaik	kecamatan	539
7468	95.01.15	Wouma	kecamatan	539
7469	95.01.16	Hubikiak	kecamatan	539
7470	95.01.17	Ibele	kecamatan	539
7471	95.01.18	Taelarek	kecamatan	539
7472	95.01.19	Itlay Hisage	kecamatan	539
7473	95.01.20	Siepkosi	kecamatan	539
7474	95.01.21	Usilimo	kecamatan	539
7475	95.01.22	Wita Waya	kecamatan	539
7476	95.01.23	Libarek	kecamatan	539
7477	95.01.24	Wadangku	kecamatan	539
7478	95.01.25	Pisugi	kecamatan	539
7479	95.01.26	Koragi	kecamatan	539
7480	95.01.27	Tagime	kecamatan	539
7481	95.01.28	Molagalome	kecamatan	539
7482	95.01.29	Tagineri	kecamatan	539
7483	95.01.30	Silo Karno Doga	kecamatan	539
7484	95.01.31	Piramid	kecamatan	539
7485	95.01.32	Muliama	kecamatan	539
7486	95.01.33	Bugi	kecamatan	539
7487	95.01.34	Bpiri	kecamatan	539
7488	95.01.35	Welesi	kecamatan	539
7489	95.01.36	Asotipo	kecamatan	539
7490	95.01.37	Maima	kecamatan	539
7491	95.01.38	Popugoba	kecamatan	539
7492	95.01.39	Wame	kecamatan	539
7493	95.01.40	Wesaput	kecamatan	539
7494	95.02.01	Oksibil	kecamatan	540
7495	95.02.02	Kiwirok	kecamatan	540
7496	95.02.03	Okbibab	kecamatan	540
7497	95.02.04	Iwur	kecamatan	540
7498	95.02.05	Batom	kecamatan	540
7499	95.02.06	Borme	kecamatan	540
7500	95.02.07	Kiwirok Timur	kecamatan	540
7501	95.02.08	Aboy	kecamatan	540
7502	95.02.09	Pepera	kecamatan	540
7503	95.02.10	Bime	kecamatan	540
7504	95.02.11	Alemsom	kecamatan	540
7505	95.02.12	Okbape	kecamatan	540
7506	95.02.13	Kalomdol	kecamatan	540
7507	95.02.14	Oksop	kecamatan	540
7508	95.02.15	Serambakon	kecamatan	540
7509	95.02.16	Ok Aom	kecamatan	540
7510	95.02.17	Kawor	kecamatan	540
7511	95.02.18	Awinbon	kecamatan	540
7512	95.02.19	Tarup	kecamatan	540
7513	95.02.20	Okhika	kecamatan	540
7514	95.02.21	Oksamol	kecamatan	540
7515	95.02.22	Oklip	kecamatan	540
7516	95.02.23	Okbemtau	kecamatan	540
7517	95.02.24	Oksebang	kecamatan	540
7518	95.02.25	Okbab	kecamatan	540
7519	95.02.26	Batani	kecamatan	540
7520	95.02.27	Weime	kecamatan	540
7521	95.02.28	Murkim	kecamatan	540
7522	95.02.29	Mofinop	kecamatan	540
7523	95.02.30	Jetfa	kecamatan	540
7524	95.02.31	Teiraplu	kecamatan	540
7525	95.02.32	Eipumek	kecamatan	540
7526	95.02.33	Pamek	kecamatan	540
7527	95.02.34	Nongme	kecamatan	540
7528	95.03.01	Kurima	kecamatan	541
7529	95.03.02	Anggruk	kecamatan	541
7530	95.03.03	Ninia	kecamatan	541
7531	95.03.04	Silimo	kecamatan	541
7532	95.03.05	Samenage	kecamatan	541
7533	95.03.06	Nalca	kecamatan	541
7534	95.03.07	Dekai	kecamatan	541
7535	95.03.08	Obio	kecamatan	541
7536	95.03.09	Suru Suru	kecamatan	541
7537	95.03.10	Wusama	kecamatan	541
7538	95.03.11	Amuma	kecamatan	541
7539	95.03.12	Musaik	kecamatan	541
7540	95.03.13	Pasema	kecamatan	541
7541	95.03.14	Hogio	kecamatan	541
7542	95.03.15	Mugi	kecamatan	541
7543	95.03.16	Soba	kecamatan	541
7544	95.03.17	Werima	kecamatan	541
7545	95.03.18	Tangma	kecamatan	541
7546	95.03.19	Ukha	kecamatan	541
7547	95.03.20	Panggema	kecamatan	541
7548	95.03.21	Kosarek	kecamatan	541
7549	95.03.22	Nipsan	kecamatan	541
7550	95.03.23	Ubahak	kecamatan	541
7551	95.03.24	Pronggoli	kecamatan	541
7552	95.03.25	Walma	kecamatan	541
7553	95.03.26	Yahuliambut	kecamatan	541
7554	95.03.27	Hereapini	kecamatan	541
7555	95.03.28	Ubalihi	kecamatan	541
7556	95.03.29	Talambo	kecamatan	541
7557	95.03.30	Puldama	kecamatan	541
7558	95.03.31	Endomen	kecamatan	541
7559	95.03.32	Kona	kecamatan	541
7560	95.03.33	Dirwemna	kecamatan	541
7561	95.03.34	Holuwon	kecamatan	541
7562	95.03.35	Lolat	kecamatan	541
7563	95.03.36	Soloikma	kecamatan	541
7564	95.03.37	Sela	kecamatan	541
7565	95.03.38	Korupun	kecamatan	541
7566	95.03.39	Langda	kecamatan	541
7567	95.03.40	Bomela	kecamatan	541
7568	95.03.41	Suntamon	kecamatan	541
7569	95.03.42	Seradala	kecamatan	541
7570	95.03.43	Sobaham	kecamatan	541
7571	95.03.44	Kabianggama	kecamatan	541
7572	95.03.45	Kwelamdua	kecamatan	541
7573	95.03.46	Kwikma	kecamatan	541
7574	95.03.47	Hilipuk	kecamatan	541
7575	95.03.48	Duram	kecamatan	541
7576	95.03.49	Yogosem	kecamatan	541
7577	95.03.50	Kayo	kecamatan	541
7578	95.03.51	Sumo	kecamatan	541
7579	95.04.01	Karubaga	kecamatan	542
7580	95.04.02	Bokondini	kecamatan	542
7581	95.04.03	Kanggime	kecamatan	542
7582	95.04.04	Kembu	kecamatan	542
7583	95.04.05	Goyage	kecamatan	542
7584	95.04.06	Wunim	kecamatan	542
7585	95.04.07	Wina	kecamatan	542
7586	95.04.08	Umagi	kecamatan	542
7587	95.04.09	Panaga	kecamatan	542
7588	95.04.10	Woniki	kecamatan	542
7589	95.04.11	Kubu	kecamatan	542
7590	95.04.12	Konda/Kondaga	kecamatan	542
7591	95.04.13	Nelawi	kecamatan	542
7592	95.04.14	Kuari	kecamatan	542
7593	95.04.15	Bokoneri	kecamatan	542
7594	95.04.16	Bewani	kecamatan	542
7595	95.04.17	Nabunage	kecamatan	542
7596	95.04.18	Gilubandu	kecamatan	542
7597	95.04.19	Nunggawi	kecamatan	542
7598	95.04.20	Gundagi	kecamatan	542
7599	95.04.21	Numba	kecamatan	542
7600	95.04.22	Timori	kecamatan	542
7601	95.04.23	Dundu	kecamatan	542
7602	95.04.24	Geya	kecamatan	542
7603	95.04.25	Egiam	kecamatan	542
7604	95.04.26	Poganeri	kecamatan	542
7605	95.04.27	Kamboneri	kecamatan	542
7606	95.04.28	Airgaram	kecamatan	542
7607	95.04.29	Wari/Taiyeve II	kecamatan	542
7608	95.04.30	Dow	kecamatan	542
7609	95.04.31	Tagineri	kecamatan	542
7610	95.04.32	Yuneri	kecamatan	542
7611	95.04.33	Wakuwo	kecamatan	542
7612	95.04.34	Gika	kecamatan	542
7613	95.04.35	Telenggeme	kecamatan	542
7614	95.04.36	Anawi	kecamatan	542
7615	95.04.37	Wenam	kecamatan	542
7616	95.04.38	Wugi	kecamatan	542
7617	95.04.39	Danime	kecamatan	542
7618	95.04.40	Tagime	kecamatan	542
7619	95.04.41	Kai	kecamatan	542
7620	95.04.42	Aweku	kecamatan	542
7621	95.04.43	Bogonuk	kecamatan	542
7622	95.04.44	Li Anogomma	kecamatan	542
7623	95.04.45	Biuk	kecamatan	542
7624	95.04.46	Yuko	kecamatan	542
7625	95.05.01	Kobakma	kecamatan	543
7626	95.05.02	Kelila	kecamatan	543
7627	95.05.03	Eragayam	kecamatan	543
7628	95.05.04	Megambilis	kecamatan	543
7629	95.05.05	Ilugwa	kecamatan	543
7630	95.06.01	Elelim	kecamatan	544
7631	95.06.02	Apalapsili	kecamatan	544
7632	95.06.03	Abenaho	kecamatan	544
7633	95.06.04	Benawa	kecamatan	544
7634	95.06.05	Welarek	kecamatan	544
7635	95.07.01	Tiom	kecamatan	545
7636	95.07.02	Pirime	kecamatan	545
7637	95.07.03	Makki	kecamatan	545
7638	95.07.04	Gamelia	kecamatan	545
7639	95.07.05	Dimba	kecamatan	545
7640	95.07.06	Melagineri	kecamatan	545
7641	95.07.07	Balingga	kecamatan	545
7642	95.07.08	Tiomneri	kecamatan	545
7643	95.07.09	Kuyawage	kecamatan	545
7644	95.07.10	Poga	kecamatan	545
7645	95.07.11	Niname	kecamatan	545
7646	95.07.12	Nogi	kecamatan	545
7647	95.07.13	Yiginua	kecamatan	545
7648	95.07.14	Tiom Ollo	kecamatan	545
7649	95.07.15	Yugungwi	kecamatan	545
7650	95.07.16	Mokoni	kecamatan	545
7651	95.07.17	Wereka	kecamatan	545
7652	95.07.18	Milimbo	kecamatan	545
7653	95.07.19	Wiringgambut	kecamatan	545
7654	95.07.20	Gollo	kecamatan	545
7655	95.07.21	Awina	kecamatan	545
7656	95.07.22	Ayumnati	kecamatan	545
7657	95.07.23	Wano Barat	kecamatan	545
7658	95.07.24	Goa Balim	kecamatan	545
7659	95.07.25	Bruwa	kecamatan	545
7660	95.07.26	Balingga Barat	kecamatan	545
7661	95.07.27	Gupura	kecamatan	545
7662	95.07.28	Kolawa	kecamatan	545
7663	95.07.29	Gelok Beam	kecamatan	545
7664	95.07.30	Kuly Lanny	kecamatan	545
7665	95.07.31	Lannyna	kecamatan	545
7666	95.07.32	Karu	kecamatan	545
7667	95.07.33	Yiluk	kecamatan	545
7668	95.07.34	Guna	kecamatan	545
7669	95.07.35	Kelulome	kecamatan	545
7670	95.07.36	Nikogwe	kecamatan	545
7671	95.07.37	Muara	kecamatan	545
7672	95.07.38	Buguk Gona	kecamatan	545
7673	95.07.39	Melagi	kecamatan	545
7674	95.08.01	Kenyam	kecamatan	546
7675	95.08.02	Mapenduma	kecamatan	546
7676	95.08.03	Yigi	kecamatan	546
7677	95.08.04	Wosak	kecamatan	546
7678	95.08.05	Geselma	kecamatan	546
7679	95.08.06	Mugi	kecamatan	546
7680	95.08.07	Mbuwa	kecamatan	546
7681	95.08.08	Gearek	kecamatan	546
7682	95.08.09	Koroptak	kecamatan	546
7683	95.08.10	Kegayem	kecamatan	546
7684	95.08.11	Paro	kecamatan	546
7685	95.08.12	Mebarok	kecamatan	546
7686	95.08.13	Yenggelo	kecamatan	546
7687	95.08.14	Kilmid	kecamatan	546
7688	95.08.15	Alama	kecamatan	546
7689	95.08.16	Yal	kecamatan	546
7690	95.08.17	Mam	kecamatan	546
7691	95.08.18	Dal	kecamatan	546
7692	95.08.19	Nirkuri	kecamatan	546
7693	95.08.20	Inikgal	kecamatan	546
7694	95.08.21	Iniye	kecamatan	546
7695	95.08.22	Mbulmu Yalma	kecamatan	546
7696	95.08.23	Mbua Tengah	kecamatan	546
7697	95.08.24	Embetpen	kecamatan	546
7698	95.08.25	Kora	kecamatan	546
7699	95.08.26	Wusi	kecamatan	546
7700	95.08.27	Pija	kecamatan	546
7701	95.08.28	Moba	kecamatan	546
7702	95.08.29	Wutpaga	kecamatan	546
7703	95.08.30	Nenggeagin	kecamatan	546
7704	95.08.31	Krepkuri	kecamatan	546
7705	95.08.32	Pasir Putih	kecamatan	546
7706	96.01.01	Makbon	kecamatan	547
7707	96.01.02	Beraur	kecamatan	547
7708	96.01.03	Salawati	kecamatan	547
7709	96.01.04	Seget	kecamatan	547
7710	96.01.05	Aimas	kecamatan	547
7711	96.01.06	Klamono	kecamatan	547
7712	96.01.07	Sayosa	kecamatan	547
7713	96.01.08	Segun	kecamatan	547
7714	96.01.09	Mayamuk	kecamatan	547
7715	96.01.10	Salawati Selatan	kecamatan	547
7716	96.01.11	Klabot	kecamatan	547
7717	96.01.12	Klawak	kecamatan	547
7718	96.01.13	Maudus	kecamatan	547
7719	96.01.14	Mariat	kecamatan	547
7720	96.01.15	Klayili	kecamatan	547
7721	96.01.16	Klaso	kecamatan	547
7722	96.01.17	Moisegen	kecamatan	547
7723	96.01.18	Sorong	kecamatan	547
7724	96.01.19	Bagun	kecamatan	547
7725	96.01.20	Wemak	kecamatan	547
7726	96.01.21	Sunook	kecamatan	547
7727	96.01.22	Buk	kecamatan	547
7728	96.01.23	Saengkeduk	kecamatan	547
7729	96.01.24	Malabotom	kecamatan	547
7730	96.01.25	Konhir	kecamatan	547
7731	96.01.26	Klasafet	kecamatan	547
7732	96.01.27	Hobard	kecamatan	547
7733	96.01.28	Salawati Tengah	kecamatan	547
7734	96.01.29	Botain	kecamatan	547
7735	96.01.30	Sayosa Timur	kecamatan	547
7736	96.02.01	Teminabuan	kecamatan	548
7737	96.02.02	Inanwatan	kecamatan	548
7738	96.02.03	Sawiat	kecamatan	548
7739	96.02.04	Kokoda	kecamatan	548
7740	96.02.05	Moswaren	kecamatan	548
7741	96.02.06	Seremuk	kecamatan	548
7742	96.02.07	Wayer	kecamatan	548
7743	96.02.08	Kais	kecamatan	548
7744	96.02.09	Konda	kecamatan	548
7745	96.02.10	Matemani	kecamatan	548
7746	96.02.11	Kokoda Utara	kecamatan	548
7747	96.02.12	Saifi	kecamatan	548
7748	96.02.13	Fokour	kecamatan	548
7749	96.02.14	Salkma	kecamatan	548
7750	96.02.15	Kais Darat	kecamatan	548
7751	96.03.01	Misool (Misool Utara)	kecamatan	549
7752	96.03.02	Waigeo Utara	kecamatan	549
7753	96.03.03	Waigeo Selatan	kecamatan	549
7754	96.03.04	Salawati Utara	kecamatan	549
7755	96.03.05	Ayau	kecamatan	549
7756	96.03.06	Misool Timur	kecamatan	549
7757	96.03.07	Waigeo Barat	kecamatan	549
7758	96.03.08	Waigeo Timur	kecamatan	549
7759	96.03.09	Teluk Mayalibit	kecamatan	549
7760	96.03.10	Kofiau	kecamatan	549
7761	96.03.11	Meos Mansar	kecamatan	549
7762	96.03.12	Misool Selatan	kecamatan	549
7763	96.03.13	Warwarbomi	kecamatan	549
7764	96.03.14	Waigeo Barat Kepulauan	kecamatan	549
7765	96.03.15	Misool Barat	kecamatan	549
7766	96.03.16	Kepulauan Sembilan	kecamatan	549
7767	96.03.17	Kota Waisai	kecamatan	549
7768	96.03.18	Tiplol Mayalibit	kecamatan	549
7769	96.03.19	Batanta Utara	kecamatan	549
7770	96.03.20	Salawati Barat	kecamatan	549
7771	96.03.21	Salawati Tengah	kecamatan	549
7772	96.03.22	Supnin	kecamatan	549
7773	96.03.23	Kepulauan Ayau	kecamatan	549
7774	96.03.24	Batanta Selatan	kecamatan	549
7775	96.04.01	Fef	kecamatan	550
7776	96.04.02	Miyah	kecamatan	550
7777	96.04.03	Yembun	kecamatan	550
7778	96.04.04	Kwoor	kecamatan	550
7779	96.04.05	Sausapor	kecamatan	550
7780	96.04.06	Abun	kecamatan	550
7781	96.04.07	Syujak	kecamatan	550
7782	96.04.08	Moraid	kecamatan	550
7783	96.04.09	Kebar	kecamatan	550
7784	96.04.10	Amberbaken	kecamatan	550
7785	96.04.11	Senopi	kecamatan	550
7786	96.04.12	Mubrani	kecamatan	550
7787	96.04.13	Bikar	kecamatan	550
7788	96.04.14	Bamusbama	kecamatan	550
7789	96.04.15	Ases	kecamatan	550
7790	96.04.16	Miyah Selatan	kecamatan	550
7791	96.04.17	Ireres	kecamatan	550
7792	96.04.18	Tobouw	kecamatan	550
7793	96.04.19	Wilhem Roumbouts	kecamatan	550
7794	96.04.20	Tinggouw	kecamatan	550
7795	96.04.21	Kwesefo	kecamatan	550
7796	96.04.22	Mawabuan	kecamatan	550
7797	96.04.23	Kebar Timur	kecamatan	550
7798	96.04.24	Kebar Selatan	kecamatan	550
7799	96.04.25	Manekar	kecamatan	550
7800	96.04.26	Mpur	kecamatan	550
7801	96.04.27	Amberbaken Barat	kecamatan	550
7802	96.04.28	Kasi	kecamatan	550
7803	96.04.29	Selemkai	kecamatan	550
7804	96.05.01	Aifat	kecamatan	551
7805	96.05.02	Aifat Utara	kecamatan	551
7806	96.05.03	Aifat Timur	kecamatan	551
7807	96.05.04	Aifat Selatan	kecamatan	551
7808	96.05.05	Aitinyo Barat	kecamatan	551
7809	96.05.06	Aitinyo	kecamatan	551
7810	96.05.07	Aitinyo Utara	kecamatan	551
7811	96.05.08	Ayamaru	kecamatan	551
7812	96.05.09	Ayamaru Utara	kecamatan	551
7813	96.05.10	Ayamaru Timur	kecamatan	551
7814	96.05.11	Mare	kecamatan	551
7815	96.05.12	Aifat Timur Tengah	kecamatan	551
7816	96.05.13	Aifat Timur Jauh	kecamatan	551
7817	96.05.14	Aifat Timur Selatan	kecamatan	551
7818	96.05.15	Ayamaru Selatan	kecamatan	551
7819	96.05.16	Ayamaru Jaya	kecamatan	551
7820	96.05.17	Ayamaru Selatan Jaya	kecamatan	551
7821	96.05.18	Ayamaru Timur Selatan	kecamatan	551
7822	96.05.19	Ayamaru Utara Timur	kecamatan	551
7823	96.05.20	Ayamaru Tengah	kecamatan	551
7824	96.05.21	Ayamaru Barat	kecamatan	551
7825	96.05.22	Aitinyo Tengah	kecamatan	551
7826	96.05.23	Aitinyo Raya	kecamatan	551
7827	96.05.24	Mare Selatan	kecamatan	551
7828	96.71.01	Sorong	kecamatan	552
7829	96.71.02	Sorong Timur	kecamatan	552
7830	96.71.03	Sorong Barat	kecamatan	552
7831	96.71.04	Sorong Kepulauan	kecamatan	552
7832	96.71.05	Sorong Utara	kecamatan	552
7833	96.71.06	Sorong Manoi	kecamatan	552
7834	96.71.07	Sorong Kota	kecamatan	552
7835	96.71.08	Klaurung	kecamatan	552
7836	96.71.09	Malaimsimsa	kecamatan	552
7837	96.71.10	Maladum Mes	kecamatan	552
\.


--
-- Name: wilayah_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wilayah_id_seq', 7837, true);


--
-- PostgreSQL database dump complete
--

\unrestrict lWM7vKGXLk7YS6hHF1zktcYzP3b8CdOTwoeQ2NhN0HknPT2t1YHJGqplA9TeZPy

