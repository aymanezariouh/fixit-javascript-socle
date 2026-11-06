# Fixit repairs

A small Vite app for tracking fictional device repairs.

## Start

In PowerShell, run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173/`).

## Features

- `renderRepairs` shows repairs and the count for the selected view.
- `filterRepairs` filters by status: all, received, in progress, or finished.
- `addRepair` adds a device with status `recu`; `changeStatus` marks a repair `termine`.
- `loadRepairs` and `saveRepairs` keep changes in browser `localStorage` across reloads.

## Limits

The starting repairs are fictional. Changes are stored only in this browser; there is no account, server, or sync between devices. Clearing browser storage resets the list. An empty filtered view currently shows a count of zero but does not show the intended empty-list message.

## Checked

Using an isolated DOM and `localStorage` simulation, I checked:

- Four starting repairs appear with empty storage.
- Filtering to `en_cours` shows two repairs and a count of two.
- Adding `Écran` under `tous` persists after a simulated reload.
- Finishing repair `R2` persists after a simulated reload.
