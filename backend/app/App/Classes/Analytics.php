<?php

/**
 * Analytics is used to handle analytical data, including impact stats,
 * leaderboard rankings and rewards systems
 * @author Jake McCarthy w20043974
 */

namespace App\Classes;

use Core\Database\CrudModel;

class Analytics extends CrudModel {

    private $user;

    private static $instance = null;

    private \AppConfig $appConfigInstance;

    public function __construct($db, $user)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \Appconfig();
        $this->user = $user;
    }

    public static function getInstance($db, $user){
            if(self::$instance === null)
            {
                self::$instance = new Analytics($db, $user);
            }
    }

    public function getUser(){
        return $this->user;
    }
    
    public function setUser($user){
        $this->user = $user;
    }

    public function getBusinessId(){

        $db = $this->getDb();
    
        return $db->createSelect()->cols("businesses.id", "users_businesses.business_id", "users_businesses.user_id")->from("businesses")->join("users_businesses", "businesses.id = users_businesses.business_id")->where(["users_businesses.user_id = " . $this->getUser()->getId() ])->execute();
    }

    public function getFirstUserName() {

        $db = $this->getDb();

        $query = $db->createSelect()->cols("first_name")->from("users")->where(["id = " . $this->getUser()->getId() ])->execute();

        return $query[0]['first_name'];
    }

    public function getBusinessName() {

        $db = $this->getDb();

        $businessName = $db->createSelect()->cols("business_name")->from("businesses")->where(["id = '" . $this->getBusinessId() . "'"])->execute();

        return $businessName;
    }

    public function userAnalyticsCalcuation($orderId) {

        $db = $this->getDb();

        //Selects order items from database when the relevant order id is passed as a parameter
        $orderItem = $db->createSelect()->cols("item_id")->from("orders")->where(["id = '" . $this->getId() . "'"])->execute();
        //Selects 
        $foodItems = $db->createSelect()->cols("*")->from("nutrition_details")->where(["id = '" . $orderItem . "'"])->execute();

        $foodWastePrevented = $foodItems['weight'] * $foodItems['quantity'] * 2.5;

        $userPoints = $foodWastePrevented * 12;

        $foodWastePrevented = $db->createInsert()->into("user_analytics")->cols("food_waste_prevented, points, user_id, order_id")->values([$foodWastePrevented, $userPoints,$this->getId(),$orderId])->execute();

    }

    public function businessAnalyticsCalcuation($orderId) {

        $db = $this->getDb();

        //Selects order items from database when the relevant order id is passed as a parameter
        $orderItem = $db->createSelect()->cols("item_id")->from("orders")->where(["id = '" . $this->getId() . "'"])->execute();
        //Selects 
        $foodItems = $db->createSelect()->cols("*")->from("nutrition_details")->where(["id = '" . $orderItem . "'"])->execute();

        $foodWastePrevented = $foodItems['weight'] * $foodItems['quantity'] * 2.5;

        $businessPoints = $foodWastePrevented * 122;

        $foodWastePrevented = $db->createInsert()->into("business_analytics")->cols("food_waste_prevented, points, business_id, order_id")->values([$foodWastePrevented, $businessPoints, $this->getBusinessId(), $orderId])->execute();

    }

    public function totalUserFoodWastePrevented() {
        //This is where the total food waste prevented by users is calculated and displayed

        $db = $this->getDb();

        $query = $db->createSelect()->cols("SUM(food_waste_prevented) AS total_food_waste_prevented")->from("user_analytics")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $query[0]['total_food_waste_prevented'];

    }

    public function totalBusinessFoodWastePrevented() {
        //This is where the total food waste prevented by users is calculated and displayed

        $db = $this->getDb();

        $totalFoodWastePrevented = $db->createSelect()->cols(['SUM(food_waste_prevented) AS total_food_waste_prevented'])->from("user_analytics")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $totalFoodWastePrevented;

    }


    public function getOrdersPlaced() {
        // This is where the total orders placed calculation will be
        
        $db = $this->getDb();

        $query = $db->createSelect()->cols("COUNT(*) AS total_orders_placed")->from("orders")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $query[0]['total_orders_placed'];
    }


    public function getOrdersReceived() {
        // This is where the total orders received calculation will be
        //For businesses

        
    }

    public function getBusinessesHelped() {
        // This is where the total businesses helped calculation will be for users

        $db = $this->getDb();

        $query = $db->createSelect()->cols("COUNT(DISTINCT business_id) AS total_businesses_helped")->from("orders")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $query[0]['total_businesses_helped'];
    }

    public function getMoneyMade() {
        // This is where the total money made calculation will be for businesses

        $db = $this->getDb();

        //need price of every item sold (total of item price column where order_id is related to that business' business_id):
        // need to link order_id and item_id so i know which items have been sold by that business
        // then add total of price column to calculate total profit

        //$moneyMade = $db->createSelect()->cols(["","SUM(items.price) AS total_money_made"])->from(
    }

    public function getBusinessPoints()
    {
        // $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["id = '" . $this->getId() . "'"])->execute();
        // if (count($data) == 0) {
        //     $this->setResponse(400, "User does not exist");
        // } else {
        //     $this->setName($data[0]['name']);
        //     $this->setEmail($data[0]['email']);
        //}
    }

    public function getTotalUserPoints()
    {
        $db = $this->getDb();

        $query = $db->createSelect()->cols("SUM(points) AS total_points")->from("user_analytics")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $query[0]['total_points'];
    }

    public function getTopUserRankings()
    {
        // Rankings calculation based on total number of points - higher the points, higher the ranking
        $db = $this->getDb();

        $topUserRankings = $db->createSelect()->cols("users.first_name, users.last_name, SUM(user_analytics.points) AS total_points")->from("users")->join("user_analytics", "users.id = user_analytics.user_id")
        ->groupBy("users.id")
        ->havingIsNotNull("SUM(user_analytics.points)")
        ->orderBy("total_points DESC")->limit(3)->execute();

        $rankArray = [];

        foreach ($topUserRankings as $index => $topUserRanking) {

            // Create an associative array with key-value pairs using the array() function
            $userData = array(
                'rank' => $index + 1,
                'first_name' => $topUserRanking['first_name'],
                'last_name' => $topUserRanking['last_name'],
                'total_points' => $topUserRanking['total_points'],
            );
            array_push($rankArray, $userData);
        }

        return $rankArray;
    }

    public function getUsersRank(){
        $db = $this->getDb();

        $userPoints = $db->createSelect()->cols("users.first_name, users.last_name, SUM(user_analytics.points) AS total_points")->from("users")->join("user_analytics", "users.id = user_analytics.user_id")
        ->where(["user_id = " . $this->getUser()->getId() ])
        ->groupBy("users.id")
        ->execute();


        // userRank query here

        // $userRank = $db->createSelect()
        //     ->cols("COUNT(*) + 1 AS rank, SUM(user_analytics.points) AS total_points")
        //     ->from("users")
        //     ->join("user_analytics", "users.id = user_analytics.user_id")
        //     ->groupBy("users.id")
        //     ->havingSum("SUM(user_analytics.points) > " . $userPoints[0]['total_points'] )
        //     ->orderBy("total_points DESC")
        //     ->execute();

        
        $allRanks = $db->createSelect()->cols("SUM(points) AS total_points")->from("user_analytics")->groupBy("user_id")->orderBy("total_points DESC")->execute();

        //var_dump(array_search($userPoints[0]['total_points'], $allRanks));

        $yourRank = 0;
 
        foreach($allRanks as $index => $rank) {
            if(intval($userPoints[0]['total_points']) == $rank['total_points']) {
                $yourRank = $index + 1;
                break;
            }
        }

        // $user = $db->createSelect()->cols("users.first_name", "users.last_name", "user_analytics.points")->from("users")->join("user_analytics", "users.id = user_analytics.user_id")
        // ->where(["user_id = " . $this->getUser()->getId() ])->orderBy("user_analytics.points DESC")->limit(1)->execute();


        // Create an associative array with key-value pairs using the array() function
        $userData = array(
            'rank' => $yourRank,
            'first_name' => $userPoints[0]['first_name'],
            'last_name' => $userPoints[0]['last_name'],
            'total_points' => $userPoints[0]['total_points'],
        );

        return $userData;
    }

    public function getUserRewards()
    {

        $db = $this->getDb();

        $userPoints = $db->createSelect()->cols(['SUM(points) AS total_points'])->from("user_analytics")->where(["user_id = '" . $this->getId() . "'"])->execute();

        if($userPoints >= 10) {
            return "You have 1 point reward";
        } elseif($userPoints >= 100) {
            return "You have 100 points reward";
        } elseif($userPoints >= 1000) {
            return "You have 1000 points reward";
        }

    }

    public function getUserOrderNumber() {
        $db = $this->getDb();

        $orderNumber = $db->createSelect()->cols(["id"])->from("orders")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $orderNumber;
    }

    public function orderedBusinesses(){
        $db = $this->getDb();

        $businesses = $db->createSelect()->cols(["orders.id", "DISTINCT businesses.business_name", "orders.created_at"])->from("orders")->join("businesses","orders.business_id = businesses.id")->where(["user_id = " . $this->getUser()->getId() ])->execute();
        return $businesses;
    }

    public function getBusinessRankings()
    {
        // Rankings calculation based on total number of points - higher the points, higher the ranking
    }

    public function getBusinessRewards()
    {
        //if statements based on points total
        //Similar to user rewards but businesses need higher points as they are getting official certificates
        //e.g. if business has 1000 points, give them a £1 voucher/ 50 points a £5 voucher etc
        //claim by emailing local councilor
    }

    public function getTimeframe()
    {
        //Using order date + time from supabase items table, can do a "week,month,year,total" selector at top of page
        //Using IF statements - E.G: if timeframe is from this date to this date, return in month, else if timeframe is from this date to this date, return in week 
    }

    public function userStats(){
        return [
            'userFirstName' => $this->getFirstUserName(),
            'preventedWaste' => $this->totalUserFoodWastePrevented(),
            'ordersPlaced' => $this->getOrdersPlaced(),
            'businessesHelped' => $this->getBusinessesHelped(),
            'userRank' => $this->getUsersRank(),
            'topRanks' => $this->getTopUserRankings(),
            'userPoints' => $this->getTotalUserPoints()
        ];
    }

}