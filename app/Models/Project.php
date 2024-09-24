<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;


class Project extends Model
{
    use HasFactory;
    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function createBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updateBy(){
        return $this->belongTo(User::class, 'updated_by');
    }
}
