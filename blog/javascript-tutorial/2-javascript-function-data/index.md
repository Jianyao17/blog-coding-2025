---
lang: id
createdAt: 2025-02-11
lastUpdated: 2025-02-14
title: "Mengenal Function dan Struktur Data dalam JavaScript"
description: Pengenalan Function dan Struktur Data dalam JavaScript 
thumbnail: javascript.png
readTime: 5
series: Javascript Tutorial
order: 2
author:
  - name: Jianyao17
    avatar: /Jianyao17.png
    link: https://github.com/Jianyao17
tags:
  - javascript
  - beginner
  - webdev
---

## 🛠 JavaScript Function

**Function** adalah blok kode yang dibuat untuk menjalankan tugas tertentu dan dapat dipanggil berulang kali. Function dapat menerima **input** (*parameter*) dan menghasilkan **output** (*return value*).

```js
// Deklarasi Function
function tambah(a, b) {
  return a + b;
}

// Pemanggilan Function
const hasil = tambah(10, 5);
console.log(hasil); // Output: 15
````

### 📌 Parameter & Return Value

- **Parameter**: Input yang diberikan ke function untuk menghasilkan nilai.
- **Return Value**: Nilai yang dikembalikan dari function menggunakan `return`.

> **⚠️ Penting:** Function tanpa `return` akan mengembalikan `undefined`.



## 🎭 Function Expression

Function juga bisa dibuat menggunakan **Function Expression**, di mana function diperlakukan layaknya variabel.

```js
const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(3, 4)); // Output: 12
```

Kelebihan **Function Expression**: ✅ Bisa disimpan dalam variabel  
✅ Bisa dikirim sebagai parameter ke function lain  
✅ Bisa dikembalikan dari function lain (_Higher-Order Function_)

Contoh function sebagai _First-Class Citizen_:

```js
function multiplier(x) {
  return function (num) {
    return x * num;
  };
}

const double = multiplier(2);
console.log(double(10)); // Output: 20
```



## 🎯 Arrow Function: Cara Singkat Menulis Function

**Arrow Function** adalah cara lebih ringkas untuk menulis function menggunakan `=>`.

```js
const tambah = (a, b) => a + b;
console.log(tambah(3, 2)); // Output: 5
```

> **💡 Tips:**  
> Jika function hanya memiliki satu parameter, kurung `()` bisa dihapus:
> 
> ```js
> const sapa = nama => `Halo, ${nama}!`;
> ```



# 🏗 Struktur Data dalam JavaScript

## 🏢 Object: Menyimpan Data dengan _Key-Value_

**Object** adalah struktur data yang menyimpan data dalam bentuk pasangan **key-value**.

```js
const user = {
  name: 'Arsy',
  age: 25,
  country: 'Indonesia'
};
console.log(user.name); // Output: Arsy
```

### 🔎 Mengakses Properti Object

1️⃣ **Dot Notation (`.`)**

```js
console.log(user.name); // Output: Arsy
```

> ⚠️ _Dot notation_ hanya bisa digunakan jika key **tidak mengandung spasi**.

2️⃣ **Bracket Notation (`[]`)**

```js
console.log(user["country"]); // Output: Indonesia
```

3️⃣ **Destructuring**

```js
const { name, age } = user;
console.log(name, age); // Output: Arsy 25
```



## 📦 Array: Menyimpan Data Terurut

**Array** adalah struktur data yang menyimpan kumpulan data secara terurut.

```js
const fruits = ['🍎 Apple', '🍌 Banana', '🍇 Grape'];
console.log(fruits[1]); // Output: 🍌 Banana
```

### ✏️ Manipulasi Array

✅ **Menambah Elemen:**

```js
fruits.push('🍒 Cherry'); // Menambahkan ke akhir
fruits.unshift('🍊 Orange'); // Menambahkan ke awal
```

✅ **Menghapus Elemen:**

```js
fruits.pop(); // Hapus terakhir
fruits.shift(); // Hapus pertama
```

✅ **Menghapus dengan `splice`**

```js
fruits.splice(1, 1); // Hapus 1 elemen dari indeks 1
```

✅ **Menggunakan `map()`** (Transformasi data dalam array)

```js
const numbers = [1, 2, 3];
const squared = numbers.map(num => num ** 2);
console.log(squared); // Output: [1, 4, 9]
```



## 📍 Map: Object yang Lebih Fleksibel

`Map` adalah struktur data yang mirip dengan object, tetapi **key-nya bisa tipe data apa saja**.

```js
const productMap = new Map([
  ['shoes', 500],
  ['cap', 350]
]);

console.log(productMap.get('shoes')); // Output: 500
```

### 🛠 Fitur `Map`:

- **Menambah data:** `map.set(key, value)`
- **Menghapus data:** `map.delete(key)`
- **Mengecek keberadaan key:** `map.has(key)`



## 🔢 Set: Kumpulan Data Unik

`Set` mirip array, tetapi **tidak bisa menyimpan nilai duplikat**.

```js
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
console.log(uniqueNumbers); // Output: {1, 2, 3, 4}
```

### 🛠 Fitur `Set`:

- **Menambah data:** `set.add(value)`
- **Menghapus data:** `set.delete(value)`
- **Cek apakah nilai ada:** `set.has(value)`



# 🎯 Kesimpulan

- **Function** adalah blok kode yang dapat dipanggil berulang kali.
- **Function Expression** memungkinkan function diperlakukan sebagai variabel.
- **Arrow Function** adalah cara lebih singkat menulis function.
- **Object** menyimpan data dalam _key-value_.
- **Array** menyimpan data secara terurut.
- **Map** memungkinkan penggunaan key dengan tipe data apa pun.
- **Set** menyimpan nilai unik tanpa duplikasi.

Dengan memahami konsep ini, kamu bisa menulis kode JavaScript yang lebih efisien dan _clean_.

📌 **Bagikan pendapatmu di komentar! 🚀**