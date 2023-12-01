<span
    class="badge @if (is_null($row->last_run) || empty($row->last_run)) bg-secondary @elseif (Carbon\Carbon::parse($row->last_run)->diffInSeconds() < 600) btn-success @elseif(Carbon\Carbon::parse($row->last_run)->diffInSeconds() < 1200) btn-warning @else
btn-danger @endif "><i
        class="bi bi-clock mr-1"></i>
    @if (is_null($row->last_run) || empty($row->last_run))
        {{ __('Not Working') }}
    @else
        {{ Carbon\Carbon::parse($row->last_run)->difFforHumans() }}
    @endif
</span>
