# Google Stitch prompt pack: AedesCapella operator dashboard

**Prepared:** 2026-08-11
**Design language source:** PioneerDev.ai design system (https://pioneerdev.ai/design/)
**Deviation from source:** the blue accent family is replaced by AedesCapella orange.
Everything else about the language is retained: the ring-inset rule, the opacity
text ladder, the radius scale, the dotted link underline, the two-layer card
depth, and the numbered section plates.

## How to use this file

Stitch works best when a stable design contract is given once and screens are
then requested one at a time against it.

1. Paste **Part A** as the first message in a new Stitch project. That is the
   design system.
2. Then paste **one** screen prompt from **Part B** per generation. Do not paste
   all six at once; Stitch dilutes detail across screens.
3. **Part C** lists sample data to paste when Stitch asks for content, so the
   mockups do not fill with invented mosquito counts.

---

## Part A: the design system prompt

> Copy everything in this block into Stitch as the opening message.

You are designing a professional operator dashboard for AedesCapella, a
mosquito surveillance and misting system deployed in barangays in Batangas,
Philippines. It is an instrument readout for field operators, not a consumer
app and not a marketing site. Design it the way a laboratory instrument or an
aviation console is designed: dense, calm, precise, and honest about
uncertainty.

### Visual atmosphere

**Light mode only. Do not design, offer, or include a dark variant, and do not
put a theme toggle anywhere in the interface.**

A warm paper canvas with a single amber accent and cool slate text. Density is
high (8 of 10), because
operators scan many rows and numbers at once. Layout variance is moderate (5 of
10): asymmetric where it aids scanning, never decorative. Motion is restrained
(3 of 10): this is a monitoring surface, and animation that draws the eye away
from a status change is a defect.

### Color palette and roles

Backgrounds:

- **Warm Paper** `#FBF7F1`: page canvas
- **Pure Surface** `#FFFFFF`: cards, panels, sidebar
- **Sand Raised** `#F1E9DD`: nested panels, table header rows, hover fills

Text hierarchy is expressed by opacity of a single near-black ink, never by
different hues:

- **Primary text and headings**: `rgba(28, 25, 23, 1.0)`
- **Secondary text and descriptions**: `rgba(28, 25, 23, 0.72)`
- **Muted captions, metadata, units**: `rgba(28, 25, 23, 0.42)`

Accent family, warm amber. This replaces the blue accent of the source system
and is the only brand accent. Note that a light canvas needs two accent
strengths: a mid tone for fills and rings, and a deeper tone wherever the
accent carries text, because the mid tone does not reach 4.5:1 on white:

- **Ember** `#E9A24C`: accent fills, active navigation background, focus rings,
  chart series, large display figures
- **Ember Deep** `#A9670F`: accent **text** and links, and any accent-coloured
  label below 18px. Reaches 4.5:1 on white.
- **Ember Hover** `#C77F1C`: hover foreground for accent text
- **Ember Dim** `rgba(233, 162, 76, 0.10)`: accent-tinted panel fills
- **Ember Glow** `rgba(233, 162, 76, 0.18)`: soft emphasis wash
- **Ember Border** `rgba(169, 103, 15, 0.32)`
- **Ember Border Hover** `rgba(169, 103, 15, 0.55)`

Borders, dark ink at low alpha so they read on paper:

- **Hairline** `rgba(28, 25, 23, 0.12)`
- **Hairline Strong** `rgba(28, 25, 23, 0.24)`

Status colors are functional, not decorative. They are the only colors besides
the accent, and each carries a fixed meaning that must never be reassigned.
Each has a saturated **fill** for badge and marker backgrounds, a **text** tone
that meets 4.5:1 on white, and a **tint** for soft backgrounds:

- **Signal Green**, sensor online, relay stopped cleanly, log healthy.
  fill `#16A34A`, text `#15803D`, tint `#DCFCE7`
- **Caution Amber**, possible match, time not confirmed, stale sensor.
  fill `#F59E0B`, text `#B45309`, tint `#FEF3C7`
- **Alert Red**, relay activation recorded, request rejected, logging fault.
  fill `#DC2626`, text `#B91C1C`, tint `#FEE2E2`
- **Neutral Slate**, test-only and non-operator rows.
  fill `#78716C`, text `#57534E`, tint `#F5F5F4`

Never place status text directly on a saturated fill at small sizes; use the
tint as the background and the text tone for the label.

Do not introduce a fifth status color. Do not use the accent to indicate status.

### Typography

- **Display and headings: Outfit.** Weights 700 and 800. Section headings 2rem,
  sub-headings 1.375rem, both tracked tight. Hierarchy comes from weight and
  the opacity ladder, not from enormous size.
- **Body and interface text: Outfit.** Weight 400 and 500, relaxed leading,
  maximum 65 characters per line for prose.
- **All numerals, timestamps, identifiers, and units: IBM Plex Mono.** This is
  mandatory. Every reading, count, RSSI value, uptime, boot number, ordinal,
  and coordinate is monospace so columns align and digits do not jitter as
  values update.
- **Overline labels: Outfit, 0.7rem, letter-spacing 0.18em, uppercase**, used
  above section titles and metric names.
- The wordmark "AedesCapella" is the only place a third family appears; set it
  in Syne ExtraBold.

Never use Inter. Never use a serif anywhere in this product.

### Shape, ring, and depth

- Radius scale: **12px** for buttons, tags, and badges; **16px** for cards,
  inputs, and panels; **24px** for modals and drawers; full pill for chips.
- **The ring-inset rule is the signature of this system.** Interactive
  components and cards are outlined with an inset ring, `box-shadow: inset 0 0
  0 1px`, never with a `border` property. Adjacent cards in a grid must not
  produce doubled 2px seams.
- Cards carry a ring plus a two-layer depth shadow. A flat 1px border alone is
  never acceptable on a card.
- Links use a **dotted bottom border**, not `text-decoration: underline`.

### Section plates

Each major section is introduced by a plate in the manner of a technical
figure: a 1px dashed edge, 2px solid corner brackets, a faint 16px grid
texture, and a monospace corner label reading `FIG.01`, `FIG.02`, and so on.
This suits a scientific instrument and should be used for the five main
dashboard sections.

### Components

- **Buttons**, six variants: primary (solid amber), secondary (surface tinted),
  ghost (transparent with ring), subtle (no ring, muted until hover), danger
  (red tinted fill with ring), and disabled at 40 percent opacity with pointer
  events removed. Tactile 1px downward translate on press. No outer glow.
- **Badges**, six variants at two sizes: default, accent, success, warning,
  danger, and outline. Used for event kinds and device states.
- **Inputs**: label above the field, optional helper text below, error text
  below in Alert Red, icon slots on the left and right. Focus ring in Ember.
- **Metric cards**: a large monospace figure, an overline label above, an
  optional delta chip, and a qualifying caption below in muted text. The
  caption is required on this product, see the language contract.
- **Alerts**, four variants with an optional title: informational, success,
  warning, and error.
- **Tables**: dense rows, raised header row, monospace for every numeric and
  identifier column, status badge in the leftmost or rightmost column,
  hairline row separators rather than full grid lines.
- **Loading**: skeleton blocks matching the exact final layout dimensions.
  Never a centered circular spinner on a data region.
- **Empty states**: a composed panel explaining what will appear and what is
  being read, for example "Reading saved relay events", not the bare words
  "No data".

### Layout

- Persistent left sidebar with the wordmark, five navigation items, a sensor
  status roll-up, and theme and sign-out controls at the foot.
- A top strip of live metrics spanning the content column, followed by the
  active section.
- CSS Grid throughout. Contain the content column to a maximum width of
  1400px. Generous internal padding, tight external rhythm.
- The metric strip is a **bento grid with unequal spans**, not four identical
  cards in a row. The most operationally important figure occupies a wider
  cell.
- Below 768px every multi-column region collapses to a single column. No
  horizontal scrolling of the page at any width. Wide tables scroll inside
  their own container. All tap targets at least 44px.

### Motion

- Spring physics, stiffness 100 and damping 20, for anything that moves.
- Animate only `transform` and `opacity`.
- One perpetual micro-loop is permitted and only one: a slow pulse on the live
  connection indicator. Nothing else loops.
- New rows entering a live table fade and rise 4px, staggered by 30ms, and then
  stop. Do not animate values that are merely refreshing.

### Language contract, mandatory

This system infers possible mosquito activity from audio and triggers a mister.
It cannot confirm a biological detection and it cannot prove that fluid was
delivered. Copy that overstates either would be scientifically false. These are
hard rules.

- Never write "detected", "confirmed", "mosquitoes found", "infestation", or
  any phrase asserting a verified biological detection.
- A model or temporal acceptance is a **"possible match"** or a **"candidate"**.
- A relay firing is a **"relay activation recorded"**, and any card reporting it
  carries the qualifier **"Recorded event, delivery not proven"**.
- An event whose wall-clock time could not be resolved is labelled **"Time not
  confirmed"**, never given a fabricated timestamp.
- Candidate figures carry the caption **"Please review before action"**.
- Use the exact vocabulary in Part C for event names and device states.
- No emojis anywhere in the interface.

### Banned

No emojis. No Inter. No serif. No pure black `#000000`. No neon or outer glow
shadows. No purple. No gradient text on headings. No custom cursors. No
overlapping elements. No three equal cards in a row. No placeholder names such
as "John Doe" or "Acme". No invented round figures such as "99.9% accuracy". No
marketing verbs such as "elevate", "seamless", "unleash", or "next-gen". No
"scroll to explore", scroll arrows, or bouncing chevrons.

---

## Part B: screen prompts

Paste one at a time, after Part A.

### B1. Latest Sensor Activity, the default screen

Design the primary operator screen, `FIG.01 Latest Sensor Activity`.

Left sidebar: the AedesCapella wordmark with a small amber insect glyph in a
rounded tile; navigation items Latest Sensor Activity, Barangay Map, Relay
History, Sensor Status, Activity Summary, with the first active and marked by
an amber inset ring and Ember Dim fill; a compact sensor roll-up showing how
many sensors are online; sign out at the foot. There is no theme toggle.

Top metric strip as a bento grid of four unequal cells: Candidates in the last
24 hours, Relay activations in the last 24 hours, Sensors online shown as a
ratio, and Average candidate score as a percentage. Beside them, a Philippine
time clock and a connection chip reading Live in Signal Green with a slow
pulse, with Reconnecting and Polling fallback as its other states.

Quick summary panel of four metric cards: "Meaningful activities shown" with
the caption "148 shown from the last 24 hours", "Possible matches" captioned
"Please review before action", "Relay activations" captioned "Recorded event,
delivery not proven", and "Time not confirmed" captioned with the latest
timestamp. Every figure in IBM Plex Mono.

Below, a dense activity table with columns: time, sensor, barangay, event, the
three model probabilities, and time quality. The event column uses badges from
the vocabulary in Part C. Rows where time quality is unresolved show a Caution
Amber "Time not confirmed" badge instead of a timestamp.

### B2. Barangay Map

Design `FIG.02 Barangay Map`. A light map panel occupying roughly two thirds of
the width, using a pale desaturated base map so the status-coloured markers
remain the most saturated thing on screen, beside a location
activity panel listing barangays with their candidate and relay counts for the
last 24 hours. Include an explicit empty state for unmapped devices reading
"Coordinates required from an authorized source". Do not invent coordinates for
devices that lack them; show them in a separate unmapped list.

### B3. Relay History

Design `FIG.03 Relay History`, titled "Recorded Relay History". Summary cards
across the top for episodes recorded, episodes rejected, and average duration
in seconds. An hourly bar chart of relay episodes. Then a table of relay
episodes with columns: requested, started, stopped, duration in seconds, sensor,
barangay, status, and rejection reason. Status badges are requested, started,
stopped, rejected, and cooldown complete. A persistent caption on the section
reads "A saved relay event does not prove physical fluid delivery."

### B4. Sensor Status

Design `FIG.04 Sensor Status`. A grid of sensor cards, each showing the device
label, an operational state badge, signal strength with a small bar meter,
heartbeat age, time running, free heap, C3 boot and ordinal as a monospace
pair, relay-safe state, and counts of misting events and candidates over seven
days. Include a "Device state legend" panel explaining online, stale, offline,
never seen, and logging fault. Cards needing attention carry an Alert Red inset
ring rather than a coloured background.

### B5. Activity Summary

Design `FIG.05 Activity Summary`. Metric cards for the period, a detection
trend line chart over time, and distribution charts for candidate scores. All
axes and tick labels in IBM Plex Mono at muted opacity. Charts use Ember for
the primary series and the status colours only where they carry their fixed
meaning. Include the empty states "No candidates in this period" and "No
candidate scores yet" as composed panels.

### B6. Sign in

Design the sign-in screen. Asymmetric split: a left panel with the wordmark, a
one-line description of the system, and a faint dashed technical grid texture;
a right panel with the email and password form. One primary button. No social
sign-in, no "remember me" decoration. Include the error state "This field is
required" below a field in Alert Red.

---

## Part C: content vocabulary and sample data

Paste this when Stitch asks for content, so it does not invent counts or
rename events.

**Navigation:** Latest Sensor Activity, Barangay Map, Relay History, Sensor
Status, Activity Summary.

**Event names, use verbatim:** Sensor started, Test candidate checked, Possible
mosquito match, Relay requested, Relay activation recorded, Relay stop
recorded, Relay request rejected, Cooldown completed, Other sensor activity.

**Device states:** online, stale, offline, never seen, logging fault. Plus the
flags Time confirmed, Time not confirmed, and Needs attention.

**Connection states:** Live, Reconnecting, Polling fallback.

**Sample sensors:** AC-01 Sabang, AC-02 Marawoy, AC-03 Antipolo del Norte,
AC-04 Bugtong na Pulo.

**Sample readings, realistic and deliberately not round:** RSSI -59 dBm, -62
dBm, -47 dBm. Uptime 1h 51m. Free heap 148,392 bytes. C3 boot 695, ordinal 841.
Candidate score 45.9 percent. Relay duration 5.0 s. Cooldown 120 s.

**Sample summary figures:** Meaningful activities shown 148, Possible matches
24, Relay activations 24, Time not confirmed 106.

**Timestamps:** Philippine time, 24-hour, `11 Aug 2026 14:20:51`.

---

## Notes on the adaptation

Three deliberate departures from a literal reading of the source system, each
made because this is an operator instrument rather than a marketing site.

1. **The accent is desaturated, and split in two.** The existing product orange
   is `#ff9d00` at full saturation, which in an accent role reads as an alert
   rather than as brand. `#E9A24C` keeps the orange identity at a calmer
   chroma. Because the canvas is paper rather than near-black, a second and
   deeper tone `#A9670F` is required wherever the accent carries text, since
   the mid tone does not reach 4.5:1 against white. The vivid `#F59E0B` is
   retained, but only as the Caution Amber status fill.

   The source system is dark-first and expresses its accent as a soft tint that
   glows. On a light canvas that effect is unavailable, so the accent earns its
   prominence through saturation contrast against muted paper instead.

2. **Status colours are exempt from the single-accent rule.** In a surveillance
   and actuation dashboard, green, amber, and red carry fixed operational
   meaning. Collapsing them into one accent would remove information.

3. **The hero and inline-image typography rules are dropped.** They belong to
   marketing pages. This product has no hero; its first impression is the
   metric strip.

One item to decide before generating: the source system's display face is
Gilroy, which is commercial and not available in Stitch. Outfit is the closest
freely available geometric with a comparable extrabold. Syne, already in the
product, is retained for the wordmark so brand continuity survives the change.
