/**
 * Server-authoritative game clock. Ticks from process time.
 * Does not pause in fly or interiors. In-memory; no persist.
 *
 * 48 real min = 2880 s = 24 game hours → 120 s / game hour, 2 s / game minute.
 */
const DAY_REAL_MS = 48 * 60 * 1000;
const GAME_DAY_SEC = 24 * 60 * 60;
const START_HOUR = 8;
const REAL_TO_GAME = GAME_DAY_SEC / (DAY_REAL_MS / 1000);

const startedAt = Date.now();

function phaseOf(hour) {
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 19) return "day";
  if (hour >= 19 && hour < 21) return "dusk";
  return "night";
}

function snapshot() {
  const gameSec = START_HOUR * 3600 + ((Date.now() - startedAt) / 1000) * REAL_TO_GAME;
  const day = Math.floor(gameSec / GAME_DAY_SEC);
  const wrapped = ((gameSec % GAME_DAY_SEC) + GAME_DAY_SEC) % GAME_DAY_SEC;
  const hour = Math.floor(wrapped / 3600);
  const minute = Math.floor((wrapped % 3600) / 60);
  const second = Math.floor(wrapped % 60);
  return {
    hour,
    minute,
    second,
    day,
    phase: phaseOf(hour),
    t01: wrapped / GAME_DAY_SEC,
  };
}

module.exports = { snapshot };
