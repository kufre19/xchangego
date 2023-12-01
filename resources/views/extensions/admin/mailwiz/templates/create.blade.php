@extends('layouts.admin')

@section('content')
    <div class="card mb-5">
        <div class="card-title">
            <h5 class="card-header">{{ __('Create Template') }}</h5>
        </div>
        <div class="card-body">
            <label for="name">{{ __('Title') }}</label>
            <input type="text" class="form-control" name="name">
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-success" onclick="submit()">{{ __('Create Template') }}</button>
        </div>
    </div>
    <div class="w-full">
        <div id="editor" class="h-full" style="height: 600px!important"></div>
    </div>
@endsection

@push('breadcrumb-plugins')
    <button class="btn btn-outline-primary" onclick="expandEditor()"><i
            class="bi bi-arrows-fullscreen pr-1"></i>{{ __('Expand Editor') }}</button>
    <a href="{{ route('admin.mailwiz.templates.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
@endpush

@php
    $locales = [
        'ar' => ['lang' => 'Arabic', 'icon' => 'iq'],
        'bn' => ['lang' => 'Bengali', 'icon' => 'in'],
        'de' => ['lang' => 'German', 'icon' => 'de'],
        'en' => ['lang' => 'English', 'icon' => 'us'],
        'es' => ['lang' => 'Spanish', 'icon' => 'es'],
        'fa' => ['lang' => 'Farsi', 'icon' => 'ir'],
        'fr' => ['lang' => 'French', 'icon' => 'fr'],
        'hi' => ['lang' => 'Hindi', 'icon' => 'in'],
        'hu' => ['lang' => 'Hungarian', 'icon' => 'hu'],
        'id' => ['lang' => 'Indonesian', 'icon' => 'id'],
        'it' => ['lang' => 'Italian', 'icon' => 'it'],
        'ja' => ['lang' => 'Japanese', 'icon' => 'jp'],
        'ko' => ['lang' => 'Korean', 'icon' => 'kr'],
        'nb' => ['lang' => 'Norwegian', 'icon' => 'no'],
        'nl' => ['lang' => 'Netherlands', 'icon' => 'nl'],
        'pl' => ['lang' => 'Polish', 'icon' => 'pl'],
        'pt' => ['lang' => 'Portuguese', 'icon' => 'pt'],
        'ru' => ['lang' => 'Russain', 'icon' => 'ru'],
        'th' => ['lang' => 'Thai', 'icon' => 'th'],
        'tr' => ['lang' => 'Turkish', 'icon' => 'tr'],
        'uk' => ['lang' => 'Ukrainian', 'icon' => 'ua'],
        'ur' => ['lang' => 'Urdo', 'icon' => 'pk'],
        'vi' => ['lang' => 'Vietnamese', 'icon' => 'vn'],
        'zh' => ['lang' => 'Chinese', 'icon' => 'cn'],
    ];
    $locale = arrayToObject($locales);
@endphp

@section('page-scripts')
    <script src="/mailwiz/mailwiz.js"></script>
    <script>
        mailwiz.init({
            id: 'editor',
            displayMode: 'email',
            safeHtml: true,
            locale: "{{ Session::get('locale', config('app.locale')) . '-' . strtoupper($locales[Session::get('locale', config('app.locale'))]['icon']) }}",
            appearance: {
                theme: localStorage.getItem('color-theme'),
                panels: {
                    tools: {
                        dock: 'left'
                    }
                }
            },
            features: {
                imageEditor: true,
                userUploads: true,
                stockImages: {
                    enabled: true,
                    safeSearch: true,
                    defaultSearchTerm: "people"
                },
                audit: true,
                pageAnchors: true,
                undoRedo: true,
                textEditor: {
                    spellChecker: true,
                    tables: true,
                    cleanPaste: true,
                    emojis: true,
                    inlineFontControls: true,
                    preheaderText: true
                },
                sendTestEmail: true
            },
            tools: {
                timer: {
                    enabled: true,
                    properties: {
                        countdown: {
                            value: {
                                countdownUrl: `/mailwiz/countdown/countdown.gif`,
                            }
                        }
                    }
                },
                video: {
                    enabled: true,
                },
                spcial: {
                    enabled: true,
                }
            }
        })


        function expandEditor() {
            const editor = document.getElementById('editor');

            if (editor.requestFullscreen) {
                editor.requestFullscreen();
            } else if (editor.mozRequestFullScreen) { // Firefox
                editor.mozRequestFullScreen();
            } else if (editor.webkitRequestFullscreen) { // Chrome, Safari and Opera
                editor.webkitRequestFullscreen();
            } else if (editor.msRequestFullscreen) { // IE/Edge
                editor.msRequestFullscreen();
            }
        }

        document.addEventListener("dark-mode", function() {
            const currentTheme = localStorage.getItem("color-theme");
            mailwiz.setAppearance({
                theme: currentTheme,
            });
        });

        @if (count($blocks) > 0)
            let blocks = [
                @foreach ($blocks as $block)
                    {!! json_encode($block) !!},
                @endforeach
            ];

            mailwiz.registerProvider('blocks', function(params, done) {
                done(blocks);
            });
        @endif

        mailwiz.registerCallback('block:added', function(newBlock, done) {
            // Generate a unique ID
            const blockId = Math.floor(100000 + Math.random() * 900000);

            // Assign the unique ID to the new block
            newBlock.id = blockId;

            $.ajax({
                url: "{{ route('admin.mailwiz.blocks.store') }}",
                method: 'POST',
                data: {
                    id: blockId,
                    json: JSON.stringify(newBlock),
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: function(response) {
                    notify(response.type, response.message);
                    mailwiz.reloadProvider('blocks');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    notify('error', jqXHR.responseJSON.message);
                }
            });

            done(newBlock);
        });


        mailwiz.registerCallback('block:modified', function(existingBlock, done) {
            $.ajax({
                url: "{{ route('admin.mailwiz.blocks.update') }}",
                method: 'PUT',
                data: {
                    id: existingBlock.id,
                    json: JSON.stringify(existingBlock),
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: function(response) {
                    notify(response.type, response.message);
                    mailwiz.reloadProvider('blocks');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    notify('error', jqXHR.responseJSON.message);
                }
            });

            done(existingBlock);
        });

        mailwiz.registerCallback('block:removed', function(existingBlock, done) {
            $.ajax({
                url: "{{ route('admin.mailwiz.blocks.destroy') }}",
                method: 'DELETE',
                data: {
                    id: existingBlock.id,
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: function(response) {
                    notify(response.type, response.message);
                    mailwiz.reloadProvider('blocks');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    notify('error', jqXHR.responseJSON.message);
                }
            });

            done(existingBlock);
        });

        function submit() {
            mailwiz.exportHtml(function(data) {
                $.ajax({
                    url: "{{ route('admin.mailwiz.templates.store') }}",
                    method: 'POST',
                    data: {
                        html: data.html,
                        design: JSON.stringify(data.design),
                        name: $('input[name="name"]').val(),
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    success: function(response) {
                        notify(response.type, response.message);
                        if (response.type == 'success') {
                            window.location.href = "{{ route('admin.mailwiz.templates.index') }}";
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        notify('error', jqXHR.responseJSON.message);
                    }
                });
            });
        }
    </script>
@endsection
