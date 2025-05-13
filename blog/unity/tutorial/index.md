---
lang: id-ID
createdAt: 2025-01-13
lastUpdated: 2025-01-15
title: 'Roadmap Belajar Unity 2025 Bahasa Indonesia'
description: "Ini Cuma Deskripsi"
thumbnail: star-rail-kuru.gif
readTime: 6 # Minutes
series: Tutorial Unity
order: 1
author:
  - name: Jianyao17
    avatar: /Jianyao17.png
    link: https://github.com/Jianyao17
tags:
  - unity
  - game dev
  - c#
  - shader
---

# Hello Unity

![677670.jpg](677670.jpg)

![Kuru-kuru](star-rail-kuru.gif)


# Generator Taksonomi untuk Blog

Script ini berfungsi untuk menghasilkan sistem taksonomi (pengkategorian) konten blog dengan menganalisis file markdown dan metadata frontmatter-nya.

## Cara Kerja

Script ini memproses file markdown untuk membuat sistem taksonomi terstruktur yang mengorganisir konten berdasarkan seri dan tag. Hasilnya disimpan sebagai `taxonomies.json`.

### Komponen Utama

1. **GenerateTaxonomiesJSON**: Fungsi utama yang mengatur proses pembuatan taksonomi
2. **GetListFrontmatterData**: Membaca dan mengekstrak frontmatter dari file markdown
3. **CreateTaxonomiesData**: Memproses data frontmatter menjadi struktur taksonomi
4. **pathToSlug**: Mengubah path file menjadi URL yang mudah dibaca

### Struktur yang Dihasilkan

```json
{
  "series": {
    "namaSeri": ["url1", "url2"]
  },
  "tags": {
    "namaTag": ["url1", "url2"]
  },
  "items": {
    "url": {
      "lang": "string",
      "title": "string",
      "description": "string",
      "series": "string",
      "tags": ["string"],
      // ...metadata lainnya
    }
  }
}
```

```json
{
  "series": {
    "namaSeri": ["url1", "url2"]
  },
  "tags": {
    "namaTag": ["url1", "url2"]
  },
  "items": {
    "url": {
      "lang": "string",
      "title": "string",
      "description": "string",
      "series": "string",
      "tags": ["string"],
      // ...metadata lainnya
    }
  }
}
```

## Alur Proses

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base' } }%%
      gitGraph
        commit
        branch hotfix
        checkout hotfix
        commit
        branch develop
        checkout develop
        commit id:"ash" tag:"abc"
        branch featureB
        checkout featureB
        commit type:HIGHLIGHT
        checkout main
        checkout hotfix
        commit type:NORMAL
        checkout develop
        commit type:REVERSE
        checkout featureB
        commit
        checkout main
        merge hotfix
        checkout featureB
        commit
        checkout develop
        branch featureA
        commit
        checkout develop
        merge hotfix
        checkout featureA
        commit
        checkout featureB
        commit
        checkout develop
        merge featureA
        branch release
        checkout release
        commit
        checkout main
        commit
        checkout release
        merge main
        checkout develop
        merge release
```

```mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you ?
    Bob->>Alice: Fine, thank you. And you?
    create participant Carl
    Alice->>Carl: Hi Carl!
    create actor D as Donald
    Carl->>D: Hi!
    destroy Carl
    Alice-xCarl: We are too many
    destroy Bob
    Bob->>Alice: I agree

```

## Cara Penggunaan

```js
import { GenerateTaxonomiesJSON } from './taxonomies'

// Generate taksonomi dengan direktori default
GenerateTaxonomiesJSON()

// Atau tentukan direktori kustom
GenerateTaxonomiesJSON('./direktori/output/kustom')
```
