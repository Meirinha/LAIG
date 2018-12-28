% If Then
it(If, Then):- If, !, Then.
it(_,_).

% If Then Else
ite(If, Then, _):- If, !, Then.
ite(_, _, Else):- Else.

my_random(X, X, X).
my_random(X, Y, Z):-
	Y1 is Y+1,
	random(X, Y1, Z).

max(A, B, A):-
	A > B.
max(_, B, B).
