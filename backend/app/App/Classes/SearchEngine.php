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
        private $cat_name;
        private $businness_name;
        private $data;

        private \AppConfig $appConfigInstance;

        public function __construct($db)
        {
            parent::_construct($db);
            $this->appConfigInstance = new \Appconfig();
        }

        public function search($query)
        {
            $stmt = $this->getDb()->createSelect()->cols("categories.cat_name, businnesses.business_name")->from("categories, businnesses")->where(["search = '" .$query->getAttribute('cat_name, business_name'). "'"])->execute();
            $query = "%$query%";
            $stmt->bindParam(' :query', $query);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }
        public function getCatName()
        {
            return $this->catName;
        }
        public function setCatName()
        {
            $this->catName = $cat_name;
        }
        public function getBusinessName()
        {
            return $this->businessName;
        }
        public function setBusinessName()
        {
            $this->businnessName = $business_name;
        }
    }

    
    /**
     * $searchEngine = new SearchEngine();
     * $results = $searchEngine->search("search_query");
     * print_r($results);
     */
?>