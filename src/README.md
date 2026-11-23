# Prof Honey drawing source

Reusable source for Prof Honey, the professor character in Jon's educational games. Use it so she looks the same in every game.

- `prof.js`: the SVG character rig, as `PROF = {DEFS, POSE, HERO, PRINT}`.
  - `DEFS` holds the shared symbols (head, hair, body, glove, clip paths).
  - `POSE` holds the finished poses: `inspecting`, `close`, `thinking`, `spotted`, `verified`, `cracked`, `checked`, `falselead` and `hero` (the large home-page pose).
  - Coordinates use `viewBox="0 0 300 360"`. She faces right, upper body only.
  - Arms use two-link inverse kinematics (`LIMB`/`IK`), and `LENS()` puts magnified content inside the magnifying glass.
- `draw-in.js`: the pencil draw-in animation. A scribble mask reveals her from top to bottom while a pencil follows along.

The detective outfit is shown here. The explorer outfit lives in `hudsonlinemedia/lost-hominins` (`index.html`).
