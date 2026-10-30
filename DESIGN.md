---
name: Dolbundaljai Company
description: Pastel Thai company with a programmatic pixel team and a nested Content Studio
colors:
  bg: "#faf9f6"
  paper: "#fff"
  ink: "#393346"
  muted: "#706779"
  line: "#e8e3eb"
  lilac: "#ede4f8"
  mint: "#deeee5"
  peach: "#fae0d3"
  butter: "#f6efca"
  green: "#27664e"
  purple: "#70508d"
  danger: "#9b3f47"
  focus: "#926fb7"
  company-map: "#e7e3eb"
  company-thought: "#f5f0f8"
  company-thought-ink: "#5d476c"
  company-selection: "#eee5f6"
  company-hover: "#f3edf7"
  pet-strip: "#f4ede0"
  pet-label: "#fff0ce"
  pet-ink: "#6d512a"
  room-reception: "#f1e5d0"
  room-studio: "#e9dff2"
  room-meeting: "#dcece4"
  room-director: "#f3e2dc"
  room-pantry: "#f6eacb"
  room-lounge: "#e4e9f4"
  room-sales: "#f0e2e8"
  room-admin: "#e4eddd"
  room-toilet: "#e0ecee"
typography:
  display:
    fontFamily: "Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "12px"
  brand:
    fontFamily: "Nunito, Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "17px"
    fontWeight: 900
  company-display:
    fontFamily: "Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "clamp(25px, 2.6vw, 36px)"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "-0.02em"
  company-clock:
    fontFamily: "Nunito, Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.65
  inspector-title:
    fontFamily: "Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.5
  character-thought:
    fontFamily: "Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  map-label: "4px"
  entity-label: "5px"
  room-swatch: "7px"
  chip: "6px"
  field: "8px"
  control: "10px"
  card: "12px"
  upload: "14px"
  panel: "16px"
  dialog: "18px"
spacing:
  tight: "8px"
  control: "10px"
  compact: "12px"
  regular: "16px"
  section: "20px"
  panel: "24px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "9px 17px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 17px"
  button-soft:
    backgroundColor: "{colors.lilac}"
    rounded: "{rounded.control}"
    padding: "9px 17px"
  button-danger:
    textColor: "{colors.danger}"
    rounded: "{rounded.control}"
    padding: "9px 17px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.purple}"
    rounded: "{rounded.control}"
    padding: "11px 13px"
  status:
    rounded: "{rounded.chip}"
    padding: "3px 8px"
  surface:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  roster:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "14px 10px"
  upload:
    rounded: "{rounded.upload}"
    padding: "32px"
  company-inspector:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.upload}"
    padding: "21px 18px"
  character-thought:
    backgroundColor: "{colors.company-thought}"
    textColor: "{colors.company-thought-ink}"
    typography: "{typography.character-thought}"
    rounded: "{rounded.control}"
    padding: "14px"
  company-person-selected:
    backgroundColor: "{colors.company-selection}"
    textColor: "{colors.ink}"
    padding: "17px 10px"
  pet-label:
    backgroundColor: "{colors.pet-label}"
    textColor: "{colors.pet-ink}"
    rounded: "{rounded.entity-label}"
    padding: "1px 5px"
---

# Design System: Dolbundaljai Company

## Overview

**Creative North Star: "A little company with a lot of heart"**

Pastel lilac, mint, butter and peach make Dolbundaljai feel cute and playful. Aubergine text, white paper surfaces and deep green actions keep a Thai working interface readable. The signature pixel world now spans a nine-room company, five employees and three named pets, all drawn programmatically on canvas.

Content Studio remains the company's intake, planning and manual review workspace, with central persistence when configured. Company life uses real Asia/Bangkok time with explicitly simulated routines, authored thoughts and interactions. Provider orchestration and video rendering remain unconnected; character movement never represents production progress.

**Key Characteristics:**
- Readable Thai controls around a crisp, explorable pixel company.
- Soft flat panels, compact labels and restrained structural depth.
- Semantic room and character controls with a contextual inspector.
- Real inputs, explicit waiting states and approval tied to a revision.

Sources: `src/style.css`, `src/company.css`, `src/company.js`, `src/company-art.js`, `src/company-model.js`, `src/office.js`, `src/app.js`, `src/auth.js` and `src/auth.css`. The original pixel-company visual world is preserved. This cloud edition adds login, save status, recovery, history and migration controls. Service setup remains pending; local UI fixtures do not prove live Google sign-in.

## Colors

Primary: **Studio Green** (`green`) marks the main action and links; **Role Purple** (`purple`) marks active navigation and role accents. Secondary: **Soft Lilac**, **Quiet Mint**, **Snack Peach** and **Butter** create differentiated, friendly surfaces. Neutral: **Warm Background**, **White Paper**, **Aubergine Ink**, **Muted Plum** and **Fine Lilac Line** keep forms and task lists legible. **Rose Danger** is reserved for destructive or failed states; **Focus Violet** outlines keyboard targets.

**The Truthful State Rule.** Color reinforces a written state; it never substitutes for the status label or implies live AI execution.

The company adds **Map Lilac** behind the floor plan, **Thought Lilac** and **Thought Plum** for authored thought cards, **Selected Lilac** and **Hover Lilac** for the people and pet directory, and **Pet Sand**, **Pet Butter** and **Pet Umber** for the pet strip and name labels. These extracted tokens describe literals in `src/company.css`; they are not new CSS custom properties.

Room color tokens map reception to warm sand, Content Studio to lilac, meeting to mint, director to peach, pantry to butter, lounge to periwinkle, sales/customer service to rose, HR/accounting to sage and the bathroom to pale blue. Each floor color also supplies the corresponding inspector swatch. They identify places, not production status. The remaining furniture, skin, clothing and pet sprite colors stay in `src/company-art.js` and `src/office.js`; avoid promoting every pixel color into a UI token.

## Typography

Noto Sans Thai with Tahoma and sans-serif fallbacks carries the interface. Nunito adds rounded character to the Latin brand and task numerals. Fonts are requested from Google Fonts; fallbacks keep the workspace usable when they are unavailable.

Studio headings keep the incumbent display token and drop to 25px below 650px. The company heading uses the separate fluid company-display token and resolves to 25px at the mobile breakpoint. Section headings range from 16–19px; the inspector title uses its 23px token. Body copy uses the body token and paragraphs cap at 72ch. Metadata uses 10–12px; map subtitles use 9px with full room names available in the inspector.

The Bangkok clock uses the company-clock token with tabular numerals, reducing to 18px below 650px. Day-plan times use Nunito at 15px and weight 800. Thought copy uses the character-thought token. The company canvas signs use bold Nunito at 10px and 13px. Keep Thai reading copy in the normal sans-serif face.

## Layout

The shared shell retains its 218px sticky navigation rail and flexible workspace, capped at 1500px with 34px horizontal padding. The company map and inspector share a grid with a 20px gap and 260px inspector. At widths of at least 1600px, company content can reach 1750px and the inspector grows to 290px. At 1399px and below, the inspector sits below the map; selecting a room or character brings it into view.

The company canvas is 1120 × 680. Its displayed floor has a 760px minimum width, so narrow screens scroll inside the map rather than shrinking every label and sprite. Zoom makes the floor 1400px wide. Room labels and entity buttons are positioned over the canvas; a text hint below 850px explains horizontal scrolling and the directory alternative. The five-person directory becomes three columns at 1399px and two at 650px. The three-pet strip becomes one column at 650px. The day plan and journal use two columns until 650px, then stack; day-plan entries retain three columns.

At 1180px the shared rail becomes 185px, workspace padding becomes 24px, clip columns become four, and product/settings panels stack. At 850px the rail becomes a static top section with wrapping navigation. At 650px workspace gutters become 16px, heading actions move below titles, Content Studio detail layouts stack, its roster becomes three columns and its clip strip becomes two. Review media moves above the editor. The company controls wrap, the inspector padding becomes 17px, and inspector action buttons reach a 42px minimum height.

The nested Content Studio keeps its preparation, five-role roster, seven-clip plan, product and media inputs, manual review and publication-link workflow. The original single-room office composition is superseded by the company map; retained legacy office CSS is not the current landing-page layout.

Spacing is a practical compact scale, not a rigid baseline grid. Use the extracted spacing primitives for common gaps and panel rhythm; preserve the more specific dimensions in the component source.

## Elevation & Depth

Most surfaces are flat white or pastel with fine borders. Depth is reserved for active navigation, floating feedback and dialogs. The shared toast shadow is `0 12px 35px #3b214513`; active navigation uses `0 3px 10px #3d294506`; dialogs use `0 20px 70px #2a173c35` over a `#33243f55` backdrop. The company creates depth through pixel walls, furniture, floor tones and small actor shadows, not photographic effects. Its map, inspector and directory introduce no additional CSS elevation layer.

## Shapes

Use softly rounded controls and panels from the extracted radius scale. Chips are gently rectangular rather than full pills. Inputs and tabs are tighter than cards; dialogs are the softest enclosure. Icons are inline outline SVGs, generally 20px with 1.7px strokes. Pixel room geometry stays crisp, with canvas smoothing disabled and CSS `image-rendering: pixelated`. The company map and inspector reuse the 14px upload radius; room buttons, name labels and swatches use their smaller extracted corner tokens. Entity hit areas are 44 × 51px, with text labels offset below the sprite.

## Components

- **Buttons:** green primary, bordered white secondary, lilac soft and rose danger variants. Standard minimum height is 42px; tiny variants are 32px. Focus uses a 3px violet outline with 3px offset. Disabled controls visibly soften and retain an explanatory blocking reason nearby.
- **Fields:** persistent Thai labels, white fill, fine border, vertical textarea resizing and green carets. Save actions are explicit; unsaved edits block approval.
- **Navigation:** icon plus text, white selected surface and purple selected label. Mobile navigation wraps without hiding destination names.
- **Status chips:** warm waiting, lilac review, green approved/published. Always include readable text; dots are supplementary.
- **Surface and roster cards:** flat white with a fine border. The Content Studio roster retains native role dialogs. Company people and pet directory buttons select the same contextual inspector as map pins, expose selected state with `aria-pressed`, and use the new selected/hover lilacs.
- **Upload zone:** dashed lilac border, gentle hover change and a visible focus-within outline. Explain supported input instead of presenting an empty ornamental drop area.
- **Company map:** nine labelled rooms linked by a corridor, rendered on a 1120 × 680 canvas with semantic room buttons and separate employee/pet pins. The rooms are reception, Content Studio, meeting, director, pantry, staff lounge, sales/customer service, HR/accounting and bathroom. Future departments remain visibly reserved spaces. Pause and zoom controls have pressed states; the scrollable map remains keyboard focusable.
- **Contextual inspector:** flat bordered white panel with sprite or room swatch, title, written status, location and a lilac authored-thought card. Employees support greeting, a five-minute break, a ten-minute meeting, a three-minute bathroom visit, return to schedule and optional daily overtime. Actual production status and the route into Content Studio remain distinct from these simulated actions.
- **Three pets:** orange cat ส้มจ๋วย, light-brown Pomeranian โตโน่ and black Chihuahua อาดัม with yellow brows and legs. Each independently roams or rests, with pet, play, rest and release actions. Their warm label colors distinguish pets without replacing names or species text. Both map and avatar sprites are programmatic; no shipping raster decoration is used.
- **Company time:** the live clock and weekday schedule use Asia/Bangkok. Arrival starts at 08:30, lunch at noon and departure at 17:30; optional daily overtime runs 18:00–20:00. Weekend staff are off. Recent activity entries and overtime preferences are centrally saved when the owner interacts; the simulation does not mutate studio tasks or approvals.
- **Review:** imported real video, manual checklist, revision-aware approval and manual publication links. Provider and rendering controls remain visibly unconnected; central save states and backup exclusions remain explicit.

Roster hover transitions last 160ms; toast transitions last 200ms. Reduced-motion mode disables CSS animation and transitions and starts company movement paused. The pause control stops movement and autonomous pet roaming while the clock and scheduled text still update. Users can explicitly resume movement. The animation suspends when the document is hidden and resynchronizes on return. These routines run while the browser page is open; there is no background company service. Do not add looping motion to actual task states.

## Do's and Don'ts

- Do preserve the pastel, cute, playful virtual office chosen by the user.
- Do pair every canvas character interaction with a semantic directory button and give rooms readable button labels.
- Do retain visible keyboard focus, wrapping mobile navigation, local map scrolling and reduced-motion behavior.
- Do use uploaded media and verified product facts for review; label missing inputs and disconnected services.

- Don't ship raster decoration for the company; keep its rooms and sprites programmatic.
- Don't animate progress or show completed AI work without a connected service and real result.
- Don't present simulated thoughts, future departments or company interactions as operating AI teams.
- Don't use pixel type for Thai forms or long explanatory copy.
- Don't let pastel decoration replace the dark, readable text and action colors.


## Cloud entry and save feedback

The login page expands the same pixel world with a quiet reception vignette and the three existing pet sprites. It is not a replacement brand. At wide widths the vignette and copy sit side by side; below 700px they stack. Heading uses 28–38px fluid type, reading copy 16px and supporting copy 13–14px. Decorative sign text uses 11–14px. There is one primary Google action; when configuration is absent it is disabled with an explicit explanation. Loading, denied access and connection errors share the same layout. Recovery provides separate restore, export and discard choices.

Intentional illustration colors in `auth.css`: wall `#eee6f5`, frame `#d7c4e8`, window frame `#d2b6d6`, glass `#c7e7ec` on `#e5f0ec`, sign `#fff7de` with `#debfa3` frame and `#5d4f4b` text, floorboards `#e8cbae` and `#d7b89b`. These are scene materials, not status colors. The floor stripes represent floorboards inside the literal pixel-room canvas.

Save feedback uses `#f4f8f3` for normal status and `#fff0df` for failure/conflict; all meaning is stated in Thai. Imports use a `#7f668d` focus outline. The status bar exposes retry only for recoverable saves, export/reload for conflict, and never describes unacknowledged work as saved. Immutable history exports are in the existing native dialog shell with pagination. Media previews hydrate from authenticated private downloads; unloaded image elements stay hidden until a blob is ready.

Local verification: login rendered at 840px, desktop 1440px (scaled iframe) and mobile 390px. A clearly labelled temporary fixture verified offline failure, retry success and conflict without a live backend. Fixture pages are removed from source after testing. Manual detector found advisory palette/type additions documented above and the dynamic media preview; the latter is hidden until hydration and has a visible failure replacement. Live authentication and Storage acceptance remain pending service setup.

## Member and visitor entry

The welcome page pairs the primary Google sign-in action with a secondary “รับชมบริษัท” button. Members see their server-assigned owner/director role and logout in the existing toolbar. Visitors see a compact brand header, “ผู้เยี่ยมชม · ดูอย่างเดียว” badge, and Google login or logout. The office map, schedule and status inspector remain available; character commands and studio navigation are omitted. Public copy explicitly distinguishes the local office simulation from private work. The viewer header wraps below 700px, and the map retains local horizontal scrolling.

Viewer brand uses the existing 22px heading size; the visitor badge uses the existing lilac `#eee6f5` and dark `#594866` palette. Desktop and 390px mobile checks show wrapping account controls and no page overflow. Detector warnings about the pixel-floor border and hidden media preview are existing, intentional components.

## Profile disclosure

Signed-in members and viewers open an account disclosure from the top-right “โปรไฟล์” control. The panel displays the Google display name, email and database-assigned role, followed by logout. Use the existing pastel palette, 44px controls, 14px panel radius and shared soft shadow. Native details/summary supports keyboard activation; outside click, focus leaving and Escape dismiss it. Escape restores focus to the trigger. Guests retain the Google login action. The save toolbar contains only save feedback and recovery actions.
