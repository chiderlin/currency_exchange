import app from './app';
const PORT = process.env.PORT || 8000;
const HOST = '127.0.0.1';

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
