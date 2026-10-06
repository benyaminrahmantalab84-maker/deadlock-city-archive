# Deadlock: City Archive

An unofficial, noncommercial, bilingual (Persian / English) React fan site for Valve's **Deadlock**. It has a cinematic home page, curated official news, and a separate interactive page for three character dossiers.

## Run locally

```bash
pnpm install
pnpm dev
```

Production build: `pnpm build`. Preview it with `pnpm preview`.

The two built pages are `index.html` and `heroes.html`. Relative Vite paths let the build work at a GitHub Pages repository URL and locally. Language choice is saved in local storage. The short official video loads only while its section is near the viewport and does not autoplay when the visitor requests reduced motion.

## News and content

The three news cards are manually curated from Valve's [City Never Sleeps announcement](https://www.playdeadlock.com/cityneversleeps) and the [developer patch thread](https://forums.playdeadlock.com/threads/09-29-2026.166726/). They were checked on **October 6, 2026**. Update the copy, dates, and source URLs in `src/main.tsx` as new official information arrives; the cards are not a live feed.

The character notes describe only the official portraits and keywords. They intentionally avoid inventing abilities or fixed gameplay stats while the game is in development.

## Media credits

All game images and footage were downloaded from Valve's official [City Never Sleeps](https://www.playdeadlock.com/cityneversleeps) page and its Steam CDN. No images were generated. The following locally hosted files are original Valve game media:

| Local file | Source |
| --- | --- |
| `public/media/times_square_05.jpg` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/times_square_05.jpg` |
| `public/media/seaport_01.jpg` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/seaport_01.jpg` |
| `public/media/broadway_01.jpg` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/broadway_01.jpg` |
| `src/assets/uptown_01.jpg` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/uptown_01.jpg` |
| `public/media/header_portraits.webp` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/header_portraits.webp` |
| `public/media/newspaper.webp` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/newspaper.webp` |
| `public/media/portrait-danny.webp` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/hero_solomon.webp` (the supplied image depicts Deadman Danny) |
| `public/media/portrait-harrow.webp` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/hero_nurse_harrow.webp` |
| `public/media/portrait-ratking.webp` | `https://cdn.fastly.steamstatic.com/apps/deadlock/images/react/cityneversleeps/hero_deadman_danny.webp` (the supplied image depicts Rat King) |
| `public/media/minimap.mp4` | `https://cdn.fastly.steamstatic.com/apps/deadlock/videos/cityneversleeps/minimap.mp4` |
| `public/media/minimap.png` | `https://cdn.fastly.steamstatic.com/apps/deadlock/videos/cityneversleeps/minimap.png` |

The CDN's two character image filenames above differ from the names painted into the art. Local filenames follow the visible character names.

Deadlock and all game imagery belong to Valve. This is an independent fan concept, not an official Valve site. Valve's [Steam Subscriber Agreement](https://store.steampowered.com/subscriber_agreement/) permits noncommercial fan art incorporating Valve game content; its [video policy](https://store.steampowered.com/video_policy) covers noncommercial videos made using Valve game content. The site has no ads, store, or paid access.

## Deployment

The GitHub Actions workflow builds the site and deploys `dist` to GitHub Pages when `main` is pushed. On a new repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** once. The live URL then follows `https://<owner>.github.io/<repository>/`.
