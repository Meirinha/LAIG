% Initializes empty board, with X piece on middle (10,10)
create_board(PBoard) :- 
	create_board_aux(19, [] , Board),
	set_piece(10,10,'X', Board, PBoard).

create_board_aux(0, Board, Board) :- !.
create_board_aux(N, L, Board) :-
	create_row(Row),
	N > 0,
	N1 is N-1,
	create_board_aux(N1, [Row|L], Board).

create_board_aux(N, L, Board) :-
	create_row(Row),
	N > 0,
	N1 is N-1,
	create_board_aux(N1, [Row|L], Board).

create_row(Row) :- create_row_aux(19, [], Row).

create_row_aux(0, Row, Row) :- !.
create_row_aux(N, L, Row) :- 
	N > 0, 
	N1 is N-1, 
	create_row_aux(N1, [freeCell|L], Row).

%----Verify Win---
% Only verifies right, down and diagonal, other directions come from previous calls

declare_winner(Piece) :-
	player_piece(Player, Piece),
	write(Player),
	write(' is the winner!'),nl,!.

check_win(Player, Board):-
	player_piece(Player, Piece),
	!,
	check_win_aux(Piece, 1,1, Board).

check_win_aux(_, _, 20, _):-
	fail.
check_win_aux(Piece, 20, Ncolumn, Board):-
	Ncolumn < 20,
	Ncol is Ncolumn + 1,
	check_win_aux(Piece, 1, Ncol, Board).
check_win_aux(Piece, Nrow, Ncolumn, Board):-
	Ncolumn < 20,
	check_line(0, Piece, Nrow, Ncolumn, Board),!.
check_win_aux(Piece, Nrow, Ncolumn, Board):-
	Ncolumn < 20,
	check_column(0, Piece, Nrow, Ncolumn, Board),!.
check_win_aux(Piece, Nrow, Ncolumn, Board):-
	Ncolumn < 20,
	check_diagonal(0, Piece, Nrow, Ncolumn, Board),!.
check_win_aux(Piece, Nrow, Ncolumn, Board):-
	Ncolumn < 20,
	check_diagonal_rev(0, Piece, Nrow, Ncolumn, Board),!.
check_win_aux(Piece, Nrow, Ncolumn, Board):-
	Ncolumn < 20,
	Nrow < 20,
	Nr is Nrow + 1,
	check_win_aux(Piece, Nr, Ncolumn, Board).

check_line(5, Piece, _, _, _):-
	!,declare_winner(Piece).
check_line(N, Piece, Nrow, Ncolumn, Board):-
	Ncolumn < 20,
	get_piece(Ncolumn, Nrow, Board, NPiece),!,
	Piece == NPiece,
	NN is N+1,
	Ncol is Ncolumn + 1,
	check_line(NN, Piece, Nrow, Ncol, Board).

check_column(5, Piece, _, _, _):-
	!,declare_winner(Piece).
check_column(N, Piece, Nrow, Ncolumn, Board):-
	Nrow < 20,
	get_piece(Ncolumn, Nrow, Board, NPiece),!,
	Piece == NPiece,
	NN is N+1,
	Nr is Nrow + 1,
	check_column(NN, Piece, Nr, Ncolumn, Board).

check_diagonal(5, Piece, _, _, _):-
	!,declare_winner(Piece).
check_diagonal(N, Piece, Nrow, Ncolumn, Board):-
	Nrow < 20,
	Ncolumn < 20,
	get_piece(Ncolumn, Nrow, Board, NPiece),!,
	Piece == NPiece,
	NN is N + 1,
	Nr is Nrow + 1,
	Ncol is Ncolumn + 1,
	check_diagonal(NN, Piece, Nr, Ncol, Board).

check_diagonal_rev(5, Piece, _, _, _):-
	!,declare_winner(Piece).
check_diagonal_rev(N, Piece, Nrow, Ncolumn, Board):-
	Nrow < 20,
	Ncolumn > 0,
	get_piece(Ncolumn, Nrow, Board, NPiece),!,
	Piece == NPiece,
	NN is N + 1,
	Nr is Nrow + 1,
	Ncol is Ncolumn - 1,
	check_diagonal_rev(NN, Piece, Nr, Ncol, Board).