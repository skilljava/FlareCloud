// سرور Express
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// --- Middlewares ---
// برای سرویس دهی فایل های استاتیک (مثل CSS و جاوا اسکریپت)
app.use(express.static(path.join(__dirname)));
// برای پارس کردن اطلاعات فرم‌ها (POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// --- 1. Routing صفحات اصلی (GET Requests) ---

// صفحه اصلی
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// صفحه ورود
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth.html'));
});

// صفحه ثبت نام
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});


// --- 2. مدیریت فرم های ورود و ثبت نام (POST Requests - منطق بک‌اند) ---

// دریافت اطلاعات فرم ورود از auth.html
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`درخواست ورود: نام کاربری: ${username}`);
    
    // در اینجا باید اعتبار سنجی با دیتابیس انجام شود
    if (username === 'test' && password === '12345') {
        res.send('<h1>ورود موفقیت آمیز!</h1> <p>خوش آمدید، ' + username + '</p> <a href="/">بازگشت به خانه</a>');
    } else {
        res.send('<h1>خطا در ورود!</h1> <p>نام کاربری یا رمز عبور اشتباه است.</p> <a href="/auth">بازگشت به صفحه ورود</a>');
    }
});

// دریافت اطلاعات فرم ثبت نام از register.html
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log(`درخواست ثبت نام: ${email}`);
    
    // در اینجا باید منطق ذخیره در دیتابیس اضافه شود
    res.send(`<h1>ثبت نام با موفقیت انجام شد!</h1><p>کاربر ${username} با ایمیل ${email} ثبت شد.</p><a href="/auth">ورود به حساب کاربری</a>`);
});


// --- شروع گوش دادن سرور ---
app.listen(PORT, () => {
    console.log(`سرور Flare Cloud در پورت ${PORT} در حال اجراست: http://localhost:${PORT}`);
});
