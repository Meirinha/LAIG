%-----------CALHAU MODE ------------ Pretty sure it doesn't know how to play
choose_move(1,Piece, Board, Direction, NWin):-
	valid_moves(Board, HList, VList, Piece),
	my_random(1,2,Rand),
	use_list(Rand, HList, VList, Direction, NWin).

%-------- EASY MODE ---------
choose_move(2, Piece, Board, Direction, NWin):-
	valid_moves(Board, HList, VList, Piece),
	try_win(Board, HList, VList, Piece, NWin, Direction).

%------- NORMAL MODE ------------
choose_move(3, Piece, Board, Direction, NWin):-
	valid_moves(Board, HList, VList, Piece),
	try_win_normal(Board, HList, VList, Piece, NWin, Direction).

try_win(Board, HList, VList, Piece, NWin, Direction):- %If there is a winning play, the bot will perform it
	get_winning_play(Board, HList, VList, Piece, NWin, Direction).

try_win(_, HList, VList, _, NWin, Direction):- %Otherwise, it will choose among possible plays
	my_random(1,2,Rand),
	use_list(Rand, HList, VList, Direction, NWin).

get_winning_play(Board, HList, _, Piece, NWin, Direction):-
	get_winning_hor(Board, HList, Piece, NWin, Direction).

get_winning_play(Board, _, VList, Piece, NWin, Direction):-
	get_winning_vert(Board, VList, Piece, NWin, Direction).

get_winning_hor(Board, [X|Tail], Piece, X, right):-
	X =< Tail,
	player_piece(Player, Piece),
	move(right, X, Piece, Board, BoardOut),
	check_win(Player, BoardOut).

get_winning_hor(Board, [X|Tail], Piece, X, left):-
	X =< Tail,
	player_piece(Player, Piece),
	move(left, X, Piece, Board, BoardOut),
	check_win(Player, BoardOut).

get_winning_hor(Board, [X|Tail], Piece, NWin, Direction):-
	X =< Tail,
	Xn is X + 1,
	get_winning_hor(Board, [Xn|Tail], Piece, NWin, Direction).

get_winning_vert(Board, [X|Tail], Piece, X, up):-
	X =< Tail,
	player_piece(Player, Piece),
	move(up, X, Piece, Board, BoardOut),
	check_win(Player, BoardOut).

get_winning_vert(Board, [X|Tail], Piece, X, down):-
	X =< Tail,
	player_piece(Player, Piece),
	move(down, X, Piece, Board, BoardOut),
	check_win(Player, BoardOut).

get_winning_vert(Board, [X|Tail], Piece, NWin, Direction):-
	X =< Tail,
	Xn is X + 1,
	get_winning_hor(Board, [Xn|Tail], Piece, NWin, Direction).

try_win_normal(Board, HList, VList, Piece, NWin, Direction):- %If there is a winning play, the bot will perform it
	get_winning_play(Board, HList, VList, Piece, NWin, Direction).

try_win_normal(Board, HList, _, Piece, NWin, Direction):- 
	check_horizontal(Board, HList, Piece, NWin, Direction).

try_win_normal(Board, _, VList, Piece, NWin, Direction):- 
	check_vertical(Board, VList, Piece, NWin, Direction).

try_win_normal(_, HList, VList, _, NWin, Direction):-
	my_random(1,2,Rand),
	use_list(Rand, HList, VList, Direction, NWin).

check_horizontal(Board, [Row | Tail], Piece, Row, right):-
	Row =< Tail,
	first_piece_in_row(Board, Row, NPiece, Column),
	Piece \= NPiece,
	check_three_in_line(right, Row, Column, NPiece, Board).
check_horizontal(Board, [Row | Tail], Piece, Row, left):-
	Row =< Tail,
	last_piece_in_row(Board, Row, NPiece, Column),
	Piece \= NPiece,
	check_three_in_line(left, Row, Column, NPiece, Board).	
check_horizontal(Board, [Row | Tail], Piece, NWin, Direction):-
	Row =< Tail,
	Nr is Row + 1,
	check_horizontal(Board,  [Nr | Tail], Piece, NWin, Direction).

check_vertical(Board, [Column | Tail], Piece, Column, down):-
	Column =< Tail,
	first_piece_in_column(Board, Column, NPiece, Row),
	Piece \= NPiece,
	check_three_in_line(down, Row, Column, NPiece, Board).
check_vertical(Board, [Column | Tail], Piece, Column, up):-
	Column =< Tail,
	last_piece_in_column(Board, Column, NPiece, Row),
	Piece \= NPiece,
	check_three_in_line(up, Row, Column, NPiece, Board).	
check_vertical(Board, [Column | Tail], Piece, NWin, Direction):-
	Column =< Tail,
	Nc is Column + 1,
	check_vertical(Board,  [Nc | Tail], Piece, NWin, Direction).

check_three_in_line(left, Row, Column, OppPiece, Board):-
	Ncol is Column - 1,
	get_piece(Ncol, Row, Board, NPiece),
	NPiece == OppPiece,
	Nc is Column - 2,
	get_piece(Nc, Row, Board, NNPiece),
	NNPiece == OppPiece.
check_three_in_line(right, Row, Column, OppPiece, Board):-
	Ncol is Column + 1,
	get_piece(Ncol, Row, Board, NPiece),
	NPiece == OppPiece,
	Nc is Column + 2,
	get_piece(Nc, Row, Board, NNPiece),
	NNPiece == OppPiece.
check_three_in_line(up, Row, Column, OppPiece, Board):-
	Nrow is Row - 1,
	get_piece(Column, Nrow, Board, NPiece),
	NPiece == OppPiece,
	Nr is Row - 2,
	get_piece(Column, Nr, Board, NNPiece),
	NNPiece == OppPiece.
check_three_in_line(down, Row, Column, OppPiece, Board):-
	Nrow is Row + 1,
	get_piece(Column, Nrow, Board, NPiece),
	NPiece == OppPiece,
	Nr is Row + 2,
	get_piece(Column, Nr, Board, NNPiece),
	NNPiece == OppPiece.


valid_moves(Board, HList, VList, Piece):-
	valid_hor(Board, HList, 1, Piece),
	valid_vert(Board, VList, 1, Piece).

valid_hor(Board, [N|HList], N, Piece):-
	move(right, N, Piece, Board, _),
	valid_hor_last(Board, HList, 19, Piece).
valid_hor(Board, HList, N, Piece):-
	NN is N+1,
	valid_hor(Board, HList, NN, Piece).

valid_hor_last(Board, [N|[]], N, Piece):-
	move(right, N, Piece, Board, _).
valid_hor_last(Board, HList, N, Piece):-
	NN is N-1,
	valid_hor_last(Board, HList, NN, Piece).

valid_vert(Board, [N|VList], N, Piece):-
	move(up, N, Piece, Board, _),
	valid_vert_last(Board, VList, 19, Piece).
valid_vert(Board, VList, N, Piece):-
	NN is N+1,
	valid_vert(Board, VList, NN, Piece).

valid_vert_last(Board, [N|[]], N, Piece):-
	move(up, N, Piece, Board, _).
valid_vert_last(Board, VList, N, Piece):-
	NN is N-1,
	valid_vert_last(Board, VList, NN, Piece).

use_list(1, HList, _, Direction, Line):-
	my_random(1,2, Rand),
	direction_hor(Rand, HList, Direction, Line).

use_list(2, _, VList, Direction, Line):-
	my_random(1,2, Rand),
	direction_vert(Rand, VList, Direction, Line).

direction_hor(1, [First,Last|[]], right, Line):- %RIGHT
	my_random(First, Last, Line).
direction_hor(2, [First,Last|[]], left, Line):- %LEFT
	my_random(First, Last, Line).

direction_vert(1, [First,Last|[]], up, Line):- %UP
	my_random(First, Last, Line).
direction_vert(2, [First,Last|[]], down, Line):- %DOWN
	my_random(First, Last, Line).
