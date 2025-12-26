# 🚀 Quick Deploy Guide

Швидкі інструкції для деплою сайту на GitHub та Cloudflare Pages.

---

## ✅ Що вже зроблено:

1. ✅ Git repository initialized
2. ✅ Initial commit created
3. ✅ Remote repository configured (https://github.com/HennyWill/hennywill.com.git)

---

## 📝 Крок 1: Створи GitHub репозиторій

1. Йди на [GitHub](https://github.com/new)
2. Створи новий **public** репозиторій з назвою: `hennywill.com`
3. **НЕ** ініціалізуй з README, .gitignore або license (вже є в проекті)
4. Натисни "Create repository"

---

## 📤 Крок 2: Push на GitHub

Виконай в терміналі:

```bash
cd /Users/hennywill/Documents/website
git push -u origin main
```

Якщо попросить авторизацію:
- Використай Personal Access Token (не пароль!)
- Або використай SSH key

**Перевір:** Відкрий https://github.com/HennyWill/hennywill.com - файли мають з'явитись

---

## ☁️ Крок 3: Deploy на Cloudflare Pages

### 3.1 Підключи GitHub

1. Йди на [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Вибери "Workers & Pages" в меню зліва
3. Натисни "Create application"
4. Вибери таб "Pages"
5. Натисни "Connect to Git"
6. Авторизуй Cloudflare в GitHub (якщо ще не зробив)
7. Вибери репозиторій `hennywill.com`
8. Натисни "Begin setup"

### 3.2 Налаштуй Build Settings

**Project name:** `hennywill`

**Production branch:** `main`

**Framework preset:** None

**Build command:** (залиш порожнім)

**Build output directory:** `/`

**Root directory:** (залиш порожнім)

**Environment variables:** Не потрібні

### 3.3 Deploy!

1. Натисни "Save and Deploy"
2. Зачекай 1-2 хвилини
3. Отримаєш URL типу: `hennywill.pages.dev`

---

## 🌐 Крок 4: Підключи Custom Domain

### Якщо домен вже на Cloudflare:

1. В Cloudflare Pages, йди в свій проект
2. Вкладка "Custom domains"
3. Натисни "Set up a custom domain"
4. Введи `hennywill.com`
5. Cloudflare автоматично налаштує DNS
6. Натисни "Activate domain"
7. Зачекай 5-10 хвилин для SSL

### Якщо домен НЕ на Cloudflare:

**Варіант А: Перенеси домен на Cloudflare (Рекомендується)**
1. Додай домен в Cloudflare
2. Зміни nameservers у свого реєстратора на Cloudflare nameservers
3. Зачекай propagation (до 24 годин)
4. Потім додай custom domain в Cloudflare Pages

**Варіант Б: Залиш на поточному DNS**
1. У свого DNS провайдера додай CNAME запис:
   ```
   Type: CNAME
   Name: @
   Value: hennywill.pages.dev
   ```
2. І для www subdomain:
   ```
   Type: CNAME
   Name: www
   Value: hennywill.pages.dev
   ```

---

## ✅ Checklist після деплою:

- [ ] Сайт відкривається на `https://hennywill.pages.dev`
- [ ] Сайт відкривається на `https://hennywill.com` (якщо custom domain)
- [ ] SSL сертифікат активний (🔒 в браузері)
- [ ] Фото завантажується
- [ ] GitHub projects відображаються
- [ ] Всі посилання працюють
- [ ] Mobile version виглядає добре

---

## 🧪 Тестування Performance

Після деплою протестуй:

1. **Google PageSpeed Insights:**
   - https://pagespeed.web.dev/
   - Введи свій URL
   - Перевір Mobile та Desktop scores

2. **Lighthouse в Chrome:**
   - Відкрий сайт в Chrome
   - F12 → Lighthouse tab
   - "Generate report"
   - Цілі: Performance 95+, всі інші 100

3. **Mobile Test:**
   - Відкрий на телефоні
   - Перевір responsive design

---

## 🔄 Як оновлювати сайт

В майбутньому, щоб оновити сайт:

```bash
# Зроби зміни в файлах
git add .
git commit -m "Update: опис змін"
git push
```

Cloudflare автоматично задеплоїть нову версію за 1-2 хвилини!

---

## 🆘 Troubleshooting

### Проблема: Git push не працює
**Рішення:**
```bash
# Використай SSH замість HTTPS
git remote set-url origin git@github.com:HennyWill/hennywill.com.git
git push -u origin main
```

### Проблема: Custom domain не працює
**Рішення:**
- Зачекай до 24 годин для DNS propagation
- Перевір DNS налаштування: `dig hennywill.com`
- Очисти browser cache (Ctrl+Shift+R)

### Проблема: GitHub projects не з'являються
**Рішення:**
- Перевір browser console (F12)
- Можливо rate limit GitHub API - зачекай 1 годину
- LocalStorage кеш - очисти і перезавантаж

---

## 📊 Після деплою

1. **Submit to Search Engines:**
   - [Google Search Console](https://search.google.com/search-console)
   - Submit sitemap: `https://hennywill.com/sitemap.xml`

2. **Analytics (опціонально):**
   - Додай Google Analytics або Plausible
   - Tracking code вже готовий в script.js (рядок 238)

3. **Monitor:**
   - Cloudflare Analytics (вбудований)
   - Google Search Console для SEO

---

**Готово! Твій сайт буде live на Cloudflare Pages! 🎉**

Питання? Перевір [DEPLOYMENT.md](DEPLOYMENT.md) для детальних інструкцій.
