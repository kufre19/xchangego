@if ($row->status == 0)
    <a href="{{ route('admin.deposit.thirdparty.remove', $row->id) }}" class="btn-icon btn btn-outline-danger btn-sm">
        {{ __('Remove') }}
    </a>
    <button
            onclick="$('#confirmDeposit').find('input[name=id]').val({{ $row->id }});
               setTransactionLink('{{ $row->address }}', '{{ $row->chain }}','{{ $row->symbol }}','{{ $row->amount ?? 0 }}','{{ $row->fee ?? 0 }}');"
            class="btn btn-outline-success btn-sm" data-modal-toggle="confirmDeposit">{{ __('Confirm') }}</button>
    {{-- @if ($row->address != null && $row->address != '')
        <button
            onclick="$('#confirmDeposit').find('input[name=id]').val({{ $row->id }});
               setTransactionLink('{{ $row->address }}', '{{ $row->chain }}','{{ $row->symbol }}','{{ $row->amount ?? 0 }}','{{ $row->fee ?? 0 }}');"
            class="btn btn-outline-success btn-sm" data-modal-toggle="confirmDeposit">{{ __('Confirm') }}</button>
    @endif --}}
@endif
