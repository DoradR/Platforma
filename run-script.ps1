python -m venv myenv
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
myenv\scripts\activate

cd backend
pip install agora-token-builder==1.0.0
pip install asgiref==3.7.2
pip install Django==4.2.2
pip install django-cors-headers==4.0.0
pip install djangorestframework==3.14.0
pip install djangorestframework-simplejwt==5.2.2
pip install Pillow==9.5.0
pip install psycopg2==2.9.9
pip install PyJWT==2.7.0
pip install pytz==2023.3
pip install sqlparse==0.4.4
pip install tzdata==2023.3
cd..
$env:PGPASSWORD = "your_password"
psql -U postgres -d postgres -c "CREATE DATABASE platforma;"
psql -U postgres -d postgres -c "CREATE USER django WITH PASSWORD 'password';"
psql -U postgres -d postgres -c "ALTER DATABASE platforma OWNER TO django;"

.\restore-database.ps1

cd backend
# python manage.py makemigrations
cd frontend
npm install
npm run build

cd.. 
python manage.py runserver