<?php

namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class GalleryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Gallery',
            'fields' => [
                'url' => [
                    'type' => Type::string(),
                ],
            ]
        ]);
    }
}