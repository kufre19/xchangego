@props(['name', 'id', 'options', 'value'])

<select {{ $attributes->merge(['class' => 'form-control']) }} name="{{ $name }}" id="{{ $id }}">
    @foreach ($options as $optionValue => $optionLabel)
        <option value="{{ $optionValue }}" {{ old($name, $value) == $optionValue ? 'selected' : '' }}>
            {{ $optionLabel }}</option>
    @endforeach
</select>
