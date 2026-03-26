<?php

namespace App\Http\Resources\Dashboard\Blog;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->when($request->routeIs('dashboard.blog.show'), $this->content),
            'excerpt' => $this->excerpt,
            'isPublished' => (bool) $this->is_published,
            'createdAt' => $this->created_at->diffForHumans(),
        ];
    }
}
