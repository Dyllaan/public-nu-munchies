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
    
        $userId = $this->getUser()->getId();
    
        $query = $db->createSelect()
                    ->cols("businesses.id")
                    ->from("businesses")
                    ->join("users_businesses", "businesses.id = users_businesses.business_id")
                    ->where(["users_businesses.user_id = $userId"])
                    ->execute();
    
        return $query[0]["id"];
    }

    public function getCouncillorId(){

        $db = $this->getDb();

        $query = $db->createSelect()
                    ->cols("councillor.id")
                    ->from("users")
                    ->join("councillor", "users.id = councillor.user_id")
                    ->where(["users.id = " . $this->getUser()->getId() ])
                    ->execute();
    
        return $query[0]["id"];
    }

    public function getFirstUserName() {

        $db = $this->getDb();

        $query = $db->createSelect()->cols("first_name")->from("users")->where(["id = " . $this->getUser()->getId() ])->execute();

        return $query[0]['first_name'];
    }

    public function getBusinessName() {

        $db = $this->getDb();

        $businessName = $db->createSelect()->cols("business_name")->from("businesses")->where(["id = " . $this->getBusinessId() ])->execute();

        return $businessName;
    }


    //analytics methods:

    //calculation methods:

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

        $query = $db->createSelect()->cols("SUM(food_waste_prevented) AS total_food_waste_prevented")->from("business_analytics")->where(["business_id = " . $this->getBusinessId() ])->execute();

        return $query[0]['total_food_waste_prevented'];

    }


    //orders methods:


    public function getOrdersPlaced() {
        // This is where the total orders placed calculation will be
        
        $db = $this->getDb();

        $query = $db->createSelect()->cols("COUNT(*) AS total_orders_placed")->from("orders")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $query[0]['total_orders_placed'];
    }


    public function getOrdersReceived() {
        // This is where the total orders received calculation will be
        //For businesses

        $db = $this->getDb();

        $query = $db->createSelect()->cols("COUNT(*) AS total_orders_placed")->from("orders")->where(["business_id = " . $this->getBusinessId() ])->execute();

        return $query[0]['total_orders_placed'];
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

        $moneyMade = $db->createSelect()->cols("SUM(item_price) AS total_money_made")->from("items")
        ->where(["business_id = " . $this->getBusinessId() ])
        ->execute();
        return $moneyMade[0]['total_money_made'];
    }

    public function getBusinessPoints()
    {
        $db = $this->getDb();

        $query = $db->createSelect()->cols("SUM(points) AS total_points")->from("business_analytics")->where(["business_id = " . $this->getBusinessId() ])->execute();

        return $query[0]['total_points'];
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

        
        $allRanks = $db->createSelect()->cols("SUM(points) AS total_points")->from("user_analytics")->groupBy("user_id")->orderBy("total_points DESC")->execute();

        $yourRank = 0;
 
        foreach($allRanks as $index => $rank) {
            if(intval($userPoints[0]['total_points']) == $rank['total_points']) {
                $yourRank = $index + 1;
                break;
            }
        }

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

        $rewardStats = $db->createSelect()->cols('user_analytics.order_id, user_analytics.points, user_analytics.food_waste_prevented')->from('user_analytics')->where(["user_id = " . $this->getUser()->getId() ])->execute();
        $totalPoints = $db->createSelect()->cols('SUM(points) AS total_points')->from("user_analytics")->where(["user_id = " . $this->getUser()->getId() ])->execute();

            $userOrderData = [];

            foreach ($rewardStats as $reward) {
                $ordersData = array(
                    'order_number' => $reward['order_id'],
                    'food_waste_prevented' => $reward['food_waste_prevented'],
                    'points_earned' => $reward['points'],
                );

                array_push($userOrderData, $ordersData);
            }

            return [
                'total_points' => $totalPoints,
                'orderData' => $userOrderData,
                ];
    }

    public function getUserOrderNumber() {
        $db = $this->getDb();

        $orderNumber = $db->createSelect()->cols(["id"])->from("orders")->where(["user_id = " . $this->getUser()->getId() ])->execute();

        return $orderNumber;
    }

    public function businessesHelped(){
        $db = $this->getDb();

        $businessesHelped = $db->createSelect()->cols("business_name, COUNT(orders.id) AS purchase_amount")->from("businesses")->join('orders', 'businesses.id = orders.business_id')->where(["user_id = " . $this->getUser()->getId() ])->
        groupBy("business_name")->orderBy("purchase_amount DESC")->execute();

        return $businessesHelped;

    }

    public function getOrdersStats(){
        $db = $this->getDb();

        $orderItems = $db->createSelect()->cols("orders.id, items.item_name, items.created_at, items.item_price")->from("items")->join("orders","items.id = orders.items_id")->where(["user_id = " . $this->getUser()->getId() ])->execute();
        $relatedBusiness = $db->createSelect()->cols("orders.business_id, businesses.business_name")->from("businesses")->join('orders', 'businesses.id = orders.business_id')->where(["user_id = " . $this->getUser()->getId() ])->execute();
        $wastePrevented = $db->createSelect()->cols("food_waste_prevented")->from("user_analytics")->join('orders', 'user_analytics.order_id = orders.id')->where(["orders.user_id = " . $this->getUser()->getId() ])->execute();
        
        $userOrderData = [];

        foreach ($orderItems as $index => $order) {
            $orderData = array(
                'business_name' => $relatedBusiness[$index]['business_name'],
                'order_number' => $order['id'],
                'item_name' => $order['item_name'],
                'price' => $order['item_price'],
                'purchaseDate' => $order['created_at'],
                'wastePrevented' => $wastePrevented[$index]['food_waste_prevented'],
            );
            array_push($userOrderData, $orderData);
        }

        return $userOrderData;
    }



    public function userList(){

        $db = $this->getDb();
        $userList = $db->createSelect()->cols("users.first_name, users.last_name, users.email, SUM(user_analytics.points) AS total_points, SUM(user_analytics.food_waste_prevented) AS total_waste")->from("users")->join("user_analytics", "users.id = user_analytics.user_id")
        ->groupBy("users.id")
        ->havingIsNotNull("SUM(user_analytics.points)")
        ->orderBy("total_points DESC")->execute();

        $rankArray = [];

        foreach ($userList as $index => $userLists) {

            // Create an associative array with key-value pairs using the array() function
            $userData = array(
                'rank' => $index + 1,
                'first_name' => $userLists['first_name'],
                'last_name' => $userLists['last_name'],
                'email' => $userLists['email'],
                'total_points' => $userLists['total_points'],
                'total_Uwaste' => $userLists['total_waste'],
            );
            array_push($rankArray, $userData);
        }

        return $rankArray;
    }

    public function businessList(){
        $db = $this->getDb();
        $topBusinessRankings = $db->createSelect()->cols("businesses.business_name, businesses.business_email, SUM(business_analytics.points) AS total_points, SUM(business_analytics.food_waste_prevented) AS total_waste")->from("businesses")->join("business_analytics", "businesses.id = business_analytics.business_id")
        ->groupBy("businesses.id")
        ->havingIsNotNull("SUM(business_analytics.points)")
        ->orderBy("total_points DESC")->execute();

        $rankArray = [];

        foreach ($topBusinessRankings as $index => $topBusinessRanking) {

            // Create an associative array with key-value pairs using the array() function
            $businessData = array(
                'rank' => $index + 1,
                'business_name' => $topBusinessRanking['business_name'],
                'business_email' => $topBusinessRanking['business_email'],
                'total_points' => $topBusinessRanking['total_points'],
                'total_Bwaste' => $topBusinessRanking['total_waste'],
            );
            array_push($rankArray, $businessData);
        }

        return $rankArray;
    }

    public function getBusinessRankings()
    {
        $db = $this->getDb();
        $topBusinessRankings = $db->createSelect()->cols("businesses.business_name, SUM(business_analytics.points) AS total_points")->from("businesses")->join("business_analytics", "businesses.id = business_analytics.business_id")
        ->groupBy("businesses.id")
        ->havingIsNotNull("SUM(business_analytics.points)")
        ->orderBy("total_points DESC")->limit(3)->execute();

        $rankArray = [];

        foreach ($topBusinessRankings as $index => $topBusinessRanking) {

            // Create an associative array with key-value pairs using the array() function
            $businessData = array(
                'rank' => $index + 1,
                'business_name' => $topBusinessRanking['business_name'],
                'total_points' => $topBusinessRanking['total_points'],
            );
            array_push($rankArray, $businessData);
        }

        return $rankArray;
    }


    public function getBusinessRank(){
        $db = $this->getDb();

        $businessPoints = $db->createSelect()->cols("businesses.business_name, SUM(business_analytics.points) AS total_points")->from("businesses")->join("business_analytics", "businesses.id = business_analytics.business_id")
        ->where(["business_id = " . $this->getBusinessId() ])
        ->groupBy("businesses.id")
        ->execute();

        
        $allRanks = $db->createSelect()->cols("SUM(points) AS total_points")->from("business_analytics")->groupBy("business_id")->orderBy("total_points DESC")->execute();

        $yourRank = 0;
 
        foreach($allRanks as $index => $rank) {
            if(intval($businessPoints[0]['total_points']) == $rank['total_points']) {
                $yourRank = $index + 1;
                break;
            }
        }

        // Create an associative array with key-value pairs using the array() function
        $businessData = array(
            'rank' => $yourRank,
            'business_name' => $businessPoints[0]['business_name'],
            'total_points' => $businessPoints[0]['total_points'],
        );

        return $businessData;
    }



    public function getBusinessRewards()
    {
        $db = $this->getDb();

        $rewardStats = $db->createSelect()->cols('order_id, points, food_waste_prevented')->from('business_analytics')->where(["business_id = " . $this->getBusinessId()  ])->execute();
        $totalPoints = $db->createSelect()->cols('SUM(points) AS total_points')->from("business_analytics")->where(["business_id = " . $this->getBusinessId()  ])->execute();

            $businessOrderData = [];

            foreach ($rewardStats as $reward) {
                $ordersData = array(
                    'order_number' => $reward['order_id'],
                    'food_waste_prevented' => $reward['food_waste_prevented'],
                    'points_earned' => $reward['points'],
                );

                array_push($businessOrderData, $ordersData);
            }

            return [
                'total_points' => $totalPoints,
                'orderData' => $businessOrderData,
                ];
    }

    public function businessOrderStats(){
        $db = $this->getDb();

        $orderItems = $db->createSelect()->cols("orders.id, items.item_name, items.created_at, items.item_price")->from("items")->join("orders","items.id = orders.items_id")->where(["orders.business_id = " . $this->getBusinessId() ])->execute();
        $relatedCustomers = $db->createSelect()->cols("orders.user_id, users.first_name, users.last_name")->from("users")->join('orders', 'users.id = orders.user_id')->where(["orders.business_id = " . $this->getBusinessId() ])->execute();
        $wastePrevented = $db->createSelect()->cols("food_waste_prevented")->from("business_analytics")->join('orders', 'business_analytics.order_id = orders.id')->where(["orders.business_id = " . $this->getBusinessId()])->execute();
        
        $businessOrderData = [];

        foreach ($orderItems as $index => $order) {
            $orderData = array(
                'customerFirstName' => $relatedCustomers[$index]['first_name'],
                'customerLastName' => $relatedCustomers[$index]['last_name'],
                'order_number' => $order['id'],
                'item_name' => $order['item_name'],
                'moneyMade' => $order['item_price'],
                'purchaseDate' => $order['created_at'],
                'wastePrevented' => $wastePrevented[$index]['food_waste_prevented'],
            );
            array_push($businessOrderData, $orderData);
        }

        return $businessOrderData;
    }


    public function moneyMadeStats()
{
    $db = $this->getDb();

    $moneyStats = $db->createSelect()->cols("orders.id, items.item_price, items.item_name")->from("orders")->join("items","orders.items_id = items.id")
    ->where(["orders.business_id = " . $this->getBusinessId() ])->
    execute();

    $statsData = [];

    foreach ($moneyStats as $stats) {
        $moneyStatsData = array(
            'order_number' => $stats['id'],
            'item_name' => $stats['item_name'],
            'item_price' => $stats['item_price'],
        );

        array_push($statsData, $moneyStatsData);
    }

    return [
        'totalMoneyMade' => $this->getMoneyMade(),
        'statsData' => $statsData
    ];
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

    public function usersHelp(){
        return [
            'totalHelped' => $this->getBusinessesHelped(),
            'businessesHelped' => $this->businessesHelped(),

        ];
    }

    public function getUserOrders(){
        return [
            'totalWaste' => $this->totalUserFoodWastePrevented(),
            'totalOrders' => $this->getOrdersPlaced(),
            'orderStats' => $this->getOrdersStats(),

        ];

    }

    public function councillorView(){
        return [
            'userList'=> $this->userList(),
            'businessList'=> $this->businessList(),
        ];
    }

    public function businessStats(){
        return [
            'businessId' => $this->getBusinessId(),
            'usersName' => $this->getBusinessName(),
            'preventedWaste' => $this->totalBusinessFoodWastePrevented(),
            'ordersReceived' => $this->getOrdersReceived(),
            'totalMoneyMade' => $this->getMoneyMade(),
            'yourRank' => $this->getBusinessRank(),
            'topRanks' => $this->getBusinessRankings(),
            'businessPoints' => $this->getBusinessPoints()
        ];
    }

    public function businessMoney(){
        return [
            'totalMoneyMade' => $this->getMoneyMade(),
            'moneyMadeStats' => $this->moneyMadeStats(),
        ];
    }

    public function getBusinessOrders(){
        return [
            'totalWaste' => $this->totalBusinessFoodWastePrevented(),
            'totalOrders' => $this->getOrdersReceived(),
            'orderStats' => $this->businessOrderStats(),
            'totalMoneyMade' => $this->getMoneyMade(),

        ];

    }

}