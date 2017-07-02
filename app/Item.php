<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Item extends Model
{
    protected $table = 'items';
    protected $fillable = ['title', 'price', 'description'];
}