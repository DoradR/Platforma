<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="application-installation-instructions">Application installation instructions</h1>
<p>Instructions for the Platform application, a web application that includes blogging, online course sales and live streaming capabilities. The application designed for the purpose of engineering work.<br>
In order to install the application and fully configure it, we need to install several applications. I recommend reading the instructions to the end and then going step by step through the instructions.</p>
<h2 id="installation-files">Installation files</h2>
<p>The application is designed in Python and JavaScript languages, the database that is used for the application is PostgreSQL, for this you need to download their respective versions:</p>
<ol>
<li><strong>Python</strong> version 3.11.2 <a href="https://www.python.org/downloads/release/python-3112/">Link to page</a>, depending on the operating system, select the appropriate link at the bottom of the page.</li>
<li><strong>Node.js</strong> version 18.15.0 <a href="https://nodejs.org/en/blog/release/v18.15.0">Link to the page</a>, depending on the operating system we choose the appropriate link at the bottom of the page.</li>
<li><strong>PostgreSQL</strong> version 15 <a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads">Link to the page</a>, depending on the operating system, we choose the version 15 and the appropriate link for our operating system.</li>
</ol>
<blockquote>
<p><strong>It is very important to remember your PostgreSQL password when installing it.</strong></p>
</blockquote>
<p>We will also need a code editor. I used <strong>Visual Studio Code</strong>, it is not required however recommended by me. To download and install, please click on this <a href="https://code.visualstudio.com/Download">link</a>.</p>
<h2 id="changes-in-code-to-configure">Changes in code to configure</h2>
<p>You need to open the entire <strong>Platform</strong> folder using our code editor. Then, in the code editor, we open the file<br>
<code>run-script.ps1</code> and in line 19 of the code, instead of <code>“your_password”</code>, we enter our password that we entered during the installation of PostgreSQL also in double quotes.  Then we go to the <code>restore-database.ps1</code> file and in line 4 we also change to our superuser password. This is necessary to completely restore the sample database. Also make sure that in line 10 of <code>restore-database.ps1</code> this path leads to our folder where we installed the <strong>PostgreSQL</strong> application.</p>
<blockquote>
<p>That is, if our password that we entered during PostgreSQL installation is password then we replace “your_password” with “password”.</p>
</blockquote>
<h2 id="application-configuration">Application configuration</h2>
<p>In our code editor we open a new terminal, at the moment when we are on the path <strong>C:\ …\Platform</strong>, where the 3 dots represent our remaining path to this folder, then we type in the terminal <code>.run-script.ps1</code> , the file will start executing, the whole setup may take up to 5min depending on the power of our computer and the Internet. At the moment when we get on the terminal:</p>
<pre><code>Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
</code></pre>
<p>This means that our application is running and we can go to its <a href="http://127.0.0.1:8000/">page</a> .</p>
<h2 id="possible-errors">Possible errors</h2>
<ol>
<li>
<p>A fairly common problem may be that environment variables were not added during PostgreSQL installation. To do this, please check them by opening <strong>Edit System Environment Variables</strong> &gt; <strong>Advanced</strong> &gt; <strong>Environment Variables…</strong> &gt; <strong>User Variables for ‘User Name’</strong> &gt; <strong>Path</strong> &gt; Check if you have these paths:<br>
C:Program Files &gt; **PostgreSQL.<br>
C:Program Files\NPostgreSQL15lib.</p>
<p>If you don’t have them, you should add them, of course, if during the installation of PostgreSQL you have chosen the destination of the installation as C:\Program Files, if other then adequately. After adding these paths we save.</p>
</li>
<li>
<p>The second quite common problem, on the other hand, may be that the PostgreSQL service did not automatically turn on during the installation. You should check this on your computer by opening <strong>Services</strong> and search for postgresql to check its status, it must be set as <strong>Active</strong>.</p>
</li>
<li>
<p>If you already had PostgreSQL and have a database with the name <strong>platform</strong> stored in it, open the file <code>run-script.ps1</code> in our code editor and in line 20 and 22 change the name of the platform to something else. Then go in the project to <strong>backend</strong> &gt; <strong>backend</strong> &gt; <strong><a href="http://settings.py">settings.py</a></strong> and in the 101 line of code also change the name of the database.</p>
</li>
</ol>
<h2 id="logging-into-the-application">Logging into the application</h2>
<p>The application contains a basic database. After turning on our application, we can log into it through two users.</p>
<ol>
<li><strong>Admin:</strong>.<br>
Email: <a href="mailto:admin@email.com">admin@email.com</a><br>
Password: Admin12345!</li>
<li><strong>User:</strong>.<br>
Email: <a href="mailto:user@email.com">user@email.com</a><br>
Password: User12345!</li>
</ol>
<p>Admin has more options such as adding, editing and deleting Articles, Products (Video Courses), and editing Orders and Users. The application itself has email configured on GMAIL application.</p>
</div>
</body>

</html>
