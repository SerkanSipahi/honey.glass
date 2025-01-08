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

In diesem Artikel moechte ich eine schritt fuer schritt Anleitung geben, wie man die "Cloudflare Pages Free Build"
limits effizient mit GithubActions nutzen kann ohne sich grosse sorgen machen zu muessen das die limits
ueberschritten werden. Wir werden auch kurz darauf eingehen was Cloudflare Pages ist und welche Art von Projekten
es eingesetzt werden kann. Wir werden nicht behandeln wie man z.B einen Blog mit Cloudflare Pages hostet, sondern
gehen davon aus das dies bereits gemacht wurde.

## Eine kurze einfuehrung was Cloudflare Pages sind

Cloudflare Pages ist eine Plattform von Cloudflare womit Entwickler oder betreiber statische Webseiten und
Single-Page-Apps (SPA) hosten koennen. Die Plattform ermöglicht es, Webseiten einfach direkt aus GitHub, GitLab oder
Bitbucket bereitzustellen.

## Das standard verhalten von Cloudflare Pages

Das standard verhalten von Cloudflare Pages ist sehr verfuehrerisch. Es verleitet einem dazu sofort damit zu beginne weil
es keine 90 Sekunden bis eine Webseite online ist. Hierzu gibt es ein sehr gutes Youtube tutorial siehe, [hier](https://www.youtube.com/watch?v=hIB8DuFeSpU).
Eigentlich nichts auszusetzen daran wenn man sein deployment pruefen moechte. Spaetestens wenn man anfaengt frequentiert
zu committen und deployen nach dem Motto "commit early, commit often" kann man sehr schnell die 500 build limit erreichen.
Ausserdem ist es ueberhaupt nicht effizient wenn man mit seinen Resourcen so umgeht. Der Umfeld tut es auch nicht gut.

> **[Commit often, commit early:](https://www.reddit.com/r/git/comments/xgncb4/questions_about_commit_early_commit_often/)** As for my workflow, I think of it like a computer game: Save early and often. Small successes in version control add up, letting you revert to earlier progress if something goes wrong, instead of redoing everything.
