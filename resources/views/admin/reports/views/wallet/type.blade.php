<span class="fw-bold fs-5">
    @php
        $typeMappings = [
            1 => __('Deposit'),
            2 => __('Withdraw'),
            3 => __('Trading To Funding Transfer'),
            4 => __('Funding To Trading Transfer'),
            5 => __('Main To Trading Transfer'),
            6 => __('Main To Funding Transfer'),
            'FT' => __('Funding To Trading Transfer'),
            'FFU' => __('Funding To Futures Transfer'),
            'FUT' => __('Futures To Trading Transfer'),
            'FUF' => __('Futures To Funding Transfer'),
            'TF' => __('Trading To Funding Transfer'),
            'TFU' => __('Trading To Futures Transfer'),
        ];
    @endphp

    {{ $typeMappings[$row->type] ?? '' }}
</span>
