# Desk & Bench — tasarım ve çalışma kuralları

Bu dosya, siteyi düzenleyen herkes (Uğur, Claude, ChatGPT) için ortak kuraldır.
**Değişikliğe başlamadan önce bu dosyayı oku.** Bir kuralı değiştirmen gerekiyorsa önce bu dosyayı güncelle, sonra kodu.

*For AI assistants: read this whole file before editing. Keep the rules below unless Uğur explicitly asks otherwise, and update this file in the same commit when a rule changes.*

---

## 1. Site ne işe yarar?

- Uğur Çömlekcioğlu'nun kendi işi için geliştirdiği küçük araçların **kataloğu**.
- İki raf var: **Masa** (üretkenlik, masa başı işler) ve **Tezgâh** (laboratuvar araçları).
- Her araç **kendi deposunda** geliştirilir (örn. `ugurlab/task-board`). Bu depo sadece tanıtım ve indirme sayfasıdır; uygulama kodu buraya konmaz.
- Adres: https://ugurlab.github.io/desk-and-bench/ (İngilizce) ve `/tr.html` (Türkçe).

## 2. Dosyalar

| Dosya | Görevi |
| --- | --- |
| `index.html` | İngilizce sayfa (varsayılan dil) |
| `tr.html` | Türkçe sayfa. **index.html ile aynı yapıda** olmalı |
| `style.css` | İki sayfanın ortak ve tek stil dosyası |
| `assets/` | Görseller (WebP). Her araç görseli için `-tr` ve `-en` sürümü, ayrıca 1200 px genişlikte küçük sürümü |
| `task-board.html` | Eski adres için bilgi sayfası, dokunma |
| `sitemap.xml`, `robots.txt` | Arama motorları için; yeni sayfa eklenirse sitemap güncellenir |

## 3. Renkler

`style.css` içindeki `:root` değişkenlerini kullan; HTML içine doğrudan renk yazma.

| Değişken | Değer | Kullanım |
| --- | --- | --- |
| `--bench` | `#e8edea` | Sayfa zemini (laboratuvar tezgâhı grisi) |
| `--paper` | `#ffffff` | Giriş bölümü, kartlar, özellikler bölümü |
| `--ink` | `#15232a` | Ana metin, koyu kutular |
| `--muted` | `#53666c` | İkincil metin |
| `--line` | `#c7d1cd` | Çizgiler ve kenarlıklar |
| `--nitrile` | `#3355d1` | Sadece ana eylem düğmeleri ve adım numaraları |
| `--agar` | `#e5ae45` | Çok az: "hazırlanıyor" noktası ve klavye odak çerçevesi |

- Krem/bej zemin, turuncu-kiremit vurgu ve renk geçişleri (gradient) **kullanılmaz**.
- Görev Panosu bölmelerinin renkleri (`#4a7bd0`, `#2e9e8f`, `#d9a21b`, `#5b9a3c` …) sadece özellik listesindeki sol çizgilerde kullanılır; uygulamanın kendi paletinden gelir.

## 4. Yazı

- Tek yazı tipi ailesi: **Instrument Sans** (Google Fonts, Türkçe karakterleri destekler). Başka yazı tipi ekleme.
- Başlıklar: kalınlık 650, dar genişlik (`font-stretch` %86–90), sıkı harf aralığı.
- Metin: 17 px, satır aralığı 1.6, satır uzunluğu en fazla ~70 karakter.
- **Yapılmayacaklar:** büyük harfle yazılmış etiketler, başlıkta tek bir kelimeyi farklı renk veya italikle vurgulamak, başlıkların üstüne küçük "üst etiket" koymak, düğme ve bağlantı metinlerinin sonuna `→` eklemek, `A · B · C` biçiminde noktalı meta satırları.

## 5. Yerleşim

- İçerik en fazla **1180 px** genişlikte ve **ortalanmış** (`.wrap`). Kenar boşluğu `--gutter`.
- **Simetri kuralı:** Hiçbir öğe (görsel dahil) sayfa genişliğinden dışarı taşmaz; sol ve sağ boşluk eşittir. (Uğur, taşan görseli simetriyi bozduğu için istemedi.)
- Sayfa sırası:
  1. Üst çubuk: marka, menü (Araçlar, Görev Panosu, Hakkında), dil düğmesi
  2. Giriş: büyük başlık, kısa açıklama + indirme düğmeleri, altında aracın **gerçek ekran görüntüsü** (kareli defter zemini üzerinde)
  3. Araçlar: iki raf, **Masa** ve **Tezgâh**
  4. Öne çıkan aracın özellikleri ve numaralı kullanım adımları
  5. Sık sorulanlar (açılır kapanır) ve yanında koyu "Hakkında" kutusu
  6. Alt bilgi
- Numara sadece gerçek sıralı içerikte kullanılır (kullanım adımları gibi).
- Dekoratif animasyon yok. Sadece kullanıcı eylemine yanıt veren küçük geçişler (düğme üzerine gelme, SSS açılması).

## 6. Metin kuralları

- Türkçe ve İngilizce sayfalar **aynı içeriği** taşır. Birinde yapılan değişiklik diğerine de yapılır.
- Düz, kısa, etken cümleler; "sen" diye hitap (Türkçe), cümle düzeninde büyük harf.
- Düğme ne yapacağını söyler: "Görev Panosu'nu indir", "ZIP indir".
- **Sayfada yazan her özellik, ZIP'teki gerçek sürümde olmalı.** Olmayan bir özellik yazılmaz; uygulama değişince sayfa da güncellenir.
- Veri ve gizlilik ifadeleri gerçeği yansıtır: Görev Panosu verileri tarayıcıda tutar, sunucuya göndermez, cihazlar arası eşitleme yoktur.

## 7. Görseller

- Ekran görüntüleri **örnek verilerle** alınır; gerçek kişisel görev, isim, e-posta içermez.
- Biçim WebP. Büyük sürüm 2000 px, küçük sürüm 1200 px genişlik. `width`/`height` ve açıklayıcı `alt` metni zorunlu.
- Türkçe sayfada Türkçe arayüzlü görsel, İngilizce sayfada İngilizce arayüzlü görsel.

## 8. Yeni araç ekleme

1. Aracı kendi deposunda yayınla (`ugurlab/<araç-adı>`), GitHub Pages ve ZIP indirme bağlantısı hazır olsun.
2. `index.html` ve `tr.html` içinde doğru rafa (Masa veya Tezgâh) bir `<article class="tool">` ekle: ad, sürüm, bir-iki cümle açıklama, "ZIP indir" ve "Ayrıntılar" düğmeleri.
3. Tezgâh'a ilk laboratuvar aracı eklenince "İlk laboratuvar aracı hazırlanıyor" kutusunu (`.slot`) kaldır.
4. Gerekirse `assets/` içine örnek verili ekran görüntülerini koy.
5. README'deki araç tablosunu güncelle.

## 9. Çalışma düzeni (birden fazla yardımcı için)

- **Bir iş, bir yardımcı:** Aynı anda iki yardımcı aynı dosyada çalışmaz.
- **Başlamadan önce en son hali al:** `git pull` (veya GitHub'daki son sürümü kontrol et). Başkasının değişikliğini geri alma.
- **Büyük değişiklikler** (tasarım, yeni bölüm) ayrı dalda ve birleştirme isteğiyle (pull request) yapılır; Uğur onaylayınca birleşir. **Küçük düzeltmeler** doğrudan `main`'e gidebilir.
- Kayıt mesajı neyin neden değiştiğini kısaca söyler.
- Göndermeden önce kontrol: 390 px (telefon), 1024 px (tablet) ve 1440 px+ (masaüstü) genişlikte yatay kaydırma olmamalı; iki dil sayfası da açılmalı; bağlantılar çalışmalı.
- Analitik, reklam veya takip kodu **eklenmez**.

## 10. Değişiklik günlüğü

- 2026-11-05: Yeni tasarım (tezgâh paleti, Instrument Sans, gerçek ekran görüntülü giriş, Masa/Tezgâh rafları). Giriş görseli simetri için sayfa genişliğine sığdırıldı. Bu dosya eklendi.
