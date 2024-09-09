<?php

	namespace App\Model;

	use PDO;

	use Dotenv\Dotenv;

	class connectDB {
		private $server;
		private $dbname;
		private $user;
		private $pass;

		protected function connect() {
			try {
				$dotenv = Dotenv::createImmutable(__DIR__, null, true);
				$dotenv->load();

				$this->server = $_ENV['SERVER'] ?: getenv('SERVER');
				$this->dbname = $_ENV['DBNAME'] ?: getenv('DBNAME');
				$this->user = $_ENV['USER'] ?: getenv('USER');
				$this->pass = $_ENV['PASS'] ?: getenv('PASS');

				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}