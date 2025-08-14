# financeApp

Personal Finance App – Implementirani modeli i API

1. Users
   Model (UserModel)

Polja: \_id, email, password, fullName, verified, createdAt, updatedAt

Metode: comparePassword, omitPassword

Indeksi: email (jedinstven)

Password se hashira pre save.

2. Categories
   Model (CategoryModel)

Polja: \_id, name

Indeksi: name (jedinstven)

API

GET /categories – dobavljanje svih kategorija

POST /categories – dodavanje nove kategorije

3. Themes
   Model (ThemeModel)

Polja: \_id, name

Indeksi: name (jedinstven)

API

GET /themes – dobavljanje svih tema

POST /themes – dodavanje nove teme

4. Budgets
   Model (BudgetModel)

Polja: \_id, userId, categoryId, limit, themeId, createdAt

Indeksi: kombinovani (userId + categoryId), (userId + themeId)

API

POST /budgets – dodavanje budžeta (provera da li je kategorija ili tema već u upotrebi za korisnika)

GET /budgets – vraća budžete sa poljem spent (zbir svih expense transakcija u tekućem mesecu po kategoriji)

PUT/PATCH /budgets/:id – izmena budžeta (provera postojanja kategorije/teme i zauzetosti)

DELETE /budgets/:id – brisanje budžeta

5. Transactions
   Model (TransactionModel)

Polja: \_id, userId, type, amount, account, categoryId, date, isRecurring, dueDate, createdAt, updatedAt

Indeksi: kombinovani (userId + categoryId), (userId + date desc), tekst indeks account

API

GET /transactions – paginacija po 10, sortiranje (Latest, Oldest, A-Z, Z-A, Highest, Lowest), filter po kategoriji, search po account

POST /transactions – dodavanje nove transakcije (zod validacija uključujući isRecurring i dueDate)

PUT/PATCH /transactions/:id – izmena transakcije (support za delimične izmene)

DELETE /transactions/:id – brisanje transakcije

6. Validacije
   Koristi se Zod za sve ulazne podatke (add/edit transaction, add/edit budget, query parametre za transakcije)

Globalni error handler za Zod validacije

Transformacije i refine metode omogućavaju konverziju stringova u brojeve, validaciju ObjectId i validaciju dueDate (1–28)

7. Ostale napomene
   Za spent u budžetima koristimo agregaciju (TransactionModel.aggregate) za izračunavanje suma po kategoriji za tekući mesec

Frontend lako može izračunati total limit i total spent

Svuda gde postoji povezanost sa drugim modelom (categoryId, themeId) koristimo .populate() za vraćanje name
