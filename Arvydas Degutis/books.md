### Užduotis: Knygų ir autorių valdymo sistema `Express.js`

#### Tikslas

Sukurti `Express.js` pagrindu veikiančią knygų ir autorių valdymo sistemą, kuri apima:

- **CRUD funkcionalumą** tiek knygoms, tiek autoriams.
- **Autorizaciją** su registracijos, prisijungimo, ir prieigos valdymo funkcijomis.
- **Duomenų validaciją** (knygų ir autorių duomenų tikrinimas).
- **Klaidos valdymą** (kartu su išsamiais atsakymais apie klaidas).
- **Ryšį tarp knygų ir autorių**, kad kiekviena knyga turėtų savo autorių, o autorius galėtų turėti kelias knygas.

---

### Reikalavimai

1. **Technologijos:**

   - `Node.js` su `Express.js`.
   - Duomenų bazė: `PostgreSQL`.
   - **Autorizacija:** `JWT` token, cookies.
   - **Validacija:** panaudokite biblioteką`express-validator`.
   - **Klaidų valdymas:** centralizuotas klaidų valdymas su tinkamais HTTP statuso kodais ir pranešimais kokia klaida įvyko.

2. **Knygų modelis/lentelė:**
  - `title` (string, privaloma, bent 3 simboliai).
  - `summary` (string, neprivaloma).
  - `isbn` (unikalus string, privaloma, 10 skaitmenų, negali turėti tarpų ar specialiųjų simbolių, gali turėti vidurinius brūkšniukus "-", negali turėti raidžių, tik skaitmenis).
  - `authorId` (nuoroda į autoriaus id, max 3 skaičiai privaloma).

3. **Autorių modelis/lentelė:**
   - `name` (string, privaloma, bent 2 simboliai).
   - `birthDate` (data, privaloma, formatu YYYY-MM-DD).
   - `biography` (string, neprivaloma, ne daugiau kaip 150 simbolių).

4. **Vartotojų modelis/lentelė (autorizacijai):**
   - `username` (unikalus string, privaloma).
   - `password` (hashed string, privaloma).
   - `role` ("user", "admin").

---

### Funkcionalumas

1. **Autorizacija:**

   - Registracija (`POST /auth/register`): naujo vartotojo sukūrimas. ** 1 taškas **
   - Prisijungimas (`POST /auth/login`): JWT generavimas tik prisijungus. ** 2 taškai **
   - Tik vartotojai su vaidmeniu `admin` gali kurti, atnaujinti ir trinti autorius ar knygas. ** 2 taškai **

2. **CRUD operacijos:**

   - **Autoriai:**
     - `GET /authors`: Gauti visų autorių sąrašą. ** 0.5 taškas **
     - `GET /authors/:id`: Gauti autoriaus informaciją pagal ID. ** 0.5 taškas **
     - `POST /authors`: Sukurti naują autorių (tik admin). ** 0.5 taškas **
     - `PATCH /authors/:id`: Atnaujinti autoriaus informaciją (tik admin). ** 0.5 taškas **
     - `DELETE /authors/:id`: Ištrinti autorių (tik admin). ** 0.5 taškas **
   - **Knygos:**
     - `GET /books`: Gauti visų knygų sąrašą. ** 0.5 taškas **            + 
     - `GET /books/:id`: Gauti knygos informaciją pagal ID. ** 0.5 taškas **         + 
     - `POST /books`: Sukurti naują knygą (tik admin). ** 0.5 taškas **
     - `PATCH /books/:id`: Atnaujinti knygos informaciją (tik admin). ** 0.5 taškas **
     - `DELETE /books/:id`: Ištrinti knygą (tik admin). ** 0.5 taškas **

3. **DB Ryšiai:**

   - Sukuriant knygą, būtina nurodyti autoriaus ID. Jei toks autorius neegzistuoja, sistema turi grąžinti klaidą.  ** 1 taškas **
   - Užklausose apie knygas (`GET /books` ir `GET /books/:id`) turi būti grąžinama knygos informacija, su pilna autoriaus informacija. ** 2 taškai **
   -Užklausose apie autorius (`GET /authors` ir `GET /authors/:id`) turi būti grąžinama autoriaus informacija, su jo knygų sąrašu. ** 2 taškai **

5. **Paieška ir filtravimas:**

   - Galimybė ieškoti knygų pagal pavadinimą kai paieškos frazė yra knygos pavadinime, bet nebūtinai tai visas pavadinimas (`GET /books?title=...`). ** 2 taškai **
   - Filtravimas pagal autorių, atrenkant konkretaus autoriau knygas (`GET /books?authorId=...`). ** 2 taškai **

6. **Puslapiavimas:**

   - Realizuoti puslapiavimą knygų sąraše (`GET /books?page=1&limit=10`). ** 1 taškas**

---

### Pristatymas:

1. Pateikite kodo github nuorodą teams platformoje, prie užduoties.

2. Ten pat pateikite testavimo postman'e endpointus, išeksportuokite ir prisekite failą iš postman į teams.

3. Viso galima surinkti 20 taškų, tai atitinka 10 balų.



