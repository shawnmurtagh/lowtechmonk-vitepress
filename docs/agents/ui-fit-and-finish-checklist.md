# UI Fit-And-Finish Checklist

Use this checklist for any frontend task before calling the work complete.

## Interaction

- Hover states appear immediately when the design depends on hover for discovery.
- Focus states are visible and not weaker than hover states.
- Click targets are large enough and feel intentional.
- Hidden information is still reachable by keyboard when required.

## Alignment

- Text inside circles, pills, badges, icons, and buttons is optically centered.
- Adjacent controls align on a clear baseline or centerline.
- Labels do not drift because of manual pixel nudges when layout primitives can center them correctly.
- Spacing between related controls is consistent.

## Layout

- Primary content is obvious on first scan.
- Side panels feel subordinate unless intentionally promoted.
- Nothing overlaps, clips, or collapses awkwardly at common viewport widths.
- Long labels and dynamic content do not break the layout.

## Contrast

- Text is clearly readable against its immediate background, not just the page background.
- Helper text, metadata, and tooltip text are checked separately from headings.
- Ring labels, marker labels, and side-panel text do not fade into gradients or dark surfaces.
- Contrast problems are reported even if the text is technically visible.

## Copy And Data

- Symbolic labels have plain-language definitions when the interface depends on them.
- Numbers, labels, dates, and tooltips refer to the same source data.
- Empty, loading, and filtered states still make sense.

## Visual QA

- Capture at least one full-page screenshot and one close screenshot of any alignment-sensitive control.
- Inspect hover-revealed UI in a screenshot or video capture when hover is part of the feature.
- Check desktop and a narrow/mobile viewport.

## Exit Check

Before signoff, answer:

- What are the two most alignment-sensitive elements on this screen?
- What appears on hover, and how fast does it appear?
- Which screenshot proves the layout is visually correct?
- What still has not been verified by automation?
- Which text elements were at the highest risk of poor contrast?
