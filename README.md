PUSH
pnpm build
git add -f public/build
git commit -m "..."
git push origin main

PULL
cd ~/gabinetpodologicznaoaza.pl/laravel
git pull origin main
cp -a public/build ../public_html/
