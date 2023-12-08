@if (Route::has($row->route))
    <span
        onclick="navigator.clipboard.writeText(this.textContent);notify('success',this.textContent + ' copied to clipboard')"
        style="cursor: pointer;">curl -s
        {{ route($row->route) }}</span>
@else
    <span>{{ $row->route }} (Route not defined)</span>
@endif
