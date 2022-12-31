# Tubes 2 Epify - Rest
> Halo! Selamat datang di repository Rest Service!

Repository engine ini dibuat untuk memenuhi **Tugas Besar Mata Kuliah IF3110 Pengembangan Aplikasi Berbasis Web** yang ke-2 pada Semester II Tahun Akademik 2022/2023. 

## Table of Contents
- [Tubes 2 Epify - Rest](#tubes-2-epify---rest)
  - [Table of Contents](#table-of-contents)
  - [Deskripsi](#deskripsi)
  - [Skema Basis Data](#skema-basis-data)
  - [Cara Instalasi](#cara-instalasi)
  - [Daftar Endpoint](#daftar-endpoint)
  - [Pembagian Tugas](#pembagian-tugas)

## Deskripsi
Rest Service adalah gaya arsitektur yang digunakan ketika ingin membuat sebuah *web service*. Implementasinya sendiri pada tubes ini adalah untuk menangani pengelolaan lagu premium oleh seorang penyanyi, mengautentikasi pengguna, database, endpoint list penyanyi, dan juga endpoint list lagu dari penyanyi. Dengan adanya rest ini, *client-side* dan juga *server-side* akan berjalan secara terpisah, tetapi tetap beriringan. 

## Skema Basis Data
![image](/readme_img/skema_basisdata.png)

## Cara Instalasi
1. Clone repository ini ke local
2. Buka terminal dari repository ini

3.  Terdapat konfigurasi yang IP yang perlu diatur secara dinamis dikarenakan _dependencies_ **docker** yang diimplementasikan secara sebagian sehingga komunikasi dari local host ke docker container host harus dilakukan secara manual dari konfigurasi IP. SOAP service yang dijalankan akan menghasilkan output di terminal sebagai berikut
    ```
    Epify Web Service is running
    IP Address: 192.168.14.171
    Dec 02, 2022 9:01:28 AM com.sun.xml.ws.server.MonitorBase createRoot
    . . .
    ```
    Copy `IP Address` yang bersesuaian dan pindahkan ke `.env` repository REST pada key `SOAP_IP_ADDR`, penggantian ini memungkinkan REST service berkomunikasi dengan SOAP service.

    Contoh file `.env`
    ```py
    (other env variables)
    . . .
    API_KEY_REST = '*****'
    CLIENT_TYPE_REST = '********'
    SOAP_IP_ADDR="192.168.14.171"
    ```
4. Nyalakan *docker*
5. Ketik ```docker-compose up``` pada terminal
6. REST service akan berjalan pada address `localhost:8083`

## Daftar Endpoint
Endpoint | Payload | Response 
--- | --- | --- 
`POST /auth/login` | email, password | status, message
`POST /auth/register` | email, password, username, name | status, message
`DELETE /auth/delete_token` | - | status, message, {err}
`GET /penyanyi/geListPenyanyi` | - | status, message, content
`GET /penyanyi/geListLaguPenyanyi` | penyanyi_id, user_id | status, message, content
`GET /premiumSong/getpremiumSongDetailById` | song_id | status, message, content
`GET /premiumSong/getpremiumSongDetailById` | song_id | status, message, content
`POST /premiumSong/createPremiumSong` | judul, penyanyi_id, audio_path | status, message
`PUT /premiumSong/updatePremiumSong` | song_id, judul, audio_path | status, message
`DELETE /premiumSong/deletePremiumSong` | song_id | status, message
`POST /subscription/acceptSubscriptionSoap` | creator_id, subscriber_id | status, message
`POST /subscription/rejectSubscriptionSoap` | creator_id, subscriber_id | status, message
`POST /subscription/createSubscriptionSoap` | creator_id, subscriber_id | status, message
`POST /subscription/listSubscriptionSoap` | {creator_id}, {subscriber_id} | status, message

> NB : {} adalah opsional



## Pembagian Tugas
| Fitur | NIM |
| ----- | --- |
| Autentikasi | 13520109 |
| Penyanyi | 13520109, 13520088 |
| Lagu premium | 13520109, 13520142 |
| Subscription | 13520109, 13520088 |
