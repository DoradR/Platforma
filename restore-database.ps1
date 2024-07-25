$pg_dump_file = Join-Path -Path $PSScriptRoot -ChildPath "backup.sql"
$db_name = "platforma"
$db_user = "postgres"
$db_password = "your_password"
$db_host = "localhost"
$db_port = "5432"

$env:PGPASSWORD = $db_password

$psql_path = "C:\Program Files\PostgreSQL\15\bin\psql.exe"
$psql_command = "`"$psql_path`" -h $db_host -p $db_port -U $db_user -d $db_name -f `"$pg_dump_file`""

Start-Process -FilePath $psql_path -ArgumentList "-h $db_host -p $db_port -U $db_user -d $db_name -f `"$pg_dump_file`"" -NoNewWindow -Wait

$env:PGPASSWORD = $null
