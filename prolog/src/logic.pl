change_player(white, black).
change_player(black, white).

player_piece(white, 'O').
player_piece(black, 'X').

change_piece('O', 'X').
change_piece('X', 'O').

%-------------- THROW Direction ---------------------
move(right, Nrow, Piece, BoardIn, BoardOut):-
	Nrow > 0,
	Nrow < 20,
	get_piece(1, Nrow, BoardIn, Piece1),
	get_piece(2, Nrow, BoardIn, Piece2),
	(Piece1 == freeCell ->
			throw_piece_right(1, Nrow, Piece, BoardIn, BoardOut);
			(Piece2 == freeCell,
				set_piece(2, Nrow, Piece1, BoardIn, Board1),
				set_piece(1, Nrow, Piece, Board1, BoardOut))).

move(down, Ncolumn, Piece, BoardIn, BoardOut):-
	Ncolumn > 0,
	Ncolumn < 20,
	get_piece(Ncolumn, 1, BoardIn, Piece1),
	get_piece(Ncolumn, 2, BoardIn, Piece2),
	(Piece1 == freeCell ->
		throw_piece_down(1, Ncolumn, Piece, BoardIn, BoardOut);
		(Piece2 == freeCell,
			set_piece(Ncolumn, 2, Piece1, BoardIn, Board1),
			set_piece(Ncolumn, 1, Piece, Board1, BoardOut))).

move(up, Ncolumn, Piece, BoardIn, BoardOut):-
	Ncolumn > 0,
	Ncolumn < 20,
	get_piece(Ncolumn, 19, BoardIn, Piece1),
	get_piece(Ncolumn, 18, BoardIn, Piece2),
	(Piece1 == freeCell ->
		throw_piece_up(19, Ncolumn, Piece, BoardIn, BoardOut);
		(Piece2 == freeCell,
			set_piece(Ncolumn, 18, Piece1, BoardIn, Board1),
			set_piece(Ncolumn, 19, Piece, Board1, BoardOut))).

move(left, Nrow, Piece, BoardIn, BoardOut):-
	Nrow > 0,
	Nrow < 20,
	get_piece(19, Nrow, BoardIn, Piece1),
	get_piece(18, Nrow, BoardIn, Piece2),
	(Piece1 == freeCell ->
		throw_piece_left(19, Nrow, Piece, BoardIn, BoardOut);
		(Piece2 == freeCell,
			set_piece(18, Nrow, Piece1, BoardIn, Board1),
			set_piece(19, Nrow, Piece, Board1, BoardOut))).

move(_, _, _, BoardIn, BoardIn):-
	!,fail.
%---------END THROW Direction-----------%

throw_piece_right(N, Nrow, Piece, BoardIn, BoardOut):-
	get_piece(N, Nrow, BoardIn, NPiece),
	NPiece \= freeCell,
	N > 1,
	Ncol is N - 1,
	set_piece(Ncol, Nrow, Piece, BoardIn, Board1),
	move_piece(right, N, Nrow, Board1, Board2),
	move_piece(right, Ncol, Nrow, Board2, BoardOut).
throw_piece_right(N, Nrow, Piece, BoardIn, BoardOut):-
	get_piece(N, Nrow, BoardIn, NPiece),
	NPiece == freeCell,
	NN is N + 1,
	throw_piece_right(NN, Nrow, Piece, BoardIn, BoardOut).

throw_piece_left(N, Nrow, Piece, BoardIn, BoardOut):-
	get_piece(N, Nrow, BoardIn, NPiece),
	NPiece \= freeCell,
	N < 19,
	Ncol is N + 1,
	set_piece(Ncol, Nrow, Piece, BoardIn, Board1),
	move_piece(left, N, Nrow, Board1, Board2),
	move_piece(left, Ncol, Nrow, Board2, BoardOut).
throw_piece_left(N, Nrow, Piece, BoardIn, BoardOut):-
	get_piece(N, Nrow, BoardIn, NPiece),
	NPiece == freeCell,
	NN is N - 1,
	throw_piece_left(NN, Nrow, Piece, BoardIn, BoardOut).

throw_piece_up(N, Ncolumn, Piece, BoardIn, BoardOut):-
	get_piece(Ncolumn, N, BoardIn, NPiece),
	NPiece \= freeCell,
	N < 19,
	Nr is N + 1,
	set_piece(Ncolumn, Nr, Piece, BoardIn, Board1),
	move_piece(up, Ncolumn, N, Board1, Board2),
	move_piece(up, Ncolumn, Nr, Board2, BoardOut).
throw_piece_up(N, Ncolumn, Piece, BoardIn, BoardOut):-
	get_piece(Ncolumn, N, BoardIn, NPiece),
	NPiece == freeCell,
	NN is N - 1,
	throw_piece_up(NN, Ncolumn, Piece, BoardIn, BoardOut).

throw_piece_down(N, Ncolumn, Piece, BoardIn, BoardOut):-
	get_piece(Ncolumn, N, BoardIn, NPiece),
	NPiece \= freeCell,
	N > 1 ,
	Nr is N - 1,
	set_piece(Ncolumn, Nr, Piece, BoardIn, Board1),
	move_piece(down, Ncolumn, N, Board1, Board2),
	move_piece(down, Ncolumn, Nr, Board2, BoardOut).
throw_piece_down(N, Ncolumn, Piece, BoardIn, BoardOut):-
	get_piece(Ncolumn, N, BoardIn, NPiece),
	NPiece == freeCell,
	NN is N + 1,
	throw_piece_down(NN, Ncolumn, Piece, BoardIn, BoardOut).

