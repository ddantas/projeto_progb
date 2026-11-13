

sudo apt update
## Apache
sudo apt install apache2 -y
sudo systemctl enable apache2
sudo systemctl start apache2

## PostgreSQL
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql
sudo systemctl start postgresql

## npx
sudo apt install npm
npm install pg tsx
