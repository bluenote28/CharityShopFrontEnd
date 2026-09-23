---
name: Charity Shop
description: A blue storefront for finding purchases that benefit charity.
colors:
  deep-royal-ultramarine: "#1406d4"
  ultramarine-pressed: "#0f05a8"
  canvas: "#ffffff"
  quiet-shelf: "#f8f9fa"
  ink: "#0B0B0B"
  body: "#212529"
  secondary-text: "#495057"
  muted: "#6c757d"
  stroke: "#dee2e6"
  white: "#ffffff"
  danger-text: "#842029"
  danger-well: "#f8d7da"
  danger-stroke: "#f5c2c7"
  scrim: "rgba(15, 18, 36, 0.45)"
typography:
  headline:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
  listing: "6px"
  pill: "999px"
  full: "50%"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.25rem"
  2xl: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.deep-royal-ultramarine}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  button-primary-hover:
    backgroundColor: "{colors.ultramarine-pressed}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  button-outline-dark:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  navbar:
    backgroundColor: "{colors.deep-royal-ultramarine}"
    textColor: "{colors.white}"
    height: "56px"
  listing-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.25rem"
  shelf-well:
    backgroundColor: "{colors.quiet-shelf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.listing}"
    padding: "0.5rem 0.75rem"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  fab:
    backgroundColor: "{colors.deep-royal-ultramarine}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    size: "3.5rem"
    height: "3.5rem"
    width: "3.5rem"
  chat-header:
    backgroundColor: "{colors.deep-royal-ultramarine}"
    textColor: "{colors.white}"
    padding: "0.75rem 1rem"
  user-bubble:
    backgroundColor: "{colors.deep-royal-ultramarine}"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "0.75rem 1rem"
---

# Design System: Charity Shop

## Overview

**Creative North Star: "The Blue Storefront"**

Charity Shop looks like a simple shop wrapped in an electric blue banner. The header and footer are the storefront: Deep Royal Ultramarine, full width, white type, logo in the footer. Inside the banner, the catalog is quiet so product photos, prices, and charity marks can lead. The blue is loud on purpose; the listings are not.

The system is Bootstrap 5 with one custom brand color. Density is catalog-like: rows of items, category icon grids, bordered wells. Personality is tactile and confident on chrome and primary actions, workmanlike everywhere else. Copy on the site is plain and explanatory; the visuals should stay that direct.

Confirmed visual rejections: do not treat Bootstrap’s default primary blue as the brand; do not dress the catalog in lifestyle atmosphere, extra palettes, or decorative depth that competes with the merchandise.

**Key Characteristics:**
- Ultramarine chrome (header, footer, chat, FAB) against a white page
- Quiet Shelf Gray wells so images and charity logos sit on a cool rest, not on color
- Catalog rows and cards stay visually quiet; lift is for things that act
- Bootstrap layout and controls; brand identity lives in the banner and in primary actions
- Logo, not display type, is the home-page hero

## Colors

One saturated brand blue, used as a storefront wrap. Everything else is Bootstrap-adjacent paper, ink, and stroke so listings stay readable.

### Primary
- **Deep Royal Ultramarine** (`{colors.deep-royal-ultramarine}`): Header, footer, shop-assistant FAB, chat headers, user chat bubbles, markdown accents in the assistant. This is the only custom brand color.
- **Ultramarine Pressed** (`{colors.ultramarine-pressed}`): Hover/focus on the FAB and, for new work, hover on primary actions.

### Neutral
- **Canvas** (`{colors.canvas}`): Page background.
- **Quiet Shelf Gray** (`{colors.quiet-shelf}`): Image backplates, Benefits wells, item-detail panels, charity-card image trays, table sticky headers, chat panel body.
- **Ink** (`{colors.ink}`): Default headings, paragraphs, labels, and links on light surfaces.
- **Body** (`{colors.body}`): Markdown body in the assistant.
- **Secondary text** (`{colors.secondary-text}`): Status/thinking copy and blockquote text.
- **Muted** (`{colors.muted}`): Empty-state helper text.
- **Stroke** (`{colors.stroke}`): Default borders on listings, chat, tables, and bubbles.
- **White** (`{colors.white}`): Type and icons on ultramarine; assistant composer and assistant bubbles.

### Named Rules
**The One Banner Rule.** Deep Royal Ultramarine owns chrome and primary action. It is loud on purpose. Listings, wells, and charity marks stay on canvas or Quiet Shelf Gray so the item can lead.

**The No Second Blue Rule.** Bootstrap’s shipped `.btn-primary` (`#0d6efd`) is leftover. Do not copy it. New primary actions tint to Deep Royal Ultramarine.

## Typography

**Display Font:** none — the home hero is the Charity Shop logo, not a display face.
**Body Font:** Bootstrap system stack (system-ui / Segoe UI / Roboto / Arial)
**Label/Mono Font:** same stack; code in the assistant uses a slightly smaller size on Quiet Shelf Gray, not a separate family.

**Character:** Default UI type. Hierarchy comes from size and weight 600 on prices, chrome titles, and Benefits labels — not from a custom type pairing.

### Hierarchy
- **Headline** (500, 2.5rem, ~1.2): Page titles (About, Charities, Watch List, Purchases). Centered on marketing/help pages.
- **Title** (500, 1.5rem, ~1.3): Section titles and item-detail headings. About section titles are 1.5rem centered.
- **Body** (400, 1rem, 1.5): Default reading text. About columns run at half container width; assistant markdown uses 0.95rem / 1.6.
- **Label** (600, 0.9rem): Benefits label, prices (`font-weight: 600`), chat headers, compact chrome controls (assistant header buttons ~0.8rem). Listing titles are `h6` with a 3-line clamp (4 on desktop).

### Named Rules
**The Logo-Is-Display Rule.** Do not invent a display typeface for hero moments. The logo (`src/images/charityShopLogo.png`, max-width 420px) is the display.

**The Arial Exception.** About currently forces Arial. That is a local override, not the app stack. New screens keep the Bootstrap system stack.

## Layout

Bootstrap containers and a 12-column grid. The app shell is a column flex on `#root` (`min-height: 100vh`) with the footer at the bottom. Header search is centered and capped at 500px.

Home is a category icon grid: 2 columns on small screens, 3 from `md` up (`xs={6} md={4}`), with the logo above. Listing rows are a 5/7 split for image/details on small screens, then image / details / Benefits at `md`. Forms (login, profile) center in a column that narrows to `lg={5}`.

Spacing follows Bootstrap rem steps: 0.25 / 0.5 / 0.75 / 1 / 1.25 / 1.5. Listing chrome is tight (`0.25rem` pad); item-detail wells open up (`p-5` on the details card). The first layout break that restyles listings and carousels is **768px**.

## Elevation & Depth

Surfaces are mostly border + fill. Depth is reserved for things the shopper acts on or that overlay the page: the shop-assistant FAB, the chat panel, and (for new work) other clickable lifts. Static catalog rows do not sit on drop shadows.

### Shadow Vocabulary
- **Action glow** (`box-shadow: 0 0.4rem 1rem rgba(20, 6, 212, 0.35)`): FAB. Brand-colored, not neutral.
- **Overlay panel** (`box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.22)`): Centered shop-assistant panel over a 45% navy scrim.
- **Carousel counter** (`background: rgba(0, 0, 0, 0.65)`): A dark pill, not a shadow.

### Named Rules
**The Lift-What-Acts Rule.** Shadows belong on clickable overlays and primary floating actions. Do not add ambient shadows under listing rows, charity cards, or page sections just to “add depth.”

## Shapes

Corners are modest Bootstrap rounds, not sharp and not pill-everything. Listing image wells use 6px; containers use `rounded-2` / `rounded-3` (0.375rem / 0.5rem). The shop-assistant panel is a bit rounder (0.75rem). Chat bubbles are 1rem with a 0.25rem “tail” corner. The FAB and carousel counter are full pills. Category icons use Bootstrap `rounded` on the image.

Borders are 1px `{colors.stroke}` on listings, chat, and tables. Do not add heavy outlines to compete with the banner.

## Components

### Buttons
Bootstrap buttons. **Canon primary is Deep Royal Ultramarine**, not the leftover default `.btn-primary` blue.
- **Shape:** default Bootstrap radius (`{rounded.md}`)
- **Primary:** ultramarine fill, white label, compact padding (`0.375rem 0.75rem`). Hover/focus: Ultramarine Pressed.
- **Outline dark:** used for Back / secondary navigation (`outline-dark`).
- **Outline secondary:** unselected subcategory chips.
- **Solid secondary:** selected subcategory chip.
- **Ghost on chrome:** shop-assistant header actions — transparent, white, underline on hover.

### Chips
Subcategory filters on category pages are small Bootstrap buttons in a wrapping bar. Unselected: outline-secondary. Selected: solid secondary. Tight margin (`m-1`).

### Cards / Containers
- **Listing row:** full-width bordered container (`border rounded-3`), quiet canvas, 6px image well on Quiet Shelf Gray. Benefits column is its own shelf well.
- **Charity browse card:** clickable Bootstrap card; 140px shelf-gray image tray; 3-line clamped description; star in a borderless footer.
- **Directory shop card:** fixed 18rem Bootstrap card, contain-fit 200px logo, primary CTA **View Shop**.
- **Item detail / purchases summary / About:** bordered rounded containers on Quiet Shelf Gray.
- **Shadow:** none at rest; see Elevation for acting overlays.

### Inputs / Fields
Bootstrap `form-control`. Search in the header is a compact input + primary Search button. Charity search is a full-width control. Category-on-charity uses react-select, max width 28rem. Login is Google-only; no custom field chrome beyond Bootstrap.

### Navigation
- **Header:** full-width ultramarine bar, white `nav-link`s, white hamburger, centered search. Account menu is a dropdown labeled with the shopper’s name.
- **Footer:** matching ultramarine, logo, then white unstyled links (About, Other Charity Shops) that underline on hover.
- **Mobile:** collapse toggle; category grid drops to two columns; listing Benefits stacks under the row instead of a tall side column.

### Shop assistant (signature)
Fixed FAB, bottom-right, 3.5rem circle, ultramarine with brand glow. Open state: full-viewport scrim, centered panel (`min(36rem, 100vw - 2rem)`), ultramarine header, Quiet Shelf body, user bubbles in ultramarine, assistant bubbles white with stroke. This is the loudest interactive object on every page; it must not be restyled into a second accent color.

### Listing Benefits column (signature)
Every catalog row ends in a Quiet Shelf well labeled **Benefits** (600 weight) plus the charity mark. On `md+` it becomes a 250px-tall centered stack so the charity logo can be large. Hovering the mark shows the charity name. This column is how the storefront proves the purchase helps a nonprofit — do not bury it.

## Do's and Don'ts

### Do:
- **Do** wrap the app in Deep Royal Ultramarine chrome (header and footer) and keep page interiors white.
- **Do** sit images, charity logos, and detail groups on Quiet Shelf Gray (`{colors.quiet-shelf}`).
- **Do** keep the Benefits mark visible on every listing row.
- **Do** tint new primary actions to Deep Royal Ultramarine; hover to Ultramarine Pressed.
- **Do** lift only what the shopper acts on (FAB, overlays, and similarly clickable objects).

### Don't:
- **Don't** copy Bootstrap’s default primary `#0d6efd` onto new buttons or links.
- **Don't** add a second brand color, a lifestyle palette, or decorative photography behind the catalog.
- **Don't** invent a display typeface; the logo is the display.
- **Don't** drop-shadow static listing rows or page sections.
- **Don't** hide or rename Watch List, Benefits, or Go to item on eBay as part of a visual refresh — those are product terms, not styling.
