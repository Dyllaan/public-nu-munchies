<?php
/**
 * class CheckoutItem
 * @author Cameron Bramley w21020682
 * 
 * stripe payment checkout... gets the item name and price from the item id and sets up a payment gateway.
 */

namespace App\Endpoints\UBIntegration;
require_once __DIR__ . '/../../../vendor/autoload.php';
require_once 'secrets.php';
use Core\Endpoint\Endpoint;

class CheckoutItem extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'checkoutItem');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredInts(['item_id']);
    }

    public function process($request)
    {
        $status = ['status' => 'approved'];
        $item = $this->getDb()->createSelect()->cols("item_name, item_price")->from("items")->where(["id = '" . $request->getAttribute('item_id') . "'"])->execute();
        
        $price = $item[0]['item_price'];
        $item_name = $item[0]['item_name'];

        \Stripe\Stripe::setApiKey('sk_test_51MgmQnLvWNjHki0mRKISRuV2qxLQVHxfR1qZGt3cb3cexCsW94zVvM0csTpTCeuRO7QjzrVIYpZXaH17x3csd4d8000Ytk3840');
        header('Content-Type: application/json');

        $YOUR_DOMAIN = 'http://localhost:4242';

        $checkout_session = \Stripe\Checkout\Session::create([
          'line_items' => [[
            'price_data' => [
              'currency' => 'gbp',
              'tax_behavior' => 'inclusive',
              'unit_amount' => $price * 100, 
              'product_data' => [
                'name' => $item_name,
              ],
            ],
            'quantity' => 1,
          ]],
          'mode' => 'payment',
          'success_url' => $YOUR_DOMAIN . '?success=true',
          'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
          'automatic_tax' => [
            'enabled' => true,
          ],
        ]);
        

        header("HTTP/1.1 303 See Other");
        header("Location: " . $checkout_session->url, true, 301);
        exit;

        $response = [
          'status' => 'Item Checked out',
          'item' => $item,
          'checkout_url' => $checkout_session->url // Include the checkout URL in the response
      ];
  
      $this->setResponse(200, $response['status'], $response);
            }
}  