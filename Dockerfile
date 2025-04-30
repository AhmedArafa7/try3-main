# Step 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

# نسخ ملفات package.json لتثبيت التبعيات
COPY package*.json ./
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# بناء نسخة الإنتاج
RUN npm run build --configuration=production

# Step 2: Serve with Nginx
FROM nginx:alpine

# نسخ ملفات البناء إلى مجلد Nginx
COPY --from=build /app/dist/bais /usr/share/nginx/html

# نسخ إعدادات Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
