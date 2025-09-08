alias rp := run-play
alias bp := build-play

run-play:
  bun run playground.ts

build-play:
  bun build playground.ts | bat -l ts
