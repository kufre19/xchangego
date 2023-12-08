@extends('layouts.user')
@section('content')
    <div class=" my-2 text-end">
        <a href="/app/support" class="btn btn-outline-secondary">{{ __('Back') }}</a>
    </div>
    <div class="card">
        <form class="message__chatbox__form row" action="{{ route('user.support.ticket.store') }}" method="post"
            enctype="multipart/form-data" onsubmit="return submitUserForm();">
            @csrf
            <div class="card-body space-y-5">
                <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2">
                    <div class="">
                        <label for="name" class="label">{{ __('Name') }}</label>
                        <input type="text" id="name" name="name" class="form-control "
                            value="{{ $user->firstname . ' ' . $user->lastname }}" readonly>
                    </div>
                    <div class="">
                        <label for="email" class="label">{{ __('Email') }}</label>
                        <input type="text" id="email" name="email" class="form-control "
                            value="{{ $user->email }}" readonly>
                    </div>
                </div>
                <div class="">
                    <label for="subject" class="label">{{ __('Subject') }}</label>
                    <input type="text" id="subject" name="subject" class="form-control "
                        placeholder="{{ __('Enter Subject') }}" required="">
                </div>
                <div class="">
                    <label for="message" class="label">{{ __('Message') }}</label>
                    <textarea id="message" name="message" class="form-control " placeholder="{{ __('Message') }}"></textarea>
                </div>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-primary">{{ __('Send Message') }}</button>
            </div>
        </form>
    </div>
@endsection
