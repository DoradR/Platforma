# Ustawienia
$pg_dump_file = Join-Path -Path $PSScriptRoot -ChildPath "backup.sql"
$db_name = "platforma"
$db_user = "postgres"
$db_password = "your_password"
$db_host = "localhost"
$db_port = "5432"

# Ustawienie zmiennej środowiskowej dla hasła (dla wygody, niezalecane w środowisku produkcyjnym)
$env:PGPASSWORD = $db_password

# Przywrócenie bazy danych przy użyciu psql
$psql_path = "C:\Program Files\PostgreSQL\15\bin\psql.exe"
$psql_command = "`"$psql_path`" -h $db_host -p $db_port -U $db_user -d $db_name -f `"$pg_dump_file`""

# Start-Process do wykonania psql
Start-Process -FilePath $psql_path -ArgumentList "-h $db_host -p $db_port -U $db_user -d $db_name -f `"$pg_dump_file`"" -NoNewWindow -Wait

# Wyczyść zmienną środowiskową
$env:PGPASSWORD = $null
