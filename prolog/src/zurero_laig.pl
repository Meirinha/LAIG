:- include('prints.pl').
:- include('piece.pl').
:- include('utility.pl').
:- include('logic.pl').
:- include('board.pl').
:- include('AI.pl').
:- use_module(library(random)).
:- dynamic board/1.
:- dynamic previous_board/1.
:- dynamic current_player/1.
:- dynamic last_direction/1.
:- dynamic last_line/1.

board(Board) :- create_board(Board).
previous_board(Board):- create_board(Board).

last_direction(down).
last_line(10).

current_player(white).

reset(Board):-
	create_board(Board),
	assert_new_board(Board),
	assert_previous_board(Board),
	retract(current_player(_Player)),
	assert(current_player(white)).

undo(Board, NPlayer, Direction, Line) :- 
	previous_board(Board),
	assert_new_board(Board),
	current_player(Player),
	assert_change_player(Player),
	current_player(NPlayer),
	last_line(Line),
	last_direction(Direction).

zurero_laig(Direction, Number, NewBoard, Player, WinningPlayer):-
	board(Board),
	current_player(Player),
	player_piece(Player, Piece),
	move(Direction, Number, Piece, Board, NewBoard),

	assert_new_board(NewBoard),
	assert_previous_board(Board),
	assert_change_player(Player),
	assert_last_move(Direction, Number),

	detect_endgame(Player, WinningPlayer),
	print_board(NewBoard).

zurero_bot(Diff, NewBoard, Player, Direction, Line, WinningPlayer):-
	board(Board),
	current_player(Player),
	player_piece(Player, Piece),
	choose_move(Diff, Piece, Board, Direction, Line),
	move(Direction, Line, Piece, Board, NewBoard),

	assert_new_board(NewBoard),
	assert_previous_board(Board),
	assert_change_player(Player),
	assert_last_move(Direction, Line),

	detect_endgame(Player, WinningPlayer),
	print_board(NewBoard).

detect_endgame(LastPlayer, WinningPlayer):-
	board(Board),
	game_over(LastPlayer, Board, WinningPlayer).

game_over(Player, Board, Player):-
	check_win(Player, Board),
	print_board(Board).
game_over(Player, Board, Opponent):-
	change_player(Player, Opponent),
	check_win(Opponent, Board),
	print_board(Board).
game_over(_, _, no).

% Assert New Board - Save the board for the next call 
assert_new_board(NewBoard):-
	retract((board(_Board):-_Body)),
	assertz(board(NewBoard)).

assert_previous_board(OldBoard):-
	retract((previous_board(_Board):-_Body)),
	assertz(previous_board(OldBoard)).

% Assert Change Player - Remember the player who will play next
assert_change_player(Player):-
	change_player(Player, NewPlayer),
	retract(current_player(_Player)),
	assert(current_player(NewPlayer)).

assert_last_move(Direction, Line):-
	retract(last_direction(_Direction)),
	assert(last_direction(Direction)),
	retract(last_line(_Line)),
	assert(last_line(Line)).