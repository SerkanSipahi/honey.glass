---
title: 'Maximizing Efficiency: Using GitHub Actions to Optimize Cloudflare Pages Free Build Limits'
excerpt: 'The greatly underestimated and often overlooked never type is a core Type in the TypeScript type hierarchy. TypeScript itself says: "The never type represents the type of values that never occur." Even though it is said to never appear, it is omnipresent.'
publishDate: 'February 18 2024'
updatedDate: 'March 31 2024'
tags:
  - Cloudflare Pages
  - GitHub Actions
  - DevOps
  - ...
  - ...
isFeatured: true
seo:
  image:
    src: '/white-hole.webp'
    alt: White hole
---

![Light lines on a dark background](/white-hole.webp)

# Maximizing Efficiency: Using GitHub Actions to Optimize Cloudflare Pages Free Build Limits

In diesem Artikel moechte ich eine schritt fuer schritt Anleitung geben, wie man mit "Cloudflare Pages" die Build
limits effizient mit GithubActions nutzen kann ohne sich grosse sorgen machen zu muessen das die limits
ueberschritten werden. Ausserdem werden wir auch kurz darauf eingehen was Cloudflare Pages sind und in welche Art von Projekten
es eingesetzt werden kann. Wir werden nicht behandeln wie man z.B einen Blog mit Cloudflare Pages hostet, sondern
gehen davon aus das dies bereits gemacht wurde.

## Eine kurze einfuehrung was Cloudflare Pages sind

Cloudflare Pages ist eine Plattform von Cloudflare womit Entwickler oder betreiber statische Webseiten oder
Single-Page-Apps (SPA) hosten koennen. Die Plattform ermöglicht es, Webseiten einfach direkt aus GitHub, GitLab oder
Bitbucket bereitzustellen.

## Das standard verhalten von Cloudflare Pages

Das Standardverhalten von Cloudflare Pages ist verführerisch, da eine Webseite nur 90 Sekunden nach der Verbindung mit GitHub und Cloudflare online ist.
Ein gutes YouTube-Tutorial dazu gibt es [hier](https://www.youtube.com/watch?v=hIB8DuFeSpU). Das ist ideal für den schnellen Start, aber bei häufigem
Committen und Pushen nach dem Motto `commit early, commit often` wird schnell das 500-Build-Limit erreicht, da jeder Push ein neues Build auslöst.
Außerdem ist es ineffizient und schadet langfristig der Ressourcennutzung. In der Industrie spricht man hier von `Circular Economy`.

> **[Commit often, commit early:](https://www.reddit.com/r/git/comments/xgncb4/questions_about_commit_early_commit_often/)** as for my workflow, I think of it like a computer game: Save early and often. Small successes in version control add up, letting you revert to earlier progress if something goes wrong, instead of redoing everything.

> **[Circular economy:](https://www.reddit.com/r/git/comments/xgncb4/questions_about_commit_early_commit_often/)** a circular economy minimizes waste by reusing, repairing, and recycling materials in a closed-loop system, promoting sustainability and reducing environmental impact.

## Wie man Build-Limits effizient nutzt

Die Kernidee ist sehr simpel und einfach zu verstehen. Ich nutze diese Technik schon seit einigen Jahren um mit meinen resourcen schonend umzugehen.
Zwei optionen stehen zur verfuegung und eine davon werden wir im Detail behandeln weil ich denke das diese am effizientesten und einen klaren workflow folgt.
Desweiteren nehmen wir an das wir folgende jobs in der Pipeline haben: `test`, `lint` und `deploy`.

**Scenario 1:**

Tests werden nur dann ausgefuehrt, wenn etwas in einen spezifischen Branch oder Pull Request gepusht wird. Beide Tests und das Deployment werden nur ausgeführt,
wenn ein Pull Request in den main Branch gemerged wird. Direkte Pushes in den main Branch sind nicht erlaubt.

Dieses Scenario ist vorteilhaft, da der **Deploy-Prozess** nur bei Merges in den `main`-Branch ausgelöst wird, was das 500-Build-Limit schont. **Gezielte Tests** sparen Ressourcen
und fördern eine effiziente Nutzung. Der **klare Workflow** sorgt für Transparenz, und durch die **Reduzierung von unnötigen Builds** werden überflüssige Benachrichtigungen und
Logs vermieden, was die Pipeline übersichtlicher und fokussierter macht.

**Scenario 2:**

Tests werden nur dann ausgefuehrt, wenn jemand (außer dem main-Branch) Änderungen ins Repository pusht. Sowohl der Test als auch das Deployment werden ausgeführt,
wenn jemand Änderungen in den main-Branch pusht.

Diese Scenario erhöht das Risiko, das Deploy-Limit schnell zu überschreiten, da jeder Push zum main-Branch einen deployment auslöst. Ressourcen werden verschwendet,
Zudem können CI-Pipeline-Engpässe entstehen, die wichtige Builds verzögern.
