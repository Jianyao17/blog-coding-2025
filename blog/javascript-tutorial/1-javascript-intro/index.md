---
lang: id
createdAt: 2025-02-10
lastUpdated: 2025-02-12
title: "Mengenal Javscript"
description: "Pengenalan Bahasa Pemrograman Javascript untuk pemula"
thumbnail: javascript.png
readTime: 5 # Minutes
series: "Javascript Tutorial"
order: 1
author:
  - name: Jianyao17
    avatar: /Jianyao17.png
    link: https://github.com/Jianyao17
tags:
  - javascript
  - beginner
  - webdev
---


# 🟡 Pengenalan JavaScript

## 🔹 Apa itu JavaScript?

**JavaScript** adalah _High-Level Interpreted Language_ yang dibuat oleh **Brendan Eich** di **1995**. Awalnya hanya digunakan untuk browser, kini JavaScript bisa berjalan di berbagai platform seperti **server**, **desktop**, dan **mobile** berkat **runtime environment** seperti `Node.js` dan `Bun`.

> 💡 **ECMAScript** adalah standar resmi untuk JavaScript yang menentukan sintaks dan fitur bahasa ini.



## 🔹 JavaScript Runtime

**Runtime environment** memungkinkan JavaScript berjalan di berbagai platform. Tiga runtime utama adalah:

- **Browser** → Akses ke `window` untuk manipulasi DOM.
- **Node.js** → Akses ke _file system_, _database_, dll.
- **Bun** → Runtime baru dengan performa tinggi dan kompatibel dengan Node.js.



## 🔹 Dasar-Dasar JavaScript

### 📌 **Variabel**

Variabel menyimpan nilai dalam program. Ada dua cara mendeklarasikan variabel:

- **`const`** → Tidak bisa diubah (*immutable*).
- **`let`** → Bisa diubah (*mutable*).

```js
const id = 123; 
let username = 'Dicoding'; 

console.log(id); // Output: 123 
console.log(username); // Output: Dicoding 

username = "Node.js"; // ✅ Bisa diubah 
id = 321; // ❌ Error: const tidak bisa diubah
```




### 📌 **Tipe Data Primitif**

JavaScript memiliki beberapa tipe data dasar:

- **String:** Teks yang diapit oleh tanda kutip tunggal (`'`), ganda (`"`) atau _backticks_ (```
```). _Backticks_ memungkinkan _template literals_ dengan interpolasi `${variabel}`.

```js
const name = 'JavaScript';
`Ini adalah contoh string di ${name}`; // Template literal
```

- **Number:** Angka, baik bulat maupun desimal. Nilai spesial `Infinity` dan `NaN` (Not-a-Number) juga termasuk dalam tipe data ini.

```js
const result1 = 50 / 0; // Infinity
const result2 = Number('Dicoding'); // NaN
```

- **Boolean:** Nilai `true` atau `false`. Biasanya dihasilkan dari operasi perbandingan.

```js
const completed = true;
const isGreater = 5 > 2; // true
```

- **Null dan Undefined:** Keduanya merepresentasikan ketiadaan nilai. `null` adalah nilai eksplisit yang diberikan oleh _programmer_, sedangkan `undefined` adalah nilai implisit variabel yang belum *diinisialisasi*.

```js
let message1 = null;
let message2; // undefined
```



### 📌 **Konversi Tipe Data**

#### 🔹 **Eksplisit** (Manual)

Dilakukan dengan fungsi atau _method_ khusus:

- `String()` atau `.toString()` untuk konversi ke string.
- `Number()`, `parseInt()`, `parseFloat()` untuk konversi ke angka.
- `Boolean()` untuk konversi ke boolean (`truthy` atau `falsy`).

```js
String(100); // "100" 
Number("3.14"); // 3.14 
Boolean(1); // true
```

#### 🔹 **Implisit** (Otomatis)

JavaScript kadang mengubah tipe data secara otomatis:

```js
const result = "10" * 2; // 20 (string dikonversi ke number) 
const message = "Umur: " + 20; // "Umur: 20" (number jadi string)
```




## 🔹 Operator dalam JavaScript

### 📌 **Operator Aritmetika**

|Operator|Fungsi|
|---|---|
|`+`|Penjumlahan|
|`-`|Pengurangan|
|`*`|Perkalian|
|`/`|Pembagian|
|`%`|Sisa bagi|
|`**`|Pangkat|

```js
console.log(5 + 3); // 8 
console.log(10 % 3); // 1 
console.log(2 ** 3); // 8 (2 pangkat 3)
```



### 📌 **Operator Perbandingan**

Mengembalikan nilai `true` atau `false`.

|Operator|Fungsi|
|---|---|
|`==`|Sama (tanpa cek tipe)|
|`===`|Sama (cek tipe)|
|`!=`|Tidak sama|
|`!==`|Tidak sama (cek tipe)|
|`>`|Lebih dari|
|`<`|Kurang dari|

```js
console.log(5 == "5"); // true (tanpa cek tipe) 
console.log(5 === "5"); // false (cek tipe) 
console.log(10 > 2); // true
```



### 📌 **Operator Logika**

| Operator | Fungsi                 |
| -------- | ---------------------- |
| `&&`     | AND (Semua harus true) |
| `\|\|`   | OR (Salah satu true)   |
| `!`      | NOT (Kebalikan nilai)  |

```js
console.log(true && false); // false 
console.log(true || false); // true 
console.log(!true); // false
```


## 🎯 **Kesimpulan**

- **JavaScript** adalah bahasa yang fleksibel dan bisa dijalankan di berbagai runtime.
- Tipe data utama: **String, Number, Boolean, Null, Undefined**.
- Operator memungkinkan manipulasi nilai dan logika dalam kode.
- Konversi data bisa dilakukan secara **eksplisit** (_manual_) atau **implisit** (_otomatis_).