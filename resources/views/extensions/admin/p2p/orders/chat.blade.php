<div class="card h-full">
    <div class="card-header">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {{ __('Chat with') }} {{ $order->seller->user->username }} ( <span class="text-warning">{{ __('Seller') }}</span> ) &
            {{ $order->buyer->username }} (<span class="text-warning">{{ __('Buyer') }}</span>)
        </h3>
    </div>
    <div id="chat-container" class="relative h-80">
        <div id="chat-loader" class="absolute inset-0 flex items-center justify-center">
            <div class="loader"></div>
        </div>
        <div id="chat-messages" class="card-body flex-grow h-full overflow-y-auto p-4 dark:bg-gray-800">
            @foreach ($order->messages as $message)
                @foreach ($message['messages'] as $msg)
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
                            {{ $msg['content'] }}
                        </div>
                    </div>
                @endforeach
            @endforeach
        </div>
    </div>
    <form class="card-footer" action="{{ route('admin.p2p.orders.message') }}" method="POST"
        @submit.prevent="sendMessage">
        @csrf
        <div class="relative flex items-center">
            <input id="new-message" type="text"
                class="w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pl-4 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                placeholder="Type a message..." name="content" />
            <button type="submit"
                class="absolute right-0 top-0 px-4 py-2 text-gray-500 hover:text-blue-500 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400">
                {{ __('Send') }}
            </button>
        </div>
    </form>
</div>




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

        const channelName = `private-chat-{{ $order->id }}`;
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
                contentDiv.textContent = message.content;
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

        // Add this function after the timeSince function
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
                order_id: {{ $order->id }},
                content: message,
                sender_id: {{ $user->id }},
                sender_name: "{{ $user->name }}",
                timestamp: new Date().toISOString()
            };

            fetch("{{ route('admin.p2p.orders.message') }}", {
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
    </script>
@endsection

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
</style>
