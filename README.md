# 🎒 Smart Belongings System Using NFC

A smart school system for managing lost belongings using NFC technology, ESP32, and Google Sheets.

---

# 📌 Project Idea

The project aims to reduce the loss of school belongings by attaching NFC tags to each item and linking them to a smart digital system.

The system allows:
- Parents to search for belongings using the student ID number.
- School administration to scan items using NFC and update their delivery status instantly.

---

# 🚀 Features

✅ Parent inquiry system  
✅ Admin dashboard  
✅ NFC tag scanning  
✅ ESP32 integration  
✅ Google Sheets database  
✅ Real-time updates  
✅ Item delivery tracking  
✅ Lost belongings management  

---

# 🛠 Technologies Used

- ESP32
- RC522 NFC Reader
- NFC Tags
- Google Apps Script
- Google Sheets
- HTML / CSS / JavaScript
- WiFi Communication

---

# 📂 Project Files

```text
Code.gs
index.html
admin.html
home.html
ESP32.ino
README.md
```

---

# ⚙️ System Workflow

1. Attach an NFC tag to each belonging.
2. Store item data in Google Sheets.
3. Scan the item using RC522 + ESP32.
4. ESP32 sends UID to Google Apps Script.
5. Admin dashboard displays item details.
6. Parent can search using student ID.
7. Admin updates status to:
   "Delivered"

---

# 🖥 System Interfaces

## 👨‍👩‍👧 Parent Inquiry Page
- Search using student ID
- View belongings
- View item images
- Check delivery status

## 🛠 Admin Dashboard
- Secure admin access
- NFC scanning
- Display item information
- Mark items as delivered

---

# 📡 Hardware Components

- ESP32
- RC522 NFC Reader
- NFC Tags
- WiFi Network

---

# 📈 Expected Impact

- Reduce lost belongings in schools
- Improve communication with parents
- Speed up item identification
- Support digital transformation in education
- Low-cost smart school solution

---

# 👩‍💻 Developed By

Nouf Abdullah Khabti

---

# 🔗 Live Demo

Parent Inquiry:
```text
https://script.google.com/macros/s/AKfycbyN8oVP-V2-Ywt2Tv9ZsXN3kF12OlVgBLvkEwJc5tj5PcETwrcjGWp3n0_97aa_saRsmg/exec?page=parent
```

Admin Dashboard:
```text
https://script.google.com/macros/s/AKfycbyN8oVP-V2-Ywt2Tv9ZsXN3kF12OlVgBLvkEwJc5tj5PcETwrcjGWp3n0_97aa_saRsmg/exec?page=admin
```
