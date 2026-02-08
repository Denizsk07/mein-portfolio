# Deployment Guide: MongoDB Atlas + GitHub + Vercel

Dieses Dokument erklärt dir Schritt für Schritt, wie du deine Datenbank erstellst und die Seite online bringst.

## 1. MongoDB Atlas (Deine Datenbank)
Da du lokal keine Datenbank hast, brauchst du eine in der Cloud (kostenlos).

1.  Gehe auf [mongodb.com](https://www.mongodb.com/) und registriere dich (kostenlos).
2.  Erstelle ein neues Projekt (Name egal).
3.  Erstelle einen **Cluster** (Wähle "M0 Sandbox" / "Shared" -> das ist dauerhaft kostenlos).
4.  Gehe auf **Database Access** (links im Menü):
    *   Erstelle einen User (z.B. `admin`).
    *   Gib ihm ein Passwort (z.B. `DeinSicheresPasswort123`). **Merk dir das!**
5.  Gehe auf **Network Access** (links im Menü):
    *   Klicke auf "Add IP Address".
    *   Wähle "Allow Access from Anywhere" (`0.0.0.0/0`). (Wichtig für Vercel!).
6.  Gehe zurück auf **Database** (links) -> Klicke auf **Connect**.
    *   Wähle "Drivers".
    *   Kopiere den "Connection String". Er sieht so aus:
        `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
    *   Ersetze `<password>` durch dein echtes Passwort.
    *   Das ist deine `MONGO_URI`.

---

## 2. GitHub (Dein Code)
Welcher Ordner? **Der ganze Ordner `webseite-master`**.

1.  Erstelle ein neues Repository auf GitHub (z.B. `portfolio-website`).
2.  Lade deinen **ganzen Ordner** dort hoch (oder nutze Git Desktop / Terminal).
    *   *Tipp: Die Datei `.env.local` und der Ordner `node_modules` werden NICHT hochgeladen (das ist richtig so).*

---

## 3. Vercel (Deine Webseite)
1.  Gehe auf [vercel.com](https://vercel.com/) und logge dich mit GitHub ein.
2.  Klicke "Add New Project".
3.  Importiere dein GitHub Repository (`portfolio-website`).
4.  **WICHTIG**: Scrolle runter zu **Environment Variables**.
    *   Key: `MONGO_URI`
    *   Value: *Dein Connection String aus Schritt 1* (mit dem echten Passwort!).
5.  Klicke auf **Deploy**.

---

## Fertig! 🚀
Vercel baut jetzt deine Seite. Wenn es fertig ist, bekommst du eine URL (z.B. `deniz-kaya-portfolio.vercel.app`).
Dort funktioniert dann auch der Admin-Login und der Upload, weil die Datenbank jetzt online ist.
