<a class="btn btn-sm btn-outline-info" data-modal-toggle="editLicense"
    onclick="$('#editLicense').find('input[name=id]').val('{{ $row->id }}');$('#editLicense').find('input[name=license]').val('{{ $row->license }}');">
    {{ __('Edit') }}
</a>
