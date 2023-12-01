<div class="w-full bg-gray-200 dark:bg-gray-900 rounded-full">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full progress-bar"
        data-campaign-id="{{ $row->id }}" style="width: {{ $row->progress }}%">
        {{ $row->progress }}%
    </div>
</div>
