<?php
/**
 * @author Louis Figes
 * @package App\Classes\UserSubSystem
 * @generated GitHub CoPilot was used in the creation of this class
 * The idea is that this will be used to make things like searching for users and businesses easier
 */
namespace App\Classes\UserSubSystem\Helpers;

class SearchHelper {
    /**
     * @param $request the request object
     * @param $search the search as string
     * @param $itemsToSearch the items to search as an array of strings
     * referencing columns in the table.
     */
    public static function searchConditionBuilder($request, $itemsToSearch) {
        if(!$request->hasAttribute('search')) {
            return null;
        }
        $conditions = "";
        $first = false;
        $search = strtolower($request->getAttribute('search'));
        foreach($itemsToSearch as $item) {
            if(!$first) {
                $first = true;
            } else {
                $conditions.= " OR ";
            }
            $conditions.= "LOWER(". $item .") LIKE '%". $search ."%'";
        }
        
        return "(".$conditions.")";
    }
    /**
     * @param $request the request object
     * @param $fieldName the name of the field to search
     * @param $table the table to search in
     */
    public static function addCondition($request, $fieldName, $table) {
        if($request->hasAttribute($fieldName)) {
            return $table .".". $fieldName . " = ". $request->getAttribute($fieldName);
        }
    }

    public static function buildConditions($request, $arrOfConditions) {
        $conditions = [];
        foreach($arrOfConditions as $condition) {
            $conditions[] = $condition;
        }
        $conditions = array_filter($conditions);
        return $conditions;
    }

    public static function handlePagination($request, $limit) {
        $page = 1;
        if($request->hasAttribute('page')) {
            $page = $request->getAttribute('page');
        }
        $offset = ($page - 1) * $limit;
        return $offset;
    }
}