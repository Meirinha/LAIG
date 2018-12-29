% Get Piece
get_piece(Ncolumn, Nrow, Board, Piece):-
	get_row(Nrow, Board, Linha),
	get_column(Ncolumn, Linha, Piece).
	
get_row(1,[Linha|_], Linha).
get_row(Nrow, [_|Tail], Linha):-
	Nlin is Nrow -1,
	get_row(Nlin, Tail, Linha).

get_column(1, [Piece|_], Piece).
get_column(Ncolumn, [_|Tail], Piece):-
	Ncol is Ncolumn-1,
	get_column(Ncol, Tail, Piece).

%Set Piece
set_piece(Ncolumn, Nrow, Piece, BoardIn, BoardOut):-
    set_row(Nrow, Ncolumn, Piece, BoardIn, BoardOut).
	
set_row(1, Ncolumn, Piece, [Head|Tail], [NewHead|Tail]):-
	set_column(Ncolumn, Piece, Head, NewHead).

set_row(Nrow, Ncolumn, Piece, [Head|Tail], [Head|NewTail]):-
	Nrow>1,
	Nlin is Nrow-1,
	set_row(Nlin, Ncolumn, Piece, Tail, NewTail).

set_column(1, Piece, [_|Tail], [Piece|Tail]).
set_column(Ncolumn, Piece, [DPiece|Tail], [DPiece|NewTail]):-
	Ncolumn>1,
	Ncol is Ncolumn-1,
	set_column(Ncol, Piece, Tail, NewTail).

%Remove Piece
remove_piece(Ncolumn, Nrow, RemovedPiece, BoardIn, BoardOut):-
	get_piece(Ncolumn, Nrow, BoardIn, RemovedPiece),
	set_piece(Ncolumn, Nrow, e, BoardIn, BoardOut).

%Move Piece
%first case, the piece can move, last case it cannot

move_piece(right, Ncolumn, Nrow, BoardIn, BoardOut):-
	Ncolumn < 19,
	Ncol is Ncolumn+1,
	get_piece(Ncol, Nrow, BoardIn, NextPiece),
	NextPiece == e,
	remove_piece(Ncolumn, Nrow, Piece, BoardIn, BoardInt),
	set_piece(Ncol, Nrow, Piece, BoardInt, BoardOut).

move_piece(left, Ncolumn, Nrow, BoardIn, BoardOut):-
	Ncolumn > 1,
	Ncol is Ncolumn-1,
	get_piece(Ncol, Nrow, BoardIn, NextPiece),
	NextPiece == e,
	remove_piece(Ncolumn, Nrow, Piece, BoardIn, BoardInt),
	set_piece(Ncol, Nrow, Piece, BoardInt, BoardOut).

move_piece(up, Ncolumn, Nrow, BoardIn, BoardOut):-
	Nrow > 1,
	Nr is Nrow-1,
	get_piece(Ncolumn, Nr, BoardIn, NextPiece),
	NextPiece == e,
	remove_piece(Ncolumn, Nrow, Piece, BoardIn, BoardInt),
	set_piece(Ncolumn, Nr, Piece, BoardInt, BoardOut).

move_piece(down, Ncolumn, Nrow, BoardIn, BoardOut):-
	Nrow < 19,
	Nr is Nrow+1,
	get_piece(Ncolumn, Nr, BoardIn, NextPiece),
	NextPiece == e,
	remove_piece(Ncolumn, Nrow, Piece, BoardIn, BoardInt),
	set_piece(Ncolumn, Nr, Piece, BoardInt, BoardOut).

%the last case, nothing moves
move_piece(_,_,_,BoardIn,BoardIn).


first_piece_in_row(Board, Row, Piece, Column):-
	first_piece_in_row_aux(1, Board, Row, Piece, Column).
first_piece_in_row_aux(N, Board, Row, Piece, N):-
	N < 20,
	get_piece(N, Row, Board, Piece),
	Piece \= e,!.
first_piece_in_row_aux(N, Board, Row, Piece, Column):-
	N < 20,
	NN is N+1,
	first_piece_in_row_aux(NN, Board, Row, Piece, Column).

last_piece_in_row(Board, Row, Piece, Column):-
	last_piece_in_row_aux(19, Board, Row, Piece, Column).
last_piece_in_row_aux(N, Board, Row, Piece, N):-
	N > 0,
	get_piece(N, Row, Board, Piece),
	Piece \= e,!.
last_piece_in_row_aux(N, Board, Row, Piece, Column):-
	N > 0,
	NN is N - 1,
	last_piece_in_row_aux(NN, Board, Row, Piece, Column).

first_piece_in_column(Board, Column, Piece, Row):-
	first_piece_in_column_aux(1, Board, Column, Piece, Row).
first_piece_in_column_aux(N, Board, Column, Piece, N):-
	N < 20,
	get_piece(Column, N, Board, Piece),
	Piece \= e,!.
first_piece_in_column_aux(N, Board, Column, Piece, Row):-
	N < 20,
	NN is N + 1,
	first_piece_in_column_aux(NN, Board, Column, Piece, Row).
 
last_piece_in_column(Board, Column, Piece, Row):-
	last_piece_in_column_aux(19, Board, Column, Piece, Row).
last_piece_in_column_aux(N, Board, Column, Piece, N):-
	N > 0,
	get_piece(Column, N, Board, Piece),
	Piece \= e,!.
last_piece_in_column_aux(N, Board, Column, Piece, Row):-
	N > 0,
	NN is N - 1,
	last_piece_in_column_aux(NN, Board, Column, Piece, Row).