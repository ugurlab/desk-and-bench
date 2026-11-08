# Desk & Bench — design and working rules

These are the shared rules for everyone who edits the site and the tools (Ugur, Claude, ChatGPT).
**Read this whole file before you start a change.** If a rule needs to change, update this file in the same commit as the code.

Keep the rules below unless Ugur explicitly asks otherwise.

---

## 1. Purpose

- A **catalogue** of small tools that Ugur Comlekcioglu builds for his own work.
- Two shelves: **Desk** (productivity, everyday work) and **Bench** (laboratory tools).
- Each tool is developed **in its own repository** (for example `ugurlab/task-board`). This repository is only the catalogue; no application code goes here.
- Each tool has **its own page** in its own repository (`ugurlab/<tool>/index.html`) and uses this repository's stylesheet: `<link rel="stylesheet" href="/desk-and-bench/style.css">`, so every page shares one design.
- Address: https://ugurlab.github.io/desk-and-bench/

## 2. Language

- **Everything is in English only:** the catalogue, the tool pages, the apps themselves, READMEs, commit messages and this file.
- There is **no language switch** and no translated pages (`tr.html` or similar). Do not add one.
- Users' own data may contain any language. Search in the apps must still work for non-English characters (for example, `izmir` finds `İzmir`).

## 3. Files

| File | Purpose |
| --- | --- |
| `index.html` | The catalogue page |
| `style.css` | The single shared stylesheet for the catalogue **and all tool pages**. A change here also affects the tool pages; check them too |
| `task-board.html` | Notice for an old address that links to the Task Board page. Leave it as is |
| `sitemap.xml`, `robots.txt` | For search engines; update the sitemap when a page is added |

## 4. Colours

Use the `:root` variables in `style.css`; do not write colours directly into HTML.

| Variable | Value | Use |
| --- | --- | --- |
| `--bench` | `#e8edea` | Page background (lab bench grey) |
| `--paper` | `#ffffff` | Hero, cards, feature section |
| `--ink` | `#15232a` | Main text, dark boxes |
| `--muted` | `#53666c` | Secondary text |
| `--line` | `#c7d1cd` | Rules and borders |
| `--nitrile` | `#3355d1` | Primary action buttons and step numbers only |
| `--agar` | `#e5ae45` | Sparingly: highlights and the keyboard focus ring |

- **Do not use** a cream/beige background, an orange-terracotta accent or gradients.
- A tool page may use the tool's own colours for the left rules of its feature list (Task Board uses its section colours).

## 5. Type

- One family: **Instrument Sans** (Google Fonts). Do not add other typefaces.
- Headings: weight 650, narrow width (`font-stretch` 86–90%), tight letter spacing.
- Body: 17 px, line height 1.6, lines no longer than about 70 characters.
- **Avoid:** all-caps labels, highlighting one word of a heading in another colour or italics, small "eyebrow" labels above headings, `→` at the end of button or link text, meta lines written as `A · B · C`.

## 6. Layout

- Content is at most **1180 px** wide and **centred** (`.wrap`), with the `--gutter` side margin.
- **Symmetry rule:** nothing (images included) extends beyond the page width; left and right margins are equal. (Ugur rejected an image that bled off the edge.)
- **Catalogue page order** — kept simple, no tool details:
  1. Top bar: brand and menu (Tools, About)
  2. A **two-line** headline on the grid-paper background, directly followed by the **Desk** and **Bench** shelves. Each tool card has a small preview image, name, version, one or two sentences, "Download ZIP" and "Details"
  3. "About these tools" (free, no installation, no tracking) beside a dark "About" box
  4. Footer
- No paragraph under the headline (Ugur did not want one).
- **Tool page order** (for example Task Board): top bar (Features, How to use, Questions) → "Back to Desk & Bench tools" link, tool name, short description, download button → large real screenshot → "What it does" and numbered usage steps → questions about that tool beside a feedback box → footer.
- Questions about a tool live on the tool page, not on the catalogue.
- Use numbers only for real sequences (such as usage steps).
- No decorative animation. Only small transitions that respond to the user (button hover, opening a question).

## 7. Writing

- Plain, short, active sentences; address the reader as "you"; sentence case.
- Buttons say what they do: "Download Task Board", "Download ZIP".
- **Every feature written on a page must exist in the version inside the ZIP.** Do not describe features that do not exist; when an app changes, update its page.
- Data and privacy statements must be true: the apps keep data in the browser, send nothing to a server and do not sync between devices.

## 8. Images

- Screenshots are taken with **sample data**; no real personal tasks, names or e-mail addresses.
- Take app screenshots in a window about 1440 px wide so the app fills the frame and stays readable in the small catalogue preview.
- WebP format. Large version 2000 px wide, small version 1200 px wide. `width`/`height` and a descriptive `alt` text are required.
- Images live in the **tool's own repository** under `assets/` (for example `ugurlab/task-board/assets/board-en.webp`). The catalogue card uses the small version through `/task-board/assets/...`.

## 9. Adding a new tool

1. Publish the tool in its own repository (`ugurlab/<tool-name>`) with GitHub Pages and a ZIP download.
2. Build its `index.html` page in that repository, using the Task Board page as the model and the shared `style.css`.
3. In the catalogue `index.html`, add an `<article class="tool">` to the right shelf (Desk or Bench): preview image, name, version, one or two sentences, "Download ZIP" and "Details" buttons.
4. Update the tool table in the README.

## 10. Working together (several assistants)

- **One task, one assistant:** two assistants never work on the same files at the same time.
- **Get the latest version first:** `git pull` (or check the latest version on GitHub). Never undo someone else's change.
- **Large changes** (design, new sections) go on a separate branch with a pull request and are merged after Ugur approves. **Small fixes** and **changes Ugur has explicitly described** may go straight to `main`.
- When a change affects two repositories, push the tool repository (images) first, then the catalogue.
- Commit messages say briefly what changed and why.
- Check before pushing: no horizontal scrolling at 390 px (phone), 1024 px (tablet) and 1440 px+ (desktop); links work.
- **No** analytics, advertising or tracking code.

## 11. Change log

- 2026-11-08: Everything switched to **English only**: Turkish pages, screenshots and in-app language switches removed from all three repositories. Culture Collection 1.1: accent- and dotted-i-insensitive search, wider stock search, deleting cultures and vials, warning for an occupied position, six-month reminders for old vials and for backups, new screenshots taken at 1440 px.
- 2026-11-07: First lab tool, Culture Collection (`ugurlab/culture-collection`), added to the Bench shelf; the placeholder box was removed. The tool runs offline from a ZIP, keeps data in IndexedDB and covers groups, cultures, multiple stock vials, locations, archive and JSON/CSV. No Firebase or molecular modules in this version.
- 2026-11-05 (2): Catalogue simplified: two-line headline, no paragraph under it, shelves right below the headline, preview image on tool cards. Task Board details, large screenshot and questions moved to the `ugurlab/task-board` page.
- 2026-11-05: New design (bench palette, Instrument Sans, real screenshots, Desk/Bench shelves). Hero image kept within the page width for symmetry. This file added.
