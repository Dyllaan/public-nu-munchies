<?php

/**
 * Analytics is used to handle analytical data, including impact stats,
 * leaderboard rankings and rewards systems
 * @author Jake McCarthy w20043974
 */

namespace App\Classes;


use Core\Database\CrudModel;

class Analytics extends CrudModel {

    private static $instance = null;

    private \AppConfig $appConfigInstance;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \Appconfig();

    }

    public static function getInstance($db)
        {
            if(self::$instance === null)
            {
                self::$instance = new Analytics($db);
            }
        }

    public function getBusinessId(){

        $db = $this->getDb();
    
        return $db->createSelect()->cols("businesses.id", "users_businesses.business_id", "users_businesses.user_id")->from("businesses")->join("users_businesses", "businesses.id = users_businesses.business_id")->where(["users_businesses.user_id = '" . $this->getId() . "'"])->execute();
    }

    public function getFirstUserName() {

        $db = $this->getDb();

        $firstName = $db->createSelect()->cols("first_name")->from("users")->where(["id = '" . $this->getId() . "'"])->execute();

        return $firstName;
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

        $foodWastePrevented = $db->createInsert()->into("user_analytics")->cols("food_waste_prevented, points, user_id, order_id")->values([$foodWastePrevented, $userPoints,$this->getId(),$orderId])->execute;

    }

    public function businessAnalyticsCalcuation($orderId) {

        $db = $this->getDb();

        //Selects order items from database when the relevant order id is passed as a parameter
        $orderItem = $db->createSelect()->cols("item_id")->from("orders")->where(["id = '" . $this->getId() . "'"])->execute();
        //Selects 
        $foodItems = $db->createSelect()->cols("*")->from("nutrition_details")->where(["id = '" . $orderItem . "'"])->execute();

        $foodWastePrevented = $foodItems['weight'] * $foodItems['quantity'] * 2.5;

        $businessPoints = $foodWastePrevented * 122;

        $foodWastePrevented = $db->createInsert()->into("business_analytics")->cols("food_waste_prevented, points, business_id, order_id")->values([$foodWastePrevented, $businessPoints, $this->getBusinessId(), $orderId])->execute;

    }

    public function totalUserFoodWastePrevented() {
        //This is where the total food waste prevented by users is calculated and displayed

        $db = $this->getDb();

        $totalFoodWastePrevented = $db->createSelect()->cols(['SUM(food_waste_prevented) AS total_food_waste_prevented'])->from("user_analytics")->where(["user_id = '" . $this->getId() . "'"])->execute();

        return $totalFoodWastePrevented;

    }

    public function totalBusinessFoodWastePrevented() {
        //This is where the total food waste prevented by users is calculated and displayed

        $db = $this->getDb();

        $totalFoodWastePrevented = $db->createSelect()->cols(['SUM(food_waste_prevented) AS total_food_waste_prevented'])->from("user_analytics")->where(["user_id = '" . $this->getId() . "'"])->execute();

        return $totalFoodWastePrevented;

    }


    public function getOrdersPlaced() {
        // This is where the total orders placed calculation will be
        
        $db = $this->getDb();

        $ordersPlaced = $db->createSelect()->cols(['COUNT(*) AS total_orders_placed'])->from("orders")->where(["user_id = '" . $this->getId() . "'"])->execute();

        return $ordersPlaced;
    }


    public function getOrdersReceived() {
        // This is where the total orders received calculation will be
        //For businesses
    }

    public function getBusinessesHelped() {
        // This is where the total businesses helped calculation will be for users

        $db = $this->getDb();

        $businessesHelped = $db->createSelect()->cols(['COUNT(DISTINCT business_id) AS total_businesses_helped'])->from("orders")->where(["user_id = '" . $this->getId() . "'"])->execute();

        return $businessesHelped;
    }

    public function getMoneyMade() {
        // This is where the total money made calculation will be for businesses
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

        $userPoints = $db->createSelect()->cols(["SUM(points) AS total_points"])->from("user_analytics")->where(["user_id = '". $this->getId() . "'"])->execute();

        return $userPoints;
    }

    public function getTopUserRankings()
    {
        // Rankings calculation based on total number of points - higher the points, higher the ranking
        $db = $this->getDb();

        $topUserRankings = $db->createSelect()->cols(["users.id", "users.first_name", "users.last_name", "SUM(user_analytics.points) AS total_points"])->from("users")->join("user_analytics", "users.id = user_analytics.user_id")->groupBy(["users.id", "users.first_name", "users.last_name"])->orderBy(["total_points DESC"])->limit(3)->execute();

        return $topUserRankings;
    }

    public function getUsersRank(){
        $db = $this->getDb();

        $userRank = $db->createSelect()->cols(["users.first_name", "users.last_name", "user_analytics.points"])->from("users")->join("user_analytics", "users.id = user_analytics.user_id")
        ->orderBy(["user_analytics.points DESC"])->execute();
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

}