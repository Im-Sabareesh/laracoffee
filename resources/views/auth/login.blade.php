@extends('/layouts/auth')

@section("content")
<div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

        <div class="col-lg-7">

            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                        <div class="col-lg">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">{{ $title }} Page</h1>
                                </div>

                                @if(session()->has('message'))
                                    {!! session("message") !!}
                                @endif

                                <form class="user" method="post" action="/auth/login">
                                    @csrf
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="email" name="email" placeholder="Enter an email address" >
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" data-toggle="password">
                                    </div>
                                    <button type="submit" class="btn btn-info btn-block">
                                        Login
                                    </button>
                                </form>
                                <hr>

                                <div class="text-center">
                                    <a class="small" href="/auth/register">Belum memiliki akun? Buat sekarang!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>
@endsection


