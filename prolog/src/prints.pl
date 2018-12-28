% Prints the Board, freeCell replaced with empty space ' '
print_board(Board):-
	print_top,
	print_row_divider(29),
	print_board_aux(Board, 1).

print_board_aux([], _).
print_board_aux([Row|Rest], N):-
	write('| '),
	print_row(Row, N),
	Number is N + 1,
	print_board_aux(Rest, Number).

print_row([], N):- 
	write(N),
	print_row_divider(29).
print_row([freeCell|Tail], N):-
	write(' | '),
	print_row(Tail, N).
print_row([Piece|Rest], N) :-
	Piece \= freeCell,
	write(Piece),
	write('| '),
	print_row(Rest, N).

print_row_divider(N):-
	nl,
	print_row_divider_aux(N),
	nl.

print_row_divider_aux(0):-!.
print_row_divider_aux(N):-
	write('--'),
	NN is N-1,
	print_row_divider_aux(NN).

print_top:-
	print_top_aux(1).

print_top_aux(19):-
	write(' '),
	write(19).

print_top_aux(Counter):-
	Counter < 19,
	Counter > 9,
	write(' '),
	write(Counter),
	C is Counter + 1,
	print_top_aux(C).

print_top_aux(Counter):-
	Counter > 0,
	Counter < 19,
	write(' '),
	write(Counter),
	write(' '),
	C is Counter + 1,
	print_top_aux(C).