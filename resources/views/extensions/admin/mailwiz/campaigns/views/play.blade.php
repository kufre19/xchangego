<!-- Pause Campaign -->
@if ($row->status === 'active')
    <form action="{{ route('admin.mailwiz.campaigns.pause', $row->id) }}" method="POST" class="inline-block">
        @csrf
        <button type="submit" class="btn btn-warning btn-icon btn-sm" data-campaign-status="{{ $row->status }}"
            data-bs-toggle="tooltip" title="Pause">
            <i class="bi bi-pause-circle"></i>
        </button>
    </form>
@endif

<!-- Resume Campaign -->
@if ($row->status === 'paused')
    <form action="{{ route('admin.mailwiz.campaigns.resume', $row->id) }}" method="POST" class="inline-block">
        @csrf
        <button type="submit" class="btn btn-success btn-icon btn-sm" data-campaign-status="{{ $row->status }}"
            data-bs-toggle="tooltip" title="Resume">
            <i class="bi bi-play-circle"></i>
        </button>
    </form>
@endif

<!-- Stop Campaign -->
@if (in_array($row->status, ['active', 'paused']))
    <form action="{{ route('admin.mailwiz.campaigns.stop', $row->id) }}" method="POST" class="inline-block">
        @csrf
        <button type="submit" class="btn btn-danger btn-icon btn-sm" data-campaign-status="{{ $row->status }}"
            data-bs-toggle="tooltip" title="Stop">
            <i class="bi bi-stop-circle"></i>
        </button>
    </form>
@endif

<!-- Restart Campaign -->
@if ($row->status === 'stopped')
    <form action="{{ route('admin.mailwiz.campaigns.restart', $row->id) }}" method="POST" class="inline-block">
        @csrf
        <button type="submit" class="btn btn-info btn-icon btn-sm" data-campaign-status="{{ $row->status }}"
            data-bs-toggle="tooltip" title="Restart">
            <i class="bi bi-arrow-clockwise"></i>
        </button>
    </form>
@endif

<!-- Start Campaign -->
@if ($row->status === 'pending')
    <form action="{{ route('admin.mailwiz.campaigns.start', $row->id) }}" method="POST" class="inline-block">
        @csrf
        <button type="submit" class="btn btn-success btn-icon btn-sm" data-campaign-status="{{ $row->status }}"
            data-bs-toggle="tooltip" title="Start">
            <i class="bi bi-play-circle"></i>
        </button>
    </form>
@endif
