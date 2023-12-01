<div class="card max-h-screen md:max-h-full">
    <div class="card-header">
        <h3 class="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">{{ $page_title }}</h3>
    </div>
    <div class="pb-1">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                <tr>
                    <th class="th">ID</th>
                    <td class="td">{{ $order->id }}</td>
                </tr>
                <tr>
                    <th class="th">{{ __('User') }}</th>
                    <td class="td">{{ $order->user->username ?? 'User not found' }}</td>
                </tr>
                <tr>
                    <th class="th">{{ __('Currency') }}</th>
                    <td class="td">{{ $order->currency }}</td>
                </tr>
                <tr>
                    <th class="th">{{ __('Price') }}</th>
                    <td class="td">{{ $order->price }}</td>
                </tr>
                <tr>
                    <th class="th">{{ __('Transaction Id') }}</th>
                    <td class="td">{{ $order->trx ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <th class="th">{{ __('Payment Method') }}</th>
                    <td class="td">{{ $order->method->name ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <th class="th">{{ __('Status') }}</th>
                    <td class="px-4 py-2">
                        <livewire:ext.peer.orders.order-status :order="$order" />
                        @if ($order->status != 'completed' && $order->status != 'cancelled')
                            <button data-modal-toggle="updateOrderStatus"
                                class="btn btn-sm btn-primary">{{ __('Update Status') }}</button>
                        @endif

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Update Order Status') }}"
        action="{{ route('admin.p2p.orders.moderate', $order->id) }}" submit="Update" id="updateOrderStatus"
        done="refresh">
        @csrf
        <div>
            <label for="status" class="form-control-label">{{ __('Status') }}</label>
            <select name="status" id="status" class="form-control">
                <option value="open">{{ __('Open') }}</option>
                <option value="paid">{{ __('Paid') }}</option>
                <option value="completed">{{ __('Completed') }}</option>
                <option value="cancelled">{{ __('Cancelled') }}</option>
            </select>
        </div>
    </x-partials.modals.default-modal>
@endpush
