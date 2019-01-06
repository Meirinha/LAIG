:- include('prints.pl').
:- include('piece.pl').
:- include('utility.pl').
:- include('logic.pl').
:- include('board.pl').
:- include('AI.pl').
:- use_module(library(random)).
:- dynamic board/1.
:- dynamic current_player/1.

board(Board) :- create_board(Board).

current_player(white).

reset(Board):-
	create_board(Board),
	retract((board(_Board):-_Body)),
	assertz(board(Board)),
	retract(current_player(_Player)),
	assert(current_player(white)).

zurero_laig(Direction, Number, NewBoard, Player):-
	board(Board),
	current_player(Player),
	player_piece(Player, Piece),
	move(Direction, Number, Piece, Board, NewBoard),
	assert_new_board(NewBoard),
	assert_change_player(Player),
	print_board(NewBoard).

zurero_bot(Diff, NewBoard, Player, Direction, Line):-
	board(Board),
	current_player(Player),
	player_piece(Player, Piece),
	choose_move(Diff, Piece, Board, Direction, Line),
	move(Direction, Line, Piece, Board, NewBoard),
	assert_new_board(NewBoard),
	assert_change_player(Player),
	print_board(NewBoard).

% Assert New Board - Save the board for the next call 
assert_new_board(NewBoard):-
	retract((board(_Board):-_Body)),
	assertz(board(NewBoard)).

% Assert Change Player - Remember the player who will play next
assert_change_player(Player):-
	change_player(Player, NewPlayer),
	retract(current_player(_Player)),
	assert(current_player(NewPlayer)).