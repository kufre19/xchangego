<a class="btn btn-sm btn-outline-info" href="{{ route('admin.ecommerce.product.edit', $row->id) }}">
    {{ __('Edit') }}
</a>
<a class="btn btn-sm btn-outline-warning" href="{{ route('admin.ecommerce.product.license', $row->id) }}">
    {{ __('Licenses') }}
</a>
