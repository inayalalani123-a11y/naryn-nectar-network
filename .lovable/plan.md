## Goal
Turn each Learn module from a single paragraph into a guided, multi-step walkthrough with images/diagrams, navigable step-by-step inside the existing module dialog.

## Data model changes (`src/lib/content.ts`)
Extend `Module` with a `steps` array:
```
steps: {
  title: { en; ky }
  body:  { en; ky }
  image: string            // imported asset URL
  imageAlt: { en; ky }
  caption?: { en; ky }
}[]
```
Break each of the 6 modules into 4–6 steps derived from existing body text:
- Getting started → Site survey · Altitude & sun · Windbreak · Water & spacing
- Hive setup → Choose Dadant · Frames & foundation · Stand & placement · Winter insulation
- Seasonal calendar → Spring · Early summer · Main flow · Autumn · Winter prep
- Wintering → Entrance reduction · Ventilation · Cluster sizing · Candy boards
- Honey quality → Harvest timing · Extraction temp · Filtering · Storage · Lab testing
- Selling abroad → Branding · Lab analysis · Certification · Packaging · Shipping

Keep existing `body` field as fallback summary (unused in new UI but non-breaking).

## Visual assets
Generate one image per step (~28 total) with `imagegen` (fast tier, 1024×768 jpg) into `src/assets/learn/{module-id}/{step-index}.jpg`. Style: warm, photographic, Naryn mountain context, matching Mountain Honey palette. Diagram-style steps (e.g., hive spacing, ventilation airflow, cluster sizing) generated as labeled illustration/diagram images rather than photos.

Imports done statically at top of `content.ts` so Vite bundles them.

## UI changes (`src/routes/index.tsx`)
Replace the single-paragraph Dialog content with a stepper:
- Header: module icon + title + "Step X of N" + progress bar (`@/components/ui/progress`)
- Body: large step image (aspect-video, rounded), step title, step body text, optional caption
- Footer: Back / Next buttons; Next becomes "Done" on last step and closes the dialog
- Keep state `stepIndex` inside dialog; reset to 0 when `open` changes
- Keyboard: ← / → arrow keys to navigate
- Mobile: image stacks above text; on desktop two-column layout

Module cards on the landing grid get a small badge "N steps" so users know it's a walkthrough.

## i18n (`src/lib/i18n.tsx`)
Add keys: `learn.step` ("Step"), `learn.of` ("of"), `learn.next`, `learn.back`, `learn.done`, `learn.stepsCount` ("{n} steps") — EN + KY.

## Non-goals
- No changes to Diagnose, Market, Chatbot, or API routes.
- No new dependencies; reuse existing shadcn `Dialog`, `Progress`, `Button`.
- No backend/data persistence — modules remain static content.

## Files touched
- edit `src/lib/content.ts` (model + step data + image imports)
- edit `src/lib/i18n.tsx` (new keys)
- edit `src/routes/index.tsx` (stepper dialog, step-count badge)
- create `src/assets/learn/**/*.jpg` (~28 generated images)
