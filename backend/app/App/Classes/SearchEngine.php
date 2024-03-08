<?php
   /**
     * class SeachEngine
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * SearchEngine is used for implementing a search bar functionality.
     */
    namespace App\Classes;

    use Firebase\JWT\JWT;
    use Core\Database\CrudModel;
    use Core\Database\CrudInterface;

    class SearchEngine extends CrudModel implements CrudInterface
    {
        //More to be added
        private $data;

        private \AppConfig $appConfigInstance;

        public function __construct($db)
        {
            parent::_construct($db);
            $this->appConfigInstance = new \Appconfig();
        }

        public function search($query)
        {
            $conn = $this->db->connect();
            $stmt = $conn->prepare("SELECT * FROM categories WHERE cat_name LIKE :query");
            $query = "%$query%";
            $stmt->bindParam(' :query', $query);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }
    }

    /**
     * $searchEngine = new SearchEngine();
     * $results = $searchEngine->search("search_query");
     * print_r($results);
     */
?>