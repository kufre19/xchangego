<?php

namespace App\Http\Requests;

use App\Models\Knowledge\Article;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Response;

class UpdateArticleRequest extends FormRequest
{
    public function authorize()
    {
        abort_if(Gate::denies('article_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return true;
    }

    public function rules()
    {
        return [
            'title'        => [
                'required',
            ],
            'slug'        => [
                'required', 'unique:knowledge_articles,slug,' . $this->route('article')->id
            ],
            'tags.*'       => [
                'integer',
            ],
            'tags'         => [
                'array',
            ],
        ];
    }
}
