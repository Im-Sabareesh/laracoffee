@extends('/layouts/main')

@push('css')
    <link href="/css/{{ $css }}.css" rel="stylesheet" /> 
@endpush

@section("content")
<header class="masthead">
    <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div class="d-flex justify-content-center">
            <div class="text-center">
                <h1 class="mx-auto my-0 text-uppercase">Laracoffee</h1>
                <h2 class="text-white-50 mx-auto mt-2 mb-5">
                    New way to enjoy quality coffee
                </h2>
                <a class="btn btn-primary" href="auth">Get Started</a>
            </div>
        </div>
    </div>
</header>
@endsection
