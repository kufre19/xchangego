@extends('layouts.admin')

@section('page-style')
    <style>
        #chat-container {
            position: relative;
        }

        #chat-messages {
            overflow-y: auto;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }

        #chat-loader {
            width: 100%;
            height: 100%;
        }

        #chat-loader .loader {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            100% {
                transform: rotate(360deg);
            }
        }

        .image-wrapper {
            display: inline-block;
            max-width: 200px;
            max-height: 200px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
        }

        .image-wrapper img {
            max-width: 100%;
            max-height: 100%;
        }

        .zoom-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .image-wrapper:hover .zoom-overlay {
            opacity: 1;
        }

        .large-image-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .large-image-overlay img {
            max-width: 90%;
            max-height: 90%;
            cursor: pointer;
        }

        .uploaded-image {
            max-width: 100%;
            cursor: zoom-in;
            transition: max-width 0.3s ease;
        }

        .expanded {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999;
            max-height: 90%;
            overflow-y: auto;
        }

        .image-container {
            position: relative;
            display: inline-block;
        }

        .image-container:hover .overlay {
            opacity: 1;
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .zoom-icon {
            font-size: 2rem;
            color: white;
        }
    </style>
@endsection
@section('content')
    <div class="card h-full">
        <div class="grid grid-cols-3 gap-5 mb-5 p-5">
            <div>
                @if ($ticket->status == 0)
                    <span
                        class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{{ __('Open') }}</span>
                @elseif($ticket->status == 1)
                    <span
                        class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900y">{{ __('Answered') }}</span>
                @elseif($ticket->status == 2)
                    <span
                        class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">{{ __('Customer Reply') }}</span>
                @elseif($ticket->status == 3)
                    <span
                        class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">{{ __('Closed') }}</span>
                @endif
            </div>
            <div>
                <p class="text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">
                    [{{ __('Ticket#') }}{{ $ticket->ticket }}] {{ $ticket->user->username }}: {{ $ticket->subject }}
                </p>
            </div>
            @if ($ticket->status != 3)
                <div class="text-end">
                    <span id="badge-dismiss-red"
                        class="inline-flex items-center py-1 px-2 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-200 dark:text-red-800">
                        {{ __('Close Ticket') }}
                        <button type="button"
                            class="inline-flex items-center p-0.5 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-300 dark:hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red" aria-label="Remove" data-modal-toggle="DelModal">
                            <svg aria-hidden="true" class="w-3.5 h-3.5" aria-hidden="true" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only"> {{ __('Close Ticket') }}</span>
                        </button>
                    </span>
                </div>
            @endif
        </div>
        <div id="chat-container" class="relative h-80">
            <div id="chat-loader" class="absolute inset-0 flex items-center justify-center">
                <div class="loader"></div>
            </div>
            <div id="chat-messages" class="card-body flex-grow h-full overflow-y-auto p-4 dark:bg-gray-800">
                @if ($ticket->messages != null)
                    @foreach ($ticket->messages as $msg)
                        <div
                            class="mb-2 {{ $msg['sender_id'] === $user->id ? 'my-message text-right' : 'other-message text-left' }}">
                            <div class="meta mb-1 text-sm text-gray-500 dark:text-gray-400">
                                @if ($msg['sender_id'] !== $user->id)
                                    <span class="sender mr-2">{{ $msg['sender_name'] }}</span>
                                @endif
                                <span class="timestamp">{{ diffForHumans($msg['timestamp']) }}</span>
                            </div>
                            <div
                                class="content max-w-3/4 inline-block break-words px-4 py-2 shadow-md
                {{ $msg['sender_id'] === $user->id ? 'rounded-t-lg rounded-bl-lg bg-blue-500 text-white' : 'rounded-t-lg rounded-br-lg bg-gray-300 text-gray-700' }}">
                                @if (isset($msg['type']) && $msg['type'] === 'image')
                                    <div class="image-container">
                                        <div class="image-wrapper" id="messageImage" onmouseover="isMouseOverImage(true)"
                                            onmouseout="isMouseOverImage(false)">
                                            {!! $msg['content'] !!}
                                        </div>
                                        <div class="overlay" onclick="showLargeImage('{!! e($msg['content']) !!}')">
                                            <i class="bi bi-zoom-in zoom-icon"></i>
                                        </div>
                                    </div>
                                @else
                                    <div>{{ $msg['content'] }}</div>
                                @endif
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="text-center">
                        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">
                            {{ __('No Messages Found!') }}
                        </h3>
                    </div>
                @endif
            </div>
        </div>
        <form class="card-footer flex items-center justify-between"
            action="{{ route('admin.ticket.chat.send', $ticket->id) }}" method="POST" @submit.prevent="sendMessage">
            @csrf
            <div class="mt-2">
                <label for="image-upload"
                    class="text-gray-500 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 cursor-pointer p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <i class="bi bi-image"></i>
                </label>
                <input type="file" id="image-upload" class="hidden" name="image" id="image" />
            </div>

            <div class="relative w-full ml-4">
                <input name="new-message" id="new-message" type="text"
                    class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Type a message..." />
                <button type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm dark:focus:ring-blue-800 hover:text-blue-500">
                    <i class="bi bi-send"></i>
                </button>
            </div>
        </form>
    </div>
    <div id="large-image-overlay" class="large-image-overlay hidden">
        <img id="large-image" src="" class="large-image" />
        <button id="close-btn"
            class="close-btn absolute top-0 right-0 text-white text-2xl focus:outline-none px-3 py-1 m-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-800">
            &times;
        </button>
    </div>
@endsection

@section('page-scripts')
    <script src="https://js.pusher.com/8.0.1/pusher.min.js"></script>
    <script>
        const pusher = new Pusher('{{ config('broadcasting.connections.pusher.key') }}', {
            cluster: '{{ config('broadcasting.connections.pusher.options.cluster') }}',
            encrypted: true,
            authEndpoint: '/user/pusher/auth?_token={{ csrf_token() }}',
            auth: {
                headers: {
                    'X-CSRF-Token': '{{ csrf_token() }}'
                }
            }
        });

        const channelName = `support-private-chat-{{ $ticket->id }}`;
        let channel;
        const messages = document.querySelector("#chat-messages");
        let lastMessageTimestamp = "";
        pusher.connection.bind('connected', () => {
            channel = pusher.subscribe(channelName);
            channel.bind("new_message", (message) => {
                const messages = document.querySelector("#chat-messages");
                const scrollAtBottom =
                    messages.scrollHeight - messages.scrollTop === messages.clientHeight;
                const messageDiv = document.createElement("div");
                const senderId = parseInt(message.sender_id);
                messageDiv.classList.add(
                    senderId === {{ $user->id }} ? "text-right" : "text-left"
                );

                const metaDiv = document.createElement("div");
                metaDiv.classList.add("meta", "mb-1", "text-sm", "text-gray-500", "dark:text-gray-400");

                const senderSpan = document.createElement("span");
                senderSpan.classList.add("sender", "mr-2");
                if (senderId !== {{ $user->id }}) {
                    senderSpan.textContent = message.sender_name;
                }
                metaDiv.appendChild(senderSpan);

                const timestampSpan = document.createElement("span");
                timestampSpan.classList.add("timestamp");
                timestampSpan.textContent = timeSince(message.timestamp);
                metaDiv.appendChild(timestampSpan);

                messageDiv.appendChild(metaDiv);

                const contentDiv = document.createElement("div");
                contentDiv.classList.add(
                    "content",
                    "max-w-3/4",
                    "inline-block",
                    "break-words",
                    "px-4",
                    "py-2",
                    "shadow-md",
                    "rounded-t-lg",
                    senderId === {{ $user->id }} ? "rounded-bl-lg" : "rounded-br-lg",
                    senderId === {{ $user->id }} ? "bg-blue-500" : "bg-gray-300",
                    senderId === {{ $user->id }} ? "text-white" : "text-gray-700",
                );
                if (message.type === "image") {
                    // Create the necessary elements for the image
                    const imageContainer = document.createElement("div");
                    imageContainer.classList.add("image-container");

                    const imageWrapper = document.createElement("div");
                    imageWrapper.classList.add("image-wrapper");
                    imageWrapper.setAttribute("id", "messageImage");
                    imageWrapper.setAttribute("onmouseover", "isMouseOverImage(true)");
                    imageWrapper.setAttribute("onmouseout", "isMouseOverImage(false)");
                    imageWrapper.innerHTML = message.content; // Adding the image tag

                    const overlayDiv = document.createElement("div");
                    overlayDiv.classList.add("overlay");
                    overlayDiv.setAttribute("onclick", `showLargeImage('${message.content}')`);

                    const zoomIcon = document.createElement("i");
                    zoomIcon.classList.add("bi", "bi-zoom-in", "zoom-icon");

                    // Append the zoom icon to the overlay div
                    overlayDiv.appendChild(zoomIcon);

                    // Append the image wrapper and overlay div to the image container
                    imageContainer.appendChild(imageWrapper);
                    imageContainer.appendChild(overlayDiv);

                    // Append the image container to the content div
                    contentDiv.appendChild(imageContainer);
                } else {
                    contentDiv.textContent = message.content;
                }
                messageDiv.appendChild(contentDiv);

                messages.appendChild(messageDiv);

                if (scrollAtBottom) {
                    messages.scrollTop = messages.scrollHeight;
                }
            });

            // scroll to bottom of chat after messages are loaded
            const messages = document.querySelector("#chat-messages");
            setTimeout(() => {
                messages.scrollTop = messages.scrollHeight;
                hideLoaderAndShowMessages();
            }, 1000);
        });

        function timeSince(date) {
            const seconds = Math.floor((new Date() - date) / 1000);
            let interval = Math.floor(seconds / 31536000);
            if (interval >= 1) {
                return `${interval} year${interval === 1 ? '' : 's'} ago`;
            }
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                return `${interval} month${interval === 1 ? '' : 's'} ago`;
            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                return `${interval} day${interval === 1 ? '' : 's'} ago`;
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                return `${interval} hour${interval === 1 ? '' : 's'} ago`;
            }
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
                return `${interval} minute${interval === 1 ? '' : 's'} ago`;
            }
            return 'just now';
        }

        function hideLoaderAndShowMessages() {
            const chatLoader = document.querySelector("#chat-loader");
            const chatMessages = document.querySelector("#chat-messages");
            chatLoader.style.display = "none";
            chatMessages.style.opacity = "1";
            chatMessages.style.visibility = "visible";
        }

        function sendMessage() {
            const messageInput = document.querySelector("#new-message");
            const message = messageInput.value.trim();
            if (message.length === 0) {
                return;
            }

            const data = {
                ticket_id: {{ $ticket->id }},
                content: message,
                sender_id: {{ $user->id }},
                sender_name: "{{ $user->name }}",
                type: "text",
                timestamp: new Date().toISOString()
            };

            fetch("{{ route('admin.ticket.chat.send', $ticket->id) }}", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": "{{ csrf_token() }}",
                    },
                    body: JSON.stringify(data),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    messageInput.value = "";
                    messageInput.focus();
                })
                .catch((error) => {
                    console.error(error);
                    alert("An error occurred while sending the message. Please try again later.");
                });

            const messages = document.querySelector("#chat-messages");
            messages.scrollTop = messages.scrollHeight;
        }

        let data = {
            uploadedImageUrl: "",
            showingLargeImage: false,
            largeImageUrl: "",
            isMouseOverImage: false,
        }

        // Show the large image overlay
        function showLargeImageOverlay(src) {
            $('#large-image').attr('src', src);
            $('#large-image-overlay').css('display', 'flex');
        }


        // Hide the large image overlay
        function hideLargeImageOverlay() {
            $('#large-image-overlay').css('display', 'none');
        }

        // Click event listeners
        $('#large-image-overlay').on('click', hideLargeImageOverlay);
        $('#close-btn').on('click', function(event) {
            event.stopPropagation();
            hideLargeImageOverlay();
        });

        // Modify the 'showLargeImage' function
        function showLargeImage(imageHtml) {
            const imageUrl = extractImageUrl(imageHtml);
            if (imageUrl) {
                showLargeImageOverlay(imageUrl);
            }
        }

        function hideLargeImage() {
            data.showingLargeImage = false;
        }

        function extractImageUrl(htmlString) {
            const div = document.createElement("div");
            div.innerHTML = htmlString;
            const img = div.querySelector("img");
            return img ? img.src : "";
        }

        // Upload image with AJAX
        $('#image-upload').on('change', function(event) {
            const file = event.target.files[0];

            if (file) {
                const formData = new FormData();
                formData.append("image", file);

                $.ajax({
                    url: "/user/support/tickets/upload-image",
                    type: "POST",
                    headers: {
                        "X-CSRF-Token": "{{ csrf_token() }}",
                    },
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        if (response.status === "success") {
                            data.uploadedImageUrl = response.image_url;
                            sendImage(); // Send the image immediately after the upload is successful
                        } else {
                            console.log(response.message);
                        }
                    },
                    error: function(error) {
                        console.error(error);
                    }
                });
            }
        });

        function sendImage() {
            if (data.uploadedImageUrl) {
                const message = {
                    ticket_id: '{{ $ticket->id }}', // You need to pass the id from the backend
                    sender_name: '{{ $ticket->user->username }}', // You need to pass the username from the backend
                    type: "image",
                    content: `<img src="${data.uploadedImageUrl}" class="uploaded-image" />`,
                    timestamp: new Date().toISOString(),
                };

                // Send a POST request to the server to save the message
                $.ajax({
                    url: `/user/support/tickets/${message.ticket_id}/send`,
                    type: "POST",
                    headers: {
                        "X-CSRF-Token": "{{ csrf_token() }}",
                    },
                    data: {
                        data: message
                    },
                    success: function(response) {
                        console.log(response);
                    },
                    error: function(error) {
                        console.error(error);
                    }
                });

                data.uploadedImageUrl = "";

                // Add this block to add the click event listener to the image
                setTimeout(() => {
                    const images = document.querySelectorAll(".uploaded-image");
                    const lastImage = images[images.length - 1];
                    if (lastImage) {
                        lastImage.addEventListener("click", expandImage);
                    }
                }, 0);
            }
        }

        function expandImage(event) {
            const image = event.target;
            image.classList.toggle("expanded");

            if (image.classList.contains("expanded")) {
                image.style.maxWidth = "90%";
                image.style.cursor = "zoom-out";
            } else {
                image.style.maxWidth = "100%";
                image.style.cursor = "zoom-in";
            }
        }
    </script>
@endsection



@push('modals')
    <x-partials.modals.default-modal title="{{ __('Close Support Ticket!') }}" btn="danger" done="reload"
        action="{{ route('admin.ticket.close', $ticket->id) }}" submit="{{ __('Close Ticket') }}" id="DelModal">
        <div>
            <input type="hidden" name="replayTicket" value="2">
            <strong>{{ __('Are you  want to Close This Support Ticket?') }}</strong>
        </div>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="{{ __('Delete Reply!') }}" action="{{ route('admin.ticket.delete') }}"
        submit="{{ __('Delete') }}" id="DelMessage" btn="danger">
        <div>
            <input type="hidden" name="message_id" class="message_id">
            <strong>{{ __('Are you sure to delete this?') }}</strong>
        </div>
    </x-partials.modals.default-modal>
@endpush


@push('breadcrumb-plugins')
    <a href="{{ route('admin.ticket') }}" class="btn btn-outline-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-4 h-4 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

        {{ __('Go Back') }} </a>
@endpush
