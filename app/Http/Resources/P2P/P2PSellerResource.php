<?php

namespace App\Http\Resources\P2P;

use Illuminate\Http\Resources\Json\JsonResource;

class P2PSellerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'rating' => $this->rating,
            'orders_count' => $this->orders_count,
            'completion_rate' => $this->completion_rate,
        ];
    }
}
