# CASFEE Advanced Mumble App Project

### Contributors:

[Thierry Seiler](https://github.com/THRY)
[Simon Herensperger](https://github.com/eoss-sh)

### Live Vercel Deploy:

[https://app-thierry-und-simon.vercel.app/](https://app-thierry-und-simon.vercel.app/)

## Allgemeine Infos

_Rendering Stratefien_

Im Vergleich zur Präsentation wurde eine grössere Änderung vorgenommen. Die Single Mumbles werden nicht mehr statisch generiert sondern auch serverseitig gerendert. Dies weil das fetschen der Likes und Userdaten auf dem Client nicht sinnvoll war und insbesondere die Likes aufgrund der fehlenden Userangaben nicht korrekt ausgegeben werden konnten.

Ansonsten sind die Renderingstrategien gleich geblieben:

- Index: SSR
- Index für "Nicht-User" ohne Login: SSG
- Single Mumble: SSR
- Profil: SSR
- Login, Register: CSR

_Service_

Bei den Services gibt es ein File `fetch.ts`. Dieses File wird aktuell nicht verwendet. Die Services sollten in einem nächsten Schritt jedoch generischer implementiert werden. Damit das noch gemacht werden kann, ist das File noch immer Teil des Projektes.

_Stack_

Neben Next.js, Tailwind und TypeScript wurde SWR, Next Auth, next-pwa und nprogress eingesetzt. Ebenfalls ist die [Component Libraray](https://github.com/smartive-education/design-system-component-library-thierry-und-simon) aus Block 1 Bestandteil des Projektes.

## PWA

Die App ist als PWA verfügbar und kann entsprechen installiert werden.

## Allgemeien Infos und Installation

Die App basiert auf [Next.js](https://nextjs.org/) und ist mit [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) umgesetzt.

### Start

Um das Projekt lokal zu installieren geht man wie folgt vor:

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) mit einem Browser um die App zu sehen.

### API Documentation

Die Dokumentation der Qwaker-REST Api ist [hier](https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/rest/) zu finden.

### Docker und Deployment

Um eine Instanz der App lokal mittels Docker zu erstellen, sind folgende Schritte nötig:

1. Docker Image erstellen `docker build . --build-arg NPM_TOKEN=[TOKEN] -t mumble-image`
2. Docker Image starten ```docker run -p 3000:3000 --env-file .env mumble-image````

Um das Docker Image mittels Google CLoud Run zu deployen muss das Image erstellt und in die Artifact Registry gepushed werden:

1. Docker Image erstellen ```docker build -t europe-west6-docker.pkg.dev/casfee-adv-mumble/mumble-thierry-simon/mumble-image . --build-arg NPM_TOKEN={NPM_TOKEN}````
2. Docker Image pushen ```docker push [build name]

### Testing

Es gibt zwei Arten von Tests: E2E Tests mit Playwright und Unit Tests mit Jest und React Testing Library.
Um die Test auszuführen sind folgende Befehle nötig:

E2E: `npm run test:e2e`
Unit: `npm run test`

### Github Actions

Es gibt verschiedene GitHub Actions, welche beim Push in den Master Branch ausgeöst werden:

1. Quality: Check Linting und PRetier
2. E2E Tests und Unit.Test
3. Docker Image erstellen und mittels Terraform auf Google Cloud Run deployen

### Live URLs

Die App ist unter folgenden beiden URLs verfügbar:

Vercel: app-thierry-und-simon.vercel.app
GCR: https://mumble-image-mu6q4anwpa-oa.a.run.app
