@props(['type' => 'text', 'name', 'id', 'value'])

<input {{ $attributes->merge(['class' => 'form-control']) }} type="{{ $type }}" name="{{ $name }}"
    id="{{ $id }}" value="{{ old($name, $value) }}">
