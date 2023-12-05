<table>
    <thead>
        <tr>

            <th>{{ __('Product Name') }}</th>
            <th>{{ __('In Wishlist') }}</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($products as $product)
            <tr>
                <td>{{ $product->name }}</td>
                <td>{{ $product->in_wishlist ? 'Yes' : 'No' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
