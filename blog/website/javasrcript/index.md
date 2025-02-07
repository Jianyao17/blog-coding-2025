---
lang: in-ID
createdAt: 2025-01-28
lastUpdated: 2025-01-28
title: 'JavaScript 101'
description: "Tutorial JavaScript Pemula"
readTime: 5 # Minutes
series: Website
order: 1
author:
  - name: Jianyao17
    avatar: /Jianyao17.png
    link: https://github.com/Jianyao17
tags:
  - web dev
  - javascript
  - node.js
---

## Pengenalan 
**JavaScript** merupakan ***High-Level Interpreted Language*** yang diciptakan oleh **Brendan Eich** (*Netscape*) Tahun **1995**. JavaScript awalnya merupakan bahasa yang digunakan dalam web, namun karena perkembangan pengguna dan teknologi, JavaScript sekarang dijalankan di banyak platform seperti browser, server, desktop, dan mobile. Ini berkat dikembangkannya runtime JavaScript seperti `Node.js` dan `Bun`. 

Selain itu ada yang namanya **ECMAScript** yang merupakan sebuah standar untuk bahasa pemrograman JavaScript.

## JavaScript Runtime
Runtime Environment membuat JavaScript bisa dijalankan di berbagai platform. *Runtime Environment* merupakan lingkungan tempat di mana sebuah program akan dijalankan. JavaScript memiliki 3 macam runtime yang populer, yaitu `Browser`, `Node.js`, dan `Bun`.

### Browser
Kebanyakan program JavaScript dijalankan melalui lingkungan **browser** untuk membuat aplikasi browser interaktif dan dapat menampilkan data yang dinamis. Program JavaScript yang dijalankan dalam lingkungan browser memiliki akses terhadap global object **window**. Hal ini memberikan akses developer untuk memanipulasi seluruh konten yang tampil di browser.

### Node.js
**Node.js** adalah runtime environment untuk JavaScript yang berbeda dari browser. Meskipun berbeda, seluruh fitur dari bahasa pemrograman JavaScript, yakni membuat variabel, melakukan operasi aritmetika, dsb. dapat dilakukan juga di sana. Hanya saja kita tidak memiliki akses lagi terhadap global object milik browser, seperti alert. Sebagai gantinya, Node.js memberikan akses kepada developer untuk mengakses _file system_, mengatur _database_, dan lainnya.

### Bun
Ada alternatif yang dapat digunakan untuk menjalankan program dalam sistem komputer selain Node.js, yaitu **Bun**. Ia adalah JavaScript runtime baru yang menyajikan ekosistem JavaScript terkini dan berbagai fitur yang mengedepankan kecepatan. Bun dibangun agar tetap kompatibel dengan berbagai fitur dari Node.js.

## JavaScript Syntax

### Variable 
**Variabel** adalah wadah untuk menampung sebuah nilai. Nilai yang ditampung dapat berupa angka, teks, atau apa pun yang menghasilkan nilai (*expression* atau bisa juga *function*). Pada JavaScript, kita bisa membuat variabel melalui dua cara, yakni dengan sintaksis **`const`** dan **`let`**.
- **`const`** : Variabel constant, yang artinya tidak bisa diubah lagi nilainya (*Immutable*)
- **`let`** : Variabel *Mutable*, yang artinya bisa diubah lagi nilai.

```js
const id = 123;
let username = 'Dicoding';

console.log(id); // output: 123
console.log(username); //output: Dicoding

id = 321; // Error: Tidak bisa diubah (Immutable)
username = 'JavaScript'; // Ok: Bisa diubah nilainya (Mutable)
```

### Tipe Data Primitif
#### String
**String** adalah tipe data yang merepresentasikan teks seperti nama, alamat, atau email. Dalam JavaScript, nilai string diapit oleh tanda kutip. Ada tiga jenis tanda kutip yang dapat digunakan untuk membuat nilai string, yaitu petik tunggal (_single quote_), petik ganda (_double quote_), dan _backticks_ (tanda backtick).

```js
const name = 'JavaScript'
"Ini merupakan contoh string di " + name;
'Ini merupakan contoh string di ' + name;
`Ini merupakan contoh string di ${name}`;
```

Backticks sering disebut juga sebagai [**template literals**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) karena memungkinkan kita menyisipkan JavaScript expressions untuk membentuk nilai string menggunakan notasi `${}`.

#### Number
Semua data berupa angka direpresentasikan dalam tipe data **Number**, baik itu bilangan bulat maupun pecahan.

```js
4000
3.14
5
```

Selain angka normal, tipe data number juga memiliki nilai spesial, yaitu **Infinity** dan **NaN**. Nilai *Infinity* dihasilkan ketika kita melakukan operasi aritmetika yang tidak terdefinisi. Adapun nilai **NaN** (_Not-a-Number_) dihasilkan ketika nilai non-numerik diubah ke tipe data number.

```js
const result1 = 50 / 0; // Operasi aritmetika yang tidak terdefinisi
const result2 = Number('Dicoding'); // nilai non-numerik diubah ke tipe data number

console.log(result1); // output: Infinity
console.log(result2); // output: Nan
```

#### Boolean
**Boolean** adalah tipe data yang hanya memiliki dua nilai: **`true`** dan **`false`**. Untuk membuat nilai Boolean, kita bisa menuliskan true atau false secara langsung. Lalu Nilai Boolean juga bisa diperoleh dari hasil penggunaan operator perbandingan.

```js
const completed = true;
const passed = false;
const isGreater = 5 > 2; // Output Boolean dari perbandingan

console.log(completed, passed); // output: true false
console.log(isGreater); // output: true (5 lebih besar dari 2)
```

#### Nilai Kosong
JavaScript memiliki dua nilai spesial yang merepresentasikan nilai kosong, yaitu **`null`** dan **`undefined`**. Keduanya digunakan untuk menunjukkan ketiadaan nilai (_the absence of something_).
- **Null** banyak diadopsi dalam berbagai bahasa pemrograman sebagai tipe data standar untuk menunjukkan nilai yang tidak ada. 
- Adapun **Undefined** hadir dalam JavaScript sebagai nilai implisit ketika kita mendeklarasikan variabel tanpa menginisialisasi dengan nilai apa pun.

```js
let message1 = null;
let message2 = undefined;
let message3;

console.log(message1); // output: null
console.log(message2); // output: undefined
console.log(message3); // output: undefined
```

Sekilas, **null** dan **undefined** terlihat sama, tetapi sebenarnya mereka berbeda. Perbedaan ini dapat terlihat lebih jelas ketika kita membandingkan objek yang propertinya bernilai null dan undefined dalam format JSON :

```js
const name1 = { first: 'Dicoding', last: null };
const name2 = { first: 'Dicoding', last: undefined };

console.log(JSON.stringify(name1)); // output: {"first":"Dicoding","last":null}
console.log(JSON.stringify(name2)); // output: {"first":"Dicoding"}
```

Properti yang diberi nilai undefined tidak akan tampak ketika diubah ke JSON karena JSON tidak mendukung tipe data undefined. Oleh karena itu, null lebih standar untuk menunjukkan nilai kosong.

### Konversi Antar Tipe Data
#### Eksplisit
Konversi eksplisit adalah cara yang paling dapat diandalkan untuk mengubah tipe data karena dilakukan dengan instruksi yang jelas, alias eksplisit dari programmer.  Berikut adalah beberapa metode umum yang digunakan untuk konversi tipe data secara eksplisit.

##### String 
Untuk mengubah suatu tipe data ke bentuk string umumnya dapat dilakukan dengan dua cara, yaitu menggunakan fungsi `String()` dan _method_ `.toString()`.

```js
const number = 123;
const boolean = true;

const strNumber = String(number);
const strBoolean = boolean.toString();

console.log(strNumber); // output: "123"
console.log(strBoolean); // output: "true"
```

##### Number
Secara umum, untuk mengubah bentuk numerik, seperti “10”, “3.14” dapat dilakukan dengan menggunakan fungsi `Number()`. Selain dengan fungsi `Number()`, ada juga cara yang lebih spesifik, seperti fungsi `parseInt()` dan `parseFloat()`.

```js
const strNumber = '123';
const strFloat = '3.14';
const boolean = true;
const cm = '20cm';
const px = '64px';

const numFromString = Number(strNumber);
const floatFromString = Number(strFloat);
const numFromBoolean = Number(boolean);
const intFromCM = parseInt(cm);
const intFromPX = parseInt(px);

console.log(numFromString); // output: 123
console.log(floatFromString); // output: 3.14
console.log(numFromBoolean); // output: 1
console.log(intFromCM); // output: 20
console.log(intFromPX); // output: 64
```

##### Boolean
Untuk mengubah suatu nilai ke tipe data Boolean, kita bisa gunakan fungsi `Boolean()`.

```js
const number = 123;
const string = 'Dicoding';
const empty = null;

const boolFromNumber = Boolean(number);
const boolFromString = Boolean(string);
const boolFromNull = Boolean(empty);

console.log(boolFromNumber); // output: true
console.log(boolFromString); // output: true
console.log(boolFromNull); // output: false
```

Sebagaimana yang sudah kita ketahui bahwa **Boolean** hanya memiliki dua nilai, yaitu `true` dan `false`. Jadi seluruh nilai jika dikonversikan dalam boolean kemungkinan nilainya hanya ada dua, yaitu `true` dan `false`. Seluruh nilai yang dikonversi dalam boolean menghasilkan true disebut nilai [_truthy_](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), sedangkan sebaliknya disebut dengan [_falsy_](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).

#### Implisit
Konversi implisit terjadi ketika JavaScript secara otomatis mengubah tipe data tanpa instruksi eksplisit dari programmer. Ini biasanya terjadi dalam konteks tertentu, seperti operasi aritmetika, perbandingan, dan konteks logika.

```js
// Contoh Pertama
const age = 20;
const message = 'Umurku: ' + age;
console.log(message); // output: Umurku: 20

// Contoh Kedua
const strNumber = '123';
const result = strNumber * 2;
console.log(result); // output: 246

// Contoh Ketiga
const bool = true;
const result = 1 + bool;
console.log(result); // output: 2
```

Dalam contoh pertama, tipe data number `age` secara otomatis dikonversi menjadi string karena operator `+` digunakan untuk penggabungan string. Lalu dalam contoh kedua, `strNumber` (*yang merupakan string*) dikonversi menjadi number karena operator `*` digunakan untuk operasi aritmetika.

### Operator
**Operator** adalah simbol-simbol yang digunakan untuk melakukan operasi dalam membuat sebuah program. Ada dua istilah penting dalam melakukan sebuah operasi, yakni *operator* dan _operand_ (operan).

- ***Operator*** merupakan sebuah simbol atau teks yang digunakan untuk melakukan sebuah operasi, misalnya aritmetika, penugasan, logika, tipe data, atau operasi lain yang berhubungan dengan pemrograman.
- ***Operan*** adalah nilai yang menjadi target dari sebuah operasi.

![[Pasted image 20250128004852.png]]

Secara umum, operator dalam JavaScript terbagi menjadi tiga kelompok: ***unary***, ***binary***, dan ***ternary***. Pengelompokan ini berdasarkan jumlah operan yang diperlukan untuk menggunakan suatu operator.

Operator aritmetika, seperti + termasuk dalam kelompok operator binary karena membutuhkan dua operan. Sementara itu, operator tipe data, seperti typeof adalah operator unary karena hanya memerlukan satu operan. Adapun operator ternary tentu saja membutuhkan tiga operan. :smile:

Berikut adalah contoh kode yang menunjukkan penggunaan *unary*, *binary*, dan *ternary* operator.
```js 
let age = 25;

// Unary operator
typeof age;

// Binary operator
5 + 4;
10 / 2;
age = 30;

// Ternary operator (conditional operator)
(age < 18) ? 'You are too young!' : 'Welcome onboard!';
```

#### Assignment Operator
Operator penugasan atau _**Assignment Operator**_ adalah operator jenis *binary* yang digunakan untuk memberikan nilai kepada sebuah variabel, baik inisiasi nilai baru maupun mengubah nilai yang sudah ada. Operator ini ditulis dengan simbol sama dengan `=`. 

```js
const name = 'Dicoding';
let location = 'Bandung';
location = 'Jakarta';
```

#### Arithmetic Operator
Operator aritmetika adalah operator standar yang digunakan untuk proses aritmetika, seperti penambahan `+`, pengurangan `-`, pengailan `*`, ataupun pembagian `/`.

| Operator                       | Deskripsi                                                                                                                                                                                                                                                                                                                                                                                | Notasi                          |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Sisa bagi atau Modulus `%`     | *Binary* operator yang mengembalikan sisa hasil bagi operan kiri dan operan kanan.                                                                                                                                                                                                                                                                                                       | `operan1 % operan2`             |
| Increment `++`                 | *Unary* operator yang digunakan untuk menambahkan satu nilai terhadap operan yang diberikan. Operan harus berupa variabel yang dapat diubah nilainya.<br><br>Jika operator ini digunakan sebelum operan `++x`, ia akan mengembalikan nilai `x` yang telah ditambahkan 1. Jika operator ini digunakan setelah operan `x++`, ia akan mengembalikan nilai `x` yang belum ditambahkan 1.<br> | `++operan;` atau<br>`operan++;` |
| Decrement `--`                 | Sama seperti increment, tetapi alih-alih menambahkan, ia mengurangi nilai satu.                                                                                                                                                                                                                                                                                                          | `--operan; `atau<br>`operan--;` |
| Eksponensial atau Pangkat `**` | *Binary* operator yang menghitung `x` (basis) dengan pangkat `y` (eksponen). Bentuk matematika: `x ^ y`.                                                                                                                                                                                                                                                                                 | `operan1 ** operan2`            |

```js
6 + 5; // mengembalikan 11
7 - 2; // mengembalikan 5
8 * 5; // mengembalikan 40
10 / 3; // mengembalikan 3.33
10 % 2; // mengembalikan 0
2 (10 + 2); // mengembalikan 24
```

#### Comparison Operator
**Operator Perbandingan** adalah operator yang digunakan untuk membandingkan dua nilai dan mengembalikan nilai boolean (`true` atau `false`) sebagai hasil perbandingan.

| Operator                          | Deskripsi                                                                                                                                                | Notasi                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Sama `==`                         | Membandingkan dua operan, tanpa memperhatikan tipe data. Jika nilai kedua operan dianggap sama, operasi akan mengembalikan true, sebaliknya false.       | `operan1 == operan2`  |
| Tidak Sama `!=`                   | Membandingkan dua operan, tanpa memperhatikan tipe data. Jika nilai kedua operan dianggap tidak sama, operasi akan mengembalikan true, sebaliknya false. | `operan1 != operan2`  |
| Identik `===`                     | Membandingkan dua operan beserta tipe datanya. Jika kedua operan identik, operasi akan mengembalikan true, sebaliknya false.                             | `operan1 === operan2` |
| Tidak Identik `!==`               | Membandingkan dua operan beserta tipe datanya. Jika kedua operan tidak identik, operasi akan mengembalikan true, sebaliknya false.                       | `operan1 !== operan2` |
| Lebih dari `>`                    | Membandingkan dua operan, apakah operan pertama lebih dari operan kedua? Jika pernyataan benar, mengembalikan true, sebaliknya false.                    | `operan1 > operan2`   |
| Lebih dari atau Sama dengan `>=`  | Membandingkan dua operan, apakah operan pertama lebih dari atau sama dengan operan kedua? Jika pernyataan benar, mengembalikan true, sebaliknya false.   | `operan1 >= operan2`  |
| Kurang dari `<`                   | Membandingkan dua operan, apakah operan pertama kurang dari operan kedua? Jika pernyataan benar, mengembalikan true, sebaliknya false.                   | `operan1 < operan2`   |
| Kurang dari atau Sama dengan `<=` | Membandingkan dua operan, apakah operan pertama kurang dari atau sama dengan operan kedua? Jika pernyataan benar, mengembalikan true, sebaliknya false.  | `operan1 <= operan2`  |

```js
// Operator Perbandingan
const a = 10;
const b = 12;

// Sama (==)
console.log(1 == 1); // mengembalikan true
console.log(1 == '1'); // mengembalikan true
console.log(2 == 6); // mengembalikan false
console.log('Dicoding' == 'dicoding'); // mengembalikan false

// Tidak Sama (!=)
console.log(1 != 1); // mengembalikan false
console.log(1 != '1'); // mengembalikan false
console.log(2 != 6); // mengembalikan true
console.log('Dicoding' != 'dicoding'); // mengembalikan true

// Identik (===)
console.log(1 === 1); // mengembalikan true
console.log(1 === '1'); // mengembalikan false
console.log(2 === 6); // mengembalikan false
console.log('Dicoding' === 'dicoding'); // mengembalikan true

// Tidak Identik (!==)
console.log(1 !== 1); // mengembalikan false
console.log(1 !== '1'); // mengembalikan true
console.log(2 !== 6); // mengembalikan true
console.log('Dicoding' !== 'dicoding'); // mengembalikan false

// Lebih dari (>)
console.log(4 > 2); // mengembalikan true
console.log(4 > 5); // mengembalikan false
console.log(4 > 4); // mengembalikan false

// Lebih dari atau Sama dengan (>=)
console.log(4 >= 2); // mengembalikan true
console.log(4 >= 5); // mengembalikan false
console.log(4 >= 4); // mengembalikan true

// Kurang dari (<)
console.log(4 < 2); // mengembalikan false
console.log(4 < 5); // mengembalikan true
console.log(4 < 4); // mengembalikan false

// Kurang dari atau Sama dengan (<=)
console.log(4 <= 2); // mengembalikan false
console.log(4 <= 5); // mengembalikan true
console.log(4 <= 4); // mengembalikan true
```

---

#### Logical Operator
**Operator Logika** digunakan untuk menetapkan logika dari dua nilai operan Boolean. Dengan operator logika, kita bisa melakukan operasi [gerbang logika](https://www.dicoding.com/blog/gerbang-logika-dan-tabel-kebenaran/), seperti `AND` dan `OR`. Operator logika dapat digunakan untuk menetapkan logika yang lebih kompleks.

| Operator | Deskripsi                                                                                                                                                                                        | Notasi                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| AND `&&` | Binary operator yang menghasilkan nilai `true` apabila kedua operan bernilai `true` (atau *truthy*). Jika salah satu operan bernilai `false` (atau *falsy*), operasi akan mengembalikan `false`. | `operand1 && operand2` |
| OR `\|`  | Binary operator yang menghasilkan nilai `true` apabila salah satu operan bernilai `true` (atau *truthy*). Jika kedua operan bernilai false (`atau` *falsy*), operasi akan mengembalikan `false`. | `operand1 \| operand2` |
| NOT `!`  | Unary operator yang mengubah operan bernilai `true` menjadi `false` dan `false` menjadi `true`.                                                                                                  | `!operan`              |

```js
// AND
console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false
console.log((5 === 5) && (3 < 5)); // true
 
// OR
console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false
console.log((5 === 5) || (3 > 5)); // true
 
// NOT
console.log(!true); // false
console.log(!false); // true
```
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf
# header slasdsjaf