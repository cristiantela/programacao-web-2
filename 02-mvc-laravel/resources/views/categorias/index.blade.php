@extends('layouts.app')

@section('titulo', 'Categorias — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span>
    <h1>📚 Categorias</h1>
    <p class="sub">Escolha uma categoria para ver seus produtos.</p>

    <div class="grid">
        @foreach ($categorias as $categoria)
            <a class="card" href="/categorias/{{ $categoria->id }}">
                <div class="emoji">{{ $categoria->emoji }}</div>
                <p class="nome">{{ $categoria->nome }}</p>
                <p class="sub">{{ $categoria->descricao }}</p>
            </a>
        @endforeach
    </div>
@endsection
