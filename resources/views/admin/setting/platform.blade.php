@extends('layouts.admin')
@section('content')
    <script>
        function toggleCheckboxValue(checkbox) {
            checkbox.value = checkbox.checked ? 1 : 0;
        };
    </script>
    <form action="{{ route('admin.platform.update') }}" method="POST" enctype="multipart/form-data" id="settings">
        @csrf
        <div class="card">
            @component('admin.setting.platform.TabNavigation', ['ext' => $ext])
            @endcomponent
            <div>
                <div id="myTabContent">
                    @component('admin.setting.platform.SystemSettings', ['platform' => $platform])
                    @endcomponent
                    @component('admin.setting.platform.KycSettings', ['platform' => $platform])
                    @endcomponent
                    @component('admin.setting.platform.DashboardSettings', ['platform' => $platform])
                    @endcomponent
                    @component('admin.setting.platform.TradingSettings', ['platform' => $platform])
                    @endcomponent
                    @component('admin.setting.platform.InvestmentSettings', ['platform' => $platform])
                    @endcomponent
                    @component('admin.setting.platform.WalletSettings', ['platform' => $platform])
                    @endcomponent
                    @if ($ext[3] == 1)
                        @component('admin.setting.platform.MLMSettings', ['ext' => $ext, 'platform' => $platform])
                        @endcomponent
                    @endif
                    @if ($ext[6] == 1)
                        @component('admin.setting.platform.StakingSettings', ['platform' => $platform])
                        @endcomponent
                    @endif
                    @if ($ext[10] == 1)
                        @component('admin.setting.platform.EcoSettings', ['platform' => $platform])
                        @endcomponent
                    @endif
                    @if ($ext[15] == 1)
                        @component('admin.setting.platform.FuturesSettings', ['platform' => $platform])
                        @endcomponent
                    @endif
                </div>
            </div>
            <div class="card-footer text-end">
                <button type="submit"
                    class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600
                                  dark:hover:bg-blue-700
                                  focus:bg-blue-700
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                  focus:ring-offset-white
                                  dark:focus:ring-offset-gray-800
                                  rounded
                                ">
                    {{ __('Save Changes') }}
                </button>
            </div>
        </div>
    </form>
@endsection


@section('page-scripts')
    <script src="https://cdn.tiny.cloud/1/{{ $general->tinymce }}/tinymce/6/tinymce.min.js" referrerpolicy="origin">
    </script>
    <script>
        $(function() {
            "use strict";
            tinymce.init({
                selector: 'textarea#membership_terms',
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount code',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | code',
            });
        })
    </script>
@endsection
